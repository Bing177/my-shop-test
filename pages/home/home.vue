<template>
	<view>
		<!-- 自定义组件：搜索框 -->
		<my-search @click="goSearch"></my-search>
		<!-- 轮播图 -->
		<swiper :autoplay="true" :indicator-dots="true" :circular="true" :interval="3300">
			<swiper-item v-for="s of swiperList" :key="s.goods_id">
				<navigator class="swpier-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${s.goods_id}`">
					<image :src="s.image_src" mode="widthFix"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(n,i) of navList" :key="i" @click="navClickHandler(n)">
				<image :src="n.image_src" class="nav-image"></image>
			</view>
		</view>
		<!-- 楼层 -->
		<view class="floor-list">
			<!-- item项 -->
			<view class="floor-item" v-for="(f,i) of floorList" :key="i">
				<!-- 标题 -->
				<image :src="f.floor_title.image_src" class="floor-title"></image>
				<!-- 图片 -->
				<view class="floor-img-box">
					<!-- 左侧大图片 -->
					<navigator class="left-img-box" :url="f.product_list[0].url">
						<image :src="f.product_list[0].image_src" :style="{width:f.product_list[0].image_width + 'rpx'}"
							mode="widthFix">
						</image>
					</navigator>
					<!-- 右侧小图片 -->
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(f2,i2) in f.product_list" :key="i2" v-if="i2"
							:url="f2.url">
							<image :src="f2.image_src" mode="widthFix" :style="{width:f2.image_width + 'rpx'}"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//轮播图数据
				swiperList: [],
				// 分类导航数组
				navList: [],
				// 楼层的数据
				floorList: []
			};
		},
		methods: {
			async getSwiperList() {
				try {
					const {
						data: res
					} = await uni.$http.get('/api/public/v1/home/swiperdata')
					if (res.meta.status !== 200) return uni.$showMsg()
					// uni.$showMsg('数据请求成功')
					this.swiperList = res.message
				} catch (e) {
					console.log(e.message);
				}
			},
			async getNavList() {
				try {
					const {
						data: res
					} = await uni.$http.get('/api/public/v1/home/catitems')
					if (res.meta.status !== 200) return uni.$showMsg()
					this.navList = res.message
				} catch (e) {
					console.log(e.message);
				}
			},
			navClickHandler(item) {
				if (item.name === '分类')
					uni.switchTab({
						url: '/pages/category/category'
					})
			},
			async getFloorList() {
				try {
					const {
						data: res
					} = await uni.$http.get('/api/public/v1/home/floordata')
					if (res.meta.status !== 200) return uni.$showMsg()
					// 对数据处理
					res.message.forEach(item => {
						item.product_list.forEach(goods => {
							goods.url = '/subpkg/goods_list/goods_list?' + goods.navigator_url.split(
								'?')[1]
						})
					})
					this.floorList = res.message
				} catch (e) {
					console.log(e.message);
				}
			},
			goSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swpier-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 30rpx 0;

		.nav-image {
			width: 140rpx;
			height: 140rpx;
		}
	}

	.floor-title {
		height: 60rpx;
		width: 100%;
		display: flex;
	}

	.floor-img-box {
		display: flex;
		padding-left: 10rpx;

		.right-img-box {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	}
</style>
