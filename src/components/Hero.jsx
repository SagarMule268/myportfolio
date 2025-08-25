import me from '../assets/final.png'
import cv from '/certificates/SAGARMULE_resume.pdf'
import { Link } from 'react-scroll'
const Hero = () => {
    return (
        <section className='hero d-flex flex-column justify-content-center ' id='home' >
           
                <div className="col-12 text-center intro ">
                    <h4>Hello, I'm Sagar Mule 👋</h4>
                    <h1><span className='text-purple mx-4'>FullStack</span>  
                        Developer</h1>
                    <p>A passionate Full-Stack Developer crafting responsive websites and web apps using the MERN stack</p>
                    
                        <div>
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

                        </div>
                       
                    
                    <div className="call-to-action mt-3  ">
                        <Link className='btn btn-danger me-3' to="contact">Get In Touch</Link>
                        <a className='btn text-white custom-button '  href={cv} download={true} >Download CV</a>


                    </div>
                </div>
                
          
        </section>
    )
}

export default Hero
