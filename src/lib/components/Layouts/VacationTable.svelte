<script lang="ts">
	import { page } from '$app/stores';
	import type { Vacations } from '$lib/mytypes';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	export let v_all: Vacations[];
	v_all = v_all;
	function approve(id: number) {
		const modal: ModalSettings = {
			type: 'component',
			component: 'Vconfirm',
			meta: { data: id }
		};

		modalStore.trigger(modal);
	}
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
	<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
		<caption
			class=" w-full p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800"
		>
			<div class="flex justify-between">
				<div>All Vacations</div>
			</div>

			<p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
				These Are All vacations that has been requested .
			</p>
		</caption>

		<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
			<tr class="variant-filled">
				<th scope="col" class="px-6 py-3"> Start Date </th>
				<th scope="col" class="px-6 py-3"> End Date </th>
				<th scope="col" class="px-6 py-3"> Payed </th>
				<th scope="col" class="px-6 py-3"> Status </th>
				<th scope="col" class="px-6 py-3"> number of days </th>
				<th scope="col" class="px-6 py-3"> Employee username </th>
			</tr>
		</thead>
		<tbody>
			{#each v_all as v}
				{#key v}
					<tr
						class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
					>
						<th
							scope="row"
							class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
						>
							{new Date(v.startDate).toLocaleDateString()}
						</th>
						<td class="px-6 py-4"> {new Date(v.endDate).toLocaleDateString()} </td>
						<td class="px-6 py-4">
							<span class="chip {v.payed ? 'variant-filled-success' : 'variant-filled-error'}"
								>Payed
							</span></td
						>
						<td class="px-6 py-4">
							<button
								type="button"
								class="btn rounded-full"
								on:click={() => {
									approve(v.id);
								}}
								disabled={v.approved ||
									$page.data.user.role === 'MG' ||
									$page.data.user.role === 'EMP'}
							>
								<span></span>
								<span class="chip {v.approved ? 'variant-filled-success' : 'variant-filled-error'}"
									>{v.approved ? 'Approved' : 'Not Approved'}</span
								>
							</button>
						</td>
						<td class="px-6 py-4">
							{v.numberOfDays}
						</td>
						<td class="px-6 py-4">
							{v.employeeUsername}
						</td>
					</tr>
				{/key}
			{/each}
		</tbody>
	</table>
</div>
