<script lang="ts">
	import { filteredRetentions, retentions } from '$lib/stores/retentionsStore';
</script>

<table>
	<thead>
		<tr>
			<th>Version</th>
			<th>Country</th>
			{#each $retentions[0].days as _, i}
				<th>D{i}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each $filteredRetentions as { app_id, app_ver, country, days } (app_id + app_ver + country)}
			<tr>
				<td>{app_ver}</td>
				<td>{country}</td>
				{#each days as day}
					<td>{((day / days[0]) * 100).toFixed(0)}%</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		font-size: 0.75rem;
		line-height: 1rem;
	}

	thead,
	td:nth-child(1),
	td:nth-child(2),
	th:nth-child(1),
	th:nth-child(2) {
		position: sticky;
		background-color: #f3f4f6;
	}

	thead {
		top: 0;
		z-index: 1;
	}

	td:nth-child(1),
	th:nth-child(1) {
		width: 90px;
		left: 0;
	}

	td:nth-child(2),
	th:nth-child(2) {
		left: 90px;
	}

	th,
	td {
		padding: 0.75rem 1.5rem;
		border-bottom: 1px solid #eee;
	}
</style>
