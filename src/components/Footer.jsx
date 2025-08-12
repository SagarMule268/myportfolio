import {Link} from 'react-scroll';

const Footer = () => {
  return (
    <footer className='container footer-sec mx-4' >
       <div className="row">
         <div className="col-md-4 text-center text-md-start mb-3 mb-md-0 ">
           
            <p className="mb-0">© {new Date().getFullYear()} Sagar Mule | All Rights Reserved.</p>
            
    
        </div>
         <div className="col-md-4 text-center text-md-start mb-3 mb-md-0 ">
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
            <p className='pt-2'>
                Email: Sagarrm268@gmail.com |
                Mobile No: 7517553167
            </p>
        </div>
         <div className="col-md-4 text-center text-md-start mb-3 mb-md-0 ">
           
           <Link to="home" className="text-dark mx-2">Home</Link>
            <Link to="about" className="text-dark mx-2">About</Link>
            <Link to="projects" className="text-dark mx-2">Projects</Link>
            <Link to="contact" className="text-dark mx-2">Contact</Link>
    
        </div>
       </div>
    </footer>
  )
}

export default Footer
