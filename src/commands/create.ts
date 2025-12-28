import { userInputs } from "../prompts/common.js";
import { expressInputs } from "../prompts/express.js";
import { run } from "../generators/generator.js";

import chalk from "chalk";

export type Packages = {
  devPkgs: string[];
  regPkgs: string[];
};

export const createCommand = async (framework: string) => {
  const answers = await userInputs();

  if (framework === "express") {
    let packages: Packages[] = [];
    const subDirs = [
      "src",
      "src/controllers",
      "src/services",
      "src/models",
      "src/utils",
      "src/schemas",
      "src/validators",
      "src/middlewares",
      "src/config",
    ];
    const expressAnswers = await expressInputs();
    packages.push(expressAnswers);

    console.log(chalk.cyan("Creating project..."));
    await run("express", packages, subDirs, answers);
  }

  console.log(chalk.green("Done creating project"));
  console.log(chalk.green.bold("Happy coding :)"));
};
