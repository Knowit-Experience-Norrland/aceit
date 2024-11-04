<script>
	import { page } from '$app/stores';

	import IconHome from '$lib/components/icon_home.svelte';
	import IconPlusCircle from '$lib/components/icon_plus_circle.svelte';
	import IconMagnifier from '$lib/components/icon_magnifier.svelte';
	import IconProfile from '$lib/components/icon_profile.svelte';


	const menuItems = [
		{ name: 'Hem', path: '/', icon: IconHome },
		{ name: 'Ny tävling', path: '/', icon: IconPlusCircle },
		{ name: 'Hitta användare', path: '/', icon: IconMagnifier },
		{ name: 'Min profil', path: '/profile', icon: IconProfile }
	];

	$: activePath = $page.url.pathname;
</script>

<nav>
	<ul>
		{#each menuItems as item}
			<li class:item-active={activePath === item.path}>
				<svelte:component this={item.icon} class="icon" />
				<a href={item.path}>{item.name}</a>
			</li>
		{/each}
	</ul>
</nav>

<style lang="scss">
	nav {

		ul {
			list-style-type: none;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			gap: 1.5rem;
			padding: 0;

			li {
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
				}
			}
		}
	}
</style>
