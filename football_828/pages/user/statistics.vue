<template>
	<view class="statisticsView">
		<hx-navbar ref="hxnb" :config="configNav">
			<block slot="left">
				<view class="left-icon" @click="goBackBtnClick">
					<image
						:src="isScrollBool ? '../../static/images/left_row2.png' : '../../static/images/left_row1.png' "
						mode="" class="lianmeng"></image>
				</view>
			</block>
			<block slot="center">
				<view class="centerTitle" :style="isScrollBool ?'color:#f5f5f5' :'color:#111'">
					{{$t('func.commonly.agent.center')}}
				</view>
			</block>
			<!-- <block slot="right">
				<view class="right-icon" style="">
					<image src="../../static/images/anount.svg" mode="" class="lianmeng"></image>
				</view>
			</block> -->
		</hx-navbar>

		<view class="promote-box">
			<view class="top-banner">
				<view class="user_info">
					<image src="../../static/images/avatar1.jpeg" mode="" class="avatar"></image>
					<text class="userName">{{userNameStr}}</text>
				</view>
				<view class="rules" @click="rebateClick">
					<text class="text">{{$t('user.report.manage.list.rebate.center.text')}}</text>
				</view>
			</view>
			<view class="content">
				<view class="award">
					<view class="award-top">
						<view class="proxy_back_amount">
							<text class="text">{{$t('user.statistics.center.data.head.teambalance.text')}}</text>
							<text class="money">{{totalBalance | moneyFormat}}</text>
						</view>
						<view class="qrCode" @click="qrCodeClick">
							<image src="../../static/images/erweima.svg" mode="" class="code"></image>
						</view>

						<view class="award-amount">
							<text class="text">{{$t('user.statistics.center.data.head.teamSize.text')}}</text>
							<text class="money">{{playerCount}}</text>
						</view>
					</view>
				</view>
				<view class="slot">

				</view>
				<view class="tab-item">
					<view class="tab" @click="personCenterClick">
						<view class="tab-list">
							<view class="icon-box">
								<image src="../../static/images/next_level.svg" mode="" class="icon"></image>
							</view>
							<text class="tab-name">{{$t('user.report.manage.list.personal.center.text')}}</text>
						</view>
					</view>
					<view class="tab" @click="teamCenterClick">
						<view class="tab-list">
							<view class="icon-box">
								<image src="../../static/images/finance_list.svg" mode="" class="icon"></image>
							</view>
							<text class="tab-name">{{$t('user.report.manage.list.team.center.text')}}</text>
						</view>
					</view>
					<view class="tab" @click="userCenterClick">
						<view class="tab-list">
							<view class="icon-box">
								<image src="../../static/images/issue_record.svg" mode="" class="icon"></image>
							</view>
							<text class="tab-name">{{$t('user.report.manage.list.user.center.text')}}</text>
						</view>
					</view>
				</view>
				<view class="promote-award" @click="goToLevelDetail">
					<text class="award-txt">{{$t('user.statistics.center.data.head.lowerlevel.text')}} </text>
				</view>
				<view class="item">
					<view class="cell">
						<view class="cell-left">
							<image src="../../static/images/new_register.svg" mode="" class="cell-icon"> </image>
							<view class="cell-text1">
								<text
									class="title">{{$t('func.commonly.agent.next.new.reg.text')}}({{$t('func.commonly.agent.next.30days.text')}})</text>
								<text class="txt">{{newPlayer}}</text>
							</view>
						</view>
						<view class="iconfont iconmore">

						</view>
					</view>
					<view class="cell">
						<view class="cell-left">
							<image src="../../static/images/recharge-s.svg" mode="" class="cell-icon"> </image>
							<view class="cell-text1">
								<text
									class="title">{{$t('func.commonly.agent.next.total.top.up.text')}}({{$t('func.commonly.agent.next.30days.text')}})</text>
								<text class="txt"> {{totalRecharge | moneyFormat}}</text>
							</view>
						</view>
						<view class="iconfont iconmore">

						</view>
					</view>
					<view class="cell">
						<view class="cell-left">
							<image src="../../static/images/withdraw-s.svg" mode="" class="cell-icon"> </image>
							<view class="cell-text1">
								<text
									class="title">{{$t('func.commonly.agent.next.total.withdraw.text')}}({{$t('func.commonly.agent.next.30days.text')}})</text>
								<text class="txt">{{totalWithdrawal | moneyFormat}}</text>
							</view>
						</view>
						<view class="iconfont iconmore">

						</view>
					</view>
					<view class="cell">
						<view class="cell-left">
							<image src="../../static/images/bet.svg" mode="" class="cell-icon"> </image>
							<view class="cell-text1">
								<text
									class="title">{{$t('func.commonly.agent.next.total.amount.text')}}/{{$t('func.commonly.agent.next.total.number.text')}}({{$t('func.commonly.agent.next.30days.text')}})</text>
								<text class="txt">{{totalBetBalance | moneyFormat}}/{{totalBetPlayer}}</text>
							</view>
						</view>
						<view class="iconfont iconmore">

						</view>
					</view>
					<view class="cell">
						<view class="cell-left">
							<image src="../../static/images/profit.svg" mode="" class="cell-icon"> </image>
							<view class="cell-text1">
								<text
									class="title">{{$t('func.commonly.agent.next.total.profit.text')}}({{$t('func.commonly.agent.next.30days.text')}})</text>
								<text class="txt">{{netProfit | moneyFormat}}</text>
							</view>
						</view>
						<view class="iconfont iconmore">

						</view>
					</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import {
		dataCenterReq,
		playerInfoReq
	} from '@/api/index.js'
	// import {mapState,mapMutations} from 'vuex'
	import {
		myMixin,
		setInviteMixin
	} from '@/util/mixins.js'
	export default {
		data() {
			return {
				centerTitleStyle: '',
				leftIconStyle: '',
				isScrollBool: false,
				userNameStr: '',
				configNav: {
					// title: this.$t('tabar.bet'),
					fixed: true,
					color: '#ffffff',
					//背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
					backgroundColor: [0, ['171E25']],
					// 滑动屏幕后切换颜色，注意颜色为数组时长度必须一样，还有使用滑动切换必须监听 Scroll 事件
					slideBackgroundColor: [1, ['171E25']],
					// 状态栏 ，数组则为滑动变色
					statusBarBackground: ['', '#ffffff'],
					back: false,
					leftSlot: true,
					rightSlot: true,
				},
				navTitle: this.$t('func.commonly.agent.center'),
				placeholderAccount: this.$t('user.statistics.center.data.query.account.text'),
				customStyleInput: {
					"border-radius": "5px",
					"background-color": "#334756",
					"text-indent": "10px",
					"color": "#fff"
				},
				tabList: [{
					name: this.$t('user.statistics.center.today.text'),
				}, {
					name: this.$t('user.statistics.center.yes.text'),
				}, {
					name: this.$t('user.statistics.center.nearly7.text'),
				}, {
					name: this.$t('user.statistics.center.nearly10.text'),
				}, {
					name: this.$t('user.statistics.center.nearly30.text'),
				}],
				current: 0,
				totalBalance: 0,
				totalRecharge: 0,
				totalWithdrawal: 0,
				netProfit: 0,
				playerCount: 0,
				newPlayer: 0,
				totalBetBalance: 0,
				totalBetPlayer: 0,
				cumulativeWinning: 0,
				cumulativeActivity: 0,
				playerActive: 0,
				playerOffline: 0,
				cumulativeDiscount: 0,

				localLoginToken: null,
				searchUsername: '',

			}
		},
		mixins: [myMixin, setInviteMixin],
		// computed:{
		// 	...mapState(['hasLogin'])
		// },
		// onLoad() {
		// 	if(!this.hasLogin){
		// 		uni.reLaunch({
		// 		   url: '../login/login',
		// 		   animationType: 'slide-in-top',
		// 		   animationDuration: 200
		// 		})
		// 	}
		// },
		onShow() {

			// this.localLoginToken = this.$store.state.userInfo.token
			// this.localLoginToken = uni.getStorageSync('footballToken');

			// 初始化语言
			this.initLang()

			this.getInfoData()

			// 初始化数据
			this.getStatissticsData(1)

			this.getStatissticsData(5)

		},
		methods: {
			initLang() { //初始化语言


				let langStr = uni.getStorageSync('ft_lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr

				this.navTitle = this.$t('func.commonly.agent.center')
				this.placeholderAccount = this.$t('user.statistics.center.data.query.account.text')
				this.tabList = [{
					name: this.$t('user.statistics.center.today.text'),
				}, {
					name: this.$t('user.statistics.center.yes.text'),
				}, {
					name: this.$t('user.statistics.center.nearly7.text'),
				}, {
					name: this.$t('user.statistics.center.nearly10.text'),
				}, {
					name: this.$t('user.statistics.center.nearly30.text'),
				}]

			},
			onPageScroll(e) {
				// console.log(e);
				if (e.scrollTop == 0) {
					this.isScrollBool = false
				} else {
					this.isScrollBool = true
				}

				// 重点，用到滑动切换必须加上
				this.$refs.hxnb.pageScroll(e);
			},
			goBackBtnClick() {
				uni.switchTab({
					url: '/pages/funList/index',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			async getInfoData() {
				let resR = await playerInfoReq(this.localLoginToken)
				if (resR.code === 200) {

					this.userNameStr = resR.data.username
				}
			},
			async getStatissticsData(transferIndex) {
				let reqParam = {}
				reqParam.time = transferIndex
				// if (this.searchUsername) {
				// 	reqParam.username = this.searchUsername
				// }

				// reqParam.time = transferIndex + 1
				let resR = await dataCenterReq(reqParam, this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {


					if (transferIndex === 5) {
						this.totalBalance = resR.data.totalBalance
						this.totalRecharge = resR.data.totalRecharge
						this.totalWithdrawal = resR.data.totalWithdrawal
						this.netProfit = resR.data.netProfit

						this.playerCount = resR.data.playerCount

						this.totalBetBalance = resR.data.totalBetBalance
						this.totalBetPlayer = resR.data.totalBetPlayer

						this.cumulativeWinning = resR.data.cumulativeWinning
						this.cumulativeActivity = resR.data.cumulativeActivity
						this.playerActive = resR.data.playerActive
						this.playerOffline = resR.data.playerOffline
						this.cumulativeDiscount = resR.data.cumulativeDiscount
					} else if (transferIndex === 1) {
						this.newPlayer = resR.data.newPlayer
					}


				} else if (resR.code === 402 || resR.code === 403) {
					this.logout()
					uni.showToast({
						title: resR.msg,
						icon: 'none',
						duration: 2000,
						success: (res) => {
							uni.reLaunch({
								url: '/pages/login/login'
							})
						}
					});
				}
			},
			rebateClick() {
				uni.navigateTo({
					url: '/pages/user/rebateCenter',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			goToLevelDetail() {
				// ?searchName=' + this.searchUsername
				uni.navigateTo({
					url: '/pages/user/subordinateDetailT',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			personCenterClick() {
				uni.navigateTo({
					url: '/pages/user/Report/personalReport',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			teamCenterClick() {
				uni.navigateTo({
					url: '/pages/user/Report/teamReport',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			userCenterClick() {
				uni.navigateTo({
					url: '/pages/user/Report/accountList',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			qrCodeClick() {
				uni.navigateTo({
					url: "/pages/refer/share",
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据	
						this.save_invite_from('statistics')
						res.eventChannel.emit('eventInviteClick', {
							from: 'statistics'
						})
					},
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #171E25;
		height: 100%;
		position: relative;
	}

	.hx-navbar {
		z-index: 999;
	}

	.statisticsView {

		.left-icon {
			padding-left: 10px;
		}

		.centerTitle {
			color: #111;
		}

		.lianmeng {
			width: 19px;
			height: 19px;
			margin-top: 7px;
			margin-left: 7px;
		}

		.right-icon {
			padding-right: 10px;
			position: relative;
		}

		.promote-box {
			margin-top: -50px;

			.top-banner {
				display: flex;
				flex-direction: column;
				background-image: url(../../static/images/bg-pro.png);
				background-repeat: no-repeat;
				background-size: cover;
				width: 100%;
				height: 170px;
				position: relative;

				.user_info {
					display: flex;
					flex-direction: row;
					padding: 72px 15px;

					.avatar {
						width: 36px;
						height: 36px;
						border-radius: 50%;
						border: solid 0.5px #eee;
					}

					.userName {
						font-size: 16px;
						color: #111;
						line-height: 36px;
						padding-left: 10px;
					}
				}

				.rules {
					min-width: 92px;
					padding: 0 5px;
					height: 30px;
					position: absolute;
					background-color: hsla(0, 0%, 100%, .4);
					border-top-left-radius: 30px;
					border-bottom-left-radius: 30px;
					right: 0;
					bottom: 50%;
					margin-bottom: -20px;
					text-align: center;
					line-height: 30px;
					color: #111;
				}
			}

			.content {
				position: relative;

				.award {
					display: flex;
					position: absolute;
					top: -35px;
					left: 50%;
					margin-left: -45%;
					z-index: 9;
					width: 100%;

					.award-top {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						padding: 0 10px;
						height: 70px;
						width: 90%;
						background-color: #171e25;
						background: url(../../static/images/money-bg.png) no-repeat;
						background-size: cover;
						border-radius: 10px;

						.proxy_back_amount,
						.award-amount {
							display: flex;
							flex-direction: column;
							justify-content: center;
							text-align: center;
							flex: 143px;
							width: 143px;

							.text {
								font-size: 13px;
								color: #fb0;
							}

							.money {
								color: #f8f8f8;
								font-size: 18px;
								font-weight: 600;
								padding-top: 8px;
							}
						}

						.qrCode {
							width: 35px;
							height: 35px;
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							flex: 0 0 25px;
							margin: 17px 30px 0;

							.code {
								width: 35px;
								height: 35px;
							}
						}

					}
				}

				.slot {
					width: 100%;
					height: 28px;
				}

				.tab-item {
					display: flex;
					justify-content: space-between;
					flex-direction: row;
					width: 90%;
					padding: 10px 15px;
					margin: 2px auto 0;

					.tab {
						.icon-box {
							width: 45px;
							height: 45px;
							display: flex;
							-webkit-text-decoration: row;
							text-decoration: row;
							justify-content: center;
							align-items: center;
							margin: 0 auto;

							.icon {
								width: 49px;
								height: 49px;
							}
						}

						.tab-name {
							font-size: 13px;
							color: #f8f8f8;
							display: block;
							text-align: center;
						}
					}
				}

				.promote-award {
					width: 100%;
					height: 69px;
					margin: 10px auto 0;
					background-image: url(../../static/images/promote.jpg);
					background-size: cover;
					background-repeat: no-repeat;
					border-radius: 5px;
					display: flex;
					-webkit-text-decoration: row;
					text-decoration: row;
					align-items: center;
					padding: 10px 0;

					.award-txt {
						font-size: 14px;
						color: #ffba00;
						font-weight: 600;
						margin-right: 15px;
						line-height: 30px;
						padding-left: 110px;
					}
				}


				.item {
					padding-bottom: 50px;
					margin-top: 10px;
					width: 100%;

					.cell {
						height: 55px;
						padding: 35px 12px;
						display: flex;
						justify-content: space-between;
						align-items: center;
						position: relative;
						border-bottom-width: 0.5px;
						border-bottom-color: #1f252f;
						border-bottom-style: solid;
						margin-left: auto;
						margin-right: auto;
						margin-top: 0;
						margin-bottom: 0;
						width: 94%;

						.cell-left {
							display: flex;
							align-items: center;

							.cell-icon {
								width: 33px;
								height: 33px;
							}


							.cell-text1 {
								margin-left: 15px;
								font-size: 13px;
								display: flex;
								flex-direction: column;

								.title {
									font-size: 14px;
									font-weight: 600;
									color: #f8f8f8;
								}

								.txt {
									color: #ffba00;
									padding-top: 5px;
									font-size: 14px;
								}
							}
						}

						.iconfont {
							font-size: 16px;
							font-weight: 700;
							color: #889;

						}
					}
				}
			}
		}


	}
</style>
