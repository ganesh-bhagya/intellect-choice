# Intellect Choice Website – Development Workflow

## Overview

This document defines the workflow for building the Intellect Choice website using React, Tailwind CSS, Framer Motion, and SEO best practices.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **Vite** | Build tool, fast HMR |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **React Router** | Client-side routing |
| **react-helmet-async** | SEO meta tags |

---

## Architecture

### Folder Structure

```
src/
├── components/         # Reusable components
│   ├── common/        # Buttons, inputs, cards, icons
│   ├── layout/        # Header, Footer, Section
│   └── ui/            # Animated wrappers
├── pages/             # Route-level components
├── hooks/             # Custom hooks
├── utils/             # Helpers, constants
├── assets/            # Images, fonts
├── styles/            # Global styles
└── config/            # SEO, routes, site data
```

### Component Hierarchy

```
App
└── Layout (Header + Outlet + Footer)
    ├── Home
    ├── About
    ├── Services
    ├── Careers
    └── Contact
```

---

## Workflow Phases

### Phase 1: Setup
- [ ] Initialize Vite + React
- [ ] Configure Tailwind (colors, typography)
- [ ] Install Framer Motion, React Router, react-helmet-async
- [ ] Create folder structure

### Phase 2: Design System
- [ ] Define color palette (`#001f4c`, `#0F2244`, light blue accent)
- [ ] Typography scale (sans-serif)
- [ ] Spacing & breakpoints
- [ ] Button variants (primary, secondary, outline)

### Phase 3: Common Components
- [ ] Button (with arrow icon variant)
- [ ] Pill / FilterButton
- [ ] Card (JobCard, ServiceCard, FeatureCard)
- [ ] Input, TextArea
- [ ] SectionTitle
- [ ] Logo
- [ ] Icon set (phone, email, location, social)

### Phase 4: Layout
- [ ] Header (logo, nav links, CTA, hamburger)
- [ ] Footer (columns, links, contact, copyright)

### Phase 5: Pages
- [ ] Home (hero, about, services, CTA)
- [ ] About
- [ ] Services
- [ ] Careers (filters, job cards)
- [ ] Contact (form + Get in Touch card)

### Phase 6: Animations
- [ ] Page load fade/slide
- [ ] Scroll-triggered reveals
- [ ] Button hover states
- [ ] Card stagger on scroll
- [ ] Form focus states

### Phase 7: SEO & Polish
- [ ] Meta tags per page
- [ ] Semantic HTML
- [ ] Image alt attributes
- [ ] Accessibility (contrast, focus, aria)

---

## UI/UX Guidelines

- **Colors**: Dark blue `#001f4c` / `#0F2244`, white, light gray `#F5F5F5`, light blue accent
- **Typography**: Clean sans-serif, bold headings, regular body
- **Spacing**: Consistent padding (py-16, px-6), section gaps
- **Responsive**: Mobile-first, breakpoints sm/md/lg/xl
- **Placeholders**: Use `https://placehold.co/` or local placeholders until images are ready

---

## Agent Roles

| Role | Focus |
|------|-------|
| **UI/UX Engineer** | Layout, spacing, component composition, accessibility |
| **Software Engineer** | React components, hooks, routing, state |
| **Animation Engineer** | Framer Motion variants, scroll triggers, micro-interactions |
| **SEO Engineer** | Meta tags, semantic HTML, structured data |
