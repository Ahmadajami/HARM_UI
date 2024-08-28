<script lang="ts">
	import { page } from '$app/stores';
	import type { Employee, MangerListDTO } from '$lib/mytypes';
	import {
		Avatar,
		Tab,
		TabGroup,
		type DrawerSettings,
		getDrawerStore,
		ProgressBar,
		type ModalSettings,
		getModalStore,
		getToastStore
	} from '@skeletonlabs/skeleton';

	import { successfully_toast_benfits, successfully_toast_manger } from './mytoasts';
	import { fade } from 'svelte/transition';

	export let emp: Employee[];
	export let m_all: MangerListDTO[];
	$: emp = emp;
	$: m_all = m_all;

	let tabSet: number = 0;
	const drawerStore = getDrawerStore();
	const modalStore = getModalStore();
	const toastStore = getToastStore();
	function filteremp(mangor: MangerListDTO) {
		const x = emp.filter(
			(emp) => emp.managerDTO.mangerUsername.toLowerCase() === mangor.username.toLowerCase()
		);
		draweropenhandle(undefined, mangor, x);
	}

	function draweropenhandle(emp?: Employee, mangor?: MangerListDTO, m_emp?: Employee[]): void {
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
		if (mangor) {
			const drawerSettings: DrawerSettings = {
				id: 'right-info',
				meta: { mangor: mangor, m_emp: m_emp },
				rounded: 'rounded-2xl',
				// Provide your property overrides:
				width: 'w-2/3',
				position: 'right'
			};
			drawerStore.open(drawerSettings);
		}
	}
	function editmanger(emp: Employee) {
		const modal: ModalSettings = {
			type: 'component',
			component: 'editmanger',
			meta: { name: emp.username }
		};

		modalStore.trigger(modal);
	}
	function promate(emp: Employee) {
		const modal: ModalSettings = {
			type: 'component',
			component: 'Promate',
			meta: { name: emp.username }
		};

		modalStore.trigger(modal);
	}
	$: if ($page.form?.benfitsuc) {
		modalStore.close();

		toastStore.trigger(successfully_toast_benfits);
	}
	$: {
		if ($page.form) {
			if ($page.form?.editmangesuc) {
				modalStore.close();
				toastStore.trigger(successfully_toast_manger);
			}
			if ($page.form?.promatemanger) {
				modalStore.close();
				toastStore.trigger(successfully_toast_manger);
			}
		}
	}
</script>

<section class="p-4">
	<div class="relative overflow-x-auto sm:rounded-lg p-18 shadow-xl">
		<div
			class=" p-8 flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 bg-white dark:bg-gray-900"
		>
			<div class=" w-full">
				<TabGroup
					transitions={true}
					transitionIn={fade}
					transitionInParams={{ duration: 20000 }}
					justify="justify-stretch"
					flex="w-full"
				>
					<Tab
						transitions={true}
						transitionIn={fade}
						transitionInParams={{ duration: 20000 }}
						bind:group={tabSet}
						name="tab1"
						value={0}><h5 class="h5">Employees</h5></Tab
					>
					<Tab
						transitions={true}
						transitionIn={fade}
						transitionInParams={{ duration: 20000 }}
						bind:group={tabSet}
						name="tab2"
						value={1}><h5 class="h5">Mangers</h5></Tab
					>
				</TabGroup>
			</div>
		</div>
		{#if tabSet === 0}
			<section class="h-full" in:fade={{ duration: 800 }}>
				<table
					class=" table-hover w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 px-2"
				>
					<thead
						class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
					>
						<tr class="text-base font-semibold">
							<th scope="col" class="p-3"> Name </th>
							<th scope="col" class="p-3"> Position </th>
							<th scope="col" class="p-3"> Warnings </th>
							<th scope="col" class="p-3"> Manger </th>
							<th scope="col" class="p-3"> view</th>
							<th scope="col" class="p-3 w-min">Promote</th>
						</tr>
					</thead>
					<tbody>
						{#key emp}
							{#each emp as employee}
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
												editmanger(employee);
											}}
											>{employee.managerDTO.managerFirstName +
												' ' +
												employee.managerDTO.managerLastName}</button
										>
									</td>
									<td class="px-6 py-4">
										<button
											class="btn btn-sm variant-filled"
											on:click={() => {
												draweropenhandle(employee, undefined, undefined);
											}}>View user</button
										>
									</td>
									<td class=" w-min">
										<button
											class="btn btn-sm variant-filled"
											on:click={() => {
												promate(employee);
											}}
											>Promote
										</button>
									</td>
								</tr>
							{/each}
						{/key}
					</tbody>
				</table>
			</section>
		{:else if tabSet === 1}
			<section class="manger" in:fade={{ duration: 800 }}>
				<table
					class=" table-hover w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 px-2"
				>
					<thead
						class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
					>
						<tr class="text-base font-semibold">
							<th scope="col" class="px-3 py-3"> Name </th>
							<th scope="col" class="px-3 py-3"> Salary </th>
							<th scope="col" class="px-3 py-3"> Benfits </th>
							<th scope="col" class="px-3 py-3"> MoreInfo </th>
						</tr>
					</thead>
					<tbody>
						{#each m_all as mangor, i (mangor.id)}
							<tr
								class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:variant-soft dark:hover:bg-gray-600"
							>
								<th
									scope="row"
									class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
								>
									<Avatar initials="AB" width="w-10" />
									<div class="ps-3">
										<div class="text-base font-semibold">
											{mangor.firstName + ' ' + mangor.lastName}
										</div>
										<div class="font-normal text-gray-500">{mangor.username}</div>
									</div>
								</th>
								<td class="px-6 py-4">{mangor.salary} </td>
								<td class="px-6 py-4">{mangor.benefits.length} </td>

								<td class="px-6 py-4"
									><button
										class="btn btn-sm variant-filled"
										on:click={() => {
											filteremp(mangor);
										}}>Info</button
									>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</section>
		{/if}
	</div>
</section>
