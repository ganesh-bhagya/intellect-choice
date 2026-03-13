import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Seo } from "../components/Seo"
import { adminLogin, fetchAdminMe } from "../lib/api"

export default function AdminLogin() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchAdminMe()
      .then(() => navigate("/admin", { replace: true }))
      .catch(() => setChecking(false))
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await adminLogin({ username, password })
      navigate("/admin", { replace: true })
    } catch (err) {
      setError(err.message || "Invalid username or password")
    } finally {
      setLoading(false)
    }
  }

  if (checking) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    )
  }

  return (
    <>
      <Seo title="Admin Login" description="Sign in to the admin panel" />
      <section className="py-16 md:py-24">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F3F3F3] rounded-3xl p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-center mb-2">Admin sign in</h1>
            <p className="text-sm text-gray-500 text-center mb-6">
              Use your admin credentials to access the panel.
            </p>
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="admin-username">
                  Username
                </label>
                <input
                  id="admin-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="admin-password">
                  Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm uppercase tracking-wide hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in…" : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
