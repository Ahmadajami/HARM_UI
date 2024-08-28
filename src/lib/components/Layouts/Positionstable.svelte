<script lang="ts">
	import type { Positions } from '$lib/mytypes';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { Plus, Trash } from 'lucide-svelte';
	import { onMount } from 'svelte';

	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	export let plist: Positions[];

	const modalStore = getModalStore();

	function adds() {
		const modal: ModalSettings = {
			type: 'component',
			component: 'AddnewPostions'
		};
		modalStore.trigger(modal);
	}
	function del(id: number) {
		const modal: ModalSettings = {
			type: 'component',
			component: 'Pconfirm',
			meta: { data: id }
		};

		modalStore.trigger(modal);
	}

	let saeed = false;
	onMount(() => {
		saeed = true;
	});
</script>

{#if saeed}
	<div
		class="relative overflow-x-auto shadow-md sm:rounded-lg"
		transition:fly={{
			delay: 100,
			duration: 6000,
			x: 100,
			y: 500,
			opacity: 0.5,
			easing: quintOut
		}}
	>
		<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
			<caption
				class=" w-full p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800"
			>
				<div class="flex justify-between">
					<div>Our Posiotn</div>
					<div>
						<button type="button" class="btn variant-filled rounded-full" on:click={adds}>
							<span><Plus /> </span>
						</button>
					</div>
				</div>

				<p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
					These Positions that we offer it in our Company .
				</p>
			</caption>

			<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr class="variant-filled">
					<th scope="col" class="px-6 py-3"> Position name </th>
					<th scope="col" class="px-6 py-3"> Employees </th>
					<th scope="col" class="px-6 py-3"> </th>
				</tr>
			</thead>
			<tbody>
				{#each plist as p, i (p.id)}
					<tr
						class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
					>
						<th
							scope="row"
							class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
						>
							{p.name}
						</th>
						<td class="px-6 py-4"> {p.numberOfEmployees} </td>

						<td
							><button
								type="button"
								class="btn-icon btn-sm hover:variant-filled-error rounded-none"
								on:click={() => {
									del(p.id);
								}}><Trash /></button
							></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
