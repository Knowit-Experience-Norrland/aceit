<script lang="ts">
	export let values: App.InputValue[] = [];
	export let name: string = '';
	export let selectedValues: string[];
	export let legend: string | undefined = undefined;
	export let checkAll: boolean = false;
	export let disabledValues: string[];

	$: isAllSelected = selectedValues.length === values.length;

	function toggleValues() {
		if (isAllSelected) {
			selectedValues = disabledValues;
		} else {
			selectedValues = values.map((v) => v.id || v.value);
		}
	}
</script>

<fieldset>
	{#if legend}
		<legend>{legend}</legend>
	{/if}
	{#if checkAll}
		<span class="checkbox">
			<input
				type="checkbox"
				name="all"
				bind:checked={isAllSelected}
				id="all"
				on:change={toggleValues}
			/>
			<label for="all">Välj alla</label>
		</span>
	{/if}

	{#each values as { value, label, id }}
		<span class="checkbox">
			<input
				type="checkbox"
				{name}
				{value}
				{id}
				checked={selectedValues.includes(id || '')}
				disabled={disabledValues.includes(id || '')}
				bind:group={selectedValues}
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
