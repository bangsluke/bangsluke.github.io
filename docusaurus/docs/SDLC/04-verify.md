---
slug: /SDLC/verify
description: The verification (or testing) phase of the SDLC
sidebar_position: 4
---

# Verify

> [Back to SDLC Intro](../SDLC/introduction)

The **Verify** (or Testing) phase ensures that the software is defect-free and meets the requirements defined in the planning phase. It is critical for <Tooltip text="quality assurance (QA)" definition="Processes and activities that ensure software meets specified requirements and is free of defects." />. Testing is not a phase you bolt on at the end - it is a continuous activity that should start as early as requirements and continue through production.

## The Test Pyramid

The <Tooltip text="test pyramid" definition="A model that recommends many fast, cheap unit tests at the base, fewer integration tests in the middle, and a small number of slow, expensive end-to-end tests at the top." /> is the foundational mental model for structuring your test suite:

- **Unit Tests (base):** Fast, isolated, and cheap. Test individual functions and classes. Aim for the majority of your tests to be here.
- **Integration Tests (middle):** Verify that modules, services, or APIs work together correctly. Slower than unit tests but catch contract and communication issues.
- **End-to-End Tests (top):** Test the complete user journey through the real UI. Slowest and most brittle - use sparingly for critical paths only.

:::tip[Rule of Thumb]
A healthy ratio is roughly **70% unit / 20% integration / 10% E2E**. If your E2E suite takes hours to run and breaks constantly, you probably have an inverted pyramid - push more testing down to the unit and integration layers.
:::

## Test Strategy

A test strategy defines **what** you test, **how** you test it, and **how much** is enough.

- **Risk-Based Testing:** Not all code is equally risky. Focus testing effort on code that handles money, auth, data mutations, and core business logic. Low-risk UI tweaks need less coverage.
- **Coverage Targets:** Code coverage is a useful signal, not a goal. A team chasing 100% coverage wastes time testing getters and setters. Aim for meaningful coverage of business logic (70-80% is a pragmatic target for most teams).
- **Test Data Management:** Tests need realistic data. Plan how you will create, seed, and reset test data. Avoid coupling tests to production data.

## Shift-Left Testing

<Tooltip text="Shift-left" definition="Moving quality activities (testing, security, accessibility) earlier in the development lifecycle where defects are cheaper and faster to fix." /> means moving testing activities earlier in the lifecycle:

- **<Tooltip text="Test-Driven Development (TDD)" definition="A development practice where you write a failing test before writing the code that makes it pass, then refactor." />:** Write the test first, then the code to make it pass, then refactor. Forces clear thinking about requirements and produces well-tested code by default.
- **<Tooltip text="Behaviour-Driven Development (BDD)" definition="An extension of TDD that writes tests in natural language (Given/When/Then) so non-technical stakeholders can understand and validate them." />:** Express tests in natural language (Given/When/Then) so product and <Tooltip text="QA" definition="Quality Assurance — processes and activities that ensure software meets specified requirements and is free of defects." /> can collaborate on acceptance criteria before development begins.
- **Static Analysis:** Catch entire categories of bugs before code ever runs - type errors (TypeScript, mypy), security vulnerabilities (Snyk), and code smells (SonarQube).

<PageBreak />

## Testing Methodologies

Testing identifies gaps, errors, or missing requirements contrary to the actual requirements.

- **Unit Testing:** <Tooltip text="Testing individual components" definition="Checking the smallest units of code (such as functions or classes) in isolation." /> or functions.
- **Integration Testing:** Verifying that different modules work together.
- **End-to-End (E2E) Testing:** Testing the complete user journey from start to finish.
- **System Testing:** Testing the complete and integrated software product.
- **Performance Testing:** Checking speed, responsiveness, and stability under load.
- **Security Testing:** Ensuring the application is secure against threats.

## Non-Functional Testing

Functional correctness is necessary but not sufficient. Non-functional quality attributes must be tested explicitly:

- **Performance Testing:** Define benchmarks for response time, throughput, and resource usage. Use load testing tools (k6, Gatling, JMeter) to simulate realistic traffic patterns.
- **<Tooltip text="Accessibility Testing (WCAG)" definition="Testing against the Web Content Accessibility Guidelines to ensure software is usable by people with disabilities." />:** Ensure your product is usable by everyone. Automated tools (axe, Lighthouse) catch ~30% of issues; manual testing with screen readers catches the rest. Target WCAG 2.1 AA as a minimum.
- **<Tooltip text="Security Testing (OWASP)" definition="Testing against the OWASP Top 10 - the most critical web application security risks including injection, broken auth, and sensitive data exposure." />:** Test against the OWASP Top 10. Combine automated scanning (Snyk, Trivy) with manual penetration testing for critical applications.
- **Load and Stress Testing:** Understand your breaking point before your users find it. Test at 2-3x expected peak load.

