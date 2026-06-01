import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import DOMPurify from "dompurify"

import { Seo } from "../components/Seo"
import { fetchBlogBySlug, resolveMediaUrl } from "../lib/api"

const SAFE_HTML = {
  ALLOWED_TAGS: [
    "p",
    "br",
    "strong",
    "em",
    "u",
    "s",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "ul",
    "ol",
    "li",
    "a",
    "blockquote",
    "code",
    "pre",
    "hr",
    "img",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
  ],
  ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "title", "class"],
}

export default function BlogDetail() {
  const { slug } = useParams()
  const [error, setError] = useState("")
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    let cancelled = false

    fetchBlogBySlug(slug)
      .then((res) => {
        if (cancelled) return
        setError("")
        setBlog(res.blog)
      })
      .catch((err) => {
        if (cancelled) return
        setBlog(null)
        setError(err.message || "Blog not found")
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  const sanitized = useMemo(() => {
    const html = blog?.contentHtml || ""
    if (!html) return ""
    return DOMPurify.sanitize(html, SAFE_HTML)
  }, [blog?.contentHtml])

  return (
    <>
      <Seo
        title={blog?.title || "Blog"}
        description={blog?.shortDescription || "Blog post"}
        path={slug ? `/blogs/${slug}` : undefined}
      />

      <section className="py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {!blog && !error ? (
            <p className="text-gray-500">Loading…</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <>
              {/* Header (matches Figma): topic line, big centered title, centered date */}
              <p className="text-center text-[14px] md:text-[20px] font-medium text-black">
                By Intellect Choice Team
              </p>
              <h1 className="mt-4 text-center text-[30px] md:text-[56px] lg:text-[70px] font-semibold text-black uppercase leading-tight">
                {blog.title}
              </h1>
              {blog.createdAt && (
                <p className="mt-6 text-center text-[14px] md:text-[20px] font-medium text-black">
                  {new Date(blog.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  })}
                </p>
              )}
              {blog.shortDescription && (
                <p className="mt-10 text-base md:text-lg text-black leading-relaxed max-w-4xl mx-auto">
                  {blog.shortDescription}
                </p>
              )}
              {blog.coverImage && (
                <img
                  src={resolveMediaUrl(blog.coverImage)}
                  alt={blog.title}
                  className="mt-10 w-full rounded-2xl object-cover max-h-[520px]"
                />
              )}

              <div className="mt-12 prose prose-sm md:prose-base max-w-none">
                {sanitized ? (
                  <div dangerouslySetInnerHTML={{ __html: sanitized }} />
                ) : (
                  <p className="text-gray-500">No content yet.</p>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}

