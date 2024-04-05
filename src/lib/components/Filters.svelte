<script lang="ts">
	import { games } from '$lib/stores/gamesStore';
	import { country, game, retentions, version } from '$lib/stores/retentionsStore';
	import type { RetentionType } from '$lib/types/retention.type';
	import Dropdown from './Dropdown.svelte';

	type AggregatedRetentionType = RetentionType & { devices: number };
	type DropdownItemType = {
		label: string;
		value: string;
		icon?: string;
	};

	let versionDropdownItems: DropdownItemType[] = [];
	let countryDropdownItems: DropdownItemType[] = [];

	const aggregateRetention = function (
		array: AggregatedRetentionType[],
		retention: RetentionType,
		groupBy: keyof RetentionType
	) {
		const existingItem = array.find((item) => item[groupBy] === retention[groupBy]);

		if (existingItem) {
			existingItem.devices += retention.days[0];
		} else {
			array.push({
				...retention,
				devices: retention.days[0]
			});
		}

		return array;
	};

	const gameDropdownItems = [
		...$games
			.map(({ app_id, name, icon }) => ({
				icon,
				label: name,
				value: app_id
			}))
			.sort((a, b) => a.label.localeCompare(b.label, undefined, { numeric: true }))
	];

	$: $game,
		$country,
		(versionDropdownItems = [
			...$retentions
				.filter((retention) => {
					if ($game && retention.app_id !== $game) return false;
					if ($country && retention.country !== $country) return false;
					return true;
				})
				.reduce<AggregatedRetentionType[]>(
					(curr, retention) => aggregateRetention(curr, retention, 'app_ver'),
					[]
				)
				.sort((a, b) => a.app_ver.localeCompare(b.app_ver, undefined, { numeric: true }))
				.map((retention) => ({
					label: `${retention.app_ver} (${retention.devices})`,
					value: retention.app_ver
				}))
		]);

	$: $game,
		$version,
		(countryDropdownItems = [
			...$retentions
				.filter((retention) => {
					if ($game && retention.app_id !== $game) return false;
					if ($version && retention.app_ver !== $version) return false;
					return true;
				})
				.reduce<AggregatedRetentionType[]>(
					(curr, retention) => aggregateRetention(curr, retention, 'country'),
					[]
				)
				.sort((a, b) => a.country.localeCompare(b.country, undefined, { numeric: true }))
				.map((retention) => ({
					label: `${retention.country} (${retention.devices})`,
					value: retention.country
				}))
		]);

	$: $game, ($version = undefined), ($country = undefined);
</script>

<div class="mb-4 flex gap-4">
	<Dropdown label="Filter Game" items={gameDropdownItems} bind:value={$game} />
	<Dropdown label="Filter Version" items={versionDropdownItems} bind:value={$version} />
	<Dropdown label="Filter Country" items={countryDropdownItems} bind:value={$country} />
</div>
