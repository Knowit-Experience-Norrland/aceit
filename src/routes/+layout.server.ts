import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { connect, getUser } from "$lib/server/db";

export const load: LayoutServerLoad = async ({ locals }) => {
  const connection = await connect();

  if (!connection) throw error(500, "Database connection failed");
  console.log("Connected to database");

  const { claims } = locals;

  if (claims) {
    const user = await getUser(claims.id);
    if (!user) error(404, 'User not found');
    return { user };
  }

  return { user: null };
};
