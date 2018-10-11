import Vue from 'vue'
import 'normalize.css/normalize.css'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './filters';
import './plugins/element.js'
import components from './components'
import moduleEvent from './event/moduleEvent';

let myPlugin = {}
myPlugin.install = function (vue, options) {
  vue.prototype.$event = moduleEvent;
}

Object.keys(filters).forEach(key => { Vue.filter(key, filters[key]) })

Vue.use(myPlugin);

components.forEach(component => Vue.component(component.name,component.instance))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
