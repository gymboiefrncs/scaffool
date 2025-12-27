import { execa } from "execa";

type AllowedPackageManager = "yarn" | "pnpm" | "npm";

export const installPackages = async (
  projectPath: string,
  packages: string[],
  packageManager: AllowedPackageManager = "npm"
) => {
  await npmInit(projectPath, packageManager);

  if (!packages.length) return;

  await execa(packageManager, ["i", ...packages], {
    cwd: projectPath,
    stdio: "inherit",
  });
};

const npmInit = async (
  projectPath: string,
  packageManager: AllowedPackageManager = "npm"
) => {
  await execa(packageManager, ["init", "-y"], {
    cwd: projectPath,
    stdio: "inherit",
  });
};
