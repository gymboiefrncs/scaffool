import { input, checkbox, Separator, confirm } from "@inquirer/prompts";
import type { Packages, PackageChoice } from "../shared/types.js";

export const promptUser = async (): Promise<{
  projectName: string;
  useTypescript: boolean;
}> => {
  const projectName = await input({
    message: "Enter the project name:",
    validate: (val) => val.trim() !== "" || "Project cannot be empty",
  });
  const useTypescript = await confirm({ message: "Use typescript?" });
  return {
    projectName,
    useTypescript,
  };
};

const basePackages: PackageChoice[] = [
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
    ...basePackages,
    { name: "express-session", value: "express-session", isDev: false },
  ],
  fastify: basePackages,
};

const createPackagePrompt = async (framework: string): Promise<Packages> => {
  const packages = frameworkPackages[framework] || basePackages;

  // organize packages into dependencies and devDependencies for UX
  const devDependencies = packages.filter((p) => p.isDev);
  const dependencies = packages.filter((p) => !p.isDev);

  const selected = await checkbox({
    message: "Select packages you want to install",
    choices: [
      new Separator("==== DevDependencies ===="),
      ...devDependencies.map((p) => ({ name: p.name, value: p.value })),
      new Separator("==== Dependencies ===="),
      ...dependencies.map((p) => ({ name: p.name, value: p.value })),
    ],
  });

  /**
   * used Set for efficient lookup
   */
  const devDependenciesMap = new Set(devDependencies.map((p) => p.value));
  const selectedDevDependencies = selected.filter((pkg) =>
    devDependenciesMap.has(pkg),
  );
  const selectedDependencies = selected.filter(
    (pkg) => !devDependenciesMap.has(pkg),
  );

  return {
    selectedDevDependencies,
    selectedDependencies,
  };
};
