# Planning

> [Back to Documentation Intro Contents](../DocumentationIntro.md)

## Inspiration

For inspiration for projects, check out the following resources on the `Coding Resources` [Design UI/UX Links Todoist list](https://todoist.com/showTask?id=6132126520&sync_id=6506085362)

Top Links:

- [uizard - UI Design Tool](https://uizard.io/)
- [Dribble - Ideas](https://dribbble.com/search/dashboard)

## Decide on Architecture

If it is just a web app to be built, consider the below Front End, Back End and Database Architecture options. If it also needs to be a mobile app, consider the below Mobile Architecture options.

### Front End Architecture

![React Logo](https://i.imgur.com/LMShXOo.png) ![Vite Logo](https://i.imgur.com/smpppHt.png) ![NextJS Logo](https://i.imgur.com/OGtWPsT.png)

- Considerations:
  - Single page application or not?
  - SSR (Server side rendering) or SSG (Static site generation) required?
- Options:
  - CRA (Create React App)
  - Vite.js
  - Next.js
- Recommendations (from [Robin Wieruch](https://www.robinwieruch.de/react-libraries/)):
  - Vite.js for client-side rendered React applications
  - Next.js server-side rendered React applications
  - Astro for static-side generated React applications

### Back End Architecture

- Considerations:
  - Need to investigate
  - [Backend development is more than writing endpoints for frontend](https://dev.to/this-is-learning/backend-development-is-more-than-writing-endpoints-for-frontend-gl1)
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
> 1. [Which Is Better? SQL vs NoSQL](https://www.youtube.com/watch?v=t0GlGbtMTio&feature=youtu.be&ab_channel=WebDevSimplified)
> 2. [How To Choose a Database for your App](https://www.youtube.com/watch?v=xGCm_cLxets&feature=youtu.be&ab_channel=Prisma)
> 3. [Build a TypeScript API with Express, RapidAPI, and Xata](https://www.youtube.com/watch?v=8MjjmCQIdiY&t=3s&ab_channel=JamesQQuick)

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

- [Expo](https://expo.io/)
- [Capacitor.js](https://capacitorjs.com/)
