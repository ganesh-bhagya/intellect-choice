import { motion } from "framer-motion"

export function SectionTitle({ title, subtitle, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${className}`}
    >
      <h2 className="text-3xl md:text-6xl font-semibold text-primary text-center uppercase mb-4">{title}</h2>
      {subtitle && <p className="text-gray-600 max-w-3xl text-center">{subtitle}</p>}
    </motion.div>
  )
}
