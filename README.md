# Benchmark: Structured JSON Output (Vercel AI SDK vs Auwgent Engine)

This repository contains an objective, manual benchmark analyzing the reliability, portability, and behavior of structured JSON generation. Testing was performed comparing the **Vercel AI SDK** (Native API mapping) against the **Auwgent Agentic Engine** (Block Protocol Orchestration).

## Key Findings & Observations

### 1. Provider Independence & Portability
- **Vercel AI SDK** relies entirely on the provider's native `json_schema` API support. When evaluating models like `llama-3.3-70b-versatile` on Groq, the AI SDK failed immediately (DNF) because that specific model does not support the `response_format` flag at the API level.
- **Auwgent Engine** successfully extracted and validated the JSON structure for the exact same model. Auwgent orchestrates the schema structure via its internal engine parsing, granting high portability across models natively lacking API-level JSON features.

### 2. The Strict Mode & Optional Fields Quirk
- **Vercel AI SDK**: When testing supported models (`openai/gpt-oss-120b`), Vercel AI SDK automatically enforces OpenAI's "Strict Mode". This mode strictly rejects Zod `.optional()` fields (e.g., `is_student?: boolean`), throwing a 400 rejection error before hitting the model. Passing the benchmark required writing `.nullable()` workarounds into the schema.
- **Auwgent Engine**: Natively processed omitted and optional properties safely across all five schema complexities without needing any user-side Zod/Type tweaks.

### 3. Polymorphic Roots / Discriminated Unions
- **Vercel AI SDK**: Failed (DNF). Generating a Union type at the root schema (e.g., `Request = Booking | Support`) throws a 400 rejection from the API. OpenAI and Groq Strict mode explicitly forbid `oneOf` or `anyOf` at the root object level.
- **Auwgent Engine**: Output the targeted polymorhphism correctly. By generating a non-restrictive Block Protocol (`[schema: Name]...[/schema]`), Auwgent trivially mapped the dynamic intent to the appropriate type payload.

---

## Important Note on Token Usage & Auwgent's Default Prompt

When analyzing the token usage logs, it is important to note the operational overhead in Auwgent's `prompt_tokens`.

For this benchmark, **we deliberately used the standard out-of-the-box user-facing API for Auwgent.** We did not optimize or trim down Auwgent's internal engine prompt, because the goal was to measure real-world performance as an end-user would experience it. 

While we could have easily stripped the engine prompt down to make the tests incredibly "lean," Auwgent relies on a robust default system prompt to safely act as an execution engine. It packs essential runtime constraints, such as:

```text
You are an execution engine. Respond only with valid protocol blocks.

Rules:
- Use only the block types listed below.
- If no external action is needed, reply with [response_text].
- If UI output is needed, emit one or more [component] blocks and then a [render_component] block.
- If a tool, workflow, or helper is needed, emit only the action block(s) for that turn and stop.
- After an action turn, wait for the next turn's [result] block(s) before producing [response_text] or [schema].
- Close every block correctly.
- Do not invent tools, workflows, helpers, components, schemas, or custom intents.

Allowed blocks:
- [response_text]...[/response_text]
- [schema: valid schema name]...[/schema]

Block syntax:
- Text response: [response_text]...plain text...[/response_text]
- Schema output: [schema: valid_schema_name] then write one `key: value` or `key = value` field per line, then close with [/schema]
- Values may be strings, numbers, booleans, null, arrays like [1, 2], or objects like { city: "Lagos" }.
...
```

**Observation:** Despite carrying this heavy instructional text to ensure deterministic block orchestration, Auwgent successfully extracted highly complex nested schemas and discriminated unions that explicitly caused the standard API wrappers to fail.
