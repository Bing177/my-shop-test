// 1. 导入Vue 和 Vuex
import Vue from 'vue'
import Vuex from 'vuex'

import cart from '@/store/cart.js'
import user from '@/store/user.js'

// 2. 将Vuex安装为Vue插件
Vue.use(Vuex)

// 3. 创建并暴露Store实例
export default new Vuex.Store({
	modules: {
		cart,
		user
	}
})
