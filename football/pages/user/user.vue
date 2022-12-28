<template>
	<view class="userPage">
		<view class="userHeader">
			<view class="balanceInfo">
				<view class="userBalance">
					<view class="userBalanceLeft">

					</view>
					<view class="userBalanceImage">
						<image src="../../static/images/avatar.png" mode=""></image>
					</view>
					<view class="userBalanceNotice" @click="toNoticeClick">
						<image src="../../static/images/information.svg" mode=""></image>
						<view class="newCount" v-if="noticeNum">
							{{noticeNum}}
						</view>
					</view>
				</view>
				<view class="userBalanceText">
					<view class="user_Name">
						{{$t('user.account.str')}}: {{username}}
						<i class="vipClass">VIP{{vipNum}}</i>
					</view>
					<view class="user_Balance">
						{{$t('user.account.balance')}}
					</view>
					<view class="user_Amount">
						{{balance | moneyFormat}}
					</view>
					<view class="reate_Amount">
						≈ {{reateAmount | saveTwoStr}} USDT
					</view>
				</view>
				<view class="rechargeWithdraw">
					<view class="rechargeBtn" @click="rechargeBtnClick">
						{{$t('user.recharge.text')}}
					</view>
					<view class="withdrawBtn" @click="withdrawBtnClick">
						{{$t('user.withdraw.text')}}
					</view>
				</view>
			</view>
			<view class="commonRecord">
				<view class="recordItem" @click="rechargeRecordClick">
					<image src="../../static/images/Recharge_record.svg" mode=""></image>
					<view class="recordItemText">
						{{$t('user.recharge.record')}}
					</view>
				</view>
				<view class="recordItem" @click="rwRecordClick">
					<image src="../../static/images/Withdrawals_record.svg" mode=""></image>
					<view class="recordItemText">
						{{$t('user.withdraw.record')}}
					</view>
				</view>
				<view class="recordItem" @click="orderCenterClick">
					<image src="../../static/images/Order_record.svg" mode=""></image>
					<view class="recordItemText">
						{{$t('user.order.center')}}
					</view>
				</view>
			</view>
		</view>
		<view class="contentList">
			<!-- <view class="contentListCell" @click="report_management_click">
				<view class="contentListCellImageTitle">
					<image src="../../static/images/Report_management.svg" mode=""></image>
					<view class="contentListCellTitle">
						{{$t('user.list.report')}}
					</view>
				</view>
				<image src="../../static/images/arrow.svg" mode=""></image>
			</view>
			<view class="contentListCell"  @click="security_center_click">
				<view class="contentListCellImageTitle">
					<image src="../../static/images/security_center.svg" mode=""></image>
					<view class="contentListCellTitle">
						{{$t('user.list.security')}}
					</view>
				</view>
				<image src="../../static/images/arrow.svg" mode=""></image>
			</view>
			<view class="contentListCell" @click="help_center_click">
				<view class="contentListCellImageTitle">
					<image src="../../static/images/help_center.svg" mode=""></image>
					<view class="contentListCellTitle">
						{{$t('user.list.help')}}
					</view>
				</view>
				<image src="../../static/images/arrow.svg" mode=""></image>
			</view>
			<view class="contentListCell" @click="share_center_click">
				<view class="contentListCellImageTitle">
					<image src="../../static/images/invitation_center.svg" mode=""></image>
					<view class="contentListCellTitle">
						{{$t('user.list.qrcode')}}
					</view>
				</view>
				<image src="../../static/images/arrow.svg" mode=""></image>
			</view> -->

			<wrapListCell v-for="(item,index) in dataUserList" :key="index" :itemCell="item"
				@click.native="wrapUserListCell_click(item,index)" :showImgBool="true"
				:itemCellStyle="dataUserListCellStyle"></wrapListCell>



			<!-- <view class="contentListCell">
				<view class="contentListCellImageTitle">
					<image src="../../static/images/routeSelection.svg" mode=""></image>
					<view class="contentListCellTitle">
						{{$t('user.list.route')}}
					</view>
				</view>
				<image src="../../static/images/arrow.svg" mode=""></image>
			</view>
			<view class="contentListCell">
				<view class="contentListCellImageTitle">
					<image src="../../static/images/download_center.svg" mode=""></image>
					<view class="contentListCellTitle">
						{{$t('user.list.app')}}
					</view>
				</view>
				<image src="../../static/images/arrow.svg" mode=""></image>
			</view> -->





			<view class="logoutBtn" @click="logoutClick">
				<image src="../../static/images/sign_out.svg" mode=""></image>
				{{$t('user.logou.text')}}
			</view>


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
		appUrlReq
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
		rechargeMinxi
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
				dataUserListCellStyle: 'border-radius: 10px;',
				dataUserList: [],
				noticeNum: 0,
				currDevOsNum: null,
				downUrl: "",
			}
		},
		filters: {
			saveTwoStr(value) {
				// console.log("value", value);
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
		// 		   animationType: 'pop-in',
		// 		   animationDuration: 200
		// 		})
		// 	}
		// },
		mixins: [myMixin, withdrawMinxi, rechargeMinxi],
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

				let langStr = uni.getStorageSync('lang')
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
				}, {
					imageIcon: '../../static/images/downloadlist.svg',
					name: this.$t('user.list.app')
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
				let langStr = uni.getStorageSync('lang')
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
				let resR = await playerInfoReq(this.localLoginToken)
				// console.log("resR",resR.data);
				if (resR.code === 200) {
					// console.log("resR",resR.data);
					this.username = resR.data.username
					this.balance = resR.data.balance
					// console.log("this.balance ", this.balance);
					// console.log("this.balance ", resR.data.usdtRate);
					this.reateAmount = ((resR.data.balance * 1) / 100) / resR.data.usdtRate
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
			logoutClick() { //退出按钮主动退出功能
				this.$showModal({
					title: '',
					icon: 'warning',
					ceterTitle: this.$t('modal.title'),
					ceterDesc: this.$t('modal.logout.desc'),
					cancelText: this.$t('modal.cancel.text'), //传入空值表示只显示确认按钮，此代码不能省略
					confirmText: this.$t('modal.confirm.text'),
					success: async (res) => {
						if (res.confirm) {
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

						} else if (res.cancel) { //点击确定无需操作

						}
					}
				})

			}
		}
	}
</script>

<style>
	page {
		/* height: 100%; */
		background-color: #071a28;

	}


	.userPage {
		overflow-y: auto;
		padding-bottom: 25px;
	}

	.userHeader {
		padding: 0 16px 0;
		background: url(../../static/images/user_bg.png);
		/* background-size: 100% 100%; */
		position: relative;
	}

	.balanceInfo {
		padding-top: 25px;
		margin-bottom: 18px;
	}

	.userBalance {
		display: flex;
		justify-content: space-between;
		font-size: 13px;
		color: #333;
		flex: 1;
	}

	.userBalanceLeft {
		width: 27px;
		height: 27px;
	}

	.userBalanceImage {
		display: flex;
		align-items: center;
	}

	.userBalanceImage image {
		width: 72px;
		height: 72px;
		margin-right: 5px;
		border-radius: 50%;
	}

	.userBalanceNotice {
		width: 27px;
		height: 27px;
	}

	.userBalanceNotice image {
		width: 27px;
		height: 27px;
	}

	.newCount {
		color: #FFFFFF;
		background: red;
		width: 15px;
		height: 15px;
		border-radius: 50%;
		padding: 1px;
		text-align: center;
		font-size: 12px;
		line-height: 15px;
		position: absolute;
		right: 12px;
		top: 20px;
	}

	.userBalanceText {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #e8e8e8;
		font-size: 14px;
		height: 100%;
		margin-left: 5px;
		margin-top: 5px;
	}

	.user_Name {
		font-size: 14px;
	}

	.vipClass {
		font-style: normal;
		color: #3d8dfe;
		margin-left: 5px;
	}

	.user_Balance {
		margin-top: 19px;
	}

	.user_Amount {
		color: #3d8dfe;
		font-size: 32px;
	}

	.rechargeWithdraw {
		display: flex;
		justify-content: center;
		margin-top: 5px;
	}

	.rechargeBtn {
		width: 97px;
		height: 30px;
		/* min-height: 30px; */
		/* background: #334756; */
		background: #0B66B6;
		border-radius: 5px;
		text-align: center;
		color: #fff;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		/* padding: 5px 0; */
	}

	.withdrawBtn {
		width: 97px;
		height: 30px;
		/* min-height: 30px; */
		/* background: #334756; */
		background: #0B66B6;
		border-radius: 5px;
		text-align: center;
		color: #fff;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		/* padding: 5px 0; */
		margin-left: 26px;
	}

	.commonRecord {
		padding: 5px 0 20px 0;
		display: flex;
		justify-content: space-between;
		color: #fff;
		margin-bottom: 10px;
		/* min-height: 81px; */
		margin-top: 7px;
	}

	.recordItem {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.recordItem image {
		width: 30px;
		height: 30px;
	}

	.recordItemText {
		margin-top: 5px;
		width: 80px;
		text-align: center;
		font-size: 12px;
	}


	.contentList {
		margin-bottom: 9px;
		overflow: hidden;
		padding: 0 16px;
	}

	.contentListCell {
		height: 45px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #132736;
		position: relative;
		margin-top: 10px;
		border-radius: 10px;
		padding: 0 10px;
	}

	.contentListCell image {
		width: 12px;
		height: 17px;
	}

	.contentListCellImageTitle {
		display: flex;
		align-items: center;
	}

	.contentListCellImageTitle image {
		width: 25px;
		height: 25px;
	}

	.contentListCellTitle {
		margin-left: 15px;
		font-size: 14px;
		color: #E5E5E5;
	}

	.logoutBtn {
		line-height: 45px;
		display: flex;
		justify-content: center;
		background: #132736;
		position: relative;
		margin-top: 10px;
		border-radius: 10px;
		padding: 0 10px;
		align-items: center;
		color: #fff;
		font-size: 14px;
	}

	.logoutBtn image {
		width: 20px;
		height: 20px;
		margin-right: 5px;
	}
</style>
