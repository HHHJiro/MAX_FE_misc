<template>
  <div id="calander__box">
    <Badge/>
    <div class="calander__btn btn__prev btn--normal"></div>
    <div class="cards__group">
      <div class="cards-view__box">
        <Card v-for="(card, index) in cards"  :data="cards[index]" :state="index" :key="index"/>
      </div>
    </div>
    <div class="calander__btn btn__next btn--disable"></div>
    
  </div>
</template>
<script>
import Badge from './Badge'
import Card from './Card'
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
      
    }
  },
  computed: {
     cards: function () {
       return this.matchData.cards
     }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/import.scss';
$boxHeight: 270px;
$cardsGroupMar: 34px 53px 0;
$cardsGroupHeight: 220px;
  #calander__box {
    position: relative;
    width: $mainWidth;
    height: $boxHeight;
    overflow: hidden;
    margin: 0 auto;
    color: #fff;
    .cards__group {
      margin: $cardsGroupMar;
      height: $cardsGroupHeight;
      overflow: hidden;
    }
    .cards-view__box {
      width: 99999px;
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
      &.btn--disable {
        background-position-y: 0;
        cursor: not-allowed;
      }
      &.btn__prev {
        background-position-x: 0;
        left: 0;
      }
      &.btn__next {
        background-position-x: 100%;
        right: 0;
      }
    }
  }
</style>
