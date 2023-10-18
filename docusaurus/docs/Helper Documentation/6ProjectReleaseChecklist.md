# Project Release Checklist

Use this checklist tool for each site released - [frontendchecklist.io](https://frontendchecklist.io/)

### SEO and Meta Data

- This will depend on the project and its requirements and if it needs to be SEO friendly (private projects may not need this)
- Set up meta tags in the index.html file
  - [metatags.io](https://metatags.io/)
  - [The Power of Metadata in Next.js 13 (Part 2): Optimize Your Website’s SEO NOW!](https://medium.com/@danielcracbusiness/the-power-of-metadata-in-next-js-13-part-2-optimize-your-websites-seo-now-d822c82ba920)
  - [theme colour html](https://levelup.gitconnected.com/1-minute-html-tip-theme-colors-44839431eafa)

> [^ Back To Top](#table-of-contents)

### Favicon

- Create a favicon for the site and for all applications that may access the site
  - [realfavicongenerator.net](https://realfavicongenerator.net/)
  > Note: you can create a subfolder at the root called "favicon" and then update the head links to refer to this folder to keep the project tidy

> [^ Back To Top](#table-of-contents)

### 404 Page

- Create a 404 page for catching routing errors
  - [error404.fun](https://error404.fun/)
  - For a Next.js, use the following steps and code (example on [Big Lynn site](https://github.com/bangsluke/BigLynn2023));
    - Add a new page to the `pages` directory
    - Add the following import code: `import { useRouter } from "next/router";`
    - Add the following code: `const router = useRouter();` within the page component
    - Add the following onClick code to a button: `onClick={() => router.back()} // Go back to the last visited page`
- Consider if additional 404 pages are required for other errors, such as 500, 503, etc.

> [^ Back To Top](#table-of-contents)

### Page Speed Testing

- Reduce your image sizes
  - [9 Image optimisation techniques](https://medium.com/@arulvalananto/9-image-optimization-tricks-for-a-seamless-web-experience-b41867e87e54)
  - Convert all of your jpg and png files to smaller image types such as webp
  - Lazy Load
    - Lazy load images and videos - add to the image and iframe tags `loading="lazy"`
- Optimise the site for speed
  - If using React, then visit <https://reacthandbook.dev/react-performance-optimization?utm_source=reactdigest&utm_medium&utm_campaign=1678>
    - See ways to optimize loadtimes - [Link](https://reacthandbook.dev/react-performance-optimization#loadtimes-optimize)
    - See ways to optimize runtimes - [Link](https://reacthandbook.dev/react-performance-optimization#runtimes-optimize)
  - [Next.js App speed increases](https://medium.com/weekly-webtips/10-ways-to-improve-your-next-js-app-performance-8e6f81b32dac)
  - [Next.js Caching Animation](https://www.youtube.com/watch?v=KzS_AG6nWdg)
  - [Low-Hanging Web Performance Fruits: A Cheat Sheet](https://betterprogramming.pub/low-hanging-web-performance-fruits-a-cheat-sheet-3aa1d338b6c1)
    - Optimize Your Assets
    - Cache Your Assets
    - Split Your Code
    - Optimize Your Bundle
    - Manage Third-Party Scripts
  - [Everything you need to know about Web Performance (in 5 Minutes)](https://dev.to/vue-storefront/everything-you-need-to-know-about-web-performance-as-a-dev-in-5-minutes-450l)
  - [Senior Engineering Strategies for Advanced React and TypeScript](https://asimzaidi.medium.com/senior-engineering-strategies-for-advanced-react-and-typescript-9d7aa8a07fd8)
    - Specifically look at the Performance section for the LazyLoadedComponent
  - [Sniper-CSS, avoid unused styles](https://link.medium.com/JK0GxKTA7yb)
- Check the speed of the app and improve where possible
  - Use <https://www.webpagetest.org/> to test the speed of the site
    - Mark the tick box to Audit using Lighthouse
    - Review the results and make improvements based on the potential opportunities the tool suggests
  - Other Speed Testing Tools
    - Use Chrome DevTools LightHouse tool
    - [GTmetrix](https://gtmetrix.com/)

> [^ Back To Top](#table-of-contents)

## Framework Specific Checks

- If using Next.js
  - [Advanced Next JS Concepts](https://blog.devgenius.io/advanced-next-js-concepts-8439a8752597)
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

  - Add Next.js Analytics (see section 4.d of the above article)
    - <https://nextjs.org/analytics>

### Other General Tests

- Check that if you have a fixed header, the page scrolls to the correct position when clicking on a link - (<https://calvinke.com/seo/fixed-header-anchor-css/>)
- Check that the site works on all devices and browsers - [BrowserStack](https://www.browserstack.com/)

> [^ Back To Top](#table-of-contents)

### ![GitHub Logo](https://i.imgur.com/zD0C9oF.png) GitHub Information

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

### Other Options

- [Remove console logs from Production](https://dev.to/gulshanaggarwal/say-goodbye-to-consolelog-from-production-environment-5382)
- [Add a share button](https://dev.to/dailydevtips1/using-the-native-web-share-javascript-api-23ei)
- [Markup validation](https://validator.w3.org/)

> [^ Back To Top](#table-of-contents)
