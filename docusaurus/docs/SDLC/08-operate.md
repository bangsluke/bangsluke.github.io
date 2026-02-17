---
slug: /SDLC/operate
description: The operations phase (day-to-day running) of the software
sidebar_position: 8
---

# Operate

> [Back to SDLC Intro](../SDLC/introduction)

The **Operate** phase involves the day-to-day running of the software. This is where the value is delivered to the user - and where the consequences of every previous phase become real. Operations is not an afterthought; it is the sustained effort that keeps your product available, performant, and trustworthy.

## SRE Principles

<Tooltip text="Site Reliability Engineering (SRE)" definition="A discipline that applies software engineering principles to operations, focusing on reliability, automation, and reducing manual operational work (toil)." /> - pioneered at Google - provides a framework for running reliable systems at scale. Its core ideas apply to teams of any size.

### Error Budgets

An <Tooltip text="error budget" definition="The acceptable amount of unreliability for a service, calculated as 100% minus the SLO target (e.g. a 99.9% SLO gives a 0.1% error budget). When the budget is exhausted, the team shifts focus from features to reliability." /> is the inverse of your reliability target. If your <Tooltip text="SLO" definition="Service Level Objective - a target value for a service's reliability metric (e.g. 99.9% availability, p99 latency under 200ms), set by the team based on user expectations." /> is 99.9% availability, you have a 0.1% <Tooltip text="error budget" definition="The acceptable amount of unreliability for a service, calculated as 100% minus the SLO target. When exhausted, the team shifts focus from features to reliability." /> - roughly 43 minutes of downtime per month. This budget creates a powerful decision framework:

- **Budget remaining?** Ship features, take risks, move fast.
- **Budget exhausted?** Freeze feature work and focus entirely on reliability improvements.

This eliminates the perpetual tension between "ship faster" and "be more reliable" by making the trade-off data-driven.

### Toil Reduction

<Tooltip text="Toil" definition="Manual, repetitive, automatable operational work that scales linearly with service growth and provides no enduring value. Examples: manual deployments, certificate rotations, log file cleanups." /> is manual, repetitive operational work that scales linearly with service growth. <Tooltip text="SRE" definition="Site Reliability Engineering — a discipline that applies software engineering principles to operations, focusing on reliability, automation, and reducing toil." /> teams aim to spend no more than 50% of their time on toil - the rest goes to engineering work that eliminates toil permanently.

- Identify the top 5 most time-consuming manual operations.
- Automate them systematically, starting with the highest-frequency tasks.
- Track toil hours to measure progress over time.

<PageBreak />

## Incident Management

When things break (and they will), a structured incident process minimises user impact and accelerates recovery.

### Severity Levels

Define clear severity levels so everyone knows how urgently to respond:

| Severity | Impact | Response Time | Examples |
|----------|--------|---------------|----------|
| **SEV-1 (Critical)** | Complete service outage or data loss | Immediate (all hands) | Production down, security breach, data corruption |
| **SEV-2 (Major)** | Significant degradation affecting many users | Within 30 minutes | Core feature broken, major performance issue |
| **SEV-3 (Minor)** | Limited impact, workaround available | Within business hours | Non-critical feature bug, minor performance degradation |
| **SEV-4 (Low)** | Minimal impact, cosmetic or edge case | Next sprint | UI glitch, minor logging issue |

### On-Call Rotations

- Rotate on-call responsibility across the team - no single person should carry the pager permanently.
- Provide clear <Tooltip text="runbooks" definition="Step-by-step guides for responding to specific operational scenarios (e.g. database failover, high CPU alert, certificate expiry), designed so any on-call engineer can follow them." /> for common alert scenarios so any team member can respond effectively.
- Compensate on-call engineers appropriately (time off in lieu, on-call payments, or reduced sprint commitments).
- Track on-call load - if one team gets paged 10x more than others, that is a reliability signal that needs attention.

