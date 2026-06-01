import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Seo } from "../components/Seo"
import { RichTextEditor } from "../components/common/RichTextEditor"
import {
  adminLogout,
  fetchAdminMe,
  fetchContacts,
  fetchApplications,
  fetchJobs,
  createJob,
  updateJob,
  deleteJob,
  fetchAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadBlogImage,
  resolveMediaUrl,
  getCvDownloadUrl,
  downloadCv,
} from "../lib/api"

export default function Admin() {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [applications, setApplications] = useState([])
  const [jobs, setJobs] = useState([])
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [authChecked, setAuthChecked] = useState(false)
  const [isAuthed, setIsAuthed] = useState(false)
  const [activeTab, setActiveTab] = useState("contacts")
  const [downloadingCvId, setDownloadingCvId] = useState(null)
  const [jobForm, setJobForm] = useState({
    id: null,
    title: "",
    location: "",
    type: "",
    category: "",
    description: "",
    isActive: true,
  })

  const [blogForm, setBlogForm] = useState({
    id: null,
    title: "",
    coverImage: "",
    shortDescription: "",
    contentHtml: "",
    isPublished: true,
  })
  const [blogImageFile, setBlogImageFile] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    fetchAdminMe()
      .then(() => {
        setAuthChecked(true)
        setIsAuthed(true)
      })
      .catch(() => {
        setAuthChecked(true)
        navigate("/admin/login", { replace: true })
      })
  }, [navigate])

  useEffect(() => {
    if (!isAuthed) return

    const load = async () => {
      try {
        setLoading(true)
        const [c, a, j, b] = await Promise.all([
          fetchContacts(),
          fetchApplications(),
          fetchJobs(),
          fetchAdminBlogs(),
        ])
        setContacts(c.contacts || [])
        setApplications(a.applications || [])
        setJobs(j.jobs || [])
        setBlogs(b.blogs || [])
      } catch (err) {
        setError(err.message || "Failed to load admin data")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [isAuthed])

  const resetJobForm = () => {
    setJobForm({
      id: null,
      title: "",
      location: "",
      type: "",
      category: "",
      description: "",
      isActive: true,
    })
  }

  const resetBlogForm = () => {
    setBlogForm({
      id: null,
      title: "",
      coverImage: "",
      shortDescription: "",
      contentHtml: "",
      isPublished: true,
    })
    setBlogImageFile(null)
  }

  const handleJobFieldChange = (e) => {
    const { name, value, type, checked } = e.target
    setJobForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleBlogFieldChange = (e) => {
    const { name, value, type, checked } = e.target
    setBlogForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleJobEdit = (job) => {
    setJobForm({
      id: job.id,
      title: job.title || "",
      location: job.location || "",
      type: job.type || "",
      category: job.category || "",
      description: job.description || "",
      isActive: job.is_active === 1 || job.is_active === true,
    })
  }

  const handleBlogEdit = (blog) => {
    setBlogForm({
      id: blog.id,
      title: blog.title || "",
      coverImage: blog.coverImage || "",
      shortDescription: blog.shortDescription || "",
      contentHtml: blog.contentHtml || "",
      isPublished: blog.isPublished === true || blog.is_published === 1,
    })
    setBlogImageFile(null)
    setActiveTab("blogs")
  }

  const handleJobDelete = async (id) => {
    setError("")
    try {
      await deleteJob(id)
      setJobs((prev) => prev.filter((j) => j.id !== id))
    } catch (err) {
      setError(err.message || "Failed to delete job")
    }
  }

  const handleBlogDelete = async (id) => {
    setError("")
    try {
      await deleteBlog(id)
      setBlogs((prev) => prev.filter((b) => b.id !== id))
    } catch (err) {
      setError(err.message || "Failed to delete blog")
    }
  }

  const handleJobSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      setLoading(true)
      const payload = {
        title: jobForm.title,
        location: jobForm.location,
        type: jobForm.type,
        category: jobForm.category,
        description: jobForm.description,
        isActive: jobForm.isActive,
      }
      if (!jobForm.id) {
        const res = await createJob(payload)
        setJobs((prev) => [res.job, ...prev])
      } else {
        const res = await updateJob(jobForm.id, payload)
        setJobs((prev) => prev.map((j) => (j.id === jobForm.id ? res.job : j)))
      }
      resetJobForm()
    } catch (err) {
      setError(err.message || "Failed to save job")
    } finally {
      setLoading(false)
    }
  }

  const handleBlogImageUpload = async () => {
    if (!blogImageFile) return
    setError("")
    try {
      setUploadingImage(true)
      const res = await uploadBlogImage(blogImageFile)
      setBlogForm((prev) => ({ ...prev, coverImage: res.imagePath || "" }))
      setBlogImageFile(null)
    } catch (err) {
      setError(err.message || "Failed to upload image")
    } finally {
      setUploadingImage(false)
    }
  }

  const handleBlogSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      setLoading(true)
      let coverImagePath = blogForm.coverImage
      if (blogImageFile) {
        const uploaded = await uploadBlogImage(blogImageFile)
        coverImagePath = uploaded.imagePath || coverImagePath
      }
      const payload = {
        title: blogForm.title,
        coverImage: coverImagePath,
        shortDescription: blogForm.shortDescription,
        contentHtml: blogForm.contentHtml,
        isPublished: blogForm.isPublished,
      }
      if (!blogForm.id) {
        const res = await createBlog(payload)
        setBlogs((prev) => [res.blog, ...prev])
      } else {
        const res = await updateBlog(blogForm.id, payload)
        setBlogs((prev) => prev.map((b) => (b.id === blogForm.id ? res.blog : b)))
      }
      resetBlogForm()
    } catch (err) {
      setError(err.message || "Failed to save blog")
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadCv = async (applicationId, filename) => {
    setError("")
    setDownloadingCvId(applicationId)
    try {
      await downloadCv(applicationId, filename || "cv")
    } catch (err) {
      setError(err.message || "Failed to download CV")
    } finally {
      setDownloadingCvId(null)
    }
  }

  const handleLogout = async () => {
    setError("")
    try {
      await adminLogout()
      navigate("/admin/login", { replace: true })
    } catch {
      navigate("/admin/login", { replace: true })
    }
  }

  if (!authChecked) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    )
  }

  if (!isAuthed) {
    return null
  }

  return (
    <>
      <Seo title="Admin" description="Admin panel for enquiries, applications, and jobs" />
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Admin Panel</h1>
          {error && <p className="text-red-600 mb-4">{error}</p>}

          <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">You are signed in as admin.</p>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center border border-gray-300 px-4 py-1.5 rounded-full text-sm"
                >
                  Log out
                </button>
              </div>

              <div className="mb-6 border-b border-gray-200">
                <nav className="-mb-px flex space-x-4 overflow-x-auto text-sm">
                  <button
                    type="button"
                    onClick={() => setActiveTab("contacts")}
                    className={`pb-2 px-1 border-b-2 whitespace-nowrap ${
                      activeTab === "contacts"
                        ? "border-primary text-primary font-semibold"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Contacts
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("applications")}
                    className={`pb-2 px-1 border-b-2 whitespace-nowrap ${
                      activeTab === "applications"
                        ? "border-primary text-primary font-semibold"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Applications
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("jobs")}
                    className={`pb-2 px-1 border-b-2 whitespace-nowrap ${
                      activeTab === "jobs"
                        ? "border-primary text-primary font-semibold"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Jobs
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("blogs")}
                    className={`pb-2 px-1 border-b-2 whitespace-nowrap ${
                      activeTab === "blogs"
                        ? "border-primary text-primary font-semibold"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Blogs
                  </button>
                </nav>
              </div>

              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="space-y-8">
                  {activeTab === "contacts" && (
                    <div>
                      <h2 className="text-xl font-semibold mb-3">Contact enquiries</h2>
                      {contacts.length === 0 ? (
                        <p className="text-gray-500 text-sm">No contacts yet.</p>
                      ) : (
                        <div className="space-y-3">
                          {contacts.map((c) => (
                            <div key={c.id} className="border rounded-xl p-4 bg-white">
                              <div className="flex justify-between text-sm text-gray-500 mb-1">
                                <span>
                                  {c.name} &lt;{c.email}&gt;
                                </span>
                                <span>{new Date(c.created_at || c.createdAt).toLocaleString()}</span>
                              </div>
                              {c.phone && <p className="text-sm text-gray-600 mb-1">Phone: {c.phone}</p>}
                              <p className="text-gray-800 whitespace-pre-line">{c.message}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "applications" && (
                    <div>
                      <h2 className="text-xl font-semibold mb-3">Job applications</h2>
                      {applications.length === 0 ? (
                        <p className="text-gray-500 text-sm">No applications yet.</p>
                      ) : (
                        <div className="space-y-3">
                          {applications.map((a) => (
                            <div key={a.id} className="border rounded-xl p-4 bg-white">
                              <div className="flex justify-between text-sm text-gray-500 mb-1">
                                <span>
                                  {a.name} &lt;{a.email}&gt;
                                </span>
                                <span>{new Date(a.created_at || a.createdAt).toLocaleString()}</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">
                                Position: {a.position || "N/A"}
                              </p>
                              {a.phone && <p className="text-sm text-gray-600 mb-1">Phone: {a.phone}</p>}
                              {(a.cv_path || a.cvPath) && (
                                <p className="text-sm mb-2">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDownloadCv(
                                        a.id,
                                        a.cv_original_name || a.cvOriginalName,
                                      )
                                    }
                                    disabled={downloadingCvId === a.id}
                                    className="inline-flex items-center gap-1.5 text-primary font-semibold hover:underline disabled:opacity-60"
                                  >
                                    <span aria-hidden>📄</span>
                                    {downloadingCvId === a.id ? "Downloading…" : "Download CV"}
                                    {a.cv_original_name || a.cvOriginalName
                                      ? ` (${a.cv_original_name || a.cvOriginalName})`
                                      : ""}
                                  </button>
                                  <a
                                    href={getCvDownloadUrl(a.id)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-3 text-sm text-gray-600 hover:underline"
                                  >
                                    Open in new tab
                                  </a>
                                </p>
                              )}
                              {!a.cv_path && !a.cvPath && (
                                <p className="text-sm text-gray-400 italic">No CV uploaded</p>
                              )}
                              {a.message && (
                                <p className="text-gray-800 whitespace-pre-line">{a.message}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "jobs" && (
                    <div>
                      <h2 className="text-xl font-semibold mb-3">Jobs</h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        <form onSubmit={handleJobSubmit} className="bg-[#F3F3F3] rounded-3xl p-6 space-y-4">
                          <h3 className="text-lg font-semibold mb-2">
                            {jobForm.id ? "Edit job" : "Create new job"}
                          </h3>
                          <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="job-title">
                              Title
                            </label>
                            <input
                              id="job-title"
                              name="title"
                              value={jobForm.title}
                              onChange={handleJobFieldChange}
                              required
                              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1" htmlFor="job-location">
                                Location
                              </label>
                              <input
                                id="job-location"
                                name="location"
                                value={jobForm.location}
                                onChange={handleJobFieldChange}
                                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1" htmlFor="job-type">
                                Type
                              </label>
                              <input
                                id="job-type"
                                name="type"
                                value={jobForm.type}
                                onChange={handleJobFieldChange}
                                placeholder="Full-time, Part-time, Contract..."
                                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="job-category">
                              Category
                            </label>
                            <select
                              id="job-category"
                              name="category"
                              value={jobForm.category}
                              onChange={handleJobFieldChange}
                              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                            >
                              <option value="">— Select —</option>
                              <option value="development">Development</option>
                              <option value="design">Design</option>
                              <option value="finance">Finance Management</option>
                              <option value="customer-service">Customer Service</option>
                              <option value="marketing">Marketing</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="job-description">
                              Description
                            </label>
                            <RichTextEditor
                              value={jobForm.description}
                              onChange={(value) => setJobForm((prev) => ({ ...prev, description: value }))}
                              placeholder="Job description (rich text)..."
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="inline-flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                name="isActive"
                                checked={jobForm.isActive}
                                onChange={handleJobFieldChange}
                                className="rounded border-gray-300"
                              />
                              <span>Visible on site</span>
                            </label>
                            <div className="space-x-2">
                              {jobForm.id && (
                                <button
                                  type="button"
                                  onClick={resetJobForm}
                                  className="text-sm px-3 py-1 rounded-full border border-gray-300"
                                >
                                  Cancel
                                </button>
                              )}
                              <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center justify-center bg-primary text-white px-4 py-1.5 rounded-full text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                              >
                                {jobForm.id ? "Update job" : "Create job"}
                              </button>
                            </div>
                          </div>
                        </form>

                        <div className="space-y-3">
                          {jobs.length === 0 ? (
                            <p className="text-gray-500 text-sm">No jobs yet.</p>
                          ) : (
                            jobs.map((job) => (
                              <div key={job.id} className="border rounded-xl p-4 bg-white">
                                <div className="flex justify-between items-start gap-4 mb-2">
                                  <div>
                                    <h3 className="font-semibold text-sm">{job.title}</h3>
                                  <p className="text-xs text-gray-500">
                                    {[job.location, job.type].filter(Boolean).join(" • ") ||
                                      "Details not set"}
                                    {job.category && ` • ${job.category}`}
                                  </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`text-xs px-2 py-0.5 rounded-full ${
                                        job.is_active ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                                      }`}
                                    >
                                      {job.is_active ? "Active" : "Hidden"}
                                    </span>
                                  </div>
                                </div>
                                {job.description && (
                                  <p className="text-sm text-gray-700 line-clamp-3 whitespace-pre-line">
                                    {typeof job.description === "string" && job.description.startsWith("<")
                                      ? job.description.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 150) + (job.description.length > 150 ? "…" : "")
                                      : job.description}
                                  </p>
                                )}
                                <div className="flex justify-end gap-2 mt-3">
                                  <button
                                    type="button"
                                    onClick={() => handleJobEdit(job)}
                                    className="text-xs px-3 py-1 rounded-full border border-gray-300"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleJobDelete(job.id)}
                                    className="text-xs px-3 py-1 rounded-full border border-red-200 text-red-600"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "blogs" && (
                    <div>
                      <h2 className="text-xl font-semibold mb-3">Blogs</h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        <form
                          onSubmit={handleBlogSubmit}
                          className="bg-[#F3F3F3] rounded-3xl p-6 space-y-4"
                        >
                          <h3 className="text-lg font-semibold mb-2">
                            {blogForm.id ? "Edit blog" : "Create new blog"}
                          </h3>
                          <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="blog-title">
                              Title
                            </label>
                            <input
                              id="blog-title"
                              name="title"
                              value={blogForm.title}
                              onChange={handleBlogFieldChange}
                              required
                              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              The slug is generated automatically from the title.
                            </p>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="blog-short">
                              Short description
                            </label>
                            <textarea
                              id="blog-short"
                              name="shortDescription"
                              value={blogForm.shortDescription}
                              onChange={handleBlogFieldChange}
                              rows={3}
                              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="blog-image">
                              Main image
                            </label>
                            <input
                              id="blog-image"
                              type="file"
                              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                              onChange={(e) => setBlogImageFile(e.target.files?.[0] || null)}
                              className="block w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary file:text-white file:font-semibold file:cursor-pointer hover:file:bg-primary-dark"
                            />
                            <div className="mt-2 flex items-center gap-2">
                              <button
                                type="button"
                                onClick={handleBlogImageUpload}
                                disabled={!blogImageFile || uploadingImage}
                                className="text-xs px-3 py-1 rounded-full border border-gray-300 disabled:opacity-60 disabled:cursor-not-allowed"
                              >
                                {uploadingImage ? "Uploading…" : "Upload image"}
                              </button>
                              <span className="text-xs text-gray-500">
                                You can also just click Create/Update; selected file auto-uploads.
                              </span>
                              {blogForm.coverImage && (
                                <span className="text-xs text-gray-500 break-all">
                                  {blogForm.coverImage}
                                </span>
                              )}
                            </div>
                            {blogForm.coverImage && (
                              <img
                                src={resolveMediaUrl(blogForm.coverImage)}
                                alt="Blog cover preview"
                                className="mt-3 w-full max-w-xs rounded-xl object-cover aspect-4/3 border border-gray-200"
                              />
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Content
                            </label>
                            <RichTextEditor
                              value={blogForm.contentHtml}
                              onChange={(value) =>
                                setBlogForm((prev) => ({ ...prev, contentHtml: value }))
                              }
                              placeholder="Blog content (rich text)..."
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <label className="inline-flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                name="isPublished"
                                checked={blogForm.isPublished}
                                onChange={handleBlogFieldChange}
                                className="rounded border-gray-300"
                              />
                              <span>Published</span>
                            </label>
                            <div className="space-x-2">
                              {blogForm.id && (
                                <button
                                  type="button"
                                  onClick={resetBlogForm}
                                  className="text-sm px-3 py-1 rounded-full border border-gray-300"
                                >
                                  Cancel
                                </button>
                              )}
                              <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center justify-center bg-primary text-white px-4 py-1.5 rounded-full text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                              >
                                {blogForm.id ? "Update blog" : "Create blog"}
                              </button>
                            </div>
                          </div>
                        </form>

                        <div className="space-y-3">
                          {blogs.length === 0 ? (
                            <p className="text-gray-500 text-sm">No blogs yet.</p>
                          ) : (
                            blogs.map((b) => (
                              <div key={b.id} className="border rounded-xl p-4 bg-white">
                                <div className="flex justify-between items-start gap-4 mb-2">
                                  <div className="min-w-0">
                                    <h3 className="font-semibold text-sm truncate">{b.title}</h3>
                                    <p className="text-xs text-gray-500 truncate">
                                      Slug: <span className="font-mono">{b.slug}</span>
                                    </p>
                                  </div>
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded-full ${
                                      b.isPublished ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                                    }`}
                                  >
                                    {b.isPublished ? "Published" : "Draft"}
                                  </span>
                                </div>
                                {b.coverImage && (
                                  <img
                                    src={resolveMediaUrl(b.coverImage)}
                                    alt=""
                                    className="w-full h-28 object-cover rounded-lg mb-2 border border-gray-100"
                                    loading="lazy"
                                  />
                                )}
                                {b.shortDescription && (
                                  <p className="text-sm text-gray-700 line-clamp-3">
                                    {b.shortDescription}
                                  </p>
                                )}
                                <div className="flex justify-end gap-2 mt-3">
                                  <button
                                    type="button"
                                    onClick={() => handleBlogEdit(b)}
                                    className="text-xs px-3 py-1 rounded-full border border-gray-300"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleBlogDelete(b.id)}
                                    className="text-xs px-3 py-1 rounded-full border border-red-200 text-red-600"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
          </div>
      </section>
    </>
  )
}
