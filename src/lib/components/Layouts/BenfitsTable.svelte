<script lang="ts">
	import type { Benefit } from '$lib/mytypes';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { Plus, Trash } from 'lucide-svelte';
	export let benfits: Benefit[];
	const modalStore = getModalStore();

	function del(id: number) {
		const modal: ModalSettings = {
			type: 'component',
			component: 'Confirmdel',
			meta: { data: id }
		};

		modalStore.trigger(modal);
	}
	function addbenefits() {
		const modal: ModalSettings = {
			type: 'component',
			component: 'AddnewBenefits'
		};

		modalStore.trigger(modal);
	}
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
	<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
		<caption
			class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800"
		>
			<div class="flex justify-between">
				<div>Our Benefits</div>

				<div>
					<button type="button" class="btn variant-filled rounded-full" on:click={addbenefits}>
						<span><Plus /> </span>
					</button>
				</div>
			</div>

			<p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
				These Benfits that we offer it to our employees .
			</p>
		</caption>
		<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
			<tr class="variant-filled">
				<th scope="col" class="px-6 py-3"> Benefits name </th>
				<th scope="col" class="px-6 py-3"> Cut precentege </th>
				<th scope="col" class="px-6 py-3"> Num of employees </th>
				<th> </th>
			</tr>
		</thead>
		<tbody>
			{#each benfits as b, i}
				<tr
					class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
				>
					<th
						scope="row"
						class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
					>
						{b.name}
					</th>
					<td class="px-6 py-4"> {b.cutPercentage} </td>
					<td class="px-6 py-4"> {i + 30} </td>
					<td
						><button
							type="button"
							class="btn-icon btn-sm hover:variant-filled-error rounded-none"
							on:click={() => {
								del(b.id);
							}}><Trash /></button
						></td
					>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
