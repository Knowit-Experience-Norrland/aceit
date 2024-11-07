<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "./$types";

	import Input from '$lib/components/input.svelte';
	import Button from "$lib/components/button.svelte";

	export let form: ActionData;
</script>

<svelte:head>
	<title>Logga in</title>
</svelte:head>

<form method="POST" autocomplete="off" use:enhance>
	<div class="input">
		<Input
			label="E-postadress"
			type="email"
			id="email_input"
			name="email"
			value={form?.email ?? ""}
		/>
	</div>
	<div class="input">
		<Input
			label="Lösenord"
			type="password"
			id="password_input"
			name="password"
		/>
	</div>
	<div class="button">
		<Button
			label="Logga in"
			buttonClass="button primary"
			type="submit"
		/>
	</div>
</form>

<div>
	<a href="/register">Skapa konto</a>
</div>

{#if form?.error}
	<p class="error">
		{form.error}
	</p>
{/if}

<style lang="scss">
	.input {
		margin-bottom: 1rem;
	}
	.button {
		margin-top: 2.625rem;
		margin-bottom: 1.5rem;
	}
</style>