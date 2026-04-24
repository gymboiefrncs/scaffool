import chalk from "chalk";
import cliProgress from "cli-progress";
import type { Data } from "../shared/types.js";
import { runStep } from "../shared/errors.js";
import { installDependencies, runCommand } from "./installer.js";
import { execa } from "execa";

const initializeTypeScript = async (projectPath: string): Promise<void> => {
  await execa("pnpm", ["exec", "tsc", "--init"], { cwd: projectPath });
};

export const installPackages = async (
  data: Data,
  projectPath: string,
): Promise<void> => {
  const { framework, packages, answers } = data;

  const { selectedDevDependencies, selectedDependencies } = packages;

  // ==== progress bar ====
  let totalSteps = 2;
  if (answers.useTypescript) totalSteps++;
  totalSteps += selectedDependencies.length;
  totalSteps += selectedDevDependencies.length;

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
  await runStep("Initializing project", () =>
    runCommand("Initializing", ["init"], projectPath, bar),
  );

  await runStep(`Installing ${framework}`, () =>
    runCommand(
      `Installing ${framework}...`,
      ["add", `${framework}`],
      projectPath,
      bar,
    ),
  );

  if (answers.useTypescript) {
    await runStep("Installing Typescript", () =>
      runCommand(
        "Installing typescript",
        ["add", "-D", "typescript"],
        projectPath,
        bar,
      ),
    );
    await runStep("Initializing TypeScript config", () =>
      initializeTypeScript(projectPath),
    );
  }

  if (selectedDependencies.length) {
    await runStep("Installing dependencies", () =>
      installDependencies(
        "Installing dependencies",
        selectedDependencies,
        projectPath,
        false,
        bar,
      ),
    );
  }

  if (selectedDevDependencies.length) {
    await runStep("Installing devDepndencies", () =>
      installDependencies(
        "Installing devDependencies",
        selectedDevDependencies,
        projectPath,
        true,
        bar,
      ),
    );
  }

  bar.stop();
  console.log(chalk.green(`\nProject setup complete!`));
};
