import { Router } from 'express'
import Oportunidad from '../models/Oportunidad.js'
import { requiereAdmin } from '../middleware/auth.js'

const router = Router()

// GET /api/oportunidades → lista pública (la ve cualquiera)
router.get('/', async (req, res) => {
  try {
    const lista = await Oportunidad.find().sort({ createdAt: -1 })
    res.json(lista)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor.' })
  }
})

// POST /api/oportunidades → crear (solo admin)
router.post('/', requiereAdmin, async (req, res) => {
  try {
    const nueva = await Oportunidad.create(req.body)
    res.status(201).json(nueva)
  } catch (error) {
    res.status(400).json({ mensaje: 'Datos inválidos: revisa todos los campos.' })
  }
})

// PUT /api/oportunidades/:id → editar (solo admin)
router.put('/:id', requiereAdmin, async (req, res) => {
  try {
    const editada = await Oportunidad.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // devuelve el documento ya actualizado
      runValidators: true,
    })
    if (!editada) return res.status(404).json({ mensaje: 'No encontrada.' })
    res.json(editada)
  } catch (error) {
    res.status(400).json({ mensaje: 'Datos inválidos.' })
  }
})

// DELETE /api/oportunidades/:id → borrar (solo admin)
router.delete('/:id', requiereAdmin, async (req, res) => {
  try {
    const borrada = await Oportunidad.findByIdAndDelete(req.params.id)
    if (!borrada) return res.status(404).json({ mensaje: 'No encontrada.' })
    res.json({ mensaje: 'Eliminada.' })
  } catch (error) {
    res.status(400).json({ mensaje: 'Identificador inválido.' })
  }
})

export default router