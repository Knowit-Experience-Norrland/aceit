<script lang="ts">
	export let name: string;
	export let id: string;
	export let rows: number = 4;
	export let cols: number = 50;
	export let value: string | number | undefined = '';
	export let placeholder: string = '';
	export let label: string | undefined = undefined;
	export let disabled: boolean = false;
</script>

<div>
	{#if label}
		<label for={id}>{label}</label>
	{/if}

	{#if name}
		<textarea {name} {id} {placeholder} bind:value {disabled} {rows} {cols} />
	{/if}
</div>

<style lang="scss">
	div {
		display: grid;
		gap: 0.5rem;

		textarea {

			@include border;
			@include border-radius;
            
            resize: none;
			padding: 0.5rem;
			background: $clr-background;
			color: $clr-text;
            font-family: $font-sans-serif;
            @include text-sm;
			&:focus,
			&:hover {
				outline: max(3px, 0.15em) solid rgba(47, 49, 162, 0.5);
			}
		}	

		::-webkit-scrollbar-track {
			margin: 2px;
		}
	}
</style>