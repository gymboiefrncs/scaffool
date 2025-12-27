import cliProgress from "cli-progress";
import chalk from "chalk";
import { install, installDependencies } from "./loadingBar.js";
import type { Packages } from "../commands/create.js";

export type AllowedPackageManager = "yarn" | "pnpm" | "npm";

export const installPackages = async (
  projectPath: string,
  packages: Packages[],
  useTypescript: boolean,
  packageManager: AllowedPackageManager = "npm"
) => {
  const { devPkgs, regPkgs } = packages[0]!;

  let totalSteps = 1;
  if (useTypescript) totalSteps++;
  if (regPkgs.length) totalSteps++;
  if (devPkgs.length) totalSteps++;

  const bar = new cliProgress.SingleBar({
    format: `${chalk.blue("Setup")} |{bar}| {percentage}% | {step}`,
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true,
  });

  bar.start(totalSteps, 0, { step: "Starting..." });

  await install(
    "Initializing",
    ["init", "-y"],
    projectPath,
    packageManager,
    bar
  );

  if (useTypescript) {
    await install(
      "Installing typescript",
      ["i", "-D", "typescript"],
      projectPath,
      packageManager,
      bar
    );
  }

  if (regPkgs.length) {
    await installDependencies(
      "Installing dependencies",
      regPkgs,
      projectPath,
      packageManager,
      false,
      bar
    );
  }

  if (devPkgs.length) {
    await installDependencies(
      "Installing devDependencies",
      devPkgs,
      projectPath,
      packageManager,
      true,
      bar
    );
  }

  bar.stop();
  console.log(chalk.green(`\nProject setup complete!`));
};
