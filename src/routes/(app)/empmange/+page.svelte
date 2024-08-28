<script lang="ts">
	import {
		getDrawerStore,
		type DrawerSettings,
		Avatar,
		ProgressBar,
		getModalStore,
		getToastStore
	} from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import type { Employee } from '$lib/mytypes';
	import { page } from '$app/stores';
	import { warn_toast, rep } from '$lib/components/Layouts/mytoasts';
	const drawerStore = getDrawerStore();
	const modalStore = getModalStore();
	const toastStore = getToastStore();

	export let data: PageData;

	$: myemp = data.myemp;
	function draweropenhandle(emp?: Employee): void {
		if (emp) {
			const drawerSettings: DrawerSettings = {
				id: 'right-info',
				meta: { info: emp },
				rounded: 'rounded-2xl',
				// Provide your property overrides:
				width: 'w-2/3',
				position: 'right'
			};
			drawerStore.open(drawerSettings);
		}
	}
	$: {
		if ($page.form?.sw) {
			modalStore.close();
			toastStore.trigger(warn_toast);
		}
		if ($page.form?.sww) {
			modalStore.close();
			toastStore.trigger(rep);
		}
	}
</script>

<div class=" my-8 !bg-transparent">
	<h1 class="h1">Your Employees</h1>
</div>
<div class="card">
	<section class="h-full">
		<table
			class=" table-hover w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 px-2"
		>
			<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr class="text-base font-semibold">
					<th scope="col" class="p-3"> Name </th>
					<th scope="col" class="p-3"> Position </th>
					<th scope="col" class="p-3"> Warnings </th>
					<th scope="col" class="p-3"> view</th>
				</tr>
			</thead>
			<tbody>
				{#each myemp as employee}
					<tr
						class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
					>
						<th
							scope="row"
							class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
						>
							<Avatar initials="AB" width="w-10" />
							<div class="ps-3">
								<div class="text-base font-semibold">
									{employee.firstName + ' ' + employee.lastName}
								</div>
								<div class="font-normal text-gray-500">{employee.username}</div>
							</div>
						</th>
						<td class="px-6 py-4"> {employee.position}</td>
						<td class="px-6 py-4">
							<div class="flex items-center">
								<div class="pr-2">
									<h6 class="h6">{employee.warnings.length}</h6>
								</div>
								<ProgressBar
									rounded={'rounded-md'}
									meter={employee.warnings.length >= 5
										? 'variant-filled-error'
										: employee.warnings.length < 5 && employee.warnings.length >= 3
											? 'variant-filled-warning'
											: 'variant-filled-success'}
									max={8}
									value={employee.warnings.length}
								/>
							</div>
						</td>

						<td class="px-6 py-4">
							<button
								class="btn btn-sm variant-filled"
								on:click={() => {
									draweropenhandle(employee);
								}}>View user</button
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
</div>
