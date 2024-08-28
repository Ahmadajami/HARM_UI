<script lang="ts">
	export const Icon: string = 'Icon';
	export let title: string = 'title';
</script>

<section class="p-4">
	<p>{title}</p>
	<div class="input-group input-group-divider grid-cols-[1fr_auto]">
		<slot>
			<input disabled />
		</slot>
	</div>
</section>
