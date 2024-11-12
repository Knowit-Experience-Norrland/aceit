<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	// Retrieve user store from context
	const user = getContext<Writable<App.User>>('user');
</script>

<svelte:head>
	<title>Pågående aktiviteter</title>
</svelte:head>

<div class="card">
	<h2>Aktivitet A</h2>
</div>

<div class="card">
	<h2>Aktivitet B</h2>
</div>

<style lang="scss">
	h2 {
		@include text-lg;
	}
</style>
