import { z } from "zod";

// type Company = {
//     company: {
//         name: string;
//         departments: {
//             dept_name: string;
//             employees: {
//                 name: string;
//                 role: string;
//                 salary?: number;
//             }[];
//         }[];
//     };
// };




export const CompanySchema = z.object({
    company: z.object({
        name: z.string(),

        departments: z.array(
            z.object({
                dept_name: z.string(),

                employees: z.array(
                    z.object({
                        name: z.string(),
                        role: z.string(),
                        salary: z.number().optional()
                    }).strict()
                )
            }).strict()
        )
    }).strict()
}).strict();


/**
 * Compiled output
 *
 * {
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "company": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "name": {
          "type": "string"
        },
        "departments": {
          "type": "array",
          "items": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "dept_name": {
                "type": "string"
              },
              "employees": {
                "type": "array",
                "items": {
                  "type": "object",
                  "additionalProperties": false,
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "role": {
                      "type": "string"
                    },
                    "salary": {
                      "type": "number"
                    }
                  },
                  "required": ["name", "role"]
                }
              }
            },
            "required": ["dept_name", "employees"]
          }
        }
      },
      "required": ["name", "departments"]
    }
  },
  "required": ["company"]
}
 *
 */


// type Request =
//     | {
//         request_type: "booking";
//         payload: {
//             booking_id: string;
//             date: string; // ISO date
//             participants?: string[];
//         };
//     }
//     | {
//         request_type: "support";
//         payload: {
//             ticket_id: string;
//             issue_type: "billing" | "technical" | "general";
//             priority?: "low" | "medium" | "high";
//         };
//     };


const BookingPayload = z.object({
    booking_id: z.string(),
    date: z.string(),
    participants: z.array(z.string()).optional()
}).strict();

const SupportPayload = z.object({
    ticket_id: z.string(),
    issue_type: z.enum(["billing", "technical", "general"]),
    priority: z.enum(["low", "medium", "high"]).optional()
}).strict();

export const RequestSchema = z.discriminatedUnion("request_type", [
    // Variant 1: "booking" + your BookingPayload
    z.object({
        request_type: z.literal("booking"),
        payload: BookingPayload
    }).strict(),
    // Variant 2: "support" + your SupportPayload
    z.object({
        request_type: z.literal("support"),
        payload: SupportPayload
    }).strict()
]);

/**
 * 
 * {
  "oneOf": [
    {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "request_type": {
          "type": "string",
          "const": "booking"
        },
        "payload": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "booking_id": { "type": "string" },
            "date": { "type": "string", "format": "date" },
            "participants": { "type": "array", "items": { "type": "string" } }
          },
          "required": ["booking_id", "date"]
        }
      },
      "required": ["request_type", "payload"]
    },
    {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "request_type": {
          "type": "string",
          "const": "support"
        },
        "payload": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "ticket_id": { "type": "string" },
            "issue_type": { 
              "type": "string", 
              "enum": ["billing", "technical", "general"] 
            },
            "priority": { 
              "type": "string", 
              "enum": ["low", "medium", "high"] 
            }
          },
          "required": ["ticket_id", "issue_type"]
        }
      },
      "required": ["request_type", "payload"]
    }
  ]
}

 */