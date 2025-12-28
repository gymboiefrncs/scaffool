import { join } from "node:path";
import fs, { ensureFile } from "fs-extra";

export const createFiles = async (projectPath: string, files: string[]) => {
  try {
    await Promise.all(
      files.map((file) => fs.ensureFile(join(projectPath, file)))
    );
  } catch (err) {
    console.log(err);
  }
};
