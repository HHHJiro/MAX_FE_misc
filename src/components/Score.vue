<template>
  <div id="pubg-score">
    <pubg-tab :value="activeName" class="category-wrap">
      <pubg-pane v-for="category in scoreData" :key="category.stage_id" :label="category.desc">
        <pubg-tab class="series-wrap" v-if="category.series_list && category.series_list.length > 0" :value="activeName1">
          <pubg-pane v-for="series in category.series_list" :key="series.series_id" :label="series.desc">
            <pubg-tab class="group-wrap" v-if="series.match_list && series.match_list.length > 0" :value="activeName1">
              <pubg-pane v-for="(group, index) in series.match_list" :key="'series-' + index" :label="group.desc">
                <!-- s 吃鸡队伍 -->
                <div class="game-table">
                  <pubg-table :cellWidth="[68, 36, 40, 'auto', 136, 136, 136, 136, 180]">
                    <pubg-thead>
                      <pubg-tr :height="theadHeight">
                        <pubg-th>
                          <p>排名</p>
                        </pubg-th>
                        <pubg-th>
                        </pubg-th>
                        <pubg-th>
                          <p class="team__img"></p>
                        </pubg-th>
                        <pubg-th>
                          <p class="align-left game-table__team-name">队伍名</p>
                        </pubg-th>
                        <pubg-th>
                          <p>排位分</p>
                        </pubg-th>
                        <pubg-th>
                          <p>总击杀</p>
                        </pubg-th>
                        <pubg-th>
                          <p>击杀分</p>
                        </pubg-th>
                        <pubg-th>
                          <p>局总分</p>
                        </pubg-th>
                        <pubg-th>
                        </pubg-th>
                      </pubg-tr>
                    </pubg-thead>
                    <pubg-tbody>
                      <pubg-tr v-for="(team, index) in group.rank_list" :key="'team' + index" :height="trHeight">
                        <pubg-td>
                          <p class="center">{{team.rank}}</p>
                        </pubg-td>
                        <pubg-td>
                        </pubg-td>
                        <pubg-td>
                          <img class="game-table__team team-img" :src="team.team_name | teamImg">
                        </pubg-td>
                        <pubg-td>
                          <p class="align-left game-table__team-name">{{ team.team_name }}</p>
                        </pubg-td>
                        <pubg-td>
                          <p class="center">{{team.rank_score}}</p>
                        </pubg-td>
                        <pubg-td>
                          <p class="center">{{team.kill}}</p>
                        </pubg-td>
                        <pubg-td>
                          <p class="center">{{team.kill_score}}</p>
                        </pubg-td>
                        <pubg-td>
                          <p class="center">{{team.total_score}}</p>
                        </pubg-td>
                        <pubg-td>
                          <p>操作</p>
                        </pubg-td>
                      </pubg-tr>
                    </pubg-tbody>
                  </pubg-table>
                </div>
                <!-- e 吃鸡队伍 -->

              </pubg-pane>
            </pubg-tab>
          </pubg-pane>
        </pubg-tab>
      </pubg-pane>
    </pubg-tab>
  </div>
</template>

<script>
import Bus from './Bus.js'
export default {
  data () {
    return {
      activeName: '1',
      activeName1: '0',
      theadHeight: 30,
      trHeight: 60
    }
  },
  props: {
    matchData: Object
  },
  computed: {
    scoreData () {
      return this.matchData.stage_list
    }
  },
  mounted() {
    Bus.$emit('sayWord', '🥔🥔， 我是🍠')
  }
}
</script>

<style lang="scss">
@import '../style/import';
  #pubg-score {
    background: url($waitingImgSrc) no-repeat;
    background-position: center 300px;
    height: 600px;
    .tabs-nav + .pubg-tabs__content {
      margin-top: 10px;
    }
    .category-wrap {
      & > .tabs-nav {
        & >  .tabs__item {
          background: $tableOdd;
            font-size: 22px;
            color: $lightGrey;
          &.is-active {
            background: url(//cdn.max-c.com/@/heybox/imgs/0a55c00fe14b07568b80125f7c8e899b) no-repeat;
            font-weight: 600;
            background-size: cover;
            background-color: $primary;
            color: $black;
          }
    }
      }
    .series-wrap {
      & > .tabs-nav {
        border: 2px solid $tableOdd;
        border-bottom: none;
         & >  .tabs__item {
            font-size: 16px;
            color: $tinyGrey;
            border-bottom: 2px solid $tableOdd;
          &.is-active {
            color: $primary;
            border-bottom: 2px solid $primary;
          }
         }
      }
    }
    .group-wrap {
      & > .tabs-nav {
        background-color: $tableOdd;
        border: solid 2px $lightBlack;
        height: 42px;
        display: flex;
        align-items: center;
        
         & >  .tabs__item {
            font-size: 16px;
            color: $lightBlack;
            background: $grey;
            height: 28px;
            flex-grow: unset;
            flex-basis: auto;
            padding: 0 18px;
            margin-left: 12px;
            border-radius: 14px;
            &:first-child {
              padding: 0 8px;
              border-radius: 0;
            }
          &.is-active {
            color: $black;
            background-color: $primary;
          }
         }
      }
    }
    }
    .game-table {
      color: #fff;
      .game-table__team-name {
        text-indent: 10px;
      }
      .team-img {
        width: 40px;
      }
    }
  }
</style>

