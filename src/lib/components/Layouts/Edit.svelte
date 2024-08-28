<script lang="ts">
	import type { Icon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';

	export let title: string;

	export let prefix_Icon: ComponentType<Icon>;
</script>

<p>{title}</p>
<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] w-min h-min">
	<div class="input-group-shim"><svelte:component this={prefix_Icon} /></div>
	<slot />
</div>
