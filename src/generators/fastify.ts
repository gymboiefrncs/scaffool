import { createDirectories } from "../utils/createDirectory.js";
import { installPackages } from "../utils/packageManager.js";
import type { Data } from "../commands/create.js";
import { exitWithErr, handleError } from "../utils/errHandlers.js";

export const runFastify = async (data: Data) => {
  const [errDir] = await handleError(createDirectories(data));
  if (errDir) exitWithErr("Failed to create directories", errDir);

  await installPackages(data);
};
