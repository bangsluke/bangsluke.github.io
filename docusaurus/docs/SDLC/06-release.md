---
slug: /SDLC/release
description: The release phase of preparing the software for production
sidebar_position: 6
---

# Release

> [Back to SDLC Intro](../SDLC/introduction)

The **Release** phase is where the software is prepared for delivery to the end-user. It involves planning, scheduling, and controlling the movement of a build through different stages and environments. A well-managed release process is the difference between a calm, predictable ship and a chaotic "deploy and pray."

## Release Strategies

How you release software should be a deliberate choice, not an accident of your tooling.

### Continuous Delivery

With <Tooltip text="continuous delivery" definition="A practice where every change that passes automated tests is automatically prepared for release to production, though the actual deployment may still require a manual approval." />, every change that passes CI is a release candidate. The team can deploy at any time with confidence because every build is production-ready.

- **Best for:** Teams with strong <Tooltip text="CI/CD" definition="Continuous Integration / Continuous Delivery — the practice of automatically building, testing, and preparing code for release on every change." />, high test coverage, and the ability to roll back quickly.
- **Cadence:** On-demand (potentially multiple times per day).

### Scheduled Releases

Changes are batched into planned releases on a fixed cadence (weekly, bi-weekly, monthly). A release branch is cut, stabilised, and deployed on schedule.

- **Best for:** Teams that need coordination across multiple services or teams, or those with external stakeholders who need advance notice.
- **Cadence:** Fixed intervals (e.g. every two weeks, aligned with sprint boundaries).

### Release Trains

A <Tooltip text="release train" definition="A scheduled release cadence (often quarterly in SAFe) where all teams align their work to ship together, regardless of whether individual features are complete." /> departs on a fixed schedule whether features are ready or not. Features that are not complete are deferred to the next train. Common in scaled frameworks like <Tooltip text="SAFe" definition="Scaled Agile Framework - An enterprise framework for scaling Agile across large organisations with multiple teams and value streams." />.

- **Best for:** Large organisations with many teams that need to synchronise.
- **Cadence:** Fixed intervals (often quarterly).

<PageBreak />

## Versioning

Use <Tooltip text="Semantic Versioning (SemVer)" definition="A versioning scheme using MAJOR.MINOR.PATCH where: MAJOR = breaking changes, MINOR = new features (backwards-compatible), PATCH = bug fixes." /> (`MAJOR.MINOR.PATCH`) to communicate the nature of changes:

- **MAJOR:** Breaking changes that require consumer updates.
- **MINOR:** New features that are backwards-compatible.
- **PATCH:** Bug fixes and minor improvements.

