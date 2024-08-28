<script lang="ts">
	import type { ScreeningResults } from '$lib/applicanttypes';
	export let screeningResults: ScreeningResults;
</script>

<div class="container">
	<!-- Responsive Container (recommended) -->
	<div class="table-container">
		<!-- Native Table Element -->
		<div class="  card variant-filled-warning my-4">
			<span>Ai Results</span>
			<table class="table table-hover table-compact">
				<thead>
					<tr>
						<th class="table-cell-fit">javaDeveloper</th>
						<th class="table-cell-fit">databaseAdmin</th>
						<th class="table-cell-fit">frontEnd</th>
						<th class="table-cell-fit">webDeveloper</th>
						<th class="table-cell-fit">systemAdmin</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="table-cell-fit">{screeningResults.javaDeveloper}</td>
						<td class="table-cell-fit">{screeningResults.databaseAdmin}</td>
						<td class="table-cell-fit">{screeningResults.frontEnd}</td>
						<td class="table-cell-fit">{screeningResults.webDeveloper}</td>
						<td class="table-cell-fit">{screeningResults.systemAdmin}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="  card variant-filled-warning">
			<span>Ai Results</span>
			<table class="table table-hover table-compact">
				<thead>
					<tr>
						<th class="table-cell-fit">softwareDeveloper</th>
						<th class="table-cell-fit">pythonDeveloper</th>
						<th class="table-cell-fit">networkAdmin</th>
						<th class="table-cell-fit">projectManager</th>
						<th class="table-cell-fit">securityAnalyst</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="table-cell-fit"
							><span class="chip variant-filled">{screeningResults.softwareDeveloper}</span></td
						>
						<td class="table-cell-fit">{screeningResults.pythonDeveloper}</td>
						<td class="table-cell-fit">{screeningResults.networkAdmin}</td>
						<td class="table-cell-fit">{screeningResults.projectManager}</td>
						<td class="table-cell-fit">{screeningResults.securityAnalyst}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
