import { createDirectories, createFiles } from "../operations/fileSystem.js";
import { setupGit } from "../operations/git.js";
import type { Data } from "../shared/types.js";
import { ProcessError } from "../shared/errors.js";
import { execa } from "execa";
import { runCommand, installDependencies } from "../operations/installer.js";

export const run = async (
  data: Data,
  onProgress: (step: string) => void,
): Promise<void> => {
  // generate directory first so we can have a path to create files and install packages into
  const projectPath = await createDirectories(data);
  onProgress("Created directories");

  await createFiles(projectPath, data);
  onProgress("Created files");

  await setupGit(projectPath);
  onProgress("Initialized git");

  await installPackages(data, projectPath, onProgress);
};

const initializeTypeScript = async (projectPath: string): Promise<void> => {
  try {
    await execa("pnpm", ["exec", "tsc", "--init"], { cwd: projectPath });
  } catch (error) {
    throw new ProcessError("Failed to initialize TypeScript config", {
      cause: error instanceof Error ? error : undefined,
      step: "ts-init",
    });
  }
};

const installPackages = async (
  data: Data,
  projectPath: string,
  onProgress: (step: string) => void,
): Promise<void> => {
  const { framework, packages, answers } = data;
  const { selectedDevDependencies, selectedDependencies } = packages;

  await runCommand(["init"], projectPath);
  onProgress("Project initialized");

  await runCommand(["add", framework], projectPath);
  onProgress(`Installed ${framework}`);

  if (answers.useTypescript) {
    await runCommand(["add", "-D", "typescript"], projectPath);
    onProgress("Installed TypeScript");

    await initializeTypeScript(projectPath);
    onProgress("Initialized TypeScript config");
  }

  if (selectedDependencies.length) {
    await installDependencies(
      selectedDependencies,
      projectPath,
      false,
      onProgress,
    );
  }

  if (selectedDevDependencies.length) {
    await installDependencies(
      selectedDevDependencies,
      projectPath,
      true,
      onProgress,
    );
  }
};