Automate version bumping and changelog generation using tools like [semantic-release](https://github.com/semantic-release/semantic-release), [Changesets](https://github.com/changesets/changesets), or [Release Please](https://github.com/googleapis/release-please). These parse commit messages (following Conventional Commits) to determine the version bump automatically.

## Feature Flags

<Tooltip text="Feature flags" definition="Configuration switches that allow you to enable or disable features at runtime without deploying new code, enabling progressive rollout and instant rollback." /> decouple **deployment** from **release**. Code can be deployed to production but hidden behind a flag until you are ready to activate it.

- **Progressive Rollout:** Enable a feature for 1% of users, then 10%, then 50%, monitoring metrics at each stage before rolling out to 100%.
- **Kill Switches:** Instantly disable a problematic feature without a new deployment.
- **Flag Lifecycle Management:** Feature flags are <Tooltip text="technical debt" definition="The accumulated cost of shortcuts, deferred maintenance, and sub-optimal decisions that slow future development." />. Define an expiry policy - once a feature is fully rolled out and stable, remove the flag and its conditional code.

:::tip[Feature Flag Best Practices]
- Name flags descriptively (`enable-new-checkout-flow`, not `flag-123`).
- Set a default-off policy for new flags in production.
- Review and clean up flags quarterly. Long-lived flags become hidden configuration complexity.
- Use a dedicated platform ([LaunchDarkly](https://launchdarkly.com/), [Unleash](https://www.getunleash.io/), [Flagsmith](https://flagsmith.com/)) rather than rolling your own, especially as the number of flags grows.
:::

<PageBreak />

## Release Management Process

### Release Planning

- Schedule releases to minimise business impact (avoid Friday deploys unless you have confidence in your rollback process).
- Maintain a release calendar visible to all stakeholders.
- Define a clear "release owner" for each release who is accountable for coordination.

### Change Management

- <Tooltip text="Assessing the impact of changes" definition="Evaluating how a new release will affect users, systems, and processes before it is rolled out." /> - what is changing, who is affected, and what could go wrong.
- For high-risk changes, require explicit approval from a <Tooltip text="Change Advisory Board (CAB)" definition="A group of stakeholders (engineering leads, product, operations) who review and approve high-risk changes before they are released to production." /> or equivalent.
- Pre-release checklists: database migrations run? <Tooltip text="Feature flags" definition="Configuration switches that allow you to enable or disable features at runtime without deploying new code, enabling progressive rollout and instant rollback." /> configured? Monitoring dashboards updated? Support team briefed?

### Release Communication

- **Release Notes:** Clearly communicate what changed, what was fixed, and any known issues. Write for your audience - internal technical notes differ from customer-facing changelogs.
- **Stakeholder Notification:** Notify support, sales, and customer success teams before major releases so they can prepare for user questions.
- **Staging Validation:** Deploy to a <Tooltip text="pre-production environment" definition="An environment that closely mirrors production and is used for final testing before a release goes live." /> that mirrors production for final sign-off before releasing.

:::info[By Company Stage]
- **Startup:** Practice **continuous delivery** - ship to production multiple times per day. Lightweight release notes (a Slack message or auto-generated changelog is fine). The founder or CTO is often the release owner by default. <Tooltip text="Feature flags" definition="Configuration switches that allow you to enable or disable features at runtime without deploying new code, enabling progressive rollout and instant rollback." /> are optional but valuable even at small scale for de-risking launches.
- **Growth Stage:** Introduce **scheduled releases** (bi-weekly or sprint-aligned) with formal release notes. Adopt <Tooltip text="feature flags" definition="Configuration switches that allow you to enable or disable features at runtime without deploying new code, enabling progressive rollout and instant rollback." /> to decouple deploy from release. Establish a rotating release owner role. Set up beta programs or early-access groups to validate releases with a subset of users before full rollout.
- **Established:** Implement **release trains** or formal release management with CAB approval for high-risk changes. Compliance sign-off (change records, audit trails) becomes mandatory. Release windows defined by <Tooltip text="SLA" definition="Service Level Agreement — a contractual commitment to customers specifying minimum levels of availability, performance, and support response times." /> constraints. Automated release notes generated from Jira tickets and commit messages. Dedicated release management team or role.
:::

<PageBreak />

## Common Pitfalls

:::danger[Anti-patterns to Avoid]
- **Big-Bang Releases:** Batching months of work into a single massive release maximises risk. The more that changes, the harder it is to diagnose what broke. Ship smaller, ship more often.
- **No Rollback Plan:** Every release should have a tested rollback procedure. "We'll fix forward" is a plan, but it should not be the only plan.
- **Unclear Release Ownership:** When nobody owns the release, nobody checks the checklist. Assign a release owner for every ship.
- **Stale Feature Flags:** Flags that are never cleaned up become hidden configuration that new team members do not understand and cannot safely change.
:::

### Release Key Deliverables

- Release Package (versioned, immutable artifact)
- Release Notes / Changelog
- Deployment Plan
- Rollback Plan
- Feature Flag Configuration

:::tip[How AI Can Help: Release]
AI enhances decision-making and risk assessment during release:

- **Impact Analysis:** Tools like [Harness](https://harness.io/) and [GitLab](https://gitlab.com/) use AI to predict the potential impact of changes and identify affected dependencies.
- **Delivery and release visibility:** Tools like [Haystack](https://www.usehaystack.io/) connect Git and Jira to surface delivery metrics, risks, and release progress for release planning and reporting.
- **Automated Comms:** AI can analyze [Jira](https://www.atlassian.com/software/jira) tickets to automatically generate release notes and announcements for different stakeholders.
- **Feature Flags:** Platforms like [LaunchDarkly](https://launchdarkly.com/) utilize AI to optimize feature rollout strategies based on real-time user data.
- **Rollback Planning:** AI such as Hashicorp's [Terraform](https://www.hashicorp.com/products/terraform) has enhanced rollback planning, automatically generating and testing rollback scenarios to ensure smooth recovery in case of issue.
:::
