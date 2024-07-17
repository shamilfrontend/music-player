<template>
  <div class="page-wrap">
    <div class="page-wrap__content">
      <div class="add-track-page">
        Раздел в разработке!
      </div>

      <div>
        <audio-player
          file="/tracks/miyagi_andy_panda_kosandra.mp3"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AudioPlayer from '../../components/AudioPlayer';

export default defineComponent({
  name: 'AddTrackPage',

  components: {
    AudioPlayer
  }
});
</script>

<style scoped>
.add-track-page {
  padding: 12px;
}
</style>
