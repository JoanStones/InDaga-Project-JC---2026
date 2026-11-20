import { useState } from 'react'

function Contacto() {
  const [datos, setDatos] = useState({ nombre: '', correo: '', tipo: 'joven', mensaje: '' })

  // Actualiza solo el campo que cambió y conserva los demás
  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value })

  const enviar = (e) => {
    e.preventDefault() // evita que la página se recargue
    // TODO (esta noche): enviar `datos` al backend con fetch (POST /api/contacto)
    console.log('Mensaje a enviar:', datos)
  }

  return (
    <section id="contacto" className="contacto">
      <h2>Contáctanos</h2>
      <form className="contacto-form" onSubmit={enviar}>
        <input name="nombre" placeholder="Tu nombre" value={datos.nombre} onChange={cambiar} required />
        <input name="correo" type="email" placeholder="Tu correo" value={datos.correo} onChange={cambiar} required />
        <select name="tipo" value={datos.tipo} onChange={cambiar}>
          <option value="joven">Soy joven y busco oportunidades</option>
          <option value="empresa">Represento a una empresa</option>
        </select>
        <textarea name="mensaje" rows="5" placeholder="Tu mensaje" value={datos.mensaje} onChange={cambiar} required />
        <button type="submit">Enviar</button>
      </form>
    </section>
  )
}

export default Contacto