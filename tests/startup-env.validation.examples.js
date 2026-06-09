import assert from "node:assert/strict";
import { validateStartupEnv } from "../src/configs/env.js";

assert.doesNotThrow(() =>
  validateStartupEnv({
    MONGO_URI: "mongodb://localhost:27017/mozno",
    SECRET_KEY: "test-secret",
  }),
);

assert.throws(
  () =>
    validateStartupEnv({
      SECRET_KEY: "test-secret",
    }),
  /MONGO_URI/,
);

assert.throws(
  () =>
    validateStartupEnv({
      MONGO_URI: "mongodb://localhost:27017/mozno",
    }),
  /SECRET_KEY/,
);

console.log("Startup environment validation examples passed");
