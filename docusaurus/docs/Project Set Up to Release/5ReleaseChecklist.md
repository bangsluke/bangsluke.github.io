---
slug: /project-set-up-to-release/release-checklist
description: A checklist developed to confirm the software is ready for release
---

# Release Checklist

> [Back to Documentation Intro Contents](../DocumentationIntro.md)


:::info
See [Release](../SDLC/release) for more information on the release phase of the SDLC.
:::

## Checklist

Use this checklist tool for each site released - <a href="https://frontendchecklist.io/" target="_blank">frontendchecklist.io</a>

<PageBreak />

## Versioning

Use <Tooltip text="Semantic Versioning (SemVer)" definition="A versioning scheme using MAJOR.MINOR.PATCH where: MAJOR = breaking changes, MINOR = new features (backwards-compatible), PATCH = bug fixes." /> (`MAJOR.MINOR.PATCH`) to communicate the nature of changes:

- **MAJOR** (1.0.0 -> 2.0.0) - Breaking changes that require consumer updates
- **MINOR** (1.0.0 -> 1.1.0) - New features that are backwards-compatible
- **PATCH** (1.0.0 -> 1.0.1) - Bug fixes and minor improvements

### <Tooltip text="Conventional Commits" definition="A commit message convention (e.g. feat:, fix:, chore:) that tools can parse to automatically determine version bumps and generate changelogs." /> {#conventional-commits}

Adopt the <a href="https://www.conventionalcommits.org/" target="_blank">Conventional Commits</a> format for your commit messages:

- `feat: add user dashboard` - triggers a MINOR version bump
- `fix: correct login redirect` - triggers a PATCH version bump
- `feat!: redesign API response format` - triggers a MAJOR version bump

### Automated Version Bumping

Automate version bumping and changelog generation using one of these tools:

- <a href="https://github.com/semantic-release/semantic-release" target="_blank">semantic-release</a> - Fully automated versioning based on commit messages
- <a href="https://github.com/changesets/changesets" target="_blank">Changesets</a> - Explicit changeset files for more control
- <a href="https://github.com/googleapis/release-please" target="_blank">Release Please</a> - GitHub-native release automation

:::tip[Automate Your Changelog]
Tools like semantic-release parse your Conventional Commits and automatically generate release notes, create GitHub releases, and bump version numbers. This eliminates manual changelog maintenance and ensures every release is properly documented.
:::

