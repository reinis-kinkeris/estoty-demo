import type { RetentionType } from '$lib/types/retention.type';
import { derived, writable } from 'svelte/store';

export const retentions = writable<RetentionType[]>([]);
export const game = writable<string | undefined>();
export const version = writable<string | undefined>();
export const country = writable<string | undefined>();

export const filteredRetentions = derived(
	[retentions, game, version, country],
	([$retentions, $game, $version, $country]) => {
		return $retentions.filter((retention) => {
			if ($game && retention.app_id !== $game) return false;
			if ($version && retention.app_ver !== $version) return false;
			if ($country && retention.country !== $country) return false;
			return true;
		});
	}
);
