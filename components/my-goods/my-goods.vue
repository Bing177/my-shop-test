<template>
	<view class="goods-item">
		<!-- 左侧盒子 -->
		<view class="goods-item-left">
			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view>
		<!-- 右侧盒子 -->
		<view class="goods-item-right">
			<!-- 商品名称 -->
			<view class="goods-name">{{goods.goods_name}}</view>
			<!-- 商品价格 -->
			<view class="goods-info-box">
				<view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
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
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #efefef;

		.goods-item-left {
			margin-right: 5px;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.goods-name {
				font-size: 13px;
			}

			.goods-info-box {
				.goods-price {
					color: #c00000;
					font-size: 17px;
				}
			}
		}
	}
</style>
