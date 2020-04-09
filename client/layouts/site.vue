<template>
  <div class="wrapper">
    <div class="header">
      <span class="header-name">Music Player</span>
    </div>
    <div class="content">
      <nuxt />
    </div>
    <div class="copyright">© {{ currentYear }} Music-player</div>
  </div>
</template>

<script>
export default {
  name: 'SiteLayout',

  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.wrapper {
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
}

.header,
.copyright {
  padding: 10px;
  background-color: #4a76a8;
  color: #ffffff;
  text-align: center;
}

.header {
  font-size: 28px;
  line-height: 30px;
}

.content {
  min-height: calc(100vh - 90px);
}

.copyright {
  font-size: 20px;
  line-height: 20px;
}
</style>
