const pasos = [
  { numero: 1, titulo: 'Formamos',
    texto: 'Reunimos becas, cursos y programas para que los jóvenes desarrollen las habilidades que el mercado necesita.' },
  { numero: 2, titulo: 'Conectamos',
    texto: 'Unimos a los mejores perfiles con vacantes reales en empresas aliadas.' },
  { numero: 3, titulo: 'Retenemos',
    texto: 'Ayudamos a las empresas a retener a su gente y a preservar su conocimiento crítico.' },
]

function ComoFunciona() {
  return (
    <section className="como-funciona">
      <h2>¿Cómo funciona?</h2>
      <div className="pasos">
        {pasos.map((p) => (
          <div className="paso" key={p.numero}>
            <span className="paso-numero">{p.numero}</span>
            <h3>{p.titulo}</h3>
            <p>{p.texto}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ComoFunciona