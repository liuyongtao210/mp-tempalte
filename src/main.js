import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import echarts from 'echarts'
// vant 按需引入
// import { Button,Calendar,Popup,DropdownMenu, DropdownItem,Tab, Tabs ,Tabbar, TabbarItem,Col, Row} from 'vant';
// vant 按需引入
// Vue.use(Button).use(Calendar).use(Popup).use(DropdownMenu).use(DropdownItem).use(Tab).use(Tabs).use(Tabbar).use(TabbarItem).use(Col).use(Row)
import Vant from 'vant';
import 'vant/lib/index.css';
import "@/assets/css/global.less";


Vue.use(Vant);
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
