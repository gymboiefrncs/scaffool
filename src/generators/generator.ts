import chalk from "chalk";
import fs from "fs-extra";
import { join } from "path";

export const makeDirectories = async (projectName: string) => {
  const dir = process.cwd();
  const options = {
    mode: 0o775,
  };
  const projectPath = join(dir, projectName);
  try {
    console.log(chalk.cyan("Creating directory..."));
    await fs.ensureDir(projectPath, options);
    console.log(chalk.cyan("Done creating directory\n"));
  } catch (err) {
    console.log(err);
  }
};
