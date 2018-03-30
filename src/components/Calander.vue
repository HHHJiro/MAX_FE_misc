<template>
  <div id="calander__box">
    <Badge/>
    <div ref="btnPrev" @click="prevCard" class="calander__btn btn__prev btn--normal"></div>
    <div class="cards__group">
      <ul :style="{ left: viewBoxLeft + 'px' }" ref="cardsViewBox" class="cards-view__box">
        <Card v-for="(card, index) in cards"  :data="card" :state="card.status" :key="index" :cardIndex="index">
          <!-- s 吃鸡队伍 -->
          <div class="win-table">
            <pubg-table :cellWidth="[66, 60 ,'auto', 50, 60]">
              <pubg-thead>
                <pubg-tr :height="theadHeight">
                  <pubg-th>
                    <p>场次</p>
                  </pubg-th>
                  <pubg-th>
                    <p class="team__img"></p>
                  </pubg-th>
                  <pubg-th>
                    <p class="win-table__team team-name">吃鸡队伍名</p>
                  </pubg-th>
                  <pubg-th>
                    <p>击杀数</p>
                  </pubg-th>
                  <pubg-th>
                  </pubg-th>
                </pubg-tr>
              </pubg-thead>
              <pubg-tbody>
                <pubg-tr v-for="team in card.best_list" :key="'team' + team.id" :height="trHeight">
                  <pubg-td>
                    <p>第{{ team.id }}场</p>
                  </pubg-td>
                  <pubg-td>
                    <img class="win-table__team team-img" :src="team.team_name | teamImg">
                  </pubg-td>
                  <pubg-td>
                    <p class="win-table__team team-name">{{ team.team_name }}</p>
                  </pubg-td>
                  <pubg-td>
                    <p>{{team.kill}}</p>
                  </pubg-td>
                  <pubg-td>
                  </pubg-td>
                </pubg-tr>
              </pubg-tbody>
            </pubg-table>
          </div>
          <!-- e 吃鸡队伍 -->
        </Card>
      </ul>
    </div>
    <div ref="btnNext" @click="nextCard" class="calander__btn btn__next"></div>
    
  </div>
</template>
<script>
import Badge from './Badge'
import Card from './Card'
import {hasClass, addClass, removeClass} from '../common/utils/dom'
export default {
  name: 'Calander',
   components: {
    Badge,
    Card
  },
  props: {
    matchData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      cardWidth: 228,
      cardMarRight: 28,
      nowCardAt: 0,
      maxViewCard: 4,
      btnDisableClass: 'btn--disable',
      theadHeight: 30,
      trHeight: 42
    }
  },
  computed: {
    calanderData: function () {
      return this.matchData.calander
    },
    cardOffset: function () {
      return this.calanderData.cardOffset
    },
    cards: function () {
      return this.calanderData.cards
    },
    cardsTotal: function () {
      return this.cards.length
    },
    moveUnitPx: function () {
      return this.cardWidth + this.cardMarRight
    },
    viewBoxLeft: function () {
      return this.moveUnitPx * this.nowCardAt * -1
    }
  },
  watch: {
    nowCardAt: function (val, oldVal) {
      let btnDisableClass = this.btnDisableClass
      if (val === 0) {
        addClass(this.$refs.btnPrev, btnDisableClass)
      } else if (val + this.maxViewCard === this.cardsTotal) {
        addClass(this.$refs.btnNext, btnDisableClass)
      } else {
        hasClass(this.$refs.btnPrev, btnDisableClass) && removeClass(this.$refs.btnPrev, btnDisableClass)
        hasClass(this.$refs.btnNext, btnDisableClass) && removeClass(this.$refs.btnNext, btnDisableClass)
      }
    }
  },
  methods: {
    prevCard () {
      if (this.nowCardAt === 0) {
        return false
      }
      this.nowCardAt--
    },
    nextCard () {
      if (this.nowCardAt + this.maxViewCard === this.cardsTotal) {
        return false
      }
      this.nowCardAt++
    }
  },
  mounted: function () {
    this.nowCardAt = this.cardOffset
  }
}
</script>

<style lang="scss" scoped>
@import '../style/import';
$boxHeight: 270px;
$cardsGroupMar: 34px 52px 0;
$cardsGroupHeight: 220px;
  #calander__box {
    position: relative;
    width: $mainWidth;
    height: $boxHeight;
    overflow: hidden;
    margin: 0 auto;
    color: #fff;
    user-select: none;
    .cards__group {
      margin: $cardsGroupMar;
      height: $cardsGroupHeight;
      overflow: hidden;
      position: relative;
    }
    .cards-view__box {
      position: absolute;
      left: 0;
      top: 0;
      height: $cardsGroupHeight;
      width: 99999px;
      transition: all .6s ease-in-out;
    }
    .calander__btn {
      width: 24px;
      height: 48px;
      border-radius: 12px;
      background: url('../assets/arrow.png');
      background-size: 200%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      &.btn--normal {
        background-position-y: 100%;
      }
      &.btn__prev {
        background-position-x: 0;
        left: 0;
      }
      &.btn__next {
        background-position-x: 100%;
        background-position-y: 100%;
        right: 0;
      }
      &.btn--disable {
        background-position-y: 0;
        cursor: not-allowed;
      }
    }

    .showleft {
      .win-table {
        right: 191px;
        left: auto;
      }
    }
    .win-table {
      width: 356px;
      position: absolute;
      top: 0;
      left: 191px;
      background: #f1f2f3;
      z-index: 999;
      max-height: 220px;
      overflow-y: scroll;
      .team-img {
        height: 24px;
        margin: 0 auto;
      }
      .team-name {
        text-align: left;
      }
    }
  }
</style>
