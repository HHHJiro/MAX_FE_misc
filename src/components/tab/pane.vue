<template>
  <div 
    class="pubg-pane"
    :id="`pane-${paneName}`"
    v-show="active"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'pubg-pane',
  props: {
    label: String,
    name: String
  },
  data() {
    return {
      index: null
    }
  },
  computed: {
    paneName() {
      return this.name || this.index;
    },
    active() {
      return this.$parent.currentName === (this.name || this.index);
    }
  },
  mounted() {
    this.$parent.addPanes(this);
  }
}
</script>

