<script lang="ts">
	export let values: App.InputValue[] = [];
	export let name: string = '';
	export let selectedValue: string = '';
	export let legend: string | undefined = undefined;
</script>

<fieldset>
	{#if legend}
		<legend>{legend}</legend>
	{/if}
	{#each values as { id, value, label }}
		<div class="radio">
			<input type="radio" {name} bind:group={selectedValue} id={id || value} {value} />
			<label for={id || value}>{label}</label>
		</div>
	{/each}
</fieldset>

<style lang="scss">
	fieldset {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border: none;
	}

	legend {
		margin: $m-xl;
	}

	.radio {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}

	input {
		appearance: none;
		margin: 0;

		font: inherit;
		color: $knowit-green;
		width: 1.15em;
		height: 1.15em;
		border: 1px solid $knowit-green;
		border-radius: 50%;
		transform: translateY(-0.075em);

		display: grid;
		place-content: center;

		&::before {
			content: '';
			width: 0.45em;
			height: 0.45em;
			border-radius: 50%;
			transform: scale(0);
			transition: 120ms transform ease-in-out;
			background-color: $clr-background;
		}

		&:checked {
			background-color: $knowit-green;
		}

		&:checked::before {
			transform: scale(1);
		}

		&:focus,
		&:hover {
			outline: max(3px, 0.15em) solid rgba(85, 212, 64, 0.5);
		}

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}
</style>
