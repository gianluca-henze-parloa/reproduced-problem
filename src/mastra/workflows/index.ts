
import { Step, Workflow } from '@mastra/core';
import { z } from 'zod';

const head_of_customer_experience_step = new Step({
    id: "head_of_customer_experience",
    description: "The head of customer experience will provide the company's vision and goals",
    execute: async ({ context }) => {
        console.log("head_of_customer_experience_step");
        return "";
    },
});

const ai_architect_manager_step = new Step({
    id: "ai_architect_manager",
    description: "The AI architect manager will design the overall architecture",
    execute: async ({ context }) => {
        console.log("ai_architect_manager_step");
        return "";
    },
});

const researcher_step = new Step({
    id: "researcher",
    description: "The researcher will gather relevant information",
    execute: async ({ context }) => {
        console.log("researcher_step");
        return "";
    },
});

const role_builder_step = new Step({
    id: "role_builder",
    description: "The role builder will define the agent's role",
    execute: async ({ context }) => {
        console.log("role_builder_step");
        return "";
    },
});

const tone_builder_step = new Step({
    id: "tone_builder",
    description: "The tone builder will establish the agent's tone",
    execute: async ({ context }) => {
        console.log("tone_builder_step");
        return "";
    },
});

const instruction_builder_step = new Step({
    id: "instruction_builder",
    description: "The instruction builder will create guidelines for the agent",
    execute: async ({ context }) => {
        console.log("instruction_builder_step");
        return "";
    },
});

const finish_persona_step = new Step({
    id: "finish_persona",
    description: "Finalize the agent's persona",
    execute: async ({ context }) => {
        console.log("finish_persona_step");
        return "";
    },
});

const ai_engineering_manager_step = new Step({
    id: "ai_engineering_manager",
    description: "The AI engineering manager will oversee skill implementation",
    execute: async ({ context }) => {
        console.log("ai_engineering_manager_step");
        return "";
    },
});

const skill_prompter_step = new Step({
    id: "skill_prompter",
    description: "The skill prompter will define required skills",
    execute: async ({ context }) => {
        console.log("skill_prompter_step");
        return "";
    },
});

const skill_engineer_step = new Step({
    id: "skill_engineer",
    description: "The skill engineer will implement the skills",
    execute: async ({ context }) => {
        console.log("skill_engineer_step");
        return "";
    },
});

const post_skill_prompter_step = new Step({
    id: "post_skill_prompter",
    description: "The post skill prompter will refine the skills",
    execute: async ({ context }) => {
        console.log("post_skill_prompter_step");
        return "";
    },
});

const finish_skills_step = new Step({
    id: "finish_skills",
    description: "Finalize the agent's skills",
    execute: async ({ context }) => {
        console.log("finish_skills_step");
        return "";
    },
});

const simulation = new Step({
    id: "simulation",
    description: "Run a simulation of the agent",
    execute: async ({ context }) => {
        console.log("simulation_step");
        return "";
    },
});

const evaluation = new Step({
    id: "evaluation",
    description: "Evaluate the agent's performance",
    execute: async ({ context }) => {
        console.log("evaluation_step");
        return "retry";
    },
});

const finalizeData = new Step({
    id: "finalizeData",
    description: "Finalize the data",
    execute: async ({ context }) => {
        console.log("finalizeData_step");
        return "";
    },
});

const senseiWorkflow = new Workflow({
    name: "sensei-workflow",
    triggerSchema: z.object({
      company: z.string().describe("The name of the company"),
      language: z.string().describe("The language of the company"),
      role: z.string().describe("The role of the company"),
      tone: z.array(z.string()).describe("The tone of the company"),
      skills: z
        .array(
          z.object({
            type: z.string(),
            name: z.string(),
            requirements: z.string().optional(),
            sipuri: z.string().optional(),
            demo: z.boolean().describe("Whether to run the demo"),
            apiEndpoint: z
              .array(
                z.object({
                  endpoint: z.string().optional(),
                  authorization: z.string().optional(),
                  method: z.string().optional(),
                })
              )
              .optional(),
          })
        )
        .describe("The skills the Agent of the company should have"),
      customRequirements: z.string().describe("Any additional requirements for the agent"),
    }),
  })
    // Initial run from head_of_customer_experience to evaluation
    .step(head_of_customer_experience_step)
    .after(head_of_customer_experience_step)
    .step(ai_architect_manager_step)
    .then(researcher_step)
    .then(role_builder_step)
    .then(tone_builder_step)
    .then(instruction_builder_step)
    .then(finish_persona_step)
    .after(head_of_customer_experience_step)
    .step(ai_engineering_manager_step)
    .then(skill_prompter_step)
    .then(skill_engineer_step)
    .then(post_skill_prompter_step)
    .then(finish_skills_step)
    .after([finish_persona_step, finish_skills_step])
    .step(simulation)
    .then(evaluation)
    .while(async ({ context }) => {
      const evaluation_status = context.steps.evaluation.status === "success" && context.steps.evaluation.output === "retry";
      return evaluation_status;
    }, head_of_customer_experience_step)
    .then(finalizeData);
  
  senseiWorkflow.commit();
  
  export { senseiWorkflow };
  
