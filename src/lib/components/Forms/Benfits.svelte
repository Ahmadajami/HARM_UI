<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';

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
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
	let meta_user = '';
	if ($modalStore[0].meta) {
		meta_user = $modalStore[0].meta.name;
	}
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form variant-glass {cBase}">
		<header class={cHeader}>Add Benfits</header>
		<article>Choose Benfits to Add</article>
		<!-- Enable for debugging: -->
		<form
			id="addb"
			name="addb"
			class="modal-form {cForm}"
			method="POST"
			action="?/addbenfit"
			use:enhance
		>
			<select class="select" size="4" value="1" name="befits">
				{#each $page.data.all_benfits as element, i}
					<option value={element.id}>{element.name}</option>
				{/each}
			</select>
			<input name="usernmae" value={meta_user} hidden />
			<!-- prettier-ignore -->

			<footer class="modal-footer {parent.regionFooter}">
			<button form="addb" type="button" class="btn {parent.buttonNeutral}" on:click={parent.onClose}
				>{parent.buttonTextCancel}</button
			>
			<!-- svelte-ignore a11y-accesskey -->
			<button 
            class="btn {parent.buttonPositive}" 
            type="submit" >
            Add
        </button>
		</footer>
		</form>
	</div>
{/if}
