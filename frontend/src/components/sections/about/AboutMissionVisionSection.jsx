import { motion } from "framer-motion"

import imgMissionVision from "../../../assets/Rectangle 121.webp"

const viewport = { once: true, amount: 0.12 }
const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
}
const staggerItem = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}
const imageReveal = {
  initial: { opacity: 0, scale: 0.97 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function AboutMissionVisionSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch"
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          variants={staggerContainer}
        >
          <motion.div
            variants={staggerItem}
            className="lg:w-[32%] rounded-3xl p-6 md:p-8 py-12 text-left min-w-0 flex flex-col justify-center"
            style={{ backgroundColor: "#CCD1D2" }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <h2 className="text-[40px] md:text-[50px] font-semibold text-black mb-4 text-center lg:text-center">
              Our Mission
            </h2>
            <p className="text-black text-base md:text-[16px] leading-relaxed text-center lg:text-center">
              To design and develop smart, reliable digital solutions that help businesses grow and
              succeed. We focus on innovation, strong quality standards, and building trusted
              long-term partnerships with every client we work with.
            </p>
          </motion.div>
          <motion.div
            variants={imageReveal}
            className="lg:w-[36%] rounded-3xl overflow-hidden min-w-0 shrink-0"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            <img
              src={imgMissionVision}
              alt="Two team members collaborating at a laptop"
              className="w-full h-full object-cover aspect-4/3 lg:aspect-auto lg:min-h-[320px]"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
          <motion.div
            variants={staggerItem}
            className="lg:w-[32%] rounded-3xl p-6 md:p-8 py-12 text-left min-w-0 flex flex-col justify-center"
            style={{ backgroundColor: "#CCD1D2" }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <h2 className="text-[40px] md:text-[50px] font-semibold text-black mb-4 text-center lg:text-center">
              Our Vision
            </h2>
            <p className="text-black text-base md:text-[16px] leading-relaxed text-center lg:text-center">
              To become a leading technology partner recognized for creating impactful, future-ready
              digital products. We aim to continuously evolve with modern trends, delivering solutions
              that add real value and shape the digital future of businesses worldwide.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