### Post-Incident Reviews (Blameless Postmortems)

After every SEV-1 and SEV-2 incident, conduct a <Tooltip text="blameless postmortem" definition="A structured review after an incident that focuses on understanding systemic causes and improving processes - never on blaming individuals." />:

1. **Timeline:** What happened, when, and what actions were taken.
2. **Root Cause:** What underlying conditions allowed this to happen.
3. **Contributing Factors:** What made detection or recovery slower.
4. **Action Items:** Specific, assigned tasks to prevent recurrence - with deadlines.
5. **Learnings:** What the team learned and what went well during the response.

:::tip[Postmortem Culture]
The "blameless" part is non-negotiable. If engineers fear blame, they will hide information, and your <Tooltip text="postmortems" definition="Structured reviews after an incident that focus on understanding systemic causes and improving processes — never on blaming individuals." /> will be useless. The goal is to fix the system, not the person. Make <Tooltip text="postmortems" definition="Structured reviews after an incident that focus on understanding systemic causes and improving processes — never on blaming individuals." /> visible (publish them internally) to spread learning across the organisation.
:::

<PageBreak />

## Capacity Planning and Scaling

### Capacity Planning

<Tooltip text="Capacity planning" definition="Forecasting how much compute, memory, and storage your systems will need to serve current and future demand, and provisioning accordingly." /> ensures your infrastructure can handle current and future load.

- **Horizontal Scaling:** Adding more instances behind a load balancer. Preferred for stateless services.
- **Vertical Scaling:** Adding more resources (CPU, RAM) to existing instances. Simpler but has an upper limit.
- **Auto-Scaling:** Configure automatic scaling policies that add/remove capacity based on real-time metrics (CPU usage, request queue depth, custom metrics).

### Runbooks

Operational <Tooltip text="runbooks" definition="Step-by-step guides for responding to specific operational scenarios (e.g. database failover, high CPU alert, certificate expiry), designed so any on-call engineer can follow them." /> are living documents that capture the "how to" for common operational tasks:

- How to restart a crashed service
- How to failover to a backup database
- How to investigate and resolve common alert types
- How to perform emergency rollbacks

Automate <Tooltip text="runbook" definition="A step-by-step guide for responding to specific operational scenarios, designed so any on-call engineer can follow it." /> steps where possible - the best runbook is one that executes itself.

## <Tooltip text="Security Operations (SecOps)" definition="The integration of security practices into IT operations, focusing on threat detection, incident response, patch management, and compliance." />

- **Threat Detection:** Monitor for suspicious activity (unusual login patterns, privilege escalation, data exfiltration attempts).
- **Patch Management:** Apply security patches promptly. Define <Tooltip text="SLAs" definition="Service Level Agreements — contractual commitments specifying minimum levels of availability, performance, and support response times." /> for critical vulnerabilities (e.g. patch within 48 hours for CVE score 9+).
- **Access Control:** Implement least-privilege access. Review and audit access permissions quarterly.
- **Compliance:** Maintain audit logs and access records required by your regulatory framework.

