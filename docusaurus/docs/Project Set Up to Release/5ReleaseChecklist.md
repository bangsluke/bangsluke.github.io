---
slug: /project-set-up-to-release/release-checklist
---

# Release Checklist

> [Back to Documentation Intro Contents](../DocumentationIntro.md)

Use this checklist tool for each site released - <a href="https://frontendchecklist.io/" target="_blank">frontendchecklist.io</a>

## SEO and Meta Data

- This will depend on the project and its requirements and if it needs to be SEO friendly (private projects may not need this)
- Set up meta tags in the index.html file
  - <a href="https://metatags.io/" target="_blank">metatags.io</a>
  - <a href="https://levelup.gitconnected.com/the-power-of-metadata-in-next-js-13-part-3-optimize-your-websites-seo-now-a64e9fc1f5f9" target="_blank">The Power of Metadata in Next.js 13 (Part 3): Optimize Your Website's SEO NOW!</a>
  - <a href="https://medium.com/@danielcracbusiness/the-power-of-metadata-in-next-js-13-part-2-optimize-your-websites-seo-now-d822c82ba920" target="_blank">The Power of Metadata in Next.js 13 (Part 2): Optimize Your Website's SEO NOW!</a>
  - <a href="https://levelup.gitconnected.com/1-minute-html-tip-theme-colors-44839431eafa" target="_blank">Theme colour HTML tag</a>

## Favicon

- Create a favicon for the site and for all applications that may access the site
  - <a href="https://realfavicongenerator.net/" target="_blank">realfavicongenerator.net</a>
  > Note: you can create a subfolder at the root called "favicon" and then update the head links to refer to this folder to keep the project tidy

## User Experience

- <a href="https://medium.com/@amareshadak/12-frontend-micro-interactions-that-users-secretly-judge-d0b333165191" target="_blank">12 Frontend Micro-Interactions That Users Secretly Judge</a>

### 404 Page

- Create a 404 page for catching routing errors
  - <a href="https://error404.fun/" target="_blank">error404.fun</a>
  - For a Next.js, use the following steps and code (example on <a href="https://github.com/bangsluke/BigLynn2023" target="_blank">Big Lynn site</a>);
    - Add a new page to the `pages` directory
    - Add the following import code: `import { useRouter } from "next/router";`
    - Add the following code: `const router = useRouter();` within the page component
    - Add the following onClick code to a button: `onClick={() => router.back()} // Go back to the last visited page`
- Consider if additional 404 pages are required for other errors, such as 500, 503, etc.

## Page Speed Testing

- Remove unused packages in package.json - You can check those items by running `npx depcheck`.
- Reduce your image sizes
  - <a href="https://medium.com/@arulvalananto/9-image-optimization-tricks-for-a-seamless-web-experience-b41867e87e54" target="_blank">9 Image optimisation techniques</a>
  - Convert all of your jpg and png files to smaller image types such as webp
  - Lazy Load
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

## Console Logs

- Delete all `console.logs` - It's important to remove console.log in production code to prevent sensitive information leaks and enhance performance
- Investigate and fix all `console.errors` and `console.warning` - It's important to address console errors in production code to maintain a smooth and error-free user experiences.
- Framework links
  - Next.js - <a href="https://medium.com/@halilatilla/removing-console-logs-in-next-js-projects-c55713a9f635" target="_blank">Removing Next JS Console Logs</a>

## Framework Specific Checks

- If using Next.js
  - <a href="https://blog.devgenius.io/advanced-next-js-concepts-8439a8752597" target="_blank">Advanced Next JS Concepts</a>
  - <a href="https://javascript.plainenglish.io/get-the-best-performance-on-your-next-js-app-f407cc25d1f9" target="_blank">Get the best performance from your Next.js app</a>
  - Make sure to optimize images using next/image. e.g.

    ```javascript
    import Image from 'next/image'
    <Image
        src="/images/my-image.jpg"
        alt="My Image"
        width={500}
        height={500}
        loading="lazy"
      />
    ```

  - Add Next.js Analytics (see section 4.d of the above article) - <a href="https://nextjs.org/analytics" target="_blank">Link</a>

## Other General Tests

- Check that if you have a fixed header, the page scrolls to the correct position when clicking on a link - <a href="https://calvinke.com/seo/fixed-header-anchor-css/" target="_blank">Link</a>
- Check that the site works on all devices and browsers - <a href="https://www.browserstack.com/" target="_blank">BrowserStack</a>
- Check that input boxes are using the correct attributes to help user input - <a href="https://better-mobile-inputs.netlify.app/" target="_blank">Better Mobile Inputs</a>

## GitHub Information

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

## Other Options

- <a href="https://dev.to/gulshanaggarwal/say-goodbye-to-consolelog-from-production-environment-5382" target="_blank">Remove console logs from Production</a>
- <a href="https://dev.to/dailydevtips1/using-the-native-web-share-javascript-api-23ei" target="_blank">Add a share button</a>
- <a href="https://validator.w3.org/" target="_blank">Markup validation</a>
