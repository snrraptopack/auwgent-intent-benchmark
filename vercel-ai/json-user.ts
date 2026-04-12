import { generateText, Output } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";

const groqOpenAI = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: Bun.env.GROQ_API_KEY,
});

const UserSchema = z.object({
    name: z.string(),
    age: z.number().int(),
    country: z.string(),
    is_student: z.boolean().nullable()
}).strict();

const { output, usage } = await generateText({
    model: groqOpenAI("openai/gpt-oss-120b"),
    output: Output.object({
        schema: UserSchema
    }),

    prompt: 'Generate a user profile for Hiroshi, a 21-year-old student from Japan.',
});

console.log("Model Output:", JSON.stringify(output, null, 2));
console.log("Token Usage:", JSON.stringify(usage, null, 2));
