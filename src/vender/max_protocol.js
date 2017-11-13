var protocol = {
  protocolStart: 'maxjia://',
  openDotaPlayerInfo (steamId) {
    const _protocolName = 'OpenDotaPlayerInfo#/'
    if (steamId) {
      let data = {result: {steam_id: steamId}, status: "ok"}
      return this.protocolFactory(_protocolName, data)
    }
  },
  openDotaProfessionTeam (oTeam) {
    const _protocolName = 'OpenDotaProfessionTeam#/'
    if (oTeam) {
      let data = {result: oTeam, status: "ok"}
      return this.protocolFactory(_protocolName, data)
    }
  },
  protocolFactory (protocolName, jsonData) {
    var result = JSON.stringify(jsonData)
    return `${this.protocolStart}${protocolName}${result}`
  }
}

module.exports = protocol
