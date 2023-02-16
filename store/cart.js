// 购物车
const actions = {}
const mutations = {
	addToCart(state, goods) {
		// 根据提交的商品ID，查询是否存在
		// 如果不存在，则findResult为undefined；否则为找到的商品对象
		const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
		// 如果购物车没有这件商品，直接push
		if (!findResult)
			state.cart.push(goods)
		// 如果有，直接更新数量
		else
			findResult.goods_count++
		this.commit('cart/saveToStorage')
	},
	// 将购物车数据存储在本地
	saveToStorage(state) {
		uni.setStorageSync('cart', JSON.stringify(state.cart))
	},
	updateGoodsState(state, goods) {
		const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
		if (findResult) {
			findResult.goods_state = goods.goods_state
			this.commit('cart/saveToStorage')
		}
	},
	updateGoodsCount(state, goods) {
		const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
		if (findResult) {
			findResult.goods_count = goods.goods_count
			this.commit('cart/saveToStorage')
		}
	},
	removeGoodsById(state, goods_id) {
		state.cart = state.cart.filter(x => x.goods_id !== goods_id)
		this.commit('cart/saveToStorage')
	},
	updateAllGoodsState(state, newState) {
		state.cart.forEach(x => x.goods_state = newState)
		this.commit('cart/saveToStorage')
	}
}
const state = {
	// cart中每一项：{goods_id,goods_name,goods_price,goods_count,goods_small_logo,goods_state}
	cart: JSON.parse(uni.getStorageSync('cart') || '[]')
}
const getters = {
	total(state) {
		// let c = 0
		// state.cart.forEach(goods => c += goods.goods_count)
		// return c
		return state.cart.reduce((total, item) => total += item.goods_count, 0)
	},
	checkedCount(state) {
		// 先使用 filter(),从购物车中过滤已勾选的商品
		// 再使用 reduce(),将已勾选商品数量累加
		return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
	},
	checkedAmount(state) {
		return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count * item
			.goods_price, 0).toFixed(2)
	}
}

export default {
	namespaced: true,
	actions,
	mutations,
	state,
	getters
}
