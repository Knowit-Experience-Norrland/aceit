import { error } from '@sveltejs/kit';
import { getUser } from '$lib/server/db';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const { claims } = locals;

  if (!claims) error(401, 'Unauthorized');

  const user = await getUser(claims.id);

  if (!user) error(404, 'Not found');

  return { user };
};
