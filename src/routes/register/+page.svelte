<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "./$types";

	import Input from "$lib/components/input.svelte";

	export let form: ActionData;
</script>

<svelte:head>
	<title>Skapa konto</title>
</svelte:head>

<form method="POST" autocomplete="off" use:enhance>
	<div>
		<Input
			label="Förnamn"
			type="text"
			id="firstname_input"
			name="firstname"
			value={form?.user?.firstName ?? ""}
		/>
	</div>
	<div>
		<Input
			label="Efternamn"
			type="text"
			id="lastname_input"
			name="lastname"
			value={form?.user?.lastName ?? ""}
		/>
	</div>
	<div>
		<Input
			label="E-postadress" 
			type="email"
			id="email_input"
			name="email"
			value={form?.user?.email ?? ""}
		/>
	</div>
	<div>
		<Input
			label="Lösenord"
			type="password"
			id="password_input"
			name="password"
		/>
	</div>
	<button>Register</button>
</form>

{#if form?.message}
	<p class="success">
		{form.message}
	</p>
{/if}

{#if form?.error}
	<p class="error">
		{form.error}
	</p>
{/if}
