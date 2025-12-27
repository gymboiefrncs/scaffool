import { userInputs } from "../prompts/inputs.js";
import { makeDirectories } from "../generators/generator.js";

export const createCommand = async () => {
  const answers = await userInputs();
  await makeDirectories(answers.projectName);
  console.log("Project Created");
};
