<script lang="ts">
	import IconMagnifier from '$lib/components/icon_magnifier.svelte';
	import Button from './button.svelte';
	import IconChevron from './icon_chevron.svelte';

	export let name: string;
	export let id: string;
	export let value: string | number | undefined = "";
	export let type: 'text' | 'number' | 'email' | 'password' | 'search' = 'text';
	export let placeholder: string = '';
	export let label: string | undefined = undefined;
	export let disabled: boolean = false;
	export let inputClass: string = ''

	const updateValue = (action: 'increment' | 'decrement') => {
		if (typeof value === 'number') {
			value = action == 'increment' ? value + 1 : value - 1;
		}
	};

</script>

<div class="input-container">
	{#if label}
		<label for={id}>{label}</label>
	{/if}
	<div class="input-wrapper {inputClass}">

		{#if inputClass.includes('buttons')}
		<Button onClick={() => updateValue('decrement')} buttonClass="icon primary">
			<IconChevron direction="left"/>
		</Button>
		{/if}

		{#if type === 'number'}
			<input {name} {id} type="number" {placeholder} bind:value {disabled} />
		{:else if type === 'email'}
			<input {name} {id} type="email" {placeholder} bind:value {disabled} />
		{:else if type === 'password'}
			<input {name} {id} type="password" {placeholder} bind:value {disabled} />
		{:else if type === 'search'}
			<input {name} {id} type="search" {placeholder} bind:value {disabled} />
		{:else}
			<input {name} {id} type="text" {placeholder} bind:value {disabled} />
		{/if}

		{#if inputClass.includes('buttons')}
			<Button onClick={() => updateValue('increment')} buttonClass="icon primary">
				<IconChevron />
			</Button>
		{/if}

		{#if type === 'search'}
			<div class="svg-container">
				<IconMagnifier
					width="18"
					height="18"
				/>
			</div>
		{/if}
	</div>
</div>


<style lang="scss">
	.input-container {
		display: grid;
		gap: 1rem;

		.input-wrapper {
			position: relative;
			display: flex;

			input {
				width: 100%;
				padding: 0.5rem;
				padding-right: 2.5rem;
				@include border;
				@include border-radius;
				background: $clr-background;
				color: $clr-text;

				&:focus,
				&:hover {
					outline: max(3px, 0.15em) solid rgba(47, 49, 162, 0.5);
				}
				/* Removes the default spin buttons in number input fields for WebKit-based browsers (like Chrome and Safari) */
				&::-webkit-outer-spin-button,
				&::-webkit-inner-spin-button {
					-webkit-appearance: none;
					margin: 0;
				}
				/* Removes the default appearance of number input fields in Firefox */
				& {
					-moz-appearance: textfield;
				}
			}

			&.buttons {
				gap: 1rem;
				
				input {
					padding: 0.5rem 0;
					text-align: center;
				}
				&.small-input{
					input {
						max-width: 3.5rem;
					}
				}
			}

			.svg-container {
				position: absolute;
				top: 50%;
				right: 0.5rem;
				transform: translateY(-50%);
				width: 18px;
				height: 18px;
			}
		}
	}
</style>
