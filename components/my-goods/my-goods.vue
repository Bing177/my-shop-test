<template>
	<view class="goods-item">
		<!-- 左侧盒子 -->
		<view class="goods-item-left">
			<radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler"></radio>
			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view>
		<!-- 右侧盒子 -->
		<view class="goods-item-right">
			<!-- 商品名称 -->
			<view class="goods-name">{{goods.goods_name}}</view>
			<!-- 商品价格 -->
			<view class="goods-info-box">
				<view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
				<uni-number-box v-if="showNum" :min="1" :value="goods.goods_count" @change="numChangeHandler">
				</uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods",
		props: {
			goods: {
				type: Object,
				default: {}
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showNum: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				defaultPic: 'https://pic.imgdb.cn/item/63e638ae4757feff33844e20.gif'
			};
		},
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		methods: {
			radioClickHandler() {
				this.$emit('radio-change', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			numChangeHandler(v) {
				this.$emit('num-change', {
					goods_id: this.goods.goods_id,
					goods_count: +v
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		width: 750rpx;
		box-sizing: border-box;
		padding: 10px 5px;
		border-bottom: 1px solid #efefef;

		.goods-item-left {
			margin-right: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-around;

			.goods-name {
				font-size: 13px;
			}

			.goods-info-box {
				display: flex;
				align-items: center;
				justify-content: space-around;

				.goods-price {
					color: #c00000;
					font-size: 17px;
				}
			}
		}
	}
</style>
