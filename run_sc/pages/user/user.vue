<template>
	<view class="page-layout">
		<view class="back">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
				<view class="main">
					<u-navbar :is-back="false" :background="backgroundOBj" :border-bottom="false" z-index="1200"
						back-icon-color="#fff" title-color="#fff" :title="navTitle">
					</u-navbar>
					<view class="user_box">
						<view class="user_Image">
							<image src="../../static/images/userimg.png" mode="" style="height: 70px;"></image>
						</view>
						<view class="userMain">
							<view class="name">
								<text>{{username}}</text>
							</view>
							<view class="desc">
								{{ $t('home.balance')}}:{{cashPledge}}
							</view>
						</view>
					</view>
					<view class="user_detail">
						<view class="left">
							<view class="col1 u-line-1">
								{{$t('user.page.money.text')}}
								<image src="../../static/images/reload.png" mode="" style="height: 16px;"
									@click="initPlayInfoData"></image>
							</view>
							<view class="col2 u-line-1">
								{{balance}}
							</view>
						</view>
						<view class="right">
							<view class="btn">
								<text style="color: rgb(255, 212, 10);">{{$t('home.recharge')}}</text>
							</view>
							<view class="btn" @click="withdrawBtnClick">
								<text>{{$t('home.withdraw')}}</text>
							</view>
						</view>
					</view>
					<view class="lists">
						<view class="list" v-for="(item,index) in dataUserList" :key="item.id"
							@click="listCellClick(item)">
							<image :src="item.imageIcon" mode="" class="lf" :style="`height:${item.height}px;`">
							</image>
							<view class="txt">{{item.name}}</view>
							<u-icon name="arrow-right" color="#fff"></u-icon>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>



	</view>
</template>

