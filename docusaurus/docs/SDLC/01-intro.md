---
slug: /SDLC/introduction
description: Introduction to Software Development Life Cycle
sidebar_position: 1
---

# Introduction to Software Development Life Cycle

> [Back to Documentation Intro Contents](../DocumentationIntro.md)

The **<Tooltip text="Software Development Life Cycle (SDLC)" definition="A structured process that defines how software is planned, built, tested, and maintained." />** is a structured methodology used by the software industry to design, develop, and test high-quality software within time and cost estimates. Whether you are a two-person startup shipping an <Tooltip text="MVP" definition="Minimum Viable Product - the smallest version of a product that can be released to validate a hypothesis with real users." /> or a 5,000-engineer enterprise coordinating dozens of teams, the SDLC provides a shared language and framework for turning ideas into reliable software.

:::tip[Why a Structured Process Matters]
Without a defined lifecycle, teams fall into common traps: requirements drift mid-build, untested code reaches users, deployments break production, and nobody knows who owns what. The SDLC does not have to be heavyweight - it simply needs to be **intentional**. The right amount of process depends on your team size, risk tolerance, and regulatory environment.
:::

## The Phases

The classical SDLC typically follows a series of distinct phases. Each phase relies on the information from the previous phase to produce its own deliverables.

<div align="center">
<img src="https://i.postimg.cc/qvtK0zqx/Dev-Sec-Ops.png" alt="Dev-Sec-Ops" style={{ width: "90vw", height: "auto" }} />
</div>

<br />

1.  **[Planning and Design](./02-planning-and-design.md):** Gathering requirements and architecting the solution.
2.  **[Code](./03-code.md):** The actionable part where developers write the software.
3.  **[Verify](./04-verify.md):** Testing the software to ensure it solves the problem and is bug-free.
4.  **[Integrate](./05-integrate.md):** Combining modules and managing dependencies.
5.  **[Release](./06-release.md):** Packaging and preparing the software for delivery.
6.  **[Deploy](./07-deploy.md):** Moving the software to production environments.
7.  **[Operate](./08-operate.md):** Running the software in the real world.
8.  **[Monitor](./09-monitor.md):** Observing system health and user behavior.

<PageBreak />

## SDLC Models

There is no single "correct" way to move through these phases. Over the decades, several models have emerged - each optimising for different constraints.

### Waterfall

The original sequential <Tooltip text="Waterfall" definition="A linear, phase-gated development model where each phase (requirements, design, build, test, deploy) must complete fully before the next begins." /> model: requirements first, then design, then build, then test, then deploy. Each phase completes fully before the next begins.

- **Strengths:** Clear milestones, easy to understand, well-suited to projects with fixed and well-understood requirements.
- **Weaknesses:** Late feedback, expensive to change direction, high risk of building the wrong thing.

### Agile (Scrum and Kanban)

<Tooltip text="Agile" definition="A set of principles (from the Agile Manifesto) that favour iterative delivery, collaboration, and responding to change over following a fixed plan." /> methods break work into small increments delivered in short cycles.

- **<Tooltip text="Scrum" definition="An Agile framework using fixed-length sprints (typically 2 weeks), defined roles (Product Owner, Scrum Master, Developers), and ceremonies (stand-ups, retrospectives)." />:** Time-boxed sprints with defined roles and ceremonies. Best when teams need predictable cadence and clear accountability.
- **<Tooltip text="Kanban" definition="A visual workflow method that limits work-in-progress and focuses on continuous flow rather than fixed iterations." />:** Continuous flow with WIP limits. Best when work is interrupt-driven or arrival rates are unpredictable (e.g. support teams, platform teams).

### Lean

Inspired by manufacturing, <Tooltip text="Lean" definition="A methodology focused on eliminating waste, delivering fast, and amplifying learning - originally from the Toyota Production System." /> focuses on eliminating waste, delivering fast, and amplifying learning. Build only what is validated by the customer. Lean thinking underpins both Agile and modern startup methodology.

### DevOps and CI/CD

<Tooltip text="DevOps" definition="A set of practices that combines software development (Dev) and IT operations (Ops) to shorten delivery cycles and improve reliability." /> is not a separate model but a cultural and technical layer that accelerates any model. By automating integration, testing, and deployment (<Tooltip text="CI/CD" definition="Continuous Integration / Continuous Delivery - the practice of automatically building, testing, and preparing code for release on every change." />), teams can deliver changes in minutes rather than months.

### Scaled Frameworks

When multiple teams must coordinate, organisations often adopt scaled approaches:

