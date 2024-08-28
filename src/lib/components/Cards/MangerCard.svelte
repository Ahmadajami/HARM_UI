<script lang="ts">
	import type { Mangers } from '$lib/mytypes';
	import { Avatar } from '@skeletonlabs/skeleton';
	export let info: Mangers;
	const firstTwoChars = info?.managerFirstName.slice(0, 2);
	export let width: string = 'w-full';
</script>

<div class="{width} text-token grid grid-cols-1">
	<a class="card bg-initial card-hover overflow-hidden" href="/">
		<header class="w-full">
			<div class=" variant-filled-primary h-full text-center text-token">Mangers Card</div>
		</header>
		<div class="p-4 space-y-4">
			<h3 class="h3" data-toc-ignore>{info?.managerFirstName.concat(info.managerLastName)}</h3>
			<article>
				<p><span>Username:</span> {info?.mangerUsername}</p>
			</article>
		</div>
		<hr class="opacity-50" />
		<footer class="p-4 flex justify-start items-center space-x-4">
			<Avatar initials={firstTwoChars} width="w-8" />
			<div class="flex-auto flex justify-between items-center">
				<h6 class="font-bold" data-toc-ignore>By:{info?.mangerUsername}</h6>
			</div>
		</footer>
	</a>
</div>
