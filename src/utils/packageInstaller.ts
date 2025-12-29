import { execa } from "execa";
import cliProgress from "cli-progress";

export const runCommand = async (
  label: string,
  args: string[],
  cwd: string,
  bar: cliProgress.SingleBar
) => {
  bar.update({ step: label });
  await execa("npm", args, { cwd, stdio: "pipe" });
  bar.increment();
};

export const installDependencies = async (
  label: string,
  pkgs: string[],
  cwd: string,
  dev: boolean,
  bar: cliProgress.SingleBar
) => {
  bar.update({ step: label });
  for (const pkg of pkgs) {
    await execa("npm", ["i", dev ? "-D" : "", pkg].filter(Boolean), {
      cwd,
      stdio: "pipe",
    });
    bar.increment();
  }
};
