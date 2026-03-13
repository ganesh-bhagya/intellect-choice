# Common Components Reference

## Design Tokens

### Colors
- `--primary`: `#001f4c` / `#00204A` (dark blue)
- `--primary-dark`: `#0F2244` (footer, dark sections)
- `--accent`: Light blue/teal for logo and icons
- `--gray-100`: `#F5F5F5` (card backgrounds)
- `--gray-700`: Dark gray for body text

### Typography
- Headings: bold, uppercase for section titles
- Body: regular weight, readable size

---

## Common Components

### Button
- **Variants**: primary, secondary, outline
- **Sizes**: default, lg
- **Props**: `children`, `variant`, `size`, `icon` (arrow), `href`, `onClick`
- **Animation**: hover scale, arrow translate

### Pill / FilterButton
- Used for job filters, tags (100% remote, Full-time)
- Active: solid primary bg
- Inactive: outline border
- **Animation**: background transition, hover scale

### Card
- Base: rounded corners, light gray bg or white, subtle border
- **JobCard**: title, description, tags, Apply link
- **ServiceCard**: icon, title, description
- **FeatureCard**: icon, title, description (Why Choose Us)

### Input / TextArea
- Underline style (no box borders)
- Placeholder labels
- Focus: border color change
- **Animation**: focus border transition

### Logo
- Blue abstract icon + "Intellect Choice" text
- Light variant for dark footer
- **Placeholder**: Use SVG or text until asset ready

### SectionTitle
- Large bold heading
- Optional subheading/description
- Consistent spacing

### Header
- Logo, nav links (Home, About, Services, Careers), Contact CTA
- Hamburger for mobile
- Sticky, white background

### Footer
- 4 columns: Company info, Explore, Services, Contact Us
- Dark blue background
- Copyright bar
