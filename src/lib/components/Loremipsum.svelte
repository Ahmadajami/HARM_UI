<script lang="ts">
	import { onDestroy } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { linear } from 'svelte/easing';
	const text =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
	let positionStore;
	let position = 0;
	let cleanup: any = null;
	let easingName = 'lin';

	onDestroy(() => {
		if (cleanup) cleanup();
	});
	$: {
		if (cleanup) cleanup();

		positionStore = tweened(0, {
			duration: 30000,
			easing: linear
		});
		cleanup = positionStore.subscribe((val) => (position = val));

		positionStore.set(text.length);
	}
</script>

<h1>
	{text.substr(0, position)}
</h1>
