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
    console.log(chalk.blue("Creating directory..."));
    await fs.ensureDir(projectPath, options);
    console.log(chalk.green("Done creating directory"));
  } catch (err) {
    console.log(err);
  }
};
