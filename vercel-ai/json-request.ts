import { generateText, Output } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";

const groqOpenAI = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: Bun.env.GROQ_API_KEY,
});

const RequestSchema = z.discriminatedUnion("request_type", [
    z.object({
        request_type: z.literal("booking"),
        payload: z.object({
            booking_id: z.string(),
            date: z.string(),
            participants: z.array(z.string()).optional()
        }).strict()
    }).strict(),
    z.object({
        request_type: z.literal("support"),
        payload: z.object({
            ticket_id: z.string(),
            issue_type: z.enum(["billing", "technical", "general"]),
            priority: z.enum(["low", "medium", "high"]).optional()
        }).strict()
    }).strict()
]);

const { output, usage } = await generateText({
    model: groqOpenAI("openai/gpt-oss-120b"),
    output: Output.object({
        schema: RequestSchema,
        name: "Request",
    }),
    prompt: "I have a billing issue. My ticket ID is 'TIC-999'. Set the priority to medium.",
});

console.log("Model Output:", JSON.stringify(output, null, 2));
console.log("Token Usage:", JSON.stringify(usage, null, 2));
