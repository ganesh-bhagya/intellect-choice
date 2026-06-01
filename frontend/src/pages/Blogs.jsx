import { useEffect, useMemo, useState } from "react"
import { motion as Motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

import { Seo } from "../components/Seo"
import { Button } from "../components/common/Button"
import { fetchPublicBlogs, resolveMediaUrl } from "../lib/api"

import imgCard1 from "../assets/Rectangle 159.webp"
import imgCard2 from "../assets/Rectangle 161.webp"
import imgCard3 from "../assets/Rectangle 163.webp"
import imgCard4 from "../assets/Rectangle 171.webp"
import imgCard5 from "../assets/Rectangle 167.webp"
import imgCard6 from "../assets/Rectangle 169.webp"

const headerStagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
}

const headerItem = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const gridStagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const cardReveal = {
  initial: { opacity: 0, y: 22 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function BlogCard({ post, variant, onOpen }) {
  const isDark = variant === "dark"
  return (
    <Motion.article
      variants={cardReveal}
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{ backgroundColor: isDark ? "#212121" : "#ECECEC" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onOpen}
      role={onOpen ? "link" : undefined}
      tabIndex={onOpen ? 0 : -1}
      onKeyDown={(e) => {
        if (!onOpen) return
        if (e.key === "Enter" || e.key === " ") onOpen()
      }}
    >
      <div className="p-5 md:p-6">
        <div className="rounded-2xl overflow-hidden mb-5">
          <img
            src={post.image}
            alt={post.imageAlt}
            className="w-full object-cover aspect-4/3"
            loading="lazy"
            decoding="async"
          />
        </div>

        <h3 className={`font-semibold text-[18px] md:text-[20px] leading-snug ${isDark ? "text-white" : "text-black"}`}>
          {post.title}
        </h3>
        <p className={`mt-3 text-[13px] md:text-[16px] leading-relaxed ${isDark ? "text-white/90" : "text-black/90"}`}>
          {post.excerpt}
        </p>
        <p className={`mt-6 text-right text-[12px] md:text-[14px] ${isDark ? "text-white/90" : "text-black/80"}`}>
          {post.date}
        </p>
      </div>
    </Motion.article>
  )
}

function getBlogImageSrc(post) {
  const imageCandidate =
    post?.coverImage ||
    post?.cover_image ||
    post?.image ||
    ""

  if (!imageCandidate) return ""
  if (/^https?:\/\//i.test(imageCandidate)) return imageCandidate
  if (imageCandidate.startsWith("/uploads/")) return resolveMediaUrl(imageCandidate)
  return imageCandidate
}

export default function Blogs() {
  const navigate = useNavigate()
  const placeholders = useMemo(
    () => [
      {
        title: "Mastering Modern Web Development: A Complete Guide",
        shortDescription:
          "Learn the latest tools, frameworks, and best practices to build scalable and high-performing web applications.",
        createdAt: "Dec 12, 2025",
        image: imgCard1,
        imageAlt: "Abstract curved architecture pattern",
        slug: "mastering-modern-web-development-a-complete-guide",
      },
      {
        title: "The Art of UI/UX Design: Best Practices and Tips",
        shortDescription:
          "Discover how great design improves user experience and boosts engagement across digital products.",
        createdAt: "Dec 12, 2025",
        image: imgCard2,
        imageAlt: "UI/UX design mockups and stationery on a desk",
        slug: "the-art-of-ui-ux-design-best-practices-and-tips",
      },
      {
        title: "Optimizing Web Performance for Faster Load Times",
        shortDescription:
          "Explore techniques to improve website speed, enhance performance, and deliver seamless user experiences.",
        createdAt: "Dec 12, 2025",
        image: imgCard3,
        imageAlt: "Hands typing on a laptop keyboard",
        slug: "optimizing-web-performance-for-faster-load-times",
      },
      {
        title: "UX/UI Strategies for Building Intuitive Interfaces",
        shortDescription:
          "Learn key principles to design user-friendly interfaces that enhance usability and satisfaction.",
        createdAt: "Dec 12, 2025",
        image: imgCard4,
        imageAlt: "Neon light installation in a dark room",
        slug: "ux-ui-strategies-for-building-intuitive-interfaces",
      },
      {
        title: "Responsive Design: Building for Every Device",
        shortDescription:
          "Ensure your applications work seamlessly across all screen sizes with modern responsive design techniques.",
        createdAt: "Dec 12, 2025",
        image: imgCard5,
        imageAlt: "Minimal objects and shapes on a warm background",
        slug: "responsive-design-building-for-every-device",
      },
      {
        title: "Optimizing Web Performance for Faster Load Times",
        shortDescription:
          "Explore techniques to improve website speed, enhance performance, and deliver seamless user experiences.",
        createdAt: "Dec 12, 2025",
        image: imgCard6,
        imageAlt: "Geometric 3D shape on a blue background",
        slug: "optimizing-web-performance-for-faster-load-times-2",
      },
    ],
    [],
  )

  const [posts, setPosts] = useState(null)
  const [error, setError] = useState("")
  const [limit, setLimit] = useState(6)

  useEffect(() => {
    let cancelled = false
    fetchPublicBlogs({ limit })
      .then((res) => {
        if (cancelled) return
        setError("")
        setPosts(res.blogs || [])
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.message || "Failed to load blogs")
        setPosts([])
      })
    return () => {
      cancelled = true
    }
  }, [limit])

  const isLoading = posts === null && !error
  const displayed = posts?.length ? posts : placeholders.slice(0, limit)
  const canLoadMore = posts?.length ? posts.length >= limit : limit < placeholders.length

  return (
    <>
      <Seo
        title="Blogs"
        description="Insights and articles from Intellect Choice on development, AI, cloud, and digital transformation."
        path="/blogs"
      />

      <section className="bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.div
            className="text-center mb-10 md:mb-14"
            initial="initial"
            animate="animate"
            variants={headerStagger}
          >
            <Motion.h1
              variants={headerItem}
              className="text-3xl md:text-5xl lg:text-[70px] font-semibold text-black uppercase"
            >
              Insights &amp; Articles
            </Motion.h1>
            <Motion.p
              variants={headerItem}
              className="mt-5 md:mt-6 text-black text-xs md:text-lg leading-relaxed max-w-3xl mx-auto"
            >
              At Intellect Choice, we share insights on software development, AI, cloud, and digital
              transformation—helping you stay informed, inspired, and ahead in the tech world.
            </Motion.p>
          </Motion.div>

          <Motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
            initial="initial"
            animate="animate"
            variants={gridStagger}
          >
            {isLoading ? (
              <div className="col-span-full text-center text-gray-500">Loading blogs…</div>
            ) : error ? (
              <div className="col-span-full text-center text-red-600">{error}</div>
            ) : (
              displayed.map((post, idx) => (
                <BlogCard
                  key={`${post.slug || post.title}-${idx}`}
                  post={{
                    title: post.title,
                    excerpt: post.shortDescription || post.excerpt || "",
                    date: post.createdAt
                      ? new Date(post.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        })
                      : post.date,
                    image: getBlogImageSrc(post),
                    imageAlt: post.imageAlt || "Blog cover image",
                  }}
                  variant={idx === 0 ? "dark" : "light"}
                  onOpen={post.slug ? () => navigate(`/blogs/${post.slug}`) : undefined}
                />
              ))
            )}
          </Motion.div>

          <div className="mt-10 md:mt-14 flex justify-center md:justify-end">
            <Button
              variant="primary"
              size="lg"
              icon
              className="normal-case tracking-normal rounded-full px-10"
              onClick={() => {
                setError("")
                setPosts(null)
                setLimit((c) => c + 3)
              }}
              disabled={!canLoadMore}
            >
              Load More
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

