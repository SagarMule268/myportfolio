import hr from '../assets/hr.jpg'
import cab from '../assets/cab.jpg'
import stock from '../assets/stock.jpg'
const Projects = () => {

   const myProjects = [
  {
    title: "HR Portal",
    description: "A web-based HR management system for employee onboarding, leave tracking, and payroll processing.",
    image: hr,
    demoLink: "https://your-hr-portal-demo.com",
    codeLink: "https://github.com/yourusername/hr-portal"
  },
  {
    title: "Cab Booking System",
    description: "An online cab booking platform with real-time driver availability and fare estimation.",
    image:cab,
    demoLink: "https://your-cab-booking-demo.com",
    codeLink: "https://github.com/yourusername/cab-booking"
  },
  {
    title: "Stock API Dashboard",
    description: "A dashboard fetching live stock market data using a REST API",
    image:stock,
    demoLink: "https://your-stockapi-demo.com",
    codeLink: "https://github.com/yourusername/stockapi-dashboard"
  }
];
 
  return (
    <section id='projects'className="projects mx-4" >
        <h3 className="subheading text-purple">Projects</h3>
        <div className="container">
         
         <div className="row">
            {
                myProjects.map((pro)=>(
                    <div className="col-12 col-md-4 col-sm-6">
                        <div className="card mt-2">
                            <img  src={pro.image} alt="" />
                            <div className="card-body">
                                 <h5 className="card-title">{pro.title}</h5>
                                <p className="card-text"> {pro.description} </p>
                                <a href={pro.demoLink} className="btn btn-primary">View  </a>
                            </div>
                        </div>

                    </div>
                ))
            }


         </div>
    
      </div>
    </section>
  )
}

export default Projects
