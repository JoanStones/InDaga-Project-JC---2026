import logo from '../assets/InDaga-Icon.svg'

function Header() {
  // El login guardó el usuario en localStorage; lo leemos para saludarlo
  const usuario = JSON.parse(localStorage.getItem('indaga_usuario') || 'null')

  // Cerrar sesión: borramos el token y volvemos a la landing
  const cerrarSesion = () => {
    localStorage.removeItem('indaga_token')
    localStorage.removeItem('indaga_usuario')
    window.location.href = `${import.meta.env.BASE_URL}landing.html`
  }

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
          <span className="saludo">Hola, {usuario?.nombre}</span>
          <button className="btn-ingresar" onClick={cerrarSesion}>Cerrar sesión</button>
        </div>
      </div>
    </header>
  )
}

export default Header
