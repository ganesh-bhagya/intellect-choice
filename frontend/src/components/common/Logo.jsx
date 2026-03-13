import { AppLink } from "../../context/NavigationContext"
import logo from "../../assets/logo.png"

export function Logo({ variant = "dark", className = "" }) {
  return (
    <AppLink to="/" className={`flex items-center gap-2 ${className}`}>
      <img
        src={logo}
        alt="Intellect Choice"
        className={`h-22 w-auto object-contain ${variant === "light" ? "brightness-0 invert" : ""}`}
      />
    </AppLink>
  )
}

export function LogoFooter({ variant = "dark", className = "" }) {
  return (
    <AppLink to="/" className={`flex items-center gap-2 ${className}`}>
      <img
        src={logo}
        alt="Intellect Choice"
        className={`md:h-28  h-50 w-auto object-contain ${variant === "light" ? "brightness-0 invert" : ""}`}
      />
    </AppLink>
  )
}

export function LogoMobileNav({ variant = "dark", className = "" }) {
  return (
    <AppLink to="/" className={`flex items-center gap-2 ${className}`}>
      <img
        src={logo}
        alt="Intellect Choice"
        className={`md:h-22 w-auto object-contain ${variant === "light" ? "brightness-0 invert" : ""}`}
      />
    </AppLink>
  )
}
