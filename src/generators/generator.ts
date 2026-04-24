import { createDirectories, createFiles } from "../operations/fileSystem.js";
import { setupGit } from "../operations/git.js";
import { installPackages } from "../operations/setup.js";
import type { Data } from "../shared/types.js";
import { catchErrorAtStep } from "../shared/errHandlers.js";

export const run = async (data: Data): Promise<void> => {
  let projectPath = "";

  // generate directory first so we can have a path to create files and install packages into
  await catchErrorAtStep("Creating directories", async () => {
    projectPath = await createDirectories(data);
  });

  await catchErrorAtStep("Creating files", () =>
    createFiles(projectPath, data.files),
  );

  await catchErrorAtStep("Setting up git", () => setupGit(projectPath));

  await installPackages(data, projectPath);
};
