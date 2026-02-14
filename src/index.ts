import { Command } from "commander";
import { createCommand } from "./commands/create.js";

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
