<template>
	<view class="user">
		<view class="body">
			<view class="header">
				<image src="../../static/images/minebg.png" mode="" class="bgs"></image>
				<view class="flow">
					<view class="lefts">
						<view class="avatar">
							<image src="../../static/images/defaultavatar.png" mode="" class="user-avatar"></image>
						</view>
						<view class="vips">
							<view class="vip-name">
								VIP{{vipNum}}
							</view>
							<view class="user-name">
								{{username}}
							</view>


						</view>
					</view>
					<view class="rights" @click="personInfo">
						<image src="../../static/images/vip1.png" mode=""></image>
						<view class="info">
							{{$t('user.info.text')}}
						</view>
					</view>
				</view>
				<!-- 	<view class="personal" @click="personInfo">
					<text class="info">{{$t('user.info.text')}}</text>
				</view> -->

			</view>
			<view class="matocontent">
				<image src="../../static/images/minebgsmall.png" mode="" class="cabgs"></image>
				<view class="money">
					<view class="my-price">
						<view class="balance">{{$t('backapi.self.user.info.frozenBet.text')}}</view>
						<view class="priceText">{{frozenBetNum | moneyFormat | saveTwoStr}}</view>
					</view>
					<view class="my-price not-close-price">
						<view class="balance">{{$t('backapi.self.user.info.accumulativeBet.text')}}</view>
						<view class="priceText"> {{accumulativeBetNum | moneyFormat | saveTwoStr}}</view>
					</view>
				</view>
			</view>
			<view class="common_service">
				<view class="titles">
					{{$t('user.account.balance')}}
				</view>
				<view class="moneys fontfamily">
					<!-- ≈ {{reateAmount | saveTwoStr}} -->
					{{balance | moneyFormat}} ≈ {{reateAmount }} ({{realSymbolName}})
				</view>
				<view class="item">
					<view class="service_item" @click="rechargeBtnClick">
						<image src="../../static/images/recharge.png" mode="" class="serviceImg"></image>
						<view class="text uiIde">{{$t('user.recharge.text')}}</view>
					</view>
					<view class="service_item" @click="withdrawBtnClick">
						<image src="../../static/images/outwidth.png" mode="" class="serviceImg"></image>
						<view class="text uiIde">{{$t('user.withdraw.text')}}</view>
					</view>
					<view class="service_item" @click="rechargeRecordClick">
						<image src="../../static/images/rechargerecord.png" mode="" class="serviceImg"></image>
						<view class="text uiIde">{{$t('user.recharge.record')}}</view>
					</view>
					<view class="service_item" @click="rwRecordClick">
						<image src="../../static/images/accountmanage.png" mode="" class="serviceImg"></image>
						<view class="text uiIde">{{$t('user.withdraw.record')}}</view>
					</view>
				</view>
			</view>

			<view class="com-item">
				<view class="com-wrap" style="margin-bottom: 8px;">
					<wrapListCell v-for="(item,index) in dataUserList" :key="index" :itemCell="item"
						@click.native="wrapUserListCell_click(item,index)" :showImgBool="true"
						:itemCellStyle="dataUserListCellStyle"></wrapListCell>
				</view>
			</view>

			<view class="sraps">
				<image src="../../static/images/all_logo.png" mode="" style="width: 100%;height: 100%;"></image>
			</view>
		</view>

		<view class="contentList">





		</view>

		<u-toast ref="uToast" />
		<show-modal ref="testRef"></show-modal>
	</view>
</template>

