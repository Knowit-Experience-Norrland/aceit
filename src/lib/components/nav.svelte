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
			gap: 1.5rem;

			li {

				a {
					@include text-xs;
				}
			}
		}
	}
</style>
