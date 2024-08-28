<script lang="ts">
	import type { Benefit } from '$lib/mytypes';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import type { ActionData, PageData } from './$types';

	import { Psad_toast, successfully_toast_postions } from '$lib/components/Layouts/mytoasts';
	import Positionstable from '$lib/components/Layouts/Positionstable.svelte';

	export let data: PageData;
	export let form: ActionData;
	let benfits: Benefit[] = data.all_benfits;
	const modalStore = getModalStore();
	const toastStore = getToastStore();
	$: plist = data.lsit;
	$: {
		if (form?.postionsaddedss) {
			toastStore.clear();
			plist = plist;
			modalStore.close();
			toastStore.trigger(successfully_toast_postions);
			form.postionsaddedss = false;
		}
		if (form?.postionsdonedel) {
			toastStore.clear();
			plist = plist;
			modalStore.close();
			toastStore.trigger(Psad_toast);
			form.postionsdonedel = false;
		}
	}
</script>

<div class=" p-8 flex flex-col space-y-8">
	<div>
		<h1 class="h1 !text-5xl md:!text-6xl max-w-[600px]">Position Page</h1>
	</div>

	<div class="h-full"><Positionstable {plist} /></div>
</div>
