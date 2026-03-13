import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import { ScrollToTop } from "../ScrollToTop"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { PageLoader } from "../common/PageLoader"
import { NavigationProvider, useNavigation } from "../../context/NavigationContext"

function LayoutContent() {
  const { isNavigating } = useNavigation()
  return (
    <div className="min-h-screen flex flex-col font-sans antialiased">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        {isNavigating ? (
          <PageLoader />
        ) : (
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        )}
      </main>
      <Footer />
    </div>
  )
}

export function Layout() {
  return (
    <NavigationProvider>
      <LayoutContent />
    </NavigationProvider>
  )
}
