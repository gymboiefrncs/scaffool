import { checkbox, Separator } from "@inquirer/prompts";
import type { Packages, PackageChoice } from "../types.js";

const commonPackages: PackageChoice[] = [
  { name: "nodemon", value: "nodemon", isDev: true },
  { name: "tsx", value: "tsx", isDev: true },
  { name: "cors", value: "cors", isDev: false },
  { name: "ejs", value: "ejs", isDev: false },
  { name: "pg", value: "pg", isDev: false },
  { name: "dotenv", value: "dotenv", isDev: false },
  { name: "helmet", value: "helmet", isDev: false },
];

export const getPackages = (framework: string) => () =>
  createPackagePrompt(framework);

const frameworkPackages: Record<string, PackageChoice[]> = {
  // extends common packages and adds framework-specific ones
  express: [
    ...commonPackages,
    { name: "express-session", value: "express-session", isDev: false },
  ],
  fastify: commonPackages,
};

const createPackagePrompt = async (framework: string): Promise<Packages> => {
  const packages = frameworkPackages[framework] || commonPackages;

  // organize packages into dependencies and devDependencies for UX
  const devPackages = packages.filter((p) => p.isDev);
  const regPackages = packages.filter((p) => !p.isDev);

  const selected = await checkbox({
    message: "Select packages you want to install",
    choices: [
      new Separator("==== DevDependencies ===="),
      ...devPackages.map((p) => ({ name: p.name, value: p.value })),
      new Separator("==== Dependencies ===="),
      ...regPackages.map((p) => ({ name: p.name, value: p.value })),
    ],
  });

  /**
   * used Set for efficient lookup
   * separate dev and regular packages based on user selection
   */
  const devMap = new Set(devPackages.map((p) => p.value));
  const devPkgs = selected.filter((pkg) => devMap.has(pkg));
  const regPkgs = selected.filter((pkg) => !devMap.has(pkg));

  return { devPkgs, regPkgs };
};
