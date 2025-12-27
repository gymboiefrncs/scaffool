import { userInputs } from "../prompts/common.js";
import { makeDirectories } from "../generators/generator.js";
import { expressInputs } from "../prompts/express.js";
import { installPackages } from "../utils/packageManager.js";
import path from "node:path";

export type Packages = {
  devPkgs: string[];
  regPkgs: string[];
};

export const createCommand = async (framework: string) => {
  const answers = await userInputs();
  await makeDirectories(answers.projectName);
  let packages: Packages[] = [];

  if (framework === "express") {
    const expressAnswers = await expressInputs();
    packages.push(expressAnswers);
    console.log(packages);
  }
  if (packages.length) {
    console.log("installing dependencies...");
    await installPackages(
      path.resolve(answers.projectName),
      packages,
      answers.useTypescript
    );
    console.log("packages installed");
  }
};
