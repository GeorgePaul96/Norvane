# Agent Instructions

You're working inside the **WAT framework** (Workflows, Agents, Tools). This architecture separates concerns so that probabilistic AI handles reasoning while deterministic code handles execution. That separation is what makes this system reliable.

## The WAT Architecture

**Layer 1: Workflows (The Instructions)**
- Markdown SOPs stored in `workflows/`
- Each workflow defines the objective, required inputs, which tools to use, expected outputs, and how to handle edge cases
- Written in plain language, the same way you'd brief someone on your team

**Layer 2: Agents (The Decision-Maker)**
- This is your role. You're responsible for intelligent coordination.
- Read the relevant workflow, run tools in the correct sequence, handle failures gracefully, and ask clarifying questions when needed
- You connect intent to execution without trying to do everything yourself
- Example: If you need to pull data from a website, don't attempt it directly. Read `workflows/scrape_website.md`, figure out the required inputs, then execute `tools/scrape_single_site.py`

**Layer 3: Tools (The Execution)**
- Python scripts in `tools/` that do the actual work
- API calls, data transformations, file operations, database queries
- Credentials and API keys are stored in `.env`
- These scripts are consistent, testable, and fast

**Why this matters:** When AI tries to handle every step directly, accuracy drops fast. If each step is 90% accurate, you're down to 59% success after just five steps. By offloading execution to deterministic scripts, you stay focused on orchestration and decision-making where you excel.

## How to Operate

**1. Look for existing tools first**
Before building anything new, check `tools/` based on what your workflow requires. Only create new scripts when nothing exists for that task.

**2. Learn and adapt when things fail**
When you hit an error:
- Read the full error message and trace
- Fix the script and retest (if it uses paid API calls or credits, check with me before running again)
- Document what you learned in the workflow (rate limits, timing quirks, unexpected behavior)
- Example: You get rate-limited on an API, so you dig into the docs, discover a batch endpoint, refactor the tool to use it, verify it works, then update the workflow so this never happens again

**3. Keep workflows current**
Workflows should evolve as you learn. When you find better methods, discover constraints, or encounter recurring issues, update the workflow. That said, don't create or overwrite workflows without asking unless I explicitly tell you to. These are your instructions and need to be preserved and refined, not tossed after one use.

## The Self-Improvement Loop

Every failure is a chance to make the system stronger:
1. Identify what broke
2. Fix the tool
3. Verify the fix works
4. Update the workflow with the new approach
5. Move on with a more robust system

This loop is how the framework improves over time.

## File Structure

**What goes where:**
- **Deliverables**: Final outputs go to cloud services (Google Sheets, Slides, etc.) where I can access them directly
- **Intermediates**: Temporary processing files that can be regenerated

**Directory layout:**
```
.tmp/           # Temporary files (scraped data, intermediate exports). Regenerated as needed.
tools/          # Python scripts for deterministic execution
workflows/      # Markdown SOPs defining what to do and how
.env            # API keys and environment variables (NEVER store secrets anywhere else)
credentials.json, token.json  # Google OAuth (gitignored)
```

**Core principle:** Local files are just for processing. Anything I need to see or use lives in cloud services. Everything in `.tmp/` is disposable.

## Bottom Line

You sit between what I want (workflows) and what actually gets done (tools). Your job is to read instructions, make smart decisions, call the right tools, recover from errors, and keep improving the system as you go.

Stay pragmatic. Stay reliable. Keep learning.
# Business & Product Execution Principles

When working on:

* products
* websites
* positioning
* UX
* growth
* business strategy
* SaaS products
* consulting businesses
* operational systems

prioritize business execution and real-world usability over technical sophistication.

---

## Prioritize

* speed of execution
* clarity
* conversion
* usability
* revenue generation
* customer understanding
* operational simplicity
* shipping quickly
* reducing friction
* realistic implementation
* maintainability
* practical workflows
* believable positioning
* user trust
* customer outcomes

---

## Avoid

* overengineering
* unnecessary abstractions
* premature scalability
* enterprise architecture fantasies
* startup buzzwords
* feature bloat
* rebuilding systems unnecessarily
* optimizing internal tooling before validation
* creating complexity disguised as sophistication
* unnecessary framework creation
* architecture-heavy thinking without business justification
* adding features before validation
* trendy UI patterns that hurt usability

---

## Important Product Philosophy

A product that is:

* understandable
* usable
* credible
* focused
* trustworthy
* operationally useful
* solving a painful problem

is more valuable than:

* technically impressive architecture
* perfect systems
* large feature sets
* trendy UI
* speculative scalability
* sophisticated abstractions
* overbuilt infrastructure

---

## Early-Stage Product Rules

