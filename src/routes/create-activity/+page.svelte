<script lang="ts">
	import DatePicker from '$lib/components/date_picker.svelte';
	import Input from '$lib/components/input.svelte';
	import type { ActionData, PageServerData } from './$types';
	import { localDateStringWithoutTime } from '$lib/date';
	import { onMount } from 'svelte';
	import RadioButtons from '$lib/components/radio_buttons.svelte';
	import Checkboxes from '$lib/components/checkboxes.svelte';

	export let data: PageServerData;
	export let form: ActionData;

	const gameTypes: App.InputValue[] = [
		{ value: 'days', label: 'Välj dagar för omgångar' },
		{ value: 'free', label: 'Fria omgångar' }
	];
	const users: App.InputValue[] = data.users.map((user) => ({
		id: user.id,
		value: user.id,
		label: `${user.firstName} ${user.lastName}`
	}));

	let holes = parseInt(form?.holes || '18');
	let selectedDates: Date[] = form?.dates ? form.dates.map((date) => new Date(date)) : [];
	let gameType: string = form?.gameType || 'days';

	$: holes && updateDatesBasedOnHoles(holes);
	$: selectedDates && updateHolesBasedOnDates(selectedDates);

	const updateDatesBasedOnHoles = (holes: number) => {
		if (holes < selectedDates.length) {
			const numOfDatesToRemove = selectedDates.length - holes;
			selectedDates = selectedDates.slice(0, selectedDates.length - numOfDatesToRemove);
		} else if (holes > selectedDates.length) {
			generateDates();
		}
	};

	const updateHolesBasedOnDates = (dates: Date[]) => {
		holes = dates.length;
	};

	/**
	 * Generates dates based on the number of holes.
	 * Automatically skips off days (weekends).
	 */
	const generateDates = () => {
		const dates: Date[] = [];
		let j = holes - selectedDates.length;

		for (let i = 0; i < j; i++) {
			const lastDate = selectedDates[selectedDates.length - 1];

			const date = lastDate ? new Date(lastDate) : new Date();
			lastDate && date.setDate(lastDate.getDate() + 1);
			date.setDate(date.getDate() + i);
			const offDays = [0, 6]; // TODO: account for holidays

			if (offDays.includes(date.getDay())) {
				j++;
				continue;
			}

			dates.push(date);
		}

		selectedDates = [...selectedDates, ...dates];
	};

	onMount(generateDates);
</script>

<form action="" method="POST">
	<Input label="Namn på aktivitet" id="name_input" name="name" value={form?.name || ''} />
	<RadioButtons
		legend="Hur ska hålen spelas?"
		values={gameTypes}
		bind:selectedValue={gameType}
		name="gameType"
	/>

	{#if gameType === 'days'}
		<DatePicker bind:selectedDates />
		<input type="hidden" name="holes" value={holes} />
	{:else}
		<Input label="Antal hål" id="holes_input" name="holes" type="number" bind:value={holes} />
	{/if}

	<Input
		label="Beskrivning"
		id="description_input"
		name="description"
		value={form?.description || ''}
	/>

	{#each selectedDates as date}
		<input type="hidden" name="dates" value={localDateStringWithoutTime(date)} />
	{/each}

	<Checkboxes
		values={users}
		name="usersIds"
		selectedValues={form?.userIds || []}
		legend="Lägg till deltagare"
		checkAll
	/>

	<div class="actions">
		<button type="submit">Spara aktivitet</button>
		<a href="/">Avbryt</a><!-- TODO: Add back button -->
	</div>
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
		gap: 2rem;
	}

	input {
		padding: 0.5rem;
	}

	.actions {
		display: flex;
		gap: 1rem;
	}
</style>
