<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';

	import Nav from '$lib/components/nav.svelte';

	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	const user = writable<App.User | null>();

	$: user.set(data.user);

	setContext('user', user);

	// Mapping of route paths to custom page names
	const pageNames: Record<string, string> = {
		'/': 'Pågående aktiviteter',
		'/create-activity': 'Skapa aktivitet',
		'/find-users': 'Hitta användare',
		'/profile': 'Profilsida',
	};

	// Reactive statement to update `pageName` based on the current path
	let pageName = 'Home';
	$: {
		const path = $page.url.pathname;
		pageName = pageNames[path] || 'Sidan hittades inte';
	}
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

	<h1>{pageName}</h1>
</header>

<main>
	<slot />
</main>

<footer>
	<Nav />
</footer>

<style lang="scss">
	@import '$lib/style/mixins.scss';

	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(body) {
		background: $knowit-background;
		color: $clr-text;
		font-family: $font-sans-serif;
		@include text-base;

		//Media Queries
		@media screen and (min-width: $media-sm) {
			// Add styles for small screens and up
		}

		@media screen and (min-width: $media-md) {
			// Add styles for medium screens and up
		}
	}

	:global(h1) {
		@include text-lg;
	}

	:global(h2) {
		@include text-md;
	}

	:global(a) {
		@include text-md;
		color: $clr-text;
		text-decoration: underline;

		&:hover {
			text-decoration: none;
		}
	}

	:global(.stop-scroll) {
		overflow-y: hidden;
	}

	header {

		h1 {
			@include text-md;
			margin-top: 3.75rem;
			margin-bottom: 1.875rem;
			text-align: center;
		}
	}

	header,
	main,
	footer {
		width: 100%;
		max-width: $media-sm;
		margin: 0 auto;
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
