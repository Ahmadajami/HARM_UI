<script lang="ts">
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import type { Benefit } from '../../mytypes';
	export let benfits: Benefit[];
	export let all_benfits: Benefit[];
	export let salary: number = 0;
	export let username: string;
	let show: boolean = false;
	function showadd() {
		show = !show;
	}
</script>

<div class="flex flex-row justify-between">
	<div>
		<h1>Salary Now is {salary}</h1>
		{#each benfits as b}
			<div class="card variant-ghost-tertiary p-2 my-2">
				<span> Name: {b.name}</span>
				<br />
				<span> Cut precentege : <code class="code">{b.cutPercentage}</code> </span>
				<br />
			</div>
		{/each}
		{#if !show}
			<button on:click={showadd} class="btn variant-filled"> add new </button>
		{/if}
	</div>

	<div class="card shadow-lg items-center">
		{#if show}
			<header>
				<h6 class="h6">add new benifits</h6>
				<hr />
			</header>
			<section class="p-4">
				<select class="select" name="v" size="2" value="1">
					{#each all_benfits as v}
						<option value={v.id}>{v.name}</option>
					{/each}
				</select>
			</section>
			<footer class="w-full items-center py-2">
				<button on:click={showadd} class="btn btn-sm variant-filled w-full">submit</button>
			</footer>
		{/if}
	</div>
</div>
