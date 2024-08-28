<script lang="ts">
	import { type Employee } from '$lib/mytypes';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	export let emplyee: Employee;
	const firstTwoChars = emplyee?.firstName.slice(0, 2);
</script>

<form id="calsal" name="calsal" method="post" action="?/salary" use:enhance>
	<input name="username" value={emplyee.username} hidden />

	<div class="flex flex-row card justify-between w-full">
		<div class="p-4">
			<Avatar initials={firstTwoChars} width="w-32" rounded="rounded-full" />
		</div>

		<div class=" grow pt-6 space-y-10">
			<h5 class="h5">
				<strong>FullName</strong>: {emplyee.firstName + ' ' + emplyee.lastName}
			</h5>
			<h5 class="h5">
				<strong>Manger name</strong>: {emplyee.managerDTO.managerFirstName +
					' ' +
					emplyee.managerDTO.managerLastName}
			</h5>
		</div>

		<div class="flex flex-row-reverse items-center">
			{#if $page.data.user.role === 'HR'}
				{#if !($page?.form?.salarysuc && emplyee.username === $page?.form?.username)}
					<div class=" flex flex-col items-center justify-around px-2 h-full">
						<div>
							<button
								form="calsal"
								type="submit"
								class="btn variant-filled w-32 hover:bg-blue-400 text-sm">Calculate Salary</button
							>
						</div>
					</div>
				{/if}
			{/if}

			{#if $page?.form?.salarysuc && emplyee.username === $page?.form?.username}
				<div class=" px-8 items-center" transition:fade={{ delay: 250, duration: 300 }}>
					<p>salary : {$page?.form?.salary}</p>
					<p>month : {$page?.form?.month}</p>
				</div>
			{/if}
		</div>
	</div>
</form>
