import { promptUser } from "../prompts/index.js";
import { run } from "../generators/generator.js";
import { frameworks } from "../config/frameworks.js";
import chalk from "chalk";
import { logError, ValidationError } from "../shared/errors.js";
import cliProgress from "cli-progress";

export const createCommand = async (framework: string): Promise<void> => {
  const config = frameworks[framework];

  if (!config) {
    throw new ValidationError(
      `"${framework}" is not supported.\nSupported frameworks: ${Object.keys(frameworks).join(", ")}`,
    );
  }

  console.log(chalk.cyan("Creating project..."));

  const answers = await promptUser();
  const packages = await config.getPackages();

  const format = answers.useTypescript ? "ts" : "js";

  const data = {
    framework,
    packages,
    subDirs: config.subDirs,
    answers,
    files: [`src/app.${format}`, `src/server.${format}`],
  };

  let totalSteps = 5; // base steps: create dirs, create files, init git, init project, install framework
  if (answers.useTypescript) totalSteps += 2; // 1 for installing TS, 1 for initializing config
  totalSteps += data.packages.selectedDependencies.length;
  totalSteps += data.packages.selectedDevDependencies.length;

  const bar = new cliProgress.SingleBar({
    format: `${chalk.cyan("Setup")} |${chalk.green("{bar}")}| {percentage}% | {step}`,
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true,
  });

  bar.start(totalSteps, 0, { step: "Starting..." });
  await run(data, (step) => {
    bar.increment({ step });
  });
  bar.stop();

  console.log(chalk.green("Done creating project"));
  console.log(chalk.green.bold("Happy coding :)"));
};
