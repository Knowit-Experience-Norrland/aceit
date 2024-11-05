<script lang="ts">
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';

	export let pageTitles: Record<string, string>;

	const pageTitle = derived(page, ($page) => {
		const path = $page.url.pathname;
		return pageTitles[path] || 'Page Not Found';
	});
</script>

<h1>{$pageTitle}</h1>

<style lang="scss">
	h1 {
		@include text-md;
		margin-top: 3.75rem;
		margin-bottom: 1.875rem;
		text-align: center;
	}
</style>
