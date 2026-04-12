 
 Structured Output analysis
 
 groq("llama-3.3-70b-versatile") This returned an error message
 as a result of unsupported json schema output (DNF)

 
 1. shapeUser = {
    name: string;
    age: number;
    country: string;
    is_student?: boolean;
 };

 prompt: Generate a user profile for Hiroshi, a 21-year-old student from Japan.

 model type: "openai/gpt-oss-120b"
 Model Output (After `.nullable()` workaround):{
   "name": "Hiroshi",
   "age": 21,
   "country": "Japan",
   "is_student": true
 }
  
 Token Usage :{
    prompt_tokens: 216
    completion_tokens: 157
    total_tokens: 373
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
 
 model type: "openai/gpt-oss-120b"
 Model Output:{
  "person": {
    "id": "usr_777",
    "email": "shawn@example.com"
  },
  "account": {
    "plan": "pro",
    "active": true
  }
}
  
 Token Usage :{
    prompt_tokens: 277
    completion_tokens: 191
    totalTokens: 468,
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
 
 model type: "openai/gpt-oss-120b"
 Model Output: {
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
  
 Token Usage :{
    prompt_tokens: 280
    completion_tokens: 290
    total_tokens: 570
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
 
 model type: "openai/gpt-oss-120b"
 Model Output: {
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
  
 Token Usage :{
    prompt_tokens: 346
    completion_tokens: 328
    total_tokens: 674
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
 
 model type: "openai/gpt-oss-120b"
 Model Output: (DNF)
 Error: `AI_APICallError: invalid JSON schema for response_format: 'Request': schema must have type 'object' and not have 'oneOf'/'anyOf'/'enum'/'not' at the top level.`
 
 Finding:
 - Generating a Union type at the root schema (e.g., `Booking | Support`) throws a 400 rejection from the API when using Vercel AI SDK in Strict Structured Outputs mode.
 - Reason: OpenAI and Groq Strict mode strictly restricts schema roots to single, non-polymorphic objects. It enforces this so strictly that requests crash before getting to the model.
 - Auwgent Comparison: The Auwgent Engine natively processes polymorphic and Union outputs without these artificial schema limitations because it uses a non-restrictive Block Protocol (`[schema]...[/schema]`), dynamically extracting the correct intent format matched by the LLM.
