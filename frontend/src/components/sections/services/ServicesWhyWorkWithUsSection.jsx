import { motion } from "framer-motion"

import iconTailored from "../../../assets/Group.png"
import iconProblemSolving from "../../../assets/famicons_logo-web-component.png"
import iconTestedQuality from "../../../assets/carbon_carbon-ui-builder.png"
import iconLatestTech from "../../../assets/Group.png"
import iconSupport from "../../../assets/Vector.png"

const CONTAINER_BG = "#102040"

const viewport = { once: true, amount: 0.08 }
const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
}
const staggerItem = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const cards = [
  {
    title: "Tailored Solutions",
    description:
      "We don't use templates. Every website or system is designed around your business goals, users, and workflow for the best fit.",
    icon: iconTailored,
  },
  {
    title: "Problem Solving",
    description:
      "Our team thinks differently to find modern, smart ways to solve challenges and deliver results that stand out.",
    icon: iconProblemSolving,
  },
  {
    title: "Tested for Quality",
    description:
      "We test each feature carefully to ensure your solution is accurate, secure, fast, and ready to scale.",
    icon: iconTestedQuality,
  },
  {
    title: "Latest Technologies",
    description:
      "We build with cutting-edge tools and frameworks so your product stays future-ready and performs at its best.",
    icon: iconLatestTech,
  },
  {
    title: "Latest Technologies",
    description:
      "We build with cutting-edge tools and frameworks so your product stays future-ready and performs at its best.",
    icon: iconSupport,
  },
]

function FeatureCard({ title, description, icon }) {
  return (
    <motion.div
      variants={staggerItem}
      className="  md:w-[30%] mb-10 rounded-2xl bg-white p-6 md:p-8 md:py-18 flex flex-col font-sans"
    >
      <div className="w-12 h-12 md:w-20 md:h-20 mb-4 flex items-center justify-center">
        <img src={icon} alt="" className="max-w-full max-h-full object-contain" aria-hidden loading="lazy" decoding="async" />
      </div>
      <h3 className="text-3xl md:text-4xl font-semibold text-black mb-3 w-[60%]">{title}</h3>
      <p className="text-black text-sm md:text-base leading-relaxed">{description}</p>
    </motion.div>
  )
}

export function ServicesWhyWorkWithUsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="">
        <motion.div
          className="md:rounded-[50px] p-8 md:p-10 lg:p-12 "
          style={{ backgroundColor: CONTAINER_BG }}
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          variants={staggerContainer}
        >
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-10 md:py-20">
          <motion.h2
            variants={staggerItem}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white text-center mb-10 md:mb-20"
          >
            Why Work With Us
          </motion.h2>

          <motion.div
            className="flex flex-wrap gap-2 md:gap-10 justify-center"
            variants={staggerContainer}
          >
            {/* Row 1: 3 cards */}
            <FeatureCard
              title={cards[0].title}
              description={cards[0].description}
              icon={cards[0].icon}
            />
            <FeatureCard
              title={cards[1].title}
              description={cards[1].description}
              icon={cards[1].icon}
            />
            <FeatureCard
              title={cards[2].title}
              description={cards[2].description}
              icon={cards[2].icon}
            />
            {/* Row 2: 2 cards, left-aligned */}
            <FeatureCard
              title={cards[3].title}
              description={cards[3].description}
              icon={cards[3].icon}
            />
            <FeatureCard
              title={cards[4].title}
              description={cards[4].description}
              icon={cards[4].icon}
            />
          </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
