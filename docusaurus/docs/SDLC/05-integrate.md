---
slug: /SDLC/integrate
description: The integration phase (CI) of combining individual software modules into a unified group
sidebar_position: 5
---

# Integrate

> [Back to SDLC Intro](../SDLC/introduction)

The **Integrate** phase involves combining individual software modules into a unified group. In modern <Tooltip text="DevOps" definition="A set of practices that combines software development (Dev) and IT operations (Ops) to shorten delivery cycles and improve reliability." />, this is often continuous (<Tooltip text="CI" definition="Continuous Integration: frequently merging code changes into a shared repository with automated builds and tests." />), but conceptually it represents the assembly of the system. The goal is simple: every change should be integrated, built, and validated automatically - so that the team always has a working, deployable product.

## CI Pipeline Design

A well-designed CI pipeline is the backbone of a healthy engineering organisation. It should provide fast, reliable feedback on every change.

### Pipeline Stages

A typical CI pipeline follows this sequence:

1. **Checkout:** Pull the latest code and dependencies.
2. **Install:** Resolve and install dependencies from lock files.
3. **Lint and Format:** Catch style violations and formatting issues instantly.
4. **Build:** Compile the application and verify it produces valid <Tooltip text="artifacts" definition="The packaged outputs of a build process - compiled binaries, container images, bundled assets, or archive files ready for deployment." />.
5. **Unit Tests:** Run the fast, isolated test suite.
6. **Integration Tests:** Verify cross-module and cross-service contracts.
7. **Security Scan:** Check dependencies and code for known vulnerabilities.
8. **Artifact Publish:** Store versioned build artifacts for downstream deployment.

:::tip[Pipeline as Code]
Define your CI pipeline in version-controlled configuration files (e.g. `.github/workflows/*.yml`, `.gitlab-ci.yml`, `Jenkinsfile`) rather than configuring it through a UI. This ensures pipelines are reviewable, auditable, and reproducible. <Tooltip text="Pipeline as code" definition="Defining CI/CD pipeline configuration in version-controlled files alongside application code, rather than through a graphical interface." /> is a non-negotiable best practice.
:::

### CI Best Practices

- **Fast Feedback:** The pipeline should complete in under 10 minutes for the core feedback loop (lint + build + unit tests). Longer-running tests (integration, E2E) can run in parallel or as a secondary stage.
- **Fail Fast:** Order pipeline stages so the cheapest and fastest checks run first. If linting fails, there is no point running a 30-minute E2E suite.
- **Caching:** Cache dependency installations (node_modules, pip cache, Maven repository) between runs to dramatically reduce build times.
- **Parallelisation:** Run independent test suites in parallel. Most CI platforms support matrix builds and parallel job execution.
- **Deterministic Builds:** Use lock files (`package-lock.json`, `yarn.lock`, `Pipfile.lock`) and pinned dependency versions to ensure the same input always produces the same output.

<PageBreak />

## Dependency Management

Modern applications depend on hundreds of third-party packages. Managing these dependencies is a critical integration activity.

