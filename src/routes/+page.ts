import { games } from '$lib/stores/gamesStore.js';
import { retentions } from '$lib/stores/retentionsStore.js';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const gamesResponse = await fetch('https://storage.googleapis.com/estoty-temp/games.json');
	const retentionsResponse = await fetch(
		'https://storage.googleapis.com/estoty-temp/retention.json'
	);

	retentions.set(await retentionsResponse.json());
	games.set(await gamesResponse.json());
}
