import cliProgress from "cli-progress";
import { execa } from "execa";
import { DependencyError, ProcessError } from "../shared/errors.js";

export const runCommand = async (
  args: string[],
  cwd: string,
): Promise<void> => {
  try {
    await execa("pnpm", args, { cwd, stdio: "pipe" });
  } catch (error) {
    throw new ProcessError(`Failed to run: ${args.join(" ")}`, {
      error: error instanceof Error ? error : undefined,
    });
  }
};

export const installDependencies = async (
  pkgs: string[],
  cwd: string,
  dev: boolean,
  onProgress: (step: string) => void,
): Promise<void> => {
  for (const pkg of pkgs) {
    try {
      await execa("pnpm", ["add", dev ? "-D" : "", pkg].filter(Boolean), {
        cwd,
        stdio: "pipe",
      });
    } catch (error) {
      throw new DependencyError(`Failed to install package: ${pkg}`, {
        error: error instanceof Error ? error : undefined,
        step: `install-${dev ? "devDependency" : "dependency"}`,
      });
    }
    onProgress(`Installed ${pkg}`);
  }
};
