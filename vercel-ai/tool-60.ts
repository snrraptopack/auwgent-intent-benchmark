import { generateText, stepCountIs } from "ai";
import { createGroq } from "@ai-sdk/groq";
import { tools60 } from "./tools60";

const groq = createGroq({
    apiKey: Bun.env.GROQ_API_KEY,
});

async function runTest() {
    console.log("Starting Vercel AI SDK Tools-60 Benchmark (OpenAI Compatible Routing)...\n");

    const systemPrompt = "Be polite and concise. When you call a tool, it will return a result. Wait to receive the result before calling the next tool.";

    const result = await generateText({
        model: groq("openai/gpt-oss-120b"),
        system: systemPrompt,
        prompt: "I need you to execute a system diagnostic workflow. First, use search_web to look up 'Latest TypeScript version'. Second, get the weather summary for 'San Francisco' in celsius. Third, run a shell command saying 'echo diagnostic complete' in '/tmp'. Fourth, write that exact shell command output to a file located at '/tmp/log.txt'. Fifth, create a high-priority to-do due on '2024-05-30' titled 'System Diagnostic Complete'. Finally, send an email to 'admin@example.com' with the subject 'Diagnostic Logs' and the body matching the completed status.",
        tools: tools60,
        stopWhen: stepCountIs(10),
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
            raw_prompt: (step.usage as any).raw?.prompt_tokens
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
