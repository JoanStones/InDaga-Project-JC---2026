import { Router } from 'express'
import mongoose from 'mongoose'
import Oportunidad from '../models/Oportunidad.js'
import { requiereLogin, requiereAdmin } from '../middleware/auth.js'

const router = Router()

// Todas las rutas de este archivo exigen: sesión iniciada Y rol de administrador
router.use(requiereLogin, requiereAdmin)

// POST /api/admin/oportunidades → crea una oportunidad nueva
router.post('/oportunidades', async (req, res) => {
  try {
    const { tipo, institucion, nombre, descripcion, fecha, detalles, requisitos, enlace } = req.body
    if (!['Beca', 'Curso', 'Programa'].includes(tipo) || !institucion?.trim() || !nombre?.trim() || !descripcion?.trim() || !fecha?.trim()) {
      return res.status(400).json({ mensaje: 'Completa tipo, institución, nombre, descripción y fecha.' })
    }
    const nueva = await Oportunidad.create({
      tipo,
      institucion: institucion.trim(),
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      fecha: fecha.trim(),
      detalles: detalles?.trim() || '',
      requisitos: requisitos?.trim() || '',
      enlace: enlace?.trim() || '',
    })
    res.status(201).json(nueva)
  } catch (error) {
    console.error('Error al crear oportunidad →', error.message)
    res.status(500).json({ mensaje: 'Error en el servidor.' })
  }
})

// DELETE /api/admin/oportunidades/:id → borra una oportunidad
router.delete('/oportunidades/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ mensaje: 'Id inválido.' })
    const borrada = await Oportunidad.findByIdAndDelete(req.params.id)
    if (!borrada) return res.status(404).json({ mensaje: 'No existe esa oportunidad.' })
    res.json({ ok: true })
  } catch (error) {
    console.error('Error al borrar oportunidad →', error.message)
    res.status(500).json({ mensaje: 'Error en el servidor.' })
  }
})

export default router
