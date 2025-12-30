import chalk from "chalk";

type Result<T> = [null, T] | [Error, null];

export const handleError = async <T>(
  promise: Promise<T>
): Promise<Result<T>> => {
  try {
    const result = await promise;
    return [null, result];
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    return [err, null];
  }
};

export const exitWithErr = (context: string, error: Error): never => {
  console.error(chalk.red.bold(`\n ${context}`), chalk.red(error.message));
  process.exit(1);
};

export const catchErrorEachStep = async (
  step: string,
  fn: () => Promise<void>
) => {
  const [err] = await handleError(fn());
  if (err) exitWithErr(`Failed at step: ${step}`, err);
};
