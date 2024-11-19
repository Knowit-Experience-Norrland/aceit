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
	<div class="profile-icon">
		<IconStar
			width="32"
			height="32"
			fill="#55D440"
		/>
	</div>
	<h2>{$user?.firstName} {$user?.lastName}</h2>
	<p>{$user?.email}</p>
	<form action="/logout" method="POST">
		<button class="logout-link" type="submit">Logga ut</button>
	</form>
</div>

<style lang="scss">
	.profile {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		&-icon {
			margin-bottom: 0.5rem;
		}

		h2 {
			@include text-lg;
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
</style>
