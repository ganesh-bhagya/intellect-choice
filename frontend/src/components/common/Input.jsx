export function Input({ label, type = "text", className = "", ...props }) {
  return (
    <div className={`mb-6 ${className}`}>
      {label && (
        <label className="block text-black font-medium mb-1 text-sm">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={props.placeholder ?? (label && "")}
        className="w-full py-3 text-black px-0 bg-transparent border-0 border-b-2 border-gray-300 focus:border-primary focus:outline-none focus:ring-0 transition-colors"
        {...props}
      />
    </div>
  )
}
