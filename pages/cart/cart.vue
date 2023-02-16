<template>
	<view class="cart-container" v-if="cart.length">
		<!-- 收货地址 -->
		<my-address></my-address>
		<!-- 购物车标题 -->
		<view class="cart-title">
			<!-- 左侧图标 -->
			<uni-icons type="cart" size="18"></uni-icons>
			<!-- 内容 -->
			<text class="cart-title-text">购物车</text>
		</view>
		<!-- 商品列表 -->
		<uni-swipe-action>
			<block v-for="(goods,i) of cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler($event,goods)"
					@change="swipeChange(goods)">
					<my-goods :goods="goods" :showRadio="true" :showNum="true" @radio-change="radioChangeHandler"
						@num-change="numberChange"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<!-- 结算组件 -->
		<my-settle></my-settle>
	</view>
	<!-- 空白购物车展示 -->
	<view class="empty-cart" v-else>
		<image src="/static/emptycart.png" class="empty-img" mode="widthFix"></image>
		<!-- <text class="tip-text">空空如也~快去选购吧！</text> -->
	</view>
</template>

<script>
	import badgeMixin from '@/mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				options: [{
					text: '取消',
					style: {
						backgroundColor: '#ffaa00'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#c00000'
					}
				}]
			};
		},
		mixins: [badgeMixin],
		computed: {
			...mapState('cart', ['cart'])
		},

		methods: {
			radioChangeHandler(e) {
				this.updateGoodsState(e)
			},
			numberChange(e) {
				this.updateGoodsCount(e)
			},
			swipeActionClickHandler(event, goods) {
				if (event.content.text === '取消') return
				this.removeGoodsById(goods.goods_id)
			},
			swipeChange(goods) {
				// console.log(goods);
			},
			...mapMutations('cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById'])
		}
	}
</script>

<style lang="scss">
	.cart-container {
		padding-bottom: 60px;

		.cart-title {
			height: 40px;
			display: flex;
			align-items: center;
			font-size: 14px;
			padding-left: 5px;
			border-bottom: 1px solid #dfdfdf;

			.cart-title-text {
				margin-left: 10px;
			}
		}
	}

	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 0;

		.empty-img {
			// width: 440px;
			// height: 100%;
		}

		.tip-text {}
	}
</style>
