import type { Packages } from "../commands/create.js";
import { createDirectories } from "../utils/createDirectory.js";
import { installPackages } from "../utils/packageManager.js";
import path from "node:path";

type Answers = {
  projectName: string;
  useTypescript: boolean;
  LICENSE: string;
};

export const runExpress = async (
  packages: Packages[],
  answers: Answers,
  subDirs: string[]
) => {
  await createDirectories(answers.projectName, subDirs);
  if (packages.length) {
    await installPackages(
      path.resolve(answers.projectName),
      packages,
      answers.useTypescript
    );
  }
};
