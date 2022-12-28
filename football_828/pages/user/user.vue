<template>
	<view class="user">
		<view class="navbar">
			<uni-nav-bar backgroundColor="#171e25" color="#fff" :statusBar="true" :border="false" :fixed="true"
				leftWidth="30" rightWidth="30">
				<block slot="left">
					<view class="left-icon" @click="goToServerBtnClick">
						<image src="../../static/images/service-nav.svg" mode="" class="leftImg"></image>
					</view>
				</block>
				<view class="centerText">
					<text class="text_overflow">{{$t('tabar.mine')}}</text>
				</view>
				<block slot="right">
					<view class="right-icon" @click="toNoticeClick">
						<image src="../../static/images/annout.svg" mode="" class="leftImg"></image>
						<view class="diot" v-if="noticeNum">

						</view>
					</view>
				</block>

			</uni-nav-bar>

		</view>

		<view class="body">
			<view class="header">
				<view class="wrap">
					<view class="flow">
						<view class="user-msg">
							<image src="../../static/images/avatar1.jpeg" mode="" class="user-avatar"></image>
							<view class="uname">
								<text class="user-name">{{username}}</text>
								<view class="vip-name">
									<text class="level">VIP{{vipNum}}</text>
								</view>

							</view>
						</view>

					</view>
					<view class="personal" @click="personInfo">
						<text class="info">{{$t('user.info.text')}}</text>
					</view>
					<view class="money">
						<view class="my-price">
							<text class="balance">{{$t('user.account.balance')}}</text>
							<text class="priceText">{{balance | moneyFormat}}</text>
						</view>
						<view class="my-price not-close-price">
							<text class="balance">{{realSymbolName}}</text>
							<text class="priceText">≈ {{reateAmount}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="common_service">
				<view class="item">
					<view class="service_item" @click="rechargeBtnClick">
						<image src="../../static/images/recharge.svg" mode="" class="serviceImg"></image>
						<text class="text uiIde">{{$t('user.recharge.text')}}</text>
					</view>
					<view class="service_item" @click="withdrawBtnClick">
						<image src="../../static/images/withdraw.svg" mode="" class="serviceImg"></image>
						<text class="text uiIde">{{$t('user.withdraw.text')}}</text>
					</view>
					<view class="service_item" @click="rechargeRecordClick">
						<image src="../../static/images/recharge.svg" mode="" class="serviceImg"></image>
						<text class="text uiIde">{{$t('user.recharge.record')}}</text>
					</view>
					<view class="service_item" @click="rwRecordClick">
						<image src="../../static/images/withdraw.svg" mode="" class="serviceImg"></image>
						<text class="text uiIde">{{$t('user.withdraw.record')}}</text>
					</view>
				</view>
			</view>
			<view class="line">

			</view>
			<view class="com-item">
				<view class="com-wrap" style="margin-bottom: 8px;">
					<wrapListCell v-for="(item,index) in dataUserList" :key="index" :itemCell="item"
						@click.native="wrapUserListCell_click(item,index)" :showImgBool="true"
						:itemCellStyle="dataUserListCellStyle"></wrapListCell>
				</view>
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
		setInviteMixin
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
				vipNum: 0,
				reateAmount: 0,
				realSymbol: '',
				realSymbolName: '',
				dataUserListCellStyle: 'border-radius: 10px;',
				dataUserList: [{
					imageIcon: '../../static/images/Report_management.svg',
					name: this.$t('user.list.report')
				}, {
					imageIcon: '../../static/images/security_center.svg',
					name: this.$t('user.list.security')
				}, {
					imageIcon: '../../static/images/help_center.svg',
					name: this.$t('user.list.help')
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
		mixins: [myMixin, withdrawMinxi, rechargeMinxi, setInviteMixin],
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
					imageIcon: '../../static/images/security.svg',
					name: this.$t('user.list.security')
				}, {
					imageIcon: '../../static/images/share.svg',
					name: this.$t('user.list.qrcode')
				}, {
					imageIcon: '../../static/images/help.svg',
					name: this.$t('user.list.help')
				}, {
					imageIcon: '../../static/images/app-user.svg',
					name: this.$t('user.list.app')
				}, {
					imageIcon: '../../static/images/logout.svg',
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
				} else if (index === 2) {
					this.help_center_click()
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
				uni.navigateTo({
					url: "/pages/user/info",
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
		background-color: #171E25;

	}

	.left-icon,
	.right-icon {
		// padding-left: 10px;

		.leftImg {
			width: 38px;
			height: 38px;
			margin-top: 7px;
		}
	}

	.right-icon {
		position: relative;

		.diot {
			position: absolute;
			width: 6px;
			height: 6px;
			background-color: #b33a3a;
			border-radius: 50%;
			right: 8px;
			top: 18px;
		}
	}


	.centerText {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.text_overflow {
			display: block;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			text-align: center;
			font-size: 18px;
		}
	}

	.user {
		.header {
			.wrap {
				background: #171e25;
				padding-top: 10px;
				height: 160px;
				padding-left: 15px;
				padding-right: 15px;
				background-size: cover;
				position: relative;

				.personal {
					position: absolute;
					height: 28px;
					background: linear-gradient(90deg, #333b42, #161719);
					border-top-left-radius: 28px;
					border-bottom-left-radius: 28px;
					right: 0;
					top: 50%;
					margin-top: -50px;
					text-align: center;
					padding: 0 15px;

					.info {
						color: #ffbe0d;
						font-size: 14px;
						line-height: 28px;
					}
				}
			}

			.flow {
				display: flex;
				justify-content: space-between;
				width: 100%;
			}

			.user-msg {
				display: flex;
				align-items: center;

				.user-avatar {
					width: 70px;
					height: 70px;
					border-radius: 50%;
					margin-right: 5px;
					border: 3px solid #ca962e;
				}

				.uname {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: flex-start;
					padding-left: 15px;
					position: relative;

					.user-name {
						font-size: 20px;
						color: #fff;
						margin-bottom: 15px;
					}

					.vip-name {
						width: 65px;
						height: 17px;
						background: url(../../static/images/vip.png) no-repeat;
						background-size: 100%;
						margin-left: 5px;
						display: flex;
						flex-direction: row;
						position: relative;

						.level {
							color: #9c6410;
							position: absolute;
							right: 50%;
							margin-right: -20px;
							font-size: 13px;
							line-height: 19px;
							font-weight: 600;
						}
					}


				}
			}


		}

		.common_service {
			background: #171e25;
			padding: 12px 0 5px;

			.item {
				display: flex;
				margin-left: auto;
				margin-right: auto;
				align-items: center;
				margin-top: 0px;
				margin-bottom: 0;
				padding: 12px;
				justify-content: space-between;

				.service_item {
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 90px;

					.serviceImg {
						width: 40px;
						height: 33px;
					}

					.text {
						margin-top: 2px;
						text-align: center;
						font-size: 12px;
						color: #fff;
						width: 90px;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.uiIde {
						width: 60px;
					}
				}
			}
		}

		.com-item {
			.com-wrap {
				overflow: hidden;
			}
		}
	}

	.money {
		position: absolute;
		// bottom: -5px;
		height: 85px;
		background: url(../../static/images/bg.png) no-repeat;
		background-size: cover;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 8px 0 0 20px;
		border-radius: 8px;
		width: 92%;
		background-position: -10px;

	}

	.my-price {
		margin-top: -10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.balance {
		font-weight: 400;
		color: #333;
		line-height: 17px;
		font-size: 12px;
	}


	.priceText {
		font-weight: 700;
		color: #333;
		line-height: 19px;
		font-size: 16px;
		margin-top: 2px;
	}

	.not-close-price {
		display: flex;
		align-items: center;
		// margin-right: 30px;
		// padding-left: 10px;
	}

	.line {
		width: 100%;
		height: 1px;
		background-color: #000;
		margin-top: 0px;
		margin-bottom: 10px;
		box-shadow: 0px 1px 0.5px #ffffff1a;
	}
</style>
