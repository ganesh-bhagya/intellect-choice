import { useMemo, useRef } from "react"
import { motion } from "framer-motion"

import imgKasun from "../../../assets/Rectangle 178.webp"
import imgNadeesha from "../../../assets/Rectangle 179.webp"
import imgTharindu from "../../../assets/Rectangle 180.webp"
import imgKasun2 from "../../../assets/Rectangle 181.webp"

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

export function AboutMeetTeamSection() {
  const scrollerRef = useRef(null)
  const team = useMemo(
    () => [
      {
        name: "Kasun Perera",
        role: "Lead Software Engineer",
        image: imgKasun,
      },
      {
        name: "Nadeesha Silva",
        role: "UI/UX Designer",
        image: imgNadeesha,
      },
      {
        name: "Tharindu Fernando",
        role: "Full Stack Developer",
        image: imgTharindu,
      },
      {
        name: "Kasun Perera",
        role: "Lead Software Engineer",
        image: imgKasun2,
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
            Meet Our Team
          </motion.h2>
          <motion.p
            variants={headerItem}
            className="text-[#484848] text-base md:text-lg md:text-right lg:w-[55%] text-left"
          >
            At Intellect Choice, our strength lies in our people. We are a team of passionate
            developers, designers, and innovators dedicated to building smart digital solutions that
            make a real impact.
          </motion.p>
        </motion.div>

        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <ArrowButton
              direction="prev"
              label="Scroll team members left"
              onClick={() => scrollByCard(scrollerRef.current, "prev")}
            />
            <ArrowButton
              direction="next"
              label="Scroll team members right"
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
          {team.map((member) => (
            <article
              key={`${member.name}-${member.role}-${member.image}`}
              data-carousel-card
              className={[
                "snap-start shrink-0",
                "w-[80%] sm:w-[55%] md:w-[420px] lg:w-[470px]",
                "rounded-2xl overflow-hidden relative",
              ].join(" ")}
            >
              <img
                src={member.image}
                alt={`${member.name} portrait`}
                className="w-full h-[420px] md:h-[520px] object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black/30 backdrop-blur-[1px] p-5">
                <h3 className="text-white text-xl md:text-2xl font-semibold">{member.name}</h3>
                <p className="text-white/95 text-sm md:text-base">{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

