function TarjetaOportunidad({ tipo, institucion, nombre, descripcion, fecha }) {
  return (
    <div className="card-oportunidad">
      <p className="tipo">{tipo}</p>
      <p className="institucion">{institucion}</p>
      <h3>{nombre}</h3>
      <p className="descripcion">{descripcion}</p>
      <p className="fecha">{fecha}</p>
    </div>
  )
}

export default TarjetaOportunidad