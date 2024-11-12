<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Input from '$lib/components/input.svelte';
	import RadioButtons from './radio_buttons.svelte';
	import DatePicker from './date_picker.svelte';
	import { localDateStringWithoutTime } from '$lib/date';
	import Checkboxes from './checkboxes.svelte';
	import Button from './button.svelte';

	export let nameValue: string;
	export let gameType: string;
	export let holes: number;
	export let selectedDates: Date[];
	export let description: string;
	export let users: App.InputValue[];
	export let selectedUsers: string[];
	export let formType: string;
	export let formError: string;

	function cancelEdit() {
		
		//close modal
	}

	const user = getContext<Writable<App.User>>('user');

	const gameTypes: App.InputValue[] = [
		{ value: 'days', label: 'Välj dagar för omgångar' },
		{ value: 'free', label: 'Fria omgångar' }
	];

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
	<Input label="Namn på aktivitet" id="name" type="text" name="name" value={nameValue} />
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
	    <Input label="Beskrivning" id="description_input" name="description" value={description} />

	{#each selectedDates as date}
		<input type="hidden" name="dates" value={localDateStringWithoutTime(date)} />
	{/each}

	<Checkboxes
		values={users}
		name="userIds"
		selectedValues={selectedUsers}
		legend="Lägg till deltagare"
		checkAll
		disabledValues={[$user.id]}
	/>

	<div class="actions">
		<Button type="submit" label="Spara aktivitet" buttonClass="button primary" />
		{#if formType === 'create'}
			<a href="/">Avbryt</a><!-- TODO: Add back button -->
		{:else}
			<Button
				type="button"
				label="Avbryt"
				buttonClass="button secondary"
				preventDefault={true}
				on:click={cancelEdit}
			/>
		{/if}
	</div>
</form>

{#if formError}
	<p class="error">{formError}</p>
{/if}

<style lang="scss">
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
