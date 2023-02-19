<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<button type="primary" class="btn-login" @tap="getUserProfile">一键登录</button>
		<view class="tips-text">登录后尽享更多权益</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		computed: {
			...mapState('user', ['redirectInfo'])
		},
		methods: {
			...mapMutations('user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
			getUserProfile() {
				uni.getUserProfile({
					desc: '获取用户信息',
					success: (res) => {
						this.updateUserInfo(res.userInfo)
						this.getToken(res)
					},
					fail: (err) => {
						return uni.$showMsg('登录失败1')
					}
				})
			},
			async getToken(info) {
				const [err, res] = await uni.login().catch(err => err)
				if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败2')
				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
				uni.request({
					url: 'http://localhost:3300/api/users/login',
					data: query,
					method: 'POST',
					header: {},
					success: ({
						data: res
					}) => {
						if (res.meta.status !== 200) return uni.$showMsg('登录失败3')
						this.updateToken(res.meta.token)
						uni.$showMsg('登录成功')
						// 判断vuex中的redirectInfo 是否为null;如果不为null,登录成功,跳转到需重定向页面
						this.navigateBack(this.redirectInfo)
					},
					fail: (err) => {
						uni.$showMsg('登录失败4')
					}
				})

			},
			navigateBack(redirectInfo) {
				if (this.redirectInfo && this.redirectInfo.openType === 'switchTab')
					uni.switchTab({
						url: redirectInfo.from,
						// 导航完成后，将vuex中的redirectInfo重置为null
						complete: () => {
							this.updateRedirectInfo(null)
						}
					})
			}
		}
	}
</script>

<style lang="scss">
	.login-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f8f8f8;
		position: relative;
		overflow: hidden;
		height: 750rpx;
		position: relative;
		overflow: hidden;

		&::after {
			content: '';
			display: block;
			width: 100%;
			height: 40px;
			border-radius: 100%;
			position: absolute;
			bottom: 0;
			left: 0;
			background-color: #fff;
			transform: translateY(50%);

		}

		.btn-login {
			width: 90%;
			border-radius: 25px;
			margin: 15px auto;
			background-color: #c00000;
		}

		.tips-text {
			font-size: 14px;
			color: gray;
		}
	}
</style>
