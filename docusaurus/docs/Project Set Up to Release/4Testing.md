# Testing

> [Back to Documentation Intro Contents](../DocumentationIntro.md)

## Testing Links

![Cypress Logo](https://i.imgur.com/BUzlvBh.png)

- <a href="https://medium.com/@kristiyan.velkov/the-pyramid-of-testing-in-react-js-or-next-js-a4090d3bfad2" target="_blank">Testing in Next.js and React</a>
- <a href="https://profy.dev/article/cypress-react" target="_blank">Cypress React Tutorial</a>
- Review the testing resources saved in <a href="https://todoist.com/showTask?id=6132185936&sync_id=6506084877" target="_blank">Todoist</a>
- Set up testing throughout the application based on its requirements
- <a href="https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications" target="_blank">Testing Trophy and Testing Classifications</a>
  - Static tests (<a href="https://eslint.org/" target="_blank">ESLint</a>, <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>) - Done automatically in VS Code e.g. typos and type errors
  - Unit tests (<a href="https://jestjs.io/" target="_blank">Jest</a> / <a href="https://vitest.dev/" target="_blank">Vitest</a> / <a href="https://react-testing-library.com/" target="_blank">React Testing Library</a>)
  - Integration tests (<a href="https://testing-library.com/docs/react-testing-library/intro/" target="_blank">React Testing Library</a> / <a href="https://www.cypress.io/" target="_blank">Cypress</a>)
  - E2E tests (<a href="https://playwright.dev/" target="_blank">Playwright</a> / <a href="https://www.cypress.io/" target="_blank">Cypress</a>)
    - <a href="https://medium.com/@lucgagan/efficient-e2e-testing-for-next-js-a-playwright-tutorial-06eadfc59111" target="_blank">E2E Playwright testing with Next.js</a>
    - <a href="https://www.browsercat.com/post/ultimate-guide-visual-testing-playwright" target="_blank">Ultimate Guide to Visual Testing with Playwright</a>
- Use AI to write some simple tests

### Static Tests

- Static tests are done automatically in VS Code e.g. typos and type errors
- Ensure static testing libraries are set up such as <a href="https://eslint.org/" target="_blank">ESLint</a> or <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>

### Unit Tests

- To create unit tests, use AI to write the tests - see the "Testing Prompts" section of the Obsidian note on AI Prompts - and then review the tests and make improvements
- Use a testing library such as <a href="https://jestjs.io/" target="_blank">Jest</a> or <a href="https://testing-library.com/docs/react-testing-library/intro/" target="_blank">React Testing Library</a>
- If using Vite, use <a href="https://vitest.dev/" target="_blank">Vitest</a> for unit tests

### Integration Tests

- To create integration tests, use AI to write the tests - see the "Testing Prompts" section of the Obsidian note on AI Prompts - and then review the tests and make improvements
- Use a testing library such as <a href="https://testing-library.com/docs/react-testing-library/intro/" target="_blank">React Testing Library</a> or <a href="https://www.cypress.io/" target="_blank">Cypress</a>

### E2E Tests

- For E2E tests, use a testing library such as <a href="https://playwright.dev/" target="_blank">Playwright</a> or <a href="https://www.cypress.io/" target="_blank">Cypress</a>

## Performance Testing

- Before releasing the project, test the performance of the project using these tools:
  - <a href="https://lighthouse.dev/" target="_blank">Lighthouse</a> - Chrome DevTools extension
  - <a href="https://www.webpagetest.org/" target="_blank">WebPageTest</a> - Lets you test the performance of your site across multiple locations and devices
  - <a href="https://pagespeed.web.dev/" target="_blank">PageSpeed Insights</a> - Chrome DevTools extension