import hr from '../assets/hr.jpg'
import cab from '../assets/cab.jpg'
import stock from '../assets/stock.jpg'
import anime from '../assets/anime.jpg'
const Projects = () => {

   const myProjects = [
  {
    title: "HR Portal",
    description: "A web-based HR management system for employee onboarding, leave tracking, and payroll processing.",
    image: hr,
    demoLink: "",
    codeLink: ""
  },
  {
    title: "Cab Booking System",
    description: "An online cab booking platform with real-time driver availability and fare estimation.",
    image:cab,
    demoLink: "",
    codeLink: "https://github.com/SagarMule268/cabBooking_Service"
  },
  {
    title: "Stock API Dashboard",
    description: "A dashboard fetching live stock market data using a REST API",
    image:stock,
    demoLink: "",
    codeLink: "http://github.com/SagarMule268/stockapi"
  },
  {
    title: "Anime Explorer",
    description: "A website which allows users to search and explore various anime series and movies.",
    image:anime,
    demoLink: "https://sagarmule268.github.io/anime-expo",
    codeLink: "https://github.com/SagarMule268/anime-expo"
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
                                <a href={pro.codeLink} target='_blank' className="btn btn-primary">View Source Code  </a>
                                {pro.demoLink && <a href={pro.demoLink}  target='_blank' className="btn custom-button text-white ms-2">Live Demo</a>}
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
