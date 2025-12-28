import type { Packages } from "../commands/create.js";
import { runExpress } from "./expressGenerator.js";
import { runFastify } from "./fastifyGenerator.js";

type Answers = {
  projectName: string;
  useTypescript: boolean;
  LICENSE: string;
};

export const run = async (
  framework: string,
  packages: Packages[],
  subDirs: string[],
  answers: Answers,
  files: string[]
) => {
  switch (framework) {
    case "express":
      await runExpress("express", packages, answers, subDirs, files);
      break;
    case "fastify":
      await runFastify("fastify", packages, answers, subDirs, files);
  }
};
