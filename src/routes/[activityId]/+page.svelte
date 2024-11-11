<script lang="ts">
	import DatePicker from '$lib/components/date_picker.svelte';
	import Input from '$lib/components/input.svelte';
	import type { ActionData, PageServerData } from './$types';
	import { localDateStringWithoutTime } from '$lib/date';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import RadioButtons from '$lib/components/radio_buttons.svelte';
	import Checkboxes from '$lib/components/checkboxes.svelte';
	import { sortUsers } from '$lib/sort';

	const gameTypes: App.InputValue[] = [
		{ value: 'days', label: 'Välj dagar för omgångar' },
		{ value: 'free', label: 'Fria omgångar' }
	];

	export let data: PageServerData;
	export let form: ActionData;
	const user = getContext<Writable<App.User>>('user');

	const isAdmin = data.activity.admin === $user?.id;
	let editMode = false

	let activityName = data.activity.name;
	let activityKind = data.activity.kind;
	let holes = parseInt(form?.holes || data.activity.holes.length.toString());
	let description = data?.activity.description;
	let members = data.activity.members;
	let isMember = false
	let activityDates: Date[]  = data.activity.holes.filter(hole => hole.date !== undefined).map(hole => new Date(hole.date!) )

	if(form?.error){
		editMode = true
	}

	let selectedUsers = members.map(member => member.id);
	let selectedDates: Date[] = form?.dates ? form.dates.filter(date => date !== undefined).map((date) => new Date(date)) : activityDates;
	let gameType: string = form?.gameType || 'days';

	const users: App.InputValue[] = sortUsers(data.users.map((user) => ({
		id: user.id,
		value: user.id,
		label: `${user.firstName} ${user.lastName}`
	})), data.activity.admin);
	
	
	$: isMember = members.some(member => member.id === $user.id);
	$: holes && updateDatesBasedOnHoles(holes);
	$: selectedDates && updateHolesBasedOnDates(selectedDates);


	function toggleEditMode() {
		editMode = !editMode;
	}

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

	async function setActivityMember(action:string) {
		const response = await fetch(`/api/activity-member?get=${action}`, {
			method: 'PUT',
			body: JSON.stringify({ activityId: data.activity.id }),
			headers: {
				'content-type': 'application/json'
			}
		});

		const result = await response.json();
			
		if (result && result.members) {
			members = result.members;
			}

		return result
		
		}

</script>

<h2>{activityName}</h2>

{#if !editMode}
 	<p>Aktivitet: {activityKind}</p>
    <p>Antal omgångar: {holes}</p>
    <p>Beskrivning: {description}</p>  
{:else}
	<form action="" method="POST" >
		<Input label="Namn på aktivitet" id="name" type="text" name="name" value={form?.name || activityName} />
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
			value={form?.description || description || ''}
		/>

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
			<button type="submit">Spara aktivitet</button>
			<button>Avbryt</button>
		</div>
	</form>

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

{/if}

{#if isAdmin && !editMode}
	<button on:click={toggleEditMode}>Redigera</button>
{/if}


{#if !isAdmin}
<button on:click={() => { 
	 setActivityMember(isMember ? 'leave' : 'join'); 
 }}>
 	{#if isMember}Lämna tävling{/if}
    {#if !isMember}Gå med i tävling{/if}
</button>
{/if}

<style lang="scss">
	form {
		display: grid;
		gap: 1rem;
	}

	input {
		padding: 0.5rem;
	}

  button {
    flex: 1;
    min-width: 0;
  }
</style>