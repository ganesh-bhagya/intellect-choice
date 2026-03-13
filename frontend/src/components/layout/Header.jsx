import { useState } from "react"
import { useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Logo, LogoMobileNav } from "../common/Logo"
import { Button } from "../common/Button"
import { AppLink } from "../../context/NavigationContext"
import { SITE } from "../../config/site"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm font-sans">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 w-full">
          <Logo />

          <div className="hidden md:flex items-center gap-10 lg:gap-12 ml-10 lg:ml-16 flex-1 justify-center">
            {SITE.nav
              .filter(({ path }) => path !== "/contact")
              .map(({ label, path }) => (
                <AppLink
                  key={path}
                  to={path}
                  className={`font-medium transition-colors underline-offset-8 ${
                    location.pathname === path ? "text-primary underline decoration-primary decoration-2" : "text-black hover:text-primary"
                  }`}
                >
                  {label}
                </AppLink>
              ))}
          </div>

          <div className="hidden md:flex items-center gap-6 ml-auto">
          
            <Button to="/contact" variant="primary" size="default" icon>
              Contact Us
            </Button>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-gray-600 hover:text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden fixed inset-0 z-50 bg-white flex flex-col"
          >
            <div className="absolute top-4 right-4 z-10">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="p-2 text-gray-600 hover:text-primary transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col items-center justify-start flex-1 px-6 pb-8 pt-22">
              <AppLink to="/" onClick={() => setMobileOpen(false)} className="mb-12">
                <LogoMobileNav />
              </AppLink>

              <nav className="flex flex-col items-center gap-6 mb-12">
                {SITE.nav
                  .filter(({ path }) => path !== "/contact")
                  .map(({ label, path }) => (
                    <AppLink
                      key={path}
                      to={path}
                      onClick={() => setMobileOpen(false)}
                      className={`text-[20px] font-medium underline-offset-8 ${
                        location.pathname === path ? "text-primary underline decoration-primary decoration-2" : "text-black"
                      }`}
                    >
                      {label}
                    </AppLink>
                  ))}
              </nav>

              <Button
                to="/contact"
                variant="primary"
                size="default"
                icon
                onClick={() => setMobileOpen(false)}
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
