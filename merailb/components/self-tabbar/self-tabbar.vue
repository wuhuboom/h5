<template>
	<view class="tabbar-container">
		<block>
			<view class="tabbar-item" v-for="(item, index) in tabbarList" :key="item.id"
				:class="[item.centerItem ? ' center-item' : '']" @click="changeItem(item)">
				<view class="item-top" v-if="item.id !== 2">
					<image :src="currentItem == item.id ? item.selectIcon : item.icon"
						style="width: 25px;height: 25px;">
					</image>
				</view>
				<image :src="currentItem == item.id ? item.selectIcon : item.icon"
					:class="item.id === 2 ? 'middleimg' :''" v-if="item.id === 2">
				</image>
				<view class="item-bottom" :class="[currentItem == item.id ? 'item-active' : '']">
					<text>{{ item.text }}</text>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props: {
			currentPage: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				currentItem: 0,
				tabbarList: [{
						id: 0,
						path: '/pages/home/index',
						icon: '/static/tabbar/nav01.png',
						selectIcon: '/static/tabbar/nav01-active.png',
						text: this.$t('tabar.home'),
						centerItem: false
					},
					{
						id: 1,
						path: '/pages/recharge/index',
						icon: '/static/tabbar/chonzhi.png',
						selectIcon: '/static/tabbar/chonzhi-active.png',
						text: this.$t('tabar.recharge'),
						centerItem: false
					},
					{
						id: 2,
						path: '/pages/get/index',
						icon: '/static/tabbar/sd.png',
						selectIcon: '/static/tabbar/sd.png',
						text: this.$t('tabar.get'),
						centerItem: true
					},
					{
						id: 3,
						path: '/pages/order/index',
						icon: '/static/tabbar/nav04.png',
						selectIcon: '/static/tabbar/nav04-active.png',
						text: this.$t('tabar.task'),
						centerItem: false
					},
					{
						id: 4,
						path: '/pages/mine/index',
						icon: '/static/tabbar/nav05.png',
						selectIcon: '/static/tabbar/nav05-active.png',
						text: this.$t('tabar.mine'),
						centerItem: false
					}
				]
			};
		},
		created() {
			this.childMethods()
		},
		activated() {
			this.childMethods()
		},
		mounted() {
			this.currentItem = this.currentPage;
			uni.hideTabBar();
		},
		methods: {
			changeItem(item) {
				let _this = this;
				//_this.currentItem = item.id;
				uni.switchTab({
					url: item.path,
				});
			},
			childMethods() {
				let langStr = uni.getStorageSync('merailb_lang')
				let langUpperStr = langStr.toUpperCase()
				this.$i18n.locale = langStr

				this.tabbarList = [{
						id: 0,
						path: '/pages/home/index',
						icon: '/static/tabbar/nav01.png',
						selectIcon: '/static/tabbar/nav01-active.png',
						text: this.$t('tabar.home'),
						centerItem: false
					},
					{
						id: 1,
						path: '/pages/recharge/index',
						icon: '/static/tabbar/chonzhi.png',
						selectIcon: '/static/tabbar/chonzhi-active.png',
						text: this.$t('tabar.recharge'),
						centerItem: false
					},
					{
						id: 2,
						path: '/pages/get/index',
						icon: '/static/tabbar/sd.png',
						selectIcon: '/static/tabbar/sd.png',
						text: this.$t('tabar.get'),
						centerItem: true
					},
					{
						id: 3,
						path: '/pages/order/index',
						icon: '/static/tabbar/nav04.png',
						selectIcon: '/static/tabbar/nav04-active.png',
						text: this.$t('tabar.task'),
						centerItem: false
					},
					{
						id: 4,
						path: '/pages/mine/index',
						icon: '/static/tabbar/nav05.png',
						selectIcon: '/static/tabbar/nav05-active.png',
						text: this.$t('tabar.mine'),
						centerItem: false
					}
				]
			}
		}
	};
</script>
<style scoped>
	view {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	.tabbar-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 120rpx;
		background: #fff;
		/* box-shadow: 0 0 5px #999; */
		box-shadow: -1px -2px 4px rgb(0 0 0 / 8%);
		border-radius: 10px 10px 0 0;
		display: flex;
		align-items: center;
		padding: 5rpx 0;
		z-index: 10;
		color: #999999;
	}

	.tabbar-container .tabbar-item {
		width: 20%;
		height: 100rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.tabbar-container .item-active {
		color: #f00;
	}

	.tabbar-container .center-item {
		display: block;
		position: relative;
	}


	.tabbar-container .tabbar-item .item-top {
		width: 70rpx;
		height: 70rpx;
		padding: 10rpx;
	}

	.tabbar-container .center-item .item-top {
		flex-shrink: 0;
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		top: -50rpx;
		left: calc(50% - 50rpx);
		/* border-radius: 50%;
		box-shadow: 0 0 5px #999;
		background-color: #ffffff; */
	}

	.middleimg {
		position: absolute;
		top: -50rpx;
		left: calc(50% - 50rpx);
		width: 50px;
		height: 50px
	}

	.tabbar-container .tabbar-item .item-top image {
		width: 100%;
		height: 100%;

	}

	.tabbar-container .tabbar-item .item-bottom {
		font-size: 28rpx;
		width: 100%;
	}

	.tabbar-container .center-item .item-bottom {
		position: absolute;
		bottom: 5rpx;
	}
</style>
