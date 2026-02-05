---
slug: /SDLC/deploy
description: The deployment phase of pushing the software to production
sidebar_position: 7
---

# Deploy

> [Back to SDLC Intro](../SDLC/introduction)

**Deploy** is the action of pushing the software to the production environment where it becomes accessible to users.

## Deployment Strategies

Modern deployment focuses on minimizing downtime and risk.

- **Infrastructure as Code (<Tooltip text="IaC" definition="Defining and provisioning infrastructure (such as servers and networks) using code so it can be versioned and automated." />):** Managing infrastructure through code rather than manual processes.
- **Blue/Green Deployment:** Running two identical environments; one is live (Blue), the other (Green) is where you deploy the new version.
- **Canary Analysis:** Rolling out the change to a small subset of users first.
- **Orchestration:** Managing the lifecycle of containers (e.g., <Tooltip text="Kubernetes" definition="An open-source system for automating deployment, scaling, and management of containerized applications." />).

### Deployment Key Deliverables

- Live Production System
- Configuration Scripts (IaC)

:::tip[How AI Can Help: Deployment]
AI optimizes the complex logistics of deployment:

- **Smart Infrastructure:** AI generates and optimizes <Tooltip text="IaC" definition="Defining and provisioning infrastructure (such as servers and networks) using code so it can be versioned and automated." /> scripts for tools like [Terraform](https://www.hashicorp.com/products/terraform) and [Pulumi](https://www.pulumi.com/), ensuring secure cloud configurations.
- **Continuous Deployment:** AI-powered CI/CD tools (including [GitLab](https://gitlab.com/), [GitHub](https://github.com/) and [CircleCI](https://circleci.com/)) optimize deployment windows and predict potential failures.
- **Risk Assessment:** Tools like [Harness](https://harness.io/) perform intelligent verification, analyzing post-deployment behavior to suggest automatic rollbacks if anomalies are detected.
  :::
