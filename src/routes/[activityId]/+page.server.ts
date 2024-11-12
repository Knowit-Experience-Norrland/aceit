import { error, redirect, fail } from '@sveltejs/kit';
import type { Actions } from "./$types";
import type { PageServerLoad } from "./$types";
import { getGolfActivity, updateGolfActivity } from '$lib/server/db';
import { getUsers } from "$lib/server/db";

export const load: PageServerLoad = async ({ params, locals }) => {
    const users = await getUsers();

    if (!users || users.length === 0) {
        throw error(500, "No users found");
    }

    locals.users = users;

    const activityId = params.activityId;
    const activity = await getGolfActivity(activityId);

    if (!activity) {
        throw error(404, 'activity not found');
    }
  
    return { activity, users };
};

export const actions: Actions = {
default: async({  locals, request, params }) => {

    const activityId = params.activityId; 
    const activity = await getGolfActivity(activityId);
    
    if (!activity) {
            throw error(404, "Original activity not found");
        }
        
    const formData = await request.formData();

    const name = (formData.get("name") as string)?.trim();
    const holes = formData.get("holes") as string;
    const gameType = formData.get("gameType") as string;
    const description = (formData.get("description") as string);
    const userIds = formData.getAll("userIds") as string[];
    const dateStrings = formData.getAll("dates") as string[];
    const dates = dateStrings.map(date => new Date(date));
    const start = dates[0];
    const end = dates.length > 1 && dates[dates.length - 1] || undefined; 

    userIds.push(locals.claims?.id || '');

    if (!name) {
        return fail(400, { name, holes, gameType, description, userIds, dates: dateStrings,  error: "Name is required" });
      }
  
    if (!holes) {
        return fail(400, { name, holes, gameType, description, userIds, dates: dateStrings,  error: "Holes are required" });
      }
  
    if (!userIds) {
        return fail(400, { name, holes, gameType, description, userIds, dates: dateStrings, error: "Users are required" });
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
    
    const updatedActivity = {
        ...activity, 
        //Update values only if new values is provided
        name: name || activity.name,
        description: description || activity.description,
        active: false,
        start,
        end,
        members: golfUserMeta.length > 0 ? golfUserMeta : activity.members,
        holes: golfHoles.length > 0 ? golfHoles : activity.holes,
    };


    const result = await updateGolfActivity(updatedActivity);

    if (!result?._id) {
        throw error(500, "Failed to update activity");
    };
  
}
};


