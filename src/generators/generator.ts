import type { Packages } from "../commands/create.js";
import { runExpress } from "./expressGenerator.js";

type Answers = {
  projectName: string;
  useTypescript: boolean;
  LICENSE: string;
};

export const run = async (
  framework: string,
  packages: Packages[],
  answers: Answers
) => {
  switch (framework) {
    case "express":
      await runExpress(packages, answers);
  }
};
