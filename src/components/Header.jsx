import { Link } from 'react-scroll';
const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg fixed-top ">
        <div className="container">
          <a className="navbar-brand text-purple" href="#">SagarPro!</a>
          <Link className='navbar-brand' to='#home' >SagarPro!</Link>
          <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon "></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center " id="navbarNav">
            <ul className="navbar-nav justify-content-center ">
              <li className="nav-item">
                <Link
                  to="home"
                  smooth={true}
                  duration={500}
                  className="nav-link"
                  activeClass="active"
                  spy={true}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="skills"
                  smooth={true}
                  duration={500}
                  className="nav-link"
                  activeClass="active"
                  spy={true}
                >
                  Skills
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="projects"
                  smooth={true}
                  duration={500}
                  className="nav-link"
                  activeClass="active"
                  spy={true}
                >
                  Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="certificates"
                  smooth={true}
                  duration={500}
                  className="nav-link"
                  activeClass="active"
                  spy={true}
                >
                  Certifications
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="about"
                  smooth={true}
                  duration={500}
                  className="nav-link"
                  activeClass="active"
                  spy={true}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">

                <Link
                  to="contact"
                  smooth={true}
                  duration={500}
                  className="nav-link"
                  activeClass="active"
                  spy={true}
                >
                  Contact Me
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
