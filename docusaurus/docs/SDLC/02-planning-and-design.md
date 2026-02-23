---
slug: /SDLC/planning-and-design
description: The planning and design phase of defining the scope, objectives, and feasibility of the project
sidebar_position: 2
---

# Planning and Design

> [Back to SDLC Intro](../SDLC/introduction)

The **Planning** and **Design** phases are the foundational pillars of the SDLC. Mistakes made here are often the most expensive to fix later in the cycle - studies consistently show that a defect found in production costs 10-100x more to resolve than one caught during requirements.

## Planning Phase

**Planning** involves defining the scope, objectives, and <Tooltip text="feasibility" definition="An assessment of whether a project is technically, economically, and legally realistic to deliver." /> of the project. It starts with requirement gathering - understanding exactly what the stakeholders need and, critically, **why** they need it.

### Requirement Gathering

Effective requirements come from multiple sources and techniques:

- **Stakeholder Interviews:** Direct conversations with business sponsors, end users, and subject matter experts to understand goals and constraints.
- **<Tooltip text="User Stories" definition="Short descriptions of a feature from the user's perspective, typically in the format: As a [role], I want [feature] so that [benefit]." />:** Lightweight requirement format that captures who needs what and why. Keep them small enough to deliver in a single sprint.
- **<Tooltip text="Jobs-to-be-Done (JTBD)" definition="A framework that focuses on the underlying job the customer is trying to accomplish, rather than the features they request." />:** A deeper framework that asks "what job is the customer hiring this product to do?" - useful for uncovering latent needs that users cannot articulate directly.
- **Competitive Analysis:** Understanding what alternatives exist and where your product must differentiate.

### Feasibility and Risk Assessment

- **<Tooltip text="Feasibility Study" definition="A structured analysis to determine if a proposed project is practical and worth pursuing." />:** Can we build it? Assess technical feasibility (do we have the skills and infrastructure?), economic feasibility (is the <Tooltip text="ROI" definition="Return on Investment - the amount of money gained or saved compared to the amount of money spent." /> justified?), and legal/regulatory feasibility (are there compliance constraints?).
- **Risk Assessment:** Identify the top risks early and assign owners. Common risk categories include technical complexity, third-party dependencies, resource availability, and market timing.

### Prioritisation Frameworks

Not everything can be built at once. Use a structured framework to decide what to build first:

