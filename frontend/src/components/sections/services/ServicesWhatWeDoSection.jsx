import { motion } from "framer-motion"

import imgOffice from "../../../assets/98e87b360c965d45784f41dd136a9e360b43d486.jpg"
import imgTeam from "../../../assets/Rectangle 138.webp"

const SECTION_BG = "#D9D9D9"

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
const imageReveal = {
  initial: { opacity: 0, scale: 0.98 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const cards = [
  { title: "CONSULTING", description: "Once we understand your business, we can help you strategize a design for your business." },
  { title: "UX/UI DESIGN", description: "We deliver the proper designs utilizing all relevant standards and best practices." },
  { title: "WEB APPS", description: "We aim to provide sleek and intuitive web applications that are aesthetically pleasing and delightful to use." },
  { title: "MOBILE APPS", description: "Beautiful and engaging mobile applications with the latest technologies. We provide mobile solutions that are robust and reliable." },
  { title: "E-COMMERCE APPS", description: "Leverage our ecommerce solutions to discover new profit pools. Take your business to the next level." },
  { title: "CUSTOM APPS", description: "We provide custom software solutions that are tailored to your individual requirements with features that go beyond the traditional methods." },
]

function Card({ title, description }) {
  return (
    <motion.div
      variants={staggerItem}
      className="rounded-2xl p-6 md:p-8 py-16 md:py-8 flex flex-col justify-center min-h-[140px] w-full flex-1"
      style={{ backgroundColor: SECTION_BG }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <h3 className="text-lg md:text-3xl font-bold uppercase tracking-wide text-black mb-3 text-center">
        {title}
      </h3>
      <p className="text-black text-[12px] font-medium md:text-[14px] leading-relaxed text-center">{description}</p>
    </motion.div>
  )
}

export function ServicesWhatWeDoSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: title + subtitle */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-10 md:mb-12"
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          variants={staggerContainer}
        >
          <motion.h2
            variants={staggerItem}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black lg:col-span-4"
          >
            What We Do
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-gray-700 text-base md:text-lg leading-relaxed lg:col-span-8"
          >
            We provide complete digital solutions to help businesses grow and work smarter. From design to development and ongoing support, we deliver high-quality products tailored to your needs.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col w-full"
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          variants={staggerContainer}
        >
          <motion.div className="flex flex-col md:flex-row justify-between items-stretch gap-6 mb-6" variants={staggerItem}>
            <motion.div
              variants={imageReveal}
              className="w-full md:w-[40%] flex flex-col rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <img src={imgTeam} alt="Team in meeting at office" className="w-full h-full object-cover rounded-2xl min-h-[280px] md:min-h-0" loading="lazy" decoding="async" />
            </motion.div>
            <motion.div
              className="flex flex-col md:w-[60%] flex-1 gap-6 min-h-0"
              variants={staggerContainer}
            >
              <motion.div className="flex flex-row gap-6 md:flex-1 min-h-0" variants={staggerContainer}>
                <Card title={cards[0].title} description={cards[0].description} />
                <Card title={cards[1].title} description={cards[1].description} />
              </motion.div>
              <motion.div className="flex flex-row gap-6 md:flex-1 min-h-0" variants={staggerContainer}>
                <Card title={cards[2].title} description={cards[2].description} />
                <Card title={cards[3].title} description={cards[3].description} />
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div className="flex flex-col-reverse md:flex-row justify-between items-stretch gap-6" variants={staggerItem}>
            <motion.div
              className="flex flex-col md:w-[60%] flex-1 min-h-0"
              variants={staggerContainer}
            >
              <motion.div className="flex flex-row gap-6 md:flex-1 min-h-0" variants={staggerContainer}>
                <Card title={cards[4].title} description={cards[4].description} />
                <Card title={cards[5].title} description={cards[5].description} />
              </motion.div>
            </motion.div>
            <motion.div
              variants={imageReveal}
              className="w-full md:w-[40%] flex flex-col rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <img src={imgOffice} alt="Professional at desk with monitor and phone" className="w-full h-full object-cover rounded-2xl aspect-4/5" loading="lazy" decoding="async" />
            </motion.div>
          </motion.div>
        </motion.div>

       
      </div>
    </section>
  )
}
