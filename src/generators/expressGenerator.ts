import type { Packages } from "../commands/create.js";
import { makeDirectories } from "../utils/makeDirectory.js";
import { installPackages } from "../utils/packageManager.js";
import path from "node:path";

type Answers = {
  projectName: string;
  useTypescript: boolean;
  LICENSE: string;
};

export const runExpress = async (packages: Packages[], answers: Answers) => {
  await makeDirectories(answers.projectName);
  if (packages.length) {
    await installPackages(
      path.resolve(answers.projectName),
      packages,
      answers.useTypescript
    );
  }
};
