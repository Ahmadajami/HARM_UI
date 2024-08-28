<script lang="ts">
	import { page } from '$app/stores';
	import { AppShell, RadioGroup, RadioItem, TabAnchor } from '@skeletonlabs/skeleton';

	$: value = $page.url.pathname;
</script>

<AppShell>
	<svelte:fragment slot="header">
		<div class=" bars">
			<RadioGroup>
				<TabAnchor
					href="/vacation"
					active="variant-filled"
					selected={$page.url.pathname === '/vacation'}
				>
					<span> Vacation Page</span>
				</TabAnchor>

				<TabAnchor
					href="/vacation/request"
					active="variant-filled"
					selected={$page.url.pathname === '/vacation/request'}
				>
					<span> Request a Vacation</span>
				</TabAnchor>

				<TabAnchor
					href="/vacation/pending"
					active="variant-filled"
					selected={$page.url.pathname === '/vacation/pending'}
				>
					<span> Pending Page</span>
				</TabAnchor>
			</RadioGroup>
		</div>
	</svelte:fragment>
	<div class="overflow-hidden">
		<slot />
	</div>
</AppShell>

<style>
	.bars {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
