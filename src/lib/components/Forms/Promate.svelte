<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	// Stores
	import { ListBox, ListBoxItem, getModalStore } from '@skeletonlabs/skeleton';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	const modalStore = getModalStore();

	// Form Data
	const formData = {
		username: '',
		password: ''
	};

	// We've created a custom submit function to pass the response and close the modal.

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-center h4';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
	let meta_user = '';

	if ($modalStore[0].meta) {
		meta_user = $modalStore[0].meta.name;
	}
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class=" modal-example-form variant-glass rounded-md {cBase}">
		<header class={cHeader}><h4 class="h4">Promate Him</h4></header>
		<article>Promate Employee to be Manger at Company</article>
		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}" method="POST" action="?/makemanger" use:enhance>
			<label class="label my-4">
				<span>New Salary</span>
				<input class="input" title="newSalary" type="number" name="newSalary" />
			</label>
			<label class="label">
				<span>ContractNumber</span>
				<input class="input" title="Contract Number" type="text" name="newContractNumber" />
			</label>

			<input name="employeeUsername" value={meta_user} hidden />
			<!-- prettier-ignore -->

			<footer class="modal-footer {parent.regionFooter}">
			<button type="button" class="btn {parent.buttonNeutral}" on:click={parent.onClose}
				>{parent.buttonTextCancel}</button
			>
			<!-- svelte-ignore a11y-accesskey -->
			<button 
            class="btn {parent.buttonPositive}" 
            type="submit" >
            Promate 😄
        </button>
		</footer>
		</form>
	</div>
{/if}
