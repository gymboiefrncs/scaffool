import { checkbox, Separator } from "@inquirer/prompts";

export const expressInputs = async () => {
  const expressPackages = await checkbox({
    message: "Select packages you want to install",
    choices: [
      new Separator("==== DevDependencies ===="),
      {
        name: "nodemon",
        value: "nodemon",
      },
      {
        name: "tsx",
        value: "tsx",
      },
      new Separator("==== Dependencies ===="),
      {
        name: "express-session",
        value: "express-session",
      },
      {
        name: "cors",
        value: "cors",
      },
      {
        name: "ejs",
        value: "ejs",
      },
      { name: "pg", value: "pg" },
      {
        name: "dotenv",
        value: "dotenv",
      },
      {
        name: "helmet",
        value: "helmet",
      },
    ],
  });

  return expressPackages;
};
