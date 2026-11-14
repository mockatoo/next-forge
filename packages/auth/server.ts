import { prismaAdapter } from "better-auth/adapters/prisma";
import { database } from "@repo/database";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(database, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});
