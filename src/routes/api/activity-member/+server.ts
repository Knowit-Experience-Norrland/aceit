import { getGolfActivity, getUser, updateGolfActivity } from '$lib/server/db';
import { json, error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

/** @type {import('./$types').RequestHandler} */

export async function PUT({ request, url, locals }: RequestEvent) {

    const get = url.searchParams.get('get')
    const { claims } = locals;
    let user: App.User | null = null;

    if (claims) {
        user = await getUser(claims.id);
        if (!user) error(404, 'User not found');
    }

    if (!user) {
        throw error(401, 'User not authenticated');
    }
    
    const { activityId }: { activityId: string; } = await request.json();
    const activity: App.GolfActivity | null = await getGolfActivity(activityId);


    if (!activity || !activityId) {
        throw error(404, 'Activity not found');
    }
    const members: GolfUserMeta[] = activity.members
    const isMember: boolean = members.some(member => member.id === user.id);

    if (get === "join") {
        try {

            if (isMember) {
                return json({ message: 'User is already a member'}, { status:400 });
            }

            const golfUserMeta: GolfUserMeta = {
                kind: 'golf',
                id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                handicap: 0,
                score: [],
            } 

            members.push(golfUserMeta);
            
            await updateGolfActivity(activity);

            return json({ message: 'User added to activity members', members }, { status: 200 });

        } catch (err) {
            console.error("Error:", err);
            throw error(500, 'Server error');
        }
    }

    if (get === "leave") {
        try {

            if (!isMember) {
                return json({ message: 'User is not a member' }, { status:404 });
            }

            activity.members = activity.members.filter(member => member.id !== user.id);

            await updateGolfActivity(activity);

            return json({
                message: 'User removed from activity members',
                members: activity.members
            }, { status:200 });

        } catch (err) {
            console.error("Error:", err);
            throw error(500, 'Server error');
        }

    }

    return json({ message: 'Invalid action specified' }, { status: 400 });

}
