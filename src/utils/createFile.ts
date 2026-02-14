import { join } from "node:path";
import fs from "fs-extra";

export const createFiles = async (projectPath: string, files: string[]) => {
  await Promise.all(
    files.map((file) => fs.ensureFile(join(projectPath, file))),
  );
};
