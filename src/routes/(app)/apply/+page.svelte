<script lang="ts">
	import { enhance } from '$app/forms';
	import { ListBox, ListBoxItem, Step, Stepper } from '@skeletonlabs/skeleton';
	import ApplayTable from '$lib/components/Layouts/ApplayTable.svelte';
	import type { ActionData, PageData } from './$types';
	import { Minus, Plus } from 'lucide-svelte';
	import Mloading from '$lib/components/Layouts/Mloading.svelte';
	import { invalidateAll } from '$app/navigation';
	export let data: PageData;
	let choosen: number;
	let vList = data.table;
	$: previousProjectsids = ['pp'];
	$: LockedStep = choosen >= 0 ? false : true;
	export let form: ActionData;
	let input_class = 'input bg-gray-50 shadow-xl';
	let EnglishLevel: string = 'A1';
	let EnglishLevelLsit: string[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
	//----------------------------------

	function addmore() {
		const x = previousProjectsids.length + 1;
		previousProjectsids = [...previousProjectsids, 'pp'];
		console.log(previousProjectsids);
	}
	function removeLastElementPop<T>(arr: T[]): T[] {
		arr.pop();
		return arr;
	}
	function deletemore() {
		if (previousProjectsids.length > 1) {
			const x = removeLastElementPop(previousProjectsids.slice());

			previousProjectsids = x;
		}
	}
	let sending = false;
</script>

<form method="POST" action="?/newappps" use:enhance>
	<div class="container">
		<div class="slide">
			<Stepper buttonCompleteType="submit">
				<Step locked={LockedStep}>
					<svelte:fragment slot="header">First Find Your job</svelte:fragment>
					<ApplayTable {vList} bind:choosen />
				</Step>
				<Step locked={LockedStep}>
					<svelte:fragment slot="header"
						><p>Applay For {vList[choosen].jobTitle}</p></svelte:fragment
					>

					<div class=" p-4 rounded-xl shadow-2xl">
						<hr class="!border-dashed" />

						<input
							id="vacancyid"
							name="vacancyid"
							class="input"
							type="text"
							placeholder="Input"
							value={vList[choosen].id}
							hidden
						/>
						<input
							id="previousProjectscount"
							name="previousProjectscount"
							class="input"
							type="number"
							placeholder="Input"
							value={previousProjectsids.length}
							hidden
						/>

						<input
							id="applicant"
							name="applicant"
							class="input"
							type="text"
							placeholder="Input"
							value={data.user.name}
							hidden
						/>
						<section class="p-4">
							<div class="flex flex-col space-y-8">
								<div>
									<label class="label" for="programmingLanguage">
										<span class="h2"> Prefered Programming Language</span>
										<input
											id="programmingLanguage"
											name="programmingLanguage"
											class={input_class}
											type="text"
											placeholder="C++,Java,C#,Fortran,dart,js,ts"
										/>
									</label>
								</div>
								<div>
									<label class="label">
										<span class="h2">Write Your Motivation Letter</span>
										<textarea
											id="MotivationLetter"
											name="MotivationLetter"
											class="textarea bg-gray-50 shadow-xl"
											rows="4"
											placeholder="Descripe youre self "
										/>
									</label>
								</div>
								<div class="card bg-gray-50 shadow-xl">
									<header class="h1 p-2">Choose your English Level :{EnglishLevel}</header>
									<section class=" card bg-gray-100 p-4">
										<ListBox>
											{#each EnglishLevelLsit as EL}
												<ListBoxItem bind:group={EnglishLevel} name="EnglishLevel" value={EL}
													>{EL}</ListBoxItem
												>
											{/each}
										</ListBox>
									</section>
								</div>
								<div>
									{#each previousProjectsids as PP, i}
										<div class="py-4">
											<div class="">
												<section class="p-4">
													<span class="h2 py-16"> Projects number {i + 1} </span>
													<div class="py-2">
														<label class="label">
															<span>Project name</span>
															<input
																id={'n' + PP + i.toString()}
																name={'n' + PP + i.toString()}
																class="{input_class} py-3"
																type="text"
																placeholder="E-commerce,Content Mangement,Games"
															/>
														</label>
													</div>
													<div class="py-2">
														<label class="label">
															<span>Company name</span>
															<input
																id={'c' + PP + i.toString()}
																name={'c' + PP + i.toString()}
																class="{input_class} py-3"
																type="text"
																placeholder="Meta,google,reddit"
															/>
														</label>
													</div>
													<div class="py-2">
														<label class="label">
															<span>Descripe</span>
															<input
																id={'d' + PP + i.toString()}
																name={'d' + PP + i.toString()}
																class="{input_class} py-3"
																type="text"
																placeholder="Project conclusion"
															/>
														</label>
													</div>
												</section>
											</div>
										</div>
									{/each}
									<div class="flex space-x-2 justify-center">
										<div>
											<button type="button" class="btn variant-filled" on:click={addmore}
												>Add more <Plus />
											</button>
										</div>
										<div>
											<button type="button" class="btn variant-filled" on:click={deletemore}
												>Remove <Minus /></button
											>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
				</Step>
			</Stepper>
		</div>
	</div>
</form>
