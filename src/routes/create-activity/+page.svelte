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

<ActivityForm
	nameValue={form?.name || ''}
	gameType={form?.gameType || 'days'}
	holes={holes}
	selectedDates={selectedDates}
	description={form?.description || ''}
	users={users}
	selectedUsers={selectedUsers}
	formType='create'
	formError={form?.error || ''}
/>
