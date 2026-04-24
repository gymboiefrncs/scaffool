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
  subDirs: string[];
  answers: Answers;
  files: string[];
};

export type FrameworkConfig = {
  getPackages: () => Promise<Packages>;
  subDirs: string[];
};

export type PackageChoice = {
  name: string;
  value: string;
  isDev: boolean;
};
