<template>
	<view class="my-search-container" :style="{'background-color':bgc}" @click="goSearchHandler">
		<view class="my-search-box" :style="{'border-radius':radius + 'px'}">
			<uni-icons type="search" size="18"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		props: {
			//背景颜色
			bgc: {
				type: String,
				default: '#c00000'
			},
			//圆角尺寸
			radius: {
				type: Number,
				default: 12
			}
		},
		data() {
			return {

			};
		},
		methods: {
			goSearchHandler() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container {
		display: flex;
		position: sticky;
		top: 0;
		height: 100rpx;
		border-top: 1px solid #cfcfcf;
		align-items: center;
		padding: 0 20rpx;
		z-index: 999;

		.my-search-box {
			display: flex;
			height: 72rpx;
			width: 100%;
			justify-content: center;
			align-items: center;
			background-color: #fff;
			// border-radius: 18rpx;

			.placeholder {
				font-size: 15px;
				padding-left: 10rpx;
			}
		}
	}
</style>
