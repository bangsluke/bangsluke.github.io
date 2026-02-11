---
slug: /SDLC/release
description: The release phase of preparing the software for production
sidebar_position: 6
---

# Release

> [Back to SDLC Intro](../SDLC/introduction)

The **Release** phase is where the software is prepared for delivery to the end-user. It involves planning, scheduling, and controlling the build through different stages and environments.

## Release Management

This phase bridges the gap between development and operations.

- **Release Planning:** Scheduling the release to minimize business impact.
- **Change Management:** <Tooltip text="Assessing the impact of changes" definition="Evaluating how a new release will affect users, systems, and processes before it is rolled out." />.
- **Documentation:** Creating release notes, updating user manuals, and training support staff.
- **Staging:** Deploying to a <Tooltip text="pre-production environment" definition="An environment that closely mirrors production and is used for final testing before a release goes live." /> that mirrors production for final sign-off.

### Release Key Deliverables

- Release Package
- Release Notes
- Deployment Plan

:::tip[How AI Can Help: Release]
AI enhances decision-making and risk assessment during release:

- **Impact Analysis:** Tools like [Harness](https://harness.io/) and [GitLab](https://gitlab.com/) use AI to predict the potential impact of changes and identify affected dependencies.
- **Delivery and release visibility:** Tools like [Haystack](https://www.usehaystack.io/) connect Git and Jira to surface delivery metrics, risks, and release progress for release planning and reporting.
- **Automated Comms:** AI can analyze [Jira](https://www.atlassian.com/software/jira) tickets to automatically generate release notes and announcements for different stakeholders.
- **Feature Flags:** Platforms like [LaunchDarkly](https://launchdarkly.com/) utilize AI to optimize feature rollout strategies based on real-time user data.
- **Rollback Planning:** AI such as Hashicorp's [Terraform](https://www.hashicorp.com/products/terraform) has enhanced rollback planning, automatically generating and testing rollback scenarios to ensure smooth recovery in case of issue.
  :::
