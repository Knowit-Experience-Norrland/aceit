<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	const { user } = data;
</script>

<div class="top-right">
	<span>{user?.firstName}</span>
	<form action="/logout" method="POST">
		<button type="submit">Logout</button>
	</form>
</div>
<h1>Welcome to SvelteKit {user?.firstName}</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<style>
	.top-right {
    display: flex;
    gap: 0.5rem;
		position: absolute;
		top: 1rem;
		right: 1rem;
	}
</style>
