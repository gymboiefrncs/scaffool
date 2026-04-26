import { getPackages } from "../prompts/index.js";
import type { FrameworkConfig } from "../shared/types.js";

export const frameworks: Record<string, FrameworkConfig> = {
  express: {
    getPackages: getPackages("express"),
  },
  fastify: {
    getPackages: getPackages("fastify"),
  },
};
