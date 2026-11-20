import { useState, useEffect } from 'react'
import Header from './components/header'
import Hero from './components/hero'
import Oportunidades from './components/oportunidades'
import Slogan from './components/slogan'
import ComoFunciona from './components/comofunciona'
import Caminos from './components/caminos'
import Contacto from './components/contacto'
import Footer from './components/footer'
import Chatbot from './components/chatbot'
import Admin from './components/admin'

// Dirección del backend. En local es el puerto 3000; al publicar la cambiaremos por la de Render
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

function App() {
  const [oportunidades, setOportunidades] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [filtro, setFiltro] = useState('Todas')
  const [busqueda, setBusqueda] = useState('')
  const [vista, setVista] = useState('inicio') // 'inicio' o 'admin'

  // Pide las oportunidades al backend (también se usa para refrescar después de crear/borrar en el admin)
  const cargar = () => {
    fetch(`${API_URL}/oportunidades`)
      .then((res) => {
        if (!res.ok) throw new Error('Respuesta inválida')
        return res.json()
      })
      .then((datos) => setOportunidades(datos))
      .catch(() => setError('No pudimos cargar las oportunidades. Inténtalo de nuevo más tarde.'))
      .finally(() => setCargando(false))
  }

  // useEffect con [] se ejecuta una sola vez, al cargar la página
  useEffect(() => {
    cargar()
  }, [])

  // Si no hay token guardado (no inició sesión), la mandamos a la landing
  const logueado = Boolean(localStorage.getItem('indaga_token'))
  useEffect(() => {
    if (!logueado) window.location.href = `${import.meta.env.BASE_URL}landing.html`
  }, [logueado])

  // Se queda con las oportunidades que cumplen el tipo Y contienen el texto buscado
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

  if (!logueado) return null // mientras redirige no mostramos nada

  // Vista del administrador (el backend vuelve a comprobar el rol en cada petición)
  if (vista === 'admin') {
    return (
      <>
        <Header vista={vista} setVista={setVista} />
        <Admin oportunidades={oportunidades} recargar={cargar} />
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header vista={vista} setVista={setVista} />
      <Hero busqueda={busqueda} setBusqueda={setBusqueda} sugerencias={sugerencias} />
      <Oportunidades
        lista={visibles}
        filtro={filtro}
        setFiltro={setFiltro}
        cargando={cargando}
        error={error}
      />
      <Slogan />
      <ComoFunciona />
      <Caminos />
      <Contacto />
      <Footer />
      <Chatbot />
    </>
  )
}

export default App