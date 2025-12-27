#!/usr/bin/env node
import { makeDirectories } from "./generator.js";
import { Command } from "commander";
import { userInputs } from "./inputs.js";
const program = new Command();

program
  .name("scafool")
  .description("Project scaffolding tool")
  .version("1.0.0");

program.option("-f, --framework <type>", "choose framework", "express");

program
  .command("build")
  .description("Create a new project folder")
  .action(async () => {
    const answers = await userInputs();
    makeDirectories(answers.projectName);
  });

program.parseAsync(process.argv);
