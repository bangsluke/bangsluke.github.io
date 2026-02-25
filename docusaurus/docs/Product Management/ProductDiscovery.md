---
sidebar_position: 3
slug: /product-management/product-discovery
description: Best practices and techniques for product discovery using modern Product Owner techniques
---

# Product Discovery

> [Back to Product Management Intro](../product-management/product-management-intro)

**<Tooltip text="Product discovery" definition="The process of deciding what to build before development: uncovering needs, validating solutions, and testing assumptions with minimal cost so teams ship the right product." />** is the process of uncovering unmet customer needs and validating what to build before committing engineering resources. It reduces the risk of building the wrong thing by testing ideas cheaply through user research and experimentation.

## What is Product Discovery?

The purpose of product discovery is to address four critical risks before you invest in building:

| Question | Risk | Purpose |
|----------|----------|---------|
| Will the customer buy this, or choose to use it? | Value risk | Validate that the problem is worth solving. |
| Can the user figure out how to use it? | Usability risk | Test that your approach is usable. |
| Can we build it? | Feasibility risk | Confirm feasibility and scope. |
| Does this solution work for our business? | Business viability risk | Ensure alignment with strategy and viability. |

And it's not enough to just to have an opinion on these questions, we need to collect evidence.

:::info
On occassions, there is a fifth risk: ethics - where a team should also consider the question "*Should* we build it?". We need to avoid building solutions that will cause harm on certain users or the environment.
:::

Discovery is not a one-off phase-effective teams treat it as <Tooltip text="continuous discovery" definition="A practice of having at least weekly customer touchpoints, with the product team running small research activities in pursuit of a desired outcome (Teresa Torres)." />, running small research activities alongside delivery so that future work is informed by evidence.

> More information can be found on page 165 of Marty Cagan's book "[Inspired (How to Create Products Customers Love)](../product-management/research#inspired-how-to-create-products-customers-love)".

<PageBreak />

## Best practices

- **Run discovery continuously** - Integrate discovery with delivery: spend 1–3 hours per week on customer touchpoints (interviews, surveys, prototype tests) while the team builds. This keeps the backlog informed by real needs instead of opinions.
- **Test the riskiest assumptions first** - Use <Tooltip text="assumption mapping" definition="Making your riskiest assumptions explicit and testing them with minimal experiments (e.g. interviews, landing pages, prototypes) before full product development." /> to list assumptions and prioritise by impact and uncertainty. Run the cheapest experiment that could invalidate each assumption.
- **Combine quantitative and qualitative data** - Use metrics (usage, conversion, retention) to spot patterns and prioritise where to dig. Use interviews and feedback to understand the "why" behind behaviour. Neither alone is enough for good decisions.
- **Use design partners early** - A <Tooltip text="design partner" definition="An early customer who co-shapes the product through close collaboration; valuable for feedback, but over-indexing on one segment can skew the product." /> can accelerate learning when you have a small set of target users. Choose partners who represent your intended segment and avoid letting a single voice dominate.
- **Use structured frameworks** - Frameworks like the <Tooltip text="opportunity solution tree (OST)" definition="A visual framework (Teresa Torres) with four levels: desired outcome, opportunities (customer needs), solutions (ideas), and assumption tests-connecting daily discovery work to business outcomes." /> keep discovery aligned to outcomes and make it clear how solutions map to opportunities and how experiments map to solutions.

:::tip[Example: OST in practice]
Start with one desired outcome (e.g. "Increase activation in first 7 days"). From customer interviews, identify opportunities (e.g. "Users don't understand the value in the first session"). Brainstorm multiple solutions per opportunity, then define the smallest assumption test for each solution before building.
:::

## Discovery Techniques

The below sections cover the different techniques that can be used to frame, plan, ideate and test during the discovery process.

### Framing Techniques

Framing techniques help us quickly identify the underlying issues that must be tackled during the discovery process. We need to clarify the underlying problem to be solved and tease out risks to determine where best to spend our time.

There are really two goals to framing:

1. Ensure that the team is on the same page about the problem to be solved, agreeing on the business objective we're focusing on, the specific problem we're intending to solve for customers, which customers are we intending to solve it for, and the success criteria for the solution.
2. To identify the big risks (financial, technical, legal, etc.) that will need to be tackled during the discovery process.

> More information can be found on page 175 of Marty Cagan's book "[Inspired](../product-management/research#inspired-how-to-create-products-customers-love)".

Three useful framing techniques are:

