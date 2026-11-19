import TarjetaOportunidad from './tarjetaoportunidad'

function Oportunidades({ lista }) {
  return (
    <section id="oportunidades">
      <h2 className="np">Oportunidades disponibles</h2>
      <div className="filtros">
        <button className="filtro filtro--activo">Todas</button>
        <button className="filtro">Becas</button>
        <button className="filtro">Cursos</button>
        <button className="filtro">Programas</button>
      </div>
      <div className="grid-oportunidades">
        {lista.map((o) => (
          <TarjetaOportunidad key={o.id} {...o} />
        ))}
      </div>
    </section>
  )
}

export default Oportunidades