<script lang="ts">
	import { page } from '$app/stores';

	import IconHome from '$lib/components/icon_home.svelte';
	import IconHomeActive from '$lib/components/icon_home_active.svelte';
	import IconPlusCircle from '$lib/components/icon_plus_circle.svelte';
	import IconPlusCircleActive from '$lib/components/icon_plus_circle_active.svelte';
	import IconMagnifier from '$lib/components/icon_magnifier.svelte';
	import IconMagnifierActive from '$lib/components/icon_magnifier_active.svelte';
	import IconProfile from '$lib/components/icon_profile.svelte';
	import IconProfileActive from '$lib/components/icon_profile_active.svelte';

	const menuItems = [
		{ name: 'Hem', path: '/', icon: IconHome, iconActive: IconHomeActive },
		{ name: 'Ny tävling', path: '/create-activity', icon: IconPlusCircle, iconActive: IconPlusCircleActive },
		{ name: 'Hitta användare', path: '/find-users', icon: IconMagnifier, iconActive: IconMagnifierActive },
		{ name: 'Min profil', path: '/profile', icon: IconProfile, iconActive: IconProfileActive }
	];

	$: activePath = $page.url.pathname;
</script>

<nav class="navbar">
	<ul class="nav-list">
		{#each menuItems as item}
			<li class="nav-item {activePath === item.path ? 'item-active' : ''}">
				<svelte:component
					this={activePath === item.path ? item.iconActive : item.icon}
					iconClass="icon {activePath === item.path ? 'icon-active' : ''}"
				/>
				<a href={item.path}>{item.name}</a>
			</li>
		{/each}
	</ul>
</nav>

<style lang="scss">
	.navbar {
		position: fixed;
		bottom: 1.5rem;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		max-width: $media-sm;
		z-index: 1000;

		.nav-list {
			list-style: none;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			gap: 1.5rem;
			padding: 0;
			margin: 0;

			.nav-item {
				display: flex;
				flex-direction: column;
				align-items: center;

				a {
					@include text-xs;
					text-decoration: none;
					color: inherit;
				}

				&.item-active {

					a {
						@include text-xs-sb;
					}
				}
			}
		}

		:global(.icon) {
			width: 100%;
			height: 1.75rem;
			margin-bottom: 0.5rem;
		}

		:global(.icon-active) {
			width: 100%;
			height: 1.875rem;
			margin-bottom: 0.5rem;
		}
	}
</style>
