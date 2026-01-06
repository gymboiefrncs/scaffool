import { execa } from "execa";

export const initializeTs = async (projectPath: string) => {
  try {
    await execa("exec", ["tsc", "--init"], { cwd: projectPath });
  } catch (error) {
    console.log("Failed to initialize typescript", error);
  }
};
