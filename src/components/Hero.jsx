import me from '../assets/srm.jpg'
import cv from '/certificates/SAGARMULE_resume.pdf'
import { Link } from 'react-scroll'
const Hero = () => {
    return (
        <section className='hero' id='home' >
            <div className="row align-items-end">
                <div className="col-12 col-sm-7 order-2   col-md-7 intro px-5 px-md-0 px-sm-0">
                    <h4>Hello, I'm Sagar Mule 👋</h4>
                    <h1><span className='text-purple'>FullStack</span>  <br />
                        Developer</h1>
                    <p>A passionate Full-Stack Developer crafting responsive websites and web apps using the MERN stack.</p>
                    
                   
                        <a href="https://twitter.com/yourusername" className="text-dark mx-2" target="_blank" rel="noopener noreferrer">
                            <i className="fa-solid fa-envelope"></i>

                        </a>
                        <a href="https://github.com/SagarMule268" className="text-dark mx-2" target="_blank" rel="noopener noreferrer">

                            <i class="fa-brands fa-github"></i>


                        </a>
                        <a href="https://linkedin.com/in/sagarmule" className="text-dark mx-2" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-linkedin"></i>

                        </a>
                        <a href="https://facebook.com/sagar.mule.52035" className="text-dark mx-2" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-facebook"></i>

                        </a>
                        <a href="https://instagram.com/sagar__75175" className="text-dark mx-2" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-instagram"></i>

                        </a>

                    
                    <div className="call-to-action mt-3 order-1 ">
                        <Link className='btn btn-danger me-3' to="contact">Get In Touch</Link>
                        <a className='btn btn-primary' href={cv} download={true} >Download CV</a>


                    </div>
                </div>
                <div className="col-12  col-sm-5 col-md-5 profile-section">
                    <div className='px-0  '>
                        <img className='profile' src={me} alt="" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
