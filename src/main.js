import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import echarts from "echarts";
import dataV from '@jiaminghi/data-view'

Vue.use(dataV)
Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.prototype.$echarts = require("echarts")

new Vue({
  render: h => h(App),
}).$mount('#app')
