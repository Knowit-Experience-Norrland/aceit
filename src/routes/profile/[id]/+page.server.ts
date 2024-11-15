import type { PageServerLoad } from './$types';
import { getUser } from '$lib/server/db/users';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const userId = params.id;
	const user = await getUser(userId);

	if (!user) {
		throw error(404, 'User not found');
	}

	return { user };
};
