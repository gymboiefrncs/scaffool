export type Answers = {
  projectName: string;
  useTypescript: boolean;
};

export type Packages = {
  selectedDevDependencies: string[];
  selectedDependencies: string[];
};

export type Data = {
  framework: string;
  packages: Packages;
  answers: Answers;
  files: string[];
};

export type FrameworkConfig = {
  getPackages: () => Promise<Packages>;
};

export type PackageChoice = {
  name: string;
  value: string;
  isDev: boolean;
};
