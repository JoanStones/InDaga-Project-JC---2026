import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
const vacio = { tipo: 'Beca', institucion: '', nombre: '', descripcion: '', fecha: '', detalles: '', requisitos: '', enlace: '' }

// Cabeceras con el token: así el backend sabe quién eres y si eres administrador
const cabeceras = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('indaga_token')}`,
})

function Admin({ oportunidades, recargar }) {
  const [pestana, setPestana] = useState('oportunidades')
  const [form, setForm] = useState(vacio)
  const [aviso, setAviso] = useState('')
  const [mensajes, setMensajes] = useState([])

  // Cada vez que se abre la pestaña de mensajes, los pedimos al backend
  useEffect(() => {
    if (pestana !== 'mensajes') return
    fetch(`${API_URL}/contacto`, { headers: cabeceras() })
      .then((r) => r.json())
      .then((d) => setMensajes(Array.isArray(d) ? d : []))
      .catch(() => setMensajes([]))
  }, [pestana])

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  async function crear(e) {
    e.preventDefault()
    setAviso('Guardando…')
    try {
      const res = await fetch(`${API_URL}/admin/oportunidades`, {
        method: 'POST',
        headers: cabeceras(),
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.mensaje || 'No se pudo guardar')
      setForm(vacio)
      setAviso('✅ Oportunidad creada')
      recargar()
    } catch (err) {
      setAviso(`❌ ${err.message}`)
    }
  }

  async function borrar(id, nombre) {
    if (!window.confirm(`¿Borrar "${nombre}"?`)) return
    const res = await fetch(`${API_URL}/admin/oportunidades/${id}`, { method: 'DELETE', headers: cabeceras() })
    if (res.ok) recargar()
    else setAviso('❌ No se pudo borrar')
  }

  return (
    <main className="admin">
      <h2>Panel de administración</h2>
      <div className="admin-tabs">
        <button className={pestana === 'oportunidades' ? 'activa' : ''} onClick={() => setPestana('oportunidades')}>
          Oportunidades ({oportunidades.length})
        </button>
        <button className={pestana === 'mensajes' ? 'activa' : ''} onClick={() => setPestana('mensajes')}>
          Mensajes de contacto
        </button>
      </div>

      {pestana === 'oportunidades' && (
        <>
          <form className="admin-form" onSubmit={crear}>
            <h3>Nueva oportunidad</h3>
            <select name="tipo" value={form.tipo} onChange={cambiar}>
              <option>Beca</option>
              <option>Curso</option>
              <option>Programa</option>
            </select>
            <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={cambiar} required />
            <input name="institucion" placeholder="Institución" value={form.institucion} onChange={cambiar} required />
            <input name="fecha" placeholder="Fecha límite (texto)" value={form.fecha} onChange={cambiar} required />
            <textarea name="descripcion" placeholder="Descripción corta" value={form.descripcion} onChange={cambiar} required />
            <textarea name="detalles" placeholder="Detalles (opcional)" value={form.detalles} onChange={cambiar} />
            <textarea name="requisitos" placeholder="Requisitos (opcional)" value={form.requisitos} onChange={cambiar} />
            <input name="enlace" placeholder="Enlace oficial https://… (opcional)" value={form.enlace} onChange={cambiar} />
            <button type="submit">Crear oportunidad</button>
            {aviso && <p className="admin-aviso">{aviso}</p>}
          </form>

          <ul className="admin-lista">
            {oportunidades.map((o) => (
              <li key={o.id}>
                <div>
                  <strong>{o.nombre}</strong>
                  <span>{o.tipo} · {o.institucion}</span>
                </div>
                <button onClick={() => borrar(o.id, o.nombre)}>Borrar</button>
              </li>
            ))}
          </ul>
        </>
      )}

      {pestana === 'mensajes' && (
        <ul className="admin-lista">
          {mensajes.length === 0 && <li>No hay mensajes todavía.</li>}
          {mensajes.map((m, i) => (
            <li key={m._id || m.id || i} className="admin-msg">
              <div>
                <strong>{m.nombre}</strong> · <span>{m.email}</span>
                <p>{m.mensaje}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default Admin
