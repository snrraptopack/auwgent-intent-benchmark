 Structured Output Analysis

1. shapeUser = {
    name: string;
    age: number;
    country: string;
    is_student?: boolean;
 };

prompt:Generate a user profile for Hiroshi, a 21-year-old student from Japan

"model":"qwen/qwen3-32b"
{
  "prompt_tokens": 189,
  "completion_tokens": 192,
  "total_tokens": 381
}
output {
  "country": "Japan",
  "age": 21,
  "name": "Hiroshi",
  "is_student": true
}

model:llama-3.3-70b-versatile
{
  "prompt_tokens": 200,
  "completion_tokens": 40,
  "total_tokens": 240,
},
output {
  "age": 21,
  "name": "Hiroshi",
  "is_student": true,
  "country": "Japan"
}
"model": "openai/gpt-oss-120b"
"aggregate": {
    "prompt_tokens": 244,
    "completion_tokens": 177,
    "total_tokens": 421,
    "reasoning_tokens": 141,
},
output {
  "name": "Hiroshi",
  "age": 21,
  "country": "Japan",
  "is_student": true
}


2. type UserAccount = {
    person: {
         id: string;
         email: string;
     };
     account: {
         plan: "free" | "pro" | "enterprise";
         active: boolean;
     };
};

prompt:Initialize a new Pro account for user 'usr_777' with the email 'shawn@example.com '. The account status should be set to active.

"model": "qwen/qwen3-32b"
{
    "prompt_tokens": 204,
    "completion_tokens": 257,
    "total_tokens": 461,
},
  output {
    "account": {
      "plan": "pro",
      "active": true
    },
    "person": {
      "id": "usr_777",
      "email": "shawn@example.com"
    }
  }

 "model": "llama-3.3-70b-versatile"
 {
     "prompt_tokens": 214,
     "completion_tokens": 46,
     "total_tokens": 260,
},

 output {
   "person": {
     "id": "usr_777",
     "email": "shawn@example.com"
   },
   "account": {
     "plan": "pro",
     "active": true
   }
 }

 "model": "openai/gpt-oss-120b"
 "aggregate": {
    "prompt_tokens": 258,
    "completion_tokens": 289,
    "total_tokens": 547,
    "reasoning_tokens": 247,
},

output {
  "person": {
    "id": "usr_777",
    "email": "shawn@example.com"
  },
  "account": {
    "active": true,
    "plan": "pro"
  }
}


3. type Project{
     project_name: string
     tasks: {
         title: string
         priority: "low" | "medium" | "high"
         completed?: boolean
     }[]
}

prompt: Create a project called 'Auwgent SDK Launch'. Include these three tasks:
'Write documentation' with high priority.
'Fix buffer bugs' with medium priority, which is already completed.
'Publish to npm' with low priority

