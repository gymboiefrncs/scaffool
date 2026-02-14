import { userInputs } from "../prompts/common.js";
import { run } from "../generators/generator.js";
import { frameworkConfig } from "../config/frameworks.js";
import chalk from "chalk";
import { exitWithErr, handleError } from "../utils/errHandlers.js";

export const createCommand = async (framework: string): Promise<void> => {
  const config = frameworkConfig[framework];
  if (!config) {
    return exitWithErr(
      "Unsupported framework",
      new Error(
        `"${framework}" is not supported. Use: ${Object.keys(frameworkConfig).join(", ")}`,
      ),
    );
  }

  const [errAnswers, answers] = await handleError(userInputs());
  if (errAnswers) return exitWithErr("Failed to get user inputs", errAnswers);

  const [errPackages, packages] = await handleError(config.getPackages());
  if (errPackages) return exitWithErr("Failed to get packages", errPackages);

  const format = answers.useTypescript ? "ts" : "js";
  const files = [`src/app.${format}`, `src/server.${format}`];
  const data = {
    framework,
    packages,
    subDirs: config.subDirs,
    answers,
    files,
  };

  console.log(chalk.cyan("Creating project..."));

  const [errRun] = await handleError(run(data));
  if (errRun) return exitWithErr("Failed to create project", errRun);

  console.log(chalk.green("Done creating project"));
  console.log(chalk.green.bold("Happy coding :)"));
};
