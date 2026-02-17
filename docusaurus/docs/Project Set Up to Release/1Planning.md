---
slug: /project-set-up-to-release/planning
description: The planning phase of defining the scope, objectives, and feasibility of the project
---

# Planning

> [Back to Documentation Intro Contents](../DocumentationIntro.md)

:::info
See [Planning and Design](../SDLC/planning-and-design) for more information on the planning phase of the SDLC.
:::

## Define the Problem and Requirements

Before writing any code or choosing a tech stack, clearly define **what** you are building and **why**. Even for solo or personal projects, a lightweight requirements process prevents scope creep and wasted effort.

### Problem Statement

Write a brief <Tooltip text="PRD" definition="Product Requirement Document: a document that describes the features, requirements, and purpose of a product." /> or problem statement. This does not need to be a formal document - a single page is sufficient. Answer these questions:

- **Who** is the target user?
- **What problem** does this solve for them?
- **What does success look like** (how will you know the project is "done")?

### User Stories

Capture the key functionality as lightweight <Tooltip text="user stories" definition="Short descriptions of a feature from the user's perspective, typically in the format: As a [role], I want [feature] so that [benefit]." />. For example:

- _As a user, I want to sign up with my email so that I can access the app._
- _As a user, I want to view my dashboard so that I can see my recent activity._

:::tip[Why Bother for Solo Projects?]
Even for personal projects, writing a one-page PRD and a handful of user stories saves hours of rework. It forces you to think through what you actually need before you get lost in implementation details.
:::

### Prioritise with MoSCoW

Use <Tooltip text="MoSCoW" definition="A prioritisation method that categorises requirements as Must have, Should have, Could have, and Won't have (this time)." /> to scope your <Tooltip text="MVP" definition="Minimum Viable Product: the smallest version of a product that can be released to validate a hypothesis with real users." />:

- **Must have** - the project is unusable without these
- **Should have** - important but the project works without them
- **Could have** - nice-to-have enhancements
- **Won't have (this time)** - explicitly out of scope for now

This keeps you focused on delivering a working product rather than an ever-expanding feature list.

<PageBreak />

## Assess Feasibility and Risk

Before committing to a build, do a quick feasibility check:

- **Technical feasibility** - Do you have the skills (or can you learn them quickly enough)? Are the required APIs/services available?
- **Cost feasibility** - What will hosting, databases, and third-party services cost? Is there a free tier that works for your scale?
- **Time feasibility** - How long will this realistically take? Be honest about your available hours per week.

Identify the top 2-3 risks and think about mitigations. Common risks for solo projects include: underestimating complexity, choosing unfamiliar technology, and depending on unreliable third-party APIs.

:::warning[Solo Dev Pitfall: Over-Scoping]
The most common mistake for solo developers is trying to build too much at once. Scope aggressively to the MVP - you can always add features later. A shipped MVP beats an unfinished "full product" every time.
:::

<PageBreak />

## Decide on Architecture

