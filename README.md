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

---

## Who It's For

| Role | What They See |
|------|--------------|
| **Team Leaders** | Their own roster, their team's coverage ratio, and how their capacity maps to assigned initiatives |
| **Technology Leadership** | Aggregated capacity across all teams, portfolio health, scenario comparisons |
| **Transformation Office / CTO** | Full portfolio scenarios, cost outputs, recommendation engine, historical trends |

---

## Live Demo

**https://scripps-capacity-calculator.netlify.app**

Click **"Launch Demo Mode"** on the login screen to explore the full application with realistic sample data — 5 teams, 15 resources, 12 initiatives, and pre-built scenarios.

---

## Technical Overview

### Stack

| Component | Technology |
|-----------|-----------|
| Frontend | Single HTML file — [Alpine.js](https://alpinejs.dev/) + [Tailwind CSS](https://tailwindcss.com/) (CDN, no build step) |
| Database | [Supabase](https://supabase.com/) (PostgreSQL 17 + Auth + Row Level Security) |
| Hosting | [Netlify](https://www.netlify.com/) (static site) |
| Auth | Supabase Auth (email/password) |

No Node.js runtime. No build tools. No framework compilation. One HTML file, three CDN imports, and a Supabase backend.

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

### Application Modules

| Module | Function |
|--------|----------|
| **Dashboard** | KPI cards (coverage ratio, carrying capacity, FTE totals), team coverage bars, initiative status distribution, at-risk initiative table |
| **Teams & Capacity** | Team cards, drill-in roster management, resource CRUD with Lead/Support classification, tentative flags, confidence ratings, real-time available FTE computation |
| **Portfolio** | Initiative table with status badges, filtering, value/readiness scores, manual override with required notation |
| **Scenarios** | Create/save/compare named scenarios (Base Case, Portfolio Trim, Augmented, Stress Test), run analysis with coverage and cost outputs |
| **Augmentation** | Rate catalog for onshore/offshore/nearshore resources, daily and annualized rates, ramp time tracking |

### Project Structure

```
Capacity-Calculator/
  index.html           — Full application (Alpine.js SPA)
  supabase-config.js   — Supabase URL and anon key
  netlify.toml         — Netlify deploy config + SPA redirect
  .gitignore
  README.md
  Capacity Brief II .pdf          — Concept brief (reference)
  Capacity_Platform_Brief.pdf     — Full PRD (reference)
```

### Local Development

No build step required. Open `index.html` in a browser or serve it:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`. Use **Demo Mode** for local development without a Supabase connection.

### Environment

- Supabase project: `bnyokiwcrypidspehhvi` (us-east-1)
- Netlify site: `scripps-capacity-calculator`

---

## Key Concepts (Glossary)

| Term | Definition |
|------|-----------|
| **Lead Coverage Ratio** | Available lead FTE / demanded lead FTE. The primary diagnostic metric. Below 0.8 = critical. |
| **Lead Tax** | The FTE overhead each active initiative places on lead capacity (~0.25 FTE per initiative per quarter). |
| **Portfolio Carrying Capacity** | Maximum initiatives the org can actively drive: total lead FTE / lead tax per initiative. |
| **Available FTE** | FTE adjusted for BAU obligations (on-call, meetings, support rotation). What remains for project work. |
| **Composite Score** | Average of business value score and strategic readiness score. Used to prioritize constrained initiatives. |

---

## Roadmap

| Phase | Scope |
|-------|-------|
| **Phase 1** (Current) | Roster management, manual portfolio entry, basic scenario engine, demo mode |
| **Phase 2** | Portfolio API ingestion, lead bottleneck flagging, cost modeling, side-by-side scenario comparison |
| **Phase 3** | Recommendation engine, historical trends, Jira/Wrike export, RBAC, notification triggers |
| **Phase 4** | HRIS integration, constrained optimization, portfolio velocity metrics, executive dashboard |

---

*Prepared by the Transformation Office — Scripps Networks Technology, 2026*
