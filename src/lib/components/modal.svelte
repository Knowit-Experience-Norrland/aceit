<script lang="ts">
	import { browser } from '$app/environment';
	import { focusTrap } from 'svelte-focus-trap';
	import IconClose from './icon_close.svelte';
	import Button from './button.svelte';
	import { onMount } from 'svelte';

	export let show = false;

	const handleClose = () => {
		show = false;
	};

	onMount(() => {
		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				handleClose();
			}
		});
  	});

	$: if (browser) document.body.classList.toggle('stop-scroll', show);
</script>

{#if show}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="backdrop" on:click={handleClose}></div>
	<div class="modal card" use:focusTrap>
		<Button buttonClass="icon positionRight" onClick={handleClose} ariaLabel="Close">
			<IconClose fill="white" width="32" height="32" />
		</Button>
		<slot />
	</div>
{/if}

<style lang="scss">
	.backdrop {
		position: fixed;
		inset: 0;
		// background: rgba(11, 11, 38, 0.5);
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(8px);
		z-index: 100;
	}
	.modal {
		width: 100%;
		max-width: $media-sm;
		max-height: 95vh;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 100;
		margin: 0;
		overflow: auto;
		
		@media screen and (max-width: 768px) {
			width: calc(100% - 2.5rem); 
		}
	}
</style>
