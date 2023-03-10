
// #ifndef VUE3
import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false



App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import { $http } from '@escook/request-miniprogram'
uni.$http = $http
$http.baseUrl = 'https://www.uinav.com'
$http.beforeRequest = function(options){
  uni.showLoading({
    title:'数据加载中...'
  })
}

$http.afterRequest = function(){
  uni.hideLoading()
}

uni.$showMsg = function(title="数据请求失败",duration=1500){
  uni.showToast({
    title:title,
    duration:duration,
    icon:'none'
  })
}
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif