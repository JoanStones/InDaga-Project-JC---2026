import mongoose from 'mongoose'

const mensajeSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true },
    mensaje: { type: String, required: true, trim: true, maxlength: 1000 },
  },
  { timestamps: true }
)

export default mongoose.model('Mensaje', mensajeSchema)