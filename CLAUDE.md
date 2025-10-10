# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a marketing website for Clínica Rigatti, a Brazilian health clinic specializing in hormone therapy, nutrition, weight loss, and longevity treatments. The site is built with vanilla HTML, CSS (via Tailwind CDN), and vanilla JavaScript with a modular controller architecture.

## Tech Stack

- **HTML5**: Multi-page static site structure
- **Tailwind CSS**: Loaded via CDN with custom theme configuration
- **Vanilla JavaScript**: Modular controllers pattern (no build step)
- **External Dependencies**:
  - Tailwind CSS CDN
  - Font Awesome 6.5.0 (icons)
  - Google Fonts (Poppins)
- **Assets**: All images and videos hosted on AWS S3 (clinicarigatti.s3.sa-east-1.amazonaws.com)

## File Structure

```
/
├── index.html                     # Home page (main entry point)
├── clinica.html                   # About clinic page
├── reposicao-hormonal.html        # Hormone replacement service page
├── soroterapia.html               # Serum therapy service page
├── nutricao.html                  # Nutrition service page
├── emagrecimento.html             # Weight loss service page
├── saude-feminina.html            # Women's health service page
├── modulacao-hormonal.html        # Hormone modulation service page
└── scripts/
    ├── menuController.js          # Sidebar menu logic (used on service pages)
    ├── menuHomeController.js      # Mobile menu logic (specific to home page)
    ├── input.js                   # Form input floating label animation
    ├── formHandler.js             # Contact form validation and submission
    ├── servicesCarouselController.js     # Services carousel with drag/scroll
    ├── teamCarouselController.js         # Infinite team carousel animation
    ├── beforeAndAfterCarouselController.js # Results carousel
    └── youtubeVideosController.js        # YouTube video grid loader
```

## Architecture & Patterns

### Modular JavaScript Controllers

Each JavaScript file follows an IIFE (Immediately Invoked Function Expression) pattern to avoid global scope pollution:

```javascript
(() => {
  // Controller logic here

  function init() {
    // Initialization logic
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
```

### Controller Responsibilities

- **menuController.js**: Manages sidebar overlay menu with hamburger button, handles open/close state, ESC key, and click outside to close
- **menuHomeController.js**: Mobile-specific menu toggle (display: none/flex) for home page
- **input.js**: Floating label animation for form inputs using CSS class manipulation
- **formHandler.js**: Phone number formatting (Brazilian format), form validation, and webhook submission to `https://automacoes.clinicarigatti.com.br/webhook/...`
- **servicesCarouselController.js**: Horizontal scrollable carousel with prev/next buttons, keyboard navigation (arrows), and mouse/touch drag support
- **teamCarouselController.js**: Infinite horizontal auto-scroll animation using `requestAnimationFrame`, duplicates team members array to create seamless loop, pauses on hover
- **beforeAndAfterCarouselController.js**: Complex carousel with variable image sizes (center image larger), infinite loop with array triplication
- **youtubeVideosController.js**: Fetches video metadata from S3 JSON file and dynamically replaces placeholder images with YouTube thumbnails

### Tailwind Configuration

All pages use inline Tailwind config with custom theme:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        sand: '#C1B490',    // Primary brand color
        pearl: '#EEECEA',   // Light background
        coffee: '#45372C',  // Dark brand color
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      letterSpacing: {
        'widest-xl': '0.3125rem',   // 5px
        'widest-2xl': '0.625rem',   // 10px
      }
    }
  }
}
```

### CSS Patterns

- Custom CSS animations in `<style>` tags for carousels (team carousel uses CSS `@keyframes`)
- Gradient masks for fade effects: `-webkit-mask-image` and `mask-image`
- Service cards use CSS variables for hover animations (`--peek: 25%`)
- Mobile-first responsive design with Tailwind breakpoints (max-md:, max-lg:, max-xl:)

## Development Workflow

### No Build Step

This is a static site with no build process. All scripts load via `<script src="..." defer>` tags. Changes are immediately reflected by refreshing the browser.

### Code Style

- **Indentation**: 2 spaces (configured in .vscode/settings.json)
- **Formatting**: Prettier on save (if VS Code extension installed)
- **Language**: Brazilian Portuguese for all content and comments

### Testing Changes

1. Simply open HTML files in browser or use a local server
2. No compilation or bundling required
3. Hard refresh (Ctrl+Shift+R / Cmd+Shift+R) to bypass cache if needed

## Form Submission

Contact form in index.html sends data to webhook at:
```
https://automacoes.clinicarigatti.com.br/webhook/0a1252de-9587-4656-ac2e-2840414b1146
```

**Note**: Form submission code is currently commented out in formHandler.js (lines 73-90), only logging to console.

## External Data Sources

- **Team Members**: Hardcoded array in teamCarouselController.js
- **Before/After Images**: Hardcoded array in beforeAndAfterCarouselController.js
- **YouTube Videos**: Fetched from S3 JSON: `https://clinicarigatti.s3.sa-east-1.amazonaws.com/scripts/videos.json`
- **All Images**: Served from S3 bucket `clinicarigatti.s3.sa-east-1.amazonaws.com`

## Responsive Behavior

- Desktop: Full navigation bar, large hero sections, multi-column layouts
- Tablet/Mobile: Hamburger menu, stacked layouts, touch-friendly carousels
- Breakpoints follow Tailwind defaults: sm (640px), md (768px), lg (1024px), xl (1280px)

## Accessibility Features

- ARIA labels on navigation and carousel buttons
- Keyboard navigation support (arrow keys, ESC key)
- `prefers-reduced-motion` detection in team carousel
- Semantic HTML structure

## Common Tasks

### Adding a New Service Page
1. Copy an existing service HTML file (e.g., reposicao-hormonal.html)
2. Update content, keeping the same structure and Tailwind classes
3. Include menuController.js script at the bottom
4. Add link to new page in all navigation menus (home and service pages)

### Modifying the Team
Edit the `teamMembers` array in teamCarouselController.js:
```javascript
const teamMembers = [
  { name: 'NAME', role: 'ROLE', image: 'S3_URL' },
  // ...
];
```

### Updating Colors
Change colors in the inline Tailwind config present in each HTML file's `<head>` section.

### Modifying Carousel Behavior
- **Speed**: Adjust `SPEED` variable in teamCarouselController.js (default 50 px/s) or `data-speed` attribute
- **Gap**: Modify CSS variables in inline styles (e.g., `--gap: 12px`)
- **Animation**: Edit `@keyframes` for CSS-based animations or `requestAnimationFrame` logic for JS-based ones

## Known Issues & Patterns

- Form submission is currently disabled (commented out) - only logs to console
- No error boundaries or fallback UI for failed S3 fetches
- Team carousel duplicates array 4x for infinite scroll effect (may need adjustment if team size changes significantly)
- Before/after carousel triplicates images array
- All external resources (S3, CDNs) must be accessible - no offline support
