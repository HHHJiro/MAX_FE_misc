var utils = {
  bindElemet (Eles) {
    var eles = Eles
    for (var name in eles) {
      if (eles.hasOwnProperty(name)) {
        this[name] = $(eles[name])
      }
    }
  },
  teamOpenHandler ($team) {
    const arrowHandler = ($arrow) => {
      let arrowText = $arrow.siblings('.arrow__text')
      if ($arrow.hasClass('arrow--down')) {
        $arrow.removeClass('arrow--down').addClass('arrow--up')
        arrowText.text('收起')
      } else {
        $arrow.removeClass('arrow--up').addClass('arrow--down')
        arrowText.text('展开')
      }
    }
    $team.on('click', function (e) {
      let $target = $(e.target)
      let $teamBox = $target.closest('.team__box')
      let $arrow = $teamBox.find('.option .arrow')
      arrowHandler($arrow)
      $teamBox.next('.data__info').toggleClass('hide')
    })
  }
}
module.exports = utils
