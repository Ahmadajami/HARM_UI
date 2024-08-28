<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	// Stores
	import { ListBox, ListBoxItem, getModalStore } from '@skeletonlabs/skeleton';
	import type { WarningType } from '$lib/mytypes';

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
	let valueSingle: WarningType = $page.data.w_type[0];
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class=" modal-example-form variant-glass-error {cBase}">
		<header class={cHeader}>Add Warining😭</header>
		<article>Choose Warining type</article>
		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}" method="POST" action="?/addwarn" use:enhance>
			<span>Warining Type:</span>
			<div class="card my-4">
				<ListBox>
					{#each $page.data.w_type as element, i}
						<ListBoxItem bind:group={valueSingle} name="Warnigtype" value={element.name}
							>{element.name + '  mark: ' + element.mark}</ListBoxItem
						>
					{/each}
				</ListBox>
			</div>
			<input class="input" name="mangerusername" value={$page.data.user.name} hidden />
			<input class="input" type="text" name="emplyeeusername" value={meta_user} hidden />
			<label>
				<span> Description</span>
				<input class="input" type="text" name="desc" />
			</label>

			<footer class="modal-footer {parent.regionFooter}">
				<button type="button" class="btn {parent.buttonNeutral}" on:click={parent.onClose}
					>{parent.buttonTextCancel}</button
				>

				<button class="btn {parent.buttonPositive}" type="submit"> Add Warining😭 </button>
			</footer>
		</form>
	</div>
{/if}
