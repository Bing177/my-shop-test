<template>
	<view>
		<view class="goods-list">
			<view v-for="(goods,idx) of goodsList" :key="idx" @click="toDetail(goods)">
				<my-goods :goods="goods" />
			</view>
		</view>
	</view>
</template>

<script>
	import mygoods from '../../components/my-goods/my-goods'
	export default {
		components: {
			'my-goods': mygoods
		},
		data() {
			return {
				queryObj: {
					query: '', //查询关键字
					cid: '', //商品分类id
					pagenum: 1, //页码值
					pagesize: 10, //每页显示多少条数据
				},
				goodsList: [],
				total: 0,
				isLoading: false
			};
		},
		methods: {
			toDetail(goods) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
				})
			},
			async getGoodsList(cb) {
				this.isLoading = true
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				this.isLoading = false
				// 数据请求完毕时，立即执行回调cb
				cb && cb()
				if (res.meta.status !== 200) return uni.$showMsg()
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
			}
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getGoodsList()
		},
		onReachBottom() {
			if (this.isLoading) return
			// 页码值+1
			this.queryObj.pagenum += 1
			// 重新获取列表数据
			this.getGoodsList()
			if (this.goodsList.length === this.total) return uni.$showMsg('数据已全部加载')
		},
		onPullDownRefresh() {
			// 重置关键数据
			this.queryObj.pagenum = 1
			this.total = 0
			this.isLoading = false
			this.goodsList = []

			// 重新发请求
			this.getGoodsList(() => uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">

</style>
