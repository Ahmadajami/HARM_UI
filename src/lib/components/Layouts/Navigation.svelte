<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	const drawerStore = getDrawerStore();
	let hrefs: string[];
	let tabs_name: string[];
	if ($page.data.user.role === 'APP') {
		hrefs = ['/', '/apply', '/applications'];
		tabs_name = ['Home', 'FindJobs', 'MyApplications'];
	}
	if ($page.data.user.role === 'MG') {
		hrefs = ['/', '/vacation', '/empmange'];
		tabs_name = ['Home', 'Vacations', 'My Employee'];
	}
	if ($page.data.user.role === 'HR') {
		hrefs = ['/', '/vacation', '/apply', '/hradmin'];
		tabs_name = ['Home', 'Vacations', 'Appliers', 'Mangment'];
	}
	if ($page.data.user.role === 'EMP') {
		hrefs = ['/', '/vacation', '/myinfo'];
		tabs_name = ['Home', 'Vacations', 'Profile'];
	}

	$: found = (href_elment: string) =>
		$page.url.pathname === href_elment && href_elment != '/'
			? ' text-zinc-950 bg-primary-active-token'
			: 'text-zinc-950';
</script>

<section class="p-4 pb-20 space-y-4 overflow-y-auto">
	<!-- Title -->
	<p class="font-bold pl-4 text-2xl">Tabs as {$page.data.user.role}</p>
	<!-- Nav List -->
	<nav class="list-nav">
		<ul>
			{#each hrefs as href, i}
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<li on:keypress on:click={drawerStore.close}>
					<a {href} data-sveltekit-preload-data="hover" class={found(href)}>
						<span class="flex-auto">{tabs_name[i]}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</section>
