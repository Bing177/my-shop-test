<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-box">
			<uni-search-bar @confirm="search" bgColor="#efefef" cancelButton="none" :raduis="100" v-model="keyword"
				@input="input"></uni-search-bar>
		</view>
		<!-- 搜索历史列表 -->
		<view class="history-box" v-if="!searchResults.length">
			<!-- 标题 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons v-if="showClear" type="trash" size="30" style="float: right;" @click="clear"></uni-icons>
				<text v-else @click="clearAll" style="float: right;">全部清除</text>
				<uni-icons v-if="showDel" type="checkmarkempty" size="30" style="float: right;" @click="complete">
				</uni-icons>
			</view>
			<!-- 列表 -->
			<view class="history-list" v-if="showList">
				<view class="history-item" v-for="(item,i) of historyList" :key="item.id">
					<uni-tag class="tag" :text="item.key" :inverted="true" @click="tag(item)"></uni-tag>
					<!-- 遮罩层 -->
					<view class="mask" v-if="showDel">
						<uni-icons type="clear" size="20" color="#000" @click="deleteHistory(item.id)"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<!-- 搜索建议列表 -->
		<view class="suggest-list" v-else>
			<view class="suggest-item" v-for="(item,i) in searchResults" :key="i" @click="goDetail(item.goods_id)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				n: 0,
				keyword: '', //输入搜索关键词
				savekeyword: '', //存储搜索关键字
				timer: null,
				searchResults: [], //搜索结果返回列表
				historyList: [], //搜索历史纪录
				showDel: false, //是否显示删除遮罩
				showList: true,
				showClear: true, //是否展示全部清除
			};
		},
		methods: {
			generateId() {
				const t = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
					't', 'u', 'v', 'w', 'x', 'y', 'z'
				]
				const i = t[Math.floor(Math.random() * 26)]
				const r = Math.random().toString().substring(2, 8)
				return i + r
			},
			input(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.keyword = e.trim()
					this.getSearchList()
					// this.getSearch()
				}, 1500)

			},
			async getSearchList() {
				if (!this.keyword.trim()) {
					this.searchResults = [...this.searchResults]
					return
				}
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/qsearch', {
					query: this.keyword
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				if (!res.message.length) return uni.$showMsg('搜索内容为空!')
				this.searchResults = res.message
			},
			search() {
				if (!this.keyword) return uni.$showMsg('搜索内容不能为空!')
				this.getSearchList()
				this.getSearch()
			},
			getSearch() {
				if (!this.keyword.trim()) return
				const id = this.generateId()
				const search = {
					id,
					key: this.keyword.trim()
				}
				this.historyList.unshift(search)
				this.historyList = this.myDelDuplicates(this.historyList, 'key')
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			goDetail(goods_id) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?id=' + goods_id
				})
			},
			tag(item) {
				// console.log('tag');
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?id=' + item.id + '&kw=' + item.key
				})
			},
			clear() {
				this.showDel = true
				this.showClear = false
			},
			clearAll() {
				this.historyList = []
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			deleteHistory(id) {
				console.log('已删除', id);
				this.historyList = this.historyList.filter(v => {
					if (v.id !== id)
						return v
				})
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
				console.log(this.historyList);
			},
			complete() {
				this.showDel = false
				this.showClear = true
			},
			// 数组对象去重
			myDelDuplicates(targetArr, targetKey) {
				let t = {}
				targetArr = targetArr.reduce((item, next) => {
					t[next[targetKey]] ? '' : t[next[targetKey]] = true && item.push(next)
					return item
				}, [])
				return targetArr
			}
		},
		onLoad() {
			//动态获取历史记录盒子信息
			// wx.createSelectorQuery()
			// 	.selectAll('.tag')
			// 	.boundingClientRect(rect => {
			// 		this.historyWHList = rect
			// 	}).exec()
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		onShow() {
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.history-box {

		.history-title {
			height: 80rpx;
			margin: 0 auto;
			padding: 10rpx 20rpx;
			line-height: 80rpx;
			border-bottom: 1px solid #ccc;
		}

		.history-list {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			padding: 10rpx;

			.history-item {
				position: relative;
				margin: 20rpx 10rpx;
				border-radius: 3px;

				.tag {}

				.mask {
					position: absolute;
					display: flex;
					justify-content: center;
					width: 100%;
					background-color: rgba(0, 0, 0, .7);
					border-radius: 3px;
					margin-top: -19px;

					.uni-icons {}
				}
			}
		}
	}

	.suggest-list {
		padding: 0 10rpx;

		.suggest-item {
			font-size: 32rpx;
			padding-bottom: 13px 0;
			border-bottom: 1px solid #efefef;
			display: flex;
			height: 80rpx;
			align-items: center;
			justify-content: space-between;
			box-shadow: 1px 1px 5px #ccc;
		}

		.goods-name {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-right: 3px;
		}
	}
</style>
