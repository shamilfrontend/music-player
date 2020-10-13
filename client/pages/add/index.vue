<template>
  <div class="add-track-page">
    <header class="add-track-page__header">
      <h1 class="add-track-page__title">Добавить музыку</h1>
    </header>
    <section>add-track-page</section>
  </div>
</template>

<script>
export default {
  name: 'AddTrackPage',

  middleware: 'is-auth',

  layout: 'player'
}
</script>

<style lang="scss" scoped>
.add-track-page {
  &__header {
    padding: 16px;
    border-bottom: 1px solid var(--secondary-font-color);
  }

  &__title {
    margin: 0;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
  }
}
</style>
