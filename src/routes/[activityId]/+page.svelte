<script lang="ts">
	import type { ActionData, PageServerData } from './$types';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { sortUsers } from '$lib/sort';
	import ActivityForm from '$lib/components/activity_form.svelte';
	import Button from '$lib/components/button.svelte';
	import Modal from '$lib/components/modal.svelte';
	import IconEdit from '$lib/components/icon_edit.svelte';
	import IconPlus from '$lib/components/icon_plus.svelte';
	import IconMinus from '$lib/components/icon_minus.svelte';


	export let data: PageServerData;
	export let form: ActionData;

	const user = getContext<Writable<App.User>>('user');
	const users: App.InputValue[] = sortUsers(data.users.map((user) => ({
		id: user.id,
		value: user.id,
		label: `${user.firstName} ${user.lastName}`
	})), data.activity.admin);

	let showModal = false;
	const isAdmin = data.activity.admin === $user?.id;
	let activityName = data.activity.name;
	let activityKind = data.activity.kind;
	let holes = parseInt(form?.holes || data.activity.holes.length.toString());
	let description = data?.activity.description;
	let members = data.activity.members;
	let isMember = false;
	let activityDates: Date[] = data.activity.holes
		.filter((hole) => hole.date !== undefined)
		.map((hole) => new Date(hole.date!));
	let selectedUsers = members.map((member) => member.id);
	let selectedDates: Date[] = form?.dates
		? form.dates.filter((date) => date !== undefined).map((date) => new Date(date))
		: activityDates;

	$: isMember = members.some((member) => member.id === $user.id);

	if (form?.error) {
		showModal = true;
	}

	function toggleModal() {
		showModal = !showModal
	}

	async function setActivityMember(action: string) {
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

		return result;
	}
</script>

<div class="card">

<h2>{activityName}</h2>
{#if isAdmin && showModal == false}
<Button buttonClass="icon" onClick={toggleModal} ariaLabel='Close'>
	<IconEdit fill="white"/>
</Button>
{/if}

	<p>Aktivitet: {activityKind}</p>
	<p>Antal omgångar: {holes}</p>
	<p>Beskrivning: {description}</p>
</div>
<Modal bind:show={showModal}>
	<ActivityForm
		nameValue={form?.name || activityName}
		gameType={form?.gameType || 'days'}
		selectedDates={selectedDates}
		holes={holes}
		description={form?.description || description || ''}
		users={users}
		selectedUsers={selectedUsers}
		formError={form?.error || ''}
	>
		<Button
			type="button"
			label="Avbryt"
			buttonClass="secondary"
			onClick={toggleModal}
		/>
	</ActivityForm>
</Modal> 

{#if !isAdmin}
	<Button
		type="button"
		label={isMember ? 'Gå ur tävling' : 'Gå med i tävling'}
		buttonClass="text-icon"
		onClick={() => {
			setActivityMember(isMember ? 'leave' : 'join');
		}}
	>
		{#if isMember}
			<IconMinus fill="white" width="24" height="24"/>
		{:else}
			<IconPlus fill="white" width="24" height="24"/>
		{/if}
	</Button>
{/if}