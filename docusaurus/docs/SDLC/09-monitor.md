---
slug: /SDLC/monitor
description: The final phase, monitoring and observability when the software is running in production
sidebar_position: 9
---

# Monitoring and Observability

> [Back to SDLC Intro](../SDLC/introduction)

**Monitoring** is the process of collecting, analysing, and using information to track applications and infrastructure. **<Tooltip text="Observability" definition="How well you can understand the internal state of a system based only on its outputs such as metrics, logs, and traces." />** goes further - it is the measure of how well you can understand the internal state of a system from its external outputs. Monitoring tells you *when* something is wrong; observability helps you understand *why*.

This phase closes the SDLC loop. The insights gathered here feed directly back into [Planning and Design](./02-planning-and-design.md), informing what to build, fix, and improve next.

## The Three Pillars of Observability {#the-three-pillars}

A robust monitoring strategy typically relies on three complementary data types:

### 1. Metrics

<Tooltip text="Metrics" definition="Time-series numerical measurements (e.g. request rate, error rate, CPU usage) aggregated over time, used to spot trends and trigger alerts." /> are numerical data measured over time. They are cheap to store, fast to query, and excellent for dashboards and alerting.

- **What to measure:** Request rate, error rate, latency (p50, p95, p99), saturation (CPU, memory, disk, queue depth), and business-specific metrics (sign-ups, orders, revenue).
- **Tools:** [Prometheus](https://prometheus.io/) + [Grafana](https://grafana.com/), [Datadog](https://www.datadoghq.com/), [CloudWatch](https://aws.amazon.com/cloudwatch/).

### 2. Logs

Logs are discrete, timestamped event records that capture what happened in the system.

- **What to log:** Errors with stack traces, significant state changes, authentication events, external API calls. Avoid logging sensitive data (PII, passwords, tokens).
- **Structured Logging:** Use JSON-formatted logs with consistent fields (timestamp, severity, service, trace_id) so they can be searched and aggregated programmatically.
- **Tools:** [ELK Stack](https://www.elastic.co/elastic-stack) (Elasticsearch, Logstash, Kibana), [Loki](https://grafana.com/oss/loki/) + Grafana, [Datadog Logs](https://www.datadoghq.com/product/log-management/).

### 3. Traces

Traces follow the path of a single request as it travels through a distributed system, showing which services it touched, how long each took, and where failures occurred.

- **What to trace:** All inter-service communication, database queries, and external API calls. Use <Tooltip text="distributed tracing" definition="A method of tracking a request across multiple services in a distributed system by propagating a unique trace ID, enabling end-to-end latency analysis." /> to correlate events across services.
- **<Tooltip text="Instrumentation" definition="Adding code or configuration to your application that emits metrics, logs, and traces - the data that makes a system observable." />:** Use <Tooltip text="OpenTelemetry" definition="An open-source observability framework providing vendor-neutral APIs, SDKs, and tools for generating and collecting metrics, logs, and traces." /> (the industry standard) to instrument your applications. It provides vendor-neutral SDKs for metrics, logs, and traces.
- **Tools:** [Jaeger](https://www.jaegertracing.io/), [Zipkin](https://zipkin.io/), [Datadog APM](https://www.datadoghq.com/product/apm/), [Honeycomb](https://www.honeycomb.io/).

<PageBreak />

## The Golden Signals

Google's <Tooltip text="SRE" definition="Site Reliability Engineering — a discipline that applies software engineering principles to operations, focusing on reliability, automation, and reducing toil." /> handbook defines four <Tooltip text="golden signals" definition="The four most important metrics for monitoring any user-facing system: latency, traffic, errors, and saturation." /> that every service should monitor:

1. **Latency:** How long it takes to serve a request. Track both successful and failed requests separately - a fast error is still a bad user experience.
2. **Traffic:** The volume of demand on your system (requests per second, concurrent users, transactions per minute).
3. **Errors:** The rate of requests that fail - either explicitly (HTTP 5xx) or implicitly (HTTP 200 but with wrong content).
4. **Saturation:** How "full" your service is. The most constrained resource (CPU, memory, I/O, database connections) determines your saturation.

:::tip[Start Here]
If you instrument nothing else, instrument the golden signals for every user-facing service. They give you 80% of the operational insight with 20% of the effort.
:::

## Alerting Strategy

Alerting is the bridge between monitoring data and human action. Done well, every alert triggers a meaningful response. Done poorly, it creates <Tooltip text="alert fatigue" definition="The desensitisation that occurs when engineers receive too many low-quality or non-actionable alerts, causing them to ignore all alerts - including critical ones." /> and erodes trust.

### Principles of Good Alerting

- **Every alert must be actionable.** If an engineer cannot do anything when paged, the alert should not page them. Convert it to a dashboard metric or a low-priority ticket instead.
- **Alert on symptoms, not causes.** Alert when users are affected (high error rate, slow response times) rather than on internal system metrics (high CPU). High CPU that does not affect users is a monitoring data point, not an alert.
- **Use <Tooltip text="SLI" definition="Service Level Indicator - a quantitative measure of a specific aspect of service quality, such as availability, latency, or throughput." />-based alerting:** Define SLIs and <Tooltip text="SLOs" definition="Service Level Objectives — target values for a service's reliability metrics (e.g. 99.9% availability), set by the team based on user expectations." />, then alert when the <Tooltip text="error budget" definition="The acceptable amount of unreliability for a service, calculated as 100% minus the SLO target. When exhausted, the team shifts focus from features to reliability." /> is being consumed faster than expected (burn-rate alerting). This dramatically reduces noise.
- **Escalation Policies:** Define clear escalation paths. If the primary on-call does not acknowledge within N minutes, automatically escalate to the secondary, then to the engineering manager.

### Reducing Alert Noise

- Group related alerts into a single incident (e.g. 50 alerts about the same database outage should be one page, not fifty).
- Suppress known transient alerts during deployments or maintenance windows.
- Review alert volume monthly - any alert that fires more than once a week without action should be tuned or removed.

<PageBreak />

## Dashboards

Dashboards translate raw data into visual insight. They should answer questions at a glance without requiring deep investigation.

### Dashboard Best Practices

- **Tiered Dashboards:** Create a high-level overview dashboard (golden signals for all services), then detailed dashboards per service. Engineers should be able to drill down from "something is wrong" to "here is the specific failing component" in 2-3 clicks.
- **Business KPI Dashboards:** Alongside technical dashboards, create product dashboards showing sign-ups, activations, conversion rates, and revenue. These help the product and business teams understand system health in their terms.
- **Avoid Dashboard Overload:** More dashboards does not mean more insight. Curate a small set of high-signal dashboards rather than creating dozens that nobody checks. If a dashboard has no viewers, delete it.

## Observability Culture

Monitoring tools are only valuable if the team uses them. Build a culture of observability:

- **Make dashboards accessible:** Link them from your service catalogue, <Tooltip text="runbooks" definition="Step-by-step guides for responding to specific operational scenarios (e.g. database failover, high CPU alert, certificate expiry), designed so any on-call engineer can follow them." />, and incident channels.
- **Include monitoring in the definition of done:** A feature is not complete until it has appropriate metrics, logging, and alerting.
- **Democratise data:** Product managers, designers, and support teams should have access to dashboards relevant to their work - not just engineers.

## Closing the Loop: Feedback into Planning

The SDLC is a cycle, not a line. Monitoring and observability data should feed directly back into the [Planning and Design](./02-planning-and-design.md) phase:

- **Performance data** informs capacity planning and architecture decisions.
- **Error patterns** surface bugs and reliability issues to prioritise in the backlog.
- **User behaviour analytics** reveal which features are used, which are ignored, and where users struggle - guiding product roadmap decisions.
- **Incident <Tooltip text="postmortem" definition="A structured review after an incident that focuses on understanding systemic causes and improving processes — never on blaming individuals." /> action items** become engineering work items in the next planning cycle.

:::tip[The Virtuous Cycle]
The most effective engineering organisations treat the SDLC as a continuous learning loop. Every production insight - whether from monitoring, user feedback, or incident response - becomes an input to the next planning cycle. This is what transforms an engineering team from reactive firefighting to proactive product improvement.
:::

<PageBreak />

:::info[By Company Stage]
- **Startup:** Start with **basic uptime monitoring** ([BetterUptime](https://betteruptime.com/), [UptimeRobot](https://uptimerobot.com/)) and an error tracking service ([Sentry](https://sentry.io/), [Bugsnag](https://www.bugsnag.com/)). A single Grafana dashboard with key metrics is sufficient. Use product analytics ([Amplitude](https://amplitude.com/), [PostHog](https://posthog.com/), [Mixpanel](https://mixpanel.com/)) from day one to understand user behaviour - this is as important as technical monitoring at the startup stage.
- **Growth Stage:** Invest in a **full observability stack** (metrics + logs + traces). Implement <Tooltip text="SLO" definition="Service Level Objective — a target value for a service's reliability metric (e.g. 99.9% availability), set by the team based on user expectations." />-based alerting to reduce noise. Build product analytics into every feature launch. Create per-service dashboards. Dedicated on-call rotations use these dashboards as the first investigation step. Consider [Datadog](https://www.datadoghq.com/) or [Grafana Cloud](https://grafana.com/products/cloud/) for a managed solution.
- **Established:** Deploy **<Tooltip text="AIOps" definition="The application of AI and machine learning to IT operations - automating anomaly detection, alert correlation, root cause analysis, and remediation." /> platforms** ([Moogsoft](https://www.moogsoft.com/), [BigPanda](https://www.bigpanda.io/)) for automated anomaly detection and alert correlation. Custom instrumentation for business-specific metrics. Cross-team observability platforms with centralised governance. Regulatory and compliance logging (audit trails, data retention policies). Observability as a platform team function serving the entire engineering organisation.
:::

## Common Pitfalls

:::danger[Anti-patterns to Avoid]
- **Monitoring Everything:** Collecting every possible metric creates storage costs and dashboard clutter without improving insight. Be intentional about what you measure. If nobody looks at it, stop collecting it.
- **No Actionable Alerts:** Alerts that do not lead to action train the team to ignore alerts. Every alert should have a corresponding <Tooltip text="runbook" definition="A step-by-step guide for responding to specific operational scenarios, designed so any on-call engineer can follow it." /> entry or clear response procedure.
- **Dashboard Overload:** Creating a new dashboard for every question leads to dozens of stale, unmaintained dashboards. Curate dashboards actively.
- **Ignoring the Feedback Loop:** Collecting monitoring data but never feeding insights back into planning wastes the value of observability. Schedule regular reviews of production metrics with the product team.
:::

### Monitoring Key Deliverables

- Monitoring and Alerting Configuration (as code)
- Service Dashboards (golden signals per service)
- Business KPI Dashboards
- Alerting Rules and Escalation Policies
- Performance and Availability Reports

:::tip[How AI Can Help: Monitoring]
AI transforms raw data into actionable intelligence:

- **Anomaly Detection:** Tools like [Datadog](https://www.datadoghq.com/) and [Dynatrace](https://www.dynatrace.com/) use AI to automatically detect anomalies without setting manual thresholds.
- **Product and user analytics:** Tools like [Amplitude](https://amplitude.com/), [Heap](https://www.heap.io/), and [Mixpanel](https://mixpanel.com/) help observe user behavior and guide product decisions.
- **Log Analysis:** [Sumo Logic](https://www.sumologic.com/) and [Logz.io](https://logz.io/) use ML to cluster millions of log lines into patterns, helping find the "needle in the haystack."
- **Alert Fatigue:** AI helps group related alerts into a single incident, reducing noise for the on-call engineers. AIOps platforms such as [Moogsoft](https://www.moogsoft.com/) and [BigPanda](https://www.bigpanda.io/) support this.
:::
