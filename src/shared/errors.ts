import chalk from "chalk";

type ErrorContext = Record<string, unknown>;
type LogErrorOptions = {
  message: string;
  step: unknown;
  error?: unknown;
  debug?: string;
};

export const logError = ({
  message,
  step,
  error,
  debug,
}: LogErrorOptions): void => {
  if (step) {
    console.error(chalk.red(`\nError during step: ${step}`));
  }

  if (message) {
    console.error(chalk.red(`\n${message}`));
  }

  if (error) {
    console.error(
      debug ? error : chalk.red("\nRun with DEBUG=1 for more details"),
    );
  }
};

class CLIError extends Error {
  constructor(
    message: string,
    public exitCode: number = 1,
    public context?: ErrorContext,
  ) {
    super(message);
    this.name = new.target.name;
  }
}

export class ValidationError extends CLIError {
  constructor(message: string, context?: ErrorContext) {
    super(message, 2, context);
  }
}

export class PromptError extends CLIError {
  constructor(message: string, context?: ErrorContext) {
    super(message, 2, context);
  }
}

export class FileSystemError extends CLIError {
  constructor(message: string, context?: ErrorContext) {
    super(message, 1, context);
  }
}

export class DependencyError extends CLIError {
  constructor(message: string, context?: ErrorContext) {
    super(message, 1, context);
  }
}

export class ProcessError extends CLIError {
  constructor(message: string, context?: ErrorContext) {
    super(message, 1, context);
  }
}
