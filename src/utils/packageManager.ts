import { execa } from "execa";
import type { Packages } from "../commands/create.js";

type AllowedPackageManager = "yarn" | "pnpm" | "npm";

export const installPackages = async (
  projectPath: string,
  packages: Packages[],
  useTypescript: boolean,
  packageManager: AllowedPackageManager = "npm"
) => {
  await npmInit(projectPath, packageManager);

  if (useTypescript)
    await execa(packageManager, ["i", "-D", "typescript"], {
      cwd: projectPath,
      stdio: "inherit",
    });

  const { devPkgs, regPkgs } = packages[0]!;
  if (regPkgs.length) {
    await execa(packageManager, ["i", ...regPkgs], {
      cwd: projectPath,
      stdio: "inherit",
    });
  }

  if (devPkgs.length) {
    await execa(packageManager, ["i", "-D", ...devPkgs], {
      cwd: projectPath,
      stdio: "inherit",
    });
  }
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
