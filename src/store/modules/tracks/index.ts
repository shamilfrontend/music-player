import { defineStore } from 'pinia';

import { tracks } from './constants';
import type { Track, TracksState } from './types';

const useTracksStore = defineStore({
	id: 'tracks',

	state: (): TracksState => ({
		tracks,

		currentTrack: null,

		currentSeconds: 0,
		durationSeconds: 0,
		volume: 100,

		isPlaying: false,
		isLooping: false,
		isPlayerScreenShown: false,
		isLoadingTrack: false,
	}),

	getters: {
		favoriteTracks(): Track[] {
			return this.tracks.filter(({favorite}) => Boolean(favorite));
		},
	},

	actions: {}
});

export default useTracksStore;
export { useTracksStore }
export type { Track }
