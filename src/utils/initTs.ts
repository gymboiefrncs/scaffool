import { execa } from "execa";

export const initializeTs = async (projectPath: string) => {
  try {
    await execa("npx", ["tsc", "--init"], { cwd: projectPath });
  } catch (error) {
    console.log("Failed to initialize typescript", error);
  }
};
