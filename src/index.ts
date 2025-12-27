#!/usr/bin/env node
import { Command } from "commander";
import { createCommand } from "./commands/create.js";
const program = new Command();

program
  .name("scafool")
  .description("Project scaffolding tool")
  .version("1.0.0");

program.option("-f, --framework <type>", "choose framework", "express");

program
  .command("build")
  .description("Create a new project folder")
  .action(createCommand);

program.parseAsync();
