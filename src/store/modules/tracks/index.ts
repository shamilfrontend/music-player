import { defineStore } from 'pinia';

import { tracks } from './constants';
import type { Track, TracksState } from './types';

const useTracksStore = defineStore({
	id: 'tracks',

	state: (): TracksState => ({
		tracks,

		currentTrack: null,

		isPlaying: false,
		isPlayerScreenShown: false,
		isLoadingTrack: false,
	}),

	getters: {
		popularTracks(): Track[] {
			return this.tracks.slice(0, 8);
		},

		favoriteTracks(): Track[] {
			return this.tracks.filter(({favorite}) => Boolean(favorite));
		},
	},

	actions: {
		setCurrentTrack(track: Track): void {
			this.currentTrack = track;
		},

		setPlayerScreen(value: boolean): void {
			this.isPlayerScreenShown = value;
		},

		setPlaying(value: boolean): void {
			this.isPlaying = value;
		},

		setLoading(value: boolean): void {
			this.isPlaying = value;
		}
	}
});

export default useTracksStore;
export { useTracksStore }
export type { Track }
