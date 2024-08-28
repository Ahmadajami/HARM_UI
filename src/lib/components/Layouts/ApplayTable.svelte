<!-- Responsive Container (recommended) -->
<script lang="ts">
	import { jobType, type Vacancy } from '$lib/mytypes';
	export let vList: Vacancy[];
	export let choosen: number;

	function choose(id: number) {
		vList[id].choosed = !vList[id].choosed;
		vList.forEach((v, i) => {
			if (i != id) v.choosed = false;
		});
		choosen = id;
	}
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
	<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
		<caption
			class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800"
		>
			Our Jobs
			<p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
				Browse a list of Flowbite products designed to help you work and play, stay organized, get
				answers, keep in touch, grow your business, and more.
			</p>
		</caption>
		<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
			<tr class="variant-filled">
				<th scope="col" class="px-6 py-3"> Job Title </th>
				<th scope="col" class="px-6 py-3"> Job Salary </th>
				<th scope="col" class="px-6 py-3"> Job Type </th>
				<th scope="col" class="px-6 py-3"> yearsOfExperience </th>
			</tr>
		</thead>
		<tbody>
			{#each vList as v, i}
				<tr
					class="  {v.choosed
						? 'variant-ghost-secondary rounded-sm'
						: 'bg-white border-b hover:bg-gray-50'}"
					on:click={() => {
						choose(i);
					}}
				>
					<th
						scope="row"
						class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white [&>*]:pointer-events-none"
					>
						{v.jobTitle}
					</th>

					<th
						scope="row"
						class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
					>
						{v.jobSalary}
					</th>
					<th
						scope="row"
						class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
					>
						<span
							class="chip {v.jobType === jobType.FullTime
								? 'variant-filled-secondary'
								: 'variant-filled-warning'} ">{v.jobType}</span
						>
					</th>
					<th
						scope="row"
						class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
					>
						{v.yearsOfExperience}
					</th>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
