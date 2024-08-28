<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	import { Laptop } from 'lucide-svelte';
	import type { ApplicationInfo } from '$lib/applicanttypes';
	import Vapplication from './Vapplication.svelte';
	export let application: ApplicationInfo;

	let clicked = false;

	function choose_application() {
		clicked = !clicked;
	}
	$: active = clicked ? 'bg-primary-active-token' : '';
</script>

<div class="card card-hover {active}">
	<section class="p-4 text-token text-pretty text-center">
		<Accordion>
			<AccordionItem>
				<svelte:fragment slot="lead"><Laptop /></svelte:fragment>
				<svelte:fragment slot="summary"
					>{application.vacancy.jobTitle} {application.vacancy.jobSalary}
				</svelte:fragment>
				<svelte:fragment slot="content"><Vapplication {application} /></svelte:fragment>
			</AccordionItem>
		</Accordion>
	</section>
</div>
