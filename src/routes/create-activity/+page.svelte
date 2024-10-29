<script lang="ts">
	import Input from '$lib/components/input.svelte';
	import type { ActionData, PageServerData } from './$types';

	export let data: PageServerData;
	export let form: ActionData;
</script>

<h1>Skapa aktivitet</h1>

<form action="" method="POST">
	<Input label="Namn på aktivitet" id="name_input" name="name" value={form?.name || ''} />
	<Input label="Antal hål" id="holes_input" name="holes" type="number" value={form?.holes || 0} />
	<Input
		label="Beskrivning"
		id="description_input"
		name="description"
		value={form?.description || ''}
	/>

	<fieldset>
		<legend>Lägg till deltagare</legend>
		{#each data.users as user}
			<span>
				<input type="checkbox" name="users" value={user.id} id={user.id} />
				<label for={user.id}>{user.firstName} {user.lastName}</label>
			</span>
		{/each}
	</fieldset>

	<button>Add</button>
</form>

{#if form?.error}
	<p class="error">{form.error}</p>
{/if}

<style lang="scss">
	h1 {
		@include text-lg;
		margin: $m-lg;
	}

	form {
		display: grid;
		gap: 1rem;
	}

	fieldset {
		display: flex;
		flex-direction: column;
	}

	input {
		padding: 0.5rem;
	}

  button {
    flex: 1;
    min-width: 0;
  }
</style>
