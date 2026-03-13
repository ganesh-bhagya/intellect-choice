import { AppLink } from "../../context/NavigationContext"
import { motion } from "framer-motion"

import imageSrc from "../../assets/Rectangle 83.webp"

const viewport = { once: true, amount: 0.12 }
const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
}
const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}
const imageReveal = {
  initial: { opacity: 0, scale: 0.98 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function BuildTogetherSection() {
  return (
    <motion.section
      className="flex flex-col lg:flex-row lg:mb-30"
      initial="initial"
      whileInView="animate"
      viewport={viewport}
      variants={staggerContainer}
    >
      {/* Left: image — ~2/3 width on desktop */}
      <motion.div
        variants={imageReveal}
        className="w-full lg:w-1/2 shrink-0 relative aspect-4/3 lg:aspect-auto lg:min-h-[480px] overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "tween", duration: 0.3 }}
      >
        <img
          src={imageSrc}
          alt="Team at Intellect Choice collaborating"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </motion.div>

      {/* Right: content — ~1/3 width, bg #E9EAE2 */}
      <motion.div
        variants={staggerContainer}
        className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 lg:pl-16 lg:pr-30 md:px-10 md:py-16 lg:px-12 lg:py-30"
        style={{ backgroundColor: "#E9EAE2" }}
      >
        <motion.h2
          variants={staggerItem}
          className="text-2xl md:text-5xl font-medium text-black leading-tight mb-4"
        >
          Let&apos;s Build Something Great Together
        </motion.h2>
        <motion.p
          variants={staggerItem}
          className="text-black text-sm md:text-lg font-medium leading-relaxed mb-8"
        >
          At Intellect Choice, we&apos;re ready to bring your ideas to life with innovative technology
          and creative expertise. Whether you&apos;re a startup or an enterprise, our team is here to
          help you reach your digital goals.
        </motion.p>
        <motion.div variants={staggerItem} className="flex flex-wrap gap-4">
          <AppLink to="/about">
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-gray-800 text-gray-900 font-semibold text-sm hover:bg-gray-100 transition-colors"
            >
              Learn More
            </motion.span>
          </AppLink>
          <AppLink to="/contact">
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-sm text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#002248" }}
            >
              Start a Project
            </motion.span>
          </AppLink>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
