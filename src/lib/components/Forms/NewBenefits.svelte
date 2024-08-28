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
		<header class={cHeader}>Add New Benfits 😀</header>
		<article>Benfits Deatails</article>
		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}" method="POST" action="?/addnew" use:enhance>
			<!-- prettier-ignore -->
			<label class="label">
                <span>Benefits name</span>
                <input class="input" title="Name" name="Benfitsname" type="text" placeholder="Benefits name" />
                <!-- (input here) -->
            </label>
			<label class="label">
				<span>Cut precentege</span>
				<input
					name="cutpercentge"
					class="input"
					title="Percetege"
					type="number"
					placeholder="2.5"
					min="0"
					max="50"
					step="0.01"
				/>

				<!-- (input here) -->
			</label>

			<footer class="modal-footer {parent.regionFooter}">
				<button type="button" class="btn {parent.buttonNeutral}" on:click={parent.onClose}
					>{parent.buttonTextCancel}</button
				>
				<!-- svelte-ignore a11y-accesskey -->
				<button class="btn {parent.buttonPositive}" type="submit"> Add </button>
			</footer>
		</form>
	</div>
{/if}
