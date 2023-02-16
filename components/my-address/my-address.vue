<template>
	<view style="background-color: #efefef;">
		<!-- 收货地址 -->
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" class="btn-choose-address" @click="chooseAddress">请选择收货地址+</button>
		</view>
		<!-- 收货信息 -->
		<view v-else class="address-info-box" @click="chooseAddress()">
			<view class="row1">
				<view class="row1-left">
					<view class="username">
						收货人：<text>{{address.userName}}</text>
					</view>
				</view>
				<view class="row1-right">
					<view class="phone">
						电话：<text>{{address.telNumber}}</text>
					</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址：</view>
				<view class="row2-right">
					{{addstr}}
				</view>
			</view>
		</view>
		<image src="/static/border.png" class="address-border" mode="widthFix"></image>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		name: "my-address",
		data() {
			return {
				// 收货地址
				// address: {}
			};
		},
		methods: {
			// 1. 调用小程序提供的 chooseAddress(),即可使用选择收货地址功能
			// 	  返回的是一个数组：第1项为错误对象；第2项为成功后的收货地址对象
			async chooseAddress() {
				const [err, succ] = await uni.chooseAddress().catch(err => err)
				if (err === null && succ.errMsg === 'chooseAddress:ok')
					this.updateAddress(succ)
			},
			...mapMutations('user', ['updateAddress'])
		},
		computed: {
			...mapState('user', ['address']),
			...mapGetters('user', ['addstr'])
		}
	}
</script>

<style lang="scss">
	.address-choose-box {
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.address-info-box {
		font-size: 14px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;

		.row1 {
			display: flex;
			justify-content: space-between;

			.row1-left {
				.username {}
			}

			.row1-right {
				display: flex;
				justify-content: space-between;

				.phone {}
			}
		}

		.row2 {
			display: flex;
			// justify-content: space-between;
			align-items: center;
			margin-top: 10px;

			.row2-left {
				white-space: nowrap;
			}

			.row2-right {}
		}
	}

	.address-border {
		width: 100%;
		height: 100%;
	}
</style>
