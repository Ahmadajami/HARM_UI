<script lang="ts">
	import Typewriter from 'svelte-typewriter';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';

	const modalStore = getModalStore();
	function modalopen() {
		const modal: ModalSettings = {
			type: 'component',
			component: 'Loginmodal',
			response: (r: boolean | undefined) => {}
		};

		modalStore.trigger(modal);
	}
	let text = $page.data.user
		? $page.data.user.role === 'HR' || $page.data.user.role === 'MG'
			? 'The HR toolkit to Mange your employees.'
			: $page.data.user.role === 'APP'
				? 'The HR toolkit to Apply For Jobs.'
				: 'HR Toolkit By HRMS '
		: 'HR Toolkit By HRMS ';
</script>

<div class="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-10 items-center">
	<!-- Info -->
	<div
		class="flex flex-col items-center xl:items-center text-center xl:text-left space-y-4"
		in:fly={{ y: 200, duration: 1000 }}
		out:fly={{ x: -200, duration: 1000 }}
	>
		<Typewriter cursor interval={200}>
			<h1 class="h1 !text-5xl md:!text-6xl max-w-[600px]">
				{text}
			</h1>
		</Typewriter>
		<p class="!text-xl max-w-[475px]">Hr allows you to enchance your Employee and track them.</p>
		<div class="flex gap-4">
			<a href="/" on:click={modalopen} class="btn variant-filled-primary">
				<span>Get Started</span>
				<i class="fa-solid fa-arrow-right-long" />
			</a>
			<a href="/about" class="btn variant-soft-primary">Learn More</a>
		</div>
	</div>
	<div>
		<enhanced:img
			src="../../assets/HomeImage.webp"
			alt="Home IMage"
			in:fly={{ y: -200, duration: 1000 }}
			out:fly={{ y: -200, duration: 1000 }}
		/>
	</div>
</div>
