import { pino } from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  base: {
    service: process.env.SERVICE_NAME ?? "unknown"
  },
  timestamp: pino.stdTimeFunctions.isoTime
});

export function withTiming<T>(name: string, fn: () => Promise<T>): Promise<T> {
  const start = Date.now();
  return fn()
    .then((result) => {
      logger.info({ operation: name, durationMs: Date.now() - start }, "operation completed");
      return result;
    })
    .catch((error: unknown) => {
      logger.error(
        { operation: name, durationMs: Date.now() - start, error },
        "operation failed"
      );
      throw error;
    });
}
