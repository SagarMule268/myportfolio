import { motion } from "framer-motion"
import { styles } from "../style";
import { certification } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn ,textVariant } from "../utils/motion";
import { useState } from "react"; 
const CertificateCard = ({index ,cert ,setSelectedCert } ) =>{
    

    return (
        
             <motion.div
             variants={fadeIn("down", "spring", index * 0.5, 0.75)}
              key={index}
              onClick={() => setSelectedCert(cert)}
              className="green-pink-gradient p-[1px] rounded-2xl shadow-card border hover:shadow-md transition cursor-pointer flex flex-col md:flex-row justify-between items-center "
            >
              {/* Left Side */}
              <div
                    options={{
                max: 45,
                scale: 1,
                speed: 450,
                }}
              className=" w-full flex items-center rounded-2xl bg-tertiary gap-4 p-2">
                {/* Certificate Image */}
                <div className="w-30 h-[100px] flex flex-col items-center justify-center border rounded-md overflow-hidden shadow-sm">
                  <img
                    src={cert.cert_image}
                    alt={cert.name}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Certificate Details */}
                <div>
                  <h2 className="font-semibold text-lg">{cert.name}</h2>
                  <p className="text-gray-500 text-sm">{cert.date}</p>
                  <p className="text-gray-500 font-semibold">Certification Code: {cert.certification_code}</p>
                </div>
              </div>
                
             
            </motion.div>
        
    )
}


const Certification = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const openModal = (cert) => {
    setSelectedCert(cert)
     
    };
  const closeModal = () => setSelectedCert(null);
   
  if(selectedCert){
    document.body.style.overflow = 'hidden';
  }else{
    document.body.style.overflow = '';

  }

  return (
    <>
          <motion.div className="" variants={textVariant()}>
            <p className={styles.sectionSubText}>Validated Technical Expertise</p>
            <h2 className={styles.sectionHeadText}>Certifications</h2>
          </motion.div>
    
          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
          >
            A showcase of industry-recognized certifications that demonstrate my proficiency in IT technologies, tools, and best practices. Each certification reflects my commitment to continuous learning and professional excellence in the tech domain.
          </motion.p>
    
           <div className="  py-10 px-5 font-sans">
      <div className="mt-20 flex flex-col gap-10">
       

       
          {certification.map((cert ,index) => (
            <CertificateCard key={index} index={index} setSelectedCert={setSelectedCert} cert={cert}  />
          ))}
       
      </div>

      {/* Modal */}
      {selectedCert && (
        <div className="fixed inset-0 top-12  bg-black bg-opacity-60 flex items-center justify-center z-60">
          <div className="bg-tertiary rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 overflow-hidden">
            <div className="flex justify-between items-center border-b px-5 py-3 ">
              <h2 className="text-xl font-semibold">{selectedCert.name}</h2>
             
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-200 text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="p-5 overflow-auto max-h-[80vh]">
            <img
                src={selectedCert.cert_image}
                title={selectedCert.name}
                className="w-full max-h-[80vh] max-w-full  rounded object-contain"
                loading="lazy"
            />
            </div>
          </div>
        </div>
      )}
    </div>
        </>
  )
}

export default SectionWrapper(Certification , "certification")
