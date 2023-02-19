<template>
	<view class="my-settle-container">
		<!-- 全选 -->
		<label class="radio">
			<radio color="#c00000" :checked="isFullCheck" @click="checkAllGoods" /><text>全选/All</text>
		</label>
		<!-- 合计 -->
		<view class="amount-box">
			合计：<text class="amount">￥{{checkedAmount}}</text>
		</view>
		<!-- 结算 -->
		<view class="btn-settle" @click="settlement">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {
				seconds: 3,
				timer: ''
			};
		},
		computed: {
			...mapGetters('cart', ['total', 'checkedCount', 'checkedAmount']),
			...mapGetters('user', ['addstr']),
			...mapState('user', ['token']),
			...mapState('cart', ['cart']),
			isFullCheck() {
				return this.total === this.checkedCount
			}
		},
		methods: {
			...mapMutations('cart', ['updateAllGoodsState']),
			...mapMutations('user', ['updateRedirectInfo']),
			checkAllGoods() {
				this.updateAllGoodsState(!this.isFullCheck)
			},
			settlement() {
				if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')
				if (!this.addstr) return uni.$showMsg('请选择收货地址！')
				if (!this.token) return this.delayNavigate()
				// 实现微信支付
				this.payOrder()
			},
			showTips(n) {
				uni.showToast({
					icon: 'none',
					title: '请先登录后再结算！' + n + '秒后自动跳转到登录页',
					mask: true,
					duration: 1500 // 1.5s后消失
				})
			},
			delayNavigate() {
				this.showTips(this.seconds)
				this.timer = setInterval(() => {
					this.seconds--
					this.showTips(this.seconds)
					if (this.seconds <= 0) {
						uni.switchTab({
							url: '/pages/my/my',
							success: () => {
								this.updateRedirectInfo({
									openType: 'switchTab',
									from: '/pages/cart/cart'
								})
							}
						})
						clearInterval(this.timer)
						return this.seconds = 3
					}
					this.showTips(this.seconds)
				}, 1000)
			},
			// 微信支付
			async payOrder() {
				// 1. 创建订单信息对象
				const orderInfo = {
					order_price: 0.01, //开发时，使用假的订单价格
					consignee_addr: this.addstr,
					goods: this.cart.filter(x => x.goods_state).map(x => ({
						goods_id: x.goods_id,
						goods_number: x.goods_count,
						goods_price: x.goods_price,
					}))
				}
				// 2. 发送生成订单请求
				try {
					const {
						data: res
					} = await new Promise((resolve, reject) => {
						uni.request({
							url: 'http://localhost:3300/user/my/order',
							method: 'POST',
							data: orderInfo,
							header: {
								Authorization: this.token
							},
							success: (res) => {
								resolve(res)
							},
							fail: (err) => {
								reject(err)
							}
						})
					})
					// 3. 得到服务器响应的订单编号
					const orderNumber = res.message.order_number
					// 4. 订单预支付
					try {
						const {
							data: res2
						} = await new Promise((resolve, reject) => {
							uni.request({
								url: 'http://localhost:3300/user/my/pay',
								method: 'POST',
								header: {
									Authorization: this.token
								},
								data: {
									order_number: orderNumber
								},
								success: (res) => {
									resolve(res)
								},
								fail: (err) => {
									reject(err)
								}
							})
						})
						if (res2.meta.status !== 200) return uni.$showMsg('预支付订单生成失败')
						// 5. 得到订单支付相关的必要参数
						const payInfo = res2.message.pay
						// 6. 调用uni.requestPayment()发起微信支付
						const [err, succ] = await uni.requestPayment(payInfo)
						if (err) {
							console.log(err);
							return uni.$showMsg('订单未支付1')
						}
						// 7. 完成支付后，查询结果
						uni.request({
							url: '/user/my/pay-detail',
							method: 'POST',
							header: {
								Authorization: this.token
							},
							data: {
								order_number: orderNumber
							},
							success: ({
								data: res3
							}) => {
								if (res3.meta.status !== 200) return uni.$showMsg('订单未支付2')
								// 8. 检测到订单支付完成
								uni.showToast({
									icon: 'success',
									title: '订单支付成功!'
								})
							},
							fail: (err) => {
								console.log(err);
								return uni.$showMsg('订单支付失败')
							}
						})
					} catch (e) {
						console.log(e);
					}
				} catch (e) {
					console.log(e);
				}
			}
		}
	}
</script>

<style lang="scss">
	.my-settle-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		background-color: white;
		font-size: 14px;
		padding: 0 5px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount-box {
			.amount {
				color: #c00000;
				font-weight: bold;
			}
		}

		.btn-settle {
			background-color: #ff0000;
			height: 50px;
			color: #fff;
			line-height: 50px;
			padding: 0 10px;
			min-width: 100px;
			text-align: center;
		}
	}
</style>
