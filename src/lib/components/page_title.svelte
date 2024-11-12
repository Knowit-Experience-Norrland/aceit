<script lang="ts">
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';

	export let pageTitles: Record<string, string>;

	const pageTitle = derived(page, ($page) => {
		const path = $page.url.pathname;
		return pageTitles[path] || 'Page Not Found';
	});

	const computedClass = derived(pageTitle, ($pageTitle) => {
		if ($pageTitle === 'Logga in') return 'login-title';
		if ($pageTitle === 'Skapa konto') return 'login-title';
		return 'default-title';
	});
</script>

<h1 class={$computedClass}>{$pageTitle}</h1>

<style lang="scss">
	h1 {
		@include text-md;
		margin-top: 3.75rem;
		margin-bottom: 1.875rem;
		text-align: center;

		&.login-title {
			@include text-lg;
			margin-top: 7.125rem;
			margin-bottom: 2rem;
		}
	}
</style>
