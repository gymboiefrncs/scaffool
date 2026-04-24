import { promptUser } from "../prompts/index.js";
import { run } from "../generators/generator.js";
import { frameworks } from "../config/frameworks.js";
import chalk from "chalk";
import { logError, handleError } from "../shared/errors.js";

export const createCommand = async (framework: string): Promise<void> => {
  const config = frameworks[framework];
  if (!config) {
    return logError(
      "Unsupported framework",
      new Error(
        `"${framework}" is not supported.
        Supported frameworks: ${Object.keys(frameworks).join(", ")}`,
      ),
    );
  }

  const [errAnswers, answers] = await handleError(promptUser());
  if (errAnswers) return logError("Failed to get user inputs", errAnswers);

  const [errPackages, packages] = await handleError(config.getPackages());
  if (errPackages) return logError("Failed to get packages", errPackages);

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
  if (errRun) return logError("Failed to create project", errRun);

  console.log(chalk.green("Done creating project"));
  console.log(chalk.green.bold("Happy coding :)"));
};