1. **Opportunity Assessment** - Used for the vast majority of product work, rangeing from simple optimisation, to a feature to a medium sized project.
2. **Customer Letter** - Designed for larger projects or initiatives.
3. **Startup Canvas** - For times when you're creating an entirely new product line or new business.

:::tip[Framing Techniques]
#### Opportunity Assessment

A simple technique with the key being to answer four questions:
1. What business objective is this work intended to address? (*Objective*)
2. How will you know if you've succeeded? (*Key Results*)
3. What problem will this solve for our customers? (*Customer Problem*)
4. What type of customer are we focused on? (*Target Market*)

<PageBreak />

#### Customer Letter Technique

When embarking on larger efforts, there may in fact be multiple reasons, several customer problems to be solved or business objectives to be addressed. For this, it may take more than the four questions of the Opportunity Assessment to fully frame the work.

Marty Cagan describes a technique where the product team writes a hypothetical letter to the CEO from a very happy and impressed customer, explaining how the customer is using the product and the benefits they are getting from it and how it has changed their business. The letter also includes an imagined congratulary response from the CEO to the engineering team for delivering the solution.

This technique creates empathy for the customer and the problem they are solving, and more clearly emphasizes to the team how their efforts can help the lives of the customers they are serving.

<PageBreak />

#### Startup Canvas Technique

For situations where you're creating an entirely new product line or new business, the Startup Canvas is a useful technique to help frame the work. A startup canvas is close cousin to the Business Model Canvas, but it is specifically designed for startups and early stage businesses. Creating a canvas helps quickly highlight the key assumptions and major risks facing a startup or a significant new product in an existing business. This is a good thing - the idea is to tackle the biggest risks first.
:::

### Planning Techniques

These are techniques to help with identifying the bigger challenges and planning how to attack this work. For complicated product efforts, it often helps to have some way to scope out and plan your discovery efforts.

> More information can be found on page 191 of Marty Cagan's book "[Inspired](../product-management/research#inspired-how-to-create-products-customers-love)".

Two techniques are:

1. **Story Maps** - Generally useful technique. Major user activities are arrayed on a board along the horizontal axis, loosely ordered by time from left to right. Along the vertical dimension we go into more detail by breaking down the user activity into smaller user tasks and add stories per task, with critical tasks higher than the optional tasks. This allows you to get a holistic view of the of the system and plan workloads.
2. **Customer Discovery Program Technique** - A very powerful but time costly approach. The approach is to gather <Tooltip text="reference customers" definition="A real customer who is using your tool in production, has paid real money for the product and is willing to tell others about how much they love your product." /> (at least six is best) who feel strongly about your product and are willing to help you build it. The benefit to them is that they get real input to the solution, and the benefit to the product team is that they get a chance to test the solution with real users. Then work with these customers, bouncing possible solutions off them and getting their feedback on the solutions. Read much more information on page 195 of Marty Cagan's book "[Inspired](../product-management/research#inspired-how-to-create-products-customers-love)".

<PageBreak />

### Ideation Techniques

Ideation techniques are designed to provide the product team with a wealth of promising solutions to the problems we're focused on. Although if in general, the product team is given actual business problems to solve rather than solutions, and the product team does their job well and interacts directly and frequently with the users and customers, then typically getting sufficient quantity and quality of solutions is not a problem.

> More information can be found on page 208 of Marty Cagan's book "[Inspired](../product-management/research#inspired-how-to-create-products-customers-love)".

Four techniques described here are:

1. **Customer Interviews** - There are many forms of customer interviews - but the key is to ensure that the product manager, product designer and at least one developer are involved to get the benefit of the full learning. Key things: Establish regular cadence of interviews, ensure the customer is in your target market, go to the customers location if possible, ask open ended questions, and be prepared to ask follow up questions.
2. **Concierge Test Technique** - This involves doing the job that the customer is doing, doing the tasks they have to do to understand the problem they are trying to solve, and then bouncing possible solutions off them and getting their feedback on the solutions. They may need to initially train you on how to do the job and it is most valuable when the product manager, designer and developer are all involved.
3. **The Power of Customer Misbehavior** - This involves allowing or even encouraging the customer to use our product in a way that is not the way it is intended to be used, and then observing and learning from the customer's behavior to evaluate opportunities for improvement.
4. **Hack Days** - The two main types are directed and undirected. Directed hack days are where the product team is given a specific customer problem to solve and undirected hack days are where the product team is given free reign to explore whatever product related ideas they have. HJack days typically are effective at creating ideation amongst the engineering team by inclusion and builds cultural missonary mindsets amongst employees.

<PageBreak />

### Prototyping Techniques

Prototyping techniques are used to create a working model of a solution to test with users in a variety of forms - to learn something at a much lower cost than building the full solution.

