import { Queue } from "bullmq";
import { env } from "../config/env.js";

export interface ExecutionJobPayload {
  actionId: string;
  tenantId: string;
}

export const executionQueue = new Queue<ExecutionJobPayload>("action-execution", {
  connection: {
    url: env.REDIS_URL
  },
  defaultJobOptions: {
    attempts: 3,
    removeOnComplete: true,
    removeOnFail: 500
  }
});
