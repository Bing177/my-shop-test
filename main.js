import App from './App'
import {
	$http
} from '@escook/request-miniprogram'
import store from '@/store/index.js'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif

//封装$http对象
uni.$http = $http
$http.baseUrl = 'https://www.uinav.com'
//请求拦截器
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: 'loadding...'
	})
}
//响应拦截器
$http.afterRequest = function() {
	uni.hideLoading()
}
//封装弹框方法
uni.$showMsg = function(title = '数据请求失败', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}
