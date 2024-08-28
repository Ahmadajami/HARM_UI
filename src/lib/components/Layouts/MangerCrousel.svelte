<script lang="ts">
	import { MoveLeft, MoveRight } from 'lucide-svelte';
	import MangerCard from '../Cards/MangerCard.svelte';
	import type { Mangers } from '$lib/mytypes';
	import { page } from '$app/stores';
	let elemMovies: HTMLDivElement;
	let mangers: Mangers[] = $page.data.manger_list_toall;
	function multiColumnLeft(): void {
		let x = elemMovies.scrollWidth;
		if (elemMovies.scrollLeft !== 0) x = elemMovies.scrollLeft - elemMovies.clientWidth;
		elemMovies.scroll(x, 0);
	}

	function multiColumnRight(): void {
		let x = 0;
		// -1 is used because different browsers use different methods to round scrollWidth pixels.
		if (elemMovies.scrollLeft < elemMovies.scrollWidth - elemMovies.clientWidth - 1)
			x = elemMovies.scrollLeft + elemMovies.clientWidth;
		elemMovies.scroll(x, 0);
	}
</script>

<div class="  items-center h-3/5 py-4">
	<div class="grid grid-cols-[auto_1fr_auto] gap-4 items-center space-y-0.5 h-full">
		<!-- Button: Left -->
		<button type="button" class="btn-icon variant-filled ml-2" on:click={multiColumnLeft}>
			<MoveLeft />
		</button>
		<!-- Carousel -->
		<div
			bind:this={elemMovies}
			class="snap-x snap-mandatory scroll-smooth flex gap-2 pb-2 overflow-x-auto h-60"
		>
			{#each mangers as m, i}
				<div
					class=" items-center text-center shrink-0 w-[28%] snap-start rounded-container-token hover:brightness-125 mb-4"
				>
					<MangerCard info={m} />
				</div>
			{/each}
		</div>
		<!-- Button-Right -->
		<button type="button" class="btn-icon variant-filled mr-2" on:click={multiColumnRight}>
			<MoveRight />
		</button>
	</div>
</div>
