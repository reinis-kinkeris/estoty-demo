import type { GameType } from '$lib/types/game.type';
import { writable } from 'svelte/store';

export const games = writable<GameType[]>([]);
