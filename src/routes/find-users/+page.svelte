<script lang="ts">
	import type { PageServerData } from './$types';

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
		<div class="user-entry">
			<p><strong>{user.firstName} {user.lastName}</strong></p>
			<p class="email">{user.email}</p>
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
</style>
