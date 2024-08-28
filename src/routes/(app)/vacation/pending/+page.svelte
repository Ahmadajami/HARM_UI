<script lang="ts">
	import type { PageData } from './$types';
	import type { Vacations } from '$lib/mytypes';
	import VacationTable from '$lib/components/Layouts/VacationTable.svelte';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	export let data: PageData;
	let v_all = data.pending;
</script>

{#await v_all}
	<ProgressBar />
{:then v_all}
	<div class="h-full m-4">
		<h1 class="m-4 h1">Pending Vacations</h1>
		<VacationTable {v_all} />
	</div>
{:catch err}
	<p>err</p>
{/await}
