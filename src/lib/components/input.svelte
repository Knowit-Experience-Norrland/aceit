<script lang="ts">
	export let name: string;
	export let id: string;
	export let value: string | number;
	export let type: 'text' | 'number' = 'text';
	export let placeholder: string = '';
	export let label: string | undefined = undefined;
	export let disabled: boolean = false;
</script>

<div>
	{#if label}
		<label for={id}>{label}</label>
	{/if}
	<input {name} {id} {type} {placeholder} {value} {disabled} />
</div>

<style lang="scss">
	div {
    display: grid;
    gap: 0.5rem;

		label {
			@include text-sm;
		}

		input {
			padding: 0.5rem;
		}
	}
</style>
