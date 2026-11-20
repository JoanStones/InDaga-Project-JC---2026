import { useState, useRef, useEffect } from 'react'

// Dirección del backend (igual que en App.jsx)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const SUGERENCIAS = ['¿Qué becas están abiertas?', 'Cursos gratis', 'Algo para jóvenes de 15 a 24 años']

function Chatbot() {
  const usuario = JSON.parse(localStorage.getItem('indaga_usuario') || 'null')
  const [abierto, setAbierto] = useState(false)
  const [escribiendo, setEscribiendo] = useState(false)
  const [texto, setTexto] = useState('')
  const [mensajes, setMensajes] = useState([
    { rol: 'bot', texto: `¡Hola, ${usuario?.nombre || 'bienvenido/a'}! Soy Daga, la asistente de InDaga. Cuéntame qué buscas y te recomiendo becas, cursos o programas de nuestro catálogo.` },
  ])
  const fin = useRef(null)

  // Cada vez que llega un mensaje nuevo, baja el scroll al final
  useEffect(() => {
    fin.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes, escribiendo, abierto])

  async function enviar(contenido) {
    const pregunta = contenido.trim()
    if (!pregunta || escribiendo) return
    const historial = mensajes.slice(1) // sin el saludo inicial
    setMensajes((m) => [...m, { rol: 'user', texto: pregunta }])
    setTexto('')
    setEscribiendo(true)
    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('indaga_token')}`,
        },
        body: JSON.stringify({ mensaje: pregunta, historial }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.mensaje || 'Error')
      setMensajes((m) => [...m, { rol: 'bot', texto: data.respuesta }])
    } catch {
      setMensajes((m) => [
        ...m,
        { rol: 'bot', texto: 'Ahora mismo no puedo responder. Mientras tanto, explora el catálogo de arriba o escríbenos desde el formulario de contacto.' },
      ])
    } finally {
      setEscribiendo(false)
    }
  }

  return (
    <>
      {abierto && (
        <div className="daga-panel" role="dialog" aria-label="Chat con Daga">
          <div className="daga-head">
            <span>Daga · Asistente IA</span>
            <button onClick={() => setAbierto(false)} aria-label="Cerrar chat">✕</button>
          </div>
          <div className="daga-msgs">
            {mensajes.map((m, i) => (
              <div key={i} className={`daga-msg daga-msg--${m.rol}`}>{m.texto}</div>
            ))}
            {escribiendo && <div className="daga-msg daga-msg--bot daga-typing">Daga está escribiendo…</div>}
            {mensajes.length === 1 && (
              <div className="daga-sugs">
                {SUGERENCIAS.map((s) => (
                  <button key={s} onClick={() => enviar(s)}>{s}</button>
                ))}
              </div>
            )}
            <div ref={fin} />
          </div>
          <form className="daga-form" onSubmit={(e) => { e.preventDefault(); enviar(texto) }}>
            <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Escribe tu pregunta…" maxLength={500} />
            <button type="submit" disabled={escribiendo}>Enviar</button>
          </form>
        </div>
      )}
      <button className="daga-fab" onClick={() => setAbierto(!abierto)} aria-label="Abrir chat con Daga">
        {abierto ? '✕' : '💬'}
      </button>
    </>
  )
}

export default Chatbot
