<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "./$types";

	import Button from "$lib/components/button.svelte";

	export let form: ActionData;
</script>

<svelte:head>
	<title>Logga in</title>
</svelte:head>

<form method="POST" autocomplete="off" use:enhance>
	<div>
		<label for="email_input">E-postadress</label>
		<input
			type="email"
			id="email_input"
			name="email"
			value={form?.email ?? ""}
		/>
	</div>
	<div>
		<label for="password_input">Lösenord</label>
		<input
			type="password"
			id="password_input"
			name="password"
		/>
	</div>
	<Button
		label="Logga in"
		buttonClass="button primary"
		type="submit"
	/>
</form>

{#if form?.error}
	<p class="error">
		{form.error}
	</p>
{/if}