<script>
	import {
		logoutReq,
		getMeReq,
	} from '../../api/index.js'
	import {
		myMixin,
		withdrawMinxi,
		rechargeMinxi
	} from '@/util/mixins.js'
	import wrapListCell from '@/components/wrapListCellView/wrapListCellView.vue'
	export default {
		components: {
			wrapListCell,
		},
		data() {
			return {
				navTitle: this.$t('tabar.mine'),
				backgroundOBj: {
					"background": "transparent"
				},
				scrollTop: 0,
				dataUserList: [],

				username: '',
				balance: 0,
				cashPledge: 0,
				vipNum: 0,
				reateAmount: 0,
				dataUserListCellStyle: 'border-radius: 10px;',
				noticeNum: 0,
				currDevOsNum: null,
				downUrl: "",
				realSymbolName: '',
				realSymbol: '',
			}
		},
		filters: {
			saveTwoStr(value) {
				// console.log("value", value);
				// console.log("val",formatDateToStr(value));
				return value.toFixed(2)
			}
		},
		mixins: [myMixin, withdrawMinxi, rechargeMinxi],
		onShow() {


			// 初始化语言
			this.initLang()

			// //初次获取个人信息数据
			this.initPlayInfoData()

			// // 获取系统通知
			// this.initNoticeData()

			// // 获取app下载地址
			// this.getAppDownUrlData()
		},
		methods: {
			// ...mapMutations(['logout']),
			initLang() { //初始化语言

				let langStr = uni.getStorageSync('run_lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr

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
					text: this.$t('tabar.sportsresults')
				})
				uni.setTabBarItem({
					index: 3,
					text: this.$t('tabar.mine')
				})

				this.dataUserList = [{
					id: 1,
					height: 20,
					imageIcon: '../../static/images/info_l.png',
					name: this.$t('user.list.cell.my.info.text')
				}, {
					id: 2,
					height: 24,
					imageIcon: '../../static/images/account_l.png',
					name: this.$t('user.list.cell.my.account.text')
				}, {
					id: 3,
					height: 30,
					imageIcon: '../../static/images/order_l.png',
					name: this.$t('user.list.cell.recharge.record.text')
				}, {
					id: 4,
					height: 30,
					imageIcon: '../../static/images/order_l.png',
					name: this.$t('user.list.cell.order.record.text')
				}, {
					id: 5,
					height: 26,
					imageIcon: '../../static/images/money_l.png',
					name: this.$t('user.list.cell.fund.record.text')
				}, {
					id: 6,
					height: 26,
					imageIcon: '../../static/images/money_l.png',
					name: this.$t('user.list.cell.order.status.text')
				}, {
					id: 7,
					height: 26,
					imageIcon: '../../static/images/server_l.png',
					name: this.$t('user.list.cell.online.server.text')
				}, {
					id: 8,
					height: 26,
					imageIcon: '../../static/images/agent_l.png',
					name: this.$t('user.list.cell.agent.top.text')
				}, {
					id: 9,
					height: 30,
					imageIcon: '../../static/images/notice_l.png',
					name: this.$t('user.list.cell.sys.notice.text')
				}, {
					id: 10,
					height: 26,
					imageIcon: '../../static/images/logout_l.png',
					name: this.$t('user.list.cell.account.logout.text')
				}]

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
			async initNoticeData() {
				let reqParam = {}
				let langStr = uni.getStorageSync('run_lang')
				// console.log("langStr",langStr);
				if (langStr == "cn") {
					reqParam.lang = "zh"
				} else {
					reqParam.lang = "en"
				}
				let resR = await noticeReq(reqParam, this.localLoginToken)
				if (resR.code === 200) {
					this.noticeNum = 0
					let noticeAllList = resR.data
					if (noticeAllList.length === 0) {

						return false
					}

					noticeAllList.forEach((item, index) => {
						if (item.readStatus === 0) {
							this.noticeNum = this.noticeNum + 1
						}
					})

				}
			},
			async initPlayInfoData() {
				this.balance = 0.00
				this.cashPledge = 0
				let resR = await getMeReq(this.localLoginToken)
				// console.log("resR",resR.data);
				if (resR.code === 200) {
					// console.log("resR",resR.data);
					this.username = resR.result.Username
					this.balance = resR.result.Balance
					this.cashPledge = resR.result.CashPledge
				} else {
					uni.showToast({
						icon: 'none',
						title: resR.msg,

					});
				}
			},
			orderCenterClick() {
				uni.navigateTo({
					url: '/pages/user/orderCenter',
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据	
						uni.setStorageSync('queryOrderCenterUrlFrom', 'user');
						res.eventChannel.emit('eventOrderClick', {
							from: 'user'
						})
					},
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			rwRecordClick() {
				uni.navigateTo({
					url: '/pages/user/withdrawRecord',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			rechargeRecordClick() {
				uni.navigateTo({
					url: '/pages/user/RWrecord',
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据	
						// res.eventChannel.emit('eventOrderClick', {from:'user'})
					},
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			toNoticeClick() {
				uni.navigateTo({
					url: "/pages/list/notice_list",
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据	
						uni.setStorageSync('queryNoticListUrlFrom', 'user');
						res.eventChannel.emit('userNoticeClick', {
							from: 'user'
						})
					},
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			rechargeBtnClick() {
				uni.navigateTo({
					url: "/pages/recharge/index",
					success: (res) => {
						this.save_recharge_from('user')
						// 通过eventChannel向被打开页面传送数据	
						res.eventChannel.emit('rechargeEventClick', {
							from: 'user'
						})
					},
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			withdrawBtnClick() {
				uni.navigateTo({
					url: "/pages/withdraw/index",
					success: (res) => {
						this.save_withdraw_from('user')
						// 通过eventChannel向被打开页面传送数据	
						res.eventChannel.emit('withdrawEventClick', {
							from: 'user'
						})
					},
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			wrapUserListCell_click(item, index) {
				if (index === 0) {
					this.report_management_click()
				} else if (index === 1) {
					this.security_center_click()
				} else if (index === 2) {
					this.help_center_click()
				} else if (index === 3) {
					this.share_center_click()
				} else if (index === 4) {
					this.down_app_click()
				}
			},
			report_management_click() {
				uni.navigateTo({
					url: "/pages/user/report_management",
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			security_center_click() {
				uni.navigateTo({
					url: "/pages/user/securityCenter",
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			help_center_click() {
				uni.navigateTo({
					url: "/pages/user/help/help",
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			share_center_click() {
				uni.navigateTo({
					url: "/pages/refer/share",
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			down_app_click() {
				// console.log("this.downUrl", this.downUrl);
				if (this.downUrl) {
					window.location.href = this.downUrl
				}
			},
			async listCellClick(cell) {
				if (cell.id == 1) {

				} else if (cell.id == 2) {
					uni.navigateTo({
						url: '/pages/bank/bank',
						animationType: 'pop-in',
						animationDuration: 200
					});
				} else if (cell.id == 3) {

				} else if (cell.id == 4) {
					uni.navigateTo({
						url: '/pages/user/orderRecord',
						animationType: 'pop-in',
						animationDuration: 200
					});
				} else if (cell.id == 5) {
					uni.navigateTo({
						url: '/pages/user/accountChange',
						animationType: 'pop-in',
						animationDuration: 200
					});
				} else if (cell.id == 6) {
					uni.navigateTo({
						url: '/pages/user/receOrderSitua',
						animationType: 'pop-in',
						animationDuration: 200
					});
				} else if (cell.id == 7) {
					uni.navigateTo({
						url: '/pages/customer/index',
						animationType: 'pop-in',
						animationDuration: 200
					});
				} else if (cell.id == 8) {

				} else if (cell.id == 9) {
					uni.navigateTo({
						url: '/pages/notice/notice_list',
						animationType: 'pop-in',
						animationDuration: 200
					});
				} else if (cell.id == 10) {
					let resR = await logoutReq(this.localLoginToken)
					// console.log('用户点击确定',resR)
					if (resR.code === 200) {
						this.logout()
						uni.reLaunch({
							url: '/pages/login/login',
							animationType: 'pop-in',
							animationDuration: 200
						});
					}

					// this.$showModal({
					// 	title: '',
					// 	icon: 'warning',
					// 	ceterTitle: this.$t('modal.title'),
					// 	ceterDesc: this.$t('modal.logout.desc'),
					// 	cancelText: this.$t('modal.cancel.text'), //传入空值表示只显示确认按钮，此代码不能省略
					// 	confirmText: this.$t('modal.confirm.text'),
					// 	success: async (res) => {
					// 		if (res.confirm) {

					// 		} else if (res.cancel) { //点击确定无需操作

					// 		}
					// 	}
					// })
				}
			},
			logoutClick() { //退出按钮主动退出功能


			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		display: block;
		height: 100%;
		position: relative;
	}

	.page-layout {
		height: 100%;

		.back {
			position: relative;
			height: 100vh;
			background: url(../../static/images/back.png) no-repeat 0 0;
			background-size: 100% !important;
			// padding-bottom: 250px;

			.scroll-Y {
				height: 100%;

				.user_box {
					margin: 35px 14px 0;
					display: flex;
					align-items: center;

					.user_Image {
						box-sizing: border-box;
						border: 0.5px solid #88a1d0;
						width: 69px;
						height: 69px;
						border-radius: 50%;
						margin-right: 12px;

						image {
							width: 69px;
							height: 69px;
							vertical-align: middle;
							display: block;
							white-space: nowrap;
						}
					}

					.userMain {
						flex: 1;
						overflow: hidden;

						.name {
							display: flex;
							align-items: center;

							text {
								display: inline-block;
								max-width: 115px;
								font-size: 13px;
								color: #fff;
								font-weight: 700;
							}
						}

						.desc {
							margin-top: 9px;
							font-size: 18px;
							color: #ffd40a;
							font-weight: 400;
							display: flex;
							align-items: center;
						}
					}



				}


				.user_detail {
					height: 81px;
					margin: 11px 15px 7px;
					background: url(../../static/images/my-bg2.png) no-repeat;
					background-size: contain;
					display: flex;
					align-items: center;
					padding: 0 15px;

					.left {
						flex: 1;
						overflow: hidden;

						.col1 {
							display: flex;
							align-items: center;
							font-size: 12px;
							color: #e5eeff;

							image {
								width: 20px;
								margin-left: 2px;
								vertical-align: middle;
								margin-left: 10px;
							}
						}

						.col2 {
							font-size: 31px;
							color: #e5eeff;
						}

						.u-line-1 {
							display: -webkit-box !important;
							overflow: hidden;
							text-overflow: ellipsis;
							word-break: break-all;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical !important;
						}
					}

					.right {
						color: hsla(0, 0%, 100%, .03529411764705882);
						display: flex;
						align-items: center;

						.btn {
							text {
								white-space: nowrap;
								font-size: 17px;
								color: #fff;
								margin: 0 9px;
							}
						}
					}
				}


				.lists {
					padding-bottom: 80px;

					.list {
						box-sizing: border-box;
						padding: 0 24px 0 30px;
						display: flex;
						align-items: center;
						height: 46px;
						background: url(../../static/images/myListBg.png) no-repeat 50%;
						background-size: contain;

						.lf {
							width: 26px;
							vertical-align: middle;
							margin-right: 22px;
						}

						.txt {
							flex: 1;
							color: #fff;
							font-size: 15px;
						}
					}
				}


			}
		}
	}
</style>
