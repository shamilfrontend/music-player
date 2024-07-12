import { defineStore } from 'pinia';
import type { Track, TracksState } from './types';
import { tracks } from './constants';

const useTracksStore = defineStore({
	id: 'tracks',

	state: (): TracksState => ({
		tracks,
		currentTrack: null,

		isPlaying: false,
		isPlayerScreenShown: false
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
		}
	}
});

export default useTracksStore;
export { useTracksStore, Track }
