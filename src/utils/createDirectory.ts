import chalk from "chalk";
import fs from "fs-extra";
import { join } from "path";
import { createFiles } from "./createFile.js";
import { initializeTs } from "./initTs.js";
import type { Answers } from "../generators/expressGenerator.js";

export const createDirectories = async (
  answers: Answers,
  subDirs: string[],
  files: string[]
) => {
  const dir = process.cwd();
  const options = {
    mode: 0o775,
  };
  const projectPath = join(dir, answers.projectName);
  try {
    console.log(chalk.cyan("Creating directories..."));
    await fs.ensureDir(projectPath, options);

    await Promise.all(
      subDirs.map((sub) => fs.ensureDir(join(projectPath, sub), options))
    );
    await createFiles(projectPath, files);

    if (answers.useTypescript) await initializeTs(projectPath);

    console.log(chalk.cyan("Done creating directories\n"));
  } catch (err) {
    console.log(err);
  }
};
