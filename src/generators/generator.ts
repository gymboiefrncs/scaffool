import { createDirectories } from "../utils/createDirectory.js";
import { createFiles } from "../utils/createFile.js";
import { setupGit } from "../utils/setupGit.js";
import { installPackages } from "../utils/packageManager.js";
import type { Data } from "../types.js";
import { catchErrorEachStep } from "../utils/errHandlers.js";

export const run = async (data: Data): Promise<void> => {
  let projectPath = "";

  // generate directory first so we can have a path to create files and install packages into
  await catchErrorEachStep("Creating directories", async () => {
    projectPath = await createDirectories(data);
  });

  await catchErrorEachStep("Creating files", () =>
    createFiles(projectPath, data.files),
  );

  await catchErrorEachStep("Setting up git", () => setupGit(projectPath));

  await installPackages(data, projectPath);
};
