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
    const users = formData.getAll("users") as string[];
    
    

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
          kind: 'golf',
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          handicap: 0,
          score: [],
        });
      }
  
    const golfHoles: GolfHole[] = [];
  
    for (let i = 1; i <= parseInt(holes); i++) {
        golfHoles.push({
          hole: i,
          par: 2, // TODO: Make configurable
        });
    }
  

    const updatedActivity = {
        ...activity, 
        //Update values only if new values is provided
        name: name || activity.name,
        active: false,
        members: golfUserMeta.length > 0 ? golfUserMeta : activity.members,
        holes: golfHoles.length > 0 ? golfHoles : activity.holes,
    };


    // Update the activity in the database
    const result = await updateGolfActivity(updatedActivity);

    if (!result?._id) {
        throw error(500, "Failed to update activity");
    };
  
}
};


