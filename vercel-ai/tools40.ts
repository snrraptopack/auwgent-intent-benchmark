import { z } from "zod";
import { tool } from "ai";
import { tools20 } from "./tools";

import * as RootTools from "../tools";

export const tools40 = {
    ...tools20,
    get_meeting_title: tool({
        description: "get the title of a scheduled meeting",
        inputSchema: z.object({ event_id: z.string() }),
        execute: async (args: { event_id: string }) => "Meeting Title"
    }),
    check_meeting_exists: tool({
        description: "check whether a calendar event still exists",
        inputSchema: z.object({ event_id: z.string() }),
        execute: async (args: { event_id: string }) => true
    }),
    get_weather_summary: tool({
        description: "get a short weather summary for a city",
        inputSchema: z.object({ city: z.string(), unit: z.enum(["celsius", "fahrenheit"]) }),
        execute: async (args: { city: string, unit: string }) => await RootTools.get_weather_summary(args)
    }),
    get_temperature: tool({
        description: "get the current temperature for a city",
        inputSchema: z.object({ city: z.string(), unit: z.enum(["celsius", "fahrenheit"]) }),
        execute: async (args: { city: string, unit: string }) => 22
    }),
    is_raining: tool({
        description: "return true if it is currently raining in a city",
        inputSchema: z.object({ city: z.string() }),
        execute: async (args: { city: string }) => false
    }),
    get_uv_index: tool({
        description: "get the current UV index for a city",
        inputSchema: z.object({ city: z.string() }),
        execute: async (args: { city: string }) => 5
    }),
    search_web: tool({
        description: "run a web search and return a formatted result",
        inputSchema: z.object({ query: z.string(), num_results: z.number().describe("between 1 and 20") }),
        execute: async (args: { query: string, num_results: number }) => await RootTools.search_web(args)
    }),
    fetch_page_text: tool({
        description: "fetch the plain text content of a URL",
        inputSchema: z.object({ url: z.string() }),
        execute: async (args: { url: string }) => "Page text"
    }),
    check_url_reachable: tool({
        description: "return true if the URL responds with a 2xx status",
        inputSchema: z.object({ url: z.string() }),
        execute: async (args: { url: string }) => true
    }),
    get_page_title: tool({
        description: "extract the title tag from a webpage",
        inputSchema: z.object({ url: z.string() }),
        execute: async (args: { url: string }) => "Title"
    }),
    run_read_query: tool({
        description: "execute a SQL query and return results as JSON string",
        inputSchema: z.object({ sql: z.string().describe("read-only SELECT statement"), db_name: z.string() }),
        execute: async (args: { sql: string, db_name: string }) => "[{}]"
    }),
    count_rows: tool({
        description: "return the row count of a table",
        inputSchema: z.object({ table: z.string(), db_name: z.string() }),
        execute: async (args: { table: string, db_name: string }) => 100
    }),
    check_table_exists: tool({
        description: "check whether a table exists in a database",
        inputSchema: z.object({ table: z.string(), db_name: z.string() }),
        execute: async (args: { table: string, db_name: string }) => true
    }),
    write_file: tool({
        description: "write text content to a file",
        inputSchema: z.object({ path: z.string(), content: z.string() }),
        execute: async (args: { path: string, content: string }) => await RootTools.write_file(args)
    }),
    read_file: tool({
        description: "read the full text content of a file",
        inputSchema: z.object({ path: z.string() }),
        execute: async (args: { path: string }) => "File content"
    }),
    delete_file: tool({
        description: "delete a file from the filesystem",
        inputSchema: z.object({ path: z.string(), force: z.boolean() }),
        execute: async (args: { path: string, force: boolean }) => true
    }),
    file_exists: tool({
        description: "check whether a file exists at a path",
        inputSchema: z.object({ path: z.string() }),
        execute: async (args: { path: string }) => true
    }),
    get_file_size_bytes: tool({
        description: "return the size of a file in bytes",
        inputSchema: z.object({ path: z.string() }),
        execute: async (args: { path: string }) => 1024
    }),
    run_shell_command: tool({
        description: "execute a shell command and return combined stdout and stderr",
        inputSchema: z.object({ command: z.string().describe("bash command to run"), working_dir: z.string() }),
        execute: async (args: { command: string, working_dir: string }) => await RootTools.run_shell_command(args)
    }),
    get_exit_code: tool({
        description: "run a command and return only its exit code",
        inputSchema: z.object({ command: z.string() }),
        execute: async (args: { command: string }) => 0
    })
};
