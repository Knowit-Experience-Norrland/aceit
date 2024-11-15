<script lang="ts">
	import IconMagnifier from '$lib/components/icon_magnifier.svelte';

	export let name: string;
	export let id: string;
	export let value: string | number | undefined = "";
	export let type: 'text' | 'number' | 'email' | 'password' | 'search' = 'text';
	export let placeholder: string = '';
	export let label: string | undefined = undefined;
	export let disabled: boolean = false;
</script>

<div class="input-container">
	{#if label}
		<label for={id}>{label}</label>
	{/if}
	<div class="input-wrapper">
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
		gap: 0.5rem;

		.input-wrapper {
			position: relative;

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
