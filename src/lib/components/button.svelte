<script lang="ts">
	export let label: string = '';
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled: boolean = false;
	export let buttonClass: string = 'primary';
	export let ariaLabel: string | undefined = undefined;
	export let onClick: () => void  = () => {};

</script>

<button
on:click={onClick}
	type={type}
	aria-label={ariaLabel}
	class={buttonClass}
	disabled={disabled}
>
{#if label}
	{label}
{/if}
	{#if $$slots}
		<slot/>
	{/if}
</button>

<style lang="scss">
	button {
		display: inline-block;
		font-family: $font-sans-serif;
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
				background-color: rgba(255, 255, 255, 0.08)
			}
		}
		&.text-icon {
			display: flex;
			background: none;
			border: none;
			padding: 0;
			margin: 0;
			box-shadow: none; 
			@include text-md;
			color: $clr-text;
			text-decoration: underline;
			line-height: 1.45rem;
			&:hover {
				text-decoration: none;
			}
		}
	}

	.primary:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.icon {
			display: flex;
			justify-content: center;
			align-items: center;
			background: none;
			border: none;
			padding: 0;
			margin: 0;
			cursor: pointer;
			box-shadow: none;

			&:hover {
				background: none;
				filter: none;
			}

			&.positionRight{
				position: absolute;
				right: 0;
				top: 0;
				padding: 0.5rem;
			}
		}

</style>

