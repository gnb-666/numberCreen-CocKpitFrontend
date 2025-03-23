import { createApp, VueElement } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import locale from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引用lib-flexible插件
import '../flexible'
import dataV from '@jiaminghi/data-view'

import scroll from 'vue-seamless-scroll'
// 引入自适应
import '@/dependency/ltkg.js'

const app = createApp(App);
app.use(store).use(router).use(dataV).use(scroll).use(ElementPlus, { locale }).mount('#app')
app.config.globalProperties.$http = axios;
app.config.globalProperties.$kg = window.kg;
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}