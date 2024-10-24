<script lang="ts">
	import type { ActionData, PageServerData } from './$types';

	export let data: PageServerData;
	export let form: ActionData;
</script>

<h1>Add Activity</h1>

<form action="" method="POST">
	<label for="name_input">Name</label>
	<input id="name_input" name="name" type="text" value={form?.name || ''} />
	<label for="holes_input">Holes</label>
	<input id="holes_input" name="holes" type="number" value={form?.holes || 0} />

	{#each data.users as user}
		<label for={user.id}>{user.firstName} {user.lastName}</label>
		<input type="checkbox" name="users" value={user.id} id={user.id} />
	{/each}

	<button>Add</button>
</form>

{#if form?.error}
  <p class="error">{form.error}</p>
{/if}
