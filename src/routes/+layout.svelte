<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import Nav from '$lib/components/nav.svelte';
	import PageTitle from '$lib/components/page_title.svelte';

	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	const user = writable<App.User | null>();

	$: user.set(data.user);

	setContext('user', user);


	const pageTitles = {
		'/': 'Pågående aktiviteter',
		'/create-activity': 'Skapa aktivitet',
		'/find-users': 'Hitta användare',
		'/profile': 'Profilsida',
		'/login': 'Logga in',
		'/register': 'Skapa konto',
	};
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

	<PageTitle {pageTitles} />
</header>

<main>
	<slot />
</main>

<footer>
	{#if $user}
		<Nav />
	{/if}
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
		-webkit-font-smoothing: antialiased;

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

	:global(.button-link) {
		background: none;
		border: none;
		color: inherit;
		text-decoration: underline;
		cursor: pointer;
		font: inherit;
		padding: 0;

		&:hover {
			text-decoration: none;
		}
	}

	:global(.stop-scroll) {
		overflow-y: hidden;
	}

	:global(.card) {
		border-radius: 0.5rem;
		background: $clr-card-bg;
		margin: 2rem 0;
		padding: 1.5rem 1.875rem;
	}
	

	:global(.card *::-webkit-scrollbar) {
		width: 8px;
	}

	:global(.card *::-webkit-scrollbar-track) {
		background-color: $knowit-off-white;
		border-radius: 4px;
	}

	:global(.card *::-webkit-scrollbar-thumb) {
		background-color: $knowit-green; 
		border-radius: 4px;
	}

	header,
	main,
	footer {
		width: 100%;
		max-width: $media-sm;
		margin: 0 auto;
		padding: 0 1.25rem;

		//Media Queries
		@media screen and (min-width: $media-md) {
			padding: 0;
		}
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