:::info
See [Release - Versioning](../SDLC/release#versioning) for more detail on versioning strategies and release management.
:::

<PageBreak />

## <Tooltip text="Feature Flags" definition="Configuration switches that allow you to enable or disable features at runtime without deploying new code, enabling progressive rollout and instant rollback." /> {#feature-flags}

Feature flags decouple **deployment** from **release**. Code can be deployed to production but hidden behind a flag until you are ready to activate it.

### Why Use Feature Flags?

- **Progressive rollout** - Enable a feature for a subset of users first, monitor, then roll out to everyone
- **Kill switches** - Instantly disable a problematic feature without a new deployment
- **Incomplete features** - Deploy work-in-progress code safely behind a flag

### Implementation Options

For solo developers, start simple and scale up:

- **Simple:** Environment variables (`NEXT_PUBLIC_ENABLE_NEW_DASHBOARD=true`)
- **Better:** <a href="https://flagsmith.com/" target="_blank">Flagsmith</a> (open-source, free tier) or <a href="https://www.getunleash.io/" target="_blank">Unleash</a> (self-hosted)
- **Best:** <a href="https://launchdarkly.com/" target="_blank">LaunchDarkly</a> (managed platform with analytics)

:::note[Flag Hygiene]
Feature flags are <Tooltip text="technical debt" definition="The accumulated cost of shortcuts, deferred maintenance, and sub-optimal decisions that slow future development." />. Once a feature is fully rolled out and stable, remove the flag and its conditional code. Review and clean up flags quarterly.
:::

<PageBreak />

## Rollback Plan

Every release needs a tested rollback procedure. "We'll fix forward" is a plan, but it should not be the **only** plan.

### Simple Rollback Strategies

| Strategy | When to use | How |
|----------|------------|-----|
| **Git revert** | Any deployment | `git revert <commit>` and redeploy |
| **PaaS instant rollback** | Netlify, Vercel, Railway | One-click rollback in the dashboard to previous deployment |
| **Feature flag toggle** | Feature-specific issues | Disable the flag, feature disappears instantly |
| **Blue/green switch** | Container/cloud deployments | Switch traffic back to the previous environment |

### Pre-Release Rollback Checklist

Before every release, confirm:

- [ ] You know how to roll back (which method, which commands)
- [ ] Database migrations are backward-compatible (old code works with new schema)
- [ ] The previous deployment is still available (not overwritten)

:::warning[Non-Negotiable]
If you cannot roll back a deployment within minutes, you do not have a deployment process - you have a one-way door. Test your rollback procedure before you need it in an emergency.
:::

:::info
See [Deploy - Deployment Strategies](../SDLC/deploy#deployment-strategies) for more detail on blue/green, canary, and rolling deployment strategies.
:::

<PageBreak />

## <Tooltip text="SEO" definition="Search Engine Optimisation: practices that help search engines index and rank your site." /> and Meta Data {#seo-and-meta-data}

- This will depend on the project and its requirements and if it needs to be SEO friendly (private projects may not need this)
- Set up <Tooltip text="meta tags" definition="HTML tags in the head that describe the page (title, description, social preview) for browsers and search engines." /> in the index.html file
  - <a href="https://metatags.io/" target="_blank">metatags.io</a>
  - <a href="https://levelup.gitconnected.com/the-power-of-metadata-in-next-js-13-part-3-optimize-your-websites-seo-now-a64e9fc1f5f9" target="_blank">The Power of Metadata in Next.js 13 (Part 3): Optimize Your Website's SEO NOW!</a>
  - <a href="https://medium.com/@danielcracbusiness/the-power-of-metadata-in-next-js-13-part-2-optimize-your-websites-seo-now-d822c82ba920" target="_blank">The Power of Metadata in Next.js 13 (Part 2): Optimize Your Website's SEO NOW!</a>
  - <a href="https://levelup.gitconnected.com/1-minute-html-tip-theme-colors-44839431eafa" target="_blank">Theme colour HTML tag</a>

<PageBreak />

## Favicon

- Create a favicon for the site and for all applications that may access the site
  - <a href="https://realfavicongenerator.net/" target="_blank">realfavicongenerator.net</a>
    > Note: you can create a subfolder at the root called "favicon" and then update the head links to refer to this folder to keep the project tidy

<PageBreak />

## User Experience

- <a href="https://medium.com/@amareshadak/12-frontend-micro-interactions-that-users-secretly-judge-d0b333165191" target="_blank">12 Frontend Micro-Interactions That Users Secretly Judge</a>

### <Tooltip text="404 page" definition="The page shown when a user requests a URL that does not exist on the site." /> {#404-page}

- Create a 404 page for catching routing errors
  - <a href="https://error404.fun/" target="_blank">error404.fun</a>
  - For a Next.js, use the following steps and code (example on <a href="https://github.com/bangsluke/BigLynn2023" target="_blank">Big Lynn site</a>);
    - Add a new page to the `pages` directory
    - Add the following import code: `import { useRouter } from "next/router";`
    - Add the following code: `const router = useRouter();` within the page component
    - Add the following onClick code to a button: `onClick={() => router.back()} // Go back to the last visited page`
- Consider if additional 404 pages are required for other errors, such as 500, 503, etc.

<PageBreak />

## Page Speed Testing

- Remove unused packages in package.json - You can check those items by running `npx depcheck`.
- Reduce your image sizes
  - <a href="https://medium.com/@arulvalananto/9-image-optimization-tricks-for-a-seamless-web-experience-b41867e87e54" target="_blank">9 Image optimisation techniques</a>
  - Convert all of your jpg and png files to smaller image types such as webp
  - <Tooltip text="Lazy load" definition="Loading images or other assets only when they are about to come into view, to improve initial load time." />
    - Lazy load images and videos - add to the image and iframe tags `loading="lazy"`
- Optimise your data speed
  - <a href="https://medium.com/data-science-community-srm/json-is-incredibly-slow-heres-whats-faster-ca35d5aaf9e8" target="_blank">JSON is incredibly slow, here's what's faster</a>
  - <a href="https://javascript.plainenglish.io/how-to-make-your-javascript-code-blazingly-fast-with-this-one-simple-trick-92c53adbf1a1" target="_blank">How to Make Your JavaScript Code Blazingly Fast With This One Simple Trick! 🔥</a>
- Optimise the site for speed
  - Remove dependencies that are not required - `npx depcheck`
  - If using React, then visit <a href="https://reacthandbook.dev/react-performance-optimization?utm_source=reactdigest&utm_medium&utm_campaign=1678" target="_blank">Reacthandbook.dev</a>
    - See ways to optimize loadtimes - <a href="https://reacthandbook.dev/react-performance-optimization#loadtimes-optimize" target="_blank">Link</a>
    - See ways to optimize runtimes - <a href="https://reacthandbook.dev/react-performance-optimization#runtimes-optimize" target="_blank">Link</a>
  - <a href="https://medium.com/weekly-webtips/10-ways-to-improve-your-next-js-app-performance-8e6f81b32dac" target="_blank">Next.js App speed increases</a>
  - <a href="https://www.youtube.com/watch?v=KzS_AG6nWdg" target="_blank">Next.js Caching Animation</a>
  - <a href="https://betterprogramming.pub/low-hanging-web-performance-fruits-a-cheat-sheet-3aa1d338b6c1" target="_blank">Low-Hanging Web Performance Fruits: A Cheat Sheet</a>
    - Optimize Your Assets
    - Cache Your Assets
    - Split Your Code
    - Optimize Your Bundle
    - Manage Third-Party Scripts
  - <a href="https://dev.to/vue-storefront/everything-you-need-to-know-about-web-performance-as-a-dev-in-5-minutes-450l" target="_blank">Everything you need to know about Web Performance (in 5 Minutes)</a>
  - <a href="https://asimzaidi.medium.com/senior-engineering-strategies-for-advanced-react-and-typescript-9d7aa8a07fd8" target="_blank">Senior Engineering Strategies for Advanced React and TypeScript</a>
    - Specifically look at the Performance section for the LazyLoadedComponent
  - Clean up CSS
    - <a href="https://unused-css.com/" target="_blank">Unused CSS</a>
    - <a href="https://link.medium.com/JK0GxKTA7yb" target="_blank">Sniper-CSS, avoid unused styles</a>
- Check the speed of the app and improve where possible
  - Use <a href="https://www.webpagetest.org/" target="_blank">WebPageTest</a> to test the speed of the site
    - Mark the tick box to Audit using Lighthouse
    - Review the results and make improvements based on the potential opportunities the tool suggests
  - <a href="https://javascript.plainenglish.io/optimizing-web-performance-keeping-long-tasks-under-50ms-with-the-rail-model-d13504f45f63" target="_blank">Reduce tasks over 50ms</a>
  - Other Speed Testing Tools
    - Use Chrome DevTools LightHouse tool
    - <a href="https://gtmetrix.com/" target="_blank">GTmetrix</a>

<PageBreak />

## Console Logs

- Delete all `console.logs` - It's important to remove console.log in production code to prevent sensitive information leaks and enhance performance
- Investigate and fix all `console.errors` and `console.warning` - It's important to address console errors in production code to maintain a smooth and error-free user experiences.
- Framework links
  - Next.js - <a href="https://medium.com/@halilatilla/removing-console-logs-in-next-js-projects-c55713a9f635" target="_blank">Removing Next JS Console Logs</a>

<PageBreak />

## Framework Specific Checks

- If using Next.js
  - <a href="https://blog.devgenius.io/advanced-next-js-concepts-8439a8752597" target="_blank">Advanced Next JS Concepts</a>
  - <a href="https://javascript.plainenglish.io/get-the-best-performance-on-your-next-js-app-f407cc25d1f9" target="_blank">Get the best performance from your Next.js app</a>
  - Make sure to optimize images using next/image. e.g.

    ```javascript
    import Image from "next/image";
    <Image
      src="/images/my-image.jpg"
      alt="My Image"
      width={500}
      height={500}
      loading="lazy"
    />;
    ```

  - Add Next.js Analytics (see section 4.d of the above article) - <a href="https://nextjs.org/analytics" target="_blank">Link</a>

<PageBreak />

## Other General Tests

- Check that if you have a fixed header, the page scrolls to the correct position when clicking on a link - <a href="https://calvinke.com/seo/fixed-header-anchor-css/" target="_blank">Link</a>
- Check that the site works on all devices and browsers - <a href="https://www.browserstack.com/" target="_blank">BrowserStack</a>
- Check that input boxes are using the correct attributes to help user input - <a href="https://better-mobile-inputs.netlify.app/" target="_blank">Better Mobile Inputs</a>

<PageBreak />

## <Tooltip text="Deployment Strategy" definition="The method used to move new code to production while minimising downtime and risk, such as rolling, blue/green, or canary deployments." /> {#deployment-strategy}

:::info
See [Deploy](../SDLC/deploy) for comprehensive deployment guidance including infrastructure as code and environment management.
:::

Before releasing, decide on your deployment approach:

| Strategy | Complexity | Downtime | Best for |
|----------|-----------|----------|----------|
| **Recreate** | Low | Brief outage | Internal tools, non-critical apps |
| **Rolling** | Medium | Zero | Stateless apps behind a load balancer |
| **<Tooltip text="Blue/Green" definition="A deployment strategy using two identical environments - deploy to the idle one, test it, then switch traffic, enabling instant rollback." />** | Medium | Zero | Apps needing instant rollback |
| **<Tooltip text="Canary" definition="A deployment strategy that rolls out changes to a small subset of users first, monitors for issues, then gradually increases the rollout percentage." />** | High | Zero | High-traffic apps needing real-world validation |

For solo developers using a <Tooltip text="PaaS" definition="Platform as a Service: a cloud service (e.g. Vercel, Netlify, Railway) that handles infrastructure so developers can focus on application code." /> (Netlify, Vercel), the platform handles most of this for you - push to `main` and it deploys automatically with instant rollback available in the dashboard.

### <Tooltip text="Secrets Management" definition="The practice of securely storing, accessing, and rotating sensitive values like API keys, database credentials, and encryption keys." /> {#secrets-management}

:::danger[Production Secrets]
Never store production secrets in `.env` files committed to source control. Even if `.env` is in `.gitignore`, relying solely on local files for production secrets is fragile and insecure.
:::

For production deployments:

- **PaaS environment variables:** Use the platform's built-in secrets management (Netlify/Vercel environment variables, set via their dashboard - not committed to code)
- **Dedicated secrets managers:** For more complex setups, use <a href="https://www.doppler.com/" target="_blank">Doppler</a> (free tier available), <a href="https://www.vaultproject.io/" target="_blank">HashiCorp Vault</a>, or cloud-native solutions (AWS Secrets Manager, Azure Key Vault)
- **Rotate secrets** on a defined schedule and audit access

<PageBreak />

## Monitoring and Observability Setup

:::info
See [Monitor](../SDLC/monitor) and [Operate](../SDLC/operate) for comprehensive guidance on monitoring, alerting, and incident management.
:::

Set up monitoring **before** launch, not after your first outage. Even for solo projects, basic monitoring is essential.

### The Golden Signals {#golden-signals}

Monitor these four signals (<Tooltip text="Golden Signals" definition="The four most important metrics for monitoring any user-facing system: latency, traffic, errors, and saturation." />) for every user-facing service:

1. **Latency** - How long it takes to serve a request
2. **Traffic** - The volume of demand (requests per second, page views)
3. **Errors** - The rate of requests that fail (HTTP 5xx, unhandled exceptions)
4. **Saturation** - How "full" your service is (CPU, memory, bandwidth)

### Minimum Monitoring Stack for Solo Developers

| Need | Tool | Cost |
|------|------|------|
| **Uptime monitoring** | <a href="https://betteruptime.com/" target="_blank">BetterUptime</a> or <a href="https://uptimerobot.com/" target="_blank">UptimeRobot</a> | Free tier |
| **Error tracking** | <a href="https://sentry.io/" target="_blank">Sentry</a> | Free tier |
| **Product analytics** | <a href="https://posthog.com/" target="_blank">PostHog</a> or <a href="https://umami.is/" target="_blank">Umami</a> | Free / self-hosted |
| **Performance** | Lighthouse CI (in your GitHub Actions) | Free |

### Basic Alerting

- Set up Sentry email/Slack notifications for new errors
- Configure uptime monitoring to alert when your site goes down
- Review error logs weekly to catch recurring issues before users report them

:::tip[Pre-Launch Non-Negotiable]
Instrument the golden signals and set up error tracking before launch, not after your first outage. Sentry takes 10 minutes to set up and catches errors you would never see otherwise.
:::

<PageBreak />

## Incident Response Basics

Even as a solo developer, having a basic incident response process prevents panic when things go wrong.

### Severity Levels

| Severity | Impact | Your Response |
|----------|--------|---------------|
| **Critical** | Site is down or data is lost | Drop everything, fix immediately |
| **Major** | Core feature broken, many users affected | Fix within hours |
| **Minor** | Non-critical bug, workaround exists | Fix in next work session |
| **Low** | Cosmetic issue, edge case | Add to backlog |

### <Tooltip text="Runbook" definition="A step-by-step guide for responding to specific operational scenarios, designed so any on-call engineer can follow it." /> {#runbook}

Write down the answers to these questions before you need them:

- How do I check if the site is up? (monitoring dashboard URL)
- How do I view error logs? (Sentry dashboard, hosting logs)
- How do I roll back to the previous deployment? (platform-specific steps)
- How do I restart the service? (platform-specific steps)
- Who do I contact if the hosting provider is down? (support links)

### <Tooltip text="Blameless Postmortem" definition="A structured review after an incident that focuses on understanding systemic causes and improving processes - never on blaming individuals." /> {#postmortem}

After any significant incident, write a brief postmortem (even just for yourself):

1. **What happened?** - Timeline of events
2. **Why did it happen?** - Root cause
3. **How was it fixed?** - Resolution steps taken
4. **How do I prevent it next time?** - Action items (add a test, improve monitoring, update the runbook)

:::info
See [Operate - Incident Management](../SDLC/operate#incident-management) for more detail on severity levels, on-call rotations, and postmortem processes.
:::

<PageBreak />

## GitHub Information

<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />

<PageBreak displayLine={false} size="1rem" />

- Check that the GitHub repo has all the details that it needs, such as:
  - About Section
    - Description
    - Tags
  - Is public/private
  - Is pinned to main GitHub profile if suitable
- Check that the README has all the required details it needs, including;
  - Structure - [see here](https://www.freecodecamp.org/news/how-to-write-a-good-readme-file/)
  - Project Title
  - Project Description
  - Table of Contents
  - Installation
  - Usage
  - Contributing
  - License
  - Badges
    - Version number
    - Repo status
    - Tests passing
    - Netlify deployment status

<PageBreak />

## Other Options

- <a href="https://dev.to/gulshanaggarwal/say-goodbye-to-consolelog-from-production-environment-5382" target="_blank">Remove console logs from Production</a>
- <a href="https://dev.to/dailydevtips1/using-the-native-web-share-javascript-api-23ei" target="_blank">Add a share button</a>
- <a href="https://validator.w3.org/" target="_blank">Markup validation</a>
