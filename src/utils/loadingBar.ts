import { execa } from "execa";
import cliProgress from "cli-progress";
import type { AllowedPackageManager } from "./packageManager.js";

export const install = async (
  label: string,
  args: string[],
  cwd: string,
  manager: AllowedPackageManager,
  bar: cliProgress.SingleBar
) => {
  bar.update({ step: label });
  await execa(manager, args, { cwd, stdio: "pipe" });
  bar.increment();
};

export const installDependencies = async (
  label: string,
  pkgs: string[],
  cwd: string,
  manager: AllowedPackageManager,
  dev: boolean,
  bar: cliProgress.SingleBar
) => {
  bar.update({ step: label });
  await execa(manager, ["i", dev ? "-D" : "", ...pkgs].filter(Boolean), {
    cwd,
    stdio: "pipe",
  });
  bar.increment();
};
