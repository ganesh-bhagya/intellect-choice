import { Helmet } from "react-helmet-async"
import { SEO_DEFAULTS } from "../config/seo"

export function Seo({ title, description, path }) {
  const fullTitle = title ? `${title} | ${SEO_DEFAULTS.siteName}` : SEO_DEFAULTS.title
  const desc = description || SEO_DEFAULTS.description
  const url = path ? `https://intellectchoice.com${path}` : undefined

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={SEO_DEFAULTS.keywords.join(", ")} />
      {url && <link rel="canonical" href={url} />}
    </Helmet>
  )
}
