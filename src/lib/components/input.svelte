<script lang="ts">
	export let name: string;
	export let id: string;
	export let value: string | number | undefined = "";
	export let type: 'text' | 'number' | 'email' | 'password' = 'text';
	export let placeholder: string = '';
	export let label: string | undefined = undefined;
	export let disabled: boolean = false;
</script>

<div>
	{#if label}
		<label for={id}>{label}</label>
	{/if}
	{#if type === 'number'}
		<input {name} {id} type="number" {placeholder} bind:value {disabled} />
	{:else if type === 'email'}
		<input {name} {id} type="email" {placeholder} bind:value {disabled} />
	{:else if type === 'password'}
		<input {name} {id} type="password" {placeholder} bind:value {disabled} />
	{:else}
		<input {name} {id} type="text" {placeholder} bind:value {disabled} />
	{/if}
</div>

<style lang="scss">
	div {
		display: grid;
		gap: 0.5rem;

		input {
			@include border;
			@include border-radius;
			padding: 0.5rem;
			background: $clr-background;
			color: $clr-text;

			&:focus,
			&:hover {
				outline: max(3px, 0.15em) solid rgba(47, 49, 162, 0.5);
			}
		}
	}
</style>
