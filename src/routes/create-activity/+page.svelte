<script lang="ts">
	import type { ActionData, PageServerData } from './$types';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { sortUsers } from '$lib/sort';
	import ActivityForm from '$lib/components/activity_form.svelte';

	export let data: PageServerData;
	export let form: ActionData;

	const user = getContext<Writable<App.User>>('user');
	const users: App.InputValue[] = sortUsers(data.users.map((user) => ({
		id: user.id,
		value: user.id,
		label: `${user.firstName} ${user.lastName}`,
	})), $user.id);

	
	let selectedUsers = form?.userIds || [$user.id];

	let holes = parseInt(form?.holes || '18');
	let selectedDates: Date[] = form?.dates ? form.dates.map((date) => new Date(date)) : [];

</script>
<div class="card">
	<ActivityForm
		nameValue={form?.name || ''}
		gameType={form?.gameType || 'days'}
		holes={holes}
		selectedDates={selectedDates}
		description={form?.description || ''}
		users={users}
		selectedUsers={selectedUsers}
		formError={form?.error || ''}
	>
		<a href="/" class="abortLink">Avbryt</a> 
	</ActivityForm>
</div>

<style lang="scss">
	.abortLink {
		display: inline-block;
		@include text-base-sb;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: background-color 0.2s;
		background-color: transparent;
		border: 0.5px solid $clr-text;
		text-decoration: none;

		&:hover {
			background-color: rgba(255, 255, 255, 0.08)
		}
	}
</style>