 Structured Output analysis

 1. shapeUser = {
    name: string;
    age: number;
    country: string;
    is_student?: boolean;
 };

prompt: Generate a user profile for Hiroshi, a 21-year-old student from Japan.

 model: "qwen/qwen3-32b",

AI_APICallError: This model does not support response format `json_schema`. See supported models at https://console.groq.com/docs/structured-outputs#supported-models

 model: "llama-3.3-70b-versatile",
This model does not support response format `json_schema`. See supported models at https://console.groq.com/docs/structured-outputs#supported-models

model:openai/gpt-oss-120b

Output: {
  "name": "Hiroshi",
  "age": 21,
  "country": "Japan",
  "is_student": true
}

{
    "prompt_tokens": 216,
    "completion_tokens": 165,
    "total_tokens": 381,
    "reasoning_tokens": 133
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

 prompt: Initialize a new Pro account for user 'usr_777' with the email 'shawn@example.com'. The account status should be set to active.


 Because the first case failed for the llama and the qwen subsequent will test for only gpt

Output: {
  "person": {
    "id": "usr_777",
    "email": "shawn@example.com"
  },
  "account": {
    "plan": "pro",
    "active": true
  }
}

{
  "prompt_tokens": 277,
  "completion_tokens": 168,
  "total_tokens": 445,
  "reasoning_tokens": 128
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

 Output: {
   "project_name": "Auwgent SDK Launch",
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
   ]
 }
 {
     "prompt_tokens": 280,
     "completion_tokens": 353,
     "total_tokens": 633,
     "reasoning_tokens": 289
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

 prompt: Create a company called 'SnrRaptoPack'. It has two departments: 'Engineering' with employees 'Alice' (Lead Developer, salary 95000) and 'Bob' (Backend Engineer). The second department is 'Design' with one employee 'Clara' (UI Designer, salary 72000).


 Output: {
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
             "role": "Backend Engineer",
             "salary": null
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
 {
     "prompt_tokens": 346,
     "completion_tokens": 304,
     "total_tokens": 650,
     "reasoning_tokens": 218
 }

5. Polymorphic / Union Types

 type Booking {
     request_type: "booking"
     payload: {
         booking_id: string
         date: string @desc "ISO date"
         participants?: string[]
     }
 }

 type Support {
     request_type: "support"
     payload: {
         ticket_id: string
         issue_type: "billing" | "technical" | "general"
         priority?: "low" | "medium" | "high"
     }
 }

 type Output = Booking | Support

 prompt: I have a billing issue. My ticket ID is 'TIC-999'. Set the priority to medium.


AI_APICallError: invalid JSON schema for response_format: 'Request': Invalid schema for function 'response_format: 'Request'': schema must have type 'object' and not have 'oneOf'/'anyOf'/'enum'/'not' at the top level.
