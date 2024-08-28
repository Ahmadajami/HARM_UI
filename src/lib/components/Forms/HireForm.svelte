<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	import { ListBox, ListBoxItem, getModalStore } from '@skeletonlabs/skeleton';
	import type { Mangers } from '$lib/mytypes';
	import { page } from '$app/stores';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;
	let list: Mangers[] = $page.data.manger_list_toall;

	// Local
	let flavor = list.at(0)?.mangerUsername;
	const modalStore = getModalStore();

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form variant-glass {cBase}">
		<header class={cHeader}>Choose a manger</header>
		<article>these are all mangers</article>
		<ListBox class="border border-surface-500 p-4 rounded-container-token">
			{#each list as manger}
				<ListBoxItem bind:group={flavor} name="mangerusername" value={manger.mangerUsername}
					>{manger.managerFirstName + ' ' + manger.managerLastName}</ListBoxItem
				>
			{/each}
		</ListBox>
		<p>Salary</p>
		<div class="input-group input-group-divider grid-cols-[1fr_auto]">
			<input type="number" name="salary" placeholder="Salary..." form="form1" />
		</div>
		<p>Contract Number</p>
		<div class="input-group input-group-divider grid-cols-[1fr_auto]">
			<input type="text" name="contractNumber" placeholder="ContractNumber..." form="form1" />
		</div>

		<input type="text" value={flavor} name="MangerUsername" form="form1" hidden />

		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button type="submit" form="form1" class="btn {parent.buttonPositive}">Select Mangers</button>
    </footer>
	</div>
{/if}
