import { getCollection } from '$db/collection';
import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const users = await getCollection('users', 0, 1); // TODO: just for testing, remove later
  if (users) { return { users }; }
  error(404, 'Not found');
};
