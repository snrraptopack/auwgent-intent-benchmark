import { generateText, Output } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";

const groqOpenAI = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: Bun.env.GROQ_API_KEY,
});

const UserAccountSchema = z.object({
    person: z.object({
        id: z.string(),
        email: z.string().email()
    }).strict(),

    account: z.object({
        plan: z.enum(["free", "pro", "enterprise"]),
        active: z.boolean()
    }).strict()
}).strict();

const { output, usage } = await generateText({
    model: groqOpenAI("openai/gpt-oss-120b"),
    output: Output.object({
        schema: UserAccountSchema,
        name: "UserAccount",
    }),
    prompt: "Initialize a new Pro account for user 'usr_777' with the email 'shawn@example.com'. The account status should be set to active.",
});

console.log("Model Output:", JSON.stringify(output, null, 2));
console.log("Token Usage:", JSON.stringify(usage, null, 2));
