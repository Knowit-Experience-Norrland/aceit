<script lang="ts">
	import type { PageServerData } from './$types';

	import IconStar from '$lib/components/icon_star.svelte';
	import Input from "$lib/components/input.svelte";

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
	<div class="input">
		<Input
			id="search-input"
			name="searchTerm"
			type="search"
			placeholder="Sök användare..."
			bind:value={searchTerm}
		/>
	</div>

	{#each filteredUsers as user}
		<div class="card-user">
			<div class="row">
				<IconStar
					width="23"
					height="23"
					fill="#55D440"
				/>
				<span class="card-user-name">
					<a href={`/profile/${user.id}`}>
						{user.firstName} {user.lastName}
					</a>
				</span>
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

	.card {

		.input {
			margin-bottom: 2rem;
		}

		&-user {
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
	}
</style>
