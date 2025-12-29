import cliProgress from "cli-progress";
import chalk from "chalk";
import { runCommand, installDependencies } from "./packageInstaller.js";
import { initializeTs } from "./initTs.js";
import type { Data } from "../commands/create.js";
import path from "node:path";

export const installPackages = async (data: Data) => {
  const { framework, packages, answers } = data;

  const { devPkgs, regPkgs } = packages;

  const projectPath = path.join(answers.projectName);

  // ==== progress bar ====
  let totalSteps = 2;
  if (answers.useTypescript) totalSteps++;
  totalSteps += regPkgs.length;
  totalSteps += devPkgs.length;

  const bar = new cliProgress.SingleBar({
    format: `${chalk.blue("Setup")} |${chalk.green(
      "{bar}"
    )}| {percentage}% | {step}`,
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true,
  });

  bar.start(totalSteps, 0, { step: "Starting..." });

  // ===== start installing =====
  await runCommand("Initializing", ["init", "-y"], projectPath, bar);
  await runCommand(
    `Installing ${framework}...`,
    ["i", `${framework}`],
    projectPath,
    bar
  );
  if (answers.useTypescript) {
    await runCommand(
      "Installing typescript",
      ["i", "-D", "typescript"],
      projectPath,
      bar
    );
    await initializeTs(projectPath);
  }

  if (regPkgs.length) {
    await installDependencies(
      "Installing dependencies",
      regPkgs,
      projectPath,
      false,
      bar
    );
  }

  if (devPkgs.length) {
    await installDependencies(
      "Installing devDependencies",
      devPkgs,
      projectPath,
      true,
      bar
    );
  }

  bar.stop();
  console.log(chalk.green(`\nProject setup complete!`));
};
