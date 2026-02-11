---
slug: /SDLC/monitor
description: The final phase, monitoring and observability when the software is running in production
sidebar_position: 9
---

# Monitoring and Observability

> [Back to SDLC Intro](../SDLC/introduction)

**Monitoring** is the process of collecting, analyzing, and using information to track applications and infrastructure in order to guide business decisions. **<Tooltip text="Observability" definition="How well you can understand the internal state of a system based only on its outputs such as metrics, logs, and traces." />** is the measure of how well internal states of a system can be inferred from knowledge of its external outputs.

## The Three Pillars of Monitoring {#the-three-pillars}

A robust monitoring strategy typically relies on three pillars:

1.  **Metrics:** Numerical data measured over time (e.g., CPU usage, Request Latency). <Tooltip text="Metrics" definition="Time-series measurements, such as request rate or error rate, that help you see trends and patterns." />
2.  **Logs:** discrete events that happened (e.g., "Error: Connection failed at 10:00 PM").
3.  **Traces:** The path of a request through a distributed system.

### Monitoring Key Deliverables

- Dashboards
- Alerting Rules
- Performance Reports

:::tip[How AI Can Help: Monitoring]
AI transforms raw data into actionable intelligence:

- **Anomaly Detection:** Tools like [Datadog](https://www.datadoghq.com/) and [Dynatrace](https://www.dynatrace.com/) use AI to automatically detect anomalies without setting manual thresholds.
- **Product and user analytics:** Tools like [Amplitude](https://amplitude.com/), [Heap](https://www.heap.io/), and [Mixpanel](https://mixpanel.com/) help observe user behavior and guide product decisions.
- **Log Analysis:** [Sumo Logic](https://www.sumologic.com/) and [Logz.io](https://logz.io/) use ML to cluster millions of log lines into patterns, helping find the "needle in the haystack."
- **Alert Fatigue:** AI helps group related alerts into a single incident, reducing noise for the on-call engineers. AIOps platforms such as [Moogsoft](https://www.moogsoft.com/) and [BigPanda](https://www.bigpanda.io/) support this.
  :::
