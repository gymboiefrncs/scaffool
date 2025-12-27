import { checkbox } from "@inquirer/prompts";

export const expressInputs = async () => {
  const expressPackages = await checkbox({
    message: "Select packages you want to install",
    choices: [
      {
        name: "nodemon",
        value: "nodemon",
      },
      {
        name: "tsx",
        value: "tsx",
      },
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
