import { userInputs } from "../prompts/common.js";
import { makeDirectories } from "../generators/generator.js";
import { expressInputs } from "../prompts/express.js";
import { installPackages } from "../utils/packageManager.js";
import path from "node:path";

export const createCommand = async (framework: string) => {
  const answers = await userInputs();
  await makeDirectories(answers.projectName);
  let packages: string[] = [];

  if (framework === "express") {
    const expressAnswers = await expressInputs();
    packages = expressAnswers;
  }
  if (packages.length) {
    console.log("installing dependencies...");
    await installPackages(path.resolve(answers.projectName), packages);
    console.log("packages installed");
  }
};
