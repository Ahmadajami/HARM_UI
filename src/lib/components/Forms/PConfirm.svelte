<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { enhance } from '$app/forms';

	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	const modalStore = getModalStore();

	// We've created a custom submit function to pass the response and close the modal.

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = '';
	let meta_user: number;
	if ($modalStore[0].meta) {
		meta_user = $modalStore[0].meta.data;
	}
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form variant-glass {cBase}">
		<header class={cHeader}>Delete Position</header>
		<article>Are you sure you want to delete</article>
		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}" method="POST" action="?/delp" use:enhance>
			<!-- prettier-ignore -->
			<input name="postinsid" value={meta_user} hidden>

			<footer class="modal-footer {parent.regionFooter}">
				<button type="button" class="btn {parent.buttonNeutral}" on:click={parent.onClose}
					>{parent.buttonTextCancel}</button
				>
				<!-- svelte-ignore a11y-accesskey -->
				<button class="btn variant-filled-error" type="submit"> delete</button>
			</footer>
		</form>
	</div>
{/if}
