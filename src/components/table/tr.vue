<template>
  <tr class="pubg-tr" :style="'height:' +  height + 'px'">
    <slot></slot>
  </tr>
</template>

<script>
export default {
  name: 'pubg-tr',
  props: {
    height: Number
  }
}
</script>
