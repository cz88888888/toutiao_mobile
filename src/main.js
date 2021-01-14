import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载 Vant 核心组件库和样式
import Vant from 'vant'
import 'vant/lib/index.css'

// 夹杂全局样式
import './styles/index.less'

// 注册使用 Vant 组件库
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
