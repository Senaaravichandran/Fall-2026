# NIYAM

**Every clause becomes a rule.** NIYAM is a team of seven AI agents that turns a regulatory circular into a tested, two-person-approved, monitored live bank rule, and traces every alert back to the sentence that caused it.

**Prototype:** https://niyam-fall-2026.vercel.app · **PRD:** https://niyam-fall-2026.vercel.app/prd

Built for Fall 2026 Projects by Team Dragorithm.

> Everything the prototype shows is **synthetic**: the banks, their circulars, loans, rules, approvers and alerts. RBI statistics quoted in the PRD are public and cited at their source. This deployment runs **rule-based**, with no LLM key.

## The problem

When the Reserve Bank of India changes a rule, every bank it applies to must find the circular, work out what it means for its own rules and policies, change live systems safely, and prove it later. Today that takes weeks to months of hand-offs between compliance, risk, IT and testing, and mistakes are penalised. Existing tools tell a bank *what* changed; none writes, tests, approves and deploys the rule itself.

## Try it in three minutes

1. Open the [console](https://niyam-fall-2026.vercel.app/console). Pick a bank (ABC Bank, private; DEF Bank, public; GHI Co-operative Bank; JKL Finance, NBFC). Its circular PDF loads and is read automatically. Or choose **+ Add your own bank** and set its name, licence, capital, live rules and Board policy.
2. Press **Run the pipeline** and watch the seven agents. Each card says what the agent produced and how.
3. In **Two-person approval**, sign as maker and checker: name, employee ID, reason, and a four-point checklist.
4. Press **Release**. The bank's own rule-engine site opens and plays the rollout: shadow, 10% canary, live, the Sentinel's automatic rollback on a data fault, and the Golden Thread from an alert back to its sentence.

You can also upload any circular as PDF, Word or text, or paste it.

## How it works

| Step | Agent | What happens |
| --- | --- | --- |
| Read | Reader | Splits the circular into numbered clauses and decides which bind this bank's licence type |
| Extract | Extractor | Turns each binding clause into an obligation with a number, an operator and the exact quoted words; a quote that is not word for word in the clause is rejected |
| Map | Mapper | Walks the knowledge graph to the bank's live rules and policies: what to change, what is missing, which policy conflicts |
| Draft | Author | Writes typed rule files on a draft branch, never raw SQL |
| Validate | Validator | Writes boundary tests from the regulation, objects to the Author over A2A if anything is off, backtests old against new on 90 days |
| Approve | Humans | Maker and checker sign HMAC tokens bound to the SHA-256 of each rule file |
| Release | Release | Verifies both signatures, then shadow, canary 10%, live; the Sentinel rolls back on drift |
| Trace | Golden Thread | Alert → rule version → approvers → obligation → clause → circular |

The Conductor finds the six specialists by their A2A Agent Cards and hands each its task.

## Architecture

| Layer | In this repository |
| --- | --- |
| Agents | Conductor + Reader, Extractor, Mapper, Author, Validator, Release. Each has an A2A v1.0 Agent Card at `/a2a/{agent}/.well-known/agent-card.json` and a JSON-RPC endpoint at `/a2a/{agent}`. `src/niyam/a2a/` |
| Tools | Seven MCP servers on the official TypeScript SDK: regulatory-kg, semantic-model, dsl-compiler, backtest, git-draft, approvals, deploy-monitor. Allowlists enforced in the client and again in every server. `src/niyam/mcp/` |
| Knowledge graph | Property graph with the Neo4j schema (Circular → Clause → Obligation → Policy → Rule → RuleVersion → Approval → Deployment → Alert). `src/niyam/graph/` |
| Banks | Four synthetic banks with their own licence, capital, live rules, policy, loan book and circular PDF (`bank-rules/`), plus a bank the user defines. `src/niyam/data/banks.ts` |
| Intake | PDF text layer, Word and plain text, reflowed into numbered paragraphs. `src/niyam/intake.ts` |
| Rules | Typed YAML DSL (strict zod schema) compiled to read-only SQL. `src/niyam/dsl/` |
| Tests | Generated from the obligation, never from the draft: below, on and above the limit, out-of-scope entity. `src/niyam/dsl/testgen.ts` |
| Rule repository | Real git (isomorphic-git) on an in-memory file system; agents may only commit to `draft/*`. `src/niyam/git/` |
| Sandbox | SQLite compiled to WebAssembly over a seeded 90-day synthetic loan book per bank. `src/niyam/sql/` |
| Approvals | HMAC-SHA256 tokens over rule id, version, file hash, approver, role, reason and checks. `src/niyam/approvals/` |
| LLM | Optional. With `ANTHROPIC_API_KEY`, the Extractor and Author can call Claude; every answer is still quote-checked, schema-checked and tested. Not configured on this deployment. `src/niyam/llm/` |
| Site | Next.js: the console (server-sent events), each bank's rule-engine site at `/bank/<key>`, and the PRD. `src/app/`, `src/components/` |

**What is simulated:** the agents run in one deployment rather than separate services; the knowledge graph, git repository and SQL engine are in memory per request; the data is synthetic. The interfaces (A2A, MCP, compiled SQL, Cypher) are the ones a bank deployment would use.

## Run it locally

```bash
npm install
npm test            # 143 tests: every bank end to end, PDF intake, approvals, security
npm run demo        # whole pipeline in the terminal, ends with the Golden Thread
npm run dev         # http://localhost:3000 (opens the console)
```

No keys, databases or Docker are needed. `.env.example` lists the optional settings.

## Team

Team Dragorithm: Senaaravichandran A, Abiyshek S, Jerrick Austin Manuel G, Venkat Narayanan S, Vishal R. Mentor: Prof. Suresh R.
