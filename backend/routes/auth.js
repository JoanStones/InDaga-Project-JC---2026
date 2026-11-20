import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = Router()

// El token identifica al usuario en cada petición; dura 7 días
const crearToken = (user) =>
  jwt.sign({ id: user._id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '7d' })

// POST /api/auth/registro
router.post('/registro', async (req, res) => {
  try {
    const { nombre, apellido, email, password } = req.body
    if (!nombre || !apellido || !email || !password) {
      return res.status(400).json({ mensaje: 'Completa todos los campos.' })
    }
    if (password.length < 8) {
      return res.status(400).json({ mensaje: 'La contraseña debe tener al menos 8 caracteres.' })
    }
    const existe = await User.findOne({ email: email.toLowerCase() })
    if (existe) return res.status(409).json({ mensaje: 'Este correo ya está registrado.' })

    const hash = await bcrypt.hash(password, 10) // cifra la contraseña antes de guardarla
    // El correo definido como ADMIN_EMAIL en el .env recibe el rol de administrador
    const esAdmin = email.toLowerCase() === (process.env.ADMIN_EMAIL || '').toLowerCase()
    const user = await User.create({
      nombre, apellido, email, password: hash, rol: esAdmin ? 'admin' : 'usuario',
    })

    res.status(201).json({
      token: crearToken(user),
      usuario: { nombre: user.nombre, email: user.email, rol: user.rol },
    })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor.' })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: (email || '').toLowerCase() })
    // bcrypt.compare compara la contraseña escrita con el hash guardado
    const coincide = user && (await bcrypt.compare(password || '', user.password))
    if (!coincide) {
      // Mismo mensaje en ambos casos: no revela si el correo existe
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos.' })
    }
    res.json({
      token: crearToken(user),
      usuario: { nombre: user.nombre, email: user.email, rol: user.rol },
    })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor.' })
  }
})

export default router