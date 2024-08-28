<script lang="ts">
	import type { Applicant } from '$lib/applicanttypes';
	import { CardType, type Employee } from '$lib/mytypes';
	import { Avatar } from '@skeletonlabs/skeleton';
	import IconsText from './IconsText.svelte';
	import { Calendar, Home, Laptop, Phone, Award, UserRound } from 'lucide-svelte';
	import Edit from './Edit.svelte';
	export let about: Applicant;
	const firstTwoChars = about?.firstName.slice(0, 2);
	let readonly = true;
	function edit() {
		readonly = !readonly;
	}
</script>

<div class="flex flex-row card justify-start">
	<div class="p-4 pr-4">
		<Avatar initials={firstTwoChars} width="w-32" rounded="rounded" />
	</div>

	<div class=" px-2 py-2">
		<div class="ps-3">
			<div class="text-base font-semibold">username: {about.username}</div>
		</div>
		<Edit prefix_Icon={UserRound} title="Fullname"
			><input type="text" value={about.firstName + ' ' + about.lastName} {readonly} /></Edit
		>
		<Edit prefix_Icon={Calendar} title="Birthdate"
			><input type="text" value={about.dateOfBirth.toLocaleDateString()} {readonly} /></Edit
		>
		<Edit prefix_Icon={Award} title="degree"
			><input type="text" value={about.degree} {readonly} /></Edit
		>
	</div>

	<div class="  px-2 py-2">
		<div class="ps-3">more info</div>
		<Edit prefix_Icon={Home} title="Residence"
			><input type="text" value={about.residence} {readonly} /></Edit
		>
		<Edit prefix_Icon={Phone} title="Phone number"
			><input type="text" value={about.number} {readonly} /></Edit
		>
		<Edit prefix_Icon={Laptop} title="Previous company "
			><input type="text" value={about.prevCompany} {readonly} /></Edit
		>
	</div>
	<div class="   grow p-4">
		<div class=" flex flex-col items-center justify-around px-2 h-full">
			<div>
				{#if readonly}
					<button
						on:click={edit}
						type="button"
						class="btn btn-md variant-filled w-32 hover:bg-blue-400">Edit</button
					>
				{/if}
			</div>
			<div>
				{#if !readonly}
					<button type="button" class="btn btn-md variant-filled w-32 hover:bg-blue-400"
						>submit</button
					>
					<button on:click={edit} type="button" class="btn btn-md variant-filled-error w-32"
						>cancel</button
					>
				{/if}
			</div>
		</div>
	</div>
</div>
