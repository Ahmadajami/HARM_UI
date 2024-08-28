<script lang="ts">
	import Typewriter from 'svelte-typewriter';
	export let name: string;
	let text = `Welcome back ${name} to your HR App`;
</script>

<Typewriter cursor interval={200}>
	<p class="h2">
		{text}
	</p>
</Typewriter>
