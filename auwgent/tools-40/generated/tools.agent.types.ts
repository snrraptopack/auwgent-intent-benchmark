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
    set_todo_priority: (args: { id: string, priority: "low" | "medium" | "high" }) => Promise<boolean>;
    count_todos: (args: { filter: "all" | "done" | "pending" }) => Promise<number>;
    get_user_name: (args: { user_id: string }) => Promise<string>;
    get_user_email: (args: { user_id: string }) => Promise<string>;
    update_user_email: (args: { user_id: string, new_email: string }) => Promise<boolean>;
    check_user_exists: (args: { user_id: string }) => Promise<boolean>;
    deactivate_user: (args: { user_id: string }) => Promise<boolean>;
    get_user_role: (args: { user_id: string }) => Promise<string>;
    assign_user_role: (args: { user_id: string, role: "admin" | "editor" | "viewer" }) => Promise<boolean>;
    send_email: (args: { to: string, subject: string, body: string }) => Promise<boolean>;
    get_email_subject: (args: { message_id: string }) => Promise<string>;
    mark_email_read: (args: { message_id: string }) => Promise<boolean>;
    delete_email: (args: { message_id: string }) => Promise<boolean>;
    schedule_meeting: (args: { title: string, start_iso: string, duration_minutes: number }) => Promise<string>;
    cancel_meeting: (args: { event_id: string, reason: string }) => Promise<boolean>;
    get_meeting_title: (args: { event_id: string }) => Promise<string>;
    check_meeting_exists: (args: { event_id: string }) => Promise<boolean>;
    get_weather_summary: (args: { city: string, unit: "celsius" | "fahrenheit" }) => Promise<string>;
    get_temperature: (args: { city: string, unit: "celsius" | "fahrenheit" }) => Promise<number>;
    is_raining: (args: { city: string }) => Promise<boolean>;
    get_uv_index: (args: { city: string }) => Promise<number>;
    search_web: (args: { query: string, num_results: number }) => Promise<string>;
    fetch_page_text: (args: { url: string }) => Promise<string>;
    check_url_reachable: (args: { url: string }) => Promise<boolean>;
    get_page_title: (args: { url: string }) => Promise<string>;
    run_read_query: (args: { sql: string, db_name: string }) => Promise<string>;
    count_rows: (args: { table: string, db_name: string }) => Promise<number>;
    check_table_exists: (args: { table: string, db_name: string }) => Promise<boolean>;
    write_file: (args: { path: string, content: string }) => Promise<boolean>;
    read_file: (args: { path: string }) => Promise<string>;
    delete_file: (args: { path: string, force: boolean }) => Promise<boolean>;
    file_exists: (args: { path: string }) => Promise<boolean>;
    get_file_size_bytes: (args: { path: string }) => Promise<number>;
    run_shell_command: (args: { command: string, working_dir: string }) => Promise<string>;
    get_exit_code: (args: { command: string }) => Promise<number>;
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