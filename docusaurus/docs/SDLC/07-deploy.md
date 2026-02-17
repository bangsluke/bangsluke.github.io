---
slug: /SDLC/deploy
description: The deployment phase of pushing the software to production
sidebar_position: 7
---

# Deploy

> [Back to SDLC Intro](../SDLC/introduction)

**Deploy** is the action of pushing the software to the production environment where it becomes accessible to users. A mature deployment process is boring by design - predictable, automated, and reversible. If deploying to production feels risky, your deployment process needs work.

## Deployment Strategies

Modern deployment focuses on minimising downtime and risk. Each strategy makes different trade-offs between complexity, speed, and safety.

### Recreate (Replace)

Shut down the old version entirely, then start the new version. Simple but causes downtime.

- **Best for:** Non-critical internal tools, batch jobs, or environments where brief downtime is acceptable.
- **Risk:** Complete outage during the switchover window.

### Rolling Deployment

Gradually replace instances of the old version with the new version, one (or a few) at a time. No downtime, but both versions run simultaneously during the rollout.

- **Best for:** Stateless applications behind a load balancer.
- **Risk:** Requires backward-compatible changes since both versions serve traffic simultaneously.

### Blue/Green Deployment

Run two identical production environments. Deploy the new version to the idle environment (Green), test it, then switch traffic from the current environment (Blue) to Green.

- **Best for:** Applications that need instant rollback capability. If Green has issues, switch traffic back to Blue immediately.
- **Risk:** Requires double the infrastructure (though cloud auto-scaling mitigates this cost).

### Canary Deployment

<Tooltip text="Canary deployment" definition="A deployment strategy that rolls out changes to a small subset of users first, monitors for issues, then gradually increases the rollout percentage." /> rolls out the new version to a small percentage of users (e.g. 1-5%) while the majority continue using the old version. Monitor error rates and performance, then gradually increase the canary percentage.

- **Best for:** High-traffic applications where you want real-world validation before full rollout.
- **Risk:** Requires sophisticated traffic routing and monitoring. Users on the canary may experience issues.

<PageBreak />

## Infrastructure as Code

<Tooltip text="Infrastructure as Code (IaC)" definition="Defining and provisioning infrastructure (such as servers, networks, and databases) using code so it can be versioned, reviewed, and automated." /> means managing infrastructure through version-controlled code rather than manual processes. This is foundational for reliable, repeatable deployments.

### IaC Tools

