<script lang="ts">
	import { Bar } from 'svelte-chartjs';
	import {
		Chart,
		Title,
		Tooltip,
		Legend,
		BarElement,
		CategoryScale,
		LinearScale,
		Colors
	} from 'chart.js';
	import { filteredRetentions } from '$lib/stores/retentionsStore';

	Chart.register(Title, Tooltip, Legend, Colors, BarElement, CategoryScale, LinearScale);

	type DataType = {
		label: string;
		data: number[];
	};

	const xAxisScale = [0, 10, 20, 30, 60, 90];
	const data: { datasets: DataType[]; labels: string[] } = {
		datasets: [],
		labels: xAxisScale.map((day) => `D${day}`)
	};

	$: $filteredRetentions,
		(data.datasets = $filteredRetentions
			.reduce<
				{
					label: string;
					data: number[];
				}[]
			>((arr, { app_ver, days }) => {
				const existingItem = arr.find((item) => item.label === app_ver);

				if (existingItem) {
					xAxisScale.forEach((day, i) => (existingItem.data[i] += days[day]));
				} else {
					arr.push({
						label: app_ver,
						data: xAxisScale.map((day) => days[day])
					});
				}

				return arr;
			}, [])
			.map(({ label, data }) => {
				const day0 = data[0];
				return {
					label,
					data: data.map((item) => Number(((item / day0) * 100).toFixed(0)))
				};
			})
			.sort((a, b) => a.label.localeCompare(b.label, undefined, { numeric: true })));
</script>

<Bar
	{data}
	options={{
		responsive: true,
		scales: {
			y: {
				ticks: {
					callback: (value) => `${value}%`
				}
			}
		},
		plugins: {
			tooltip: {
				callbacks: {
					label: (context) => `${context.dataset.label}: ${context.parsed.y}%`
				}
			}
		}
	}}
/>
