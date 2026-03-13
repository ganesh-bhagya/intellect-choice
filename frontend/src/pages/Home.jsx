import { motion } from "framer-motion"
import { AppLink } from "../context/NavigationContext"
import { Seo } from "../components/Seo"
import { AboutSection } from "../components/sections/AboutSection"
import { ServicesSection } from "../components/sections/ServicesSection"
import { OfferingSection } from "../components/sections/OfferingSection"
import { InsightsSection } from "../components/sections/InsightsSection"
import { TechnologiesSection } from "../components/sections/TechnologiesSection"
import { ProjectsSection } from "../components/sections/ProjectsSection"
import { BuildTogetherSection } from "../components/sections/BuildTogetherSection"
import { Button } from "../components/common/Button"
import { SITE } from "../config/site"

import heroImage from "../assets/Frame 255.png?w=1920&format=webp"
import homemobileImage from "../assets/homebackmobile.png?w=768&format=webp"

const sectionViewport = { once: true, amount: 0.08 }

const heroStagger = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

const heroItem = {
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const bgZoom = {
  initial: { scale: 1.08 },
  animate: {
    scale: 1,
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const sectionReveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function Home() {
  return (
    <>
      <Seo
        title="Smart Digital Solutions"
        description="At Intellect Choice, we're building smart digital solutions that make a real impact."
      />

      {/* Hero Section - Image fills section, text overlays, equal left/right padding */}
      <section className="relative overflow-hidden h-screen md:h-auto font-sans">
       
          {/* Hero image - mobile: homebackmobile, desktop: Frame 255 */}
          <motion.div
            role="img"
            aria-label="Team of four smiling professionals at Intellect Choice"
            className="absolute inset-0 w-full h-screen bg-center bg-no-repeat md:hidden"
            style={{
              backgroundImage: `url(${homemobileImage})`,
              backgroundSize: "cover",
            }}
            variants={bgZoom}
            initial="initial"
            animate="animate"
          />
          <motion.div
            role="img"
            aria-label="Team of four smiling professionals at Intellect Choice"
            className="absolute inset-0 w-full h-screen bg-center bg-no-repeat hidden md:block"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: "cover",
            }}
            variants={bgZoom}
            initial="initial"
            animate="animate"
          />
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative">
      
          {/* Text content overlaid on image - left side */}
          <motion.div
            className="relative z-10 py-10 md:py-20 h-full flex md:items-center"
            variants={heroStagger}
            initial="initial"
            animate="animate"
          >
            <div className="max-w-xl lg:max-w-2xl">
            <motion.div
              variants={heroItem}
              className="h-1 w-14 bg-white mb-4"
            />
            <motion.h1
              variants={heroItem}
              className="text-[20px] sm:text-3xl md:text-4xl font-medium text-[#2d2d2d] uppercase leading-tight mb-2"
            >
              Digitize your Thoughts.
              <br />
              Stay ahead of
            </motion.h1>
            <motion.span
              variants={heroItem}
              className="block text-4xl sm:text-5xl md:text-6xl  font-semibold text-[#2d2d2d] uppercase mb-2 md:mb-6"
            >
              Technology.
            </motion.span>
            <motion.p
              variants={heroItem}
              className="text-black text-xs md:text-lg mb-4 md:mb-8 font-semibold w-[80%] "
            >
              {SITE.tagline}
            </motion.p>
            <motion.div variants={heroItem}>
              <AppLink to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 bg-primary text-white px-9 py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm uppercase tracking-wide hover:bg-primary-dark transition-colors"
                >
                  Let&apos;s Talk
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>
              </AppLink>
            </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Vertical contact bar - right edge (outside padded container) */}
        <motion.a
          href={`tel:${SITE.contact.phone}`}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.85, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4 text-white py-6 px-3 rounded-l-2xl shadow-[-4px_0_12px_rgba(0,0,0,0.12)] hover:opacity-95 transition-opacity"
          style={{ backgroundColor: "#0177FF" }}
        >
  <span
    className="text-sm font-medium tracking-wider"
    style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
  >
    +94 (0) 777696383
  </span>

  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
</motion.a>
      </section>

      <motion.div
        variants={sectionReveal}
        initial="initial"
        whileInView="whileInView"
        viewport={sectionViewport}
      >
        <AboutSection />
      </motion.div>

      <motion.div
        variants={sectionReveal}
        initial="initial"
        whileInView="whileInView"
        viewport={sectionViewport}
      >
        <ServicesSection />
      </motion.div>

      <motion.div
        variants={sectionReveal}
        initial="initial"
        whileInView="whileInView"
        viewport={sectionViewport}
      >
        <OfferingSection />
      </motion.div>

      <motion.div
        variants={sectionReveal}
        initial="initial"
        whileInView="whileInView"
        viewport={sectionViewport}
      >
        <InsightsSection />
      </motion.div>

      <motion.div
        variants={sectionReveal}
        initial="initial"
        whileInView="whileInView"
        viewport={sectionViewport}
      >
        <TechnologiesSection />
      </motion.div>

      <motion.div
        variants={sectionReveal}
        initial="initial"
        whileInView="whileInView"
        viewport={sectionViewport}
      >
        <ProjectsSection />
      </motion.div>

      <motion.div
        variants={sectionReveal}
        initial="initial"
        whileInView="whileInView"
        viewport={sectionViewport}
      >
        <BuildTogetherSection />
      </motion.div>

      
    </>
  )
}
