import Header from './components/header'
import Hero from './components/hero'
import Oportunidades from './components/oportunidades'
import Footer from './components/footer'

const oportunidades = [
  { id: 1, tipo: 'Programa', institucion: 'Senacyt', nombre: 'Becas de investigación',
    descripcion: 'Financiamiento para proyectos de investigación aplicada.',
    fecha: 'Inicia: 01/09 — Vence: 30/09' },
  { id: 2, tipo: 'Curso', institucion: 'Institución (ejemplo)', nombre: 'Curso de ejemplo',
    descripcion: 'Descripción de ejemplo.', fecha: 'Fecha de ejemplo' },
]

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Oportunidades lista={oportunidades} />
      <Footer />
    </>
  )
}

export default App