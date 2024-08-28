<script lang="ts">
	import { MessageCircleWarning } from 'lucide-svelte';
	import type { Interviews } from '$lib/mytypes';

	export let List: Interviews[];
</script>

<div class="container">
	<table class="table table-interactive text-zinc-950">
		<thead>
			<tr>
				<th>aplicantUsername</th>
				<th>Vacancy title</th>
				<th class="table-cell-fit"></th>
			</tr>
		</thead>
		<tbody>
			{#each List as interviews, i}
				<tr>
					<td> <strong>{interviews.applicantUsername}</strong></td>

					<td>
						<strong>{interviews.vacancyName}</strong>
					</td>
					<td class="table-cell-fit">
						<a
							href="/hradmin/interviews/{interviews.applicantUsername}"
							class="btn btn-sm variant-filled w-min"
						>
							<span><MessageCircleWarning /></span>
							<span>Begain Interview</span>
						</a></td
					>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
