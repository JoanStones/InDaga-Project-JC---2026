function Hero() {
  return (
    <section id="hero" className="hero">
      <span className="badge">200 oportunidades activas hoy</span>
      <h2>Encuentra tu próxima oportunidad</h2>
      <p>Becas, cursos y oportunidades en un solo lugar</p>
      <form className="buscador">
        <input type="text" placeholder="Busca por área, institución o palabra clave" />
        <button type="submit">Buscar</button>
      </form>
    </section>
  )
}

export default Hero