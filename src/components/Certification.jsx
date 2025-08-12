import first from '/certificates/Build Strong MERN Foundation.pdf'
import second from '/certificates/Design a Dynamic Frontend with React.pdf'
import third from '/certificates/Full Stack Developer - MERN Stack.pdf'
import fourth from '/certificates/java_Certificate.pdf'
import fifth from '/certificates/java_Certificate.pdf'
const Certification = () => {
  const certificate = [{
    title: "Build a strong MERN Foundation",
    pdf: first
  },
  {
    title: "Design a Dynamic Frontend with React",
    pdf: second
  },
  {
    title: "Full Stack Developer - MERN Stack",
    pdf: third
  },
  {
    title: "Java Certificate",
    pdf: fourth
  },
  {
    title: "Internship Certificate",
    pdf: fifth
  }
  ]
  return (
    <section id='certificates' className='certification-section mx-4 pt-md-5 pt-sm-5'>
      <h3 className='subheading text-purple'>Certifications</h3>
      <div className="container">
        <div className="row">
          {
            certificate.map((cert) => (
              <div class="col-12 col-md-4 col-sm-6 mb-3 ">
                <div className="card text-center mb-2 align-middle p-4">
                  <div className="card-body">
                    <h5 className="card-title  mb-4">{cert.title} </h5>
                    <a href={cert.pdf} target='_blank' className="btn btn-primary text-center">View Certificate</a>
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

export default Certification
