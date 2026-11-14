import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// Real GitHub credentials are only needed in production.
const githubKey =
  process.env.NODE_ENV === "production"
    ? z.string().min(1)
    : z.string().optional();

export const keys = () =>
  createEnv({
    skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
    server: {
      BETTER_AUTH_SECRET: z.string().optional(),
      BETTER_AUTH_URL: z.url().optional(),
      GITHUB_CLIENT_ID: githubKey,
      GITHUB_CLIENT_SECRET: githubKey,
    },
    runtimeEnv: {
      BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
      BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
      GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    },
  });
