import { auwgent, type AuwgentConfig } from "./generated/account.agent.types.ts"

const config: AuwgentConfig = {
    apiKeys: {
        groqApiKey: Bun.env.GROQ_API_KEY || ""
    }
}
const agent = auwgent(config)

agent.onIntent((intent, value, name) => {
    if (intent === "response_text") {
        console.log("text", value)
    }
    if (intent === "response_schema") {
        console.log("json output", JSON.stringify(value.response, null, 2))
  }
})

const session = await agent.run(`Initialize a new Pro account for user 'usr_777' with the email 'shawn@example.com '. The account status should be set to active.`)
console.log(JSON.stringify(agent.getMetadata(),null,2))
