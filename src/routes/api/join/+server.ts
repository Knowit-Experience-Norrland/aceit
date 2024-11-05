import { getGolfActivity, updateGolfActivity } from '$lib/server/db';
import { json,error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

/** @type {import('./$types').RequestHandler} */


export async function PUT({ request, url }: RequestEvent) {

    const get = url.searchParams.get('get')

    const { activityId, user }: { activityId: string; user: GlobalUser }  = await request.json();
    const activity: GlobalGolfActivity | null = await getGolfActivity(activityId);
console.log("user",user);

    if (!activity || !activityId) {
            throw error(404, 'Activity not found');
        }
    const members: GolfUserMeta[] = activity.members
    const isMember: boolean = members.some(member => member.id === user.id);
    
if (get === "join") {
    try {

        if (isMember) {
            return json({ message: 'User is already a member', members });
        }

        const golfUserMeta: GolfUserMeta = {
            kind: 'golf',
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            handicap: 0,
            score: [],
        }
    
        members.push(golfUserMeta); 
        console.log("activity",activity);

        await updateGolfActivity(activity);
        
        return json({ message: 'User added to activity members', members});

    } catch (err) {
            console.error("Error:", err);
            throw error(500, 'Server error');
    }
}

if (get === "leave") {
    try {

        if (!isMember) {
            return json({ message: 'User is not a member', members });
        }

        activity.members = activity.members.filter(member => member.id !== user.id);
   
        await updateGolfActivity(activity);

        return json({
            message: 'User removed from activity members',
            members: activity.members
        });

    } catch (err) {
        console.error("Error:", err);
            throw error(500, 'Server error');
    }

    }

return json({ message: 'Invalid action specified' }, { status: 400 });
   
}
