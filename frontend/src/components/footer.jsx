import logo from '../assets/InDaga-Icon.svg'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="logo">
          <img src={logo} alt="" className="logo-icon" />
          InDaga
        </div>
        <p>Plataforma gratuita que centraliza becas, cursos y programas de formación.</p>
        <span className="footer__label">Síguenos</span>
        <div className="footer__redes">
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
          <a href="#">Facebook</a>
          <a href="#">X / Twitter</a>
        </div>
      </div>
      <div className="footer__copy">© 2026 InDaga. Todos los derechos reservados.</div>
    </footer>
  )
}

export default Footer