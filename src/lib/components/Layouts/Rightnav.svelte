<script lang="ts">
	import { onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	let res = false;
	onDestroy(() => {
		res = false;
	});
	import {
		Tab,
		TabGroup,
		getDrawerStore,
		type ModalSettings,
		getModalStore,
		ProgressBar,
		Avatar,
		getToastStore
	} from '@skeletonlabs/skeleton';
	import type { Employee, MangerListDTO } from '$lib/mytypes';
	import { Info } from 'lucide-svelte';
	import { Banknote } from 'lucide-svelte';
	import { AlertTriangle, Plus } from 'lucide-svelte';
	import { page } from '$app/stores';

	import DeatailsCardemp from './DeatailsCardemp.svelte';
	import DeatailsCardmng from './DeatailCardmng.svelte';

	const drawerStore = getDrawerStore();
	const modalStore = getModalStore();

	let emp: Employee;
	let mangor: MangerListDTO;
	let m_emp: Employee[];
	let tabSet: number = 0;
	let tabSet2: number = 0;
	$: if ($drawerStore.meta.info) {
		$drawerStore.meta.info = $drawerStore.meta.info;
		emp = $drawerStore.meta.info;
	}
	$: if ($drawerStore.meta.mangor) {
		$drawerStore.meta.mangor = $drawerStore.meta.mangor;
		mangor = $drawerStore.meta.mangor;
		m_emp = $drawerStore.meta.m_emp;
	}
	function addw(username: string) {
		const modal: ModalSettings = {
			type: 'component',
			component: 'AddWarn',
			meta: { name: username }
		};

		modalStore.trigger(modal);
	}
	function addr(username: string) {
		const modal: ModalSettings = {
			type: 'component',
			component: 'AddRep',
			meta: { name: username }
		};

		modalStore.trigger(modal);
	}

	function add(username: string) {
		const modal: ModalSettings = {
			type: 'component',
			component: 'Benfits',
			meta: { name: username }
		};

		modalStore.trigger(modal);
	}
	//?:form and inputs are in Benfits components

	function showres() {
		res = true;
	}
	$: benfits_list = $drawerStore.meta.info ? emp.benefits : [];
	$: warining_list = $drawerStore.meta.info ? emp.warnings : [];

	$: {
		if ($page.form) {
			if ($page.form?.suc) {
				modalStore.close();
			}
		}
	}
</script>

{#if $drawerStore.meta.info}
	<section class="p-4 space-y-4 overflow-y-auto">
		<DeatailsCardemp emplyee={emp} />
	</section>
	<section class=" overflow-y-auto">
		<div class=" px-8">
			<TabGroup>
				<Tab bind:group={tabSet} name="tab1" value={0}>
					<svelte:fragment slot="lead"><div class="px-8"><Info /></div></svelte:fragment>
					<h5 class="h5">Moreinfo</h5>
				</Tab>
				<Tab bind:group={tabSet} name="tab2" value={1}>
					<svelte:fragment slot="lead"><div class="px-8"><Banknote /></div></svelte:fragment>
					<h5 class="h5">Benfits</h5>
				</Tab>
				<Tab bind:group={tabSet} name="tab3" value={2}>
					<svelte:fragment slot="lead"><div class="px-8"><AlertTriangle /></div></svelte:fragment>
					<h5 class="h5">Warning</h5>
				</Tab>
				<Tab bind:group={tabSet} name="tab4" value={3}>
					<svelte:fragment slot="lead"><div class="px-8"><AlertTriangle /></div></svelte:fragment>
					<h5 class="h5">Reports</h5>
				</Tab>
				<svelte:fragment slot="panel">
					<div class="w-full text-token card variant-form-material p-4 space-y-4 my-8">
						{#if tabSet === 0}
							<section class="p-2">
								<h6 class="h6">
									Degree: {emp.degree}
								</h6>
								<h6 class="h6">
									Contact Number: {emp.number}
								</h6>
								<h6 class="h6">
									Position: {emp.position}
								</h6>
								<h6 class="h6">
									Residence: {emp.residence}
								</h6>
							</section>
						{:else if tabSet === 1}
							<dl class="list-dl">
								{#key benfits_list}
									{#each benfits_list as benfits, i}
										<div>
											<span class="badge-icon p-4 variant-soft-secondary">{i + 1}</span>
											<span class="flex-auto">
												<dt class="font-bold">{benfits.name}</dt>
												<dd class="text-sm opacity-50">cut:{benfits.cutPercentage}</dd>
											</span>
										</div>
										<!-- ... -->
									{/each}
								{/key}
							</dl>
							<div class="flex justify-between">
								<div></div>
								<div></div>
								{#if $page.data.user.role == 'HR'}
									<div class="px-2">
										<button
											type="button"
											class="btn variant-filled rounded-lg"
											on:click={() => {
												add(emp.username);
											}}
										>
											<span><Plus /></span>
											<span>add new </span>
										</button>
									</div>
								{/if}
							</div>
						{:else if tabSet === 2}
							<div class="pb-10">
								<div class="flex flex-row-reverse">
									{#if $page.data.user.role === 'MG'}
										<div>
											<button
												type="button"
												class="btn variant-filled-error rounded-lg"
												on:click={() => {
													addw(emp.username);
												}}
											>
												<span><Plus /></span>
												<span>add new Warning </span>
											</button>
										</div>
									{/if}
								</div>

								<dl class="list-dl">
									{#each warining_list as warn, i}
										<div class="pb-8">
											<span class="badge-icon p-4 variant-soft-secondary">{i + 1}</span>
											<span class="flex-auto">
												<dt class="font-bold">
													<span>Manger : {warn.issuerManager}</span>
												</dt>
												<dt class="font-bold">
													<span>WarningType : {warn.warningType.name}</span>
												</dt>
												<dt class="font-bold">
													<span>WarningMark : {warn.warningType.mark}</span>
												</dt>
												<dd class="text-sm opacity-50">discription:{warn.description}</dd>
											</span>
										</div>
										<!-- ... -->
									{/each}
								</dl>
							</div>
						{:else if tabSet === 3}
							<div class="flex flex-row-reverse">
								{#if !res}
									<div class="w-min">
										<button class="btn variant-filled" on:click={showres}> Ai Rating 🪄</button>
									</div>
								{/if}

								{#if $page.data.user.role === 'MG'}
									<div>
										<button
											type="button"
											class="btn variant-filled-warning rounded-lg"
											on:click={() => {
												addr(emp.username);
											}}
										>
											<span><Plus /></span>
											<span>add new Report </span>
										</button>
									</div>
								{/if}
							</div>
							{#if emp.reports}
								<dl class="list-dl">
									{#each emp?.reports as reports, i}
										<div class="pb-8">
											<span class="badge-icon p-4 variant-soft-secondary">{i + 1}</span>
											<span class="flex-auto">
												<dt class="font-bold">
													<span>Manger : {reports.managerUsername}</span>
												</dt>
												<dt class="font-bold">
													{#if res}
														<span transition:fade={{ delay: 250, duration: 300 }}
															>Resualt : {reports.reportResult}</span
														>
													{/if}
												</dt>
												<dt class="font-bold">
													<span>on Date : {new Date(reports.dateIssued).toLocaleDateString()}</span>
												</dt>
												<dd class="font-bold">discription:{reports.reportDescription}</dd>
												<dt class="w-1/5">
													<span>Rating : {reports.rating} /8</span>
													<ProgressBar
														rounded={'rounded-2xl'}
														meter={reports.rating >= 4
															? 'variant-filled-success'
															: 'variant-filled-error'}
														max={8}
														value={reports.rating}
													/>
												</dt>
											</span>
										</div>

										<!-- ... -->
									{/each}
								</dl>
							{:else}
								<h1 class="h1">No Report 😀</h1>
							{/if}
						{/if}
					</div>
				</svelte:fragment>
			</TabGroup>
		</div>
	</section>
{/if}
{#if $drawerStore.meta.mangor}
	<section class="p-4 space-y-4 overflow-y-auto">
		<DeatailsCardmng {mangor} />
	</section>
	<section class=" overflow-y-auto">
		<div class=" px-8">
			<TabGroup>
				<Tab bind:group={tabSet2} name="tab1" value={0}>
					<svelte:fragment slot="lead"><div class="px-8"><Info /></div></svelte:fragment>
					<h5 class="h5">Moreinfo</h5>
				</Tab>
				<Tab bind:group={tabSet2} name="tab2" value={1}>
					<svelte:fragment slot="lead"><div class="px-8"><Banknote /></div></svelte:fragment>
					<h5 class="h5">Benfits</h5>
				</Tab>
				<Tab bind:group={tabSet2} name="tab3" value={2}>
					<svelte:fragment slot="lead"><div class="px-8"><AlertTriangle /></div></svelte:fragment>
					<h5 class="h5">Employees</h5>
				</Tab>

				<svelte:fragment slot="panel">
					<div class="w-full text-token card variant-form-material p-4 space-y-4 my-8">
						{#if tabSet2 === 0}
							<section class="p-2">
								<h6 class="h6">
									Degree: {mangor.degree}
								</h6>
								<h6 class="h6">
									Contact Number: {mangor.number}
								</h6>
								<h6 class="h6">
									Date: {mangor.dateOfBirth.toLocaleDateString()}
								</h6>
								<h6 class="h6">
									Residence: {mangor.residence}
								</h6>
							</section>
						{:else if tabSet2 === 1}
							<dl class="list-dl">
								{#each mangor.benefits as benfits, i}
									<div>
										<span class="badge-icon p-4 variant-soft-secondary">{i + 1}</span>
										<span class="flex-auto">
											<dt class="font-bold">{benfits.name}</dt>
											<dd class="text-sm opacity-50">cut:{benfits.cutPercentage}</dd>
										</span>
									</div>
									<!-- ... -->
								{/each}
							</dl>
							<div class="flex justify-between">
								<div></div>
								<div></div>
								<div class="px-2">
									<button
										type="button"
										class="btn variant-filled rounded-lg"
										on:click={() => add(mangor.username)}
									>
										<span><Plus /></span>
										<span>add new </span>
									</button>
								</div>
							</div>
						{:else if tabSet2 === 2}
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
									</tr>
								</thead>
								<tbody>
									{#each m_emp as employee}
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
													<div class="font-normal text-gray-500">
														{employee.managerDTO.mangerUsername}
													</div>
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
										</tr>
									{/each}
								</tbody>
							</table>
						{/if}
					</div>
				</svelte:fragment>
			</TabGroup>
		</div>
	</section>
{/if}
