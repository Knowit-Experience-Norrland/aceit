<script lang="ts">
	import type { PageServerData } from './$types';
	import IconStar from '$lib/components/icon_star.svelte';

	export let data: PageServerData;

	const { user } = data;
</script>

<svelte:head>
	<title>Profile: {user.firstName} {user.lastName}</title>
</svelte:head>

<div class="card profile">
	<div class="profile-icon">
		<IconStar
			width="32"
			height="32"
			fill="#55D440"
		/>
	</div>
	<h2>{user.firstName} {user.lastName}</h2>
	<p>{user.email}</p>
</div>

<style lang="scss">
	.profile {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		&-icon {
			margin-bottom: 0.5rem;
		}
	}
</style>
