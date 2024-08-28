<script lang="ts">
	import { page } from '$app/stores';
	import type { Vacancy } from '$lib/mytypes';
	let url = $page.url.pathname;

	export let vacancy: Vacancy;
</script>

<div class=" table-interactive text-black">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th>jobType</th>
				<th>Years of Exprince</th>
				<th>Salary</th>
				<th>jobDescription</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="table-cell-fit">{vacancy.jobType}</td>
				<td class="table-cell-fit">{vacancy.yearsOfExperience}</td>
				<td class="table-cell-fit">{vacancy.jobSalary}</td>
				<td>{vacancy.jobDescription}</td>
				<td class="table-cell-fit"
					><a href={url.concat(`/${vacancy.id}`)} class="btn w-full variant-filled">
						view applications
					</a></td
				>
			</tr>
		</tbody>
	</table>
</div>
