import { z } from "zod";
import { tool } from "ai";
import { tools40 } from "./tools40";

export const tools60 = {
    ...tools40,
    translate_text: tool({
        description: "translate text into the target language",
        inputSchema: z.object({ text: z.string(), target_lang: z.string().describe("ISO 639-1 language code") }),
        execute: async (args) => "Translated text"
    }),
    detect_language: tool({
        description: "detect and return the language code of a text",
        inputSchema: z.object({ text: z.string() }),
        execute: async (args) => "en"
    }),
    summarize_text: tool({
        description: "return a summary within the word limit",
        inputSchema: z.object({ content: z.string(), max_words: z.number() }),
        execute: async (args) => "Summary text"
    }),
    count_words: tool({
        description: "count the number of words in a text",
        inputSchema: z.object({ text: z.string() }),
        execute: async (args) => 10
    }),
    is_spam: tool({
        description: "return true if the text is classified as spam",
        inputSchema: z.object({ text: z.string() }),
        execute: async (args) => false
    }),
    get_sentiment: tool({
        description: "classify the sentiment of a text",
        inputSchema: z.object({ text: z.string() }),
        execute: async (args) => "positive"
    }),
    render_markdown: tool({
        description: "convert markdown text to an HTML string",
        inputSchema: z.object({ markdown: z.string() }),
        execute: async (args) => "<p>HTML string</p>"
    }),
    extract_emails: tool({
        description: "extract all email addresses found in text as a JSON array string",
        inputSchema: z.object({ text: z.string() }),
        execute: async (args) => '["test@example.com"]'
    }),
    extract_urls: tool({
        description: "extract all URLs found in text as a JSON array string",
        inputSchema: z.object({ text: z.string() }),
        execute: async (args) => '["https://example.com"]'
    }),
    hash_string: tool({
        description: "hash a string and return the hex digest",
        inputSchema: z.object({ input: z.string(), algorithm: z.enum(["sha256", "sha512", "md5"]) }),
        execute: async (args) => "hashed_string"
    }),
    encode_base64: tool({
        description: "base64-encode a string",
        inputSchema: z.object({ value: z.string() }),
        execute: async (args) => "YmFzZTY0"
    }),
    decode_base64: tool({
        description: "decode a base64-encoded string",
        inputSchema: z.object({ encoded: z.string() }),
        execute: async (args) => "decoded string"
    }),
    generate_uuid: tool({
        description: "generate a new UUID of the given version",
        inputSchema: z.object({ version: z.enum(["v4", "v7"]) }),
        execute: async (args) => "123e4567-e89b-12d3-a456-426614174000"
    }),
    slugify: tool({
        description: "convert a string to a URL-friendly slug",
        inputSchema: z.object({ text: z.string() }),
        execute: async (args) => "url-friendly-slug"
    }),
    truncate_text: tool({
        description: "truncate text to a maximum character length",
        inputSchema: z.object({ text: z.string(), max_chars: z.number() }),
        execute: async (args) => "Truncated..."
    }),
    is_valid_email: tool({
        description: "return true if the email address is syntactically valid",
        inputSchema: z.object({ email: z.string() }),
        execute: async (args) => true
    }),
    is_valid_url: tool({
        description: "return true if the URL is syntactically valid",
        inputSchema: z.object({ url: z.string() }),
        execute: async (args) => true
    }),
    is_valid_json: tool({
        description: "return true if the string is valid JSON",
        inputSchema: z.object({ raw: z.string() }),
        execute: async (args) => true
    }),
    get_json_field: tool({
        description: "extract a field from a JSON string by key path",
        inputSchema: z.object({ json: z.string(), key_path: z.string().describe("dot-separated key path e.g. user.name") }),
        execute: async (args) => "Value"
    }),
    parse_csv_row_count: tool({
        description: "return the number of data rows in a CSV string",
        inputSchema: z.object({ csv_content: z.string() }),
        execute: async (args) => 5
    })
};
