<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	let active = false;

	import type { LayoutServerData } from './$types';
	import { Tab, TabGroup, getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import InterviewTable from '$lib/components/Layouts/InterviewTable.svelte';
	import { page } from '$app/stores';
	import { inter_toast } from '$lib/components/Layouts/mytoasts';
	import interview from '$lib/assets/interview.jpg';
	import vacancy from '$lib/assets/Vacancy.jpg';
	import benfits from '$lib/assets/benfits _new.jpg';
	import emps from '$lib/assets/employees.jpg';
	import vacations from '$lib/assets/vacaitions.jpg';

	const modal = getModalStore();
	const tost = getToastStore();
	modal.clear();

	const url = $page.url;
	//1:interview 2:employees 3: Vacancys 4: Benfirs 5:Vacations
	let idone = url.searchParams.get('Idone');
	if (idone) {
		modal.clear();
		tost.trigger(inter_toast);
	}

	let tabSet: number = 0;

	export let data: LayoutServerData;
	let d_class: string = 'card card-hover  text-center  w-60 shadow-xl';
	let hrefs: string[] = [
		'/hradmin/interviews',
		'/hradmin/emp',
		'/hradmin/vacancy',
		'/hradmin/benfits',
		'/hradmin/vacations'
	];
	let colorss: string[] = [
		' bg-secondary-600',
		'bg-secondary-500',
		' bg-secondary-400',
		' bg-secondary-300',
		'bg-secondary-200'
	];
	let colors: string[] = [
		'variant-glass-primary',
		'variant-glass-secondary',
		'variant-glass-tertiary',
		'variant-glass-success',
		'variant-glass-warning'
	];
	let titles: string[] = ['interviews', 'Employment', 'Vacancy', 'Benfits', 'Vacations'];
</script>

<div class="flex flex-row m-8 space-x-6">
	<a href="hradmin/interviews" class="card-hover overflow-hidden bg-initial">
		<header>
			<img src={interview} alt="An alt text" class=" object-fill" width="6144" height="3456" />
		</header>

		<div class=" card p-4">
			<h5 class="h5">Interviews</h5>
		</div>
	</a>
	<a href="/hradmin/emp" class="card-hover overflow-hidden bg-initial">
		<header>
			<img src={emps} alt="An alt text" class=" object-fill" width="6144" height="3456" />
		</header>

		<div class=" card p-4" transition:fade={{ duration: 300 }}>
			<h5 class="h5">Employees</h5>
		</div>
	</a>
	<a href="/hradmin/vacancy" class="card-hover overflow-hidden bg-initial">
		<header>
			<img src={vacancy} alt="An alt text" class=" object-fill" width="6144" height="3456" />
		</header>

		<div class=" card p-4" transition:fade={{ duration: 300 }}>
			<h5 class="h5">Vacancy</h5>
		</div>
	</a>
	<a href="/hradmin/benfits" class="card-hover overflow-hidden bg-initial">
		<header>
			<img src={benfits} alt="An alt text" class=" object-fill" width="6144" height="3456" />
		</header>

		<div class=" card p-4" transition:fade={{ duration: 300 }}>
			<h5 class="h5">Benfits</h5>
		</div>
	</a>
	<a href="/hradmin/vacations" class="card-hover overflow-hidden bg-initial">
		<header>
			<img src={vacations} alt="An alt text" class=" object-fill" width="6144" height="3456" />
		</header>

		<div class=" card p-4" transition:fade={{ duration: 300 }}>
			<h5 class="h5">Vacations</h5>
		</div>
	</a>
</div>

<div>
	<h1 class="h1 pb-2">Interviews Schedule</h1>
</div>
<div class="card card-hover h-max">
	<header class="card-header">
		<TabGroup>
			<Tab bind:group={tabSet} name="tab1" value={0}>
				<svelte:fragment slot="lead"></svelte:fragment>
				<span>Today interviews</span>
			</Tab>
			<Tab bind:group={tabSet} name="tab2" value={1}>Scheduled interviews</Tab>
		</TabGroup>
	</header>
	<section class="p-4">
		{#if tabSet === 0}
			<section class="pb-6">
				<InterviewTable List={data.interview ? data.interview : []} />
			</section>
		{:else if tabSet === 1}
			<section class="pb-6">
				<InterviewTable List={data.interview ? data.interview : []} />
			</section>
		{/if}
	</section>
</div>
<div class=" h-1/4"></div>

<style>
	.photos {
		width: 6144;
		height: 3456;
	}
</style>
