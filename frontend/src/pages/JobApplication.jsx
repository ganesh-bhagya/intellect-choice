import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Seo } from "../components/Seo"
import { Input } from "../components/common/Input"
import { TextArea } from "../components/common/TextArea"
import { submitApplication } from "../lib/api"

const ease = [0.25, 0.46, 0.45, 0.94]

export default function JobApplication() {
  const location = useLocation()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    message: "",
  })
  const [cvFile, setCvFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const role = params.get("role")
    if (role) {
      setFormData((prev) => ({ ...prev, position: role }))
    }
  }, [location.search])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      setIsSubmitting(true)
      const form = new FormData()
      form.append("name", formData.name)
      form.append("email", formData.email)
      form.append("phone", formData.phone)
      form.append("position", formData.position)
      form.append("message", formData.message)
      if (cvFile) form.append("cv", cvFile)
      await submitApplication(form)
      setSuccess(true)
      setFormData({ name: "", email: "", phone: "", position: "", message: "" })
      setCvFile(null)
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Seo
        title="Apply for a role"
        description="Submit your application to join Intellect Choice."
      />
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="py-16 md:py-24"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-bold text-black uppercase tracking-wide mb-8">
            Job Application
          </h1>
          <form onSubmit={handleSubmit} className="bg-[#F3F3F3] rounded-3xl p-8 md:p-10 shadow-sm">
            <div className="space-y-5">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
              <Input
                label="Position Applying For"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
              />
              <TextArea
                label="Cover Letter / Message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CV / Resume (PDF or Word)
                </label>
                <input
                  key={cvFile ? cvFile.name : 'no-file'}
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary file:text-white file:font-semibold file:cursor-pointer hover:file:bg-primary-dark"
                />
                {cvFile && (
                  <p className="text-xs text-gray-500 mt-1">
                    Selected: {cvFile.name} ({(cvFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              {success && <p className="text-sm text-green-600">Application submitted successfully.</p>}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wide hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.section>
    </>
  )
}
