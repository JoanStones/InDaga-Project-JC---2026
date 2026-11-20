import TarjetaOportunidad from './tarjetaoportunidad'

// etiqueta = lo que se ve en el botón; valor = el tipo que tienen los datos
const filtros = [
  { etiqueta: 'Todas', valor: 'Todas' },
  { etiqueta: 'Becas', valor: 'Beca' },
  { etiqueta: 'Cursos', valor: 'Curso' },
  { etiqueta: 'Programas', valor: 'Programa' },
]

function Oportunidades({ lista, filtro, setFiltro, cargando, error }) {
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
      {/* Estados claros: cargando, error o sin resultados */}
      {cargando && <p className="estado">Cargando oportunidades...</p>}
      {error && <p className="estado">{error}</p>}
      <div className="grid-oportunidades">
        {lista.map((o) => (
          <TarjetaOportunidad key={o.id} {...o} />
        ))}
      </div>
      {!cargando && !error && lista.length === 0 && (
        <p className="estado">No encontramos oportunidades con esos criterios.</p>
      )}
    </section>
  )
}

export default Oportunidades