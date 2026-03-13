import { AppLink } from "../../context/NavigationContext"
import { Logo, LogoFooter } from "../common/Logo"
import { SITE } from "../../config/site"

function ContactIcon({ type }) {
  const icons = {
    email: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    phone: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    location: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  }
  return icons[type] || null
}

export function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-wrap gap-12 justify-center md:justify-start">
          <div className="flex-1 min-w-[200px] flex flex-col items-center text-center md:items-start md:text-left">
            <LogoFooter variant="light" className="mb-4" />
            <p className="text-white text-sm w-[80%] md:w-auto leading-relaxed">{SITE.tagline}</p>
          </div>

          <div className="flex-1 min-w-[200px] text-center md:text-left">
            <h3 className="font-semibold uppercase mb-4 text-2xl text-white">Explore</h3>
            <ul className="space-y-2 flex flex-col items-center md:items-start">
              {SITE.nav.map(({ label, path }) => (
                <li key={path}>
                  <AppLink to={path} className="text-white hover:text-white transition-colors">
                    {label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 min-w-[200px] text-center md:text-left">
            <h3 className="font-semibold uppercase mb-4 text-2xl text-white">Services</h3>
            <ul className="space-y-2 flex flex-col items-center md:items-start">
              {SITE.services.map((service) => (
                <li key={service}>
                  <span className="text-white">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 min-w-[200px] text-center md:text-left">
            <h3 className="font-semibold uppercase mb-4 text-2xl text-white">Contact Us</h3>
            <ul className="space-y-3 flex flex-col items-center md:items-start">
              <li className="flex items-center justify-center md:justify-start gap-2 text-white">
                <ContactIcon type="email" />
                <a href={`mailto:${SITE.contact.email}`} className="hover:text-white transition-colors">
                  {SITE.contact.email}
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2 text-white">
                <ContactIcon type="phone" />
                <a href={`tel:${SITE.contact.phone}`} className="hover:text-white transition-colors">
                  {SITE.contact.phone}
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2 text-white">
                <ContactIcon type="location" />
                <span>{SITE.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-3 flex flex-col-reverse sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <p className="text-white text-sm">© 2026 Intellect Choice. All rights reserved.</p>
          <p className="text-white font-bold text-sm">Intellect Choice</p>
        </div>
      </div>
    </footer>
  )
}
