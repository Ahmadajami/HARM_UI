<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import RegisterInput from '$lib/components/Forms/RegisterInput.svelte';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import type { ActionData } from './$types';
	import Mloading from '$lib/components/Layouts/Mloading.svelte';
	let Appinfo: string[] = ['Username', 'Password', 'Email'];
	let Userinfo: string[] = [
		'FirstName',
		'LastName',
		'FatherName',
		'MotherName',
		'PhoneNumber',
		'SSN',
		'Degree',
		'PlaceOfBirth',
		'DateOfBirth'
	];
	let Workinfo: string[] = ['residence'];
	//export let form: ActionData;
	let sending = false;
</script>

{#if sending}
	<Mloading />
{:else}
	<form
		method="POST"
		use:enhance={() => {
			sending = true;
			return ({ update }) => {
				update().finally(async () => {
					sending = false;
				});
			};
		}}
	>
		<div class="parent">
			<div class="div1">
				<h1 class="h1 !text-5xl md:!text-6xl max-w-[600px] py-2">
					By register your Accept to our term
				</h1>
				<p class="!text-xl max-w-[475px]">These info are for employment .</p>
			</div>
			<div class="div2">
				<div class="flex-container">
					<div class="flex-items">
						<div class="card p-4 bg-surface-50">
							<header class="card-header h2">
								<strong>App info</strong>
							</header>
							{#each Appinfo as app_info, i}
								<RegisterInput title={app_info}>
									<input
										id={app_info}
										name={app_info}
										type={i === 2 ? 'email' : 'text'}
										placeholder="Enter {app_info}..."
									/>
								</RegisterInput>
							{/each}
						</div>
					</div>
					<div class="flex-items">
						<div class="card p-4 bg-surface-50">
							<header class="card-header h2"><strong>User info</strong></header>
							{#each Userinfo as u_info, i}
								<RegisterInput title={u_info}>
									<input
										id={u_info}
										name={u_info}
										type={i === 8 ? 'Date' : i === 4 || i === 5 ? 'number' : 'text'}
										placeholder="Enter {u_info}..."
									/>
								</RegisterInput>
							{/each}
						</div>
					</div>
					<div class="flex-items">
						<div class="card p-4 bg-surface-50">
							<header class="card-header h2"><strong>Work info</strong></header>
							{#each Workinfo as w_info}
								<RegisterInput title={w_info}>
									<input id={w_info} name={w_info} type="text" placeholder="Enter {w_info}..." />
								</RegisterInput>
							{/each}
						</div>
						<div class="py-4">
							<button type="submit" class="btn variant-filled-primary w-full" formaction="/register"
								>Register</button
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
{/if}

<style>
	.parent {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: 1fr;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
	}

	.div1 {
		grid-area: 1 / 1 / 2 / 2;
	}
	.div2 {
		grid-area: 1 / 2 / 2 / 3;
	}
	.flex-container {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: normal;
		align-items: normal;
		align-content: stretch;
	}

	.flex-items:nth-child(1) {
		display: block;
		flex-grow: 0;
		flex-shrink: 1;
		flex-basis: auto;
		align-self: auto;
		order: 0;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.flex-items:nth-child(2) {
		display: block;
		flex-grow: 0;
		flex-shrink: 1;
		flex-basis: auto;
		align-self: auto;
		order: 0;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.flex-items:nth-child(3) {
		display: block;
		flex-grow: 0;
		flex-shrink: 1;
		flex-basis: auto;
		align-self: auto;
		order: 0;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.flex-items:nth-child(4) {
		display: block;
		flex-grow: 0;
		flex-shrink: 1;
		flex-basis: auto;
		align-self: auto;
		order: 0;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.flex-items:nth-child(5) {
		display: block;
		flex-grow: 0;
		flex-shrink: 1;
		flex-basis: auto;
		align-self: auto;
		order: 0;
		margin-top: 10px;
		margin-bottom: 10px;
	}
</style>
