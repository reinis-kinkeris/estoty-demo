<script>
	import Filters from '$lib/components/Filters.svelte';
	import RetentionChart from '$lib/components/RetentionChart.svelte';
	import RetentionTable from '$lib/components/RetentionTable.svelte';
	import { TabItem, Tabs } from 'flowbite-svelte';
</script>

<main class="flex max-h-screen flex-col p-4">
	<Filters />
	<Tabs contentClass="overflow-auto">
		<TabItem open title="Table">
			<RetentionTable />
		</TabItem>
		<TabItem title="Chart">
			<RetentionChart />
		</TabItem>
	</Tabs>
</main>
