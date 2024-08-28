<script lang="ts">
	import { type MangerListDTO } from '$lib/mytypes';
	import { Avatar } from '@skeletonlabs/skeleton';

	import { page } from '$app/stores';

	export let mangor: MangerListDTO;
	const firstTwoChars = mangor?.firstName.slice(0, 2);
</script>

<input name="username" value={mangor.username} hidden />

<div class="flex flex-row card justify-between w-full">
	<div class="p-4">
		<Avatar initials={firstTwoChars} width="w-32" rounded="rounded-full" />
	</div>

	<div class=" grow pt-6 space-y-10">
		<h5 class="h5">
			<strong>FullName</strong>: {mangor.firstName + ' ' + mangor.lastName}
		</h5>
	</div>
</div>
