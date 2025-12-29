import { userInputs } from "../prompts/common.js";
import { run } from "../generators/generator.js";
import { frameworkConfig } from "../utils/dirs.js";

import chalk from "chalk";

export type Packages = {
  devPkgs: string[];
  regPkgs: string[];
};

export const createCommand = async (framework: string) => {
  const answers = await userInputs();
  const config = frameworkConfig[framework];

  if (!config) throw new Error(`Unsupported framework: ${framework}`);

  const packages: Packages[] = [await config.getPackages()];

  const format = answers.useTypescript ? "ts" : "js";
  const files = [`src/app.${format}`, `src/server.${format}`];

  console.log(chalk.cyan("Creating project..."));
  await run(framework, packages, config.subDirs, answers, files);

  console.log(chalk.green("Done creating project"));
  console.log(chalk.green.bold("Happy coding :)"));
};