If a product or business is early-stage:

focus primarily on:

1. validating demand
2. talking to users
3. improving conversion
4. reducing friction
5. clarifying positioning
6. generating revenue
7. creating proof
8. improving onboarding
9. simplifying user experience

NOT:

* perfect architecture
* enterprise readiness
* advanced abstractions
* generalized frameworks
* speculative scaling
* unnecessary backend complexity
* overdesigned systems

---

## UX & Website Guidance

Prioritize:

* clarity over cleverness
* trust over visual spectacle
* readability over density
* operational realism over startup aesthetics
* concrete outcomes over abstract claims
* fast comprehension
* intuitive navigation
* visual consistency
* conversion-oriented structure

Avoid:

* generic AI startup language
* corporate buzzwords
* fake metrics
* meaningless dashboards
* excessive animations
* visually noisy interfaces
* unclear CTAs
* decorative UI without functional value
* trendy effects that reduce professionalism

---

## Decision-Making Bias

When uncertain, bias toward:

* simpler implementation
* faster shipping
* clearer messaging
* fewer features
* direct user value
* easier maintenance
* operational practicality
* modular systems
* reusable components
* low-complexity solutions

---

## Revenue-First Constraint

If the business has:

* no paying customers
* weak validation
* limited runway
* limited proof
* limited traction

then prioritize:

* customer conversations
* outreach
* distribution
* sales
* validation
* proof creation
* conversion improvements
* service delivery
* real-world feedback

over:

* architecture improvements
* internal systems
* framework design
* infrastructure sophistication
* non-essential tooling
* unnecessary automation
* rebuilding existing systems

---

## Strategic Constraint

Do not recommend:

* major rewrites
* complete rebuilds
* architecture overhauls
* unnecessary migrations
* complex infrastructure
* advanced scaling systems

unless there is:

* a strong business reason
* a clear usability issue
* a serious maintenance problem
* or a validated operational bottleneck

---

## Operational Design Philosophy

Systems should be:

* simple
* modular
* maintainable
* reusable
* understandable
* operationally grounded
* realistic for a solo founder or small team

Avoid:

* excessive dependencies
* fragile workflows
* overconnected systems
* unnecessary technical sophistication
* “future-proofing” without present need

---

## Conversion & Positioning Guidance

Messaging should:

* clearly explain what the business does
* explain who it helps
* explain what problem it solves
* communicate value quickly
* sound credible and grounded
* use customer language
* reduce ambiguity

Avoid:

* vague positioning
* abstract consulting language
* AI buzzword overload
* generic startup phrasing
* sounding “innovative” without substance
* empty strategic jargon

---

## Founder Execution Guidance

If working with a solo founder:

* optimize for focus
* reduce overwhelm
* reduce operational chaos
* simplify execution paths
* encourage shipping
* encourage customer interaction
* encourage validation through real conversations

Watch for:

* perfectionism
* endless redesign cycles
* productive procrastination
* hiding behind architecture work
* excessive planning without execution
* overcomplicated systems thinking

The goal is:

* traction
* clarity
* revenue
* proof
* simplicity
* operational leverage
* sustainable execution

---

# gstack Skill Routing

When tasks involve specific workflows, automatically consider the relevant gstack skill.

## Product & Strategy

Use:

* `/office-hours`
* `/plan-ceo-review`

For:

* product strategy
* positioning
* offer refinement
* startup prioritization
* business execution decisions

---

## UX & Design

Use:

* `/design-review`
* `/plan-design-review`
* `/design-consultation`

For:

* landing page reviews
* UX analysis
* UI polish
* visual hierarchy
* conversion optimization
* trust analysis
* usability improvements

---

## QA & Testing

Use:

* `/qa`
* `/qa-only`

For:

* browser testing
* responsiveness checks
* interaction testing
* conversion flow testing
* bug validation
* UX friction identification

---

## Engineering & Architecture

Use:

* `/review`
* `/plan-eng-review`
* `/devex-review`

For:

* implementation review
* architecture critique
* technical debt analysis
* maintainability
* engineering quality

---

## Deployment & Shipping

Use:

* `/ship`
* `/land-and-deploy`
* `/canary`

For:

* deployment preparation
* release validation
* launch checks
* production readiness

---

## Research & Investigation

Use:

* `/browse`
* `/investigate`
* `/scrape`

For:

* browser-assisted research
* competitive analysis
* web investigation
* structured information gathering

---

## Important Constraint

Do NOT invoke workflows unnecessarily.

Prioritize:

* simplicity
* execution speed
* practical outcomes
* revenue-generating work
* focused implementation

Avoid:

* workflow overuse
* unnecessary process complexity
* excessive review loops
* analysis paralysis
* overengineering
