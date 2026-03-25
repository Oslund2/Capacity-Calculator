# Technology Capacity Intelligence Platform (TCIP)

**A decision-support tool that answers the question every technology leader at Scripps is asking:**

> *Given our actual capacity, which initiatives can we execute, in what sequence, and at what cost — and what changes when we add or remove resources?*

---

## The Problem This Solves

Every technology organization hits the same wall. There are 40 active initiatives but only 8 people who can actually *lead* them. Not execute — lead. The engineers, analysts, and developers are there. What's scarce is the capacity to own work end-to-end: to set direction, make decisions, unblock dependencies, and be accountable for outcomes.

When that capacity is saturated, everything else pools behind it. Execution teams sit idle — not because they aren't working, but because they're waiting for direction from leads who are spread across too many workstreams to drive any of them effectively.

**This is not a resource problem. It is a math problem. And math problems have clean answers.**

Today there is no shared, quantified view of this constraint. Teams track capacity in different units (headcount, hours, story points, gut feel). Portfolio decisions get made on intuition. The result is a planning process that produces commitments the organization structurally cannot honor.

## What TCIP Does

TCIP sits between the portfolio management layer (where initiatives are defined) and the execution tools (where work gets done). It is the **intelligence layer in between** — the thing that reconciles what we *want* to do with what we *actually have the capacity* to do.

It introduces one critical distinction that changes everything:

| | |
|---|---|
| **Lead Capacity** | People who can own and drive work end-to-end — setting direction, making decisions, resolving blockers, being accountable. Not defined by title. Defined by ownership capability. |
| **Support Capacity** | Skilled executors who deliver within defined scope — development, testing, analysis — but who need direction from a lead to be productive. |

From that distinction, everything else follows:

### 1. Know What You Have
Each team leader classifies their people as Lead or Support capacity, measured in FTE equivalents and adjusted for BAU obligations. The platform computes a **Lead Coverage Ratio** — available lead FTE divided by demanded lead FTE. Below 0.8 is critical. This single number explains why things feel stuck.

### 2. Know What You're Being Asked to Do
Initiative data flows in — names, priorities, value scores, readiness scores, and the lead/support FTE each one requires. The platform reconciles demand against supply and classifies every initiative:

- **Greenlit** — capacity exists to execute now
- **Sequenced** — planned for a future period when capacity frees up
- **Constrained** — blocked specifically by a lead capacity shortage
- **Deferred** — not executable under current assumptions

### 3. Model What-If Scenarios
Without touching live data, leadership can adjust inputs — add a lead, remove offshore contractors, defer three initiatives — and see immediately how the portfolio tiers, coverage ratio, and total cost change. Scenarios are named, saved, and compared side by side.

### 4. Understand the Cost of Decisions
Every scenario carries a fully-loaded cost. The augmentation planner models onshore contractors, offshore teams, and internal development paths — including the counterintuitive insight that adding offshore support can *reduce* throughput if it overloads lead capacity with coordination overhead.

### 5. Know Where to Offshore — and What It Really Costs
The platform includes deep offshore intelligence across **8 countries** (India, Philippines, Poland, Mexico, Brazil, Vietnam, Romania, Colombia) with fully-loaded rates by role level (L1-L4), risk profiles across 7 dimensions, and fit-scoring algorithms. It answers the questions that come after the decision to augment: *Where should we go? What will it actually cost? Who should we retain? How do we manage the transition?*

---

## Who It's For

| Role | What They See |
|------|--------------|
| **Team Leaders** | Their own roster, their team's coverage ratio, and how their capacity maps to assigned initiatives |
| **Technology Leadership** | Aggregated capacity across all teams, portfolio health, scenario comparisons, offshore readiness |
| **Transformation Office / CTO** | Full portfolio scenarios, cost outputs, country intelligence, transition planning, AI recommendations |

---

## Live Application

**https://scripps-capacity-calculator.netlify.app**

The app starts in **Live Mode** (connected to Supabase). Use the mode toggle in the sidebar to switch to **Demo Mode** with realistic sample data — 5 teams, 15 resources, 12 initiatives, and pre-built scenarios.

---

## Application Modules

### Dashboard
KPI cards with tooltips explaining every metric: Lead Coverage Ratio, Portfolio Carrying Capacity, Lead/Support FTE (available vs. demanded). Initiative status distribution (Greenlit/Sequenced/Constrained/Deferred), team-by-team coverage bars, and a high-value at-risk initiative table. AI-powered executive briefing with one click.

