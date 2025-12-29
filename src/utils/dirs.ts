import { userInputs } from "../prompts/common.js";
import { expressInputs } from "../prompts/express.js";
import { fastifyInputs } from "../prompts/fastify.js";
import type { Packages } from "../commands/create.js";

export const frameworkConfig: Record<
  string,
  {
    getPackages: () => Promise<Packages>;
    subDirs: string[];
  }
> = {
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
};
