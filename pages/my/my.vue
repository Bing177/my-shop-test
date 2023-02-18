<template>
	<view>
		<!-- 用户未登录 -->
		<my-login v-if="!token"></my-login>
		<!-- 用户登录 -->
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import badgeMixin from '@/mixins/tabbar-badge.js'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {

			};
		},
		computed: {
			...mapState('user', ['token'])
		},
		mixins: [badgeMixin]
	}
</script>

<style lang="scss">

</style>
