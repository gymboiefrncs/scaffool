import { createDirectories } from "../utils/createDirectory.js";
import { installPackages } from "../utils/packageManager.js";
import type { Data } from "../commands/create.js";

export const runFastify = async (data: Data) => {
  await createDirectories(data);
  await installPackages(data);
};
