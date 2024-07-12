import type { Ref, ComputedRef } from 'vue';

import type { Nullable } from '../../types';
import type { Track } from '../../store/modules/tracks';

export interface PlayerMiniInstance {
    audio: Ref<Nullable<HTMLAudioElement>>;
    currentTime: Ref<number>;
    isPlaying: ComputedRef<boolean>;
    currentTrack: ComputedRef<Nullable<Track>>;
    isPlayerScreenShown: ComputedRef<boolean>;
    handleWrapperClick: () => void;
    toggleTrack: () => void;
}