- **<Tooltip text="MoSCoW" definition="A prioritisation method that categorises requirements as Must have, Should have, Could have, and Won't have (this time)." />:** Categorise requirements as Must / Should / Could / Won't. Simple and effective for initial scoping. [Read more here](https://www.productplan.com/glossary/moscow-prioritization/).
- **<Tooltip text="RICE" definition="A scoring model that ranks items by Reach, Impact, Confidence, and Effort to produce a prioritisation score." />:** Score each item by Reach, Impact, Confidence, and Effort. Produces a numerical priority score that is useful for comparing many items objectively. [Read more here](https://www.productplan.com/glossary/rice-scoring-model/).
- **Kano Model:** Classify features as basic expectations, performance differentiators, or delighters. Helps identify which features will drive satisfaction vs. which are table stakes. [Read more here](https://www.productplan.com/glossary/kano-model/).

### Estimation

- **T-shirt Sizing (S/M/L/XL):** Quick, relative sizing for roadmap-level planning. Useful in early discovery.
- **Story Points:** Relative complexity estimates used within sprints. Avoid converting points to hours - they measure complexity, not duration.
- **Planning Poker:** A team-based estimation technique that surfaces disagreement and drives shared understanding.

:::info[By Company Stage]
- **Startup:** Planning should be **lightweight and fast**. Use a <Tooltip text="Lean Canvas" definition="A one-page business model template adapted from the Business Model Canvas, focused on problems, solutions, key metrics, and unfair advantages." /> to validate the business case. Run week-long design sprints to test assumptions before committing to a build. The founder or CEO is often the Product Owner. Requirements come directly from customer conversations - not lengthy documents.
- **Growth Stage:** Introduce **formal Product Requirement Documents (PRDs)** and a shared product roadmap (tools like [Linear](https://linear.app/), [Productboard](https://www.productboard.com/), or [Jira](https://www.atlassian.com/software/jira)). Hire a dedicated Product Manager. Start using RICE or MoSCoW consistently to arbitrate between competing priorities. Quarterly planning cycles help balance discovery with delivery.
- **Established:** Implement **enterprise architecture review boards** and formal requirement sign-off processes. Cross-team dependency mapping becomes essential - use tools like [Jira Align](https://www.atlassian.com/software/jira/align) or program increment planning (<Tooltip text="SAFe" definition="Scaled Agile Framework - an enterprise framework for scaling Agile across large organisations with multiple teams and value streams." />). Compliance and regulatory requirements (GDPR, SOX, HIPAA) become first-class planning inputs. Budget for <Tooltip text="technical debt" definition="The accumulated cost of shortcuts, deferred maintenance, and sub-optimal decisions that slow future development." /> reduction alongside feature work.
:::

### Roadmap Planning

Roadmap planning is the process of defining the strategic direction of a software product over time. It lays out what the team intends to build, why it matters, and roughly when key initiatives will happen. Instead of detailing every task, a roadmap focuses on high‑level goals, major features, and expected outcomes.
A good roadmap helps teams:
- Align on priorities and long‑term vision
- Communicate plans clearly to stakeholders
- Make trade‑offs based on value, effort, and constraints
- Adapt to new information while keeping the product moving forward

:::danger[The Issue with Roadmaps]
Even with the best of intentions, product roadmaps typically lead to very poor business results. Most product ideas aren't going to work from lack of value, usability, feasibility or business viability. But roadmaps are needed in most businesses to give visiblity of what items are being worked on and of timing for the business to make plans around the product.

A roadmap is only as good as the team's ability to deliver on it. Often, roadmaps cause issues with people interpreting items on the roadmap as commitments and the roadmap loses credibility quickly when they are not delivered on. A better approach for building a roadmap is to prioritise business results, rather than product ideas and to introduce the concept of **high-integrity commitments**.
:::

### High-integrity commitments

 **High-integrity commitments** mean the organisation commits to fewer, clearer items and honours those commitments - or renegotiates explicitly when reality changes-instead of overcommitting and slipping silently.

**Practices that support high-integrity roadmaps:**

- **Scope commitments clearly:** For each committed item, define a bounded scope (e.g. "Search by date range" not "Improve search"). Avoid vague or moving targets.
- **Buffer for uncertainty:** Reserve capacity (e.g. 20–30%) for unknowns, bugs, and rework so committed work is achievable.
- **Renegotiate, don't hide:** When delivery is at risk, surface it early and adjust scope or date with stakeholders instead of letting dates slip without communication.
- **Separate commitments from bets:** Label which roadmap items are **commitments** (we will deliver) vs **bets** (we will try; we may learn and change direction). This reduces pressure to "commit" to exploratory work.

:::info[Example: Commitment vs bet]
- **Commitment:** "Q2: Ship new onboarding flow for signed-in users (defined flows in PRD)."
- **Bet:** "Q2: Explore and, if validated, ship a first version of in-app recommendations."
:::

:::warning[Common anti-pattern]
Loading the roadmap with "best case" dates and then slipping repeatedly erodes trust. Prefer fewer, well-scoped commitments and a clear process for renegotiation over an optimistic, crowded plan.
:::

### Outcome-based roadmaps and OKRs

An **outcome-based roadmap** focuses on the results you want (e.g. "Increase activation rate") rather than a fixed list of output features. <Tooltip text="OKR" definition="Objectives and Key Results: a goal-setting framework where Objectives are qualitative goals and Key Results are measurable outcomes that indicate success." /> (Objectives and Key Results) is a common way to define outcomes and align roadmap work to them.

- **Objective:** Qualitative, inspiring goal (e.g. "Make onboarding the best part of the product experience").
- **Key Results:** Measurable outcomes, typically 2–4 per Objective (e.g. "Increase day-1 completion rate from 40% to 65%," "Reduce time-to-first-value to under 2 minutes").

Roadmap initiatives and backlog items then link to Key Results so delivery is evaluated by outcome, not just by "feature shipped."

:::tip[Example OKR set]
- **Objective:** Improve retention in the first 30 days.
- **Key Results:**
  - KR1: Increase 7-day retention from 25% to 35%.
  - KR2: Increase 30-day retention from 12% to 18%.
  - KR3: Achieve NPS ≥ 40 for the "onboarding" flow.

Initiatives might include: redesigned onboarding, in-app tips, and email sequence-each tied to one or more KRs.
:::

:::info[By Company Stage]
- **Startup:** A single set of company or product OKRs (3–5 Objectives, 2–3 KRs each) is often enough; keep cycles short (e.g. quarterly).
- **Growth / Established:** Use cascaded OKRs (company → product area → team) so roadmap planning connects to strategic objectives. Review and score KRs at cycle end to inform the next roadmap.
:::

### Planning Key Deliverables

- <Tooltip text="Software Requirement Specification (SRS)" definition="A comprehensive document that describes the functional and non-functional requirements of the system to be built." /> or <Tooltip text="Product Requirement Document (PRD)" definition="Product Requirement Document - A document that describes the features and requirements of a product." />
- Project Plan / Roadmap
- Risk Register
- Prioritised Backlog

:::tip[How AI Can Help: Planning]
Global AI tools are streamlining the planning process:

- **Meeting Automation:** Tools can transcribe and summarize meetings such as the AI feature in [Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software), extracting action items automatically.
- **Agile Enhancements:** In <Tooltip text="Agile" definition="A set of principles (from the Agile Manifesto) that favour iterative delivery, collaboration, and responding to change over following a fixed plan." />, AI such as [Zenhub](https://www.zenhub.com/) analyzes historical data to predict sprint velocities and suggest optimal backlogs.
- **Planning Tools:** [Atlassian Jira](https://www.atlassian.com/software/jira) uses AI to help teams make data-driven decisions in planning, and can identify potential risks and bottlenecks.
- **Customer intelligence:** Tools like [Dovetail](https://dovetail.com/) centralize and analyze customer feedback and research to inform requirements and design.
:::

<PageBreak />

## Design Phase

Once requirements are clear, the **Design** phase translates them into a blueprint for construction. This includes both high-level architecture and low-level component design.

### System Architecture

- **Architecture Style:** Choose between <Tooltip text="Monolith" definition="A single, unified application where all features are deployed together." /> and <Tooltip text="Microservices" definition="An architectural style where a system is built from many small, independently deployable services." /> (or a modular monolith as a middle ground). Consider Cloud vs On-prem vs Hybrid.
- **<Tooltip text="Architecture Decision Records (ADRs)" definition="Short documents that capture an important architectural decision, its context, the options considered, and the rationale for the choice made." />:** Document every significant architectural decision with context, options considered, and rationale. These become invaluable for onboarding new engineers and revisiting past choices.
- **Trade-off Analysis:** Every design decision involves trade-offs (consistency vs. availability, simplicity vs. flexibility, build vs. buy). Make these explicit.

### API and Data Design

- **API Design:** Define contracts early using OpenAPI / Swagger specifications. Agree on versioning strategy (URL-based, header-based). Design APIs for the consumer, not the database.
- **Data Modelling:** Database schemas and data flow diagrams. Consider eventual consistency patterns for distributed systems. Plan for data migration from day one.

### UI/UX Design

- **<Tooltip text="Wireframes" definition="Simple, low-fidelity layouts that show the structure and flow of a screen without final styling." />** and Prototypes: Start low-fidelity to validate flows before investing in high-fidelity mockups.
- **Design Systems:** Establish reusable component libraries and design tokens to ensure consistency as the product and team grow.
- **User Research:** Validate designs with real users through usability testing, A/B testing, or prototype walkthroughs before committing to code.

### Technical Debt Budgeting

No design is perfect. Explicitly allocate capacity for <Tooltip text="technical debt" definition="The accumulated cost of shortcuts, deferred maintenance, and sub-optimal decisions that slow future development." /> - a common rule of thumb is 15-20% of engineering capacity dedicated to debt reduction and platform improvements each quarter.

:::info[By Company Stage]
- **Startup:** Design for **speed of iteration**, not perfection. A <Tooltip text="monolith" definition="A single, unified application where all features are deployed together." /> is almost always the right starting architecture - it reduces operational complexity and lets you move fast. Use design sprints and rapid prototyping. Skip the design system initially but maintain basic consistency.
- **Growth Stage:** Introduce a **formal design system** (e.g. a shared Figma library and component kit). Start writing <Tooltip text="ADRs" definition="Architecture Decision Records - short documents that capture significant technical decisions, their context, and rationale." /> for significant decisions. Consider breaking out the first <Tooltip text="microservice" definition="A small, independently deployable service that is part of a larger system, communicating with other services via APIs." /> only when a genuine scaling bottleneck emerges - not before. Hire a dedicated UX designer.
- **Established:** Maintain a **centralised architecture team** or guild that reviews designs for consistency, security, and scalability. Use formal threat modelling (STRIDE) during design. Invest in enterprise-grade design systems shared across products. Run architecture fitness functions to ensure designs stay compliant over time.
:::

### Design Key Deliverables

- Design Document (High-Level and Low-Level)
- Architecture Decision Records (ADRs)
- Database Schema
- API Specifications
- UI Mockups / Prototypes

<PageBreak />

## Common Pitfalls

:::danger[Anti-patterns to Avoid]
- **Analysis Paralysis:** Spending months refining requirements before writing any code. Timebox discovery and get feedback through working software instead.
- **Over-Engineering:** Designing for problems you do not have yet. Build for today's known requirements with extension points for likely future needs - not speculative ones.
- **Skipping UX Research:** Assuming you know what users want without talking to them. Even five user interviews can surface critical insights.
- **Ignoring Non-Functional Requirements:** Performance, security, accessibility, and scalability requirements must be captured alongside features - not bolted on later.
:::

:::tip[How AI Can Help: Design]
AI is accelerating the transition from concept to blueprint:

- **Generative UI:** AI can generate initial UI/UX mockups from text requirements (e.g., [Figma](https://www.figma.com/) with WireGen or [Lovable](https://lovable.dev/)). Designers can also iterate quickly through design variations using AI-generated designs.
- **Architectural Advice:** AI tools can analyze requirements to suggest optimal system architectures and even creates preliminary code structures (e.g. [Claude Code](https://www.anthropic.com/claude-code)).
- **Documentation Analysis:** AI can analyze voice transcripts or lengthy discussions on platforms like [Harness](https://harness.io/) or [Bitbucket](https://bitbucket.org/) to extract key design decisions.
- **Security Design:** AI can analyze system designs to identify potential security risks and suggest mitigations.
:::

:::info[Case Study: AI in Planning and Design]
One startup tooling stack was as follows:
- [Figma](https://www.figma.com/) for designs, which works nicely with [Linear](https://linear.app/). The company has 5 devs and one UX designer.
- [Linear](https://linear.app/) for ticketing and collaborating across UX and development. The UX person creates [Linear tickets](https://linear.app/tickets) alongside her [Figma designs](https://www.figma.com/designs).
- [Claude Code](https://www.anthropic.com/claude-code) and [Cursor](https://www.cursor.com/) for development, connected to [Linear](https://linear.app/) via <Tooltip text="MCP" definition="Model Context Protocol: a standard for connecting AI models to external tools and data sources." />.
- [Claude Code](https://www.anthropic.com/claude-code) writes tickets: a recent change which is working nicely with [CodeRabbit](https://www.coderabbit.ai/), as more context is passed downstream for AI code review.
> <a href="https://newsletter.pragmaticengineer.com/p/measuring-ai-dev-tools#:~:text=Figma%20for%20designs%2C%20which%20works%20nicely%20with%20Linear" target="_blank">Source: The Pragmatic Engineer</a> 
:::
