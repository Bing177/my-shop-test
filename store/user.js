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
	}
}
const state = {
	// 收货地址
	address: JSON.parse(uni.getStorageSync('address') || '{}'),
	// 登陆成功后后的token字段
	token: '',
	// 用户信息
	userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}')
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
