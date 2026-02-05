---
slug: /SDLC/code
description: The development (or implementation) phase where the software is built
sidebar_position: 3
---

# Code

> [Back to SDLC Intro](../SDLC/introduction)

The **Code** (or Implementation) phase is where the actual software construction takes place, with developers writing the code according to the design specifications created in the previous stage.

## The Development Process

This is typically the longest phase of the SDLC.

- **Environment Setup:** Configuring IDEs, compilers, and necessary tools.
- **Coding:** Writing code in the chosen programming languages.
- **Code Review:** Peer reviews to ensure code quality, readability, and adherence to standards.
- **Documentation:** Writing inline comments in the code and documentation for APIs.

:::tip
During this phase, developers should be writing tests as they code to ensure the code is working as expected - integrating the next stage - [Verify](./04-verify.md) as they develop the software.
:::

:::info
Security should also be considered during this phase, with tools such as [Snyk](https://snyk.io/) and [Veracode](https://www.veracode.com/) performing real-time security analysis as code is written, identifying vulnerabilities instantly.
:::

### Development Key Deliverables

- Source Code
- Unit Test Results
- Technical Documentation

:::tip[How AI Can Help: Coding]
AI has transitioned from a simple tool to an intelligent pair programmer:

- **Predictive Coding:** Several IDEs have now been developed with integrated AI that can provide context-aware code completions and can generate entire functions capabilities directly, including but not limited to [Cursor](https://www.cursor.com/), [Claude Code](https://www.anthropic.com/claude-code) and [Antigravity](https://antigravity.app/). Other tools include [GitHub Copilot](https://github.com/features/copilot), [Amazon Q Developer](https://aws.amazon.com/q/developer/), [Sourcegraph](https://sourcegraph.com/), and [JetBrains AI](https://www.jetbrains.com/ai/).
- **Code Review:** AI can review code and provide feedback on the code, including but not limited to Cursor's [Bugbot](https://cursor.com/bugbot), [CodeRabbit](https://www.coderabbit.ai/), [Greptile](https://www.greptile.com/) and [Graphite](https://www.graphite.com/).
- **Security Scanning:** Tools like [Snyk](https://snyk.io/) and [Veracode](https://www.veracode.com/) perform real-time security analysis as code is written, identifying vulnerabilities instantly.
- **Documentation:** AI can automatically generate docstrings and comments, keeping documentation in sync with code changes. This is often done automatically in the IDEs mentioned above.
  :::
