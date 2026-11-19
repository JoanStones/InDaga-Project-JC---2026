import logo from '../assets/InDaga-Icon.svg'

function Header() {
  return (
    <header className="header">
      <div className="header-flex">
        <h1 className="logo">
          <img src={logo} alt="" className="logo-icon" />
          InDaga
        </h1>
        <div className="header-right">
          <nav className="nav">
            <a href="#oportunidades">Oportunidades</a>
            <a href="#empresas">Para empresas</a>
            <a href="#nosotros">Nosotros</a>
          </nav>
          <a href="#ingresar" className="btn-ingresar">Ingresar</a>
        </div>
      </div>
    </header>
  )
}

export default Header