- **Lock Files:** Always commit lock files to version control. They ensure every developer and CI run uses exactly the same dependency versions.
- **Vulnerability Scanning:** Automate dependency vulnerability checks using tools like [Snyk](https://snyk.io/), [Dependabot](https://github.com/dependabot), or [Renovate](https://www.mend.io/renovate/). These tools can automatically create PRs to update vulnerable packages.
- **Update Policies:** Define a cadence for dependency updates. Weekly automated PRs for patch/minor versions, manual review for major versions. Never let dependencies go unpatched for months.
- **License Compliance:** Track the licences of all third-party dependencies. Some licences (<Tooltip text="GPL" definition="General Public License - A license that requires derived works to be licensed under the same or similar license." />, <Tooltip text="AGPL" definition="Affero General Public License - A license that requires derived works to be licensed under the same or similar license." />) have implications for commercial software that must be reviewed by legal.

## Monorepo vs Polyrepo

How you organise your source code has significant implications for integration:

- **<Tooltip text="Monorepo" definition="A single repository that contains the code for multiple projects, services, or packages - enabling atomic cross-project changes and shared tooling." />:** All services and packages in a single repository. Enables atomic cross-service changes, shared tooling, and simplified dependency management. Requires investment in build tooling ([Nx](https://nx.dev/), [Turborepo](https://turborepo.org/), [Bazel](https://bazel.build/)) to keep builds fast.
- **<Tooltip text="Polyrepo" definition="Each project, service, or package lives in its own separate repository - providing clear ownership boundaries but requiring explicit coordination for cross-repo changes." />:** Each service in its own repository. Clearer ownership boundaries and simpler per-repo CI. Cross-service changes require coordinated PRs and versioned contracts.

:::info[By Company Stage]
- **Startup:** Use a **single repository** with a simple CI pipeline (GitHub Actions or similar). One pipeline file, one build, one deploy. Keep it fast and simple. Minimal gates - lint, build, test, deploy. The overhead of managing multiple repos is not worth it at this stage.
- **Growth Stage:** Introduce **multi-stage pipelines** with separate jobs for different test types. Set up an <Tooltip text="artifact registry" definition="A centralised storage system for build outputs (Docker images, npm packages, JARs) that provides versioning, access control, and distribution." /> (GitHub Packages, JFrog Artifactory, AWS ECR). Start generating <Tooltip text="SBOMs" definition="Software Bill of Materials - a complete, machine-readable inventory of all components, libraries, and dependencies in a software application." />. Consider a monorepo with Nx or Turborepo if teams are sharing significant code.
- **Established:** Invest in **enterprise CI platforms** (Jenkins at scale, GitLab Ultimate, CircleCI with self-hosted runners). Cross-repo integration testing for <Tooltip text="microservice" definition="A small, independently deployable service that is part of a larger system, communicating with other services via APIs." /> architectures. Compliance scanning (licence checks, security gates) as mandatory pipeline stages. Dedicated platform/DevEx team to maintain CI infrastructure. <Tooltip text="SBOM" definition="Software Bill of Materials — a complete, machine-readable inventory of all components, libraries, and dependencies in a software application." /> generation and attestation for supply chain security.
:::

<PageBreak />

## Common Pitfalls

:::danger[Anti-patterns to Avoid]
- **Slow Pipelines:** If CI takes 30+ minutes, developers stop waiting for it and merge without feedback. Invest in caching, parallelisation, and splitting fast/slow test stages.
- **Ignoring Flaky Tests:** A test suite with 5% flake rate means teams learn to ignore red builds. This erodes trust and lets real bugs through. Track and fix flaky tests aggressively.
- **No Artifact Versioning:** Building from source on every deploy (rather than promoting a tested artifact) introduces risk and wastes time. Build once, deploy the same artifact everywhere.
- **"It Merged, It's Done":** Integration is not just about merging code. It includes validating that the merged result builds, passes tests, and produces a deployable artifact. A green merge button is not a quality gate on its own.
:::

### Integration Key Deliverables

- Build Artifacts (<Tooltip text="JAR" definition="Java Archive - A file format for packaging Java classes and resources." />, <Tooltip text="WAR" definition="Web Application Archive - A file format for packaging web applications." />, <Tooltip text="Docker Image" definition="A file format for packaging a software application and its dependencies into a single container." />, bundles)
- Integrated Codebase (green main branch)
- Software Bill of Materials (<Tooltip text="SBOM" definition="A complete, machine-readable list of all components, libraries, and dependencies that make up a software application." />)
- CI Pipeline Configuration (as code)

:::tip[How AI Can Help: Integration]
AI streamlines specific pain points in integration:

- **Conflict Resolution:** AI can analyze code logic to suggest optimal merge strategies and resolve conflicts (e.g., previously mentioned IDEs in the [Code](./03-code.md) section or features in [GitLab](https://about.gitlab.com/) or [GitHub](https://github.com/)).
- **Smart Builds:** Tools like [Incredibuild](https://www.incredibuild.com/) use AI to distribute build tasks efficiently, significantly reducing build times.
- **SBOM Management:** AI helps generate and analyze <Tooltip text="SBOMs" definition="Software Bill of Materials — a complete, machine-readable inventory of all components, libraries, and dependencies in a software application." /> for security risks, with tools like [Sonatype Nexus](https://www.sonatype.com/products/sonatype-nexus-repository) and [JFrog Artifactory](https://jfrog.com/artifactory/) providing real-time intelligence on open-source components.
- **Delivery and flow metrics:** Tools like [LinearB](https://linearb.io/) integrate with Git and project management to measure delivery flow and <Tooltip text="DORA" definition="DevOps Research and Assessment — a programme that identified four key metrics for software delivery performance: deployment frequency, lead time, change failure rate, and time to restore." />-style metrics during integration and release.
:::
