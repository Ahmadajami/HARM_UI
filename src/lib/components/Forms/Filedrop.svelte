<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { enhance } from '$app/forms';

	import { FileDropzone, ProgressBar } from '@skeletonlabs/skeleton';
	import { FileSpreadsheet, Send } from 'lucide-svelte';

	// Stores
	import { ListBox, ListBoxItem, getModalStore } from '@skeletonlabs/skeleton';

	import { invalidateAll } from '$app/navigation';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	const modalStore = getModalStore();

	// Form Data
	const formData = {
		username: '',
		password: ''
	};
	function onChangeHandler(e: Event): void {
		console.log('file data:', e);
	}

	// We've created a custom submit function to pass the response and close the modal.

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
	let sending = false;
	let choose = true;
	let files: FileList;
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class=" modal-example-form variant-glass {cBase}">
		<header class={cHeader}>Add Attendece File</header>
		{#if sending}
			<ProgressBar value={undefined} />
		{:else}
			<form
				class="modal-form {cForm}"
				method="POST"
				action="?/filedrop"
				enctype="multipart/form-data"
				use:enhance={() => {
					sending = true;
					return ({ update }) => {
						update().finally(async () => {
							sending = false;
							await invalidateAll();
						});
					};
				}}
			>
				<FileDropzone accept=".csv" name="attendence" on:change={onChangeHandler} bind:files>
					<svelte:fragment slot="lead"
						><div class="self-center px-28"><FileSpreadsheet size="50" /></div></svelte:fragment
					>
					<svelte:fragment slot="message"
						><strong>Upload A file</strong> or drag and drop</svelte:fragment
					>
					<svelte:fragment slot="meta">
						only csv allowed

						{#if files}
							<p>your file name: {files.item(0)?.name}</p>
						{/if}
					</svelte:fragment>
				</FileDropzone>

				<footer class="modal-footer {parent.regionFooter}">
					<button type="button" class="btn {parent.buttonNeutral}" on:click={parent.onClose}
						>{parent.buttonTextCancel}</button
					>

					<button class="btn {parent.buttonPositive}" type="submit"> upload File </button>
				</footer>
			</form>
		{/if}
		<!-- Enable for debugging: -->
	</div>
{/if}
