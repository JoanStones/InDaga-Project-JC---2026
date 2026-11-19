import { useState } from 'react'
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
  { id: 3, tipo: 'Beca', institucion: 'Institución (ejemplo)', nombre: 'Beca de ejemplo',
    descripcion: 'Descripción de ejemplo.', fecha: 'Fecha de ejemplo' },
]

function App() {
  const [filtro, setFiltro] = useState('Todas')
  const [busqueda, setBusqueda] = useState('')

  const visibles = oportunidades.filter((o) => {
    const coincideTipo = filtro === 'Todas' || o.tipo === filtro
    const texto = `${o.nombre} ${o.institucion} ${o.descripcion}`.toLowerCase()
    const coincideTexto = texto.includes(busqueda.toLowerCase())
    return coincideTipo && coincideTexto
  })

  const sugerencias =
    busqueda.trim() === ''
      ? []
      : [...new Set(oportunidades.flatMap((o) => [o.nombre, o.institucion]))]
          .filter(
            (s) =>
              s.toLowerCase().includes(busqueda.toLowerCase()) &&
              s.toLowerCase() !== busqueda.toLowerCase()
          )
          .slice(0, 5)

  return (
    <>
      <Header />
      <Hero busqueda={busqueda} setBusqueda={setBusqueda} sugerencias={sugerencias} />
      <Oportunidades lista={visibles} filtro={filtro} setFiltro={setFiltro} />
      <Footer />
    </>
  )
}

export default App