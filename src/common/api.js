var getPubgMatchUrl = ''
var {NODE_ENV, MATCH_ID} = process.env
if (NODE_ENV === 'development') {
  getPubgMatchUrl = `https://heybox.tt.maxjia.com/game/pubg_league/data/?league_id=${MATCH_ID}`
} else {
  getPubgMatchUrl = `//dotamax.net/static/pubg_league_${MATCH_ID}.json?heybox=1`
}
export default {getPubgMatchUrl}
