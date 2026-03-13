import { motion } from "framer-motion"

import img1 from "../../../assets/Rectangle 102 2.webp"
import img2 from "../../../assets/Rectangle 103.webp"
import img3 from "../../../assets/Rectangle 104.webp"

const viewport = { once: true, amount: 0.15 }
const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}
const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const IMAGES = [
  { src: img1, alt: "Team member working on laptop in a modern workspace" },
  { src: img2, alt: "Collaboration in office with plants and modern setting" },
  { src: img3, alt: "Team discussion around a table in the office" },
]

export function AboutHeroSection() {
  return (
    <div className="flex max-w-7xl mx-auto">
      <div
        className="hidden md:block w-3 shrink-0 md:rounded-b-[60px] "
      />
      <section className="flex-1 bg-[#CCD1D2] md:rounded-b-[60px] overflow-hidden">
        <div className="mx-auto px-4 sm:px-6 lg:px-14 py-16 md:py-18">
          <motion.div
            className="text-center mb-14 md:mb-20"
            initial="initial"
            whileInView="animate"
            viewport={viewport}
            variants={staggerContainer}
          >
            <motion.h1
              variants={staggerItem}
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black uppercase mb-6"
            >
              About Intellect Choice
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="text-black text-base md:text-lg leading-relaxed max-w-3xl mx-auto"
            >
              Intellect Choice is a forward-thinking IT company dedicated to helping businesses grow
              through smart, modern, and scalable digital solutions. We blend creativity, technology,
              and strategy to build products that enhance experiences and drive real results.
            </motion.p>
          </motion.div>
          <motion.div
            className="flex w-full flex-row gap-2 md:gap-8"
            initial="initial"
            whileInView="animate"
            viewport={viewport}
            variants={staggerContainer}
          >
            {IMAGES.map((item, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="flex-1 rounded-3xl overflow-hidden"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover aspect-2/5 md:aspect-3/4"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
