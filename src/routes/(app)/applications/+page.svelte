<script lang="ts">
	import MyApplications from '$lib/components/Cards/MyApplications.svelte';
	import { AppRail, AppRailAnchor, AppRailTile, AppShell } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { jobType } from '$lib/mytypes';
	import { UserRoundCheck, UserRoundMinus } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	import type { Icon } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import { tile } from './storetiles';
	export let data: PageData;
	let currentTile = 0;
	let types: string[] = [jobType.FullTime, jobType.InternShip];
	let icons: ComponentType<Icon>[] = [UserRoundCheck, UserRoundMinus];
</script>

{#if $tile == 0}
	{#if data.linset.length === 0}
		<div class="p-8 w-min justify-center">
			<a class=" btn variant-filled" href="/apply"><h5 class="h5">applay now</h5></a>
		</div>
	{/if}
	<div class="card overflow-hidden">
		{#each data.linset as application}
			<div class="space-y-4 m-4">
				<MyApplications {application} />
			</div>
		{/each}
	</div>
	<!-- the section below for intren ship applications -->
{:else if $tile == 1}
	{#if data.Intrenship.length === 0}
		<div><a class="btn" href="/apply"><h1 class="h1">applay now</h1></a></div>
	{/if}
	<div class="card overflow-hidden">
		{#each data.Intrenship as application}
			<div class="space-y-4 m-4">
				<MyApplications {application} />
			</div>
		{/each}
	</div>
{/if}
