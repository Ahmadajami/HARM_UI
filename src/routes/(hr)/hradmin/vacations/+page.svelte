<script lang="ts">
	import VacationTable from '$lib/components/Layouts/VacationTable.svelte';
	import type { Vacations } from '$lib/mytypes';
	import { getModalStore } from '@skeletonlabs/skeleton';

	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
	const modalStore = getModalStore();
	$: v_t = data.tv_list;
	$: v_f = data.nv_list;
	$: all = v_t.concat(v_f);

	$: {
		if (form?.vapp) {
			modalStore.close();
		}
	}
	$: v_all = all;
</script>

<div class=" p-8 flex flex-col space-y-8">
	<div>
		<h1 class="h1 !text-5xl md:!text-6xl max-w-[600px]">VacationsPage</h1>
	</div>
	<div class="h-full"><VacationTable bind:v_all /></div>
</div>
