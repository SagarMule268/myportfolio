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
        <section className="contact mt-5 " id="contact">
            <h3 className="subheading text-purple">Get In Touch</h3>
            <div className="container m-5">
                <form ref={form} onSubmit={handlesubmit}>
                    <div className="mb-3">
                        <label htmlFor="fname" className="form-label">Full Name</label>
                        <input type="text" className="form-control" name="name" id="fname" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" id="email"/>
                    </div>
                    <div className="mb-3 ">
                        <label htmlFor="mobile" className="form-label">Mobile No</label>
                        <input type="text" className="form-control" name="mobile" id="mobile"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea className="form-control" name="message" id="message"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Send Message</button>
                </form>
            </div>
        </section>
    )
}

export default Contact