> If you already have an architecture in mind, jump to [Plan the UI](#plan-the-ui)

If it is just a web app to be built, consider the below Front End, Back End and Database Architecture options. If it also needs to be a mobile app, consider the below Mobile Architecture options.

1. Ask AI to recommend an architecture with justification - see <a href="obsidian://open?vault=Obsidian%20Personal%20Notes&file=01%20Notes%2F02%20Areas%2FLife%20Notes%2FCoding%20Notes%2FAI%20Vibe%20Code%20Prompts" target="_blank">the Obsidian note on AI Prompts here</a>
2. Review the below architecture considerations against the AI output and verify it makes sense

:::tip[Record Your Decisions]
Create an <Tooltip text="ADR" definition="Architecture Decision Record: a short document that captures an important architectural decision, its context, the options considered, and the rationale for the choice made." /> for every significant architecture choice. A simple markdown file in a `/docs/decisions/` folder that records _what you chose_, _what alternatives you considered_, and _why_ pays dividends when you revisit the project in 6 months. See <a href="https://adr.github.io/" target="_blank">adr.github.io</a> for a lightweight template.
:::

:::info[Monolith First]
For solo developers, a <Tooltip text="monolith" definition="A single, unified application where all features are deployed together." /> is almost always the right starting architecture. It reduces operational complexity and lets you move fast. Avoid <Tooltip text="microservices" definition="An architectural style where a system is built from many small, independently deployable services." /> unless you have a genuine scaling bottleneck that demands it.
:::

### Front End Architecture

- Considerations:
  - <Tooltip text="Single page application (SPA)" definition="A web app that loads one HTML page and updates content dynamically with JavaScript instead of full page reloads." /> or not?
  - <Tooltip text="SSR" definition="Server-Side Rendering: generating HTML on the server for each request so content is ready when the page loads." /> (Server side rendering) or <Tooltip text="SSG" definition="Static Site Generation: building HTML at build time so pages are pre-rendered and served as static files." /> (Static site generation) required?
- Options:
  - CRA (Create React App)
  - Vite.js
  - Next.js
- Recommendations (from <a href="https://www.robinwieruch.de/react-libraries/" target="_blank">Robin Wieruch</a>):
  - Vite.js for client-side rendered React applications
  - Next.js server-side rendered React applications
  - Astro for static-side generated React applications

### Back End Architecture

- Considerations:
  - Need to investigate
  - <a href="https://dev.to/this-is-learning/backend-development-is-more-than-writing-endpoints-for-frontend-gl1" target="_blank">Backend development is more than writing endpoints for frontend</a>
- Options:
  - ExpressJS
  - NodeJS

### Database

- Considerations:
  - Should it be <Tooltip text="SQL" definition="Structured Query Language: a language and type of database that stores data in tables with fixed schemas and relations." /> or <Tooltip text="NoSQL" definition="A broad category of databases that store data in flexible or non-tabular formats (e.g. documents, key-value)." />?
  - How am I going to query my database? Via a client? By the CLI?
  - Consider TypeORM or Prisma for type safe access to your database
- Options:
  - Sequel DBs:
    - Xata
    - MySQL
    - Postgress (recommended)
  - No Sequel DBs:
    - Firebase
    - MongoDB
    - PlanetScale
    - Supebase

> References
>
> 1. <a href="https://www.youtube.com/watch?v=t0GlGbtMTio&feature=youtu.be&ab_channel=WebDevSimplified" target="_blank">Which Is Better? SQL vs NoSQL</a>
> 2. <a href="https://www.youtube.com/watch?v=xGCm_cLxets&feature=youtu.be&ab_channel=Prisma" target="_blank">How To Choose a Database for your App</a>
> 3. <a href="https://www.youtube.com/watch?v=8MjjmCQIdiY&t=3s&ab_channel=JamesQQuick" target="_blank">Build a TypeScript API with Express, RapidAPI, and Xata</a>

### Hosting

- Considerations:
  - How much will hosting the site cost?
  - What features does the hosting provide?
  - What access protection does the hosting service offer for limiting access to your app or database?
- Options:
  - Netlify (free)
  - Vercel
  - Heroku (cheap)
  - DigitalOcean (cheap)
  - Amazon RDS (expensive)
  - BlueHost (basic)

### Mobile Architecture

- <a href="https://reactnative.dev/" target="_blanks">React Native</a>
- <a href="https://expo.io/" target="_blank">Expo</a>
- <a href="https://capacitorjs.com/" target="_blank">Capacitor.js</a>

<PageBreak />

## Plan the UI

:::info
See [Planning and Design - UI/UX Design](../SDLC/planning-and-design#design-phase) for more information on design systems, user research, and prototyping.
:::

### Wireframes and Prototyping

Before jumping into colours and fonts, sketch out the structure and flow of your application using <Tooltip text="wireframes" definition="Simple, low-fidelity layouts that show the structure and flow of a screen without final styling." />. Start low-fidelity (pen and paper or a simple tool) to validate the user flow before investing in high-fidelity mockups.

- <a href="https://www.figma.com/" target="_blank">Figma</a> - Industry-standard design tool (free tier available)
- <a href="https://excalidraw.com/" target="_blank">Excalidraw</a> - Quick, hand-drawn-style wireframing
- <a href="https://balsamiq.com/" target="_blank">Balsamiq</a> - Dedicated wireframing tool

:::tip[Validate Before You Build]
Show your wireframes to at least one other person before coding. Even five minutes of feedback can surface navigation issues or missing flows that would be expensive to fix later.
:::

### Inspiration

For inspiration for projects, check out the following resources:

- Design Tools
  - <a href="https://v0.app/" target="_blank">V0 - UI Design Tool</a>
  - <a href="https://uizard.io/" target="_blank">uizard - UI Design Tool</a>
- Design Inspiration Sources
  - <a href="https://dribbble.com/search/dashboard" target="_blank">Dribble - Ideas</a>
  - <a href="https://godly.website/" target="_blank">Godly - Site Ideas</a>
  - <a href="https://www.siteinspire.com/" target="_blank">SiteInspire - Site Ideas</a>
  - <a href="https://www.uidesigndaily.com/" target="_blank">UI Design Daily - Site Ideas</a>

### Colour Selection

- <a href="https://medium.com/@wakama.ene/5-colour-tips-to-enhance-your-ui-design-f610746f8d33" target="_blank">5 Colour Tips to enhance your UI Design</a>
  1. Understand brand colours
  2. Understand the mood of the app/design
  3. Use colour palette generators - <a href="https://coolors.co/" target="_blank">Coolors</a>
  4. Alternatively, use colour theory using a colour wheel - <a href="https://color.adobe.com/create/color-wheel" target="_blank">Adobe Colour Wheel</a>
  5. Use the 60-30-10 rule
- Alternative Colour Palette Generators
  - <a href="https://www.khroma.co/" target="_blank">Khroma AI colour tool</a>
  - <a href="http://colormind.io/" target="_blank">Colormind AI colour tool</a>
  - <a href="https://www.fffuel.co/pppalette/" target="_blank">fffuel Palette Picker</a>
- Dark Mode Design Guide - <a href="https://medium.com/design-bootcamp/dark-mode-ui-design-organizing-color-variables-and-naming-df3fa005ae77" target="_blank">Dark Mode UI Design - Organizing Color Variables and Naming</a>

### Fonts

- Font Selection
  - <a href="https://www.fontshare.com/" target="_blank">Fontshare</a>
  - <a href="https://fonts.google.com/" target="_blank">Google Fonts</a>
  - <a href="https://fontjoy.com/" target="_blank">Fontjoy</a>

### Design Guides

- <a href="https://medium.com/design-bootcamp/dos-and-don-t-for-ui-design-7e5c86c71cac" target="_blank">Dos and Don'ts for UI Design - 4 parts</a>
- <a href="https://medium.com/@MynaviTechTusVietnam/6-things-ui-ux-designers-forget-to-design-6deabe701c26" target="_blank">6 Things UI/UX Designers Forget to Design</a>
- <a href="https://uxdesign.cc/ui-ux-micro-tips-best-of-2022-389beed6a910" target="_blank">UI/UX Micro Tips Best of 2022</a>
- <a href="https://medium.com/design-bootcamp/improve-your-ui-with-these-successful-ux-laws-546d8ba027dc" target="_blank">Improve your UI with these successful UX Laws</a>

### Web Forms

- <a href="https://www.reddit.com/r/webdev/comments/nm6wcl/18_cards_of_how_to_design_web_forms/?utm_source=share&utm_medium=ios_app&utm_name=iossmf" target="_blank">18 Cards of how to design web forms</a>
- <a href="https://medium.com/design-bootcamp/form-ui-design-36-tips-best-practices-112128c16429" target="_blank">Form UI Design - 36 Tips Best Practices</a>

<PageBreak />

## Estimation

Before starting development, estimate the effort involved so you can set realistic expectations and deadlines for yourself.

### T-Shirt Sizing

Use <Tooltip text="T-shirt sizing" definition="A quick, relative estimation technique using sizes (S, M, L, XL) to categorise work items by effort without committing to precise hours or days." /> to get a rough sense of effort for each feature or user story:

| Size | Meaning | Example |
|------|---------|---------|
| **S** | A few hours of work | Add a static page, tweak styling |
| **M** | 1-2 days of work | Build a form with validation, integrate a simple API |
| **L** | 3-5 days of work | Authentication flow, complex data dashboard |
| **XL** | 1-2 weeks of work | Full CRUD feature with backend, real-time functionality |

:::tip[Timebox Your Discovery]
Do not spend weeks in planning. Timebox your planning phase (1-2 days for a solo project is typically sufficient) and get feedback through working software instead. The goal is to plan enough to start building with confidence, not to predict every detail upfront.
:::
