import { runExpress } from "./expressGenerator.js";
import { runFastify } from "./fastifyGenerator.js";
import type { Data } from "../commands/create.js";

export const run = async (data: Data) => {
  const { framework } = data;
  switch (framework) {
    case "express":
      await runExpress(data);
      break;
    case "fastify":
      await runFastify(data);
      break;
  }
};
