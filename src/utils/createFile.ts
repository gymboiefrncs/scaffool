import { join } from "node:path";
import fs, { ensureFile } from "fs-extra";
import { setupGit } from "./setupGit.js";
import chalk from "chalk";

export const createFiles = async (projectPath: string, files: string[]) => {
  try {
    await Promise.all(
      files.map((file) => fs.ensureFile(join(projectPath, file)))
    );
    console.log(chalk.blue("Setting up git..."));
    await setupGit(projectPath);
  } catch (err) {
    console.log(err);
  }
};
