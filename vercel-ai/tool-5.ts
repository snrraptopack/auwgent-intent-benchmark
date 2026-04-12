import { generateText, stepCountIs } from "ai";
import { createGroq } from "@ai-sdk/groq";
import { tools5 } from "./tools";

const groq = createGroq({
    apiKey: Bun.env.GROQ_API_KEY,
});

async function runTest() {
    console.log("Starting Vercel AI SDK Tools-2 Benchmark (OpenAI Compatible Routing)...\n");

    const systemPrompt = "Be polite and concise. When you call a tool, it will return a result. Wait to receive the result before calling the next tool.";

    const result = await generateText({
        model: groq("llama-3.3-70b-versatile"),
        system: systemPrompt,
        prompt: "Create a new high-priority to-do called 'Fix the benchmark script' due on '2024-05-30'. Once it is created, use the ID you received to read the to-do back to me to confirm it was saved properly.",
        tools: tools5,
        stopWhen: stepCountIs(5),
    });

    console.log("\n==================================");
    console.log("--- Final Text Response ---");
    console.log(result.text);

    console.log("\n--- Step Breakdown ---");
    result.steps.forEach((step, index) => {
        const cachedTokens = (step.usage as any).raw?.prompt_tokens_details?.cached_tokens ?? 0;
        const effectiveInput = step.usage.inputTokens + cachedTokens;

        console.log(`\n>>> Turn ${index} Usage:`, JSON.stringify({
            ...step.usage,
            effectiveInputTokens: effectiveInput,
            cachedTokens,
        }, null, 2));
        console.log(`>>> Turn ${index} Tool Calls Logged:`, step.toolCalls.length > 0
            ? JSON.stringify(step.toolCalls.map(t => t.toolName))
            : "None (Stop)"
        );
    });

    const totalCached = result.steps.reduce((sum, step) => {
        return sum + ((step.usage as any).raw?.prompt_tokens_details?.cached_tokens ?? 0);
    }, 0);

    console.log("\n--- Aggregate Usage ---");
    console.log(JSON.stringify({
        ...result.totalUsage,
        effectiveInputTokens: result.totalUsage.inputTokens + totalCached,
        totalCachedTokens: totalCached,
    }, null, 2));
}

runTest().catch(console.error);
