import { motion } from "framer-motion"

const TECHNOLOGIES = [
  { name: "Angular", icon: "https://cdn.simpleicons.org/angular/DD0031" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Vue.js", icon: "https://cdn.simpleicons.org/vuedotjs/4FC08D" },
  { name: "Flutter", icon: "https://cdn.simpleicons.org/flutter/02569B" },
  { name: "Swift", icon: "https://cdn.simpleicons.org/swift/FA7343" },
  { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/E34F26" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
]

const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const viewport = { once: true, amount: 0.1 }
const staggerItem = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function TechnologiesSection() {
  return (
    <>
      <style>{`
        @keyframes tech-slider {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .tech-slider-track {
          animation: tech-slider 40s linear infinite;
        }
        .tech-slider-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <motion.section
        className="py-16 md:py-24 bg-white font-sans"
        initial="initial"
        whileInView="animate"
        viewport={viewport}
        variants={staggerContainer}
      >
        <div className="">
          {/* Header */}
          <motion.div
            className="flex flex-col lg:flex-row lg:items-start gap-8 mb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewport}
          >
            <motion.h2
              variants={staggerItem}
              className="text-3xl md:text-[48px] font-semibold text-black leading-tight uppercase lg:w-[55%] lg:shrink-0"
            >
              Technologies & Tools We Use
            </motion.h2>
            <motion.p
              variants={staggerItem}
              className="text-black md:text-right text-base md:text-lg max-w-2xl leading-relaxed"
            >
              We use modern technologies, advanced frameworks, and global cloud platforms to build
              secure, scalable, and high-performance solutions tailored to your growing business
              needs.
            </motion.p>
          </motion.div>

          {/* Gradient strip with slider */}
          <div
            className=" overflow-hidden py-10 md:py-26"
            style={{
              background: "linear-gradient(to bottom, #B3D6FF 0%, #F5F9FF 100%)",
            }}
          >
            <div className="overflow-hidden">
              <div className="tech-slider-track flex w-max gap-12 md:gap-16 pl-8 md:pl-12">
                {/* Duplicate list for seamless loop */}
                {[...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, i) => (
                  <div
                    key={`${tech.name}-${i}`}
                    className="flex flex-col items-center justify-center shrink-0 gap-3"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center  p-2 ">
                      <img
                        src={tech.icon}
                        alt=""
                        className="w-full h-full object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <span className="text-sm md:text-base font-semibold text-black whitespace-nowrap">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  )
}
