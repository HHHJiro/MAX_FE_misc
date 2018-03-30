<template>
  <li class="card"
  :class="[cardState.cardClass]" >
  <div class="card__wrap">
    <div class="card__head">
      <h3 class="card__time">{{ data.time }}</h3>
      <p class="card__text">{{ cardState.text }}</p>
    </div>
    <div class="card__body">
      <h3 class="card__title">{{data.title}}</h3>
      <div class="card__info">
        <div class="card__winnerbox">
          <p class="card__winner card--end" v-if="state == 0">
            <v-icon class="card__champion" icon="champion" /> {{ data.home }}
          </p>
          <p class="card__winner card--unhappend" v-else>
            本轮冠军: -
          </p>
        </div>
      </div>
      <div class="card__footerbox">
        <p class="card__footer--end" v-if="state == 0" @click="showWinTeam">
          吃鸡战队 <v-icon class="icon-arrow" :class="cardArrowClass" icon="arrow_thick" />
        </p>
        <p class="card__footer--unhappend" v-else>
          敬请期待
        </p>
      </div>
    </div>
  </div>
  <div class="slot-box" :class="{hide: !showWinTeamFlag, showleft: showTableLeft}">
    <slot></slot>
  </div>
  </li>
</template>

<script>
export default {
  props: {
    state: {
      type: Number,
      default: 2
    },
    data: {
      type: Object,
      default: {}
    },
    cardIndex: Number
  },
  computed: {
    cardState () {
      return this.cardStatusData[this.state]
    }
  },
  data () {
    return {
      // class 类和相应描述
      cardStatusData: {
        0: {
          cardClass: 'card--end',
          text: '已结束'
        },
        1: {
          cardClass: 'card--gaming',
          text: '比赛中'
        },
        2: {
          cardClass: 'card--unhappen',
          text: '未开始'
        }
      },
      showTableLeft: false,
      showWinTeamFlag: false,
      cardArrowStatus: ['win__arrow--close', 'win__arrow--open'],
      cardArrowClass: 'win__arrow--close'
    }
  },
  mounted: function () {
    console.log(this.data)
  },
  watch: {
    showWinTeamFlag: function (val, oldVal) {
      this.cardArrowClass = this.cardArrowStatus[ + val]
    }
  },
  methods: {
    showWinTeam () {
      if (this.cardIndex - this.$parent.nowCardAt >= 2) {
        this.showTableLeft = true
      }
      this.showWinTeamFlag = !this.showWinTeamFlag
    }
  }
}
</script>

<style lang="scss">
@import '../style/import.scss';
$cardHeight: 220px;
$cardWidth: 228px;
$cardTitleHeight: 74px;
$cardBodyHeight: $cardHeight - $cardTitleHeight;
.card {
  position: relative;
  width: $cardWidth;
  float: left;
  margin-right: 28px;
  height: $cardHeight;
  text-align: center;
  .card__head {
    height: $cardTitleHeight;
    background: url('../assets/douyu_gold_s3/calander_status_douyugold.jpg') no-repeat;
    background-size: 100% 200%;
    overflow: hidden;
    color: $black;
    font-family: Arial, Helvetica, sans-serif;
    border-radius: 4px 4px 0 0;
  }
  &__time {
    font-size: 16px;
    font-weight: 600;
    margin: 16px 0 4px;
  }
  &__text {
     font-size: 14px;
  }
  &__title {
    font-size: 16px;
    font-weight: 600;
    margin: 13px 0 0;
    line-height: 2.0;
  }
  &__winner {
    font-size: 24px;
    font-weight: 600;
    margin: 6px 0 15px;
    line-height: 1.33;
  }
  &__footerbox {
    p {
      display: inline-block;
      height: 24px;
      line-height: 24px;
      border: solid 2px #646464;
      border-radius: 14px;
      margin: 0 auto;
      padding: 0 24px;
      font-size: 14px;
    }
  }
  .card__body {
    height: $cardBodyHeight;
    background: $white;
    color: $black;
    overflow: hidden;
    border-radius: 0 0 4px 4px;
  }
  // 结束
  &.card--end {
    .card__head {
      background-position-y:100%; 
    }
    .card__title {
      color: $grey;
    }
    .card__winner, .card__footer--end {
      color: $darkPrimary;
      border-color: $darkPrimary;
    }
    .card__footer--end {
      cursor: pointer;
    }
  }
  &.card--gaming, &.card--unhappen {
    .card__title {
      color: $darkPrimary;
    }
    .card__winner, .card__footer--end {
      color: $grey;
      border-color: $grey;
    }
  }
}
</style>


