import { execa } from "execa";

export const initializeTs = async (projectPath: string) => {
  try {
    await execa("npx", ["tsc", "--init"], { cwd: projectPath });
  } catch (err) {
    console.log(err);
  }
};
