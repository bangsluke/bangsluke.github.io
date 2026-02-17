---
slug: /SDLC/code
description: The development (or implementation) phase where the software is built
sidebar_position: 3
---

# Code

> [Back to SDLC Intro](../SDLC/introduction)

The **Code** (or Implementation) phase is where the actual software construction takes place, with developers writing the code according to the design specifications created in the previous stage. This is typically the longest phase of the SDLC - and the one where good habits compound and bad habits create the most damage.

## Development Environment

Before writing a single line of code, ensure the team has a consistent and productive development environment.

- **Environment Setup:** Configure <Tooltip text="IDEs" definition="Integrated Development Environments such as VS Code, Cursor, or JetBrains IDEs that provide editing, debugging, and tooling in one place." />, compilers, and necessary tools. Document the setup process so new team members can be productive within hours, not days.
- **<Tooltip text="Dev Containers" definition="Pre-configured, reproducible development environments packaged in containers (e.g. Docker) that ensure every developer works in an identical setup." />:** Use containerised development environments (e.g. VS Code Dev Containers, GitHub Codespaces) to eliminate "works on my machine" problems.
- **Environment Parity:** Keep development, staging, and production environments as similar as possible. Differences between environments are a leading cause of deployment failures.

## Branching Strategies

How you manage code branches directly affects your team's ability to collaborate and ship.

- **<Tooltip text="Trunk-Based Development" definition="A branching strategy where all developers commit to a single shared branch (main/trunk) with short-lived feature branches, enabling continuous integration." />:** All developers commit directly to `main` (or use very short-lived branches that merge within hours). Requires strong <Tooltip text="CI" definition="Continuous Integration — frequently merging code changes into a shared repository with automated builds and tests." /> and <Tooltip text="feature flags" definition="Configuration switches that allow you to enable or disable features at runtime without deploying new code, enabling progressive rollout and instant rollback." />. Minimises merge conflicts and enables continuous deployment.
- **<Tooltip text="GitHub Flow" definition="A lightweight branching model where feature branches are created from main, reviewed via pull requests, and merged back into main." />:** Feature branches off `main`, merged via pull requests after review. Simple and effective for most teams.
- **<Tooltip text="GitFlow" definition="A branching model with long-lived develop and main branches plus feature, release, and hotfix branches. Suited to scheduled release cycles." />:** Long-lived `develop` and `main` branches with feature, release, and hotfix branches. More ceremony, suited to teams with formal release schedules.

:::info[By Company Stage]
- **Startup:** Use **trunk-based development** or simple GitHub Flow. Ship from `main` as often as possible - ideally multiple times per day. Minimal ceremony, rapid iteration. One or two developers reviewing each other's code informally is sufficient.
- **Growth Stage:** Adopt **GitHub Flow** with enforced pull request reviews. Introduce PR templates, <Tooltip text="code owners" definition="A configuration (e.g. CODEOWNERS file) that automatically assigns reviewers based on which files are changed, ensuring domain experts review relevant code." /> (CODEOWNERS), and branch protection rules. Establish a style guide and shared coding standards. Two reviewers per PR becomes the norm.
- **Established:** Implement **formal code review gates** with required approvals from domain experts. Use architecture compliance checks in CI (e.g. ArchUnit, dependency-cruiser). Consider <Tooltip text="inner-source" definition="Applying open-source collaboration practices within an organisation, allowing teams to contribute to each other's codebases through standardised processes." /> practices to allow cross-team contributions while maintaining quality standards.
:::

<PageBreak />

## Code Quality

Consistent code quality does not happen by accident - it requires intentional tooling and culture.

### Coding Standards

- Define and enforce a team style guide. For most languages, adopt a widely-used community standard (e.g. Airbnb for JavaScript/TypeScript, PEP 8 for Python, Google style guides for Go/Java) rather than inventing your own.
- Configure <Tooltip text="linting" definition="Automated static analysis that checks code for style violations, potential errors, and anti-patterns without executing it." /> tools (ESLint, Pylint, RuboCop) and formatters (Prettier, Black) to enforce standards automatically.

### Pre-Commit Hooks

