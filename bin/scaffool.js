#!/usr/bin/env node

import { runCli } from "../dist/index.js";

runCli().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
