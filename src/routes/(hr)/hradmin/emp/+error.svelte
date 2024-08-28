<script lang="ts">
	import { page } from '$app/stores';
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();
	modalStore.clear();
</script>

<h1>{$page.status}: {$page.error?.message}</h1>
