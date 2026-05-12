import { generateText, stepCountIs } from "ai";
import { createGroq } from "@ai-sdk/groq";
import { tools2 } from "./tools";

const groq = createGroq({
    apiKey: Bun.env.GROQ_API_KEY,
});

async function runTest() {
    console.log("Starting Vercel AI SDK Benchmark...\n");

    const systemPrompt = "Be polite and concise. When you call a tool, it will return a result. Wait to receive the result before calling the next tool.";

    const result = await generateText({
        model: groq("openai/gpt-oss-120b"),
        system: systemPrompt,
        prompt: "Create a new high-priority to-do called 'Fix the benchmark script' due on '2024-05-30'. Once it is created, use the ID you received to read the to-do back to me to confirm it was saved properly.",
        tools: tools2,
        stopWhen: stepCountIs(5),
    });

    console.log("\n==================================");
    console.log("--- Final Text Response ---");
    console.log(result.text);

    console.log("\n--- Step Breakdown ---");
    let totalCachedTokens = 0;
    let totalReasoningTokens = 0;

  result.steps.forEach((step, index) => {
        // Safely extract cached and reasoning tokens from the raw response
        const cachedTokens = (step.usage as any).raw?.input_tokens_details?.cached_tokens ?? 0;
        const reasoningTokens = (step.usage as any).raw?.output_tokens_details?.reasoning_tokens ?? 0;

        totalCachedTokens += cachedTokens;
        totalReasoningTokens += reasoningTokens;

        console.log(`\n>>> Turn ${index} Usage:`, JSON.stringify({
            prompt_tokens: step.usage.inputTokens,
            completion_tokens: step.usage.outputTokens,
            total_tokens: step.usage.totalTokens,
            cached_tokens: cachedTokens,
            reasoning_tokens: reasoningTokens
        }, null, 2));

        console.log(`>>> Turn ${index} Tool Calls Logged:`, step.toolCalls.length > 0
            ? JSON.stringify(step.toolCalls.map(t => ({
                name: t.toolName,
                args: t.args
              })), null, 2)
            : "None (Stop)"
        );

    });

    console.log("\n--- Aggregate Usage ---");
    console.log(JSON.stringify({
        prompt_tokens: result.totalUsage.inputTokens,
        completion_tokens: result.totalUsage.outputTokens,
        total_tokens: result.totalUsage.totalTokens,
        total_cached_tokens: totalCachedTokens,
        total_reasoning_tokens: totalReasoningTokens
    }, null, 2));
}

runTest().catch(console.error);
