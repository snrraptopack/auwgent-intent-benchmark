import { z } from "zod";
import { tool } from "ai";
import { tools80 } from "./tools80";

export const tools100 = {
    ...tools80,
    dns_resolve_a_record: tool({
        description: "resolve the first A record for a hostname",
        inputSchema: z.object({ hostname: z.string() }),
        execute: async (args) => "192.168.1.1"
    }),
    is_port_open: tool({
        description: "return true if a TCP port is open on a remote host",
        inputSchema: z.object({ host: z.string(), port: z.number() }),
        execute: async (args) => true
    }),
    get_ssl_expiry_days: tool({
        description: "return the number of days until the SSL certificate expires",
        inputSchema: z.object({ domain: z.string() }),
        execute: async (args) => 30
    }),
    send_sms: tool({
        description: "send an SMS message and confirm delivery",
        inputSchema: z.object({ to_phone: z.string().describe("E.164 format e.g. +233241234567"), message: z.string() }),
        execute: async (args) => true
    }),
    cache_set: tool({
        description: "store a value in cache with a TTL",
        inputSchema: z.object({ key: z.string(), value: z.string(), ttl_seconds: z.number() }),
        execute: async (args) => true
    }),
    cache_get: tool({
        description: "retrieve a cached value by key or return empty string",
        inputSchema: z.object({ key: z.string() }),
        execute: async (args) => "value"
    }),
    cache_delete: tool({
        description: "delete a key from the cache",
        inputSchema: z.object({ key: z.string() }),
        execute: async (args) => true
    }),
    get_feature_flag: tool({
        description: "evaluate a boolean feature flag for a user",
        inputSchema: z.object({ flag_key: z.string(), user_id: z.string() }),
        execute: async (args) => true
    }),
    get_feature_flag_value: tool({
        description: "evaluate a string-valued feature flag for a user",
        inputSchema: z.object({ flag_key: z.string(), user_id: z.string() }),
        execute: async (args) => "variant_a"
    }),
    check_permission: tool({
        description: "return true if user is permitted to perform the action on the resource",
        inputSchema: z.object({ user_id: z.string(), action: z.string(), resource: z.string() }),
        execute: async (args) => true
    }),
    get_secret: tool({
        description: "retrieve a secret value from a secrets manager",
        inputSchema: z.object({ secret_name: z.string(), vault: z.enum(["aws", "vault", "doppler"]) }),
        execute: async (args) => "super_secret"
    }),
    set_secret: tool({
        description: "store a secret in a secrets manager",
        inputSchema: z.object({ secret_name: z.string(), value: z.string(), vault: z.enum(["aws", "vault", "doppler"]) }),
        execute: async (args) => true
    }),
    get_job_status: tool({
        description: "return the current status of a background job",
        inputSchema: z.object({ job_id: z.string(), status: z.enum(["pending", "running", "done", "failed"]).optional() }), // Zod mapping
        execute: async (args) => "done"
    }),
    get_job_result: tool({
        description: "return the string output of a completed job",
        inputSchema: z.object({ job_id: z.string() }),
        execute: async (args) => "result"
    }),
    get_queue_depth: tool({
        description: "return the number of pending jobs in a queue",
        inputSchema: z.object({ queue_name: z.string() }),
        execute: async (args) => 5
    }),
    record_metric: tool({
        description: "record a numeric metric data point",
        inputSchema: z.object({ metric_name: z.string(), value: z.number() }),
        execute: async (args) => true
    }),
    get_metric_average: tool({
        description: "return the average metric value over a time window",
        inputSchema: z.object({ metric_name: z.string(), last_n_minutes: z.number() }),
        execute: async (args) => 10.5
    }),
    get_metric_max: tool({
        description: "return the max metric value over a time window",
        inputSchema: z.object({ metric_name: z.string(), last_n_minutes: z.number() }),
        execute: async (args) => 100
    }),
    is_metric_above_threshold: tool({
        description: "return true if the latest metric value exceeds the threshold",
        inputSchema: z.object({ metric_name: z.string(), threshold: z.number() }),
        execute: async (args) => true
    }),
    render_template: tool({
        description: "render a template string with context variables",
        inputSchema: z.object({ template: z.string().describe("Handlebars template string"), context_json: z.string().describe("JSON string of variables") }),
        execute: async (args) => "rendered"
    })
};
