import "dotenv/config";
import { Command } from "commander";
import { createCommand } from "./commands/create.js";
import {
  DependencyError,
  FileSystemError,
  logError,
  ProcessError,
  ValidationError,
} from "./shared/errors.js";

export const runCli = async (): Promise<void> => {
  const program = new Command();

  program
    .name("scafool")
    .description("Project scaffolding tool")
    .version("1.0.0");

  program
    .command("build <framework>")
    .description("Create a new project folder")
    .action(createCommand);

  await program.parseAsync();
};

runCli().catch((error) => {
  switch (true) {
    case error instanceof ValidationError:
      logError({
        message: error.message,
        step: error.context?.step || "unknown",
      });
      process.exit(error.exitCode);
    case error instanceof ProcessError:
      logError({
        message: error.message,
        step: error.context?.step || "unknown",
        error: error.context?.error,
        debug: process.env.DEBUG,
      });
      process.exit(error.exitCode);
    case error instanceof FileSystemError:
      logError({
        message: error.message,
        step: error.context?.step || "unknown",
        error: error.context?.error,
        debug: process.env.DEBUG,
      });
      process.exit(error.exitCode);
    case error instanceof DependencyError:
      logError({
        message: error.message,
        step: error.context?.step || "unknown",
        error: error.context?.error,
        debug: process.env.DEBUG,
      });
      process.exit(error.exitCode);
    default:
      logError({
        message: "An unexpected error occurred",
        step: "unknown",
        error: error.context?.error,
        debug: process.env.DEBUG,
      });
      process.exit(1);
  }
});
