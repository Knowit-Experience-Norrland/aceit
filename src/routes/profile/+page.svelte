<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import IconStar from '$lib/components/icon_star.svelte';

	const user = getContext<Writable<App.User>>('user');
</script>

<svelte:head>
	<title>Min profil</title>
</svelte:head>

<div class="card profile">
	<IconStar
		width="32"
		height="32"
		fill="fill"
		iconClass="icon-star"
	/>
 
	<h2>{$user?.firstName} {$user?.lastName}</h2>
	<p>{$user?.email}</p>
	<form action="/logout" method="POST">
		<button class="logout-link" type="submit">Logga ut</button>
	</form>
</div>

<div class="card">
	<h2>Aktivitet A</h2>
</div>

<div class="card">
	<h2>Aktivitet B</h2>
</div>

<style lang="scss">
	.profile {

		h2,
		p {
			margin-bottom: 0.5rem;
		}

		.logout-link {
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
	}

	:global(.icon-star) {
		margin-bottom: 1rem;
		fill: $knowit-green;
	}
</style>
