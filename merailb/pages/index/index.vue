<template>
	<view>
		<basics v-if="PageCur=='pages/index/index'"></basics>
		<get v-if="PageCur=='pages/get/index'"></get>


		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-page="pages/index/index">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/nav01' + [PageCur=='pages/index/index'?'-active':''] + '.png'">
					</image>
				</view>
				<view :class="PageCur=='pages/index/index'?'text-green':'text-gray'">元素</view>
			</view>
			<view class="action" @click="NavChange" data-page="pages/recharge/index">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/chonzhi' + [PageCur == 'pages/recharge/index'?'-active':''] + '.png'">
					</image>
				</view>
				<view :class="PageCur=='pages/recharge/index'?'text-green':'text-gray'">组件</view>
			</view>
			<view class="action" @click="NavChange" data-page="pages/get/index">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/sd.png'" class="get"></image>
				</view>
				<view :class="PageCur=='pages/get/index'?'text-green':'text-gray'">组件</view>
			</view>
			<view class="action" @click="NavChange" data-page="pages/order/index">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/nav04' + [PageCur == 'pages/order/index'?'-active':''] + '.png'">
					</image>
				</view>
				<view :class="PageCur=='pages/order/index'?'text-green':'text-gray'">组件</view>
			</view>
			<view class="action" @click="NavChange" data-page="pages/mine/index">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/nav05' + [PageCur == 'pages/mine/index'?'-active':''] + '.png'">
					</image>
				</view>
				<view :class="PageCur=='pages/mine/index'?'text-green':'text-gray'">扩展</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				PageCur: 'pages/index/index'
			}
		},
		methods: {
			NavChange: function(e) {
				// console.log("111", e.currentTarget.dataset.page);
				this.PageCur = e.currentTarget.dataset.page
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabbar {
		position: fixed;
		width: 100%;
		bottom: 0;
		border-radius: 10px 10px 0 0;
		height: 60px;
	}

	.get {
		margin-top: -20px;
		width: 45px !important;
		height: 45px !important;
	}
</style>
