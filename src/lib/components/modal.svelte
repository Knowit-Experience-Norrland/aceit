<script lang="ts">
	import { browser } from '$app/environment';
	import { focusTrap } from 'svelte-focus-trap';

	export let show = false;

	const handleClose = () => {
		show = false;
	};

	$: if (browser) document.body.classList.toggle('stop-scroll', show);
</script>

{#if show}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="backdrop" on:click={handleClose}></div>
	<div class="modal" use:focusTrap>
		<button on:click={handleClose} class="modal__close">&#10006;</button>
		<slot />
	</div>
{/if}

<style lang="scss">
	.backdrop {
		position: fixed;
		inset: 0;
		background: rgba(11, 11, 38, 0.5);
		backdrop-filter: blur(8px);
		z-index: 10;
	}
	.modal {
    background: white;
		width: 720px;
		max-width: 95vw;
		height: 500px;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 100;
		&__close {
			background: none;
			border: none;
			position: absolute;
			right: 0;
			top: 0;
		}
	}
</style>
