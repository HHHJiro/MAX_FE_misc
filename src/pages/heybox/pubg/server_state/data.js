
var timeHandler = function (states) {
  var nowTime = new Date()
  var m = nowTime.getMinutes()
  var h = nowTime.getHours()
  var serverState = []
  var restTimes = []
  // 去掉现在的分钟数
  states.splice(0, m)
  // 将一个小时的状态弄成一个数组
  for (let i = 0; i < h; i++) {
    var rest = states.splice(0, 60)
    restTimes.push(rest)
  }
  // 翻转数组将0点至于队首
  restTimes.reverse()
  for (let hList of restTimes) {
    var time = new Date(hList[hList.length - 1].time * 1000).toLocaleTimeString()
    let oState = {}
    let max = null
    let mainState = null
    for (let i = 0; i < hList.length; i++) {
      if (oState[hList[i].state]) {
        oState[hList[i].state]++
      } else {
        oState[hList[i].state] = 1
      }
    }
    Object.entries(oState).forEach(([key, value]) => {
      if (!max) {
        max = value
        mainState = key
      } else {
        if (value > max) {
          [mainState, max] = [key, value]
        }
      }
    })
    oState.mainState = mainState
    oState.time = time
    serverState.push(oState)
  }
  return serverState
}
module.exports = timeHandler
