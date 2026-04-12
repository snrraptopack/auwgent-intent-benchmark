import { generateText, Output } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";

const groqOpenAI = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: Bun.env.GROQ_API_KEY,
});

const ProjectSchema = z.object({
    project_name: z.string(),
    tasks: z.array(
        z.object({
            title: z.string(),
            priority: z.enum(["low", "medium", "high"]),
            completed: z.boolean().nullable() // Workaround for Strict Mode
        }).strict()
    )
}).strict();

const { output, usage } = await generateText({
    model: groqOpenAI("openai/gpt-oss-120b"),
    output: Output.object({
        schema: ProjectSchema,
        name: "Project",
    }),
    prompt: "Create a project called 'Auwgent SDK Launch'. Include these three tasks:\n'Write documentation' with high priority.\n'Fix buffer bugs' with medium priority, which is already completed.\n'Publish to npm' with low priority",
});

console.log("Model Output:", JSON.stringify(output, null, 2));
console.log("Token Usage:", JSON.stringify(usage, null, 2));
