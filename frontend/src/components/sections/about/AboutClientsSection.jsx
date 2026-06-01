import { useMemo, useRef } from "react"
import { motion } from "framer-motion"

import imgClient1 from "../../../assets/Rectangle 186.webp"
import imgClient2 from "../../../assets/Rectangle 188.webp"
import imgClient3 from "../../../assets/Rectangle 189.webp"
import imgClient4 from "../../../assets/Rectangle 196.webp"
import imgClient5 from "../../../assets/Rectangle 198.webp"
import imgClient6 from "../../../assets/Rectangle 199.webp"

const viewport = { once: true, amount: 0.15 }

const headerStagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
}

const headerItem = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function ArrowButton({ direction = "prev", onClick, className = "", label }) {
  const isPrev = direction === "prev"

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={[
        "inline-flex items-center justify-center rounded-full",
        "h-12 w-12 md:h-14 md:w-14",
        "bg-[#002248] text-white shadow-sm",
        "hover:bg-[#001a36] active:scale-[0.98] transition",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0051AE]",
        className,
      ].join(" ")}
    >
      <svg
        className={["h-5 w-5 md:h-6 md:w-6", isPrev ? "" : "rotate-180"].join(" ")}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  )
}

function scrollByCard(container, direction) {
  if (!container) return
  const first = container.querySelector("[data-carousel-card]")
  const cardWidth = first?.getBoundingClientRect?.().width ?? 420
  const gap = 24
  const delta = (cardWidth + gap) * (direction === "next" ? 1 : -1)
  container.scrollBy({ left: delta, behavior: "smooth" })
}

export function AboutClientsSection() {
  const scrollerRef = useRef(null)
  const clients = useMemo(
    () => [
      {
        name: "TechNova Solutions",
        description: "A leading tech company specializing in enterprise software solutions.",
        image: imgClient1,
      },
      {
        name: "TechNova Solutions",
        description: "A leading tech company specializing in enterprise software solutions.",
        image: imgClient2,
      },
      {
        name: "TechNova Solutions",
        description: "A leading tech company specializing in enterprise software solutions.",
        image: imgClient3,
      },
      {
        name: "TechNova Solutions",
        description: "A leading tech company specializing in enterprise software solutions.",
        image: imgClient4,
      },
      {
        name: "TechNova Solutions",
        description: "A leading tech company specializing in enterprise software solutions.",
        image: imgClient5,
      },
      {
        name: "TechNova Solutions",
        description: "A leading tech company specializing in enterprise software solutions.",
        image: imgClient6,
      },
    ],
    [],
  )

  return (
    <section className="py-8 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col lg:flex-row lg:items-start gap-8 mb-10 md:mb-14"
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          variants={headerStagger}
        >
          <motion.h2
            variants={headerItem}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black lg:w-[45%] lg:shrink-0 leading-tight"
          >
            Our Clients
          </motion.h2>
          <motion.p
            variants={headerItem}
            className="text-black text-base md:text-lg md:text-right lg:w-[55%] text-left"
          >
            We are proud to collaborate with a diverse range of clients, from startups to
            established enterprises, delivering innovative digital solutions that drive real
            results.
          </motion.p>
        </motion.div>

        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <ArrowButton
              direction="prev"
              label="Scroll client cards left"
              onClick={() => scrollByCard(scrollerRef.current, "prev")}
            />
            <ArrowButton
              direction="next"
              label="Scroll client cards right"
              onClick={() => scrollByCard(scrollerRef.current, "next")}
            />
          </div>
          <p className="hidden md:block text-sm text-[#6B6B6B]">
            Drag to scroll
          </p>
        </div>

        <div
          ref={scrollerRef}
          className={[
            "flex gap-6 overflow-x-auto pb-4",
            "snap-x snap-mandatory scroll-smooth",
            "[scrollbar-width:thin] [scrollbar-color:#CCD1D2_transparent]",
          ].join(" ")}
        >
          {clients.map((client, idx) => (
            <article
              key={`${client.image}-${idx}`}
              data-carousel-card
              className={[
                "snap-start shrink-0",
                "w-[80%] sm:w-[55%] md:w-[420px] lg:w-[470px]",
                "rounded-2xl overflow-hidden relative",
              ].join(" ")}
            >
              <img
                src={client.image}
                alt={`${client.name} project visual`}
                className="w-full h-[360px] md:h-[444px] object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black/30 backdrop-blur-[1px] p-5">
                <h3 className="text-white text-xl md:text-2xl font-semibold">{client.name}</h3>
                <p className="text-white/95 text-sm md:text-base leading-relaxed">
                  {client.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

