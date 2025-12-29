import { checkbox, Separator } from "@inquirer/prompts";

const devMap: Record<string, boolean> = {
  nodemon: true,
  tsx: true,
  cors: false,
  ejs: false,
  pg: false,
  dotenv: false,
  helmet: false,
};

export const fastifyInputs = async () => {
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

  const devPkgs = expressPackages.filter((pkg) => devMap[pkg]);
  const regPkgs = expressPackages.filter((pkg) => !devMap[pkg]);
  return { devPkgs, regPkgs };
};
