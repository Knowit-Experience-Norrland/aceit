<script lang="ts">
	import type { PageServerData } from './$types';
	import IconStar from '$lib/components/icon_star.svelte';

	export let data: PageServerData;

	let searchTerm = '';

	$: filteredUsers = data.users.filter(user =>
		`${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
	);
</script>

<svelte:head>
	<title>Hitta användare</title>
</svelte:head>

<div class="card">
	<input
		type="text"
		placeholder="Sök efter namn"
		bind:value={searchTerm}
		class="search-input"
	/>

	{#each filteredUsers as user}
		<div class="card-user">
			<div class="row">
				<IconStar
					width="23"
					height="23"
					fill="#55D440"
				/>
				<p class="card-user-name">{user.firstName} {user.lastName}</p>
			</div>
			<div class="row">
				<p class="card-user-email">{user.email}</p>
			</div>
		</div>
	{/each}

	{#if filteredUsers.length === 0}
		<p>Inga användare hittades.</p>
	{/if}
</div>

<style lang="scss">

	.search-input {
		width: 100%;
		padding: 0.5rem;
		margin-bottom: 1rem;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.card-user {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1.25rem;

		.row {
			display: flex;
			align-items: center;
		}

		&-name {
			@include text-base-sb;
			padding-left: 0.5rem;
		}

		&-email {
			padding-left: calc(1.5rem + 8px);
		}
	}
</style>
