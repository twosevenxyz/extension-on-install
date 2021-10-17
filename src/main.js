import Vue from 'vue'

Vue.config.productionTip = false

;(async () => {
  const App = (await import('./App.vue')).default
  new Vue({
    render: h => h(App)
  }).$mount('#app')
})()
