import chalk from "chalk";
import fs from "fs-extra";
import { join } from "path";
import type { Data } from "../types.js";

export const createDirectories = async (data: Data): Promise<string> => {
  const { subDirs, answers } = data;

  const projectPath = join(process.cwd(), answers.projectName);
  const options = { mode: 0o775 };

  console.log(chalk.cyan("Creating directories..."));
  await fs.ensureDir(projectPath, options);
  await Promise.all(
    subDirs.map((sub) => fs.ensureDir(join(projectPath, sub), options)),
  );
  console.log(chalk.cyan("Done creating directories\n"));

  return projectPath;
};
