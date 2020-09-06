import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'

import vuetify from '@/plugins/vuetify' // path to vuetify export

import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    vuetify,
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})