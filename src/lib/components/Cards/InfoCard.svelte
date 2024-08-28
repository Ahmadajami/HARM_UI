<script lang="ts">
	import type { Applicant } from '$lib/applicanttypes';
	import { Avatar } from '@skeletonlabs/skeleton';
	export let info: Applicant | undefined;
	export let application_date: Date | undefined;
	const firstTwoChars = info?.firstName.slice(0, 2);
	export let width: string = 'w-full';
</script>

<div class="{width} text-token grid grid-cols-1">
	<a class="card bg-initial card-hover overflow-hidden" href="#">
		<header class="w-full">
			<div class=" variant-filled-primary h-full text-center text-token">Applicant Card</div>
		</header>
		<div class="p-4 space-y-4">
			<h3 class="h3" data-toc-ignore>{info?.firstName + ' ' + info?.lastName}</h3>
			<article>
				<p><span>Previous Company:</span> {info?.prevCompany}</p>
				<p><span>Residence:</span> {info?.residence}</p>
				<p><span>Degree:</span> {info?.degree}</p>
				<p>
					<span>BirhtDate:</span>
					{info?.dateOfBirth ? new Date(info?.dateOfBirth).toLocaleDateString() : ''}
				</p>
			</article>
		</div>
		<hr class="opacity-50" />
		<footer class="p-4 flex justify-start items-center space-x-4">
			<Avatar initials={firstTwoChars} width="w-8" />
			<div class="flex-auto flex justify-between items-center">
				<h6 class="font-bold" data-toc-ignore>By:{info?.username}</h6>
				<small>On {application_date ? new Date(application_date).toLocaleDateString() : ''}</small>
			</div>
		</footer>
	</a>
</div>
