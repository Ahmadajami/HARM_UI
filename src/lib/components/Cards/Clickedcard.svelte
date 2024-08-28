<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import ApplicationCard from './ApplicationCard.svelte';
	import { Laptop } from 'lucide-svelte';
	import type { ApplicationInfo } from '$lib/applicanttypes';
	export let application: ApplicationInfo[];

	let clicked = false;

	$: active = clicked ? 'bg-primary-active-token' : '';
	console.log('sss', application);
</script>

<div class="card card-hover {active} rounded-2xl">
	<section class="p-4 text-token text-pretty text-center">
		<Accordion rounded="rounded-2xl">
			{#each application as application}
				<AccordionItem>
					<svelte:fragment slot="lead"><Laptop /></svelte:fragment>
					<svelte:fragment slot="summary"
						>{application.vacancy.jobTitle} {application.vacancy.jobSalary}
					</svelte:fragment>
					<svelte:fragment slot="content"><ApplicationCard {application} /></svelte:fragment>
				</AccordionItem>
			{/each}
		</Accordion>
	</section>
</div>
