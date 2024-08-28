<script lang="ts">
	import { AppRail, AppRailTile, AppShell } from '@skeletonlabs/skeleton';
	import { jobType } from '$lib/mytypes';
	import { UserRoundCheck, UserRoundMinus, type Icon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	import { tile } from './storetiles.js';

	export let data;
	let currentTile = 0;
	$: {
		$tile = currentTile;
	}

	let types: string[] = [jobType.FullTime, jobType.InternShip];
	let icons: ComponentType<Icon>[] = [UserRoundCheck, UserRoundMinus];
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<AppRail>
			{#each types as type, i}
				<AppRailTile bind:group={currentTile} name="tile-1" value={i} title="tile-1">
					<svelte:fragment slot="lead"
						><div class="px-6"><svelte:component this={icons[i]} /></div></svelte:fragment
					>
					<span>{type}</span>
				</AppRailTile>
			{/each}
		</AppRail>
	</svelte:fragment>
	<slot />
</AppShell>
