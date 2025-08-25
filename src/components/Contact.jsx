import emailjs from "emailjs-com";
import { useRef } from "react";
const Contact = () => {
    const form =useRef();
    const handlesubmit =(e)=>{
        e.preventDefault();
        emailjs.sendForm(
            "service_ywdzu79",
            "template_fa2ai6u",
            form.current,
            "qumM80e21kJfALnpH"
        ).then((result)=>{
                alert("message sent successfully");
                console.log('text',result.text);
                console.log('status',result.status)
        },(error)=>{
            console.log(error)
        })
    }
    return (
        <section className="contact mt-5 p-5  " id="contact">
            <div className="container p-5 d-flex justify-content-center ">
            <div className="border border-white bg-transparent form-container " >
                <h3 className="subheading text-purple">Get In Touch</h3>
              <form ref={form} onSubmit={handlesubmit}>
                    <div className="mb-3 ">
                        <label htmlFor="fname" className="form-label">Full Name</label>
                        <input type="text" className="form-control bg-dark bg-opacity-50  border border-dark" name="name" id="fname" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control bg-dark" name="email" id="email"/>
                    </div>
                    <div className="mb-3 ">
                        <label htmlFor="mobile" className="form-label">Mobile No</label>
                        <input type="text" className="form-control bg-dark" name="mobile" id="mobile"/>
                    </div>
                    <div className="mb-3 ">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea className="form-control bg-dark" name="message" id="message"></textarea>
                    </div>
                    <div className="mb-3 ">
                    <button type="submit" className="btn btn-primary text-white custom-button " style={{width:"100%"}} >Send Message</button>

                    </div>
                </form>
            </div>
              
           
            </div>
        </section>
    )
}

export default Contact
