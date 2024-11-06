<script lang="ts">
	import RadioButtons from './radio_buttons.svelte';

	export let values: App.InputValue[] = [];
	export let name: string = '';
	export let selectedValues: string[] = [];
	export let legend: string | undefined = undefined;
	export let checkAll: boolean = false;

	let radioValue = selectedValues.length === values.length ? 'all' : '';

	$: if (radioValue === 'all') {
		selectedValues = values.map((v) => v.id || v.value);
	}

	const toggleValue = (value: string) => {
		if (selectedValues.includes(value)) {
			selectedValues = selectedValues.filter((v) => v !== value);
		} else {
			selectedValues = [...selectedValues, value];
		}

		if (checkAll && selectedValues.length < values.length) {
			radioValue = '';
		}
	};
</script>

<fieldset>
	{#if legend}
		<legend>{legend}</legend>
	{/if}

	{#if checkAll}
		<RadioButtons
			bind:selectedValue={radioValue}
			values={[{ value: 'all', label: 'Markera alla' }]}
		/>
	{/if}
	{#each values as { value, label, id }}
		<span class="checkbox">
			<input
				type="checkbox"
				on:change={() => toggleValue(id || '')}
				{name}
				{value}
				{id}
				checked={selectedValues.includes(id || '')}
			/>
			<label for={id}>{label}</label>
		</span>
	{/each}
</fieldset>

<style lang="scss">
	legend {
		@include text-base;
		margin: $m-xl;
	}

	fieldset {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border: none;
	}

	.checkbox {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	input[type='checkbox'] {
		appearance: none;
		background-color: transparent;
		margin: 0;
		font: inherit;
		color: currentColor;
		width: 1.15em;
		height: 1.15em;
		border: 1px solid $knowit-green;
		border-radius: 0.15em;
		transform: translateY(-0.075em);
		display: grid;
		place-content: center;
		transition: 120ms background-color ease-in-out;

		&::before {
			content: '';
			width: 0.65em;
			height: 0.65em;
			transform: scale(0);
			transition: 120ms transform ease-in-out;
			box-shadow: inset 1em 1em $clr-background;

			transform-origin: bottom left;
			clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
		}

		&:checked {
			background-color: $knowit-green;
		}

		&:checked::before {
			transform: scale(1);
		}

		&:focus, &:hover {
			outline: max(3px, 0.15em) solid rgba(85, 212, 64, 0.5);
		}

		&:disabled {
      opacity: 0.5;
			cursor: not-allowed;
		}
	}
</style>
