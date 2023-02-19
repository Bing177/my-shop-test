<template>
	<view class="my-userinfo-conatiner">
		<!-- 头像昵称 -->
		<view class="top-box">
			<image :src="userinfo.avatarUrl" class="avatar"></image>
			<view class="nickname">{{userinfo.nickName}}</view>
		</view>
		<!-- 面板列表 -->
		<view class="panel-list">
			<!-- 面板1 -->
			<view class="panel">
				<!-- 主体 -->
				<view class="panel-body">
					<!-- item项 -->
					<view class="panel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>13</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>58</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>234</text>
						<text>足迹</text>
					</view>
				</view>
			</view>
			<!-- 面板2 -->
			<view class="panel">
				<view class="panel-title">我的订单</view>
				<view class="panel-body">
					<view class="panel-item">
						<image src="/static/tab_icons/pay.png" class="icon"></image>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<image src="/static/tab_icons/receive.png" class="icon"></image>
						<text>待收货</text>
					</view>
					<view class="panel-item">
						<image src="/static/tab_icons/refund.png" class="icon"></image>
						<text>退款/退货</text>
					</view>
					<view class="panel-item">
						<image src="/static/tab_icons/order.png" class="icon"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<!-- 面板3 -->
			<view class="panel">
				<view class="panel-list-item">
					<text>收货地址</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		name: "my-userinfo",
		data() {
			return {

			};
		},
		computed: {
			...mapState('user', ['userinfo'])
		},
		methods: {
			...mapMutations('user', ['updateUserInfo', 'updateToken', 'updateAddress']),
			async logout() {
				// 询问是否退出
				const [err, succ] = await uni.showModal({
					title: '提示',
					content: '确认退出登录？'
				}).catch(err => err)
				if (succ && succ.confirm) {
					// 推出后，清空vuex中的userinfo,token和address
					this.updateUserInfo({})
					this.updateToken('')
					this.updateAddress({})
				}
			}
		}
	}
</script>

<style lang="scss">
	.my-userinfo-conatiner {
		height: 100%;
		background-color: #f4f4f4;

		.top-box {
			height: 400rpx;
			background-color: #c00000;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.avatar {
				width: 90px;
				height: 90px;
				border-radius: 50%;
				border: 2px solid #fff;
				box-shadow: 0 2px 15px #ccc;
			}

			.nickname {
				font-size: 18px;
				color: #fff;
				font-weight: bold;
				margin-top: 10px;
			}
		}

		.panel-list {
			padding: 0 10px;
			position: relative;
			top: -10px;

			.panel {
				background-color: #fff;
				border-radius: 4px;
				margin-bottom: 8px;

				.panel-title {
					line-height: 45px;
					padding-left: 10px;
					font-size: 15px;
					border-bottom: 1px solid #efefef;
				}

				.panel-list-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 15px;
					height: 40px;
					padding: 0 10px;
				}

				.panel-body {
					display: flex;
					justify-content: space-around;

					.panel-item {
						display: flex;
						flex-direction: column;
						align-items: center;
						padding: 10px 0;
						// font-size: 12px;

						.icon {
							width: 32px;
							height: 32px;
						}

						text {
							padding-top: 10px;
							font-size: 15px;
						}
					}
				}
			}
		}
	}
</style>
