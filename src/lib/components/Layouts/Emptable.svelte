<script lang="ts">
	import type { Employee } from '$lib/mytypes';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { MessageCircleWarning } from 'lucide-svelte';

	export let employee: Employee[];
	let s: boolean = false;

	function firstTwoChars(x: string): string {
		return x.slice(0, 2);
	}
</script>

<!-- Responsive Container (recommended) -->
<div class=" card container p-8">
	<div class="table-container">
		<!-- Native Table Element -->
		<table class="table table-hover">
			<caption class=" p-5 text-lg font-semibold text-left rtl:text-right">
				Our products
				<p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
					Browse a list of Flowbite products designed to help you work and play, stay organized, get
					answers, keep in touch, grow your business, and more.
				</p>
			</caption>
			<tr>
				<th></th>
				<th class="btn variant-filled rounded-full"
					><span>(icon)</span>
					<span>Name</span></th
				>
				<th>Position</th>
				<th>Salary</th>
				<th>Manger</th>
				<th>warnings</th>
				<th></th>
			</tr>

			<tbody>
				{#each employee as emp, i}
					<tr>
						<td><Avatar initials={firstTwoChars(emp.firstName)} width="w-8" /></td>
						<td>{emp.firstName + ' ' + emp.lastName}</td>
						<td>{emp.position}</td>
						<td>{emp.salary}</td>
						<td>{emp.manager.managerFirstName + ' ' + emp.manager.managerLastName}</td>
						<td>{emp.warnings.length}</td>
						<td class="table-cell-fit">
							<a href="/hradmin/emp/{emp}" class="btn btn-sm variant-filled w-min">
								<span><MessageCircleWarning /></span>
								<span>View Deatails</span>
							</a></td
						>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<th colspan="3">Calculated Total Weight</th>
					<td></td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
