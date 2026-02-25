---
sidebar_position: 1
slug: /product-management/product-management-intro
description: Product Management introduction and key concepts
---

# Product Management Intro

> [Back to Documentation Intro Contents](../DocumentationIntro.md)

## Quick Links

- [Product Management Research](../product-management/research)
- [Product Discovery](../product-management/product-discovery)

<PageBreak />

## Key Concepts

### Product Vision, Strategy and Principles

These three layers help align teams and stakeholders on *why* the product exists, *how* it will win, and *what* behaviour is non-negotiable when making trade-offs.

| Layer | Purpose | Horizon | Example |
|-------|---------|---------|--------|
| **Product Vision** | The long-term impact or North Star; why the product exists. | Years | "Enable every small business to compete with big brands through data." |
| **Product Strategy** | How the product will win in the market; where to play and how to differentiate. | 1–3 years | "Win in SMB by being the easiest to set up and the most transparent on pricing." |
| **Product Principles** | Guardrails for decisions; what we optimise for and what we won't do. | Stable | "We prioritise clarity over cleverness." / "We never use dark patterns." |

Vision and strategy inform roadmap and <Tooltip text="OKRs" definition="Objectives and Key Results: a goal-setting framework where Objectives are qualitative goals and Key Results are measurable outcomes that indicate success." />; principles help when prioritising features, design choices, and partner deals, speaking the nature of the products you want to create and the values you want to uphold.

:::tip[Example: Principles in practice]
If a principle is "We never use dark patterns," then a proposal for a pre-checked "opt in to marketing" box is out of scope, regardless of short-term conversion gains. Principles make tough calls consistent.
:::

:::info[By company stage]
- **Startup:** Vision might be a single sentence; strategy may live in the founder's head. Writing down 3–5 product principles early still pays off when the team grows.
- **Growth / Established:** Document vision and strategy in a living doc (e.g. one-pager or wiki). Revisit strategy at least annually; principles rarely change unless the company pivots.
:::

<PageBreak />

### DORA Metrics

<Tooltip text="DORA" definition="DevOps Research and Assessment - Four key measures of software delivery: deployment frequency, lead time for changes, change failure rate, and time to restore service." /> stands for DevOps Research and Assessment, a long‑running research initiative originally formed to understand what makes software teams high‑performing. It is now part of Google Cloud, continuing to publish the annual <Tooltip text="State of DevOps report" definition="An annual research report (now from Google Cloud) on DevOps practices and team performance based on industry data." />. DORA’s research spans more than a decade and includes data from tens of thousands of engineering professionals worldwide. The program identified four key software delivery performance metrics (the “DORA metrics”):

| Metric                   | What It Measures                             | Why It Matters                     | Elite Benchmarks (2026)      |
|--------------------------|----------------------------------------------|------------------------------------|-------------------------------|
| **Deployment Frequency**     | How often code is deployed to production     | Indicates delivery velocity        | On-demand (multiple/day)     |
| **Lead Time for Changes**    | Time from code commit to production          | Process efficiency                 | < 1 hour                      |
| **Change Failure Rate**      | % of deployments causing failures            | Release quality, stability         | 0 – 15%                      |
| **Time to Restore Service**  | Time to recover from production failure      | Incident response effectiveness    | < 1 hour                      |

These metrics measure both speed (throughput) and stability, showing that elite teams excel at both. DORA’s findings link strong engineering practices and healthy team culture to better organizational performance, including profitability, productivity, and customer satisfaction. The metrics are widely used across the industry as a standard framework for assessing DevOps maturity and guiding continuous improvement.

