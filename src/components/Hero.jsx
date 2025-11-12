import { motion } from "framer-motion";
import { styles } from "../style";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      {/* Centered container */}
      <div className="absolute inset-0 top-[102px] flex justify-center mb-2">
        <div
          className={`max-w-7xl w-full ${styles.paddingX} flex flex-row items-start gap-5`}
        >
          {/* Left accent line */}
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
            <div className="w-1 sm:h-80 h-40 violet-gradient" />
          </div>

          {/* Hero Text */}
          <div>
            <h1 className={`${styles.heroHeadText} text-white`}>
              Hi, I’m <span className="text-[#915EFF]">Sagar</span>
            </h1>

            <p className={`${styles.heroSubText} mt-2 text-white-100`}>
              A passionate Full-Stack Developer <br className="sm:block hidden" />
              crafting responsive websites and web apps using the MERN stack
            </p>
          </div>
        </div>
      </div>

      {/* 3D model background */}
     
       <ComputersCanvas />
    

      {/* Scroll indicator */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-16 rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
