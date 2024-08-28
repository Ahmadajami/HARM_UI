<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	// Stores
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';

	import { error_toast, successfully_toast } from '../Layouts/mytoasts';
	import { goto } from '$app/navigation';

	const toastStore = getToastStore();

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
	const cBase = 'card p-4 w-modal shadow-xl space-y-4 variant-glass';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
	let meta_user = '';
	if ($modalStore[0].meta) {
		meta_user = $modalStore[0].meta.parameter;
	}
	let sending = false;
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>Login</header>
		<article>Enter your username and password to start</article>
		<!-- Enable for debugging: -->
		<form
			class="modal-form {cForm}"
			action="/login"
			method="POST"
			use:enhance={() => {
				return async ({ result, update }) => {
					if (result.type === 'redirect') {
						toastStore.trigger(successfully_toast);
						goto(result.location);
					}
					if (result.type === 'success' && result.data) {
						if (result.data.done) {
							modalStore.close();
							toastStore.trigger(successfully_toast);
							update().finally(async () => {
								sending = false;
							});
						} else {
							modalStore.close();
							toastStore.trigger(error_toast);
							update().finally(async () => {
								sending = false;
							});
						}

						update().finally(async () => {
							sending = false;
						});
					}
				};
			}}
		>
			<label class="label" for="username">
				<span>Username</span>
				<input
					id="username"
					name="username"
					class="input bg-surface-300"
					type="text"
					placeholder="Enter Username..."
					value={meta_user ?? ''}
				/>
			</label>
			<label class="label" for="password">
				<span>Password</span>
				<input
					id="password"
					name="password"
					class="input bg-surface-300"
					type="text"
					placeholder="Enter Password..."
				/>
			</label>
			<h6 class="mt-4">
				New Applicant
				<a href="/register" class="anchor"> Register </a>
				?
			</h6>
			<!-- prettier-ignore -->

			<footer class="modal-footer {parent.regionFooter}">
			<button type="button" class="btn {parent.buttonNeutral}" on:click={parent.onClose}
				>{parent.buttonTextCancel}</button
			>
			<!-- svelte-ignore a11y-accesskey -->
			<button 
            class="btn {parent.buttonPositive}" 
            type="submit" >
            Login
        </button>
		</footer>
		</form>
	</div>
{/if}
