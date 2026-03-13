# Animation Patterns (Framer Motion)

## Patterns in Use

### Page Load
- **Hero sections**: `initial={{ opacity: 0 }}` → `animate={{ opacity: 1 }}`
- **Text elements**: Staggered `y` animation (slide up)
- **Buttons**: `whileHover={{ scale: 1.02 }}`, `whileTap={{ scale: 0.98 }}`

### Scroll-triggered
- **Sections**: `whileInView` with `viewport={{ once: true }}`
- **Cards**: Staggered children via `variants`
- **Job cards**: Fade in + slide up per card

### Micro-interactions
- **Pills / Filters**: `whileHover={{ scale: 1.05 }}`, `whileTap={{ scale: 0.98 }}`
- **Mobile menu**: `AnimatePresence` for open/close
- **Form inputs**: Focus border transition (CSS)

## Adding New Animations

1. Import from `utils/animations.js` for shared variants
2. Use `motion.*` from Framer Motion
3. Prefer `whileInView` for scroll sections over `animate`
4. Keep `duration` between 0.3–0.6s for snappy feel
