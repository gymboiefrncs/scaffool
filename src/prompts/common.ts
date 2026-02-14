import { input, select, confirm } from "@inquirer/prompts";

export const userInputs = async (): Promise<{
  projectName: string;
  useTypescript: boolean;
}> => {
  const projectName = await input({
    message: "Enter the project name:",
    validate: (val) => val.trim() !== "" || "Project cannot be empty",
  });
  const useTypescript = await confirm({ message: "Use typescript?" });
  return {
    projectName,
    useTypescript,
  };
};
