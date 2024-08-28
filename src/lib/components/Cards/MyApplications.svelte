<script lang="ts">
	import type { ApplicationInfo } from '$lib/applicanttypes';

	export let application: ApplicationInfo;
	let click = false;
</script>

<div class="card variant-ghost">
	<div class="parents py-8 mx-4">
		{#if application.qualifiedForInterview}
			<div></div>
			<div class="card variant-filled-success w-full">
				<h1>interview has been setted 😄 :{application.interviewDate.toLocaleString()}</h1>
			</div>
		{:else}
			<div></div>
			<div class="card variant-filled-warning">
				<h1>no interview 😭</h1>
			</div>
		{/if}
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
				<p>{application.motivationLetter}</p>
			</section>
			<hr class="!border-t-2 py-4" />
		</div>
	</div>
</div>

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
