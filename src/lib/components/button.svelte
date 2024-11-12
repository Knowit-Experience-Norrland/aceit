<script lang="ts">
	export let label: string = 'Click Me';
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled: boolean = false;
	export let buttonClass: string = 'primary';
	export let preventDefault: boolean = false; 

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function handleClick(event: Event) {
		if (type !== 'submit' && !disabled) {
			dispatch('click');
			if (preventDefault) {
				event?.preventDefault();
			}
		}
	}
</script>

<style lang="scss">
	.button {
		display: inline-block;
		@include text-base-sb;
		color: $clr-text;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: background-color 0.2s;

		&.primary {
			background-color: $clr-primary-action;
			border: 0.5px solid $clr-primary-action;

			&:hover:not(:disabled) {
				filter: brightness(0.9);
			}
		}

		&.secondary {
			background-color: transparent;
			border: 0.5px solid $clr-text;

			&:hover:not(:disabled) {
				filter: brightness(0.9);
			}
		}
	}

	.primary:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>

<button
	type={type}
	on:click={handleClick}
	class={buttonClass}
	disabled={disabled}
>
	{label}
</button>
