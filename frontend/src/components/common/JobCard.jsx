import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Pill } from "./Pill"

/** Strip HTML to plain text for short previews */
function stripHtml(html) {
  if (!html || typeof html !== "string") return ""
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
}

export function JobCard({ id, title, description, tags = [], applyUrl, onViewDetails }) {
  const isHtml = typeof description === "string" && description.startsWith("<")
  const preview = isHtml ? stripHtml(description).slice(0, 120) + (stripHtml(description).length > 120 ? "…" : "") : (description || "")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow"
    >
      <h3 className="text-lg font-bold uppercase text-primary mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{preview}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <Pill key={tag} active={false}>
            {tag}
          </Pill>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {onViewDetails && (
          <button
            type="button"
            onClick={() => onViewDetails({ id, title, description, tags })}
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            View details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        )}
        <Link
          to={applyUrl || `/careers/apply?role=${encodeURIComponent(title)}&id=${id ?? ""}`}
          className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
        >
          Apply
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </Link>
      </div>
    </motion.div>
  )
}
