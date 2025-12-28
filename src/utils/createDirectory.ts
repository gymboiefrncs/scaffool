import chalk from "chalk";
import fs from "fs-extra";
import { join } from "path";

export const makeDirectories = async (
  projectName: string,
  subDirs: string[]
) => {
  const dir = process.cwd();
  const options = {
    mode: 0o775,
  };
  const projectPath = join(dir, projectName);
  try {
    console.log(chalk.cyan("Creating directories..."));
    await fs.ensureDir(projectPath, options);

    await Promise.all(
      subDirs.map((sub) => fs.ensureDir(join(projectPath, sub), options))
    );

    console.log(chalk.cyan("Done creating directories\n"));
  } catch (err) {
    console.log(err);
  }
};
