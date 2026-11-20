import { Router } from 'express'
import Oportunidad from '../models/Oportunidad.js'
import User from '../models/User.js'
import { requiereLogin } from '../middleware/auth.js'

const router = Router()

// POST /api/chat → el usuario (con sesión iniciada) le escribe a Daga y la IA responde.
// La clave de la IA vive solo aquí, en el servidor (.env), nunca en el navegador.
router.post('/', requiereLogin, async (req, res) => {
  const { mensaje, historial = [] } = req.body

  if (typeof mensaje !== 'string' || !mensaje.trim() || mensaje.length > 500) {
    return res.status(400).json({ mensaje: 'Escribe una pregunta de hasta 500 caracteres.' })
  }
  if (!process.env.GEMINI_API_KEY) {
    return res.status(503).json({ mensaje: 'La IA no está configurada.' })
  }

  try {
    // Personalización: el nombre del usuario y el catálogo real salen de la base de datos
    const [usuario, oportunidades] = await Promise.all([
      User.findById(req.usuario.id).select('nombre'),
      Oportunidad.find().sort({ createdAt: -1 }),
    ])

    const catalogo = oportunidades
      .map(
        (o) =>
          `- [${o.tipo}] ${o.nombre} (${o.institucion}). ${o.descripcion} Fecha: ${o.fecha}. ` +
          `Requisitos: ${o.requisitos || 'ver convocatoria'}. Enlace: ${o.enlace || 'no disponible'}`
      )
      .join('\n')

    const hoy = new Date().toLocaleDateString('es-PA', { dateStyle: 'long' })

    // Instrucciones fijas que le dan personalidad y límites a la IA
    const sistema =
      `Eres Daga, la asistente de InDaga, una plataforma gratuita que reúne becas, cursos y programas ` +
      `para jóvenes en Panamá. Estás hablando con ${usuario?.nombre || 'un usuario'}. Hoy es ${hoy}.\n` +
      `Reglas:\n` +
      `- Responde siempre en español, con un tono cálido y claro, en máximo 120 palabras.\n` +
      `- Recomienda SOLO oportunidades del catálogo de abajo. Nunca inventes fechas, requisitos ni enlaces.\n` +
      `- Al recomendar, menciona el nombre, la fecha y el enlace. Si una fecha ya pasó, avísalo.\n` +
      `- Si lo que piden no está en el catálogo, dilo con honestidad y sugiere revisar las fuentes oficiales.\n` +
      `- Si preguntan algo ajeno a becas, cursos, programas u orientación académica, redirige con amabilidad.\n\n` +
      `CATÁLOGO ACTUAL DE INDAGA:\n${catalogo}`

    // Últimos mensajes de la charla (para que recuerde el contexto), validados y recortados
    const previos = (Array.isArray(historial) ? historial : [])
      .slice(-6)
      .filter((h) => h && typeof h.texto === 'string' && ['user', 'bot'].includes(h.rol))
      .map((h) => ({ role: h.rol === 'bot' ? 'model' : 'user', parts: [{ text: h.texto.slice(0, 800) }] }))
    while (previos.length && previos[0].role === 'model') previos.shift() // la charla debe empezar por el usuario

    const cuerpo = {
      systemInstruction: { parts: [{ text: sistema }] },
      contents: [...previos, { role: 'user', parts: [{ text: mensaje.trim() }] }],
      generationConfig: { temperature: 0.4, maxOutputTokens: 1500 },
    }

    // Si un modelo no está disponible, probamos el siguiente
    const modelos = [...new Set([process.env.GEMINI_MODEL, 'gemini-2.5-flash', 'gemini-2.0-flash'].filter(Boolean))]
    let ultimoError = ''

    for (const modelo of modelos) {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': process.env.GEMINI_API_KEY },
        body: JSON.stringify(cuerpo),
      })

      if (r.ok) {
        const data = await r.json()
        const texto = data.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('').trim()
        if (texto) return res.json({ respuesta: texto })
        ultimoError = `${modelo}: respuesta vacía`
        continue
      }

      ultimoError = `${modelo}: ${r.status} ${(await r.text()).slice(0, 200)}`
      if (![400, 404, 429, 503].includes(r.status)) break // 401/403: problema con la clave, no tiene sentido seguir
    }

    console.error('Gemini falló →', ultimoError)
    res.status(502).json({ mensaje: 'La IA no está disponible en este momento.' })
  } catch (error) {
    console.error('Error en /api/chat →', error.message)
    res.status(500).json({ mensaje: 'Error en el servidor.' })
  }
})

export default router
