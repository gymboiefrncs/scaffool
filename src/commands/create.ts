import { userInputs } from "../prompts/common.js";
import { makeDirectories } from "../generators/generator.js";
import { expressInputs } from "../prompts/express.js";
import { installPackages } from "../utils/packageManager.js";
import path from "node:path";
import chalk from "chalk";

export type Packages = {
  devPkgs: string[];
  regPkgs: string[];
};

export const createCommand = async (framework: string) => {
  const answers = await userInputs();
  let packages: Packages[] = [];

  if (framework === "express") {
    const expressAnswers = await expressInputs();
    packages.push(expressAnswers);

    console.log(chalk.cyan("Creating project..."));

    await makeDirectories(answers.projectName);
  }
  if (packages.length) {
    await installPackages(
      path.resolve(answers.projectName),
      packages,
      answers.useTypescript
    );
  }

  console.log(chalk.green("Done creating project"));
  console.log(chalk.green.bold("Happy coding :)"));
};
