import type { ComputedRef } from 'vue';

import type { Track } from '../../store/modules/tracks';
import type { ClassValue, Nullable } from '../../types';

export type TrackItemPropTrack = Track;

export interface TrackItemProps {
    track: TrackItemPropTrack
}

export type TrackItemClassValue = ClassValue;
export type CurrentTrack = Nullable<Track>;

export interface TrackItemInstance {
    isPlaying: ComputedRef<boolean>;
    isLoading: ComputedRef<boolean>;
    trackItemClasses: ComputedRef<TrackItemClassValue>;
    favoriteIconClasses: ComputedRef<string>;
    playPauseIconClasses: ComputedRef<string>;
    handleTrackClick: () => void;
    handlePlayPauseBtnClick: () => void;
}
