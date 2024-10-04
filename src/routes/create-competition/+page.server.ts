import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { getUsers, insertGolfCompetition } from "$lib/server/db";

export const load: PageServerLoad = async ({ locals }) => {
  const users = await getUsers();

  if (!users || users.length === 0) {
    throw error(500, "No users found");
  }

  locals.users = users;

  return { users };
}

export const actions: Actions = {
  default: async ({ locals, request }) => {
    const data = await request.formData();

    const name = (data.get("name") as string)?.trim();
    const holes = data.get("holes") as string;
    const users = data.getAll("users") as string[];

    if (!name) {
      return fail(400, { name, holes, users, error: "Name is required" });
    }

    if (!holes) {
      return fail(400, { name, holes, users, error: "Holes is required" });
    }

    if (!users) {
      return fail(400, { name, holes, users, error: "Users is required" });
    }

    if (!locals.claims) {
      throw redirect(302, `/login`);
    }

    const dbUsers = await getUsers();

    const golfUserMeta: GolfUserMeta[] = [];

    for (const id of users) {
      const user = dbUsers?.find((u) => u.id === id);

      if (!user) {
        continue;
      }

      golfUserMeta.push({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        handicap: 0
      });
    }

    const golfHoles: GolfHole[] = [];

    for (let i = 1; i <= parseInt(holes); i++) {
      golfHoles.push({
        hole: i,
        par: 3, // TODO: Make configurable
      });
    }

    const competition: Database.GolfCompetition = {
      name,
      active: false,
      admin: locals.claims?.id,
      holes: golfHoles,
      players: golfUserMeta,
      strokes: [],
    };

    const result = await insertGolfCompetition(competition);

    if (!result?._id) {
      throw error(500, "Failed to create competition");
    }

    throw redirect(302, `/competition/${result._id.toString()}`);
  }
};

