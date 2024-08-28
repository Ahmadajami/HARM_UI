<script lang="ts">
	import '../../app.postcss';
	import 'nprogress/nprogress.css';

	import NProgress from 'nprogress';

	import {
		AppShell,
		AppBar,
		Drawer,
		getDrawerStore,
		getModalStore,
		initializeStores,
		storePopup,
		prefersReducedMotionStore,
		type DrawerSettings,
		Modal,
		type ModalComponent,
		type ModalSettings,
		Toast,
		getToastStore
	} from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { fade } from 'svelte/transition';

	import { navigating, page } from '$app/stores';
	import LoginForm from '$lib/components/Forms/LoginForm.svelte';

	NProgress.configure({
		showSpinner: false,
		minimum: 0.1
	});

	//end of imports

	//initlize store
	initializeStores();

	const modalStore = getModalStore();
	const drawerStore = getDrawerStore();
	$: positionClasses = $drawerStore.open ? 'translate-x-[50%]' : '';

	const modalRegistry: Record<string, ModalComponent> = {
		Loginmodal: { ref: LoginForm }
	};
	function modalopen() {
		const modal: ModalSettings = {
			type: 'component',
			component: 'Loginmodal'
		};

		modalStore.trigger(modal);
	}

	function draweropenhandle(): void {
		const drawerSettings: DrawerSettings = {
			id: 'all-1',
			// Provide your property overrides:
			width: 'w-[280px] md:w-[480px]',
			rounded: 'rounded-xl'
		};

		drawerStore.open(drawerSettings);
	}
	$: allyPageSmoothScroll = !$prefersReducedMotionStore ? 'scroll-smooth' : '';
	$: {
		if ($navigating) {
			NProgress.start();
		} else NProgress.done();
	}
</script>

<Toast />
<Modal components={modalRegistry} transitionInParams={{ duration: 400 }} />

<!-- App Shell -->
<AppShell
	slotSidebarLeft="w-0 md:w-52 bg-surface-500/10 "
	class="transition-transform {positionClasses}"
	regionPage={allyPageSmoothScroll}
>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar background="variant-filled"
			><svelte:fragment slot="lead">
				<strong class="text-xl uppercase">HARM SYSTEM</strong>
				{#if $page.data.user}
					<strong class="text-xl uppercase p-4"> {$page.data.user.role}</strong>
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if $page.data.user}
					<form action="/logout" method="POST">
						<button class="btn" type="submit">Log out</button>
					</form>
				{/if}
				{#if !$page.data.user}
					<button class="btn" on:click={modalopen}>login</button>
				{/if}
				{#if !$page.data.user}
					<a class="btn" href="/register">Register</a>
				{/if}
			</svelte:fragment></AppBar
		>
	</svelte:fragment>
	<!-- Page Route Content -->
	<div class="container p-28 mx-auto" transition:fade={{ delay: 250, duration: 300 }}>
		<slot />
	</div>
</AppShell>
