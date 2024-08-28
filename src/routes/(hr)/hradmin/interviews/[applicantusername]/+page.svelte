<script lang="ts">
	import type { Applicant, ApplicationInfo } from '$lib/applicanttypes';
	import type { PageData } from './$types';
	import InfoCard from '$lib/components/Cards/InfoCard.svelte';
	import Clickedcard from '$lib/components/Cards/Clickedcard.svelte';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	const modalStore = getModalStore();
	export let data: PageData;
	let atom: ApplicationInfo[] = data.Application;

	let atom_Applicant: Applicant | undefined = data.applicant;
</script>

<div class="my-2">
	<InfoCard info={atom_Applicant} application_date={new Date()} />
</div>
<br />
<blockquote class="blockquote py-8">
	<h3 class="h3">{atom_Applicant?.firstName} Applications are : {atom.length}</h3>
</blockquote>
<form id="form1" name="form1" method="POST" use:enhance>
	<div class=" py-8">
		<div class="flex-col w-full mx-4"><Clickedcard application={atom} /></div>
	</div>
</form>
