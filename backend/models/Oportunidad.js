import mongoose from 'mongoose'

// Define cómo se guarda cada beca, curso o programa
const oportunidadSchema = new mongoose.Schema(
  {
    tipo: { type: String, required: true, enum: ['Beca', 'Curso', 'Programa'] },
    institucion: { type: String, required: true, trim: true },
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true },
    fecha: { type: String, required: true, trim: true }, // texto libre: "Inicia: 01/09 — Vence: 30/09"
    detalles: { type: String, trim: true, default: '' }, // explicación larga de la beca
    requisitos: { type: String, trim: true, default: '' },
    enlace: { type: String, trim: true, default: '' }, // página oficial para postular
  },
  // virtuals: true hace que cada documento incluya un campo "id", que usa tu frontend
  { timestamps: true, toJSON: { virtuals: true, versionKey: false } }
)

export default mongoose.model('Oportunidad', oportunidadSchema)