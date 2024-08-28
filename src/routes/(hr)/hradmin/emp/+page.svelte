<script lang="ts">
	import Temptable from '$lib/components/Layouts/Temptable.svelte';
	import { page } from '$app/stores';
	import { getModalStore, getToastStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { FileSpreadsheet } from 'lucide-svelte';
	import { hired_toast } from '$lib/components/Layouts/mytoasts.js';

	export let data;
	export let form;
	//$: emp = data.employees;
	//$: m_all = data.dodo;
	//emp = emp;
	//m_all = m_all;

	const modals = getModalStore();
	const toaststore = getToastStore();

	function filesupload() {
		const modal: ModalSettings = {
			type: 'component',
			component: 'file'
		};

		modals.trigger(modal);
	}
	$: if ($page.url.searchParams.get('Hired')) {
		modals.clear();
		toaststore.trigger(hired_toast);
	}
	$: if (form?.filedone) {
		modals.clear();
	}
</script>

<div class="flex flex-row justify-between">
	<div><h1 class="h1 p-8">Employee Mangement</h1></div>
	<div class="mt-10">
		<button type="button" class="btn variant-filled" on:click={filesupload}>
			<span><FileSpreadsheet /></span>
			<span>Upload Attendence</span>
		</button>
	</div>
</div>

<div class="h-max p-8"></div>
