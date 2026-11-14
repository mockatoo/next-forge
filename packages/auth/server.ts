import { mockGitHub } from "@mockatoo/connect-better-auth";
import { database } from "@repo/database";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { keys } from "./keys";

const isProduction = process.env.NODE_ENV === "production";
const github = {
  clientId: keys().GITHUB_CLIENT_ID ?? "",
  clientSecret: keys().GITHUB_CLIENT_SECRET ?? "",
};

export const auth = betterAuth({
  database: prismaAdapter(database, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  // Production signs in with GitHub. Everywhere else, Mockatoo stands in for it.
  socialProviders: isProduction ? { github } : {},
  plugins: [...(isProduction ? [] : [mockGitHub(github)]), nextCookies()],
});
