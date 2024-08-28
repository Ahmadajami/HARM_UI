<script lang="ts">
	import type { Warning } from '../../mytypes';
	export let warning: Warning[];
</script>

{#each warning as w}
	<div class="card w-2/12 h-fit variant-ghost-surface p-2 my-2">
		<h1>Manger name</h1>
		<span> Type: {w.warningType.name}</span>
		<br />
		<span> mark: {w.warningType.mark}</span>
		<br />
		<span> description : <code class="code">{w.description}</code> </span>
		<br />
	</div>
{/each}
