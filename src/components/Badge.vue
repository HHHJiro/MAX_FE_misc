<template>
  <div id="heybox__logo">
    <img class="logo__img" src="../assets/douyu_gold_s3/heybox_support.png">
  </div>
</template>
<script>
export default {
  name: 'Badge',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  #heybox__logo {
    position: relative;
    height: 0;
  }
  .logo__img {
    position: absolute;
    top: 0;
    right: 0;
    width: 222px;
    height: 28px;
  }
</style>

