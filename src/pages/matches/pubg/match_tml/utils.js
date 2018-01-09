var calanderRender = require('./card_win_team.art')
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
  },
  cardTeamBoxHandler ($ele, cardData, tableData) {
    $ele.on('click', function (e) {
      var $this = $(this)
      var status = $this.attr('data-status')
      if (status != 0) {
        return false
      }
      var winTable = $('.win__table')
      var $thisArrow = $this.find('.arrow')
      if ($thisArrow.hasClass('arrow--right')) {
        winTable.addClass('hide')
        $thisArrow.removeClass('arrow--right').addClass('arrow--down')
      } else {
        console.log(cardData.nowtranslateX)
        var $card = $this.closest('.calander__card')
        var $arrow = $('.arrow')
        $arrow.removeClass('arrow--right').addClass('arrow--down')
        $thisArrow.removeClass('arrow--down').addClass('arrow--right')
        var cardIndex = $card.index()
        var left = cardData.marginRight * cardIndex + cardData.width * (cardIndex + 1)
        if (cardData.nowtranslateX + left > 900) {
          left = cardData.marginRight * cardIndex + cardData.width * cardIndex - 360
          winTable.removeClass('hide').removeClass('right__show').addClass('left__show')
        } else {
          winTable.removeClass('hide').removeClass('left__show').addClass('right__show')
        }
        $('.win__table').css('left', left + 'px')
        $('#calander--winteam__table').html(calanderRender(tableData[cardIndex].best_list))
      }
    })
  }
}
module.exports = utils
