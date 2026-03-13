import { motion } from "framer-motion"

import bgStats from "../../assets/Rectangle 78.webp"
import bgTeam from "../../assets/Rectangle 79.webp"

const ACCENT_BLUE = "#2E85F6"

const viewport = { once: true, amount: 0.12 }
const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
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
const cardReveal = {
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}
const avatarStagger = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
}
const avatarItem = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function ServicesSection() {
  return (
    <motion.section
      className="py-8 md:py-24 bg-white"
      initial="initial"
      whileInView="animate"
      viewport={viewport}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: heading left, description right */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-12 lg:mb-16"
          variants={staggerContainer}
        >
          <motion.h2
            variants={staggerItem}
            className="text-3xl md:text-[48px] font-semibold text-black lg:w-[58%] lg:shrink-0 leading-tight"
          >
            Empowering Businesses with Next-Level IT Services
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-black text-base md:text-right md:text-lg lg:w-[38%] leading-[19px]"
          >
            At Intellect Choice, we offer a wide range of IT services designed to help your business
            grow and stay ahead in the digital world. Our team of creative minds and technical
            experts work together to deliver unique, reliable, and user-friendly solutions.
          </motion.p>
        </motion.div>

        {/* Two cards */}
        <motion.div
          className="flex flex-col lg:flex-row gap-6 lg:gap-8"
          variants={staggerContainer}
        >
          {/* Left card: stats with background image */}
          <motion.div
            variants={cardReveal}
            className="relative rounded-4xl overflow-hidden min-h-[320px] md:min-h-[380px] flex flex-col justify-between px-6 md:px-8 py-6 md:py-10 md:pt-16 text-white w-full lg:w-[30%] lg:min-w-0"
            style={{ backgroundImage: `url(${bgStats})`, backgroundSize: "cover", backgroundPosition: "center" }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            <div>
              <p className="text-5xl md:text-6xl font-semibold font-sans tracking-tight">123 +</p>
              <p className="text-white/90 text-sm md:text-base mt-2">Projects finish with superbly</p>
            </div>
            <motion.div
              className="flex items-center gap-0 mt-6"
              variants={avatarStagger}
            >
              {/* Overlapping profile circles */}
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  variants={avatarItem}
                  className="w-10 h-10 rounded-full border-2 border-white bg-gray-600 -ml-3 first:ml-0 flex items-center justify-center text-xs font-semibold"
                  style={{ zIndex: 5 - i }}
                >
                  {i}
                </motion.div>
              ))}
              <motion.div
                variants={avatarItem}
                className="w-10 h-10 rounded-full -ml-3 flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: ACCENT_BLUE, zIndex: 1 }}
              >
                +
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right card: team photo + HOW WE WORK + play button */}
          <motion.div
            variants={cardReveal}
            className="relative rounded-4xl overflow-hidden min-h-[260px] sm:min-h-[320px] md:min-h-[380px] w-full lg:w-[70%] lg:min-w-0"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            <img
              src={bgTeam}
              alt="Intellect Choice team collaborating"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-black/40" />
            <h3 className="absolute inset-0 flex items-center justify-center text-2xl md:text-[42px] font-semibold  text-white uppercase tracking-wider z-10">
              How We Work
            </h3>
            <div className="absolute -bottom-4 -right-4  z-10">
  <motion.div
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center shadow-xl"
  >
    <div
      className="w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center"
      style={{ backgroundColor: ACCENT_BLUE }}
    >
      <svg
        className="w-6 h-6 md:w-7 md:h-7 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M8 5v14l11-7L8 5z" />
      </svg>
    </div>
  </motion.div>
</div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
