import chalk from "chalk";
import fs from "fs-extra";
import { join } from "path";
import type { Data } from "../shared/types.js";
import { FileSystemError } from "../shared/errors.js";

export const createDirectories = async (data: Data): Promise<string> => {
  const { subDirs, answers } = data;

  const projectPath = join(process.cwd(), answers.projectName);
  const options = { mode: 0o775 };

  try {
    await fs.ensureDir(projectPath, options);
    await Promise.all(
      subDirs.map((sub) => fs.ensureDir(join(projectPath, sub), options)),
    );
  } catch (error) {
    throw new FileSystemError("Failed to create directories", {
      error: error instanceof Error ? error : undefined,
      step: "create-diretories",
    });
  }

  return projectPath;
};

export const createFiles = async (projectPath: string, files: string[]) => {
  try {
    await Promise.all(
      files.map((file) => fs.ensureFile(join(projectPath, file))),
    );
  } catch (error) {
    throw new FileSystemError("Failed to create files", {
      error: error instanceof Error ? error : undefined,
      step: "create-files",
    });
  }
};
