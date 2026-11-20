import logo from '../assets/InDaga-Icon.svg'

function Footer() {
  return (
    <footer className="header">
      <div className="header-flex">
        <div className="logo">
          <img src={logo} alt="" className="logo-icon" />
          InDaga
        </div>
      </div>
    </footer>
  )
}

export default Footer