import { createLogger } from "@mastra/core";
import { Mastra } from "@mastra/core";
import { senseiWorkflow } from "./workflows";

export const mastra = new Mastra({
    workflows: { senseiWorkflow },
    logger: createLogger({
      name: 'Mastra',
      level: 'info',
    }),
  });   