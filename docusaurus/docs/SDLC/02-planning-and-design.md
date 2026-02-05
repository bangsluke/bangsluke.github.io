---
slug: /SDLC/planning-and-design
description: The planning and design phase of defining the scope, objectives, and feasibility of the project
sidebar_position: 2
---

# Planning and Design

> [Back to SDLC Intro](../SDLC/introduction)

The **Planning** and **Design** phases are the foundational pillars of the SDLC. Mistakes made here are often the most expensive to fix later in the cycle.

## Planning Phase

**Planning** involves defining the scope, objectives, and <Tooltip text="feasibility" definition="An assessment of whether a project is technically, economically, and legally realistic to deliver." /> of the project. It starts with requirement gathering - understanding exactly what the stakeholders need.

- **<Tooltip text="Feasibility Study" definition="A structured analysis to determine if a proposed project is practical and worth pursuing." />:** Can we build it? (e.g. technical, economic, legal checks).
- **Requirement Analysis:** Detailed breakdown of features (functional and non-functional).
- **Project Scheduling:** Estimating timelines, resources, and costs (often using Agile methodologies).

### Planning Key Deliverables

- Software Requirement Specification (SRS)
- Project Plan / Roadmap
- Risk Management Plan

:::tip[How AI Can Help: Planning]
Global AI tools are streamlining the planning process:

- **Meeting Automation:** Tools can transcribe and summarize meetings such as the AI feature in [Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software), extracting action items automatically.
- **Agile Enhancements:** In Agile, AI such as [Zenhub](https://www.zenhub.com/) analyzes historical data to predict sprint velocities and suggest optimal backlogs.
- **Tool Spotlight:** [Atlassian Jira](https://www.atlassian.com/software/jira) uses AI to help teams make data-driven decisions in planning.
  :::

<PageBreak />

## Design Phase

Once requirements are clear, the **Design** phase translates them into a blueprint for construction. This includes both high-level architecture and low-level component design.

- **System Architecture:** Defining the high-level structure (<Tooltip text="Monolith" definition="A single, unified application where all features are deployed together." /> vs <Tooltip text="Microservices" definition="An architectural style where a system is built from many small, independently deployable services." />, Cloud vs On-prem).
- **Data Design:** Database schemas and data flow diagrams.
- **UI/UX Design:** <Tooltip text="Wireframes" definition="Simple, low-fidelity layouts that show the structure and flow of a screen without final styling." />, mockups, and prototypes for the user interface.

### Design Key Deliverables

- Design Document (High-Level and Low-Level)
- Database Schema
- UI Mockups/Prototypes

:::tip[How AI Can Help: Design]
AI is accelerating the transition from concept to blueprint:

- **Generative UI:** AI can generate initial UI/UX mockups from text requirements (e.g., [Figma](https://www.figma.com/) with WireGen or [Lovable](https://lovable.dev/)).
- **Architectural Advice:** AI tools can analyze requirements to suggest optimal system architectures and even creates preliminary code structures (e.g. [Claude Code](https://www.anthropic.com/claude-code)).
- **Documentation Analysis:** AI can analyze voice transcripts or lengthy discussions on platforms like [Harness](https://harness.io/) or [Bitbucket](https://bitbucket.org/) to extract key design decisions.
  :::

:::info[Case Study: AI in Planning and Design]
One startup tooling stack was as follows:
- Figma for designs, which works nicely with Linear. The company has 5 devs and one UX designer.
- Linear for ticketing and collaborating across UX and development. The UX person creates Linear tickets alongside her Figma designs.
- Claude Code and Cursor for development, connected to Linear via MCP.
- Claude Code writes tickets: a recent change which is working nicely with CodeRabbit, as more context is passed downstream for AI code review.
> <a href="https://newsletter.pragmaticengineer.com/p/measuring-ai-dev-tools#:~:text=Figma%20for%20designs%2C%20which%20works%20nicely%20with%20Linear" target="_blank">Source: The Pragmatic Engineer</a> 
:::
