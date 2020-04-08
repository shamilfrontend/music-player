<template>
  <div class="wrapper">
    <div class="header">
      <span class="header-name">Music Player</span>
    </div>
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'SiteLayout'
}
</script>

<style scoped>
.wrapper {
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
}

.header {
  padding: 10px;
  background-color: #4a76a8;
  text-align: center;
  color: #ffffff;
  font-size: 20px;
  line-height: 20px;
}
</style>
