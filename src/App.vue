<template>
  <div id="app">
    <component v-if="matchData" v-bind:is="currentView" :matchData="matchData"></component>
    <!-- <Calander v-if="matchData" :matchData="matchData.calander" /> -->
  </div>
</template>

<script>
import Calander from './components/Calander'
import Score from './components/Score'
import Bus from './components/Bus.js'
import Vue from 'vue'
export default {
  name: 'app',
  components: {
    Calander,
    Score
  },
  data () {
    return {
      currentView: 'Score',
      matchData: null
    }
  },
  methods: {
    getPubgMatchData () {
    let url = this._Api.getPubgMatchUrl
      this.$axios.get(url)
        .then(res => {
          this.matchData = res.data.result
          this.setTeamImgFilter(this.matchData.team)
        })
    },
    // 队伍图片过滤器
    setTeamImgFilter (teamImgs) {
      Vue.filter('teamImg', function (value) {
        if (!value) return ''
        return teamImgs[value].team_image_url
      })
    }
  },
  mounted: function () {
    this.getPubgMatchData()
    Bus.$on('sayWord', (msg) => {
      console.log(msg)
    })
  }
}
</script>
