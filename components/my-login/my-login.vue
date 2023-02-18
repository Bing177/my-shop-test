<template>
	<view class="login-container">
		<!-- 提示登录图标 -->
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<!-- 登录按钮 -->
		<button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
		<!-- 登录提示 -->
		<view class="tips-text">
			登录后尽享更多权益
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		methods: {
			...mapMutations('user', ['updateUserInfo']),
			getUserProfile(e) {
				uni.getUserProfile({
					desc: '获取用户信息',
					success: (res) => {
						this.updateUserInfo(res.userInfo)
						this.getToken(res)
					},
					fail: () => {
						uni.$showMsg('登录失败')
					}
				})
			},
			async getToken(info) {
				const [err, res] = await uni.login().catch(e => e)
				if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败')
				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
				// 换取Token
				const {
					data: loginResult
				} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
				console.log(loginResult);
				if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败')
				uni.$showMsg('登录成功')
			}
		},
	}
</script>

<style lang="scss">
	.login-container {
		height: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f8f8f8;
		position: relative;
		overflow: hidden;

		.btn-login {
			width: 90%;
			border-radius: 25px;
			margin: 20px auto;
			background-color: #c00000;
		}

		.tips-text {
			size: 14px;
			color: lightgrey;
		}
	}
</style>
