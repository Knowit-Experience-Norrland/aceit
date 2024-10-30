<script lang="ts">
	import DatePicker from '$lib/components/date_picker.svelte';
	import Input from '$lib/components/input.svelte';
	import type { ActionData, PageServerData } from './$types';
	import { localDateStringWithoutTime } from '$lib/date';

	export let data: PageServerData;
	export let form: ActionData;

	let selectedDates: Date[] = form?.dates ? form.dates.map((date) => new Date(date)) : [];
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

	<DatePicker bind:selectedDates />

	{#each selectedDates as date}
		<input type="hidden" name="dates" value={localDateStringWithoutTime(date)} />
	{/each}

	<fieldset>
		<legend>Lägg till deltagare</legend>
		{#each data.users as user}
			<span>
				<input
					type="checkbox"
					name="users"
					value={user.id}
					id={user.id}
					checked={form?.users?.includes(user.id)}
				/>
				<label for={user.id}>{user.firstName} {user.lastName}</label>
			</span>
		{/each}
	</fieldset>

	<button type="submit">Spara aktivitet</button>
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
