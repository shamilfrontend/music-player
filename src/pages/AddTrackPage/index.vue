<template>
  <div class="page-wrap">
    <the-header />

    <div class="page-wrap__content">
      <div class="add-track-page">
        Раздел в разработке!
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import TheHeader from '../../components/TheHeader';

export default defineComponent({
  name: 'AddTrackPage',

  components: {
    TheHeader
  }
});
</script>

<style scoped>
.add-track-page {
  padding: 12px;
}
</style>
