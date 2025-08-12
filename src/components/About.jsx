import photo from '../assets/about.jpg'
import cv from '/certificates/SAGARMULE_resume.pdf'
import { Link } from 'react-scroll'
const About = () => {
  
  return (
    <section id='about' className='about mx-4'>
        <h3 className='subheading text-purple'>About</h3>
        <div className="row">
          <div className="col-12 col-md-6 col-sm-6 p-4 text-center">
            <img src={photo} alt="" width={"400px"} height={"500px"} className='rounded img-fluid' />
          </div>
          <div className="col-12 col-md-6 col-sm-6">
            <p className='about-text'>
              I’m a passionate full-stack web developer who loves turning ideas into fast, functional, and user-friendly applications. My work ranges from building HR portals that streamline workplace operations, to developing cab booking systems that make commuting simpler, to integrating stock APIs for real-time market data. I enjoy solving complex problems with clean code, thoughtful design, and modern web technologies. When I’m not coding, I’m learning new tools, exploring emerging tech trends, and finding ways to make the web a better place—one project at a time.
            </p>
            <div className="call-to-action">
              <Link className='btn btn-danger me-3' to="contact">Get In Touch</Link>
              <a className='btn btn-primary' href={cv} download={true} >Download CV</a>

            </div>
          </div>
        </div>
    </section>
  )
}

export default About
