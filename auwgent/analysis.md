 Structured Output Analysis
 "llama-3.3-70b-versatile"

1. shapeUser = {
    name: string;
    age: number;
    country: string;
    is_student?: boolean;
 };

 prompt : Generate a user profile for Hiroshi, a 21-year-old student from Japan.

 model type :  "llama-3.3-70b-versatile"
 Model output:{"age":21,"country":"Japan","is_student":true,"name":"Hiroshi"}
 tokens: { prompt_tokens: 192, completion_tokens: 40, total_tokens: 232, },

 model type : openai/gpt-oss-120b
 model output:  { "country": "Japan", "is_student": true, "age": 21, "name": "Hiroshi" }
 token usage:  { prompt_tokens: 236, completion_tokens: 177, total_tokens: 413,},

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

prompt: Initialize a new Pro account for user 'usr_777' with the email 'shawn@example.com '. The account status should be set to active.

model type: "llama-3.3-70b-versatile"
model output: { "account": { "plan": "pro", "active": true }, "person": { "email": "shawn@example.com", "id": "usr_777"}}
token usage: {
    prompt_tokens: 212,
    completion_tokens: 47,
    total_tokens: 259,
  },


model type: openai/gpt-oss-120b
model output: { "person": { "id": "usr_777", "email": "shawn@example.com" }, "account": { "active": true, "plan": "pro" }}
token usage:token usage: {
    prompt_tokens: 256,
    completion_tokens: 145,
    total_tokens: 401,
  },

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

model type:"llama-3.3-70b-versatile"
model output:  {
 "project_name": "Auwgent SDK Launch",
 "tasks": [
   {
     "completed": false,
     "title": "Write documentation",
     "priority": "high"
   },
   {
     "title": "Fix buffer bugs",
     "priority": "medium",
     "completed": true
   },
   {
     "priority": "low",
     "completed": false,
     "title": "Publish to npm"
   }
 ]
}

token usage:{
    prompt_tokens: 230,
    completion_tokens: 86,
    total_tokens: 316,
  }

model type: openai/gpt-oss-120b
model output: {
  "project_name": "Auwgent SDK Launch",
  "tasks": [
    {
      "title": "Write documentation",
      "priority": "high",
      "completed": false
    },
    {
      "title": "Fix buffer bugs",
      "completed": true,
      "priority": "medium"
    },
    {
      "priority": "low",
      "completed": false,
      "title": "Publish to npm"
    }
  ]
}

token usage: {
    prompt_tokens: 274,
    completion_tokens: 382,
    total_tokens: 656,
  },

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

prompt: Create a company called 'SnrRaptoPack'. It has two departments: 'Engineering' with employees 'Alice' (Lead Developer, salary 95000) and 'Bob' (Backend Engineer). The second department is 'Design' with one employee 'Clara' (UI Designer, salary 72000).

model type:"llama-3.3-70b-versatile"
model output: {
  "company": {
    "departments": [
      {
        "employees": [
          {
            "salary": 95000,
            "name": "Alice",
            "role": "Lead Developer"
          },
          {
            "name": "Bob",
            "role": "Backend Engineer",
            "salary": null
          }
        ],
        "dept_name": "Engineering"
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
    ],
    "name": "SnrRaptoPack"
  }
}
token usage  {
   prompt_tokens: 256,
   completion_tokens: 113,
   total_tokens: 369,
 },

model type:openai/gpt-oss-120b
model output: {"company": {
    "name": "SnrRaptoPack",
    "departments": [
      {
        "dept_name": "Engineering",
        "employees": [
          {
            "salary": 95000,
            "name": "Alice",
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
        "employees": [
          {
            "name": "Clara",
            "salary": 72000,
            "role": "UI Designer"
          }
        ],
        "dept_name": "Design"
      }
    ]
  }
}
token usage:   {
   prompt_tokens: 299,
   completion_tokens: 507,
   total_tokens: 806,
 },


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

model type: "llama-3.3-70b-versatile"
modek output: {
  "request_type": "booking",
  "payload": {
    "booking_id": "BK -2024-0412",
    "participants": [
      "Alice",
      "Bob",
      "Clara"
    ],
    "date": "2024-05-20"
  }

token usage :  {
   prompt_tokens: 253,
   completion_tokens: 59,
   total_tokens: 312,
 }

 model type:openai/gpt-oss-120b
 model output: {
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
 token usage:  { prompt_tokens: 297, completion_tokens: 133, total_tokens: 430,}

prompt B: I have a billing issue. My ticket ID is 'TIC-999'. Set the priority to medium.

model type:"llama-3.3-70b-versatile"
model output: {
  "payload": {
    "priority": "medium",
    "ticket_id": "TIC",
    "issue_type": "billing"
  },
  "request_type": "support"
}
token usage: {
    prompt_tokens: 239,
    completion_tokens: 46,
    total_tokens: 285,
  },

model type:openai/gpt-oss-120b
model output: {
 "payload": {
   "issue_type": "billing",
   "priority": "medium",
   "ticket_id": "TIC-999"
 },
 "request_type": "support"
}

token usage: { prompt_tokens: 283, completion_tokens: 146, total_tokens: 429,}
