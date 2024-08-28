<script lang="ts">
	import '../../../app.postcss';
	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import {
		Drawer,
		Modal,
		Toast,
		initializeStores,
		storePopup,
		type ModalComponent,
		type ModalSettings,
		getModalStore,
		AppShell,
		prefersReducedMotionStore,
		getDrawerStore,
		AppBar,
		type DrawerSettings,
		AppRail,
		AppRailAnchor,
		AppRailTile,
		LightSwitch,
		Avatar,
		popup,
		type PopupSettings
	} from '@skeletonlabs/skeleton';
	import { CircleUser, LogIn, LogOut, Palette, RockingChair } from 'lucide-svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();
	//---my import are down for store intilization
	import Navigation from '$lib/components/Layouts/Navigation.svelte';
	import LoginForm from '$lib/components/Forms/LoginForm.svelte';
	import { Grip } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import HireForm from '$lib/components/Forms/HireForm.svelte';
	import Filedrop from '$lib/components/Forms/Filedrop.svelte';
	import Rightnav from '$lib/components/Layouts/Rightnav.svelte';
	import Benfits from '$lib/components/Forms/Benfits.svelte';
	import Mangeredit from '$lib/components/Forms/Mangeredit.svelte';
	import NewBenefits from '$lib/components/Forms/NewBenefits.svelte';
	import Confirmdel from '$lib/components/Forms/Confirmdel.svelte';
	import NewPostions from '$lib/components/Forms/NewPostions.svelte';
	import PConfirm from '$lib/components/Forms/PConfirm.svelte';
	import VConfirm from '$lib/components/Forms/VConfirm.svelte';
	import { backInOut } from 'svelte/easing';
	import 'nprogress/nprogress.css';
	import NProgress from 'nprogress';
	import { navigating } from '$app/stores';
	import SetInterview from '$lib/components/Forms/SetInterview.svelte';
	import Promate from '$lib/components/Forms/Promate.svelte';
	NProgress.configure({
		showSpinner: false,
		minimum: 0.1
	});
	//import type { LayoutData } from './$types';
	///some vars for layout
	const modalStore = getModalStore();
	const drawerStore = getDrawerStore();

	const modalRegistry: Record<string, ModalComponent> = {
		Loginmodal: { ref: LoginForm },
		HireForm: { ref: HireForm },
		Benfits: { ref: Benfits },
		editmanger: { ref: Mangeredit },
		AddnewBenefits: { ref: NewBenefits },
		Confirmdel: { ref: Confirmdel },
		AddnewPostions: { ref: NewPostions },
		Pconfirm: { ref: PConfirm },
		Vconfirm: { ref: VConfirm },
		SetInterview: { ref: SetInterview },
		Promate: { ref: Promate },
		file: { ref: Filedrop }
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
	$: positionClasses = $drawerStore.open && $drawerStore.id === 'all-1' ? 'translate-x-[30%] ' : '';
	$: positionClasses2 =
		$drawerStore.open && $drawerStore.id === 'right-info' ? 'translate-x-[-60%] ' : '';
	let currentTile: number = 0;
	export let data;
	let axis;
	$: {
		if ($navigating) {
			NProgress.start();
		} else NProgress.done();
	}
	const popupFeatured: PopupSettings = {
		// Represents the type of event that opens/closed the popup
		event: 'click',
		// Matches the data-popup value on your popup element
		target: 'popupFeatured',

		// Defines which side of your trigger the popup will appear
		placement: 'bottom-end'
	};
</script>

<Toast />
<Modal components={modalRegistry} transitionInParams={{ duration: 400 }} />
<Drawer>
	{#if $drawerStore.id === 'all-1'}
		<Navigation />
	{:else if $drawerStore.id === 'right-info'}
		<Rightnav />
	{/if}
</Drawer>
<AppShell
	class="transition-transform {$drawerStore.id === 'right-info'
		? positionClasses2
		: positionClasses}"
	regionPage={allyPageSmoothScroll}
>
	<svelte:fragment slot="header">
		<AppBar background="variant-filled">
			<svelte:fragment slot="lead">
				<button class=" btn btn-sm mr-4" on:click={draweropenhandle}>
					<Grip size="20" />
				</button>
			</svelte:fragment>
			<strong class="text-xl uppercase pr-3">HARM SYSTEM</strong>
			{#if $page.data.user}
				{$page.data.user.role}
			{/if}
			<svelte:fragment slot="trail">
				{#if !$page.data.user}
					<button class="btn" use:popup={popupFeatured}><CircleUser /></button>
					<div
						class="card p-4 w-72 h-1/3 shadow-xl rounded-xl variant-filled"
						data-popup="popupFeatured"
					>
						<div class="relative inline-block h-16 variant-filled-primary w-64">
							<span class="absolute top-9 left-24 z-50">
								<Avatar initials="un" />
							</span>
						</div>
						<div class=" pl-20 mt-8">
							<p class="h6 text-white pr-0">Not signed in</p>
						</div>
						<hr />

						<div class=" mt-4 w-full">
							<button type="button" class="btn btn-sm variant-filled w-full" on:click={modalopen}>
								<span><LogIn /></span>
								<span>login</span>
							</button>
						</div>
					</div>
					<div class="arrow variant-filled"></div>
				{/if}

				{#if $page.data.user}
					<button class="btn" use:popup={popupFeatured}><CircleUser /></button>
					<div
						class="card p-4 w-72 h-2/5 shadow-xl rounded-xl variant-filled"
						data-popup="popupFeatured"
					>
						<div class="relative inline-block h-16 variant-filled-primary w-64">
							<span class="absolute top-9 left-24 z-50">
								<Avatar initials={$page.data.user.name.slice(0, 2)} />
							</span>
						</div>
						<div class=" flex flex-row justify-center items-center mt-9 card variant-ghost p-4">
							<div class="self-center">
								<p class="h6 text-white pr-5">Username: <strong>{$page.data.user.name}</strong></p>
								<p class="h6 text-white pr-5">
									<strong class="h6">Role:{$page.data.user.role}</strong>
								</p>
							</div>
						</div>

						<div class=" p-2">
							<form action="/logout" method="POST">
								<button class="btn v" type="submit"
									><span><LogOut /></span><span>Log out</span></button
								>
							</form>
						</div>
					</div>
					<div class="arrow variant-filled"></div>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<AppRail hover="">
			<svelte:fragment slot="lead">
				<AppRailAnchor
					active="variant-filled"
					href="/hradmin"
					selected={$page.url.pathname === '/hradmin'}
					><svelte:fragment slot="lead"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-layout-dashboard"
							><rect width="7" height="9" x="3" y="3" rx="1" /><rect
								width="7"
								height="5"
								x="14"
								y="3"
								rx="1"
							/><rect width="7" height="9" x="14" y="12" rx="1" /><rect
								width="7"
								height="5"
								x="3"
								y="16"
								rx="1"
							/></svg
						></svelte:fragment
					>
					<span>DashBoard</span></AppRailAnchor
				>
				<AppRailAnchor
					active="variant-filled"
					href="/hradmin/position"
					selected={$page.url.pathname === '/hradmin/position'}
					><svelte:fragment slot="lead">
						<RockingChair /></svelte:fragment
					>
					<span>Postions</span></AppRailAnchor
				>
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>

	{#key data.url}
		<div
			class="px-20 mx-auto h-full overflow-hidden"
			transition:slide={{ delay: 250, duration: 1500, easing: backInOut, axis: 'x' }}
		>
			<slot />
		</div>
	{/key}
</AppShell>
