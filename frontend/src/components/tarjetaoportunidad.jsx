import { useState } from 'react'

function TarjetaOportunidad({ tipo, institucion, nombre, descripcion, fecha, detalles, requisitos, enlace }) {
  // abierta = true muestra el detalle; el botón de la flecha la cambia
  const [abierta, setAbierta] = useState(false)

  return (
    <div className="oport-card" data-cat={tipo}>
      <div><span className="oport-card__tag">{tipo}</span></div>
      <h3 className="oport-card__title">{nombre}</h3>
      <p className="oport-card__institution">{institucion}</p>
      <p className="oport-card__desc">{descripcion}</p>
      <div className="oport-card__footer">
        <span className="oport-card__sub">{fecha}</span>
        <button
          className="oport-card__arrow"
          onClick={() => setAbierta(!abierta)}
          aria-expanded={abierta}
          aria-label={abierta ? 'Ocultar detalles' : 'Ver detalles'}
        >
          {abierta ? '↑' : '↓'}
        </button>
      </div>

      {abierta && (
        <div className="oport-card__detalle">
          {detalles && <p>{detalles}</p>}
          {requisitos && (
            <>
              <h4>Requisitos</h4>
              <p>{requisitos}</p>
            </>
          )}
          {enlace && (
            <a href={enlace} target="_blank" rel="noopener noreferrer" className="oport-card__enlace">
              Ver convocatoria y postular →
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export default TarjetaOportunidad
