<template>
	<view class="">
		<view class="backTitleBar-wrapper colCent borderBox">
			<view class="fixedBox">
				<view class="common_header" style="height: 44px;">
					<view class="define">
						<view class="define_left_slot" @click="goBackBtnClick">
							<view class="">
								<!-- <u-icon name="arrow-left" color="#fff" size="32"></u-icon> -->
							</view>
						</view>
						<view class="define_center_slot">
							<view class="">
								<text class="title"
									style="font-size: 16px;color: #333333;font-weight: bold;">{{navTitle}}</text>
							</view>
						</view>
						<view class="define_right_slot">
							<view class="">
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="placeBox">
				<view class="topbarbox">

				</view>
				<view class="placeemptbox" style="height: 45px;">

				</view>
			</view>

		</view>
		<view class="funList">
			<view class="widely">
				<view class="widely_item">
					<view class="item" v-for="(item,index) in comFunList" :key="index" @click="comFunListClick(item)"
						:style="index === 6 ? 'margin-bottom: 0px;' : ''">
						<view class="" style="display: flex;align-items: center;">
							<view class="">
								<image :src="item.image" mode="" class="icon"></image>
							</view>
							<view class="">
								<text class="name"
									style="font-size: 14px;color: #414655;font-weight: 700;">{{item.name}}</text>
							</view>
						</view>

						<u-icon name="arrow-right" color="#aaaaaa"></u-icon>
					</view>
				</view>
			</view>
			<!-- 	<view class="system">
				<text class="title">{{$t('func.system')}}</text>
				<view class="widely_item">
					<view class="item" v-for="(item,index) in sysFunList" :key="index"
						@click="comsysFunListClick(item)">
						<image :src="item.image" mode="" class="icon"></image>
						<text class="name">{{item.name}}</text>
					</view>
				</view>
			</view>
			 -->

		</view>
		<view class="funList" style="margin-top: 10px;margin-bottom:20px;">
			<view class="widely">
				<view class="widely_item">
					<view class="item" v-for="(item,index) in sysFunList" :key="index" @click="comsysFunListClick(item)"
						:style="index === 3 ? 'margin-bottom: 0px;' : ''">
						<view class="" style="display: flex;align-items: center;">
							<view class="">
								<image :src="item.image" mode="" class="icon"></image>
							</view>
							<view class="">
								<text class="name"
									style="font-size: 14px;color: #414655;font-weight: 700;">{{item.name}}</text>
							</view>
						</view>

						<u-icon name="arrow-right" color="#aaaaaa"></u-icon>
					</view>
				</view>
			</view>
			<!-- 	<view class="system">
				<text class="title">{{$t('func.system')}}</text>
				<view class="widely_item">
					<view class="item" v-for="(item,index) in sysFunList" :key="index"
						@click="comsysFunListClick(item)">
						<image :src="item.image" mode="" class="icon"></image>
						<text class="name">{{item.name}}</text>
					</view>
				</view>
			</view>
			 -->

		</view>
	</view>

</template>

