import { execa } from "execa";
import fs from "fs-extra";
import { join } from "node:path";
import { FileSystemError, ProcessError } from "../shared/errors.js";

export const setupGit = async (projectPath: string) => {
  const content = `
node_modules/

dist/
build/

*.log
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*

pids
*.pid
*.seed
*.pid.lock

coverage/
*.lcov

*.tsbuildinfo

.env
.env.local
.env.development.local
.env.test.local
.env.production.local

.vscode/
.idea/
*.sublime-project
*.sublime-workspace

.DS_Store
Thumbs.db

.npm
.yarn/cache
.pnpm-store

package-lock.json
yarn.lock
pnpm-lock.yaml
    `;

  try {
    await execa("git", ["init"], { cwd: projectPath });
  } catch (error) {
    throw new ProcessError("Failed to initialize git repository", {
      error: error instanceof Error ? error : undefined,
      step: "setup-git",
    });
  }

  try {
    await fs.outputFile(join(projectPath, ".gitignore"), content);
  } catch (error) {
    throw new FileSystemError("Failed to create .gitignore file", {
      error: error instanceof Error ? error : undefined,
      step: "setup-git",
    });
  }
};
