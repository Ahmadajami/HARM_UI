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
	let applicationid = '';
	if ($modalStore[0].meta) {
		applicationid = $modalStore[0].meta.data;
	}
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class=" modal-example-form variant-glass-warning {cBase}">
		<header class={cHeader}>Set Interview</header>

		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}" method="POST" action="?/addrep" use:enhance>
			<input type="text" value={applicationid} name="applicationid" form="interviewform" hidden />
			<label>
				<span> Interview Date</span>
				<input class="input" type="date" name="interviewDate" form="interviewform" />
			</label>
			<label>
				<span> Interview Time</span>
				<input class="input" type="time" name="interviewTime" form="interviewform" />
			</label>

			<footer class="modal-footer {parent.regionFooter}">
				<button type="button" class="btn {parent.buttonNeutral}" on:click={parent.onClose}
					>{parent.buttonTextCancel}</button
				>

				<button class="btn {parent.buttonPositive}" type="submit" form="interviewform">
					Set interview
				</button>
			</footer>
		</form>
	</div>
{/if}
