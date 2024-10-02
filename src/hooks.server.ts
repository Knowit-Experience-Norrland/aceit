import { authenticate } from '$lib/server/authenticate';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const claims = authenticate(event.cookies);
  const isOnAuthPage = event.url.pathname.startsWith('/login') || event.url.pathname.startsWith('/register');

  if (!claims?.id && !isOnAuthPage) {
    throw redirect(302, '/login');
  }

  if (claims?.id && isOnAuthPage) {
    throw redirect(302, '/');
  }

  if (claims?.id) {
    event.locals.claims = claims;
  }

  const response = await resolve(event);
  return response;
};
