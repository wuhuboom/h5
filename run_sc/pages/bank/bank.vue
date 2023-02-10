<template>
	<view class="main">
		<u-navbar :is-back="true" :border-bottom="false" z-index="1200" :title-bold="true" back-icon-color="#000000E6"
			title-color="#000000E6" :title="navTitle" :custom-back="goBackBtnClick">
		</u-navbar>
		<u-cell-group border>
			<u-cell-item center :arrow="false" :border-bottom="true" index="1" @click="uCellEventClick(1)">
				<image src="../../static/images/icon1.png" mode="" slot="icon"
					style="vertical-align: middle;width: 19px; height: 18px;margin-right:4px;">
				</image>

				<view class="content_cell" slot="title">
					{{$t('account.page.cell.bindupi1.text')}}
				</view>


			</u-cell-item>
			<view class="u-line">

			</view>
			<u-cell-item center :arrow="false" :border-bottom="true" index="2" @click="uCellEventClick(2)">
				<image src="../../static/images/icon1.png" mode="" slot="icon"
					style="vertical-align: middle;width: 19px; height: 18px;margin-right:4px;">
				</image>

				<view class="content_cell" slot="title">
					{{$t('account.page.cell.bindupi2.text')}}
				</view>


			</u-cell-item>
			<view class="u-line">

			</view>
			<u-cell-item center :arrow="false" :border-bottom="true" index="3" @click="uCellEventClick(3)">
				<image src="../../static/images/icon1.png" mode="" slot="icon"
					style="vertical-align: middle;width: 19px; height: 18px;margin-right:4px;">
				</image>

				<view class="content_cell" slot="title">
					{{$t('account.page.cell.bindupi3.text')}}
				</view>


			</u-cell-item>
			<view class="u-line">

			</view>
		</u-cell-group>
		<u-toast ref="uToast" />

	</view>
</template>

<script>
	// import {
	// 	getAnnouncementReq,
	// } from '../../api/index.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	export default {
		data() {
			return {
				navTitle: '',
				backgroundOBj: {
					"background": "transparent"
				},
				scrollTop: 0,

				urlFromStr: null,
			}
		},
		mixins: [myMixin],
		onShow() {

			// 初始化语言
			this.initLang()

			// 初次加载数据
			this.initData()


			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('userNoticeClick', async (data) => {
				this.urlFromStr = data.from
			})


		},
		methods: {
			initLang() { //初始化语言


				let langStr = uni.getStorageSync('run_lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr



			},
			initData() {

				// this.localLoginToken = this.$store.state.userInfo.token
				// this.localLoginToken = uni.getStorageSync('footballToken');

				// 设置文字
				this.navTitle = this.$t('user.list.cell.my.account.text')



			},


			goBackBtnClick() {
				uni.switchTab({
					url: '/pages/user/user',
					animationType: 'pop-in',
					animationDuration: 200
				})

				// const queryNoticListUrlFrom = uni.getStorageSync('queryNoticListUrlFrom') || 'other'
				// // console.log("queryMatchContentItemUrlFrom",queryMatchContentItemUrlFrom);
				// if (!this.matchContent_Bool) {
				// 	this.urlFromStr = queryNoticListUrlFrom
				// }
				// if (this.urlFromStr === 'user') {
				// 	uni.switchTab({
				// 		url: '/pages/user/user',
				// 		animationType: 'pop-in',
				// 		animationDuration: 200
				// 	})
				// } else if (this.urlFromStr === 'home') {
				// 	uni.switchTab({
				// 		url: '/pages/home/index',
				// 		animationType: 'pop-in',
				// 		animationDuration: 200
				// 	})
				// }


			},
			uCellEventClick(index) {
				if (index == 1) {
					uni.navigateTo({
						url: '/pages/bank/bank_run',
						animationType: 'pop-in',
						animationDuration: 200
					})
				} else if (index == 2) {
					uni.navigateTo({
						url: '/pages/bank/bank_withdraw',
						animationType: 'pop-in',
						animationDuration: 200
					})
				} else if (index == 3) {
					uni.navigateTo({
						url: '/pages/bank/bank_usdt',
						animationType: 'pop-in',
						animationDuration: 200
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		background-color: #fff;
	}

	.main {
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;

		.content_cell {
			font-size: 14px;
			color: #303133;
			margin-top: 2px;
		}

		.u-line {
			margin: 0px;
			border-bottom: 1px solid rgb(214, 215, 217);
			width: 100%;
			transform: scaleY(0.5);
			border-top-color: rgb(214, 215, 217);
			border-right-color: rgb(214, 215, 217);
			border-left-color: rgb(214, 215, 217);
		}
	}
</style>
