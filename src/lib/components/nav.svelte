<script lang="ts">
	import { page } from '$app/stores';

	import IconHome from '$lib/components/icon_home.svelte';
	import IconPlusCircle from '$lib/components/icon_plus_circle.svelte';
	import IconMagnifier from '$lib/components/icon_magnifier.svelte';
	import IconProfile from '$lib/components/icon_profile.svelte';


	const menuItems = [
		{ name: 'Hem', path: '/', icon: IconHome },
		{ name: 'Ny tävling', path: '/create-activity', icon: IconPlusCircle },
		{ name: 'Hitta användare', path: '/users', icon: IconMagnifier },
		{ name: 'Min profil', path: '/profile', icon: IconProfile }
	];

	$: activePath = $page.url.pathname;
</script>

<nav class="navbar">
	<ul class="nav-list">
	  {#each menuItems as item}
		<li class="nav-item {activePath === item.path ? 'item-active' : ''}">
			<svelte:component this={item.icon} iconClass="icon" />
			<a href={item.path}>{item.name}</a>
		</li>
	  {/each}
	</ul>
  </nav>

<style lang="scss">
	.navbar {
		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		padding: 1.5rem;
		width: 100%;
		z-index: 1000;
	}

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

			.icon {
				width: 24px;
				height: 24px;
				margin-bottom: 0.5rem;
			}

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
</style>
