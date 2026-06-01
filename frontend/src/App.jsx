import { lazy } from "react"
import { Routes, Route } from "react-router-dom"
import { Layout } from "./components/layout/Layout"

const Home = lazy(() => import("./pages/Home"))
const About = lazy(() => import("./pages/About"))
const Services = lazy(() => import("./pages/Services"))
const Careers = lazy(() => import("./pages/Careers"))
const Contact = lazy(() => import("./pages/Contact"))
const Blogs = lazy(() => import("./pages/Blogs"))
const BlogDetail = lazy(() => import("./pages/BlogDetail"))
const JobApplication = lazy(() => import("./pages/JobApplication"))
const Admin = lazy(() => import("./pages/Admin"))
const AdminLogin = lazy(() => import("./pages/AdminLogin"))

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="careers" element={<Careers />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/:slug" element={<BlogDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="careers/apply" element={<JobApplication />} />
        <Route path="admin" element={<Admin />} />
        <Route path="admin/login" element={<AdminLogin />} />
      </Route>
    </Routes>
  )
}

export default App
