import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import DOMPurify from "dompurify"
import { Seo } from "../components/Seo"
import { SectionTitle } from "../components/common/SectionTitle"
import { Pill } from "../components/common/Pill"
import { JobCard } from "../components/common/JobCard"
import { fetchPublicJobs } from "../lib/api"

const FILTERS = ["View all", "Development", "Design", "Finance Management", "Customer Service", "Marketing"]

const filterToCategory = {
  Development: "development",
  Design: "design",
  "Finance Management": "finance",
  "Customer Service": "customer-service",
  Marketing: "marketing",
}

export default function Careers() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState("View all")
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [detailsJob, setDetailsJob] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetchPublicJobs()
      .then((res) => {
        if (!cancelled) setJobs(res.jobs || [])
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Failed to load jobs")
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  const filteredJobs =
    activeFilter === "View all"
      ? jobs
      : jobs.filter((j) => j.category === filterToCategory[activeFilter])

  return (
    <>
      <Seo
        title="Careers"
        description="Join Intellect Choice – we're always looking for passionate, creative, and hardworking people."
      />
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            className="flex flex-col items-center"
            title="Careers at Intellect Choice"
            subtitle="At Intellect Choice, we're building smart digital solutions that make a real impact. We're always looking for passionate, creative, and hardworking people to join our growing team."
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {FILTERS.map((filter) => (
              <Pill
                key={filter}
                active={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Pill>
            ))}
          </motion.div>

          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              initial: {},
              animate: {
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="space-y-6"
          >
            {loading ? (
              <p className="text-gray-500">Loading jobs...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : filteredJobs.length === 0 ? (
              <p className="text-gray-500">No jobs listed at the moment. Check back later.</p>
            ) : (
              filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                  }}
                >
                  <JobCard
                    id={job.id}
                    title={job.title}
                    description={job.description || ""}
                    tags={[job.location, job.type].filter(Boolean)}
                    onViewDetails={(j) => setDetailsJob(j)}
                  />
                </motion.div>
              ))
            )}
          </motion.div>

          <AnimatePresence>
            {detailsJob && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
                onClick={() => setDetailsJob(null)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold uppercase text-primary">{detailsJob.title}</h2>
                    {detailsJob.tags && detailsJob.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {detailsJob.tags.map((tag) => (
                          <Pill key={tag} active={false}>
                            {tag}
                          </Pill>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="p-6 overflow-y-auto flex-1 prose prose-sm max-w-none text-gray-700">
                    {typeof detailsJob.description === "string" && detailsJob.description.startsWith("<") ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(detailsJob.description, { ALLOWED_TAGS: ["p", "br", "strong", "em", "u", "h1", "h2", "h3", "ul", "ol", "li", "a"] }),
                        }}
                      />
                    ) : (
                      <p className="whitespace-pre-line">{detailsJob.description || "No description."}</p>
                    )}
                  </div>
                  <div className="p-6 border-t border-gray-200 flex flex-wrap gap-3 justify-end">
                    <button
                      type="button"
                      onClick={() => setDetailsJob(null)}
                      className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDetailsJob(null)
                        navigate(`/careers/apply?role=${encodeURIComponent(detailsJob.title)}&id=${detailsJob.id ?? ""}`)
                      }}
                      className="inline-flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-primary-dark"
                    >
                      Apply
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
    </>
  )
}
