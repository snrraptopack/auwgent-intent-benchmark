import { z } from "zod";

// The file contains the shape, and it reference in normal ts for readbility

// type User = {
//     name: string;
//     age: number;
//     country: string;
//     is_student?: boolean;
// };

export const UserSchema = z.object({
    name: z.string(),
    age: z.number().int(),
    country: z.string(),
    is_student: z.boolean().optional()
}).strict();


// the compiled output that would be sent to model looks like this

/**
 *
 * {
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "name": {
      "type": "string"
    },
    "age": {
      "type": "integer"
    },
    "country": {
      "type": "string"
    },
    "is_student": {
      "type": "boolean"
    }
  },
  "required": ["name", "age", "country"]
}
 *
 */



// type UserAccount = {
//     user: {
//         id: string;
//         email: string;
//     };
//     account: {
//         plan: "free" | "pro" | "enterprise";
//         active: boolean;
//     };
// };


export const UserAccountSchema = z.object({
    person: z.object({
        id: z.string(),
        email: z.string().email()
    }).strict(),

    account: z.object({
        plan: z.enum(["free", "pro", "enterprise"]),
        active: z.boolean()
    }).strict()
}).strict();



// the compiled output that would be sent to model looks like this

/**
 *
 * {
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "person": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "id": {
          "type": "string"
        },
        "email": {
          "type": "string",
          "format": "email"
        }
      },
      "required": ["id", "email"]
    },
    "account": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "plan": {
          "type": "string",
          "enum": ["free", "pro", "enterprise"]
        },
        "active": {
          "type": "boolean"
        }
      },
      "required": ["plan", "active"]
    }
  },
  "required": ["person", "account"]
}
 */



// type Project = {
//     project_name: string;
//     tasks: {
//         title: string;
//         priority: "low" | "medium" | "high";
//         completed?: boolean;
//     }[];
// };



export const ProjectSchema = z.object({
    project_name: z.string(),

    tasks: z.array(
        z.object({
            title: z.string(),
            priority: z.enum(["low", "medium", "high"]),
            completed: z.boolean().optional()
        }).strict()
    )
}).strict();


// The compiled output


/**
 *
 * {
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "project_name": {
      "type": "string"
    },
    "tasks": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "title": {
            "type": "string"
          },
          "priority": {
            "type": "string",
            "enum": ["low", "medium", "high"]
          },
          "completed": {
            "type": "boolean"
          }
        },
        "required": ["title", "priority"]
      }
    }
  },
  "required": ["project_name", "tasks"]
}
 */
