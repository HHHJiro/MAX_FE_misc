<template>
  <div class="table-wrap">
    <table class="pubg-table">
      <colgroup>
      <col v-for="(w, index) in cellWidth" :width="w" :key="index">
      </colgroup>
      <slot></slot>
    </table>
  </div>
</template>
<script>
export default {
  name: 'pubg-table',
  props: {
    cellWidth: Array
  }
}
</script>
<style lang="scss">
@import '../../style/import';
table.pubg-table {
  font-weight: normal;
  box-sizing: border-box;
  width: 100%;
  border: $tableBorder;
  border-collapse: collapse;
  background: $tableOdd;
  tr:nth-child(even) {
    background: $tableEven;
  }
  thead {
    background: $tableEven;
  }
  th, td, thead, tr {
    border: none;
    padding: 0;
  }
}
</style>