### Teams & Capacity
Org-wide summary strip (total leads, support, cost, avg coverage). Team cards with colored health indicators and drill-in rosters. Resources grouped by Lead/Support with avatar initials, FTE capacity bars, cost display, and tentative classification flags. AI team analysis button generates capacity health assessment and staffing recommendations.

### Portfolio
Initiative table with status badges, priority, value/readiness scores, and composite ranking. Filterable by status. AI sparkle icon on each row generates a one-click feasibility assessment with risks, recommendations, and opportunity cost analysis. Manual override capability with required notation.

### Scenario Engine
Create and compare named what-if scenarios (Base Case, Portfolio Trim, Augmented, Stress Test). Run analysis to see lead coverage after Lead Tax overhead, initiative tier counts, and total cost. AI Recommendations button suggests optimal staffing changes with specific country recommendations and cost estimates.

### Offshoring & Augmentation

A four-tab intelligence hub:

**Country Intelligence** — 8 country cards showing L1-L4 fully-loaded annual rates, flags, timezones with live local time, and savings vs. US baseline. Click any country for a detail view with:
- Risk profile bars across 7 dimensions (talent pool, English proficiency, infrastructure, IP protection, political stability, cultural alignment, timezone overlap)
- Strengths and risks lists
- "Best for" role tags
- Level-by-level savings calculator (e.g., India L2: $28K vs. US $95K = 71% savings)

**Rate Catalog** — Configurable augmentation rates for onshore, nearshore, and offshore contractors with daily/annual rates and ramp times.

**Offshore Readiness Analyzer** — Maps every resource to L1-L4 levels and recommends offshore eligibility. Features a **cost-to-risk slider** that adjusts recommendations in real time between Max Quality (conservative, retain onshore) and Max Savings (aggressive, push offshore). Summary cards show Y/P/N counts and per-resource savings estimates.

**Transition Planning** — Management ratio table (how many onshore managers per offshore team size), service provider directory by tier (Tier 1 GSIs, Tier 2 specialists, Tier 3 boutique), and a 4-phase transition timeline (pre-announce, announce, transition, post-transition).

### AI Advisor
Slide-out chat panel accessible from the sidebar. Conversational interface powered by Claude that understands the full TCIP domain — capacity planning, portfolio optimization, and offshore strategy across all 8 countries. Answers questions like "Which country is best for QA roles?" or "What happens if we add 2 offshore leads?" using live portfolio data as context.

---

## Offshore Intelligence

Country rate data and risk profiles sourced from industry benchmarks (Everest Group, NASSCOM, Deloitte GBS studies):

| Country | L1 | L2 | L3 | L4 | L2 Savings vs US |
|---------|-----|-----|-----|-----|-----------------|
| Vietnam | $14K | $22K | $38K | $60K | 77% |
| Philippines | $15K | $24K | $42K | $68K | 75% |
| India | $18K | $28K | $48K | $75K | 71% |
| Colombia | $22K | $35K | $55K | $82K | 63% |
| Brazil | $25K | $38K | $60K | $90K | 60% |
| Mexico | $28K | $42K | $65K | $95K | 56% |
| Romania | $28K | $42K | $65K | $95K | 56% |
| Poland | $32K | $48K | $72K | $105K | 49% |
| **US Baseline** | **$65K** | **$95K** | **$140K** | **$200K** | — |

Key offshore management rules embedded in the platform:
- **Management ratio**: 1 onshore manager per 8-12 offshore FTEs
- **Friction costs**: Budget 15-20% above quoted rates for coordination overhead
- **Lead Tax warning**: Adding offshore support without increasing lead capacity to coordinate it will reduce throughput while increasing cost
- **Role framework**: L1/L2 roles are generally offshorable; L3/L4 should be retained for institutional knowledge and strategic judgment

---

## Tooltips

Every KPI card, section header, and data column includes a `?` tooltip icon with a plain-English explanation. First-time users can hover over any metric to understand what it means, how it's calculated, and why it matters. Covers: coverage ratios, carrying capacity, FTE definitions, initiative statuses, value/readiness scores, cost rates, ramp weeks, risk profiles, management ratios, and the cost-to-risk slider.

---

## Technical Overview

### Stack

