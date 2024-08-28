<script lang="ts">
	import BenfitsTable from '$lib/components/Layouts/BenfitsTable.svelte';
	import type { Benefit } from '$lib/mytypes';
	import { getModalStore, getToastStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import type { ActionData, PageData } from './$types';
	import { BadgePlus } from 'lucide-svelte';
	import { sad_toast, successfully_toast_benfits } from '$lib/components/Layouts/mytoasts';

	export let data: PageData;
	export let form: ActionData;
	let benfits: Benefit[] = data.all_benfits;
	const modalStore = getModalStore();
	const toastStore = getToastStore();
	$: all = data.all_benfits;
	$: {
		if (form?.done) {
			modalStore.close();
			toastStore.trigger(successfully_toast_benfits);
		}
		if (form?.donedel) {
			modalStore.close();
			toastStore.trigger(sad_toast);
		}
	}
</script>

<div class=" p-8 flex flex-col space-y-8">
	<div>
		<h1 class="h1 !text-5xl md:!text-6xl max-w-[600px]">Benfits Page</h1>
	</div>
	<div class="h-full"><BenfitsTable benfits={all} /></div>
</div>
