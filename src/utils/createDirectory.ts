import chalk from "chalk";
import fs from "fs-extra";
import { join } from "path";
import { createFiles } from "./createFile.js";
import type { Data } from "../commands/create.js";

export const createDirectories = async (data: Data) => {
  const { subDirs, answers, files }: Data = data;

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
    console.log(chalk.cyan("Done creating directories\n"));
  } catch (err) {
    console.log(err);
  }
};
