import type { Ref, ComputedRef } from 'vue';

import type { Nullable } from '../../types';
import type { Track } from '../../store/modules/tracks';

export interface PlayerMiniInstance {
    audio: Ref<Nullable<HTMLAudioElement>>;
    currentTime: Ref<number>;
    isPlaying: ComputedRef<boolean>;
    isLooping: ComputedRef<boolean>;
    currentTrack: ComputedRef<Nullable<Track>>;
    isPlayerScreenShown: ComputedRef<boolean>;
    isLoading: ComputedRef<boolean>;
    handleWrapperClick: () => void;
    toggleTrack: () => void;
    handleTimeUpdate: () => void;
    handleVolumeChange: (event: Event) => void;
    handleLoad: () => void;
}
