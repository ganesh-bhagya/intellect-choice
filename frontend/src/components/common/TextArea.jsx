export function TextArea({ label, rows = 4, className = "", ...props }) {
  return (
    <div className={`mb-6 ${className}`}>
      {label && (
        <label className="block text-black font-medium mb-1 text-sm">
          {label}
        </label>
      )}
      <textarea
        placeholder={props.placeholder ?? (label && "")}
        rows={rows}
        className="w-full py-3 px-0 bg-transparent border-0 border-b-2 border-gray-300 focus:border-primary focus:outline-none focus:ring-0 transition-colors resize-none text-black"
        {...props}
      />
    </div>
  )
}
