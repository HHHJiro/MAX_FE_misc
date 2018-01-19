<template>
  <li class="el-card"
  :class="{ 'el-card--unhappen': state }" >
    <div class="el-card__head">
      
    </div>
    <div class="el-card__body">
      {{data.title}}
    </div>
  </li>
</template>

<script>
export default {
  props: {
    state: {
      type: Number,
      default: true
    },
    data: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {

    }
  },
  mounted: function () {
    console.log(this.data)
  }
}
</script>

<style lang="scss" scoped>
@import '../style/import.scss';
$cardHeight: 220px;
$cardWidth: 228px;
$cardTitleHeight: 74px;
$cardBodyHeight: $cardHeight - $cardTitleHeight;
.el-card {
  width: $cardWidth;
  float: left;
  margin-right: 28px;
  height: $cardHeight;
  overflow: hidden;
  border-radius: 4px;
  .el-card__head {
    height: $cardTitleHeight;
  }
  .el-card__body {
    height: $cardBodyHeight;
    background: $white;
  }
}
</style>


