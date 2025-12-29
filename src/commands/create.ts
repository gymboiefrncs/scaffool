import { userInputs } from "../prompts/common.js";
import { run } from "../generators/generator.js";
import { frameworkConfig, type FrameworkConfig } from "../utils/dirs.js";
import chalk from "chalk";

type Answers = {
  projectName: string;
  useTypescript: boolean;
  LICENSE: string;
};
export type Packages = {
  devPkgs: string[];
  regPkgs: string[];
};
export type Data = {
  framework: string;
  packages: Packages;
  subDirs: string[];
  answers: Answers;
  files: string[];
};

export const createCommand = async (framework: string) => {
  const answers = await userInputs();
  const config = frameworkConfig[framework];

  if (!config) throw new Error(`Unsupported framework: ${framework}`);

  const packages = await config.getPackages();

  const format = answers.useTypescript ? "ts" : "js";
  const files = [`src/app.${format}`, `src/server.${format}`];

  const subDirs = config.subDirs;

  const data = { framework, packages, subDirs, answers, files };

  console.log(chalk.cyan("Creating project..."));

  await run(data);

  console.log(chalk.green("Done creating project"));
  console.log(chalk.green.bold("Happy coding :)"));
};