TBC

> More information can be found on page 223 of Marty Cagan's book "[Inspired](../product-management/research#inspired-how-to-create-products-customers-love)".

<PageBreak />

### Testing Techniques

Testing techniques are used to validate the assumptions we've made about the problem to be solved and the solutions we've proposed.

> More information can be found on page 241 of Marty Cagan's book "[Inspired](../product-management/research#inspired-how-to-create-products-customers-love)".

#### Testing Feasibility

TBC

#### Testing Usability

TBC

#### Testing Value

TBC

#### Testing Business Viability

TBC



<PageBreak />

### Techniques Summary

| Technique | Purpose | When to use |
|-----------|---------|-------------|
| **User interviews** | Uncover needs, pain points, and context. | Generative discovery; understanding "why". |
| **Assumption testing** | Validate or invalidate specific beliefs. | Before building; evaluating solutions. |
| **Opportunity solution tree** | Map outcomes → opportunities → solutions → tests. | Aligning the team and prioritising experiments. |
| **Discovery sprints** | Time-boxed cycles to test a hypothesis. | When you need a fast yes/no on an idea. |
| **Jobs-to-be-Done (JTBD)** | Focus on the "job" the user is hiring the product to do. | Uncovering latent needs users may not articulate. |
| **Prototype testing** | Test flows or concepts with minimal build. | When you need behavioural feedback on a solution. |

For more on <Tooltip text="Jobs-to-be-Done (JTBD)" definition="A framework that focuses on the underlying job the customer is trying to accomplish, rather than the features they request." /> in planning, see [Planning and Design](/docs/SDLC/planning-and-design#planning-phase).

:::tip[AI Discovery]
Given that users are now frequently asking AI agents such as ChatGPT, Gemini and Claude about your product, it is increasingly important to also analyse the questions that users are asking AI, and also as important to review what the chatbot is telling users about your product which can help identify gaps in the information AI agents can obtain about your product.
:::

<PageBreak />

## Discovery by company stage

:::info[Startup]
- **Speed over process:** Discovery is fast and informal-sketch Monday, test Wednesday, ship by Friday. The founder or product lead often runs customer conversations directly.
- **Lightweight tools:** Spreadsheets, calls, and simple prototypes are enough. Avoid heavy tooling until the team grows.
- **Design partners:** One or two design partners can shape the product; ensure they represent your target segment so you don't over-optimise for a niche.
:::

:::info[Growing company]
- **Formalise cadence:** Introduce a regular discovery rhythm (e.g. weekly interviews, bi-weekly synthesis) and a dedicated PM or product trio (PM, design, engineering).
- **Structured frameworks:** Use opportunity solution trees and assumption mapping so discovery ties to outcomes and roadmaps.
- **Tooling:** Adopt a feedback repository (e.g. Dovetail) and a product backlog tool (e.g. Productboard) to scale insight capture and prioritisation.
:::

:::info[Enterprise]
- **Many stakeholders:** Discovery must account for buyers, compliance, security, and legal-not just end users. Expect 1–2 months for key product decisions and multiple approval steps.
- **Risk and compliance:** Assumption tests may need to include security reviews, legal sign-off, or pilot agreements. Plan for longer experiment cycles.
- **Coordination:** Align discovery across teams with shared outcomes and a central place for insights so learning is reused.
:::

<PageBreak />

## Example Discovery Tools

| Purpose | Tool | Notes |
|---------|------|-------|
| Product discovery & feedback | [Productboard](https://www.productboard.com/) | Consolidate feedback, prioritise, and connect to roadmaps. |
| Mapping & workshops | [Miro](https://miro.com/) | Collaborative boards for opportunity solution trees and discovery workshops. |
| User research (video) | [UserTesting](https://www.usertesting.com/) | Video-based human insight; strong for moderated interviews and usability tests. |
| Prototype & survey testing | [Maze](https://maze.co/) | Unmoderated prototype testing, surveys, and card sorting; AI-assisted analysis. |
| Research repository & analysis | [Dovetail](https://dovetail.com/) | Store interviews, surveys, and support data; analyse and share insights. |
| Frameworks & learning | [Product Talk](https://www.producttalk.org/) | Teresa Torres's site; opportunity solution trees, continuous discovery habits, and guides. |

:::tip[Choosing tools]
At startup, start with calls and a shared doc. Add Productboard or Dovetail as feedback volume grows. Use Miro (or similar) once you run discovery workshops with multiple stakeholders. Enterprise teams often need all of the above plus integration with Jira, Intercom, or Zendesk.
:::
