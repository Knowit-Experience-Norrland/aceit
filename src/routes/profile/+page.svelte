<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import IconStar from '$lib/components/icon_star.svelte';

	const user = getContext<Writable<App.User>>('user');
</script>

<div class="card">
	<IconStar
		width="32"
		height="32"
		fill="icon"
	/>
 
	<h2>{$user?.firstName} {$user?.lastName}</h2>
	<p>{$user?.email}</p>
	<form action="/logout" method="POST">
		<button type="submit">Logout</button>
	</form>
	
</div>

<style lang="scss">

</style>
