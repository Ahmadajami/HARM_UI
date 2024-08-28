<script lang="ts">
	import type { ApplicationInfo } from '$lib/applicanttypes';
	import { Calendar } from 'lucide-svelte';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';

	export let application: ApplicationInfo;
	$: date = new Date();
	let form: HTMLFormElement;

	const modalStore = getModalStore();

	function date_modal(id: number) {
		const modal: ModalSettings = {
			type: 'component',
			component: 'SetInterview',
			meta: { data: id }
		};

		modalStore.trigger(modal);
	}
</script>

<form
	bind:this={form}
	action="?/interview"
	method="post"
	name="interviewform"
	id="interviewform"
	use:enhance
>
	<div class="card variant-ghost">
		<div class="parents py-8 mx-4">
			<!--<div class="div1"><Table row={atom.applicant} /></div>-->

			<div class=" card variant-ghost-success p-4 shadow-lg div1">
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
					<p class="break-all ...">
						{application.motivationLetter}
					</p>
				</section>
				<hr class="!border-t-2 py-4" />
				<footer class="card-footer">
					<button
						type="button"
						class="btn variant-filled-success"
						on:click={() => {
							date_modal(application.id);
						}}
					>
						<span><Calendar /></span>
						<span> set interview</span>
					</button>
				</footer>
			</div>
		</div>
	</div>
</form>

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
</style>
