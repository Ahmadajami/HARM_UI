<script lang="ts">
	import type { ActionData } from './$types';
	import { ListBox, ListBoxItem, focusTrap, getToastStore } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import Iconse from './Iconse.svelte';
	import { enhance } from '$app/forms';
	import { successfully_toast_v } from '$lib/components/Layouts/mytoasts';
	import type { Positions } from '$lib/mytypes';

	const toastStore = getToastStore();
	export let data;

	export let form: ActionData;
	let isFocused: boolean = true;

	const popupCombobox: PopupSettings = {
		event: 'click',
		target: 'popupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};

	const popupCombobox2: PopupSettings = {
		event: 'click',
		target: 'popupCombobox2',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
	let type_v: string[] = ['FullTime', ' InternShip'];
	let Ailist: string[] = [
		'Backend',
		'Database',
		'Frontend',
		'IOS',
		'Java',
		'Mobile',
		'Python',
		'SDE',
		'Testing',
		'Web'
	];

	let comboboxValue: string;
	let comboboxValue2: string;

	$: if (form?.vadd) {
		toastStore.trigger(successfully_toast_v);
	}
	$: if (form?.dumbs) {
		comboboxValue = form.Ailist;
		comboboxValue2 = form.type;
	}
</script>

<div class="h-screen">
	<form method="POST" use:focusTrap={isFocused} action="?/addv" use:enhance>
		<div class=" space-y-8 my-8">
			<h1 class="h1">Add a Vacancy</h1>
			<div class=" container">
				<div class="flex space-x-8">
					<div>
						<label>
							<span> job type</span>

							<div>
								<button
									type="button"
									class="btn variant-filled w-48 justify-between"
									use:popup={popupCombobox2}
								>
									<span class="capitalize">{comboboxValue2 ?? 'Trigger'}</span>
									<span>↓</span>
								</button>
								<div class="card w-48 shadow-xl py-2" data-popup="popupCombobox2">
									<ListBox rounded="rounded-none">
										{#each type_v as ps, i}
											<ListBoxItem bind:group={comboboxValue2} name="type" value={ps}
												>{ps}</ListBoxItem
											>
										{/each}
									</ListBox>
									<div class="arrow bg-surface-100-800-token" />
								</div>
							</div>
						</label>
					</div>
					<div>
						<label>
							<span> Job title </span>

							<div class="div1 items-center m-auto">
								<button
									class="btn variant-filled w-48 justify-between"
									type="button"
									use:popup={popupCombobox}
								>
									<span class="capitalize">{comboboxValue ?? 'Choose Job title'}</span>
									<Iconse />
								</button>
								<div class="card w-48 shadow-xl py-2" data-popup="popupCombobox">
									<ListBox rounded="rounded-none">
										{#each data.plist as ps, i}
											<ListBoxItem bind:group={comboboxValue} name="Ailist" value={ps.name}>
												{ps.name}
											</ListBoxItem>
										{/each}
									</ListBox>
								</div>
							</div>
						</label>
					</div>
				</div>
				<div class=" w-2/5 container">
					<label class="label" for="yearsOfExperience">
						<span>yearsOfExperience</span>
						<input
							id="yearsOfExperience"
							name="yearsOfExperience"
							class="input"
							type="number"
							value={form?.yearsOfExperience ? form?.yearsOfExperience : ''}
						/>
					</label>
				</div>

				<div class=" container">
					<label class="label" for="JobDescription">
						<span>JobDescription</span>
						<input
							id="JobDescription"
							name="JobDescription"
							class="textarea"
							placeholder="Describe What this Job do "
							value={form?.JobDescription ? form?.JobDescription : ''}
						/>
					</label>
				</div>
				<div class=" container">
					<label class="label" for="jobSalary">
						<span>jobSalary</span>
						<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
							<div class="input-group-shim">🪄</div>

							<input
								id="jobSalary"
								name="jobSalary"
								class="input"
								type="number"
								min="0"
								max="100000000"
								step="0.0001"
								value={form?.salary ? Number(form?.salary) * 10 : ''}
							/>
							<button formaction="?/ai" class="variant-filled-primary">Ai salary</button>
						</div>
					</label>
				</div>
			</div>
		</div>

		<div class="items-center">
			<button type="submit" class="btn w-full variant-filled py-3" formaction="?/addv"
				>Add this vacancy
			</button>
		</div>
	</form>
</div>
