import { motion } from "framer-motion"

export function Pill({ children, active = false, onClick, className = "" }) {
  const base = "inline-flex items-center px-4 py-2 rounded-full font-medium text-sm uppercase tracking-wide transition-colors cursor-pointer"
  const styles = active
    ? "bg-primary text-white"
    : "bg-white text-primary border-2 border-primary hover:bg-gray-100"

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
}
