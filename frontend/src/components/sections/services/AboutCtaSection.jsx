import { AppLink } from "../../../context/NavigationContext"
import { motion } from "framer-motion"

import imgCta from "../../../assets/Rectangle 122.webp"

export function ServicesCtaSection() {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="relative rounded-4xl overflow-hidden min-h-[500px] md:min-h-[320px] flex items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={imgCta}
            alt=""
            className="absolute inset-0 w-full h-full object-cover md:object-right"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 px-6 md:px-12 lg:px-16 py-8 md:py-40 flex flex-col justify-end min-h-[280px] md:min-h-0 md:block">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 text-left">
              Let&apos;s Build
              <br />
              <span className="hidden md:block text-4xl md:text-5xl lg:text-6xl">
                Something Great
              </span>
              <span className="md:hidden">
                Something
                <br />
                Great
              </span>
            </h2>
            <AppLink to="/contact">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-[#0051AE] text-white px-6 py-3 rounded-full font-semibold text-base hover:bg-primary-dark transition-colors"
              >
                Start a Project
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.span>
            </AppLink>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
