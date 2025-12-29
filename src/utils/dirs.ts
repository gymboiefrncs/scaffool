import { expressInputs } from "../prompts/express.js";
import { fastifyInputs } from "../prompts/fastify.js";
import type { Packages } from "../commands/create.js";

export type FrameworkConfig = {
  getPackages: () => Promise<Packages>;
  subDirs: string[];
};

// for generating directories
export const frameworkConfig: Record<string, FrameworkConfig> = {
  express: {
    getPackages: expressInputs,
    subDirs: [
      "src",
      "src/controllers",
      "src/services",
      "src/models",
      "src/utils",
      "src/schemas",
      "src/validators",
      "src/middlewares",
      "src/config",
    ],
  },
  fastify: {
    getPackages: fastifyInputs,
    subDirs: [
      "src",
      "src/controllers",
      "src/services",
      "src/models",
      "src/utils",
      "src/schemas",
      "src/validators",
      "src/middlewares",
      "src/config",
      "src/plugins",
    ],
  },
};
