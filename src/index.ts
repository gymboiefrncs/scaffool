import { Command } from "commander";
import { createCommand } from "./commands/create.js";
import {
  DependencyError,
  FileSystemError,
  InternalError,
  ProcessError,
  ValidationError,
} from "./shared/errors.js";
import chalk from "chalk";

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
      console.error(chalk.red(`\n${error.message}`));
      process.exit(error.exitCode);
    case error instanceof ProcessError:
      console.error(
        chalk.red(`\nError during step: ${error.context?.step || "unknown"}`),
      );
      console.error(chalk.red(`\n${error.message}`));
      process.exit(error.exitCode);
    case error instanceof FileSystemError:
      console.error(
        chalk.red(`\nError during step: ${error.context?.step || "unknown"}`),
      );
      console.error(chalk.red(`\n${error.message}`));
      process.exit(error.exitCode);
    case error instanceof DependencyError:
      console.error(
        chalk.red(`\nError during step: ${error.context?.step || "unknown"}`),
      );
      console.error(chalk.red(`\n${error.message}`));
      process.exit(error.exitCode);
    case error instanceof InternalError:
      console.error(chalk.red(`\n${error.message}`));
      console.error(error.context?.error);
      process.exit(error.exitCode);
    default:
      console.error(chalk.red("\nAn unexpected error occurred"));
      console.error(error);
      process.exit(1);
  }
});
