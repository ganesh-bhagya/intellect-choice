import { motion } from "framer-motion"

import imgCustomized from "../../../assets/Rectangle 114.webp"
import imgQuality from "../../../assets/Rectangle 115.webp"
import imgIdeas from "../../../assets/Rectangle 118.webp"
import imgSupport from "../../../assets/Rectangle 119.webp"

const CARD_BG = "#CCD1D2"

const viewport = { once: true, amount: 0.1 }
const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
}
const staggerItem = {
  initial: { opacity: 0, y: 22 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}
const cardReveal = {
  initial: { opacity: 0, y: 26 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}
const imageReveal = {
  initial: { opacity: 0, scale: 0.97 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const cards = [
  {
    title: "CUSTOMIZED WORK",
    description:
      "Every project is uniquely crafted for your business needs, never reused or generic.",
    image: imgCustomized,
    alt: "Designer sketching UI/UX wireframes",
  },
  {
    title: "HIGH-QUALITY OUTPUT",
    description:
      "Our solutions are secure, fast, scalable, and tested to meet top standards.",
    image: imgQuality,
    alt: "Team member working on laptop",
  },
  {
    title: "SMART, CREATIVE IDEAS",
    description:
      "We apply fresh thinking and strategy to solve problems in better ways.",
    image: imgIdeas,
    alt: "Team collaborating in office",
  },
  {
    title: "RELIABLE LONG-TERM SUPPORT",
    description:
      "After launch, we stay available for updates, fixes, and continuous improvement.",
    image: imgSupport,
    alt: "Team member reviewing project at desk",
  },
]

export function AboutWhyChooseUsSection() {
  return (
    <section className="py-8 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: title left, description right — two-column layout */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-start gap-8 mb-12 md:mb-16"
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          variants={staggerContainer}
        >
          <motion.h2
            variants={staggerItem}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black lg:w-[45%] lg:shrink-0 leading-tight"
          >
            Why Choose Us
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-black text-base md:text-lg md:text-right lg:w-[55%] text-left"
          >
            We deliver end-to-end digital services: websites, web and mobile apps, UI/UX design,
            prototyping, and custom software, plus reliable maintenance and long-term support for
            growing businesses of all sizes.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          variants={staggerContainer}
        >
          {cards.map((card) => (
            <motion.article
              key={card.title}
              variants={cardReveal}
              className="rounded-2xl overflow-hidden flex sm:flex-row min-h-0"
              style={{ backgroundColor: CARD_BG }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="w-[50%] md:w-[40%] p-6 md:p-8 flex flex-col">
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-wide text-black mb-3">
                  {card.title}
                </h3>
                <p className="text-black text-sm md:text-base leading-relaxed">{card.description}</p>
              </div>
              <motion.div
                variants={imageReveal}
                className="w-[50%] md:w-[60%] shrink-0 sm:aspect-3/5 overflow-hidden"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "tween", duration: 0.25 }}
              >
                <img
                  src={card.image}
                  alt={card.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
