<template>
  <div id="app">
    <Calander :matchData="matchData" />
  </div>
</template>

<script>
import Calander from './components/Calander'

export default {
  name: 'app',
  components: {
    Calander
  },
  data () {
    return {
      matchData: null
    }
  },
  methods: {
    getPubgMatchData () {
    let url = this._Api.getPubgMatchUrl
      this.$axios.get(url)
        .then(res => {
          this.matchData = res.data
        })
    }
  },
  mounted: function () {
    this.getPubgMatchData()
  }
}
</script>
