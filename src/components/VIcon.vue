<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="'#icon-' + icon"></use>
  </svg>
</template>
<script>
export default {
  name: 'v-icon',
  props: {
    icon: String
  }
}
</script>

<style lang="scss" scoped>
@import '../style/icon';
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
 }
</style>
