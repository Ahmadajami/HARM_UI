<script lang="ts">
	import type { ApplicationInfo } from '$lib/applicanttypes';
	import { Award } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { Wand2 } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import ScreenRes from './ScreenRes.svelte';

	export let application: ApplicationInfo;
	let show = false;

	const modalStore = getModalStore();
	const modal: ModalSettings = {
		type: 'component',
		component: 'HireForm'
	};
	function manger_modal() {
		modalStore.trigger(modal);
	}
	function ai() {
		show = !show;
	}
</script>

<div class="card variant-ghost">
	<div class="parents py-8 mx-4">
		<!--<div class="div1"><Table row={atom.applicant} /></div>-->

		<div class=" card variant-ghost-primary p-4 shadow-lg div1">
			<header class="card-header h3">{application.vacancy.jobTitle}</header>
			<section class="p-4">
				<p>programmingLanguage: {application.programmingLanguage}</p>
				<br />
				<hr />

				<p class="h3">previousProjects {application.previousProjects.length}:</p>
				{#each application.previousProjects as previousProjects}
					<p>Name: {previousProjects.name}</p>
					<p>Company Name: {previousProjects.companyName}</p>
					<p>description: {previousProjects.description}</p>
					<br />
					<hr />
				{/each}
			</section>
			<footer class="card-footer">
				<div class="parents"></div>
			</footer>
		</div>
		<div class="card p-4 variant-glass shadow-lg div2">
			<header class="card-header h3">motivationLetter</header>
			<section class="p-4">
				<p class="break-all ...">{application.motivationLetter}</p>
			</section>
			<hr class="!border-t-2 py-4" />
			<footer class="card-footer">
				<div class="flex flex-row-reverse justify-between">
					<div>
						<button type="button" class="btn variant-filled-primary" on:click={manger_modal}>
							<span><Award /></span>
							<span> Hire Him</span>
						</button>
					</div>
					{#if show}
						<div>
							<button type="button" class="btn variant-filled-warning" on:click={ai}>
								<span><Wand2 /></span>
								<span>Hide</span>
							</button>
						</div>
					{/if}
					{#if application.screeningResults && !show}
						<div>
							<button type="button" class="btn variant-filled-warning" on:click={ai}>
								<span><Wand2 /></span>
								<span>Ai</span>
							</button>
						</div>
					{/if}
				</div>
			</footer>
		</div>
		{#if application.screeningResults && show}
			<div class="div3" transition:fade={{ delay: 400, duration: 500 }}>
				<ScreenRes screeningResults={application.screeningResults} />
			</div>
		{/if}
	</div>
</div>
<input type="text" value={application.id} name="applicationid" form="form1" hidden />

<style>
	.parents {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: 1fr;
		grid-column-gap: 4px;
		grid-row-gap: 4px;
	}

	.div1 {
		grid-area: 1 / 1 / 2 / 2;
	}
	.div2 {
		grid-area: 1 / 2 / 2 / 3;
	}
	.div3 {
		grid-area: 2 / 1 / 3 / 3;
	}
</style>
