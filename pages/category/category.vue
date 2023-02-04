<template>
	<view>
		<view class="scroll-view-container">
			<!-- 左侧滑动区 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height:wh+'px'}">
				<block v-for="(item,i) in cateList" :key="i">
					<view :class="['left-scroll-view-item',i===active?'active':'']" @click="activeChange(i)">
						{{item.cat_name}}
					</view>
				</block>
			</scroll-view>
			<!-- 右侧滑动区 -->
			<scroll-view class="right-scroll-view" scroll-y :style="{height:wh+'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2,i2) in cateLevel2" :key="i2">
					<view class="cate-lv2-title">
						/ {{item2.cat_name}} /
					</view>
					<!-- 动态渲染三级分类 -->
					<view class="cate-lv3-list">
						<!-- Item项 -->
						<view class="cate-lv3-item" v-for="(item3,i3) of item2.children" :key="i3"
							@click="gotoGoodsList(item3)">
							<!-- 图片 -->
							<image :src="item3.cat_icon.replace('dev','web')"></image>
							<!-- 文本 -->
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 滚动条距顶部距离
				scrollTop: 0,
				// 当前设备可用高度
				wh: 0,
				// 分类数据
				cateList: [],
				//当前索引，默认0
				active: 0,
				// 二级分类
				cateLevel2: []
			};
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight
			this.getCateList()
		},
		methods: {
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message
				this.cateLevel2 = res.message[0].children
			},
			activeChange(i) {
				this.active = i
				this.cateLevel2 = this.cateList[i].children
				this.scrollTop = this.scrollTop ? 0 : 1
			},
			gotoGoodsList(item3) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id

				})

			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;
		flex-direction: row;

		.left-scroll-view {
			flex: 1;

			.left-scroll-view-item {
				background-color: #F5F5F5;
				line-height: 120rpx;
				text-align: center;
				font-size: 12px;

				&.active {
					position: relative;
					background-color: #fff;

					&::before {
						content: "";
						display: block;
						position: absolute;
						width: 6rpx;
						height: 60rpx;
						top: 50%;
						transform: translateY(-50%);
						left: 10rpx;
						background-color: #c00000;
					}
				}
			}
		}

		.right-scroll-view {
			flex: 4;

			.cate-lv2-title {
				font-size: 12px;
				font-weight: bold;
				text-align: center;
				padding: 15px 0;
			}

			.cate-lv3-list {
				display: flex;
				flex-wrap: wrap;

				.cate-lv3-item {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					width: 33.33%;
					align-items: center;
					margin-bottom: 10rpx;

					image {
						width: 120rpx;
						height: 120rpx;
					}

					text {
						font-size: 12px;

					}
				}
			}
		}
	}
</style>
