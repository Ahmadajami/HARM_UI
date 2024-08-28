<script lang="ts">
	import { Accordion, AccordionItem, getModalStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import VacancyDeatails from '$lib/components/Cards/VacancyDeatails.svelte';
	import { Laptop, Plus } from 'lucide-svelte';
	import { page } from '$app/stores';
	let date: Date | undefined;
	let appid: number | undefined;
	export let data: PageData;
</script>

<div class="p-8 flex justify-between space-y-8">
	<div>
		<h1 class="h1 !text-5xl md:!text-6xl max-w-[600px]">Vacancy Page</h1>
	</div>
	<div>
		<a href={$page.url.pathname + '/addnew'} class="btn variant-filled">
			<span><Plus /></span>
			<span>Add new vacancy</span>
		</a>
	</div>
</div>

<div class="py-9">
	<Accordion class="card p-4 text-black  !bg-transparent">
		{#each data.all_v as vacancy, i}
			<AccordionItem class="variant-filled">
				<svelte:fragment slot="lead"><Laptop /></svelte:fragment>
				<svelte:fragment slot="summary"><p class="font-bold">{vacancy.jobTitle}</p></svelte:fragment
				>
				<svelte:fragment slot="content">
					<!-- prettier-ignore -->
					<VacancyDeatails {vacancy} />
				</svelte:fragment>
			</AccordionItem>
		{/each}
	</Accordion>
</div>
