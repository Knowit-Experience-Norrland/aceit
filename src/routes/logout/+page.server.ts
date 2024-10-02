import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { logout } from "$lib/server/authenticate";

export const actions: Actions = {
  default: async ({ cookies }) => {
    logout(cookies);
    throw redirect(302, "/login");
  }
};
