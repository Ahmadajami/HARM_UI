<script lang="ts">
	import InterviewTable from '$lib/components/Layouts/InterviewTable.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="p-8 flex flex-col space-y-8">
	<div>
		<h1 class="h1 !text-5xl md:!text-6xl max-w-[600px] capitalize">interviews page</h1>
	</div>

	<div class="h-full card p-8">
		<InterviewTable List={data.all} />
	</div>
</div>
