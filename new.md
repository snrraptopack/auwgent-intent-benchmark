This is the right move. Redoing the benchmark properly will close every gap the reviewers identified and make the IRAI paper much harder to reject. Let me give you a complete guide.

---

## What the reviewers exposed that needs fixing

**Problem 1: "Geometric" was imprecise**
You now know the real mechanism is compounding — per-schema overhead × turn count multiplication. This time you need to capture both layers separately so you can prove the compounding argument with data, not just assertion.

**Problem 2: Single-model fine-tuning bypass**
Llama-3.3-70B alone is not enough to generalize the claim. You need at least one more open-source model to say the bypass holds across architectures.

**Problem 3: Single-run at temperature=0 for the boundary**
The 40-schema Llama boundary needs multiple runs to characterize statistically.

**Problem 4: Mixed sequential-parallel task structure**
Your 6-tool prompt has independent steps (1 and 2) and dependent steps (3→4→5→6). You need to document what actually executed when, not just pass/fail.

**Problem 5: Mock executors**
The dependency chain (run\_shell output → write\_file) was simulated. You need to know exactly what mock values were passed and be explicit about it.

---

## Models to test this time

Run every experiment across these three:

| Model | Why |
|---|---|
| llama-3.3-70b-versatile | Your existing baseline, no function-calling fine-tuning |
| mistral-7b-instruct | Different architecture family, also no OpenAI fine-tuning — this is the generalization proof |
| gpt-oss-120b | Your existing upper bound reference |

If Mistral also passes all schema shapes under Intent Marker and fails under Vercel, the fine-tuning bypass claim becomes architecture-independent. That is the result that eliminates the reviewers' biggest concern.

---

## Phase 1: Structured Output — what to do differently

**Keep the same 5 schema shapes.** They are well-designed.

**Add these recording requirements this time:**

For every shape × model × framework combination, record:
- Exact error message on failure (not just DNF — copy the full API error string)
- Prompt token count at Turn 0
- Completion token count
- Total tokens
- Whether the output passed schema validation and how (parser accepted / API accepted)
- For Auwgent: what the raw intent marker output looked like before parsing

**For the polymorphic union shape specifically:** Record the exact 400 error message from Vercel for both models. That error message is evidence — quote it verbatim in the paper.

**Run each combination 3 times at temperature=0.** They should be identical at temp=0 but running 3 times proves determinism and gives you the right to say "consistently" rather than "observed once."

---

## Phase 2: Agentic Orchestration — major changes needed

### Fix the task design first

Your current prompt mixes dependency types. Before running anything, redesign it into two explicit categories:

**Task A — Strict sequential (all steps dependent):**
```
1. run_shell "echo diagnostic_id_$(date +%s)"
2. write_file /tmp/log.txt with exactly that shell output
3. create_todo titled "Diagnostic [that exact ID]" high priority
4. send_email to admin@example.com with body containing that todo ID
```
Every step depends on the previous. No legitimate parallel execution exists. Any parallel firing is unambiguously wrong.

**Task B — Mixed dependency (your original prompt):**
```
1. search_web "Latest TypeScript version"  ─┐ independent
2. get_weather "San Francisco" celsius      ─┘ can parallel
3. run_shell "echo diagnostic complete"
4. write_file /tmp/log.txt ← needs step 3 output
5. create_todo "System Diagnostic Complete"
6. send_email ← needs step 4 output
```
Document the dependency graph explicitly. Record what the model actually parallelized versus sequenced.

Running both tasks lets you separate two claims: (1) sequential governance under pure dependency chains, and (2) intelligent execution planning under mixed dependency structures.

### What to record per turn this time

For every experiment, keep a turn-by-turn log:

```
Turn 0:
  - Prompt tokens: [n]
  - Tools called: [list]
  - Were they parallel or sequential: [parallel/sequential]
  - Mock return values: [exact strings]

Turn 1:
  - Prompt tokens: [n] (should include full schema re-injection)
  - Tools called: [list]
  - Input values received from Turn 0: [exact strings]
  ...
```

