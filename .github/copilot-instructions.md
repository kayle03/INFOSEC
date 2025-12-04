# AutoWash Car Wash Website - Copilot Instructions

## Project Overview
This is a **responsive HTML5/CSS3 template** for a car wash service website built with Bootstrap 4. The project combines static HTML pages with optional backend services (PHP contact form and MongoDB connector). It's a template-based site with no build process—files are served directly.

## Architecture

### Frontend Structure
- **Pages**: 10 HTML pages (index.html, about.html, service.html, price.html, location.html, team.html, blog.html, booking.html, contact.html, single.html)
- **Styling**: Single `css/style.css` (2000+ lines) using Bootstrap 4 grid + custom styles
- **JavaScript**: `js/main.js` handles UI interactions (not a bundled app—vanilla jQuery)
- **Assets**: 
  - Flaticon font library for service icons
  - Owl Carousel for image sliders
  - Animate.css for animations
  - Font Awesome 5 for UI icons

### Backend Integration (Optional)
- **Contact Form**: `mail/contact.js` (jQuery validation) → `mail/contact.php` (email sending)
- **Database**: `connetor.js` (MongoDB v7.0 connection stub—not integrated with frontend)

## Key Patterns & Conventions

### HTML Structure
- All pages follow consistent `.container` + Bootstrap grid layout
- Section-based design: `<!-- [Section Name] Start -->...<!-- [Section Name] End -->`
- Reusable component classes: `.section-header`, `.location-item`, `.price-item`, `.team-item`, `.blog-item`

**Example**: Service cards use `.service-item` with icon (flaticon), heading, and description:
```html
<div class="service-item">
    <i class="flaticon-car-wash-1"></i>
    <h3>Exterior Washing</h3>
    <p>Description text</p>
</div>
```

### CSS Naming
- `.btn-custom` for action buttons (red #E81C2E, transitions on hover)
- `.page-header`, `.nav-bar`, `.top-bar` for major sections
- Responsive utilities: `d-none d-lg-block` (hide on mobile), `.col-lg-3 .col-md-6` (grid)
- Color palette: Primary (#202C45 dark blue), Accent (#E81C2E red), Text (#444444 gray)

### JavaScript Interactivity (main.js)
- **Self-invoking function**: `(function ($) { ... })(jQuery)` for namespacing
- **jQuery event handlers**: `.click()`, `.scroll()`, `.resize()` for UI updates
- **Owl Carousel initialization**: Separate config for main carousel (fade effect) vs testimonials carousel (3-item responsive)
- **Counter animation**: `data-toggle="counter-up"` triggers numeric count-up on scroll with `counterUp` plugin
- **Sticky navbar**: Adds class on scroll > 90px, adjusts carousel margin

### Contact Form Flow
1. HTML form in location section with input fields (#name, #email, #subject, #message)
2. `contact.js`: Validates with jqBootstrapValidation, prevents default submit
3. On valid submit: AJAX POST to `mail/contact.php` with form data
4. PHP endpoint: Sanitizes input, validates email, sends mail to hardcoded recipient
5. Success/error alert displayed in #success div

## Development Workflows

### No Build Process
- Serve files directly (use any local server: `python -m http.server 8000` or VS Code Live Server)
- CSS/JS changes reload immediately in browser
- Modify HTML directly—no compilation needed

### Updating Content
- **Pages**: Edit `.html` files, update navigation links across all pages manually (not templated)
- **Styles**: Add/modify rules in `css/style.css` → Use responsive breakpoints (`@media (max-width: 768px)`)
- **Images**: Replace image paths in HTML; store in `img/` folder

### Contact Form Deployment
- `mail/contact.php` requires server-side PHP support
- Update recipient email in line 14 of `contact.php`: `$to = "your-email@example.com";`
- Test locally with PHP: `php -S localhost:8000` in project root

### Backend Integration (MongoDB - Future)
- `connetor.js` is a standalone test script, not connected to frontend
- To integrate: Would need backend API (Node.js/Express) to expose endpoints that frontend AJAX calls hit

## File Priorities

**Must-edit for customization:**
- `car-wash-website-template/index.html` - Homepage, hero section, services preview
- `car-wash-website-template/css/style.css` - Global styling, theme colors, responsive design
- `mail/contact.php` - Update recipient email before deployment

**Template/Reference:**
- `js/main.js` - Study for jQuery patterns; don't over-modify
- `package.json` - Only MongoDB dependency; project doesn't need npm build

**Don't modify:**
- `lib/` folder - Third-party libraries (Flaticon, Owl Carousel, Animate.css)
- License files in `lib/`

## Common Tasks

| Task | Location | Approach |
|------|----------|----------|
| Add new service card | `service.html` or `index.html` | Copy `.service-item` block, update icon class + text |
| Change brand color | `css/style.css` | Find `#E81C2E` (accent red), `#202C45` (primary blue) and replace |
| Add page to nav | All `.html` pages | Add `<a href="newpage.html">New Page</a>` to `.navbar-nav` |
| Adjust responsive breakpoint | `css/style.css` | Find `@media` queries; Bootstrap uses 576px, 768px, 992px, 1200px |
| Deploy contact form | `mail/contact.php` + hosting | Ensure PHP support, update `$to` email, test via form |

## Known Quirks
- **Pages not linked to nav**: booking.html exists but not in main navbar—check if intentional
- **Contact form**: Currently sends to "info@example.com"—placeholder needs update before live
- **MongoDB connector**: Unused in frontend; appears to be scaffolding for future backend work
- **jQuery 3.4.1**: Older version; update Bootstrap/libraries if modernizing
