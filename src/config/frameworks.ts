import { getPackages } from "../prompts/index.js";
import type { FrameworkConfig } from "../shared/types.js";

const commonSubDirs = [
  "src",
  "src/controllers",
  "src/services",
  "src/models",
  "src/utils",
  "src/schemas",
  "src/validators",
  "src/middlewares",
  "src/config",
];

export const frameworkConfig: Record<string, FrameworkConfig> = {
  express: {
    getPackages: getPackages("express"),
    subDirs: commonSubDirs,
  },
  fastify: {
    getPackages: getPackages("fastify"),
    subDirs: [...commonSubDirs, "src/plugins"],
  },
};
