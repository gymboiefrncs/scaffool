import { userInputs } from "../prompts/common.js";
import { run } from "../generators/generator.js";
import { frameworkConfig, type FrameworkConfig } from "../utils/dirs.js";
import chalk from "chalk";
import { exitWithErr, handleError } from "../utils/errHandlers.js";

type Answers = {
  projectName: string;
  useTypescript: boolean;
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
  const config = frameworkConfig[framework];
  if (!config) {
    console.error(chalk.red.bold("Unsupported framework:"), framework);
    process.exit(1);
  }

  const [errAnswers, answers] = await handleError(userInputs());
  if (errAnswers) return exitWithErr("Failed to get user inputs", errAnswers);

  const [errPackages, packages] = await handleError(config.getPackages());
  if (errPackages) return exitWithErr("Failed to get packages", errPackages);

  const format = answers.useTypescript ? "ts" : "js";
  const files = [`src/app.${format}`, `src/server.${format}`];
  const subDirs = config.subDirs;
  const data = {
    framework,
    packages: packages,
    subDirs,
    answers: answers,
    files,
  };

  console.log(chalk.cyan("Creating project..."));

  await run(data);

  console.log(chalk.green("Done creating project"));
  console.log(chalk.green.bold("Happy coding :)"));
};
