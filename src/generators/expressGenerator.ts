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
  framework: string,
  packages: Packages[],
  answers: Answers,
  subDirs: string[],
  files: string[]
) => {
  await createDirectories(answers.projectName, subDirs, files);
  if (packages.length) {
    await installPackages(
      framework,
      path.resolve(answers.projectName),
      packages,
      answers.useTypescript
    );
  }
};