:::info[By Company Stage]
- **Startup:** The founders and engineers are the on-call team. Use **simple alerting** (PagerDuty or Opsgenie free tier, or even Slack alerts). Write basic <Tooltip text="runbooks" definition="Step-by-step guides for responding to specific operational scenarios, designed so any on-call engineer can follow them." /> for the 3-5 most likely failure scenarios. Use cloud-managed services (<Tooltip text="RDS" definition="Relational Database Service - A cloud service that provides a managed database service." />, managed <Tooltip text="Kubernetes" definition="An open-source system for automating deployment, scaling, and management of containerised applications." />, serverless) to minimise operational burden. <Tooltip text="Postmortems" definition="Structured reviews after an incident that focus on understanding systemic causes and improving processes — never on blaming individuals." /> can be informal but should still happen.
- **Growth Stage:** Hire or designate a **dedicated <Tooltip text="SRE" definition="Site Reliability Engineering — a discipline that applies software engineering principles to operations, focusing on reliability, automation, and reducing toil." /> or platform team**. Implement formal on-call rotations with compensation. Define <Tooltip text="SLOs" definition="Service Level Objectives — target values for a service's reliability metrics (e.g. 99.9% availability), set by the team based on user expectations." /> for key services and track <Tooltip text="error budgets" definition="The acceptable amount of unreliability for a service, calculated as 100% minus the SLO target. When exhausted, the team shifts focus from features to reliability." />. Build a comprehensive <Tooltip text="runbook" definition="A step-by-step guide for responding to specific operational scenarios, designed so any on-call engineer can follow it." /> library. Invest in auto-scaling and capacity monitoring. Structured <Tooltip text="postmortem" definition="A structured review after an incident that focuses on understanding systemic causes and improving processes — never on blaming individuals." /> process with published learnings.
- **Established:** Operate a **24/7 <Tooltip text="NOC" definition="Network Operations Center - a centralised facility staffed around the clock to monitor, manage, and respond to alerts across all systems and infrastructure." />** or follow-the-sun on-call model. Run <Tooltip text="chaos engineering" definition="The practice of intentionally injecting failures (server crashes, network partitions, latency) into production or staging systems to verify resilience and uncover weaknesses." /> programs (Chaos Monkey, Gremlin, Litmus) to proactively test resilience. Formal <Tooltip text="SLA" definition="Service Level Agreement - a contractual commitment to customers specifying minimum levels of availability, performance, and support response times." /> management with contractual commitments. Regular disaster recovery drills. Compliance audits (<Tooltip text="SOC2" definition="System and Organization Controls 2 — a framework for assessing the security, availability, and confidentiality of a system." />, <Tooltip text="ISO 27001" definition="An international standard for information security management systems (ISMS), specifying requirements for establishing, maintaining, and continually improving security." />) covering operational practices.
:::

<PageBreak />

## Common Pitfalls

:::danger[Anti-patterns to Avoid]
- **Hero Culture:** One person who "knows everything" and is always called when things break. This is a single point of failure for the organisation. Distribute knowledge through <Tooltip text="runbooks" definition="Step-by-step guides for responding to specific operational scenarios, designed so any on-call engineer can follow them." />, pair on-call, and documentation.
- **No <Tooltip text="Postmortems" definition="Structured reviews after an incident that focus on understanding systemic causes and improving processes — never on blaming individuals." />:** Without structured learning from incidents, the same failures repeat. <Tooltip text="Postmortems" definition="Structured reviews after an incident that focus on understanding systemic causes and improving processes — never on blaming individuals." /> are not optional - they are the primary mechanism for improving reliability.
- **Alert Fatigue:** Too many low-priority or noisy alerts cause engineers to ignore all alerts - including the critical ones. Tune alerts ruthlessly: every alert should be actionable and require human intervention.
- **Ignoring Toil:** Accepting manual operational work as "just the way things are" means your team scales linearly with your infrastructure. Automate relentlessly.
:::

### Operations Key Deliverables

- Service Level Objectives (SLOs) and Error Budgets
- On-Call Schedule and Escalation Policies
- Operational Runbooks
- Post-Incident Review Reports
- Capacity Plans

:::tip[How AI Can Help: Operations]
AI is critical for managing the complexity of modern distributed systems:

- **Self-Healing:** AI enables systems to recover automatically by rerouting traffic or faster scaling. [Cisco AppDynamics](https://www.appdynamics.com/) uses AI to minimize downtime.
- **Intelligent Incident Response:** [PagerDuty](https://www.pagerduty.com/) uses ML to automate incident triage and improve alert routing.
- **Security:** [Palo Alto Networks](https://www.paloaltonetworks.com/) and [Splunk](https://www.splunk.com/) use AI to detect and block threats in real-time.
:::