<script>
	import {
		appUrlReq,
	} from '../../api/index.js'
	import {
		myMixin,
	} from '@/util/mixins.js'
	export default {
		mixins: [myMixin],
		data() {
			return {
				navTitle: this.$t('tabar.funlist'),
				comFunList: [],
				sysFunList: [],
			}
		},
		onReady() {
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#1f252f'
			})
		},
		onShow() {
			// 初始化语言
			this.initLang()

			// 获取app下载地址
			this.getAppDownUrlData()
		},
		methods: {

			initLang() { //初始化语言

				let langStr = uni.getStorageSync('ft_lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr

				uni.setNavigationBarTitle({
					title: this.$t('tabar.funlist')
				})

				uni.setTabBarItem({
					index: 0,
					text: this.$t('tabar.home')
				})
				uni.setTabBarItem({
					index: 1,
					text: this.$t('tabar.competition')
				})
				uni.setTabBarItem({
					index: 2,
					text: this.$t('tabar.funlist')
				})
				uni.setTabBarItem({
					index: 3,
					text: this.$t('tabar.bet')
				})
				uni.setTabBarItem({
					index: 4,
					text: this.$t('tabar.mine')
				})



				this.comFunList = [{
					id: 1,
					name: this.$t('func.commonly.bet.record'),
					image: '../../static/images/bet_record.png'
				}, {
					id: 2,
					name: this.$t('func.commonly.match.list'),
					image: '../../static/images/match_list.png'
				}, {
					id: 3,
					name: this.$t('func.commonly.match.result'),
					image: '../../static/images/match_find.png'
				}, {
					id: 7,
					name: this.$t('user.report.manage.list.rebate.center.text'),
					image: '../../static/images/fanli.png'
				}, {
					id: 4,
					name: this.$t('func.commonly.agent.center'),
					image: '../../static/images/agent.png'
				}, {
					id: 5,
					name: this.$t('func.commonly.account.change'),
					image: '../../static/images/hisotry.png'
				}, {
					id: 6,
					name: this.$t('func.commonly.trading'),
					image: '../../static/images/trade.png'
				}]

				this.sysFunList = [{
					id: 1,
					name: this.$t('func.system.notice.center'),
					image: '../../static/images/message.png'
				}, {
					id: 2,
					name: this.$t('func.system.app.download'),
					image: '../../static/images/app_fun.png'
				}, {
					id: 3,
					name: this.$t('func.system.rule.explain'),
					image: '../../static/images/rule.png'
				}, {
					id: 4,
					name: this.$t('func.system.server'),
					image: '../../static/images/service_func.png'
				}]
				// , {
				// 	id: 5,
				// 	name: this.$t('func.system.active.center'),
				// 	image: '../../static/images/artivity.svg'
				// }

			},
			comFunListClick(item) {
				if (item.id === 1) {
					uni.navigateTo({
						url: '/pages/user/orderCenter',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (item.id === 2) {
					uni.switchTab({
						url: '/pages/match/match_list',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (item.id === 3) {
					uni.navigateTo({
						url: '/pages/match/match_history',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (item.id === 4) {
					uni.navigateTo({
						url: '/pages/user/statistics',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (item.id === 5) {
					uni.navigateTo({
						url: '/pages/user/Report/accountChange',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (item.id === 6) {
					uni.switchTab({
						url: '/pages/user/order-list',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (item.id === 7) {
					uni.navigateTo({
						url: '/pages/user/rebateCenter',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				}
			},
			comsysFunListClick(item) {
				if (item.id === 1) {
					uni.navigateTo({
						url: '/pages/list/notice_list',
						success: (res) => {
							// 通过eventChannel向被打开页面传送数据	
							uni.setStorageSync('queryNoticListUrlFrom', 'func');
							res.eventChannel.emit('userNoticeClick', {
								from: 'func'
							})
						},
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (item.id === 2) {
					if (this.downUrl) {
						window.location.href = this.downUrl
					}
				} else if (item.id === 3) {

				} else if (item.id === 4) {
					uni.navigateTo({
						url: '/pages/customer/index',
						success: (res) => {
							// 通过eventChannel向被打开页面传送数据	
							uni.setStorageSync('querySeverCustomUrlFrom', 'func');
							res.eventChannel.emit('querySeverCustomUrlFrom', {
								from: 'func'
							})
						},
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				}
			},

			async getAppDownUrlData() {
				let currDevInfo = uni.getSystemInfoSync()
				// if (currDevInfo.osName && currDevInfo.platform === 'android')
				if (currDevInfo.platform && currDevInfo.platform === 'ios') {
					this.currDevOsNum = 1
				} else {
					this.currDevOsNum = 0
				}

				let resR = await appUrlReq()
				// console.log("resR", resR.data);
				if (resR.code === 200) {
					if (resR.data && resR.data.length !== 0) {
						let urlArr = resR.data
						urlArr.forEach((item, index) => {
							if (item.appType === this.currDevOsNum) {
								this.downUrl = item.appUrl
							}
						})
					}

				}

				// 
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f8f8f8;
		font-size: 14px;
	}

	.backTitleBar-wrapper {
		.fixedBox {
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;
			background-color: #fff;

			.common_header {
				// padding-top: 7px;
				// padding-bottom: 7px;
				// padding-left: 15px;
				// padding-right: 15px;
				padding: 7px 15px;

				.define {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 100%;
				}
			}
		}
	}

	.funList {
		background: #fff;
		padding: 0 15px;
		margin-top: 5px;
		border-radius: 6px;

		.line {
			width: 100%;
			height: 1px;
			background-color: #000;
			margin-top: 15px;
			margin-bottom: 15px;
			box-shadow: 0px 1px 0.5px #ffffff1a;
		}
	}

	.widely,
	.system {
		// padding: 20px 0 0;

		.title {
			color: #fff;
			font-size: 16px;
		}

		.widely_item {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			padding-top: 5px;

			.item {
				width: 100%;
				display: flex;
				flex-direction: row;
				margin: 0 0 10px 0;
				align-items: center;
				justify-content: space-between;
				padding-bottom: 5px;
				border-bottom: 1px solid #3322330a;

				.icon {
					width: 30px;
					height: 30px;
					margin: 0 auto;
					vertical-align: middle;
				}

				.name {
					color: #868b9a;
					text-align: center;
					padding-left: 10px;
				}
			}
		}
	}

	.system {
		padding: 20px 0 0;
	}
</style>
