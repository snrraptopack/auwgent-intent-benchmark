// Auto-generated types for TestAccount
// Do not edit manually
// Core Runtime Imports
import { createAuwgent } from "@snrraptopack/auwgent-sdk";
import type { ToolRegistry } from "@snrraptopack/auwgent-sdk";
import _importedIR from './tools.agent.json' with { type: 'json' };
type TestAccountIR = Omit<typeof _importedIR, "name" | "workflows" | "helpers"> & {
  name: "TestAccount";
  workflows: undefined;
  helpers: undefined;
};
const agentIR = _importedIR as unknown as TestAccountIR;
export type TestAccountInput = {

}

export type TestAccountOutput = {

}

export type TestAccountContext = {

}

export type TestAccountTools = {
    read_todo: (args: { id: string }) => Promise<string>;
    create_todo: (args: { title: string, due_date: string, priority: "low" | "medium" | "high" }) => Promise<string>;
    delete_todo: (args: { id: string }) => Promise<boolean>;
    mark_todo_done: (args: { id: string }) => Promise<boolean>;
    update_todo_title: (args: { id: string, new_title: string }) => Promise<boolean>;
}

/** Custom intents defined in the DSL (if any) */
export type TestAccountCustomIntents =
    | never;

/**
 * API keys required for TestAccount
 */
export type TestAccountApiKeys = {
    groq_apiApiKey: string;  // API key for custom provider 'groq-api'
}

// Defined explicitly (not via ReturnType) so RouterMiddleware can derive from it without circularity
export type TestAccountAgent = import("@snrraptopack/auwgent-sdk").TypedAuwgent<
    typeof agentIR,
    TestAccountCustomIntents,
    TestAccountOutput,
    TestAccountTools
>;

/** Middleware object type — consistent with `TestAccountAgent.onIntent` intent narrowing */
export type TestAccountMiddleware<T extends import("@snrraptopack/auwgent-sdk").MiddlewareContext<typeof agentIR>['activeAgent'] = import("@snrraptopack/auwgent-sdk").MiddlewareContext<typeof agentIR>['activeAgent']> = import("@snrraptopack/auwgent-sdk").Middleware<
    typeof agentIR,
    TestAccountCustomIntents,
    TestAccountOutput,
    TestAccountTools,
    T
>;

export type TestAccountConfig = {
    tools: TestAccountTools;
    middleware?: TestAccountMiddleware[];
    apiKeys: TestAccountApiKeys;
}

export function createTestAccount(config: TestAccountConfig): TestAccountAgent {
    return createAuwgent<
        typeof agentIR,
        TestAccountCustomIntents,
        TestAccountOutput,
        TestAccountTools
    >(agentIR, {
        tools: config.tools,
        middleware: config.middleware as any,
        apiKeys: config.apiKeys
    });
}

export const auwgent = createTestAccount;
export type AuwgentTools = TestAccountTools;
export type AuwgentConfig = TestAccountConfig;
export type AuwgentAgent = TestAccountAgent;
export type AuwgentMiddleware = TestAccountMiddleware;
export type AuwgentContext = TestAccountContext;