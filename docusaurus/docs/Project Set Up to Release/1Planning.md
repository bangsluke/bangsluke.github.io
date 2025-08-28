# Planning

> [Back to Documentation Intro Contents](../DocumentationIntro.md)

## Decide on Architecture

> If you already have an architecture in mind, jump to [Plan the UI](#plan-the-ui)

If it is just a web app to be built, consider the below Front End, Back End and Database Architecture options. If it also needs to be a mobile app, consider the below Mobile Architecture options.

1. Ask AI to recommend an architecture with justification - see <a href="obsidian://open?vault=Obsidian%20Personal%20Notes&file=01%20Notes%2F02%20Areas%2FLife%20Notes%2FCoding%20Notes%2FAI%20Vibe%20Code%20Prompts" target="_blank">the Obsidian note on AI Prompts here</a>
2. Review the below architecture considerations against the AI output and verify it makes sense


### Front End Architecture

![React Logo](https://i.imgur.com/LMShXOo.png) ![Vite Logo](https://i.imgur.com/smpppHt.png) ![NextJS Logo](https://i.imgur.com/OGtWPsT.png)

- Considerations:
  - Single page application or not?
  - SSR (Server side rendering) or SSG (Static site generation) required?
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
  - Should it be SQL or non SQL?
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


## Plan the UI

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