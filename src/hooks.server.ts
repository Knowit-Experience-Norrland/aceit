import { authenticate } from '$lib/server/authenticate';
import { connect } from '$lib/server/db';
import { redirect, type Handle } from '@sveltejs/kit';

// Connect to MongoDB before starting the server
connect().then((): void => {
  console.log("MongoDB started");
}).catch((e) => {
  console.error("MongoDB failed to start");
  console.error(e);
});

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