- **<Tooltip text="SAFe" definition="Scaled Agile Framework - an enterprise framework for scaling Agile across large organisations with multiple teams and value streams." />**: Heavy structure for large enterprises with program increments and release trains. [Read more here](https://framework.scaledagile.com/#big-picture).
- **[Spotify Model](https://www.atlassian.com/agile/agile-at-scale/spotify):** Autonomous squads grouped into tribes, chapters, and guilds.
- **[LeSS](https://www.atlassian.com/agile/agile-at-scale/less) / [Nexus](https://www.scrum.org/resources/nexus-guide):** Lighter-weight scaling of Scrum to multiple teams.

<PageBreak />

## Choosing the Right Model for Your Company Stage

The "best" model is the one your team can actually follow consistently. As a company grows, its process needs evolve.

:::info[By Company Stage]
- **Startup:** Start with **Kanban or lightweight Scrum**. You need speed and flexibility above all else. Avoid heavy ceremony - a simple backlog, weekly planning, and continuous deploys will serve you well. The founder or product lead often acts as the Product Owner directly. Focus on validated learning and rapid iteration toward <Tooltip text="product-market fit" definition="The point at which a product satisfies strong market demand, evidenced by organic growth and retention." />.
- **Growth Stage:** As the team grows past 8-15 engineers, introduce **Scrum with 2-week sprints** or a structured Kanban with explicit policies. Define clear roles (Product Manager, Tech Lead, <Tooltip text="QA" definition="Quality Assurance - A role responsible for ensuring the quality of software products by designing, developing, and executing tests to validate functionality, identify defects, and ensure compliance with requirements." />). Invest in <Tooltip text="CI/CD" definition="Continuous Integration / Continuous Delivery — the practice of automatically building, testing, and preparing code for release on every change." /> and automated testing to maintain velocity as complexity increases. Start formalising cross-team planning with quarterly roadmaps.
- **Established:** At scale (50+ engineers, multiple teams), adopt a **scaled framework** (SAFe, LeSS, or a custom approach). Introduce architecture review boards, formal release management, and compliance gates. The key challenge shifts from speed-to-market to **coordination, reliability, and governance** - while still preserving team autonomy where possible.
:::

:::warning[Startup Pitfall]
Adopting SAFe or heavy Scrum ceremonies at a 5-person startup adds overhead without value. Conversely, running a 200-engineer organisation on ad-hoc Kanban with no cross-team coordination will lead to chaos. Match the weight of your process to the weight of your organisation.
:::

<PageBreak />

## Key Principles for SDLC Success

Regardless of which model you choose, these principles apply universally:

1. **Iterative Delivery:** Ship small increments frequently. Shorter feedback loops reduce risk and accelerate learning.
2. **<Tooltip text="Shift Left" definition="Moving quality activities (testing, security, accessibility) earlier in the development lifecycle where defects are cheaper and faster to fix." />:** Move quality activities (testing, security, accessibility) earlier in the lifecycle where they are cheaper to address.
3. **Continuous Feedback:** Build feedback mechanisms at every stage - from user research in planning, to code review in development, to monitoring in production.
4. **Ownership and Accountability:** Every phase needs a clear owner. Ambiguous ownership is the root cause of most process failures.
5. **Automate the Repetitive:** Manual gates slow teams down and introduce human error. Automate builds, tests, deployments, and compliance checks.
6. **Measure What Matters:** Use <Tooltip text="DORA metrics" definition="Four key metrics identified by the DORA (DevOps Research and Assessment) team: deployment frequency, lead time for changes, change failure rate, and time to restore service." /> (deployment frequency, lead time, change failure rate, mean time to restore) to track process health - not developer activity.

<PageBreak />

## The Evolution to AI

While the core principles of SDLC remain constant, the tools and methodologies are evolving. Generative AI is now enhancing each of these stages, offering not just automation but <Tooltip text="augmentation" definition="Using AI to extend and enhance human capabilities rather than replace them." /> of human capabilities.

:::tip[How AI Can Help]
Generative AI is revolutionizing the SDLC by:

- **Reducing Overhead:** Automating documentation and repetitive tasks.
- **Predicting Issues:** Using historical data to foresee risks in planning or deployment.
- **Accelerating Creation:** Generating code, tests, and configurations near-instantly.
:::

:::info
One issue that software teams often face is questions over the positive impact of AI tools. [Jellyfish](https://jellyfish.co/) helps provide productivity insights and usage data to help teams understand the impact of AI tools.
:::

:::tip
When developing AI-driven technologies, it is often best to follow an iterative development process, cycling through the SDLC phases multiple times before entering the maintenance phase, helping fully refine the technology to real world use cases.
:::

:::note[Sources Used]
- [AWS - The Role of Generative AI in Software Development](https://drive.google.com/file/d/1u9jnjEW-PBaq70Ulp0gvbRHh6wqzwJTl/view?usp=drive_link)
:::
