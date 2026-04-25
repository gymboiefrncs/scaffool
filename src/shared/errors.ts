import chalk from "chalk";

type ErrorContext = Record<string, unknown>;

export const logError = (context: string, error: Error): void => {
  console.error(chalk.red.bold(`\n ${context}`), chalk.red(error.message));
  process.exitCode = 1;
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

export class InternalError extends CLIError {
  constructor(message = "Unexpected internal error", context?: ErrorContext) {
    super(message, 1, context);
  }
}
