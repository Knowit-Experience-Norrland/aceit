import { cookieOptions, register } from "$lib/server/authenticate";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async (event) => {
    const data = await event.request.formData();

    const email = (data.get("email") as string)
      ?.toLowerCase()
      ?.trim();
    const password = data.get("password") as string;
    const firstName = (data.get("firstname") as string)?.trim();
    const lastName = (data.get("lastname") as string)?.trim();

    const user = { email, firstName, lastName };

    const { error, token } = await register(email, password, firstName, lastName);

    if (error) {
      return fail(400, { user, error });
    }

    if (!token) {
      return fail(500, { user, error: "Internal server error" });
    }

    event.cookies.set("token", token, cookieOptions);

    throw redirect(302, "/");
  }
};
