var utils = {
  bindElemet (Eles) {
    var eles = Eles
    for (var name in eles) {
      if (eles.hasOwnProperty(name)) {
        this[name] = $(eles[name])
      }
    }
  }
}
module.exports = utils