:::info[By Company Stage]
- **Startup:** Focus on **integration and E2E tests for critical user paths** (sign-up, payment, core workflow). Manual <Tooltip text="QA" definition="Quality Assurance — processes and activities that ensure software meets specified requirements and is free of defects." /> is acceptable and often faster at this stage. Smoke tests after every deploy. Do not chase coverage metrics - chase confidence in your core flows.
- **Growth Stage:** Introduce **test coverage thresholds** (e.g. 70% for new code). Hire dedicated <Tooltip text="QA" definition="Quality Assurance — processes and activities that ensure software meets specified requirements and is free of defects." /> or <Tooltip text="SDET" definition="Software Development Engineer in Test - A role responsible for designing, developing, and executing tests to validate functionality, identify defects, and ensure compliance with requirements." /> engineers. Build automated <Tooltip text="regression testing" definition="Re-running existing tests after code changes to ensure previously working functionality has not been broken." /> suites. Implement performance benchmarks and accessibility audits. Make tests a required gate in <Tooltip text="CI" definition="Continuous Integration — frequently merging code changes into a shared repository with automated builds and tests." />.
- **Established:** Establish **formal test governance** with test plans reviewed alongside requirements. Performance <Tooltip text="SLAs" definition="Service Level Agreements — contractual commitments specifying minimum levels of availability, performance, and support response times." /> defined and automatically validated. Compliance testing (<Tooltip text="SOC2" definition="System and Organization Controls 2 — a framework for assessing the security and reliability of a system." />, <Tooltip text="HIPAA" definition="Health Insurance Portability and Accountability Act — US legislation that sets standards for protecting sensitive patient health information." />, <Tooltip text="PCI-DSS" definition="Payment Card Industry Data Security Standard — a set of requirements for securing payment card data." /> etc.) baked into the pipeline. Regular penetration testing by third parties. Chaos testing in staging environments.
:::

<PageBreak />

## Common Pitfalls

:::danger[Anti-patterns to Avoid]
- **Testing Only the Happy Path:** Most bugs live in edge cases - empty inputs, concurrent access, network failures, boundary values. Explicitly test error scenarios.
- **Flaky Tests:** Tests that pass sometimes and fail sometimes destroy trust in the test suite. Teams start ignoring failures, and real bugs slip through. Fix or delete flaky tests immediately.
- **No Test Data Strategy:** Tests that depend on shared mutable data or production databases are fragile and unpredictable. Use factories, fixtures, or synthetic data generation.
- **Testing in Production Only:** "We'll test it live" is not a strategy. It is a gamble that trades user trust for developer convenience.
:::

### Testing Key Deliverables

- Test Strategy Document
- Test Plans and Test Cases
- Bug Reports
- Test Execution Reports
- Coverage Reports

:::tip[How AI Can Help: Verification]
AI is reimagining verification by analyzing vast amounts of data to spot patterns and anomalies and automating the most tedious parts of <Tooltip text="QA" definition="Quality Assurance — processes and activities that ensure software meets specified requirements and is free of defects." />:

- **Static Analysis:** Outside of AI in the IDEs listed in the [Code](./03-code.md) section, advanced static analysis tools (e.g., [SonarQube](https://www.sonarqube.org/)) use AI to identify complex bugs and code smells that traditional rules might miss.
- **Test Generation:** AI can create comprehensive test suites and edge cases automatically from code. Outside of AI in the IDEs listed in the [Code](./03-code.md) section:
  - **Unit tests:** [Qodo](https://www.qodo.ai/) (formerly known as Codium)
  - **Integration tests:** [Testim](https://www.testim.io/)
  - **E2E tests:** [Functionize](https://www.functionize.com/) ([Testim](https://www.testim.io/) can also be used)
  - **System tests:** [Katalon](https://katalon.com/)
  - **Performance tests:** [k6](https://k6.io/)
  - **Security tests:** [Snyk](https://snyk.io/) and [Trivy](https://trivy.dev/)
- **Synthetic Data:** Privacy laws often prevent testing with real user data. AI tools like [Delphix](https://www.delphix.com/) can generate comprehensive synthetic datasets that mimic production data without the privacy risks.
:::
