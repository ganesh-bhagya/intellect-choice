import { motion } from "framer-motion"

import imgLeft from "../../../assets/Rectangle 106.webp"
import imgRight from "../../../assets/Rectangle 107.webp"

const CARD_BG = "#002248"

const viewport = { once: true, amount: 0.1 }
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

function Card({ title, children }) {
  return (
    <motion.div
      variants={staggerItem}
      className="rounded-2xl p-6 md:p-8 text-white"
      style={{ backgroundColor: CARD_BG }}
    >
      <h3 className="text-lg md:text-[22px] font-semibold uppercase  mb-3">{title}</h3>
      <p className="text-white text-xs md:text-sm  leading-relaxed">{children}</p>
    </motion.div>
  )
}

export function AboutHowWeDoSection() {
  return (
    <section className="py-8 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-6xl font-semibold text-black  mb-12 md:mb-16"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.4 }}
        >
          How We Do Things
        </motion.h2>

        <motion.div
          className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch"
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          variants={staggerContainer}
        >
          {/* Left column: image, then two cards */}
          <div className="flex flex-col gap-6 lg:w-1/2">
            <motion.div
              variants={staggerItem}
              className="rounded-2xl overflow-hidden shrink-0"
            >
              <img
                src={imgLeft}
                alt="Team collaborating around a table"
                className="w-full h-full object-cover aspect-4/3"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
            <Card title="QUALITY & TESTING">
              We thoroughly test each part of your solution to ensure that the application is fully
              functional and accurate, thus we will be able to achieve the quality that we expect.
              Not only that, but also we test the entire solution as a whole to ensure performance,
              security and scalability.
            </Card>
            <Card title="MODERN TECH & SUPPORT">
              We always use the most cutting edge technologies so that our clients will get the
              maximum benefits and we offer long term client support services.
            </Card>
          </div>

          {/* Right column: two cards, then image */}
          <div className="flex flex-col gap-6 lg:w-1/2">
            <Card title="TAILORED SOLUTIONS FOR YOUR BUSINESS.">
              Your solution is tailored to you. We aim to understand your business in and out first.
              Once we understand your requirement, we are ready to design your solution.
            </Card>
            <Card title="INNOVATIVE APPROACH">
              We focus on thinking outside of the box as we design your solution so you will get the
              most innovative solution that we can offer; you will be kept up to date with the
              project status.
            </Card>
            <motion.div
              variants={staggerItem}
              className="rounded-2xl overflow-hidden shrink-0"
            >
              <img
                src={imgRight}
                alt="Team reviewing a document at a desk"
                className="w-full h-full object-cover aspect-4/3"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
