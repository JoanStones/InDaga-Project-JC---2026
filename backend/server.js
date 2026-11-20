import dns from 'node:dns'
dns.setServers(['8.8.8.8', '1.1.1.1'])
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'
import authRoutes from './routes/auth.js'
import oportunidadesRoutes from './routes/oportunidades.js'
import contactoRoutes from './routes/contacto.js'
import chatRoutes from './routes/chat.js'
import adminRoutes from './routes/admin.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/oportunidades', oportunidadesRoutes)
app.use('/api/contacto', contactoRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/admin', adminRoutes)

app.get('/api/salud', (req, res) => {
  res.json({ ok: true, mensaje: 'Backend de InDaga funcionando' })
})

const PORT = process.env.PORT || 3000

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB')
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`))
  })
  .catch((error) => console.error('Error al conectar con MongoDB:', error.message))
