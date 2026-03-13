import { AppLink } from "../../context/NavigationContext"
import { motion } from "framer-motion"

import img62 from "../../assets/Rectangle 62.webp"
import img63 from "../../assets/Rectangle 63 (1).webp"
import img65 from "../../assets/Rectangle 65 (1).webp"

const INSIGHTS = [
  {
    title: "Future of Web Development",
    description:
      "Stay informed about cutting-edge tools, dynamic frameworks, and the latest methodologies that are revolutionizing the development of fast, scalable, and secure web apps.",
    image: img63,
    imageAlt: "Team discussing web development",
    bgColor: "#FFFAD8",
    layout: "stack", // text + button on top, image below
  },
  {
    title: "Mobile App Innovation",
    description:
      "Discover how mobile apps are redefining user experiences, reshaping industries, and creating new opportunities for businesses across the globe.",
    image: img62,
    imageAlt: "Team collaborating around a laptop",
    bgColor: "#F3F9FF",
    layout: "row", // text left, image right
  },
  {
    title: "Cloud & DevOps Insights",
    description:
      "Learn how cloud platforms, containerization, and continuous deployment pipelines enable faster development cycles and more resilient digital products.",
    image: img65,
    imageAlt: "Team reviewing laptop in office",
    bgColor: "#F3F9FF",
    layout: "row",
  },
]

const viewport = { once: true, amount: 0.1 }
const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
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
const cardReveal = {
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}
const imageReveal = {
  initial: { opacity: 0, scale: 0.96 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}
const rightColumnStagger = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
}

const ExploreButton = () => (
  <AppLink to="/insights">
    <motion.span
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-full font-semibold text-sm hover:bg-primary-dark transition-colors"
    >
      Explore More
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
    </motion.span>
  </AppLink>
)

export function InsightsSection() {
  const [first, ...rest] = INSIGHTS

  return (
    <motion.section
      className="py-8 md:py-16 bg-white font-sans"
      initial="initial"
      whileInView="animate"
      viewport={viewport}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: title + description left, Explore More button right */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-12 lg:mb-16"
          variants={staggerContainer}
        >
          <div>
            <motion.h2
              variants={staggerItem}
              className="text-3xl md:text-[48px] font-semibold text-black leading-tight uppercase mb-4"
            >
              Latest Insights & Tech Trends
            </motion.h2>
            <motion.p
              variants={staggerItem}
              className="text-black text-base md:text-lg w-[85%] leading-[22px]"
            >
              Dive into expert perspectives, emerging technologies, and valuable lessons from the
              world of software, design, and digital transformation.
            </motion.p>
          </div>
          <motion.div variants={staggerItem} className="shrink-0">
            <AppLink to="/insights">
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-primary text-white md:px-10 px-10 md:py-4 py-2 rounded-full font-semibold text-sm hover:bg-primary-dark transition-colors"
              >
                Explore More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </motion.span>
            </AppLink>
          </motion.div>
        </motion.div>

        {/* Cards: flex — left one large card, right two stacked (no grid) */}
        <motion.div
          className="flex flex-col lg:flex-row gap-6"
          variants={staggerContainer}
        >
          {/* Left: single large card (stack layout) */}
          <motion.article
            variants={cardReveal}
            className="md:w-[45%] rounded-4xl p-6 md:p-8 flex flex-col min-h-0"
            style={{ backgroundColor: first.bgColor }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <h3 className="text-xl md:text-3xl font-semibold text-black mb-3 w-[85%]">{first.title}</h3>
            <p className="text-black text-base leading-relaxed mb-6 flex-1">{first.description}</p>
            <div className="mb-6">
              <ExploreButton />
            </div>
            <motion.div
              variants={imageReveal}
              className="rounded-3xl overflow-hidden aspect-square shrink-0"
            >
              <img
                src={first.image}
                alt={first.imageAlt}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </motion.article>

          {/* Right: two cards stacked */}
          <motion.div
            className="flex flex-col gap-6 lg:w-[55%]"
            variants={rightColumnStagger}
          >
            {rest.map((item) => (
              <motion.article
                key={item.title}
                variants={cardReveal}
                className="rounded-4xl p-6 flex flex-col sm:flex-row gap-4 min-h-0 flex-1 items-center"
                style={{ backgroundColor: item.bgColor }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-2xl font-semibold text-black mb-2">{item.title}</h3>
                  <p className="text-black text-sm  font-medium leading-relaxed mb-4">{item.description}</p>
                  <ExploreButton />
                </div>
                <motion.div
                  variants={imageReveal}
                  className="sm:w-[45%] shrink-0 rounded-2xl overflow-hidden aspect-square"
                >
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
