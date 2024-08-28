<script lang="ts">
	import { Grid } from 'lucide-svelte';
	import type { PageData } from './$types';
	import type { ApplicationInfo } from '$lib/applicanttypes';
	import InfoCard from '$lib/components/Cards/InfoCard.svelte';

	import Vcard from '$lib/components/Cards/Vcard.svelte';
	import { enhance } from '$app/forms';

	export let data: PageData;
	let application: ApplicationInfo;
	let div: HTMLDivElement;
	let lenght: string = data.application_listv.length
		? data.application_listv.length.toString()
		: '0';

	function Clicked(id: number) {
		application = data.application_listv[id];
	}
</script>

<h1 class="h1">
	number of application for this is vacancy is {lenght}
</h1>

<div class="logo-cloud grid-cols-2 gap-1 p-8">
	{#each data.application_listv as v, i}
		<button
			class="logo-item hover:bg-blue-400"
			on:click={() => {
				Clicked(i);
			}}
		>
			<span><Grid /></span>
			<span>applicant name :{v.applicant.firstName + '' + v.applicant.lastName}</span>
		</button>
	{/each}
</div>
<!-- ... -->

{#if application}
	<div class="space-y-8">
		<InfoCard info={application.applicant} application_date={new Date()} />

		<Vcard {application} />
	</div>
{/if}
