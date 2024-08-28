<script lang="ts">
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	export let data: PageData;
	let tabSet: number = 0;
</script>

{#await data.emp}
	<ProgressBar />
{:then info}
	<h1 class="h1 mb-4">My info</h1>

	<div class="card">
		<section class="p-4">
			<p class="h4">username: {info.username}</p>
			<p class="h4">Contract Number: {info.contractNumber}</p>
			<p class="h4">Salary:{info.salary}</p>
			<p class="h4">mothername:{info.motherName}</p>
			<p class="h4">fathername{info.fatherName}</p>
		</section>
	</div>
	<div class="card">
		<section class="p-4">
			<TabGroup>
				<Tab bind:group={tabSet} name="tab1" value={0}>
					<span><h1>Benfits</h1></span>
				</Tab>
				<Tab bind:group={tabSet} name="tab2" value={1}><h1>Warining</h1></Tab>
				<Tab bind:group={tabSet} name="tab3" value={2}><h1>Report</h1></Tab>

				<svelte:fragment slot="panel">
					{#if tabSet === 0}
						<div class="card">
							<section class="p-4">
								<dl class="list-dl">
									{#each info.benefits as benfits, i}
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
							</section>
						</div>
					{:else if tabSet === 1}
						<div class="card">
							<section class="p-4">
								<dl class="list-dl">
									{#each info.warnings as warn, i}
										<div>
											<span class="badge-icon p-4 variant-soft-secondary">{i + 1}</span>
											<span class="flex-auto">
												<dt class="font-bold">by Manger :{warn.issuerManager}</dt>

												<dd class="h6">Descriptions:{warn.description}</dd>
												<dd class="text-sm opacity-50 red">
													<span class="badge variant-filled-error"
														>Mark :{warn.warningType.mark}
														<br />
														name :{warn.warningType.name}
													</span>
												</dd>
											</span>
										</div>
										<!-- ... -->
									{/each}
								</dl>
							</section>
						</div>
					{:else if tabSet === 2}
						<section class="p-4">
							<dl class="list-dl">
								{#if info.reports}
									{#each info.reports as rep, i}
										<div>
											<span class="badge-icon p-4 variant-soft-secondary">{i + 1}</span>
											<span class="flex-auto">
												<dt class="font-bold">by Manger :{rep.managerUsername}</dt>

												<dd class="h6">Descriptions:{rep.reportDescription}</dd>
												<dd class="text-sm opacity-50 red">
													<span class="badge variant-filled-error h5"
														>Report Resualt :{rep.reportResult}
														<br />
														Rating :{rep.rating}
													</span>
												</dd>
											</span>
										</div>
										<!-- ... -->
									{/each}
								{/if}
							</dl>
						</section>
					{/if}
				</svelte:fragment>
			</TabGroup>
		</section>
	</div>
{:catch err}
	<p>{err}</p>
{/await}
