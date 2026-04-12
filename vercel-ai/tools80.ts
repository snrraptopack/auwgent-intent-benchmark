import { z } from "zod";
import { tool } from "ai";
import { tools60 } from "./tools60";

export const tools80 = {
    ...tools60,
    get_current_timestamp: tool({
        description: "return the current ISO 8601 timestamp in a timezone",
        inputSchema: z.object({ timezone: z.string().describe("IANA timezone e.g. Africa/Accra") }),
        execute: async (args) => "2024-05-30T12:00:00Z"
    }),
    format_date: tool({
        description: "format an ISO date string into a human-readable form",
        inputSchema: z.object({ iso_date: z.string(), format: z.enum(["short", "long", "iso", "relative"]) }),
        execute: async (args) => "May 30, 2024"
    }),
    days_between: tool({
        description: "return the number of days between two dates",
        inputSchema: z.object({ date_a: z.string().describe("ISO 8601 date"), date_b: z.string().describe("ISO 8601 date") }),
        execute: async (args) => 5
    }),
    is_past_date: tool({
        description: "return true if the date is in the past",
        inputSchema: z.object({ iso_date: z.string() }),
        execute: async (args) => false
    }),
    get_stock_price: tool({
        description: "get the latest stock price for a ticker symbol",
        inputSchema: z.object({ ticker: z.string() }),
        execute: async (args) => 150.25
    }),
    get_exchange_rate: tool({
        description: "return the current exchange rate between two currencies",
        inputSchema: z.object({ from_currency: z.string().describe("ISO 4217 code"), to_currency: z.string().describe("ISO 4217 code") }),
        execute: async (args) => 1.2
    }),
    calculate_compound_interest: tool({
        description: "calculate the final amount with compound interest",
        inputSchema: z.object({ principal: z.number(), annual_rate: z.number().describe("as a decimal e.g. 0.05"), years: z.number(), compounds_per_year: z.number() }),
        execute: async (args) => 1050
    }),
    get_github_default_branch: tool({
        description: "return the default branch name of a GitHub repository",
        inputSchema: z.object({ owner: z.string(), repo: z.string() }),
        execute: async (args) => "main"
    }),
    get_github_star_count: tool({
        description: "return the star count of a GitHub repository",
        inputSchema: z.object({ owner: z.string(), repo: z.string() }),
        execute: async (args) => 1000
    }),
    is_github_repo_public: tool({
        description: "return true if a GitHub repository is public",
        inputSchema: z.object({ owner: z.string(), repo: z.string() }),
        execute: async (args) => true
    }),
    get_github_issue_title: tool({
        description: "get the title of a GitHub issue by number",
        inputSchema: z.object({ owner: z.string(), repo: z.string(), issue_number: z.number() }),
        execute: async (args) => "Issue Title"
    }),
    run_lint: tool({
        description: "lint source code and return diagnostics as a JSON string",
        inputSchema: z.object({ source: z.string(), language: z.enum(["ts", "js", "py", "rs"]) }),
        execute: async (args) => "[]"
    }),
    format_code: tool({
        description: "return formatted source code",
        inputSchema: z.object({ source: z.string(), language: z.enum(["ts", "js", "py", "rs"]) }),
        execute: async (args) => "formatted code"
    }),
    count_lint_errors: tool({
        description: "return the number of lint errors in a source file",
        inputSchema: z.object({ source: z.string(), language: z.enum(["ts", "js", "py", "rs"]) }),
        execute: async (args) => 0
    }),
    is_code_valid_syntax: tool({
        description: "return true if the source has no syntax errors",
        inputSchema: z.object({ source: z.string(), language: z.enum(["ts", "js", "py", "rs"]) }),
        execute: async (args) => true
    }),
    geocode_address: tool({
        description: "convert a street address to a lat,lng string",
        inputSchema: z.object({ address: z.string() }),
        execute: async (args) => "37.7749,-122.4194"
    }),
    reverse_geocode: tool({
        description: "convert lat/lng coordinates to a readable address",
        inputSchema: z.object({ lat: z.number(), lng: z.number() }),
        execute: async (args) => "123 Main St"
    }),
    get_distance_km: tool({
        description: "return the straight-line distance in km between two coordinates",
        inputSchema: z.object({ lat_a: z.number(), lng_a: z.number(), lat_b: z.number(), lng_b: z.number() }),
        execute: async (args) => 10.5
    }),
    get_ip_country: tool({
        description: "return the country name for an IP address",
        inputSchema: z.object({ ip_address: z.string() }),
        execute: async (args) => "United States"
    }),
    is_private_ip: tool({
        description: "return true if the IP address is in a private range",
        inputSchema: z.object({ ip_address: z.string() }),
        execute: async (args) => false
    })
};
