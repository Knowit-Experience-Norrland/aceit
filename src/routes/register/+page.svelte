<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "./$types";

	export let form: ActionData;
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<h1>Register</h1>

<form method="POST" autocomplete="off" use:enhance>
	<div>
		<label for="email_input">Email</label>
		<input
			type="email"
			id="email_input"
			name="email"
			value={form?.user?.email ?? ""}
		/>
	</div>
	<div>
		<label for="password_input">Password</label>
		<input type="password" id="password_input" name="password" />
	</div>
	<div>
		<label for="firstname_input">Firstname</label>
		<input
			type="text"
			id="firstname_input"
			name="firstname"
			value={form?.user?.firstName ?? ""}
		/>
	</div>
	<div>
		<label for="lastname_input">Lastname</label>
		<input
			type="text"
			id="lastname_input"
			name="lastname"
			value={form?.user?.lastName ?? ""}
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
