import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { connect } from "$lib/server/db";

export const load: LayoutServerLoad = async () => {
	const connection = await connect();

	if (!connection) throw error(500, "Database connection failed");

	return {};
};
