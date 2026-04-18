import type { Track } from '../../store/modules/tracks';
import type { ClassValue, Nullable } from '../../types';

export type TrackItemPropTrack = Track;

export interface TrackItemProps {
  track: TrackItemPropTrack
}

export type TrackItemClassValue = ClassValue;
export type CurrentTrack = Nullable<Track>;