"model": "qwen/qwen3-32b"
{
   "prompt_tokens": 220,
   "completion_tokens": 391,
   "total_tokens": 611,
 },

 output {
   "tasks": [
     {
       "title": "Write documentation",
       "priority": "high",
       "completed": false
     },
     {
       "title": "Fix buffer bugs",
       "priority": "medium",
       "completed": true
     },
     {
       "title": "Publish to npm",
       "priority": "low",
       "completed": false
     }
   ],

"model": "openai/gpt-oss-120b"
output {
  "tasks": [
    {
      "completed": false,
      "title": "Write documentation",
      "priority": "high"
    },
    {
      "title": "Fix buffer bugs",
      "completed": true,
      "priority": "medium"
    },
    {
      "completed": false,
      "title": "Publish to npm",
      "priority": "low"
    }
  ],
  "project_name": "Auwgent SDK Launch"
}

 "model": "llama-3.3-70b-versatile"

 {
     "prompt_tokens": 232,
     "completion_tokens": 85,
     "total_tokens": 317,
   },
 output {
   "tasks": [
     {
       "title": "Write documentation",
       "completed": false,
       "priority": "high"
     },
     {
       "priority": "medium",
       "title": "Fix buffer bugs",
       "completed": true
     },
     {
       "completed": false,
       "title": "Publish to npm",
       "priority": "low"
     }
   ],
   "project_name": "Auwgent SDK Launch"
  }


4. type Company {
     company: {
         name: string
         departments: {
             dept_name: string
             employees: {
                 name: string
                 role: string
                 salary?: number
             }[]
         }[]
     }
 }

prompt: Create a company called 'SnrRaptoPack'. It has two departments: 'Engineering' with employees 'Alice' (Lead Developer, salary 95000) and 'Bob' (Backend Engineer). The second department is 'Design' with one employee 'Clara' (UI Designer, salary 72000).`

 "model": "qwen/qwen3-32b"

  {
       "prompt_tokens": 252,
       "completion_tokens": 458,
       "total_tokens": 710,
    },

 output {
   "company": {
     "name": "SnrRaptoPack",
     "departments": [
       {
         "dept_name": "Engineering",
         "employees": [
           {
             "role": "Lead Developer",
             "salary": 95000,
             "name": "Alice"
           },
           {
             "salary": null,
             "role": "Backend Engineer",
             "name": "Bob"
           }
         ]
       },
       {
         "dept_name": "Design",
         "employees": [
           {
             "name": "Clara",
             "role": "UI Designer",
             "salary": 72000
           }
         ]
       }
     ]
   }
 }

"model": "llama-3.3-70b-versatile"
{
           "prompt_tokens": 258,
           "completion_tokens": 121,
           "total_tokens": 379,
}

output {
  "company": {
    "name": "SnrRaptoPack",
    "departments": [
      {
        "dept_name": "Engineering",
        "employees": [
          {
            "name": "Alice",
            "role": "Lead Developer",
            "salary": 95000
          },
          {
            "name": "Bob",
            "salary": null,
            "role": "Backend Engineer"
          }
        ]
      },
      {
        "employees": [
          {
            "salary": 72000,
            "name": "Clara",
            "role": "UI Designer"
          }
        ],
        "dept_name": "Design"
      }
    ]
  }
}

"model": "openai/gpt-oss-120b"
aggregate": {
      "prompt_tokens": 301,
      "completion_tokens": 518,
      "total_tokens": 819,
      "reasoning_tokens": 402,
   },

output {
  "company": {
    "name": "SnrRaptoPack",
    "departments": [
      {
        "dept_name": "Engineering",
        "employees": [
          {
            "name": "Alice",
            "salary": 95000,
            "role": "Lead Developer"
          },
          {
            "name": "Bob",
            "role": "Backend Engineer",
            "salary": null
          }
        ]
      },
      {
        "dept_name": "Design",
        "employees": [
          {
            "role": "UI Designer",
            "salary": 72000,
            "name": "Clara"
          }
        ]
      }
    ]
  }
}


5. This test for two differen shapes and check how reliable the model can pick the  correct shape
type Request =
     | {
         request_type: "booking";
         payload: {
             booking_id: string;             date: string; // ISO date
           participants?: string[];
         };
     }
     | {
         request_type: "support";
         payload: {
             ticket_id: string;
            issue_type: "billing" | "technical" | "general";
             priority?: "low" | "medium" | "high";
         };
     };


prompt A: Book a conference room for booking ID 'BK-2024-0412'. The date is 2024-05-20. Participants are Alice, Bob, and Clara."

"model": "qwen/qwen3-32b"
{
   "prompt_tokens": 258,
   "completion_tokens": 362,
   "total_tokens": 620,
 },

 output {
   "payload": {
     "date": "2024-05-20",
     "participants": [
       "Alice",
       "Bob",
       "Clara"
     ],
     "booking_id": "BK-2024-0412"
   },
   "request_type": "booking"
 }

 "model": "llama-3.3-70b-versatile"
 {
     "prompt_tokens": 262,
     "completion_tokens": 49,
     "total_tokens": 311,
   },
 output {
   "payload": {
     "date": "2024-05-20",
     "booking_id": "BK-2024-0412",
     "participants": [
       "Alice",
       "Bob",
       "Clara"
     ]
   },
   "request_type": "booking"
 }

"model": "openai/gpt-oss-120b"
"aggregate": {
    "prompt_tokens": 306,
    "completion_tokens": 272,
    "total_tokens": 578,
    "reasoning_tokens": 216,
},

output {
  "payload": {
    "date": "2024-05-20",
    "booking_id": "BK-2024-0412",
    "participants": [
      "Alice",
      "Bob",
      "Clara"
    ]
  },
  "request_type": "booking"
}


prompt B: I have a billing issue. My ticket ID is 'TIC-999'. Set the priority to medium.
 "model": "qwen/qwen3-32b"
output {
  "payload": {
    "priority": "medium",
    "ticket_id": "TIC-999",
    "issue_type": "billing"
  },
  "request_type": "support"
}

"aggregate": {
    "prompt_tokens": 238,
    "completion_tokens": 196,
    "total_tokens": 434,
},

 "model": "llama-3.3-70b-versatile"
output {
  "payload": {
    "ticket_id": "TIC-999",
    "issue_type": "billing",
    "priority": "medium"
  },
  "request_type": "support"
}

aggregate": {
    "prompt_tokens": 248,
    "completion_tokens": 35,
    "total_tokens": 283,
    "reasoning_tokens": 0,
  },

"model": "openai/gpt-oss-120b"
output {
  "payload": {
    "priority": "medium",
    "issue_type": "billing",
    "ticket_id": "TIC-999"
  },
  "request_type": "support"
}

{
    "prompt_tokens": 292,
    "completion_tokens": 215,
    "total_tokens": 507,
    "reasoning_tokens": 174,
  },


The qween models were using chain of thought <think> which made some of their token usage to skyrocket and wanst able to turn it off
