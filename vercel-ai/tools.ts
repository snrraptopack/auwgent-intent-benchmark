import { tool } from "ai";
import { z } from "zod";
import * as RootTools from "../tools/index";

export const tools2 = {
    create_todo: tool({
        description: "create a new todo and return its id",
        inputSchema: z.object({
            title: z.string(),
            due_date: z.string().describe("ISO 8601 date string"),
            priority: z.enum(["low", "medium", "high"])
        }),
        execute: async (args: { title: string, due_date: string, priority: "low" | "medium" | "high" }) => {
            return await RootTools.create_todo(args);
        }
    }),
    read_todo: tool({
        description: "read the content of a todo by its id",
        inputSchema: z.object({
            id: z.string()
        }),
        execute: async (args: { id: string }) => {
            return await RootTools.read_todo(args);
        }
    })
};

export const tools5 = {
    ...tools2,
    delete_todo: tool({
        description: "permanently delete a todo by id",
        inputSchema: z.object({
            id: z.string()
        }),
        execute: async (args: { id: string }) => {
            return true; // dummy execution
        }
    }),
    mark_todo_done: tool({
        description: "mark a todo as completed",
        inputSchema: z.object({
            id: z.string()
        }),
        execute: async (args: { id: string }) => {
            return true; // dummy execution
        }
    }),
    update_todo_title: tool({
        description: "rename a todo item",
        inputSchema: z.object({
            id: z.string(),
            new_title: z.string()
        }),
        execute: async (args: { id: string, new_title: string }) => {
            return true; // dummy execution
        }
    })
};

export const tools10 = {
    ...tools5,
    set_todo_priority: tool({
        description: "change the priority of a todo",
        inputSchema: z.object({
            id: z.string(),
            priority: z.enum(["low", "medium", "high"])
        }),
        execute: async (args: { id: string, priority: "low" | "medium" | "high" }) => {
            return true; // dummy execution
        }
    }),
    count_todos: tool({
        description: "count todos matching a status filter",
        inputSchema: z.object({
            filter: z.enum(["all", "done", "pending"])
        }),
        execute: async (args: { filter: "all" | "done" | "pending" }) => {
            return 1; // dummy execution
        }
    }),
    get_user_name: tool({
        description: "get the display name of a user",
        inputSchema: z.object({
            user_id: z.string()
        }),
        execute: async (args: { user_id: string }) => {
            return "Alice"; // dummy execution
        }
    }),
    get_user_email: tool({
        description: "get the email address of a user",
        inputSchema: z.object({
            user_id: z.string()
        }),
        execute: async (args: { user_id: string }) => {
            return "user@example.com"; // dummy execution
        }
    }),
    update_user_email: tool({
        description: "update the email address for a user",
        inputSchema: z.object({
            user_id: z.string(),
            new_email: z.string()
        }),
        execute: async (args: { user_id: string, new_email: string }) => {
            return true; // dummy execution
        }
    })
};

export const tools20 = {
    ...tools10,
    check_user_exists: tool({
        description: "check whether a user account exists",
        inputSchema: z.object({ user_id: z.string() }),
        execute: async (args: { user_id: string }) => true
    }),
    deactivate_user: tool({
        description: "deactivate a user account",
        inputSchema: z.object({ user_id: z.string() }),
        execute: async (args: { user_id: string }) => await RootTools.deactivate_user(args)
    }),
    get_user_role: tool({
        description: "return the role assigned to a user",
        inputSchema: z.object({ user_id: z.string() }),
        execute: async (args: { user_id: string }) => "admin"
    }),
    assign_user_role: tool({
        description: "assign a role to a user",
        inputSchema: z.object({ user_id: z.string(), role: z.enum(["admin", "editor", "viewer"]) }),
        execute: async (args: { user_id: string, role: string }) => true
    }),
    send_email: tool({
        description: "send an email and confirm delivery",
        inputSchema: z.object({ to: z.string(), subject: z.string(), body: z.string() }),
        execute: async (args: { to: string, subject: string, body: string }) => await RootTools.send_email(args)
    }),
    get_email_subject: tool({
        description: "return the subject line of an email",
        inputSchema: z.object({ message_id: z.string() }),
        execute: async (args: { message_id: string }) => "Subject"
    }),
    mark_email_read: tool({
        description: "mark an email message as read",
        inputSchema: z.object({ message_id: z.string() }),
        execute: async (args: { message_id: string }) => true
    }),
    delete_email: tool({
        description: "delete an email by its message id",
        inputSchema: z.object({ message_id: z.string() }),
        execute: async (args: { message_id: string }) => true
    }),
    schedule_meeting: tool({
        description: "schedule a meeting and return its event id",
        inputSchema: z.object({ title: z.string(), start_iso: z.string().describe("ISO 8601 datetime"), duration_minutes: z.number() }),
        execute: async (args: { title: string, start_iso: string, duration_minutes: number }) => await RootTools.schedule_meeting(args)
    }),
    cancel_meeting: tool({
        description: "cancel a calendar event",
        inputSchema: z.object({ event_id: z.string(), reason: z.string() }),
        execute: async (args: { event_id: string, reason: string }) => true
    })
};
