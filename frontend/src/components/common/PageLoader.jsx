import logo from "../../assets/logo.png"

export function PageLoader() {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-white"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-6">
        <img
          src={logo}
          alt="Intellect Choice"
          className="h-16 w-auto object-contain animate-pulse md:h-20"
        />
        <div className="flex gap-1.5">
          <span
            className="size-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="size-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="size-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
      <span className="text-sm font-medium text-gray-500">Loading...</span>
    </div>
  )
}
