<script lang="ts">
	import { ConicGradient, type ConicStop } from '@skeletonlabs/skeleton';

	const conicStops: ConicStop[] = [
		{ color: 'transparent', start: 0, end: 25 },
		{ color: 'rgb(var(--color-secondary-500))', start: 75, end: 100 }
	];
</script>

<div class="w-full h-full fixed top-0 left-0 bg-white opacity-75">
	<div class="flex justify-center items-center mt-[50vh]">
		<ConicGradient stops={conicStops} spin>Loading</ConicGradient>
	</div>
</div>
