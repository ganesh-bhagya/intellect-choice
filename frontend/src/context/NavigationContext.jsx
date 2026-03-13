import { createContext, useContext, useCallback, useState, useEffect } from "react"
import { useLocation, Link } from "react-router-dom"

const NavigationContext = createContext(null)

export function NavigationProvider({ children }) {
  const [isNavigating, setIsNavigating] = useState(false)
  const { pathname } = useLocation()

  const startNavigation = useCallback(() => {
    setIsNavigating(true)
  }, [])

  useEffect(() => {
    setIsNavigating(false)
  }, [pathname])

  return (
    <NavigationContext.Provider value={{ isNavigating, startNavigation }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const ctx = useContext(NavigationContext)
  if (!ctx) return { isNavigating: false, startNavigation: () => {} }
  return ctx
}

/** Link that shows the page loader immediately on click */
export function AppLink({ onClick, to, children, ...props }) {
  const { startNavigation } = useNavigation()
  const handleClick = useCallback(
    (e) => {
      startNavigation()
      onClick?.(e)
    },
    [startNavigation, onClick]
  )
  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
