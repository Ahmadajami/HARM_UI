<script lang="ts">
	import { page } from '$app/stores';
	import Typewriter from 'svelte-typewriter';
	import Hero from '$lib/components/Layouts/Hero.svelte';
	import {
		ConicGradient,
		getModalStore,
		type ConicStop,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import Ssop from '$lib/components/Ssop.svelte';
	let tech_list: string[] = ['SvletKit', 'javascript', 'Python', 'Flask', 'SpringBoot', 'Java'];
	const conicStops: ConicStop[] = [
		{ label: 'SvletKit', color: 'rgba(255,255,255,1)', start: 0, end: 30 },
		{ label: 'Flask', color: 'rgba(255,255,255,0.5)', start: 30, end: 70 },
		{ label: 'SpringBoot', color: 'rgba(255,255,255,0.25)', start: 70, end: 100 }
	];
	const modalStore = getModalStore();
	function modalopen(url: string | null) {
		const modal: ModalSettings = {
			type: 'component',
			component: 'Loginmodal',
			meta: { parameter: url }
		};

		modalStore.trigger(modal);
	}
	if ($page.url.searchParams.size > 0) {
		console.log($page.url.searchParams.get('Username'));

		modalopen($page.url.searchParams.get('Username'));
	}
</script>

<div class="container">
	<header id="hero">
		{#if $page.data.user}
			<Ssop name={$page.data.user.name} />
		{/if}

		<div class="slide h-screen"><Hero /></div>
	</header>

	<section class="slide h-auto">
		<div class="card p-4">
			<header class="card-header">
				<h2 class="h2">Tech Used</h2>
			</header>

			<section class="p-4">
				<div class="grid grid-cols-2 grid-rows-1 gap-4">
					<div>
						<nav class="list-nav">
							her is nav
							<!-- (optionally you can provide a label here) -->
							<ul>
								{#each tech_list as t_item, i}
									<li>
										<!-- svelte-ignore a11y-missing-attribute -->
										<a>
											<span class="flex-auto"> {i + 1} : {t_item}</span>
										</a>
									</li>
								{/each}
							</ul>
						</nav>
					</div>

					<ConicGradient stops={conicStops} legend>Techs Rate</ConicGradient>
				</div>
			</section>
		</div>
	</section>
</div>

<style>
	.container {
		width: 100%;
		scroll-snap-type: y mandatory;
	}
	.slide {
		width: 100%;

		scroll-snap-align: start;
	}
</style>
