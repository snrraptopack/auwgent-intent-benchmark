// Auto-generated types for TestUser
// Do not edit manually
// Core Runtime Imports
import { createAuwgent } from "@snrraptopack/auwgent-sdk";
import type { ToolRegistry } from "@snrraptopack/auwgent-sdk";
import _importedIR from './account.agent.json' with { type: 'json' };
type TestUserIR = Omit<typeof _importedIR, "name" | "workflows" | "helpers"> & {
  name: "TestUser";
  workflows: undefined;
  helpers: undefined;
};
const agentIR = _importedIR as unknown as TestUserIR;
export type UserAccount = {
    name: string;
    age: number;
    is_student?: boolean;
    country: string;
}
export type TestUserInput = {

}

export type TestUserOutput = {
    name: string;
    age: number;
    country: string;
    is_student?: boolean;
}

export type TestUserContext = {

}

/** Custom intents defined in the DSL (if any) */
export type TestUserCustomIntents =
    | never;

/**
 * API keys required for TestUser
 */
export type TestUserApiKeys = {
    groq_apiApiKey: string;  // API key for custom provider 'groq-api'
}

// Defined explicitly (not via ReturnType) so RouterMiddleware can derive from it without circularity
export type TestUserAgent = import("@snrraptopack/auwgent-sdk").TypedAuwgent<
    typeof agentIR,
    TestUserCustomIntents,
    TestUserOutput,
    Record<string, never>
>;

/** Middleware object type — consistent with `TestUserAgent.onIntent` intent narrowing */
export type TestUserMiddleware<T extends import("@snrraptopack/auwgent-sdk").MiddlewareContext<typeof agentIR>['activeAgent'] = import("@snrraptopack/auwgent-sdk").MiddlewareContext<typeof agentIR>['activeAgent']> = import("@snrraptopack/auwgent-sdk").Middleware<
    typeof agentIR,
    TestUserCustomIntents,
    TestUserOutput,
    Record<string, never>,
    T
>;

export type TestUserConfig = {
    middleware?: TestUserMiddleware[];
    apiKeys: TestUserApiKeys;
}

export function createTestUser(config: TestUserConfig): TestUserAgent {
    return createAuwgent<
        typeof agentIR,
        TestUserCustomIntents,
        TestUserOutput,
        Record<string, never>
    >(agentIR, {
        tools: {} as Record<string, never>,
        middleware: config.middleware as any,
        apiKeys: config.apiKeys
    });
}

export const auwgent = createTestUser;
export type AuwgentTools = Record<string, never>;
export type AuwgentConfig = TestUserConfig;
export type AuwgentAgent = TestUserAgent;
export type AuwgentMiddleware = TestUserMiddleware;
export type AuwgentContext = TestUserContext;