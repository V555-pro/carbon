import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'

import store from './store'
import 'carbon-components/css/carbon-components.css'
import CarbonComponentsVue from '@carbon/vue/src/index'
import { CarbonIconsVue } from '@carbon/icons-vue'
import TrashCan16 from '@carbon/icons-vue/es/trash-can/16'
import Save16 from '@carbon/icons-vue/es/save/16'
import Download16 from '@carbon/icons-vue/es/download/16'

Vue.use(CarbonComponentsVue)
Vue.use(CarbonIconsVue, {
  components: {
    TrashCan16,
    Download16,
    Save16
  }
})

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
