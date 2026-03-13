# Intellect Choice

A modern company website built with React, Tailwind CSS, Framer Motion, and SEO best practices.

## Tech Stack

- **React 19** + **Vite**
- **Tailwind CSS v4**
- **Framer Motion** – animations
- **React Router** – routing
- **react-helmet-async** – SEO meta tags

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Project Structure

```
src/
├── components/
│   ├── common/       # Button, Pill, Card, JobCard, Input, Logo, SectionTitle
│   └── layout/       # Header, Footer, Layout
├── pages/            # Home, About, Services, Careers, Contact
├── config/           # site.js, seo.js
├── utils/            # animations.js
└── App.jsx
```

## Images

Placeholder images are used for now. Replace them with real assets in the `public/` folder or `src/assets/`, and update image references in components.

## Documentation

- [docs/WORKFLOW.md](docs/WORKFLOW.md) – Development workflow
- [docs/COMPONENTS.md](docs/COMPONENTS.md) – Component reference
- [docs/ANIMATIONS.md](docs/ANIMATIONS.md) – Framer Motion patterns

## Build

```bash
npm run build
npm run preview   # Preview production build
```