This turn log is what proves the compounding argument. You can show that at 100 schemas, Turn 1 prompt tokens = Turn 0 prompt tokens because the full schema block was re-injected. That is the multiplicative mechanism made visible in data.

### Scale points to test

Test at: 2, 5, 10, 20, 40, 60, 80, 100 schemas — same as before.

**But this time also test 30 schemas for Llama.** You observed failure at 40 and success at 20. The real boundary is somewhere between. Testing 30 gives you a tighter characterization and shows methodological care.

### Temperature protocol for the boundary

For Llama specifically at 30, 40, and 50 schemas:
- Run 5 times at temperature=0
- Run 3 times at temperature=0.1
- Record pass/fail each time

This gives you the statistical characterization the reviewers asked for. If it fails all 5 runs at temp=0 and 40 schemas, you can say "consistently observed across all 5 runs" which is much stronger than "single run."

---

## About the Vercel JSON Strict Mode — this is important

You mentioned you were using JSON schema strict mode. This is a critical detail that needs to be explicit in the paper because it directly explains the DNF failures.

OpenAI strict mode imposes these hard constraints:
- All properties must be required or explicitly nullable
- No oneOf/anyOf/enum at root level
- Maximum nesting depth of five
- No additional properties allowed

These are **not model limitations** — they are API-level architectural restrictions. When Llama-3.3-70B fails, it is not because Llama cannot reason about tools. It is because the Groq API, implementing OpenAI-compatible strict mode, rejects the request before the model ever sees it.

**This needs one precise sentence in Section III:**

> *"The Vercel AI SDK baseline operates with JSON schema strict mode enabled, which enforces server-side validation constraints including prohibition of oneOf/anyOf at the root level and a maximum nesting depth of five. Under this configuration, schema validation failures are returned by the API before model generation occurs."*

That sentence closes the loop on why Llama DNFs. It is not a model failure. It is a protocol-layer rejection. Which is exactly your thesis.

---

## The constrained decoding question

The reviewers suggested comparing against Outlines or LMQL. You do not need to implement this for IRAI — but you need to understand the argument so you can address it if a reviewer raises it.

Outlines works by constraining the model's token sampling at inference time — it builds a finite state machine from your JSON schema and only allows tokens that keep the output on a valid path toward a compliant JSON object. It bypasses fine-tuning by constraining generation rather than by moving validation downstream.

The key difference from your approach is: Outlines still requires the schema to be present at inference time and still constrains the model's generation path. The Intent Marker Protocol removes the schema from the generation path entirely. This means Outlines has the same context overhead problem — the schema must still be communicated to the FSM builder. Your protocol eliminates that overhead at the source.

Add this one sentence to future work:

> *"A direct comparison against inference-time constrained decoding approaches such as Outlines~\cite{outlines} and LMQL~\cite{lmql} represents an important future evaluation, as these methods bypass fine-tuning via generation-layer constraints rather than protocol-layer decoupling, and their token overhead characteristics under mass-tool orchestration remain uncharacterised."*

---

## Evaluation checklist for the new benchmark run

Before you start, confirm:

- [ ] Three models loaded and accessible (Llama, Mistral, GPT)
- [ ] Vercel SDK with strict mode explicitly confirmed on — log this in your code
- [ ] Auwgent Intent Marker Parser version fixed and documented
- [ ] Mock executor return values documented — what does run\_shell return exactly?
- [ ] Turn-by-turn logging enabled before you run anything
- [ ] Temperature=0 for all primary runs
- [ ] 5 repeat runs for Llama at 30, 40, 50 schema boundary tests
- [ ] Task A (pure sequential) and Task B (mixed dependency) both prepared
- [ ] Exact API error messages captured for all DNF cases

When you have the results, come back and we will write the corrected sections together. The compounding argument with real turn-log data will be far more convincing than what you had before.