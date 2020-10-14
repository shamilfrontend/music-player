<template>
  <div class="tracks">
    <header class="tracks__header">
      <h1 class="tracks__title">Все треки</h1>
    </header>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TracksPage',

  middleware: 'is-auth',

  layout: 'player'
}
</script>

<style lang="scss" scoped>
.tracks {
  &__header {
    padding: 16px;
    border-bottom: 1px solid var(--dark-color-medium);
  }

  &__title {
    margin: 0;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
  }
}
</style>