<script>
	import {
		playerInfoReq,
		logoutReq,
		noticeReq,
		appUrlReq,
	} from '../../api/index.js'
	// import {
	// 	getTimeState,
	// 	formatDateToStr,
	// 	formatDateTimeSolt
	// } from '../../common/publicTool.js'
	// import {mapState,mapMutations} from 'vuex'
	import {
		myMixin,
		withdrawMinxi,
		rechargeMinxi,
		setInviteMixin,
		setBindPhoneMixin
	} from '@/util/mixins.js'
	import wrapListCell from '@/components/wrapListCellView/wrapListCellView.vue'
	export default {
		components: {
			wrapListCell,
		},
		data() {
			return {
				username: '',
				balance: 0,
				frozenBetNum: 0,
				frozenWithdrawalNum: 0,
				accumulativeBetNum: 0,
				vipNum: 0,
				reateAmount: 0,
				realSymbolName: '',
				realSymbol: '',
				dataUserListCellStyle: 'border-radius: 10px;',
				dataUserList: [{
					imageIcon: '../../static/images/Report_management.svg',
					name: this.$t('user.list.report')
				}, {
					imageIcon: '../../static/images/security_center.svg',
					name: this.$t('user.list.security')
				}, {
					imageIcon: '../../static/images/help_center.svg',
					name: this.$t('func.system.server')
				}, {
					imageIcon: '../../static/images/invitation_center.svg',
					name: this.$t('user.list.qrcode')
				}],
				noticeNum: 0,
				currDevOsNum: null,
				downUrl: "",
			}
		},
		filters: {
			saveTwoStr(value) {
				// console.log("val",formatDateToStr(value));
				return value.toFixed(2)
			}
		},
		// computed:{
		// 	...mapState(['hasLogin'])
		// },
		// onLoad() {
		// 	// console.log("this.hasLogin",this.hasLogin);
		// 	if(!this.hasLogin){
		// 		uni.reLaunch({
		// 		   url: '../login/login',
		// 		   animationType: 'slide-in-top',
		// 		   animationDuration: 200
		// 		})
		// 	}
		// },
		mixins: [myMixin, withdrawMinxi, rechargeMinxi, setInviteMixin, setBindPhoneMixin],
		onShow() {

			// this.localLoginToken = this.$store.state.userInfo.token
			// this.localLoginToken = uni.getStorageSync('footballToken');
			// console.log("aaa");
			// 初始化语言
			this.initLang()

			//初次获取个人信息数据
			this.initPlayInfoData()

			// 获取系统通知
			this.initNoticeData()

			// 获取app下载地址
			this.getAppDownUrlData()
		},
		methods: {
			// ...mapMutations(['logout']),
			initLang() { //初始化语言

				let langStr = uni.getStorageSync('ft_lang')
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

				// {
				// 	imageIcon: '../../static/images/Report_management.svg',
				// 	name: this.$t('user.list.report')
				// },
				this.dataUserList = [{
					imageIcon: '../../static/images/security.png',
					name: this.$t('user.list.security')
				}, {
					imageIcon: '../../static/images/share.png',
					name: this.$t('user.list.qrcode')
				}, {
					imageIcon: '../../static/images/server.png',
					name: this.$t('func.system.server')
				}, {
					imageIcon: '../../static/images/app-user.png',
					name: this.$t('user.list.app')
				}, {
					imageIcon: '../../static/images/logout.png',
					name: this.$t('user.logou.text')
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
				let langStr = uni.getStorageSync('ft_lang')
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
						if (item.readStatus === 0) { //未读
							this.noticeNum = this.noticeNum + 1
						}
					})


				}
			},
			async initPlayInfoData() {
				let resR = await playerInfoReq(this.localLoginToken)
				// console.log("resR",resR.data);
				if (resR.code === 200) {
					// console.log("resR",resR.data);
					this.username = resR.data.username
					this.balance = resR.data.balance
					this.frozenBetNum = resR.data.frozenBet
					this.accumulativeBetNum = resR.data.accumulativeBet
					this.frozenWithdrawalNum = resR.data.frozenWithdrawal


					// this.reateAmount = ((resR.data.balance * 1) / 100) / resR.data.currRate
					this.reateAmount = resR.data.currRate
					this.realSymbolName = resR.data.currencyName
					this.realSymbol = resR.data.currencySymbol
					this.vipNum = resR.data.vipLevel
				} else if (resR.code === 402 || resR.code === 403) {
					this.logout()
					this.$refs.uToast.show({
						title: resR.msg,
						url: '/pages/login/login',
					})
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
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			rwRecordClick() {
				uni.navigateTo({
					url: '/pages/user/withdrawRecord',
					animationType: 'slide-in-top',
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
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			goToServerBtnClick() {
				uni.navigateTo({
					url: '/pages/customer/index',
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据	
						uni.setStorageSync('querySeverCustomUrlFrom', 'user');
						res.eventChannel.emit('querySeverCustomUrlFrom', {
							from: 'user'
						})
					},
					animationType: 'slide-in-top',
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
					animationType: 'slide-in-top',
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
					animationType: 'slide-in-top',
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
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			wrapUserListCell_click(item, index) {
				if (index === 0) {
					// this.report_management_click()
					this.security_center_click()
				} else if (index === 1) {
					this.share_center_click()
				} else if (index === 2) { //客服中心
					this.goToServerBtnClick()

				} else if (index === 3) {
					this.down_app_click()
				} else if (index === 4) {
					this.logoutClick()
				}
			},
			down_app_click() {
				// console.log("this.downUrl", this.downUrl);
				if (this.downUrl) {
					window.location.href = this.downUrl
				}
			},
			report_management_click() {
				uni.navigateTo({
					url: "/pages/user/report_management",
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			security_center_click() {
				uni.navigateTo({
					url: "/pages/user/securityCenter",
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			help_center_click() {
				uni.navigateTo({
					url: "/pages/user/help/help",
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			share_center_click() {
				uni.navigateTo({
					url: "/pages/refer/share",
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据	
						this.save_invite_from('user')
						res.eventChannel.emit('eventInviteClick', {
							from: 'user'
						})
					},
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			personInfo() {
				// uni.navigateTo({
				// 	url: "/pages/user/info",
				// 	animationType: 'slide-in-top',
				// 	animationDuration: 200
				// })

				uni.navigateTo({
					url: '/pages/user/bind_phone',
					success: (res) => {
						this.save_bindphone_from('user')
						// 通过eventChannel向被打开页面传送数据	
						res.eventChannel.emit('eventBindPhoneClick', {
							from: 'user'
						})
					},
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			async logoutClick() { //退出按钮主动退出功能
				let resR = await logoutReq(this.localLoginToken)
				// console.log('用户点击确定',resR)
				if (resR.code === 200) {
					this.logout()
					uni.reLaunch({
						url: '/pages/login/login',
						animationType: 'slide-in-top',
						animationDuration: 200
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		/* height: 100%; */
		background-color: #f8f8f8;

	}


	.user {
		// padding-bottom: 60px;
		padding-bottom: 25px;
		box-sizing: border-box;

		.body {

			.header {
				width: 100%;
				height: 271px;
				position: relative;

				.bgs {
					width: 100%;
					height: 271px;
				}

				.flow {
					position: absolute;
					width: 100%;
					// height: 100%;
					left: 0;
					right: 0;
					top: 0;
					display: flex;
					// align-items: center;
					justify-content: space-between;
					padding: 15px 30px;
					padding-top: 20px;

					.lefts {
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;

						.avatar {
							.user-avatar {
								width: 68px;
								height: 68px;
								border-radius: 50%;
							}
						}

						.vips {
							display: flex;
							flex-direction: column;
							align-items: flex-start;
							justify-content: center;
							margin-left: 10px;

							.vip-name {
								background: linear-gradient(90deg, #fcbf2e, #fa9819);
								border-radius: 4px;
								// height: 16.5px;
								// line-height: 16.5px;
								text-align: center;
								color: #fff;
								font-size: 12px;
								margin-bottom: 5px;
								padding: 2px 6px;
							}

							.user-name {
								color: #fff;
								font-size: 19px;
							}
						}

					}

					.rights {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;

						image {
							width: 42px;
							height: 40px;
						}

						.info {
							color: #fff;
							font-size: 13px;
							font-weight: 700;
							margin-top: 5PX;
						}
					}
				}
			}

			.matocontent {
				width: 325px;
				height: 60px;
				margin: 0 auto;
				position: relative;
				margin-top: -160px;

				.cabgs {
					width: 100%;
					height: 100%;
				}

				.money {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					-webkit-box-align: center;
					-webkit-align-items: center;
					-ms-flex-align: center;
					align-items: center;
					padding: 11px;

					display: flex;
					flex-direction: row;
					justify-content: space-between;

					.left {
						margin-right: 5px;
					}

					.my-price {
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						justify-content: center;
						flex: 1;

						.balance {
							color: #d1bd91;
							font-size: 15px;
						}

						.priceText {
							color: #6ecff3;
							font-size: 13px;
						}
					}

					.not-close-price {}
				}


			}

			.common_service {
				width: 355px;
				height: 153px;
				// height: 110px;
				background: #fff;
				border-radius: 6px;
				padding: 10px;
				margin: 0 auto;
				box-sizing: border-box;
				position: relative;
				display: -webkit-box;
				display: -webkit-flex;
				display: -ms-flexbox;
				display: flex;
				-webkit-box-align: start;
				-webkit-align-items: flex-start;
				-ms-flex-align: start;
				align-items: flex-start;
				-webkit-box-pack: justify;
				-webkit-justify-content: space-between;
				-ms-flex-pack: justify;
				justify-content: space-between;
				-webkit-box-orient: vertical;
				-webkit-box-direction: normal;
				-webkit-flex-direction: column;
				-ms-flex-direction: column;
				flex-direction: column;

				.titles {
					font-size: 12px;
					color: #666;
					text-align: center;
				}

				.moneys {
					color: #414655;
					font-size: 22px;
				}

				.item {
					width: 100%;
					-webkit-box-pack: justify;
					-webkit-justify-content: space-between;
					-ms-flex-pack: justify;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					padding: 0 10px;
					box-sizing: border-box;
					// margin-top: 5px;
					margin-top: 15px;

					.service_item {
						flex: 1;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						text-align: center;

						.serviceImg {
							width: 50px;
							height: 45px;
						}

						.text {
							color: #333;
							font-size: 12px;
							font-weight: 700;
						}
					}
				}
			}

			.com-item {
				margin-top: 5px;
				padding: 0 10px;

				.com-wrap {
					background: #fff;
					border-radius: 6px;
					overflow: hidden;
				}
			}

			.sraps {
				width: 355px;
				background: #fff;
				margin: 0 auto;
				height: 50px;
				margin-top: 5px;
			}
		}
	}
</style>
