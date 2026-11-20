import { useState } from 'react'

function Hero({ busqueda, setBusqueda, sugerencias }) {
  const [abierto, setAbierto] = useState(false)

  return (
    <section id="hero" className="hero">
      <span className="badge">200 oportunidades activas hoy</span>
      <h2>Encuentra tu próxima oportunidad</h2>
      <p>Becas, cursos y oportunidades en un solo lugar</p>
      <form className="buscador" onSubmit={(e) => e.preventDefault()}>
        <div className="buscador-campo">
          <input
            type="text"
            placeholder="Busca por área, institución o palabra clave"
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value)
              setAbierto(true)
            }}
            onFocus={() => setAbierto(true)}
            onBlur={() => setAbierto(false)}
          />
          {abierto && sugerencias.length > 0 && (
            <ul className="sugerencias">
              {sugerencias.map((s) => (
                <li key={s}>
                  {/* onMouseDown se ejecuta antes del onBlur del input, así el clic no se pierde */}
                  <button
                    type="button"
                    onMouseDown={() => {
                      setBusqueda(s)
                      setAbierto(false)
                    }}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit">Buscar</button>
      </form>
    </section>
  )
}

export default Hero