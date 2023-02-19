const actions = {}
const mutations = {
	updateAddress(state, address) {
		state.address = address
		this.commit('user/saveAddressToStorage')
	},
	saveAddressToStorage(state) {
		uni.setStorageSync('address', JSON.stringify(state.address))
	},
	updateUserInfo(state, userinfo) {
		state.userinfo = userinfo
		this.commit('user/saveUserInfoToStorage')
	},
	saveUserInfoToStorage(state) {
		uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
	},
	updateToken(state, token) {
		state.token = token
		this.commit('user/saveTokenToStorage')
	},
	saveTokenToStorage(state) {
		uni.setStorageSync('token', state.token)
	},
	updateRedirectInfo(state, info) {
		state.redirectInfo = info
		// console.log(state.redirectInfo);
	}
}
const state = {
	address: JSON.parse(uni.getStorageSync('address') || '{}'),
	token: uni.getStorageSync('token') || '',
	userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
	redirectInfo: null, // 重定向的object对象{openType,from}
}
const getters = {
	addstr(state) {
		if (!state.address.provinceName) return ''
		return state.address.provinceName + state.address.cityName + state.address.countyName + state.address
			.detailInfo
	}
}

export default {
	namespaced: true,
	actions,
	mutations,
	state,
	getters
}
