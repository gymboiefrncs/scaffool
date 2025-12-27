import { input, select } from "@inquirer/prompts";

export const userInputs = async () => {
  const projectName = await input({
    message: "Enter the project name:",
    validate: (val) => val.trim() !== "" || "Project cannot be empty",
  });
  const LICENSE = await select({
    message: "Select license:",
    choices: [
      {
        name: "MIT",
        value: "MIT",
        description: "mit is..",
      },
      {
        name: "Apache-2.0",
        value: "Apache-2.0",
        description: "apache is..",
      },
      {
        name: "None",
        value: "None",
      },
    ],
  });
  return {
    projectName,
    LICENSE,
  };
};
