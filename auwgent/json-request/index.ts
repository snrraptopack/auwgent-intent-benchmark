import { auwgent, type AuwgentConfig } from "./generated/request.agent.types"

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

  if(intent=== "response_schema") {
    console.log("json output", JSON.stringify(value.response,null,2))
  }
})

const session = await agent.run(" I have a billing issue. My ticket ID is 'TIC-999'. Set the priority to medium.")

console.log(JSON.stringify(agent.getMetadata(),null,2))
