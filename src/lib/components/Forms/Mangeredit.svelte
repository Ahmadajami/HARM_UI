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
	<div class=" modal-example-form bg-slate-500 rounded-md {cBase}">
		<header class={cHeader}><h4 class="h4">Change Manger</h4></header>
		<article>Choose Manger to Cahanger for employee</article>
		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}" method="POST" action="?/editmanger" use:enhance>
			<select class="select variant-form-material text-black" size="4" value="1" name="manger">
				{#each $page.data.manger_list_toall as element, i}
					<option class=" variant-filled text-black" value={element.mangerUsername}
						>{element.managerFirstName}</option
					>
				{/each}
			</select>

			<input name="usernmae" value={meta_user} hidden />
			<!-- prettier-ignore -->

			<footer class="modal-footer {parent.regionFooter}">
			<button type="button" class="btn {parent.buttonNeutral}" on:click={parent.onClose}
				>{parent.buttonTextCancel}</button
			>
			<!-- svelte-ignore a11y-accesskey -->
			<button 
            class="btn {parent.buttonPositive}" 
            type="submit" >
            Change Manger
        </button>
		</footer>
		</form>
	</div>
{/if}
