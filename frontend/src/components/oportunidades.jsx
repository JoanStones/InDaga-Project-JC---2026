import TarjetaOportunidad from './tarjetaoportunidad'
const filtros = [
  { etiqueta: 'Todas', valor: 'Todas' },
  { etiqueta: 'Becas', valor: 'Beca' },
  { etiqueta: 'Cursos', valor: 'Curso' },
  { etiqueta: 'Programas', valor: 'Programa' },
]

function Oportunidades({ lista, filtro, setFiltro }) {
  return (
    <section id="oportunidades">
      <h2 className="np">Oportunidades disponibles</h2>
      <div className="filtros">
        {filtros.map((f) => (
          <button
            key={f.valor}
            className={filtro === f.valor ? 'filtro filtro--activo' : 'filtro'}
            onClick={() => setFiltro(f.valor)}
          >
            {f.etiqueta}
          </button>
        ))}
      </div>
      <div className="grid-oportunidades">
        {lista.map((o) => (
          <TarjetaOportunidad key={o.id} {...o} />
        ))}
      </div>
      {lista.length === 0 && <p>No encontramos oportunidades con esos criterios.</p>}
    </section>
  )
}

export default Oportunidades