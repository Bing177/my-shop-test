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
		<view class="btn-settle">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {};
		},
		computed: {
			...mapGetters('cart', ['total', 'checkedCount', 'checkedAmount']),
			isFullCheck() {
				return this.total === this.checkedCount
			}
		},
		methods: {
			...mapMutations('cart', ['updateAllGoodsState']),
			checkAllGoods() {
				this.updateAllGoodsState(!this.isFullCheck)
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
