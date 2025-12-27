import fs from "fs-extra";
import { join } from "path";

export const makeDirectories = async (projectName: string) => {
  const dir = process.cwd();
  const options = {
    mode: 0o775,
  };
  const projectPath = join(dir, projectName);
  try {
    await fs.ensureDir(projectPath, options);
    console.log("success!");
  } catch (err) {
    console.log(err);
  }
};
