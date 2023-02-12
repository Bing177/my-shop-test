<template>
	<view v-if="goods_info.goods_name" class="goods-detail-container">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in goods_info.pics " :key="i">
				<image :src="item.pics_big" @click="preview(i)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="goods-price">￥{{goods_info.goods_price}}</view>
			<!-- 信息主体 -->
			<view class="goods-info-body">
				<!-- 商品名称 -->
				<view class="goods-name">{{goods_info.goods_name}}</view>
				<!-- 收藏 -->
				<view class="goods-favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="goods-freight">快递：免运费</view>
		</view>
		<rich-text :nodes="goods_info.goods_introduce || undefined"></rich-text>
		<!-- 商品导航组件 -->
		<view class="goods-nav">
			<view v-for="(o,i) of options" :key="i" :class="o.class">
				<uni-icons class="uni-icons" :type="o.icon" size="20" :data-info="o.info"></uni-icons>
				<text>{{o.text}}</text>
			</view>
			<!-- 按钮 -->
			<view class="btn">
				<button class="left" size="24" @click="toCart">加入购物车</button>
				<button class="right" size="24" @click="toPurchase">立即购买</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 商品详情对象
				goods_info: {},
				// 左侧按钮
				options: [{
						class: 'service',
						icon: 'headphones',
						text: '客服',
						// info: 0
					},
					{
						class: 'store',
						icon: 'shop',
						text: '店铺',
						info: 2
					},
					{
						class: 'cart',
						icon: 'cart',
						text: '购物车',
						info: 3
					}
				],
				// 右侧按钮
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		methods: {
			async getGoodsDetail(goodsid) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id: goodsid
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="display:block;"')
				this.goods_info = res.message
			},
			preview(i) {
				uni.previewImage({
					// 默认显示图片索引
					current: i,
					// 所有图片地址的数组
					urls: this.goods_info.pics.map(x => x.pics_big)
				})
			},
			toCart(e) {
				uni.switchTab({
					url: '/pages/cart/cart'
				})
			}
		},
		onLoad(options) {
			const goods_id = options.goods_id
			this.getGoodsDetail(goods_id)
		}
	}
</script>

<style lang="scss">
	.goods-detail-container {
		padding-bottom: 60px;

		swiper {
			height: 720rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.goods-info-box {
			padding: 10px;
			padding-right: 0;

			.goods-price {
				color: #c00000;
				font-size: 18px;
				margin: 10px 0;
			}

			.goods-info-body {
				display: flex;
				justify-content: space-around;

				.goods-name {
					font-size: 13px;
					margin-right: 10px;
				}

				.goods-favi {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					border-left: 1px solid #efefef;
					width: 120px;
					font-size: 12px;
					color: lightgray;
				}
			}

			.goods-freight {
				font-size: 12px;
				color: gray;
				margin: 10px 0;
			}
		}

		.goods-nav {
			display: flex;
			justify-content: space-around;
			align-items: center;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 60px;
			background-color: #fff;

			.service,
			.store,
			.cart {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;

				text {
					font-size: 12px;
					align-items: center;
				}
			}

			.service {}

			.store,
			.cart {
				position: relative;

				.uni-icons {
					&::after {
						content: attr(data-info);
						display: block;
						position: absolute;
						top: -5px;
						left: 55%;
						width: 14px;
						height: 14px;
						line-height: 14px;
						font-size: 12px;
						text-align: center;
						border-radius: 50%;
						background-color: #ff0000;
						color: #fff;
					}
				}
			}

			.btn {
				display: flex;

				.left,
				.right {
					width: 100px;
					color: #fff;
					font-size: 14px;
				}

				.left {
					background-color: #ff0000;
					border-top-left-radius: 18px;
					border-top-right-radius: 0;
					border-bottom-left-radius: 18px;
					border-bottom-right-radius: 0;
				}

				.right {
					background-color: #ffaa00;
					border-top-left-radius: 0;
					border-top-right-radius: 18px;
					border-bottom-left-radius: 0;
					border-bottom-right-radius: 18px;
				}
			}
		}
	}
</style>
