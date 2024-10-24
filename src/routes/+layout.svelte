<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	const user = writable<App.User | null>();

	$: user.set(data.user);

	setContext('user', user);
</script>

<header>
	{#if $user}
		<div class="top-right">
			<a href="/create-activity">Create Activity</a>
			<div class="profile">
				<span>{$user?.firstName}</span>
				<form action="/logout" method="POST">
					<button type="submit">Logout</button>
				</form>
			</div>
		</div>
	{/if}
</header>

<main>
	<slot />
</main>

<footer></footer>

<style lang="scss">
	@import '$lib/style/mixins.scss';

	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	:global(body) {
		font-family: $font-sans-serif;
		@include text-sm;
		//Media Queries
		@media screen and (min-width: $media-sm) {
			// Add styles for small screens and up
			@include text-base;
		}

		@media screen and (min-width: $media-md) {
			// Add styles for medium screens and up
		}
	}

	:global(.stop-scroll) {
		overflow-y: hidden;
	}
	.top-right {
		display: flex;
		gap: 0.5rem;
		position: absolute;
		top: 1rem;
		right: 1rem;
	}

	.profile {
		display: flex;
		gap: 0.5rem;
	}
</style>
