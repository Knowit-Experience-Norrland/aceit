import type { PageServerLoad } from './$types';
import { getUsers } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const users = await getUsers();

	if (!users || users.length === 0) {
		throw error(500, 'No users found');
	}

	return { users };
};
