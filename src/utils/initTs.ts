import { execa } from "execa";

export const initializeTs = async (projectPath: string): Promise<void> => {
  await execa("pnpm", ["exec", "tsc", "--init"], { cwd: projectPath });
};
