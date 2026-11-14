"use server";

import { auth } from "@repo/auth/server";
import { database } from "@repo/database";
import { headers } from "next/headers";
import Fuse from "fuse.js";

export const searchUsers = async (
  query: string
): Promise<
  | {
      data: string[];
    }
  | {
      error: unknown;
    }
> => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
      throw new Error("Not logged in");
    }

    const members = await database.user.findMany({ take: 100 });

    const users = members.map((user) => ({
      id: user.id,
      name: user.name || user.email,
      imageUrl: user.image,
    }));

    const fuse = new Fuse(users, {
      keys: ["name"],
      minMatchCharLength: 1,
      threshold: 0.3,
    });

    const results = fuse.search(query);
    const data = results.map((result) => result.item.id);

    return { data };
  } catch (error) {
    return { error };
  }
};
