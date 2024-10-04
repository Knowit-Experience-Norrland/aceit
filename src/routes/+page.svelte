<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	// Retrieve user store from context
	const user = getContext<Writable<App.User>>('user');
</script>

<h1>Welcome to SvelteKit {$user?.firstName}</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
