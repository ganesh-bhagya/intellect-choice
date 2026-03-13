import { motion } from "framer-motion"
import { AppLink } from "../../context/NavigationContext"

const ArrowIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
)

export function Button({
  children,
  variant = "primary",
  size = "default",
  icon = false,
  href,
  to,
  className = "",
  ...props
}) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-wide rounded-full transition-colors"
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white",
    outline: "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white",
  }
  const sizes = {
    default: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  }

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  const content = (
    <>
      {children}
      {icon && <ArrowIcon />}
    </>
  )

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  }

  if (to) {
    return (
      <motion.div {...motionProps}>
        <AppLink to={to} className={classes} {...props}>
          {content}
        </AppLink>
      </motion.div>
    )
  }

  if (href) {
    return (
      <motion.div {...motionProps}>
        <a href={href} className={classes} {...props}>
          {content}
        </a>
      </motion.div>
    )
  }

  return (
    <motion.button className={classes} {...motionProps} {...props}>
      {content}
    </motion.button>
  )
}
