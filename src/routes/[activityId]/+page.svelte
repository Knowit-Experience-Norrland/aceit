<script lang="ts">
	import type { ActionData, PageServerData } from './$types';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { sortUsers } from '$lib/sort';
	import ActivityForm from '$lib/components/activity_form.svelte';
	import Button from '$lib/components/button.svelte';
	import Tag from '$lib/components/tag.svelte';

	export let data: PageServerData;
	export let form: ActionData;

	const user = getContext<Writable<App.User>>('user');
	const users: App.InputValue[] = sortUsers(data.users.map((user) => ({
		id: user.id,
		value: user.id,
		label: `${user.firstName} ${user.lastName}`
	})), data.activity.admin);

	let editMode = false;
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
		editMode = true;
	}

	function toggleEditMode() {
		editMode = !editMode;
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

<h2>{activityName}</h2>

{#if !editMode}
	<Tag label={activityKind}/>
	<p>Antal omgångar: {holes}</p>
	<p>Beskrivning: {description}</p>
{:else}
	<ActivityForm
		nameValue={form?.name || activityName}
		gameType={form?.gameType || 'days'}
		{selectedDates}
		{holes}
		description={form?.description || description || ''}
		{users}
		{selectedUsers}
		formType="edit"
		formError={form?.error || ''}
	/>
{/if}

{#if isAdmin && !editMode}
	<Button type="button" label="Redigera" buttonClass="button primary" on:click={toggleEditMode} />
{/if}

{#if !isAdmin}
	<Button
		type="button"
		label={isMember ? 'Lämna tävling' : 'Gå med i tävling'}
		buttonClass="button primary"
		on:click={() => {
			setActivityMember(isMember ? 'leave' : 'join');
		}}
	/>
{/if}
