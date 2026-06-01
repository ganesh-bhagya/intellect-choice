import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Seo } from "../components/Seo"
import { Input } from "../components/common/Input"
import { TextArea } from "../components/common/TextArea"
import { SITE } from "../config/site"
import { submitContact } from "../lib/api"

function telHref(display) {
  return `tel:${String(display).replace(/[^\d+]/g, "")}`
}

const viewport = { once: true, amount: 0.15 }
const ease = [0.25, 0.46, 0.45, 0.94]

const formStagger = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const formItem = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease },
  },
}

const cardReveal = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
}

const touchStagger = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" })
  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      setIsSubmitting(true)
      await submitContact(formData)
      setShowModal(true)
      setFormData({ name: "", email: "", phone: "", message: "" })
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <>
      <Seo
        title="Contact Us"
        description="Get in touch with Intellect Choice – we'd love to hear from you."
      />

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Thank you for reaching out</h3>
              <p className="text-gray-600 mb-6">
                We&apos;ve received your message and will get back to you as soon as possible.
              </p>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowModal(false)}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-sm bg-primary text-white hover:bg-primary-dark transition-colors"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="py-12 md:py-20 flex items-start"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
            {/* Left: Contact form card */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5, ease }}
              className="lg:col-span-3 bg-[#F3F3F3] rounded-3xl p-8 md:p-10 shadow-sm"
            >
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={viewport}
                variants={formStagger}
              >
                <motion.h1
                  variants={formItem}
                  className="text-2xl md:text-3xl font-bold text-black uppercase tracking-wide mb-8"
                >
                  Contact Us
                </motion.h1>
                <form onSubmit={handleSubmit}>
                  <motion.div variants={formItem}>
                    <Input
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </motion.div>
                  <motion.div variants={formItem}>
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </motion.div>
                  <motion.div variants={formItem}>
                    <Input
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </motion.div>
                  <motion.div variants={formItem}>
                    <TextArea
                      label="Your Message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </motion.div>
                  <motion.div variants={formItem}>
                    {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wide hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Submit"}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </motion.button>
                  </motion.div>
                </form>
              </motion.div>
            </motion.div>

            {/* Right: Get in touch card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5, ease, delay: 0.1 }}
              className="lg:col-span-2 flex flex-col rounded-3xl overflow-hidden bg-[#F3F3F3]"
            >
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={viewport}
                variants={touchStagger}
                className="w-full"
              >
                <motion.div variants={cardReveal} className="rounded-t-2xl px-6 py-5">
                  <div className="bg-primary rounded-2xl py-6 flex items-center justify-center">
                    <h2 className="text-base md:text-lg font-bold text-white uppercase tracking-wide text-center">
                      Get in Touch
                    </h2>
                  </div>
                </motion.div>
                <motion.div variants={cardReveal} className="rounded-b-3xl p-6">
                  <ul className="space-y-6 list-none mb-10">
                    <motion.li variants={cardReveal} className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 px-0.5">
                        Main office (New Zealand)
                      </p>
                      <div className="rounded-2xl bg-white p-4 space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <a href={telHref(SITE.contact.phoneNZ)} className="text-gray-700 hover:text-primary text-base min-w-0">
                            {SITE.contact.phoneNZ}
                          </a>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center shrink-0 mt-0.5">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                          </div>
                          <p className="text-gray-700 text-base leading-snug min-w-0">{SITE.contact.addressNZ}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <a
                            href={`mailto:${SITE.contact.emailNZ}`}
                            className="text-gray-700 hover:text-primary text-base break-all min-w-0"
                          >
                            {SITE.contact.emailNZ}
                          </a>
                        </div>
                      </div>
                    </motion.li>
                    <motion.li variants={cardReveal} className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 px-0.5">Sri Lanka office</p>
                      <div className="rounded-2xl bg-white p-4 space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <a href={telHref(SITE.contact.phoneLanka)} className="text-gray-700 hover:text-primary text-base min-w-0">
                            {SITE.contact.phoneLanka}
                          </a>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center shrink-0 mt-0.5">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                          </div>
                          <p className="text-gray-700 text-base leading-snug min-w-0">{SITE.contact.addressLanka}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <a
                            href={`mailto:${SITE.contact.emailLanka}`}
                            className="text-gray-700 hover:text-primary text-base break-all min-w-0"
                          >
                            {SITE.contact.emailLanka}
                          </a>
                        </div>
                      </div>
                    </motion.li>
                  </ul>
                  <motion.div variants={cardReveal} className="flex gap-4 justify-center">
                  <a
                    href={SITE.social.facebook}
                    className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center hover:bg-primary transition-colors text-base font-bold"
                    aria-label="Facebook"
                  >
                    f
                  </a>
                  <a
                    href={SITE.social.instagram}
                    className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center hover:bg-primary transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="18" cy="6" r="1.5" />
                    </svg>
                  </a>
                  <a
                    href={SITE.social.linkedin}
                    className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center hover:bg-primary transition-colors text-sm font-bold"
                    aria-label="LinkedIn"
                  >
                    in
                  </a>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  )
}
