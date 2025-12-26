#!/usr/bin/env node
import { checkbox, input, select } from "@inquirer/prompts";
import fs from "fs-extra";
import { join } from "path";

type UserInputType = {
  projectName: string;
  author: string;
  LICENSE: string;
  framework: string;
  packages: string[];
};

const userInputs = async () => {
  const projectName = await input({
    message: "Enter the project name:",
    validate: (val) => val.trim() !== "" || "Project cannot be empty",
  });
  const author = await input({
    message: "Enter the name of the author:",
  });
  const LICENSE = await select({
    message: "Select license:",
    choices: [
      {
        name: "MIT",
        value: "MIT",
        description: "mit is..",
      },
      {
        name: "Apache-2.0",
        value: "Apache-2.0",
        description: "apache is..",
      },
      {
        name: "None",
        value: "None",
      },
    ],
  });
  const framework = await select({
    message: "Select framework:",
    choices: [
      {
        name: "expressjs",
        value: "expressjs",
        description: "express is ...",
      },
      {
        name: "nestJS",
        value: "nestJS",
        description: "nestJs is...",
      },
      {
        name: "fatify",
        value: "fastify",
        description: "fastify is ...",
      },
    ],
  });

  const packages = await checkbox({
    message: "Select packages",
    choices: [
      { name: "nodemon", value: "nodemon" },
      { name: "typescript", value: "typescript" },
    ],
  });
  return {
    projectName,
    author,
    LICENSE,
    framework,
    packages,
  };
};

const makeDirectories = async () => {
  const inputs = await userInputs();
  const dir = process.cwd();
  const options = {
    mode: 0o775,
  };
  const projectPath = join(dir, inputs.projectName);
  try {
    await fs.ensureDir(projectPath, options);
    console.log("success!");
  } catch (err) {
    console.log(err);
  }
};
makeDirectories();
