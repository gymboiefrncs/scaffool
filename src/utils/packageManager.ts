import chalk from "chalk";
import cliProgress from "cli-progress";
import type { Data } from "../types.js";
import { catchErrorEachStep } from "./errHandlers.js";
import { initializeTs } from "./initTs.js";
import { installDependencies, runCommand } from "./packageInstaller.js";

export const installPackages = async (
  data: Data,
  projectPath: string,
): Promise<void> => {
  const { framework, packages, answers } = data;

  const { devPkgs, regPkgs } = packages;

  // ==== progress bar ====
  let totalSteps = 2;
  if (answers.useTypescript) totalSteps++;
  totalSteps += regPkgs.length;
  totalSteps += devPkgs.length;

  const bar = new cliProgress.SingleBar({
    format: `${chalk.blue("Setup")} |${chalk.green(
      "{bar}",
    )}| {percentage}% | {step}`,
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true,
  });

  bar.start(totalSteps, 0, { step: "Starting..." });

  // ===== start installing =====
  await catchErrorEachStep("Initializing project", () =>
    runCommand("Initializing", ["init"], projectPath, bar),
  );

  await catchErrorEachStep(`Installing ${framework}`, () =>
    runCommand(
      `Installing ${framework}...`,
      ["add", `${framework}`],
      projectPath,
      bar,
    ),
  );

  if (answers.useTypescript) {
    await catchErrorEachStep("Installing Typescript", () =>
      runCommand(
        "Installing typescript",
        ["add", "-D", "typescript"],
        projectPath,
        bar,
      ),
    );
    await catchErrorEachStep("Initializing TypeScript config", () =>
      initializeTs(projectPath),
    );
  }

  if (regPkgs.length) {
    await catchErrorEachStep("Installing dependencies", () =>
      installDependencies(
        "Installing dependencies",
        regPkgs,
        projectPath,
        false,
        bar,
      ),
    );
  }

  if (devPkgs.length) {
    await catchErrorEachStep("Installing devDepndencies", () =>
      installDependencies(
        "Installing devDependencies",
        devPkgs,
        projectPath,
        true,
        bar,
      ),
    );
  }

  bar.stop();
  console.log(chalk.green(`\nProject setup complete!`));
};
