import { motion } from "framer-motion"
import { AppLink } from "../../context/NavigationContext"

import aboutImg1 from "../../assets/Rectangle 60.webp"
import aboutImg2 from "../../assets/Rectangle 63.webp"
import aboutImg3 from "../../assets/Rectangle 64.webp"
import aboutImg4 from "../../assets/Rectangle 65.webp"

const COLUMNS = [
  {
    title: "At a Glance",
    description:
      "Intellect Choice is a trusted global IT partner delivering smart, scalable, and innovative digital solutions.",
    image: aboutImg1,
    imageAlt: "Team at Intellect Choice",
    imageFirst: true,
  },
  {
    title: "2021",
    description:
      "Year Founded — Built on a vision to empower businesses through intelligent digital innovation.",
    image: aboutImg4,
    imageAlt: "Collaboration at Intellect Choice",
    imageFirst: false,
  },
  {
    title: "30+",
    description:
      "Global Clients — Partnered with businesses from startups to enterprises across various regions.",
    image: aboutImg2,
    imageAlt: "Team at Intellect Choice",
    imageFirst: true,
  },
  {
    title: "25+",
    description:
      "Skilled Professionals — A dynamic team of developers, designers, and strategists dedicated to excellence.",
    image: aboutImg3,
    imageAlt: "Collaboration at Intellect Choice",
    imageFirst: false,
  },
]

// Mobile: each row = image + content box (side by side)
const cardClassBase =
  "md:p-6 p-4 rounded-4xl flex-1 flex flex-col min-h-0 text-start justify-center lg:min-h-0"
const imageWrapperClass =
  "rounded-4xl overflow-hidden bg-white aspect-[4/3] lg:aspect-[3/5] min-h-0 shrink-0 w-full"
const imageWrapperClassMobile =
  "rounded-4xl overflow-hidden bg-white aspect-[3/5] min-h-0 shrink-0 w-[49%] lg:w-full"

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
const imageReveal = {
  initial: { opacity: 0, scale: 0.96 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}
const cardReveal = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}
const columnStagger = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

export function AboutSection() {
  return (
    <motion.section
      className="py-16 md:py-24 bg-white font-sans"
      initial="initial"
      whileInView="animate"
      viewport={viewport}
      variants={staggerContainer}
    >
      <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" variants={staggerContainer}>
        {/* Header: title + intro + Explore More */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-start gap-8 mb-12 lg:mb-16"
          variants={staggerContainer}
        >
          <motion.h2
            variants={staggerItem}
            className="text-3xl md:text-[60px] font-semibold text-black w-[65%] lg:w-[45%] lg:shrink-0"
          >
            About Intellect Choice
          </motion.h2>
          <motion.div className="lg:w-[55%]" variants={staggerContainer}>
            <motion.p
              variants={staggerItem}
              className="text-black mb-6 text-xs md:text-[18px] leading-[19px] max-w-2xl"
            >
              At Intellect Choice, we take pride in our journey of innovation and growth. With a
              passionate team and a global vision, we&apos;ve helped businesses transform through
              intelligent technology and creative solutions.
            </motion.p>
            <AppLink to="/about">
              <motion.button
                variants={staggerItem}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-primary text-white md:px-8 px-10 md:py-3 py-2 rounded-full font-semibold text-[18px] hover:bg-primary-dark transition-colors"
              >
                Explore More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </motion.button>
            </AppLink>
          </motion.div>
        </motion.div>

        {/* Mobile: each row = image + content box side by side */}
        <motion.div
          className="flex flex-col gap-6 lg:hidden"
          variants={staggerContainer}
        >
          {COLUMNS.map((col, index) => {
            const cardBg = index % 2 === 0 ? "#F4F4F4" : "#D6E3F2"
            const imageBlock = (
              <motion.div
                variants={imageReveal}
                className={imageWrapperClassMobile}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "tween", duration: 0.25 }}
              >
                <img src={col.image} alt={col.imageAlt} className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </motion.div>
            )
            const cardBlock = (
              <motion.div
                variants={cardReveal}
                className={`${cardClassBase} min-w-0`}
                style={{ backgroundColor: cardBg }}
              >
                <h3 className="text-4xl md:text-4xl font-semibold text-black mb-1 font-petrona">{col.title}</h3>
                <p className="text-gray-600 text-sm md:text-sm leading-relaxed">{col.description}</p>
              </motion.div>
            )
            return (
              <motion.div
                key={col.title}
                variants={staggerItem}
                className="flex flex-row gap-3 items-stretch w-full"
              >
                {col.imageFirst ? (
                  <>
                    {imageBlock}
                    {cardBlock}
                  </>
                ) : (
                  <>
                    {cardBlock}
                    {imageBlock}
                  </>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        {/* Desktop: four columns */}
        <motion.div
          className="hidden lg:flex flex-row gap-8 items-stretch"
          variants={staggerContainer}
        >
          {COLUMNS.map(({ title, description, image, imageAlt, imageFirst }, index) => {
            const cardBg = index % 2 === 0 ? "#F4F4F4" : "#D6E3F2"
            return (
            <motion.div
              key={title}
              variants={columnStagger}
              className="w-full lg:flex-1 lg:min-w-0 flex flex-col space-y-6 min-h-0"
            >
              {imageFirst ? (
                <>
                  <motion.div
                    variants={imageReveal}
                    className={imageWrapperClass}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "tween", duration: 0.25 }}
                  >
                    <img src={image} alt={imageAlt} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </motion.div>
                  <motion.div variants={cardReveal} className={cardClassBase} style={{ backgroundColor: cardBg }}>
                    <h3 className="text-6xl font-semibold text-black mb-2 font-petrona">{title}</h3>
                    <p className="text-black text-sm font-medium leading-relaxed">{description}</p>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div variants={cardReveal} className={cardClassBase} style={{ backgroundColor: cardBg }}>
                    <h3 className="text-6xl font-semibold text-black mb-2 font-petrona">{title}</h3>
                    <p className="text-black text-sm font-medium leading-relaxed">{description}</p>
                  </motion.div>
                  <motion.div
                    variants={imageReveal}
                    className={imageWrapperClass}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "tween", duration: 0.25 }}
                  >
                    <img src={image} alt={imageAlt} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </motion.div>
                </>
              )}
            </motion.div>
          )})}
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
