function TarjetaOportunidad({ tipo, institucion, nombre, descripcion, fecha }) {
  return (
    <div className="oport-card" data-cat={tipo}>
      <div><span className="oport-card__tag">{tipo}</span></div>
      <h3 className="oport-card__title">{nombre}</h3>
      <p className="oport-card__institution">{institucion}</p>
      <p className="oport-card__desc">{descripcion}</p>
      <div className="oport-card__footer">
        <span className="oport-card__sub">{fecha}</span>
        <span className="oport-card__arrow">→</span>
      </div>
    </div>
  )
}

export default TarjetaOportunidad