import mongoose from 'mongoose'

// Define cómo se guarda un usuario en MongoDB
const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }, // aquí va el hash, nunca la contraseña real
    rol: { type: String, enum: ['usuario', 'admin'], default: 'usuario' },
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema)