const requiredEnvVars = ["MONGO_URI", "SECRET_KEY"];

const optionalEnvVars = [
  "IMAGEKIT_PUBLIC_KEY",
  "IMAGEKIT_PRIVATE_KEY",
  "IMAGEKIT_URL_ENDPOINT",
  "RESEND_API_KEY",
  "EMAIL_FROM",
];

const isBlank = (value) => typeof value !== "string" || value.trim() === "";

const assertRequiredEnv = (env = process.env) => {
  const missing = requiredEnvVars.filter((key) => isBlank(env[key]));

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variable(s): ${missing.join(", ")}`,
    );
  }
};

const warnOptionalEnv = (env = process.env) => {
  const missing = optionalEnvVars.filter((key) => isBlank(env[key]));

  if (missing.length > 0) {
    console.warn(
      `Optional environment variable(s) missing: ${missing.join(", ")}`,
    );
  }
};

export const validateStartupEnv = (env = process.env) => {
  assertRequiredEnv(env);
  warnOptionalEnv(env);
};

export const getRequiredEnvVars = () => [...requiredEnvVars];
export const getOptionalEnvVars = () => [...optionalEnvVars];
