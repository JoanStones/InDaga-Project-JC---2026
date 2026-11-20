import { Router } from 'express'
import Mensaje from '../models/mensaje.js'
import { requiereAdmin } from '../middleware/auth.js'

const router = Router()

router.post('/', async (req, res) => {
  const { nombre, email, mensaje } = req.body

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: 'Completa todos los campos.' })
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'El correo no es válido.' })
  }

  try {
    await Mensaje.create({ nombre, email, mensaje })
    res.status(201).json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: 'No se pudo guardar el mensaje.' })
  }
})

router.get('/', requiereAdmin, async (req, res) => {
  const mensajes = await Mensaje.find().sort({ createdAt: -1 })
  res.json(mensajes)
})

export default router