| Component | Technology |
|-----------|-----------|
| Frontend | Single HTML file — [Alpine.js](https://alpinejs.dev/) + [Tailwind CSS](https://tailwindcss.com/) (CDN, no build step) |
| Database | [Supabase](https://supabase.com/) (PostgreSQL 17 + Auth + Row Level Security) |
| AI | [Claude Haiku 4.5](https://anthropic.com/) via Supabase Edge Function |
| Hosting | [Netlify](https://www.netlify.com/) (static site) |

No Node.js runtime. No build tools. No framework compilation. Two JS files, CDN imports, and a Supabase backend.

### Database Schema

12 tables covering the full domain model:

```
profiles              — User accounts linked to Supabase auth
teams                 — Organizational units that own capacity
resources             — Team members with Lead/Support classification, FTE, cost rates
initiatives           — Portfolio items with value scores, readiness, FTE requirements
initiative_quarters   — Quarterly FTE demand breakdown per initiative
initiative_dependencies — Directed dependency graph between initiatives
scenarios             — Named what-if configurations
scenario_adjustments  — Individual changes within a scenario (add/remove/modify)
scenario_results      — Computed outputs per scenario per quarter
augmentation_rates    — Configurable cost catalog for external staffing options
coverage_snapshots    — Historical time-series of coverage ratios
audit_log             — Append-only change trail for governance
```

Key database features:
- **Generated columns** — `available_fte` auto-computes from FTE and BAU allocation
- **Triggers** — `updated_at` timestamps, FTE rollups from quarters to initiative totals, locked scenario protection
- **Row Level Security** — All tables protected; read access for authenticated users, write scoped by role
- **Audit logging** — Trigger-based capture of all changes to operational tables

### Project Structure

```
Capacity-Calculator/
  index.html             — Full application (Alpine.js SPA)
  offshore-data.js       — Offshore intelligence: 8 countries, rates, risk profiles, scoring, providers
  supabase-config.js     — Supabase URL and anon key
  netlify.toml           — Netlify deploy config + SPA redirect
  .gitignore
  README.md
  Capacity Brief II .pdf           — Concept brief (reference)
  Capacity_Platform_Brief.pdf      — Full PRD (reference)
```

### Local Development

No build step required. Serve from any static file server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`. Toggle to **Demo Mode** in the sidebar for local development without a Supabase connection.

### Environment

- Supabase project: `bnyokiwcrypidspehhvi` (us-east-1)
- Netlify site: `scripps-capacity-calculator`
- AI Edge Function: `ai-advisor` (Claude Haiku 4.5, requires `ANTHROPIC_API_KEY` secret)

---

## Key Concepts (Glossary)

| Term | Definition |
|------|-----------|
| **Lead Coverage Ratio** | Available lead FTE / demanded lead FTE. The primary diagnostic metric. Below 0.8 = critical. |
| **Lead Tax** | The FTE overhead each active initiative places on lead capacity (~0.25 FTE per initiative per quarter). |
| **Portfolio Carrying Capacity** | Maximum initiatives the org can actively drive: total lead FTE / lead tax per initiative. |
| **Available FTE** | FTE adjusted for BAU obligations (on-call, meetings, support rotation). What remains for project work. |
| **Composite Score** | Average of business value score and strategic readiness score. Used to prioritize constrained initiatives. |
| **L1-L4 Levels** | Role classification for offshore readiness. L1/L2 = process-driven, generally offshorable. L3/L4 = strategic, retain onshore. |
| **Cost-to-Risk Slider** | Adjusts offshore recommendations between Max Quality (conservative) and Max Savings (aggressive). |
| **Friction Costs** | Hidden overhead of offshoring: travel, management, rework, VMO. Budget 15-20% above quoted rates. |

---

## Roadmap

| Phase | Scope |
|-------|-------|
| **Phase 1** (Current) | Roster management, portfolio entry, scenario engine, offshore intelligence hub, AI advisor, demo mode |
| **Phase 2** | Portfolio API ingestion from McKinsey app, lead bottleneck flagging, side-by-side scenario comparison |
| **Phase 3** | Recommendation engine, historical trends, Jira/Wrike export, RBAC, notification triggers |
| **Phase 4** | HRIS integration, constrained optimization, portfolio velocity metrics, executive dashboard |

---

*Prepared by the Transformation Office — Scripps Networks Technology, 2026*
