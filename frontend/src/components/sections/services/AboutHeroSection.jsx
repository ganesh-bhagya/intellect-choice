import { motion } from "framer-motion"

import heroImage from "../../../assets/Rectangle 126.webp"

const viewport = { once: true, amount: 0.2 }
const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}
const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function ServicesHeroSection() {
  return (
    <div className="max-w-7xl mx-auto ">
      <motion.section
        className=" overflow-hidden  md:rounded-b-[60px] bg-[#E8EAEC] min-h-0"
        initial="initial"
        whileInView="animate"
        viewport={viewport}
        variants={staggerContainer}
      >
        <div className="p-6 md:p-10 lg:p-12">
          {/* Title and description: side-by-side on large screens */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-8 md:mb-10">
            <motion.h1
              variants={staggerItem}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-black uppercase text-center md:text-left tracking-tight lg:col-span-5"
            >
              Our Services
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="text-black text-base md:text-lg md:leading-[19px] text-center md:text-right lg:col-span-7"
            >
              At Intellect Choice, we provide complete digital solutions to help businesses grow,
              modernize, and stand out. From strategy to design, development, and long-term support
              — we handle everything end-to-end.
            </motion.p>
          </div>

          {/* Full-width hero image */}
          <motion.div
            variants={staggerItem}
            className="rounded-2xl overflow-hidden w-full"
          >
            <img
              src={heroImage}
              alt="Professional at desk with laptop"
              className="w-full h-auto object-cover aspect-video md:aspect-21/9"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
