---
slug: /project-set-up-to-release/testing
description: Links and resources for the testing of the software
---

# Testing

> [Back to Documentation Intro Contents](../DocumentationIntro.md)

:::info
See [Verify](../SDLC/verify) for more information on the testing phase of the SDLC.
:::

## Test Strategy

Before writing any tests, define a strategy so you invest your testing effort where it matters most.

### The <Tooltip text="Test Pyramid" definition="A model that recommends many fast, cheap unit tests at the base, fewer integration tests in the middle, and a small number of slow, expensive end-to-end tests at the top." /> {#test-pyramid}

Structure your test suite following the test pyramid:

| Layer | Proportion | Speed | What it catches |
|-------|-----------|-------|-----------------|
| **Unit Tests** | ~70% | Fast (ms) | Logic errors in individual functions and components |
| **Integration Tests** | ~20% | Medium (seconds) | Contract and communication issues between modules |
| **E2E Tests** | ~10% | Slow (seconds-minutes) | Broken user journeys through the real UI |

:::tip[Rule of Thumb]
If your E2E suite takes hours to run and breaks constantly, you probably have an inverted pyramid. Push more testing down to the unit and integration layers where tests are faster and more reliable.
:::

### <Tooltip text="Risk-Based Testing" definition="Focusing testing effort on the areas of code that handle the highest-risk functionality such as payments, authentication, and core business logic." /> {#risk-based-testing}

Not all code is equally risky. Focus testing effort on:

- **Authentication and authorisation** - security-critical
- **Payment and financial logic** - money is always high-risk
- **Core business workflows** - the features your users depend on daily
- **Data mutations** - creating, updating, and deleting data

Low-risk areas (static pages, minor UI tweaks) need less coverage.

### Code Coverage

<Tooltip text="Code coverage" definition="A metric measuring the percentage of code lines or branches that are executed by tests. A useful signal but not a goal in itself." /> is a useful signal, not a goal. Do not chase 100% coverage - that wastes time testing trivial code. A pragmatic target is **70-80% meaningful coverage of business logic**.

### <Tooltip text="Test Data Management" definition="The strategy for creating, seeding, and resetting the data that tests need, avoiding dependency on shared or production data." /> {#test-data-management}

- Use factories, fixtures, or builders to create test data
- Never couple tests to production data or shared mutable state
- Each test should set up and tear down its own data

:::tip[Solo Developer Focus]
As a solo developer, focus testing effort on the critical user paths first: sign-up, payment, core workflow. Manual QA is acceptable for edge cases and low-risk features at the early stages. Automated tests for critical paths are non-negotiable.
:::

<PageBreak />

## Shift-Left Testing

<Tooltip text="Shift-left" definition="Moving quality activities (testing, security, accessibility) earlier in the development lifecycle where defects are cheaper and faster to fix." /> means moving testing activities earlier in the lifecycle, where bugs are cheapest to fix.

### <Tooltip text="TDD" definition="Test-Driven Development: a practice where you write a failing test before writing the code that makes it pass, then refactor." /> (Test-Driven Development) {#tdd}

Consider using TDD for complex business logic:

1. **Red** - Write a failing test that defines the expected behaviour
2. **Green** - Write the minimum code to make the test pass
3. **Refactor** - Clean up the code while keeping the test green

TDD is not required for every piece of code, but it is particularly valuable for utility functions, data transformations, and business rules.

### <Tooltip text="Static Analysis" definition="Automated checks that catch entire categories of bugs without executing the code, such as type errors, security vulnerabilities, and code smells." /> {#static-analysis}

Static analysis is the cheapest form of testing - it catches bugs before your code even runs:

- **TypeScript** - catches type errors at compile time
- **ESLint** - catches anti-patterns and potential bugs
- **<a href="https://www.sonarqube.org/" target="_blank">SonarQube</a>** - deeper analysis for code smells and complexity

