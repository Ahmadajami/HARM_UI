<script lang="ts">
	//import type { PageData } from './$types';

	//export let data: PageData;
	import {
		SlideToggle,
		focusTrap,
		getToastStore,
		type ToastSettings
	} from '@skeletonlabs/skeleton';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import Mloading from '$lib/components/Layouts/Mloading.svelte';
	let isFocused: boolean = true;
	let value: boolean = false;
	let hidden = true;
	const toastStore = getToastStore();
	const successfully_toast: ToastSettings = {
		message: 'Wish Vacation be Accepted ✅',
		background: 'variant-filled-success',
		timeout: 10000
	};
	export let form: ActionData;
	if (form?.done) {
		toastStore.trigger(successfully_toast);
	}
	let sending = false;
</script>

{#if sending}
	<Mloading />
{:else}
	<div class="h-max py-10">
		<form method="POST" use:focusTrap={isFocused}>
			<div class=" space-y-8 my-8">
				<h1 class="h1 py-2">Request for Vacation</h1>
				<div class="parent container">
					<div class="div1">
						<label class="label" for="startdate">
							<span>Start Date</span>
							<input id="startdate" name="startdate" class="input" type="date" />
						</label>
					</div>
					<div class="div2">
						<label class="label" for="startdate">
							<span>End Date</span>
							<input id="enddate" name="enddate" class="input" type="date" />
						</label>
					</div>

					<div class=" items-center m-auto w-max h-max">
						<SlideToggle name="payed" bind:checked={value}>
							{value ? 'Its payed 😆' : 'Its Not  payed.. 🥲'}</SlideToggle
						>
						{#if !form?.done}
							<span class="variant-filled-error">required</span>
						{/if}
					</div>
				</div>
			</div>
			<div></div>
			<div class="items-center h-max pt-8">
				<button type="submit" class="btn w-full variant-filled-primary"
					>Request a Vacationss
				</button>
			</div>
		</form>
	</div>
{/if}

<style>
	.parent {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		grid-column-gap: 8px;
		grid-row-gap: 8px;
	}
	.div1 {
		grid-area: 1 / 1 / 2 / 2;
	}
	.div2 {
		grid-area: 1 / 2 / 2 / 3;
	}
</style>
