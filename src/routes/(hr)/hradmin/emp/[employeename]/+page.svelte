<script lang="ts">
	import type { Benefit, Employee } from '$lib/mytypes';
	import { type Applicant } from '$lib/applicanttypes';
	import type { PageData } from './$types';
	import DeatailsCardemp from '$lib/components/Layouts/DeatailsCardemp.svelte';
	import DeatailsCardapp from '$lib/components/Layouts/DeatailsCardapp.svelte';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import IconsText from '$lib/components/Layouts/IconsText.svelte';
	import { Banknote, Palmtree, UserRoundSearch } from 'lucide-svelte';
	import BenfitsInfo from '$lib/components/Layouts/BenfitsInfo.svelte';
	import WariningInfo from '$lib/components/Layouts/WariningInfo.svelte';
	export let data: PageData;
	let app: Applicant;
	let emp: Employee;
	let benefits: Benefit[];
	let tabSet: number = 0;
	if (data?.app) {
		app = data.app;
	}
	if (data?.emp && data?.benfits) {
		emp = data.emp;
		benefits = data.benfits;
	}
</script>

{#if emp}
	<div class="pb-8">
		<DeatailsCardemp emplyee={emp} />
	</div>
	<div class="space-y-4">
		<div class=" card">
			<TabGroup>
				<Tab bind:group={tabSet} name="tab1" value={0}>
					<span>More info </span>
				</Tab>
				<Tab bind:group={tabSet} name="tab2" value={1}>Benfits</Tab>
				<Tab bind:group={tabSet} name="tab3" value={2}>
					<IconsText text="Warning" points={false}>
						<Palmtree absoluteStrokeWidth={true} />
					</IconsText></Tab
				>
				<!-- Tab Panels --->
				<svelte:fragment slot="panel">
					{#if tabSet === 0}
						<div class="h-full m-4 p-4">
							<IconsText prefix="Salary" text={emp.salary.toString()}><Banknote /></IconsText>
							<IconsText prefix="SSN" text={emp.ssn}><UserRoundSearch /></IconsText>
							<IconsText prefix="Contract Number" text={emp.contractNumber}
								><UserRoundSearch /></IconsText
							>
						</div>
					{:else if tabSet === 1}
						<div class="h-full m-4 p-4">
							<BenfitsInfo
								benfits={emp.benefits}
								salary={emp.salary}
								username={emp.username}
								all_benfits={benefits}
							/>
						</div>
					{:else if tabSet === 2}
						<div class="h-full m-4 p-4">
							<WariningInfo warning={emp.warnings} />
						</div>
					{/if}
				</svelte:fragment>
			</TabGroup>
		</div>
	</div>
{/if}
{#if app}
	<DeatailsCardapp about={app} />
{/if}
