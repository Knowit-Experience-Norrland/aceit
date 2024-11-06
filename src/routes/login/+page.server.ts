import { fail, redirect } from "@sveltejs/kit";
import { login, cookieOptions } from "$lib/server/authenticate";
import type { Actions } from "./$types";

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();

		const email = (data.get("email") as string)
		?.toLowerCase()
		?.trim();
		const password = data.get("password") as string;

		const { error, token } = await login(email, password);

		if (error) {
			return fail(400, { email, error });
		}

		if (!token) {
			console.error("token was empty after login");
			return fail(500, { email, error: "Internal server error" });
		}

		event.cookies.set("token", token, cookieOptions);

		throw redirect(302, "/");
	}
};