- **[Terraform](https://www.hashicorp.com/products/terraform):** Cloud-agnostic, declarative infrastructure. The most widely adopted <Tooltip text="IaC" definition="Infrastructure as Code — defining and provisioning infrastructure using code so it can be versioned, reviewed, and automated." /> tool. Excellent for multi-cloud setups.
- **[Pulumi](https://www.pulumi.com/):** <Tooltip text="IaC" definition="Infrastructure as Code — defining and provisioning infrastructure using code so it can be versioned, reviewed, and automated." /> using general-purpose programming languages (TypeScript, Python, Go) instead of a <Tooltip text="DSL" definition="Domain Specific Language — a programming language specialised for a particular domain or task." />. Preferred by teams who want full programming language capabilities.
- **[AWS CloudFormation](https://aws.amazon.com/cloudformation/) / [Azure Bicep](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/):** Cloud-specific <Tooltip text="IaC" definition="Infrastructure as Code — defining and provisioning infrastructure using code so it can be versioned, reviewed, and automated." /> tools. Best when you are committed to a single cloud provider.

### IaC Best Practices

- Store all infrastructure code in version control alongside application code.
- Use modules and reusable components to avoid duplication.
- Implement a review process for infrastructure changes (Terraform plan review before apply).
- Use remote state with locking to prevent concurrent modifications.

## Environment Management

### Environment Parity

Maintain consistent environments across the deployment pipeline:

- **Development:** Local or cloud-based developer environments.
- **Staging / Pre-production:** A <Tooltip text="pre-production environment" definition="An environment that closely mirrors production and is used for final testing and validation before a release goes live." /> that mirrors production as closely as possible - same infrastructure, same configurations, same data shapes (with synthetic data).
- **Production:** The live environment serving real users.

The goal is to minimise the delta between environments. <Tooltip text="Configuration drift" definition="When an environment's actual state diverges from its intended state over time, often due to manual changes, causing unpredictable behaviour." /> - where environments silently diverge - is a top cause of "works in staging, breaks in prod" failures.

### Secrets Management

Never store secrets (API keys, database credentials, encryption keys) in code, environment variables checked into source control, or configuration files.

- Use a dedicated secrets manager ([HashiCorp Vault](https://www.vaultproject.io/), AWS Secrets Manager, Azure Key Vault, [Doppler](https://www.doppler.com/)).
- Rotate secrets on a defined schedule.
- Audit access to secrets.

### Zero-Downtime Deployment

For user-facing applications, zero-downtime deployment is a baseline expectation. Key techniques:

- **Database migrations must be backward-compatible:** Deploy schema changes that work with both old and new application versions. Use expand-and-contract migration patterns.
- **Graceful shutdown:** Applications should finish in-flight requests before terminating.
- **Health checks:** Load balancers should only route traffic to instances that report healthy.
- **Orchestration:** Container orchestration platforms like <Tooltip text="Kubernetes" definition="An open-source system for automating deployment, scaling, and management of containerised applications." /> handle rolling updates, health checking, and automatic rollback natively.

:::info[By Company Stage]
- **Startup:** Use a **<Tooltip text="PaaS" definition="Platform as a Service - a cloud service (e.g. Vercel, Netlify, Railway, Heroku) that handles infrastructure so developers can focus on application code." />** (Vercel, Netlify, Railway, Render) for deployment. Push to `main`, it deploys automatically. Manual infrastructure is acceptable initially - do not over-invest in <Tooltip text="IaC" definition="Infrastructure as Code — defining and provisioning infrastructure using code so it can be versioned, reviewed, and automated." /> until you have <Tooltip text="product-market fit" definition="The point at which a product satisfies strong market demand, evidenced by organic growth and retention." />. Focus on shipping, not infrastructure perfection.
- **Growth Stage:** Adopt **<Tooltip text="IaC" definition="Infrastructure as Code — defining and provisioning infrastructure using code so it can be versioned, reviewed, and automated." />** (Terraform or Pulumi) for all infrastructure. Containerise applications with <Tooltip text="Docker" definition="A platform for building, running, and shipping applications inside lightweight, portable containers." />. Implement multi-environment pipelines (dev → staging → production) with promotion gates. Introduce <Tooltip text="blue/green" definition="A deployment strategy using two identical environments — deploy to the idle one, then switch traffic, enabling instant rollback." /> or <Tooltip text="canary" definition="A deployment strategy that rolls out changes to a small subset of users first, monitors for issues, then gradually increases the rollout percentage." /> deployments for critical services. Set up a secrets manager.
- **Established:** Implement **multi-region deployments** with disaster recovery. Compliance-audited deployment pipelines (<Tooltip text="SOC2" definition="System and Organization Controls 2 — a framework for assessing the security, availability, and confidentiality of a system." /> controls, change records, approval workflows). <Tooltip text="Kubernetes" definition="An open-source system for automating deployment, scaling, and management of containerised applications." /> or equivalent orchestration at scale. Dedicated platform engineering team owns deployment infrastructure. Regular disaster recovery drills. Deployment dashboards tracking <Tooltip text="DORA metrics" definition="Four key deployment metrics: deployment frequency, lead time for changes, change failure rate, and mean time to restore service." />.
:::

<PageBreak />

## Common Pitfalls

:::danger[Anti-patterns to Avoid]
- **Snowflake Servers:** Environments configured manually and never reproduced. When they break, nobody knows how to rebuild them. <Tooltip text="IaC" definition="Infrastructure as Code — defining and provisioning infrastructure using code so it can be versioned, reviewed, and automated." /> eliminates this entirely.
- **No Rollback Procedure:** If you cannot roll back a deployment within minutes, you do not have a deployment process - you have a one-way door. Test your rollback procedure regularly.
- **Configuration Drift:** Staging and production silently diverge over time due to manual changes. Use <Tooltip text="IaC" definition="Infrastructure as Code — defining and provisioning infrastructure using code so it can be versioned, reviewed, and automated." /> and automated configuration management to keep environments in sync.
- **Deploying on Friday at 5pm:** Deploy when your team is available to monitor and respond. If your deployment process is truly reliable, any time is fine - but build that confidence first.
:::

### Deployment Key Deliverables

- Live Production System
- <Tooltip text="IaC" definition="Infrastructure as Code — defining and provisioning infrastructure using code so it can be versioned, reviewed, and automated." /> Configuration Scripts
- Deployment <Tooltip text="Runbook" definition="A step-by-step guide for responding to specific operational scenarios, designed so any on-call engineer can follow it." />
- Rollback Procedure (tested)
- Environment Configuration Documentation

:::tip[How AI Can Help: Deployment]
AI optimizes the complex logistics of deployment:

- **Smart Infrastructure:** AI generates and optimizes <Tooltip text="IaC" definition="Defining and provisioning infrastructure (such as servers and networks) using code so it can be versioned and automated." /> scripts for tools like [Terraform](https://www.hashicorp.com/products/terraform) and [Pulumi](https://www.pulumi.com/), ensuring secure cloud configurations.
- **Continuous Deployment:** AI-powered <Tooltip text="CI/CD" definition="Continuous Integration / Continuous Delivery — the practice of automatically building, testing, and preparing code for release on every change." /> tools (including [GitLab](https://gitlab.com/), [GitHub](https://github.com/) and [CircleCI](https://circleci.com/)) optimize deployment windows and predict potential failures.
- **Deployment visibility / DORA:** Tools like [Sleuth](https://www.sleuth.io/) provide deployment tracking and <Tooltip text="DORA" definition="DevOps Research and Assessment — a programme that identified four key metrics for software delivery performance: deployment frequency, lead time, change failure rate, and time to restore." />-style metrics to improve deployment visibility and delivery performance.
- **Risk Assessment:** Tools like [Harness](https://harness.io/) perform intelligent verification, analyzing post-deployment behavior to suggest automatic rollbacks if anomalies are detected.
:::
