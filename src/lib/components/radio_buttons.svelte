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
			<input
				type="radio"
				{name}
				bind:group={selectedValue}
				id={id || value}
				{value}
			/>
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

	input[type='radio'] {
		appearance: none;
		margin: 0;

		font: inherit;
		color: $knowit-green;
		width: 1.15em;
		height: 1.15em;
		border: 0.15em solid $knowit-green;
		border-radius: 50%;
		transform: translateY(-0.075em);

		display: grid;
		place-content: center;
	}

	input[type='radio']::before {
		content: '';
		width: 0.45em;
		height: 0.45em;
		border-radius: 50%;
		transform: scale(0);
		transition: 120ms transform ease-in-out;
		background-color: $clr-background;
	}

	input[type='radio']:checked {
		background-color: $knowit-green;
	}

	input[type='radio']:checked::before {
		transform: scale(1);
	}

	input[type='radio']:focus {
		outline: max(2px, 0.15em) solid $clr-text;
		outline-offset: max(2px, 0.15em);
	}
</style>
