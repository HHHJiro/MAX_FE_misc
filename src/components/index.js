import Vue from 'vue'

import * as table from './table'
import * as tab from './tab'

const components = {
  ...table,
  ...tab
}

const install = function () {
  Object.keys(components).forEach((key) => {
    Vue.component(components[key].name, components[key])
  })
}

export default {
  ...components,
  install
}