:::info
See [Verify - Shift-Left Testing](../SDLC/verify#shift-left-testing) for more detail on TDD, BDD, and static analysis practices.
:::

<PageBreak />

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

<PageBreak displayLine={false} size="1rem" />

- Static tests are done automatically in VS Code e.g. typos and type errors
- Ensure static testing libraries are set up such as <a href="https://eslint.org/" target="_blank">ESLint</a> or <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>

### Unit Tests

<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest" />
<img src="https://img.shields.io/badge/Vitest-646CFF?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest" />
<img src="https://img.shields.io/badge/React_Testing_Library-E63959?style=for-the-badge&logo=react-testing-library&logoColor=white" alt="React Testing Library" />

<PageBreak displayLine={false} size="1rem" />

- To create unit tests, use AI to write the tests - see the "Testing Prompts" section of the Obsidian note on AI Prompts - and then review the tests and make improvements
- Use a testing library such as <a href="https://jestjs.io/" target="_blank">Jest</a> or <a href="https://testing-library.com/docs/react-testing-library/intro/" target="_blank">React Testing Library</a>
- If using Vite, use <a href="https://vitest.dev/" target="_blank">Vitest</a> for unit tests

### Integration Tests

<img src="https://img.shields.io/badge/React_Testing_Library-E63959?style=for-the-badge&logo=react-testing-library&logoColor=white" alt="React Testing Library" />
<img src="https://img.shields.io/badge/Cypress-2AD796?style=for-the-badge&logo=cypress&logoColor=103045" alt="Cypress" />

<PageBreak displayLine={false} size="1rem" />

- To create integration tests, use AI to write the tests - see the "Testing Prompts" section of the Obsidian note on AI Prompts - and then review the tests and make improvements
- Use a testing library such as <a href="https://testing-library.com/docs/react-testing-library/intro/" target="_blank">React Testing Library</a> or <a href="https://www.cypress.io/" target="_blank">Cypress</a>

### E2E Tests

<img src="https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white" alt="Playwright" />
<img src="https://img.shields.io/badge/Cypress-2AD796?style=for-the-badge&logo=cypress&logoColor=103045" alt="Cypress" />

<PageBreak displayLine={false} size="1rem" />

- For E2E tests, use a testing library such as <a href="https://playwright.dev/" target="_blank">Playwright</a> or <a href="https://www.cypress.io/" target="_blank">Cypress</a>

<PageBreak />

## Non-Functional Testing

Functional correctness is necessary but not sufficient. Non-functional quality attributes must be tested explicitly before release.

### Performance Testing

- Before releasing the project, test the performance of the project using these tools:
  - <a href="https://lighthouse.dev/" target="_blank">Lighthouse</a> - Chrome DevTools extension
  - <a href="https://www.webpagetest.org/" target="_blank">WebPageTest</a> - Lets you test the performance of your site across multiple locations and devices
  - <a href="https://pagespeed.web.dev/" target="_blank">PageSpeed Insights</a> - Chrome DevTools extension
- For API or backend <Tooltip text="load testing" definition="Simulating realistic traffic patterns against your application to measure response times, throughput, and stability under load." />, use <a href="https://k6.io/" target="_blank">k6</a> to run simple load tests

### <Tooltip text="Accessibility Testing" definition="Testing against the Web Content Accessibility Guidelines (WCAG) to ensure software is usable by people with disabilities." /> (WCAG) {#accessibility-testing}

Ensure your product is usable by everyone. Target <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank">WCAG 2.1 AA</a> as a minimum:

- **Automated tools** (catch ~30% of issues):
  - <a href="https://www.deque.com/axe/" target="_blank">axe DevTools</a> - browser extension for accessibility auditing
  - Lighthouse accessibility audit (built into Chrome DevTools)
- **Manual testing** (catches the rest):
  - Navigate your app using only the keyboard
  - Test with a screen reader (NVDA on Windows, VoiceOver on Mac)
  - Check colour contrast ratios

### <Tooltip text="Security Testing" definition="Testing against common security vulnerabilities (e.g. OWASP Top 10) to ensure the application is secure against threats." /> {#security-testing}

- Run automated scans with <a href="https://snyk.io/" target="_blank">Snyk</a> and <a href="https://trivy.dev/" target="_blank">Trivy</a> (as set up in [Development - Security](../project-set-up-to-release/development#security))
- For web applications, consider <a href="https://www.zaproxy.org/" target="_blank">OWASP ZAP</a> for automated penetration testing
- Review against the <a href="https://owasp.org/www-project-top-ten/" target="_blank">OWASP Top 10</a> checklist

<PageBreak />

## Common Testing Pitfalls

:::danger[Anti-patterns to Avoid]
- **Testing only the happy path:** Most bugs live in edge cases - empty inputs, network failures, boundary values, concurrent access. Explicitly test error scenarios.
- **Flaky tests:** Tests that pass sometimes and fail sometimes destroy trust in the test suite. Teams start ignoring failures, and real bugs slip through. Fix or delete flaky tests immediately.
- **No test data strategy:** Tests that depend on shared mutable data or production databases are fragile and unpredictable. Use factories, fixtures, or synthetic data generation.
- **Skipping tests entirely:** "I'll add tests later" almost always means "I'll never add tests." Write tests alongside your code, not as an afterthought.
:::
