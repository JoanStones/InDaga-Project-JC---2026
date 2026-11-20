import dns from 'node:dns'
dns.setServers(['8.8.8.8', '1.1.1.1'])
import mongoose from 'mongoose'
import 'dotenv/config'
import Oportunidad from './models/Oportunidad.js'

// Para agregar otra oportunidad, copia un bloque y cambia sus datos
const datos = [
  {
    tipo: 'Beca',
    institucion: 'IFARHU · SENACYT · Fulbright',
    nombre: 'Beca Fulbright–IFARHU–SENACYT (posgrado en EE. UU.)',
    descripcion: 'Beca para que profesionales panameños residentes en Panamá cursen una maestría o un doctorado en Estados Unidos.',
    fecha: 'Convocatoria anual: revisa las fechas en el sitio oficial',
    detalles: 'Es una convocatoria conjunta de Fulbright, el IFARHU y la SENACYT. La solicitud se llena en línea y los documentos se entregan a la SENACYT según la lista de verificación de cada convocatoria.',
    requisitos: 'Copia de la cédula (ambas caras), formulario de aplicación en línea completado en inglés y los documentos de la lista de verificación publicada por la SENACYT.',
    enlace: 'https://www.senacyt.gob.pa',
  },
  {
    tipo: 'Beca',
    institucion: 'IFARHU · Panamá',
    nombre: 'Concurso General de Becas del IFARHU',
    descripcion: 'Becas nacionales del IFARHU para estudiantes con buen rendimiento académico, otorgadas por convocatoria pública.',
    fecha: 'Se abre por convocatoria oficial',
    detalles: 'Según el reglamento vigente, las becas se asignan solo mediante convocatoria oficial y una comisión evaluadora analiza cada expediente.',
    requisitos: 'Promedio mínimo de 4.5 para quienes ingresan a una universidad oficial, y los documentos del concurso (por ejemplo, la declaración jurada socioeconómica firmada). Revisa la lista completa en el sitio.',
    enlace: 'https://www.ifarhuconcurso.gob.pa',
  },
  {
    tipo: 'Beca',
    institucion: 'IFARHU · Panamá',
    nombre: 'Becas internacionales del IFARHU',
    descripcion: 'Oportunidades de estudio en el extranjero que el IFARHU publica en su portal oficial.',
    fecha: 'Consulta las convocatorias vigentes',
    detalles: 'Las convocatorias, plazos y requisitos cambian según cada beca; la información actualizada está en el sitio oficial del IFARHU.',
    requisitos: 'Cada beca tiene sus propios requisitos (por ejemplo, documentos académicos y carta compromiso). Revísalos en la convocatoria que te interese.',
    enlace: 'https://www.ifarhu.gob.pa',
  },
  {
    tipo: 'Beca',
    institucion: 'SENACYT · Panamá',
    nombre: 'Becas de la SENACYT',
    descripcion: 'Convocatorias públicas de becas para maestría, doctorado y áreas estratégicas como la formación en semiconductores.',
    fecha: 'Calendario anual de convocatorias',
    detalles: 'La SENACYT publica cada año un calendario de convocatorias públicas de becas, alineado con las prioridades nacionales de ciencia, tecnología e innovación.',
    requisitos: 'Varían según la convocatoria; revisa las bases de la que te interese antes de postular.',
    enlace: 'https://www.senacyt.gob.pa',
  },
  {
    tipo: 'Curso',
    institucion: 'Google · Coursera',
    nombre: 'Certificado Profesional en Análisis de Datos de Google',
    descripcion: 'Certificado en línea para empezar una carrera en análisis de datos, sin título ni experiencia previa.',
    fecha: 'Inscripción abierta',
    detalles: 'Serie de 8 cursos que cubre hojas de cálculo, SQL y visualización de datos, pensada para completarse en menos de 6 meses.',
    requisitos: 'No se requiere título ni experiencia previa. Se paga una cuota mensual en Coursera y existe ayuda financiera para quienes cumplan los requisitos.',
    enlace: 'https://grow.google/intl/es/google-career-certificates/',
  },
  {
    tipo: 'Programa',
    institucion: 'Voluntarios de las Naciones Unidas (UNV)',
    nombre: 'Voluntariado con las Naciones Unidas',
    descripcion: 'Programa para trabajar como voluntario/a en agencias de la ONU en proyectos de paz y desarrollo sostenible.',
    fecha: 'Consulta las vacantes abiertas',
    detalles: 'UNV ofrece modalidades internacional, en línea y para jóvenes. El voluntariado en la ONU es un compromiso de tiempo completo.',
    requisitos: 'Crea tu perfil profesional en la plataforma de UNV y postula a las oportunidades que se ajusten a tu perfil y experiencia.',
    enlace: 'https://app.unv.org',
  },
  {
    tipo: 'Programa',
    institucion: 'BID Lab · Grupo BID',
    nombre: 'Convocatorias de BID Lab',
    descripcion: 'Convocatorias del laboratorio de innovación del BID que financian proyectos con impacto en América Latina y el Caribe.',
    fecha: 'Se abren por temporadas',
    detalles: 'BID Lab abre convocatorias por tema (por ejemplo, género e inteligencia artificial o emprendedoras STEM); las propuestas seleccionadas pueden recibir financiamiento.',
    requisitos: 'Cada convocatoria tiene sus propias bases; revisa quién puede aplicar y los plazos antes de postular.',
    enlace: 'https://www.iadb.org/es/como-trabajar-juntos/convocatorias',
  },
]

await mongoose.connect(process.env.MONGO_URI)
await Oportunidad.deleteMany({}) // borra las anteriores para no duplicar
await Oportunidad.insertMany(datos)
console.log(`Cargadas ${datos.length} oportunidades`)
await mongoose.disconnect()
