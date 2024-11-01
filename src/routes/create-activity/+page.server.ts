import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { getUsers, insertGolfActivity } from "$lib/server/db";

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
    const gameType = data.get("gameType") as string;
    const description = (data.get("description") as string);
    const userIds = data.getAll("usersIds") as string[];
    const dateStrings = data.getAll("dates") as string[];
    const dates = dateStrings.map(date => new Date(date));
    const start = dates[0];
    const end = dates.length > 1 && dates[dates.length - 1] || undefined;

    if (!name) {
      return fail(400, { name, holes, gameType, userIds, description, dates: dateStrings, error: "Name is required" });
    }

    if (!holes) {
      return fail(400, { name, holes, gameType, userIds, description, dates: dateStrings, error: "Holes are required" });
    }

    if (!userIds) {
      return fail(400, { name, holes, gameType, userIds, description, dates: dateStrings, error: "Users are required" });
    }

    if (!locals.claims) {
      throw redirect(302, `/login`);
    }

    const dbUsers = await getUsers(userIds);

    const golfUserMeta: GolfUserMeta[] = [];

    dbUsers.map(user => {
      if (!user) {
        return;
      }

      golfUserMeta.push({
        kind: 'golf',
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        handicap: 0,
        score: [],
      });
    });

    const golfHoles: GolfHole[] = [];

    for (let i = 1; i <= parseInt(holes); i++) {
      golfHoles.push({
        hole: i,
        par: 2, // TODO: Make configurable
        date: dates[i -1]
      });
    }

    const activity: Database.GolfActivity = {
      kind: 'golf',
      name,
      description,
      active: true, // TODO: Make configurable
      start,
      end,
      admin: locals.claims?.id,
      holes: golfHoles,
      members: golfUserMeta,
    };

    console.log(activity);

    const result = await insertGolfActivity(activity);

    if (!result?._id) {
      throw error(500, "Failed to create activity");
    }

    throw redirect(302, `/activity/${result._id.toString()}`);
  }
};

