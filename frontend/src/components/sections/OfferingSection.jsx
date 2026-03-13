import { motion } from "framer-motion"

import imgConsulting from "../../assets/Rectangle 99.png"
import imgMobile from "../../assets/Rectangle 97.png"
import imgEcommerce from "../../assets/Rectangle 101.png"
import imgCustom from "../../assets/Rectangle 95.png"
import imgWeb from "../../assets/Rectangle 93.png"
import imgUx from "../../assets/Rectangle 91.png"

const GRID_ITEMS = [
  {
    id: "consulting",
    title: "IT CONSULTING",
    description: "We provide expert IT guidance to help you choose the right technology, and achieve your business goals faster.",
    src: imgConsulting,
  },
  {
    id: "mobile",
    title: "MOBILE APPS",
    description: "We develop powerful Android and iOS mobile applications designed for smooth performance and exceptional user experience.",
    src: imgMobile,
  },
  {
    id: "ecommerce",
    title: "E-COMMERCE APPS",
    description: "We create secure, feature-rich e-commerce platforms that help you attract more customers and increase online sales.",
    src: imgEcommerce,
  },
  {
    id: "custom",
    title: "CUSTOM APPS",
    description: "We develop fully customized software solutions built around your unique business needs — flexible, reliable, and future-ready.",
    src: imgCustom,
  },
  {
    id: "web",
    title: "WEB APPS",
    description: "We build responsive and high-performance web applications tailored to your workflow, delivering speed, security, and scalability.",
    src: imgWeb,
  },
  {
    id: "uxui",
    title: "UI/UX DESIGN",
    description: "We craft modern user interfaces and intuitive experiences that delight users and elevate your digital brand.",
    src: imgUx,
  },
]

const viewport = { once: true, amount: 0.1 }
const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
}
const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}
const cardReveal = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function OfferingSection() {
  return (
    <motion.section
      className="py-10 md:py-24 bg-white font-sans"
      initial="initial"
      whileInView="animate"
      viewport={viewport}
      variants={staggerContainer}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col lg:flex-row lg:items-start gap-8 mb-12 lg:mb-16"
          variants={staggerContainer}
        >
          <motion.h2
            variants={staggerItem}
            className="text-3xl md:text-[48px] font-semibold text-black lg:w-[60%] lg:shrink-0 leading-tight uppercase"
          >
            What we&apos;re offering  <br className="hidden md:block" /> to our customers
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-black md:text-right text-sm md:text-lg  leading-[19px]"
          >
            At Intellect Choice, we deliver innovative digital solutions to help your business grow.
            From responsive websites and mobile apps to creative UI/UX designs, custom software, and
            digital marketing — we combine technology and creativity to bring your ideas to life.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 auto-rows-fr"
          variants={staggerContainer}
        >
          {GRID_ITEMS.map((item) => (
            <motion.article
              key={item.id}
              variants={cardReveal}
              className="w-full h-full rounded-2xl p-8 lg:p-12 flex flex-col items-center text-center bg-[#E8F3FF]"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <div className="w-full aspect-4/3 max-h-[180px] mb-6 flex items-center justify-center shrink-0">
                <img
                  src={item.src}
                  alt=""
                  className="max-w-full max-h-full object-contain"
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">
                {item.title}
              </h3>
              <p className="text-black/80 font-medium text-sm lg:text-[15px] leading-relaxed max-w-[280px]">
                {item.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
