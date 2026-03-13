import { useState } from "react"
import { motion } from "framer-motion"

import ppImg from "../../assets/pp.jpg"
import pppImg from "../../assets/ppp.jpg"

const TABS = [
  { id: "all", label: "All Projects" },
  { id: "uiux", label: "UI/UX Design" },
  { id: "development", label: "Development" },
]

const PROJECTS = [
  { id: "1", image: ppImg, imageAlt: "Donation app – login, search filter, and donate screens" },
  { id: "2", image: pppImg, imageAlt: "Coworking app – onboarding, find places, and booking screens" },
]

const viewport = { once: true, amount: 0.1 }
const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <motion.section
      className="py-16 md:py-24 md:rounded-[46px] my-10 md:mb-24"
      style={{ backgroundColor: "#002248" }}
      initial="initial"
      whileInView="animate"
      viewport={viewport}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pill + Title + Description */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-start gap-6 mb-8"
          variants={staggerContainer}
        >
          <div className="lg:flex-1 lg:min-w-0">
            <motion.span
              variants={staggerItem}
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-white mb-4 bg-[#0177FF]"
             
            >
              Our Projects
            </motion.span>
            <motion.h2
              variants={staggerItem}
              className="text-3xl md:text-5xl font-semibold text-white leading-tight"
            >
              Building Brands That Stand the Test of Time
            </motion.h2>
          </div>
          <motion.p
            variants={staggerItem}
            className="text-white text-sm md:text-lg md:text-right max-w-xl font-medium leading-relaxed lg:pt-10"
          >
            At Intellect Choice, we turn ideas into impactful digital products. Each project we
            deliver reflects innovation, quality, and a deep understanding of our clients&apos; goals
            — helping businesses grow and succeed through technology.
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex flex-wrap  gap-2 mb-10"
          variants={staggerItem}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? "text-black"
                  : "text-white border border-white/60 bg-transparent hover:bg-white/10"
              }`}
              style={
                activeTab === tab.id
                  ? { backgroundColor: "rgba(255,255,255,1)" }
                  : undefined
              }
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Project cards — flex, two columns */}
        <motion.div
          className="flex flex-col md:flex-row gap-6"
          variants={staggerContainer}
        >
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              variants={staggerItem}
              className="flex-1 min-w-0 rounded-3xl overflow-hidden bg-white shadow-lg"
            >
              <div className="aspect-4/3 w-full">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
