---
slug: /project-set-up-to-release/testing
description: Links and resources for the testing of the software
---

# Testing

> [Back to Documentation Intro Contents](../DocumentationIntro.md)

## Testing Links

- <a href="https://medium.com/@kristiyan.velkov/the-pyramid-of-testing-in-react-js-or-next-js-a4090d3bfad2" target="_blank">Testing in Next.js and React</a>
- <a href="https://profy.dev/article/cypress-react" target="_blank">Cypress React Tutorial</a>
- Review the testing resources saved in <a href="https://todoist.com/showTask?id=6132185936&sync_id=6506084877" target="_blank">Todoist</a>
- Set up testing throughout the application based on its requirements
- <a href="https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications" target="_blank">Testing Trophy and Testing Classifications</a>
  - <Tooltip text="Static tests" definition="Checks run without executing the app (e.g. ESLint, TypeScript) to catch errors and style issues." /> (<a href="https://eslint.org/" target="_blank">ESLint</a>, <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>) - Done automatically in VS Code e.g. typos and type errors
  - Unit tests (<a href="https://jestjs.io/" target="_blank">Jest</a> / <a href="https://vitest.dev/" target="_blank">Vitest</a> / <a href="https://react-testing-library.com/" target="_blank">React Testing Library</a>)
  - Integration tests (<a href="https://testing-library.com/docs/react-testing-library/intro/" target="_blank">React Testing Library</a> / <a href="https://www.cypress.io/" target="_blank">Cypress</a>)
  - <Tooltip text="E2E tests" definition="End-to-end tests that run against the full app (often in a browser) to simulate real user flows." /> (<a href="https://playwright.dev/" target="_blank">Playwright</a> / <a href="https://www.cypress.io/" target="_blank">Cypress</a>)
    - <a href="https://medium.com/@lucgagan/efficient-e2e-testing-for-next-js-a-playwright-tutorial-06eadfc59111" target="_blank">E2E Playwright testing with Next.js</a>
    - <a href="https://www.browsercat.com/post/ultimate-guide-visual-testing-playwright" target="_blank">Ultimate Guide to Visual Testing with Playwright</a>
- Use AI to write some simple tests

### Static Tests

<img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />

- Static tests are done automatically in VS Code e.g. typos and type errors
- Ensure static testing libraries are set up such as <a href="https://eslint.org/" target="_blank">ESLint</a> or <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>

### Unit Tests

<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest" />
<img src="https://img.shields.io/badge/Vitest-646CFF?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest" />
<img src="https://img.shields.io/badge/React_Testing_Library-E63959?style=for-the-badge&logo=react-testing-library&logoColor=white" alt="React Testing Library" />

- To create unit tests, use AI to write the tests - see the "Testing Prompts" section of the Obsidian note on AI Prompts - and then review the tests and make improvements
- Use a testing library such as <a href="https://jestjs.io/" target="_blank">Jest</a> or <a href="https://testing-library.com/docs/react-testing-library/intro/" target="_blank">React Testing Library</a>
- If using Vite, use <a href="https://vitest.dev/" target="_blank">Vitest</a> for unit tests

### Integration Tests

<img src="https://img.shields.io/badge/React_Testing_Library-E63959?style=for-the-badge&logo=react-testing-library&logoColor=white" alt="React Testing Library" />
<img src="https://img.shields.io/badge/Cypress-2AD796?style=for-the-badge&logo=cypress&logoColor=103045" alt="Cypress" />

- To create integration tests, use AI to write the tests - see the "Testing Prompts" section of the Obsidian note on AI Prompts - and then review the tests and make improvements
- Use a testing library such as <a href="https://testing-library.com/docs/react-testing-library/intro/" target="_blank">React Testing Library</a> or <a href="https://www.cypress.io/" target="_blank">Cypress</a>

### E2E Tests

<img src="https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white" alt="Playwright" />
<img src="https://img.shields.io/badge/Cypress-2AD796?style=for-the-badge&logo=cypress&logoColor=103045" alt="Cypress" />

- For E2E tests, use a testing library such as <a href="https://playwright.dev/" target="_blank">Playwright</a> or <a href="https://www.cypress.io/" target="_blank">Cypress</a>

<PageBreak />

## Performance Testing

- Before releasing the project, test the performance of the project using these tools:
  - <a href="https://lighthouse.dev/" target="_blank">Lighthouse</a> - Chrome DevTools extension
  - <a href="https://www.webpagetest.org/" target="_blank">WebPageTest</a> - Lets you test the performance of your site across multiple locations and devices
  - <a href="https://pagespeed.web.dev/" target="_blank">PageSpeed Insights</a> - Chrome DevTools extension