:::tip[Tools to Help with DORA Metrics]
You can integrate tools like [LinearB](https://linearb.io/), [Haystack](https://www.usehaystack.io/) and [Sleuth](https://sleuth.io/) with your source control ([GitHub](https://github.com/)) and project management ([Jira](https://www.atlassian.com/software/jira)/[Azure DevOps](https://azure.microsoft.com/en-us/products/devops)). Even a simple dashboard in Jira that tracks "Issue Created" to "Production Release" can show Lead Time.
:::

<PageBreak />

### The Three Ways

> For more information on the Three Ways, see [The Phoenix Project](/docs/product-management/research#the-three-ways-the-phoenix-project)

1. **The First Way: The Principles of Flow  (Backlog Hygiene & Small Batches)** - This is about making work visible and moving it from left (Dev) to right (Ops) as fast as possible. For a PO, it means prioritizing ruthless backlog grooming, breaking down large features into smaller, manageable chunks, and making work visible. If you've helped reduce "work in progress" or made sure tasks didn't sit waiting for weeks, that's demonstrating flow.
2. **The Second Way: The Principles of Feedback (Telemetry & Rapid Loops)** - This is about creating, shortening, and amplifying feedback loops from right (Ops/Users) to left (Dev). As a PO, you'd ensure your team is using analytics tools to understand how users are interacting with features. Getting user feedback early and often, and then rapidly incorporating that into the next iteration, is key. Think about how you've gathered data to validate a feature or quickly rolled back a change that wasn't working.
3. **The Third Way: The Principles of Continual Learning  (Spikes & Retrospectives)** - This is about creating a culture that fosters two things: continual experimentation (taking risks and learning from failure) and understanding that repetition and practice are the prerequisites to mastery.

:::tip[Tools to Help with the Three Ways]
For The Second Way, you can use tools like [Mixpanel](https://mixpanel.com/) or [Amplitude](https://amplitude.com/) to understand how users are interacting with features. For the Third Way, you can use tools like [Spikes](https://www.spikes.com/) to help with continual learning.
  :::

<PageBreak />

### Prioritization Frameworks

With limited resources and endless feature requests, structured prioritization is essential. The most effective frameworks include:

| Framework     | When to Use                                            | Key Components                                 | Pros                      | Cons                                        |
| ------------- | ------------------------------------------------------ | ---------------------------------------------- | ------------------------- | ------------------------------------------- |
| RICE          | Feature-level prioritization with quantifiable metrics | Reach, Impact, Confidence, Effort              | Data-driven, objective    | Can be time-consuming, subjective estimates |
| MoSCoW        | Sprint planning, stakeholder communication             | Must-have, Should-have, Could-have, Won't-have | Simple, aligns teams      | Can be vague, subjective                    |
| Cost-of-Delay | Strategic decisions, opportunity cost analysis         | Business value × Urgency                       | Focuses on value, urgency | Requires accurate value estimation          |

For outcome-based planning and aligning roadmap to goals, see [Outcome-based roadmaps and OKRs](/docs/SDLC/planning-and-design#outcome-based-roadmaps-and-okrs) in Planning and Design.

<PageBreak />

## Suggested PM Tool Stack

| Concept/Area                                   | Essential Tools/Technologies                                   | Why It Matters for PMs                                                       |
| ---------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Operating System                               | [Linux](https://www.linux.org/) (Ubuntu)                                                 | Most workloads run on Linux; basic fluency is critical.                      |
| Version Control                                | [Git](https://git-scm.com/) ([GitHub](https://github.com/))                                           | Foundation for code, infrastructure, and config changes.                     |
| Scripting/Automation                           | [Bash](https://www.gnu.org/software/bash/), [Python](https://www.python.org/)                                           | Enables automation, rapid prototyping, and debugging.                        |
| Infrastructure as Code (IaC)      | [Terraform](https://www.terraform.io/)                                                      | Standard for provisioning cloud infrastructure.                              |
| Configuration Management                       | [Ansible](https://www.ansible.com/)                                                        | Ensures consistent, repeatable server configuration.                         |
| Containers                                     | [Docker](https://www.docker.com/)                                                     | Standard for packaging and deploying applications.                           |
| Container Orchestration                        | [Kubernetes](https://kubernetes.io/)                                                     | Industry standard for scaling and managing containers.                       |
| Package Management                             | [Helm](https://helm.sh/), [Kustomize](https://kustomize.io/)                                                | Simplifies Kubernetes app deployment and customization.                      |
| Continuous Integration & Deployment (CI/CD) | [GitHub Actions](https://github.com/features/actions), [Azure DevOps](https://azure.microsoft.com/en-us/products/devops), [Argo CD](https://argo-cd.readthedocs.io/en/stable/)                  | Automates build, test, and deployment pipelines.                             |
| Meeting Recording & Transcription               | [Otter](https://otter.ai/) and [Willow Voice](https://www.willow.ai/)                    | Allows fast transcription of meetings and reviews of meeting transcripts              |
| Observability & Monitoring                     | [Prometheus](https://prometheus.io/), [Grafana](https://grafana.com/), [ELK/EFK](https://www.elastic.co/), [OpenTelemetry](https://opentelemetry.io/)                    | Enables proactive monitoring, troubleshooting, and improvement.              |
| Cloud Platforms                                | [AWS](https://aws.amazon.com/), [Azure](https://azure.microsoft.com/), [GCP](https://cloud.google.com/) (pick one to master) | Deep expertise in one cloud is more valuable than shallow knowledge of many. |
| Security / DevSecOps                       | [Snyk](https://snyk.io/), [Trivy](https://trivy.dev/), [Checkov](https://www.checkov.io/), [OPA](https://www.openpolicyagent.org/)                                  | Integrates security into the pipeline ("shift left").                        |


