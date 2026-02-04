---
trigger: always_on
---

---

## description: Core project configuration and conventions for bangsluke Documentation

# bangsluke Documentation - Project Core

## Critical Rules

1. **Documentation-first**: This is a documentation site. All content changes should prioritize clarity and readability.
2. **Maintain PWA compatibility**: Changes must not break offline functionality or PWA features.
3. **Keep Algolia search working**: Document structure changes should preserve searchability.

**Current Date**: February 2026

---

## Tech Stack

| Layer      | Technology        | Version |
| ---------- | ----------------- | ------- |
| Framework  | Docusaurus        | 3.9.2   |
| UI Library | React             | 18.3.1  |
| Language   | JavaScript        | ES6+    |
| Styling    | Custom CSS        | -       |
| Search     | Algolia DocSearch | -       |
| Deployment | Netlify           | -       |

---

## Project Structure

```
docusaurus/
├── docs/                    # Documentation content (Markdown/MDX)
│   ├── General Documentation/
│   ├── Product Management/
│   ├── Project Set Up to Release/
│   ├── Projects/
│   └── SDLC/
├── src/
│   ├── components/          # React components
│   ├── css/                 # Custom styles
│   ├── pages/               # Custom pages
│   └── theme/               # Theme customizations
├── static/                  # Static assets (images, manifest)
├── docusaurus.config.js     # Main configuration
├── sidebars.js              # Sidebar configuration
└── package.json
```

---

## Conventions

### File Naming

- Documentation files: `kebab-case.md` or `PascalCase.md`
- React components: `PascalCase.js`
- CSS modules: `*.module.css`
- Configuration files: `camelCase.js`

### Documentation Structure

- Each docs folder has a `_category_.json` for sidebar ordering
- Use descriptive headings with proper hierarchy (h1 > h2 > h3)
- Include code examples with syntax highlighting

### Import Aliases

- No custom aliases configured
- Use relative imports from project root

### Code Style

- Use modern ES6+ JavaScript
- Prefer functional components with hooks
- Add JSDoc comments for complex functions
- Keep components small and focused

---

## Maintenance

- When a section of the documentation is updated, added or deleted, update all Tables of Contents that reference it.
- Add links between related pages to help with navigation where relevant.

---

## Deployment

- **Production URL**: https://bangsluke-documentation.netlify.app/
- **Build command**: `yarn build` or `npm run build`
- **Deploy**: Automatic via Netlify on push to main branch

---
