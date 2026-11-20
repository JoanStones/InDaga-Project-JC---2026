import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

function Contacto() {
  const [datos, setDatos] = useState({ nombre: '', email: '', mensaje: '' })
  const [estado, setEstado] = useState('inactivo')
  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value })

  const enviar = async (e) => {
    e.preventDefault()
    setEstado('enviando')
    try {
      const res = await fetch(`${API_URL}/contacto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      })
      if (!res.ok) throw new Error('Falló el envío')
      setDatos({ nombre: '', email: '', mensaje: '' })
      setEstado('ok')
    } catch {
      setEstado('error')
    }
  }

  return (
    <section id="contacto" className="contacto">
      <h2>Contáctanos</h2>
      <form className="contacto-form" onSubmit={enviar}>
        <input name="nombre" placeholder="Tu nombre" value={datos.nombre} onChange={cambiar} required />
        <input name="email" type="email" placeholder="Tu correo" value={datos.email} onChange={cambiar} required />
        <textarea name="mensaje" rows="4" placeholder="Tu mensaje" value={datos.mensaje} onChange={cambiar} required />
        <button type="submit" disabled={estado === 'enviando'}>
          {estado === 'enviando' ? 'Enviando...' : 'Enviar mensaje'}
        </button>
        {estado === 'ok' && <p className="contacto-ok">¡Mensaje enviado! Te responderemos pronto.</p>}
        {estado === 'error' && <p className="contacto-error">No pudimos enviar el mensaje. Intenta de nuevo.</p>}
      </form>
    </section>
  )
}

export default Contacto