Use <Tooltip text="pre-commit hooks" definition="Scripts that run automatically before a commit is created, typically used to lint, format, and validate code before it enters version control." /> to catch issues before code ever reaches a pull request:

- Run linters and formatters
- Check for secrets or credentials accidentally committed
- Run fast unit tests
- Validate commit message format

### Code Review

<Tooltip text="Peer review of code changes" definition="A process where other developers examine code changes to catch defects early and ensure consistency with team standards." /> is one of the highest-leverage quality activities. Effective code review is not about catching syntax errors (that is what linters are for) - it is about:

- Validating the approach and design decisions
- Sharing knowledge across the team
- Catching logic errors and edge cases
- Ensuring code is maintainable and well-documented

:::tip[Code Review Best Practices]
- **Keep PRs small** - aim for under 400 lines of changes. Large PRs get rubber-stamped.
- **Review within 24 hours** - long review queues kill velocity.
- **Be specific and kind** - frame feedback as questions or suggestions, not commands.
- **Use automated checks first** - let <Tooltip text="CI" definition="Continuous Integration — frequently merging code changes into a shared repository with automated builds and tests." /> catch style/lint issues so humans focus on logic and design.
:::

### Documentation as Code

- **Inline Documentation:** Write code comments that explain *why*, not *what*. The code itself should explain what it does.
- **<Tooltip text="ADRs" definition="Architecture Decision Records - short documents that capture significant technical decisions, their context, and rationale." />:** Keep architecture decision records in the repository alongside the code they describe.
- **API Documentation:** Generate API docs from code annotations (JSDoc, Swagger/OpenAPI, Python docstrings) to keep documentation in sync with implementation.

<PageBreak />

## Common Pitfalls

:::danger[Anti-patterns to Avoid]
- **No Coding Standards:** Without enforced standards, codebases become inconsistent and hard to navigate. New team members take longer to onboard and bugs hide in style inconsistency.
- **PR Rubber-Stamping:** Approving PRs without reading them defeats the purpose of review. If PRs are too large to review properly, they are too large - break them up.
- **Poor Documentation:** Code without context becomes legacy code. If you cannot explain why a decision was made, the next developer will either waste time understanding it or rewrite it.
- **Gold Plating:** Polishing code beyond what the requirement asks for. Ship it, learn from production feedback, then refine.
:::

### Development Key Deliverables

- Source Code (in version control)
- Unit Test Results
- Technical Documentation and ADRs
- Code Review Records

:::tip
During this phase, developers should be writing tests as they code to ensure the code is working as expected - integrating the next stage, [Verify](./04-verify.md), as they develop the software.
:::

:::info
Security should also be considered during this phase, with tools such as [Snyk](https://snyk.io/) and [Veracode](https://www.veracode.com/) performing real-time security analysis as code is written, identifying vulnerabilities instantly. Ensure at least two tools are used to scan the code for vulnerabilities.
:::

:::tip[How AI Can Help: Coding]
AI has transitioned from a simple tool to an intelligent pair programmer:

- **Predictive Coding:** Several IDEs have now been developed with integrated AI that can provide context-aware code completions and can generate entire functions capabilities directly, including but not limited to [Cursor](https://www.cursor.com/), [Claude Code](https://www.anthropic.com/claude-code) and [Antigravity](https://antigravity.app/). Other tools include [GitHub Copilot](https://github.com/features/copilot), [Amazon Q Developer](https://aws.amazon.com/q/developer/), [Sourcegraph](https://sourcegraph.com/), and [JetBrains AI](https://www.jetbrains.com/ai/).
- **Code Review:** AI can review code and provide feedback on the code, including but not limited to Cursor's [Bugbot](https://cursor.com/bugbot), [CodeRabbit](https://www.coderabbit.ai/), [Greptile](https://www.greptile.com/) and [Graphite](https://www.graphite.com/).
- **Security Scanning:** Tools like [Snyk](https://snyk.io/) and [Veracode](https://www.veracode.com/) perform real-time security analysis as code is written, identifying vulnerabilities instantly.
- **Documentation:** AI can automatically generate docstrings and comments, keeping documentation in sync with code changes. This is often done automatically in the IDEs mentioned above.
:::
