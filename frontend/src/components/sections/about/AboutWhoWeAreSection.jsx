import { motion } from "framer-motion"

import imgWhoWeAre from "../../../assets/Rectangle 105.webp"

const viewport = { once: true, amount: 0.12 }
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
  initial: { opacity: 0, scale: 0.97 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function AboutWhoWeAreSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch"
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          variants={staggerContainer}
        >
          <div className="lg:w-[35%] flex flex-col order-2 lg:order-1 md:pt-22">
            <motion.div variants={staggerItem} className="mb-6">
              <span className="text-6xl md:text-[100px] lg:text-[100px] font-semibold text-black leading-none block">
                15K+
              </span>
              <span className="text-4xl md:text-5xl font-semibold text-black uppercase tracking-tight block mt-1">
                Project
              </span>
              <span className="text-4xl md:text-5xl font-semibold text-black uppercase tracking-tight">
                Completed
              </span>
            </motion.div>
            <motion.p
              variants={staggerItem}
              className="text-black text-base md:text-lg leading-[22px] text-left"
            >
              With a strong focus on innovation, quality, and user experience, we help businesses
              grow, streamline their operations, and stay competitive in the ever-evolving digital
              world. Our goal is to build solutions that not only meet today&apos;s needs but also
              support long-term success and continuous improvement.
            </motion.p>
          </div>
          <div className="lg:w-[65%] flex flex-col order-1 lg:order-2">
            <motion.h2
              variants={staggerItem}
              className="text-2xl md:text-5xl font-semibold text-black mb-4 text-center lg:text-right"
            >
              Who We Are
            </motion.h2>
            <motion.p
              variants={staggerItem}
              className="text-black text-base md:text-lg leading-[22px] text-left lg:text-right mb-8"
            >
              We are a group of passionate minds that aim to transform your vision into a digital
              reality. Our objective is to enhance your business agility and efficiency with
              cutting edge web and mobile solutions and we provide excellent value, innovation, and
              technology for our clients.
            </motion.p>
            <motion.div
              variants={imageReveal}
              className="rounded-2xl overflow-hidden shrink-0"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <img
                src={imgWhoWeAre}
                alt="Team of four professionals collaborating around a laptop"
                className="w-full h-full object-cover md:aspect-video"
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
