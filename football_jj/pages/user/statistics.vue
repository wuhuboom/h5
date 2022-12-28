<template>
	<view class="statisticsView">
		<view class="backTitleBar-wrapper colCent borderBox">
			<view class="fixedBox">
				<view class="common_header" style="height: 44px;">
					<view class="define">
						<view class="define_left_slot" @click="goBackBtnClick">
							<view class="">
								<u-icon name="arrow-left" size="32"></u-icon>
							</view>
						</view>
						<view class="define_center_slot">
							<view class="">
								<text class="title">{{navTitle}}</text>
							</view>
						</view>
						<view class="define_right_slot">
							<view class="">
								<!-- 	<view class="service">
									<image src="../../static/images/service.png" mode="" class="icon"></image>
								</view> -->
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

		<view class="promote-box">
			<view class="top-banner">
				<view class="user_info">
					<image mode="" class="avatar"></image>
					<text class="userName">{{userNameStr}}</text>
				</view>
				<!-- <view class="rules" @click="rebateClick">
					<text class="text">{{$t('user.report.manage.list.rebate.center.text')}}</text>
				</view> -->
			</view>


			<view class="anaylics">
				<view class="commons">
					<view class="tops">
						{{totalBalance | moneyFormat}}
					</view>
					<view class="fonts">
						{{$t('user.statistics.center.data.head.teambalance.text')}}
					</view>
				</view>
				<view class="middles" @click="qrCodeClick">
					<image src="../../static/images/erweima.svg" mode="" class="code"></image>
				</view>
				<view class="commons">
					<view class="tops">
						{{playerCount}}
					</view>
					<view class="fonts">
						{{$t('user.statistics.center.data.head.teamSize.text')}}
					</view>
				</view>
			</view>

			<view class="menuslists">
				<view class="listitemsarea">
					<view class="memus" @click="personCenterClick">
						<image src="../../static/images/chuanxiao.png" mode="" class="icon"></image>
						<view class="fonts">
							{{$t('user.report.manage.list.personal.center.text')}}
						</view>
					</view>
					<view class="memus margins" @click="teamCenterClick">
						<image src="../../static/images/baobiao.png" mode="" class="icon"></image>
						<view class="fonts">
							{{$t('user.report.manage.list.team.center.text')}}
						</view>
					</view>
					<view class="memus" @click="userCenterClick">
						<image src="../../static/images/fafang.png" mode="" class="icon"></image>
						<view class="fonts">
							{{$t('user.report.manage.list.user.center.text')}}
						</view>
					</view>
				</view>
			</view>

			<view class="linebgs">
				<image src="../../static/images/linebg.png" mode="" class="linebgpng"></image>
				<view class="contentsfonts" @click="goToLevelDetail">
					<view class="lefts">
						<image src="../../static/images/goldcoin.png" mode=""></image>
						<view class="fonts">
							{{$t('user.statistics.center.data.head.lowerlevel.text')}}
						</view>
					</view>
					<view class="sharesa">
						{{$t('notice.look.text')}}
					</view>
				</view>
			</view>

			<view class="metabs">
				<view class="cells">
					<view class="lefts">
						<image src="../../static/images/memebers.png" mode=""></image>
						<view class="titles">
							<view class="lebs">
								{{$t('func.commonly.agent.next.new.reg.text')}}({{$t('func.commonly.agent.next.30days.text')}})
							</view>
							<view class="values">
								{{newPlayer}}
							</view>
						</view>
					</view>
					<view class="rights">
						<!-- <image src="../../static/images/right-arrow.png" mode="" class="cell-icon"> </image> -->
					</view>
				</view>
				<view class="cells">
					<view class="lefts">
						<image src="../../static/images/pigcharge.png" mode=""></image>
						<view class="titles">
							<view class="lebs">
								{{$t('func.commonly.agent.next.total.top.up.text')}}({{$t('func.commonly.agent.next.30days.text')}})
							</view>
							<view class="values">
								{{totalRecharge | moneyFormat}}
							</view>
						</view>
					</view>
					<view class="rights">
						<!-- <image src="../../static/images/right-arrow.png" mode="" class="cell-icon"> </image> -->
					</view>
				</view>
				<view class="cells">
					<view class="lefts">
						<image src="../../static/images/outwithdrawl.png" mode=""></image>
						<view class="titles">
							<view class="lebs">
								{{$t('func.commonly.agent.next.total.withdraw.text')}}({{$t('func.commonly.agent.next.30days.text')}})
							</view>
							<view class="values">
								{{totalWithdrawal | moneyFormat}}
							</view>
						</view>
					</view>
					<view class="rights">
						<!-- <image src="../../static/images/right-arrow.png" mode="" class="cell-icon"> </image> -->
					</view>
				</view>
				<view class="cells">
					<view class="lefts">
						<image src="../../static/images/betting.png" mode=""></image>
						<view class="titles">
							<view class="lebs">
								{{$t('func.commonly.agent.next.total.amount.text')}}/{{$t('func.commonly.agent.next.total.number.text')}}({{$t('func.commonly.agent.next.30days.text')}})
							</view>
							<view class="values">
								{{totalBetBalance | moneyFormat}}/{{totalBetPlayer}}
							</view>
						</view>
					</view>
					<view class="rights">
						<!-- <image src="../../static/images/right-arrow.png" mode="" class="cell-icon"> </image> -->
					</view>
				</view>
				<view class="cells">
					<view class="lefts">
						<image src="../../static/images/profit.png" mode=""></image>
						<view class="titles">
							<view class="lebs">
								{{$t('func.commonly.agent.next.total.profit.text')}}({{$t('func.commonly.agent.next.30days.text')}})
							</view>
							<view class="values">
								{{netProfit | moneyFormat}}
							</view>
						</view>
					</view>
					<view class="rights">
						<!-- <image src="../../static/images/right-arrow.png" mode="" class="cell-icon"> </image> -->
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
			// onPageScroll(e) {
			// 	// console.log(e);
			// 	if (e.scrollTop == 0) {
			// 		this.isScrollBool = false
			// 	} else {
			// 		this.isScrollBool = true
			// 	}

			// 	// 重点，用到滑动切换必须加上
			// 	this.$refs.hxnb.pageScroll(e);
			// },
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
					url: '/pages/user/subordinateDetail',
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
		background-color: #f8f8f8;
		height: 100%;
		position: relative;
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

	.title {
		// color: #fff;
		font-weight: 700;
		font-size: 16px;
	}

	.service {
		width: 28px;
		height: 28px;

		.icon {
			width: 100%;
			height: 100%;
		}
	}

	// 导航栏结束

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
			// margin-top: -50px;

			.top-banner {
				display: flex;
				flex-direction: column;
				background-image: url(../../static/images/bgpng.png);
				background-repeat: no-repeat;
				background-size: cover;
				width: 100%;
				height: 170px;
				position: relative;

				.user_info {
					display: flex;
					flex-direction: column;
					padding: 72px 15px;
					align-items: center;
					justify-content: center;
					margin-top: 25px;

					.avatar {
						width: 36px;
						height: 36px;
						// border-radius: 50%;
						// border: solid 0.5px #eee;
					}

					.userName {
						font-size: 19px;
						color: #fff;
						line-height: 36px;
						// padding-left: 10px;
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

			.anaylics {
				position: relative;
				-webkit-box-align: start;
				-webkit-align-items: flex-start;
				-ms-flex-align: start;
				align-items: flex-start;
				width: 100%;
				box-sizing: border-box;
				height: 110px;
				background: #001f3a;
				padding-top: 10px;
				margin-top: -2px;


				display: -webkit-box;
				display: -webkit-flex;
				display: -ms-flexbox;
				display: flex;
				-webkit-box-pack: center;
				-webkit-justify-content: center;
				-ms-flex-pack: center;
				justify-content: center;

				.commons {
					display: -webkit-box;
					display: -webkit-flex;
					display: -ms-flexbox;
					display: flex;
					-webkit-box-pack: center;
					-webkit-justify-content: center;
					-ms-flex-pack: center;
					justify-content: center;

					-webkit-box-orient: vertical;
					-webkit-box-direction: normal;
					-webkit-flex-direction: column;
					-ms-flex-direction: column;
					flex-direction: column;
					-webkit-box-align: center;
					-webkit-align-items: center;
					-ms-flex-align: center;
					align-items: center;
					-webkit-box-flex: 1;
					-webkit-flex: 1;
					-ms-flex: 1;
					flex: 1;

					.tops {
						color: #ffd96b;
						font-size: 15px;
					}

					.fonts {
						color: #6ecff3;
						font-size: 15px;
					}
				}

				.middles {
					margin: 10px;
					// margin-top: 25px;

					.code {
						width: 25px;
						height: 25px;
					}
				}
			}

			.menuslists {
				width: 100%;
				box-sizing: border-box;
				padding: 0 10px;
				margin-top: -40px;
				position: relative;

				.listitemsarea {
					-webkit-box-pack: center;
					-webkit-justify-content: center;
					-ms-flex-pack: center;
					justify-content: center;
					border-radius: 4px;
					background: #fff;
					width: 100%;
					box-sizing: border-box;
					box-shadow: 0 2px 6px 0 #19191933;
					height: 90px;

					display: -webkit-box;
					display: -webkit-flex;
					display: -ms-flexbox;
					display: flex;
					-webkit-box-align: center;
					-webkit-align-items: center;
					-ms-flex-align: center;
					align-items: center;

					.memus {

						display: -webkit-box;
						display: -webkit-flex;
						display: -ms-flexbox;
						display: flex;
						-webkit-box-align: center;
						-webkit-align-items: center;
						-ms-flex-align: center;
						align-items: center;

						-webkit-box-pack: justify;
						-webkit-justify-content: space-between;
						-ms-flex-pack: justify;
						justify-content: space-between;
						-webkit-box-orient: vertical;
						-webkit-box-direction: normal;
						-webkit-flex-direction: column;
						-ms-flex-direction: column;
						flex-direction: column;
						-webkit-box-flex: 1;
						-webkit-flex: 1;
						-ms-flex: 1;
						flex: 1;
						// height: 72px;

						.icon {
							width: 45px;
							height: 45px;
							margin-bottom: 5px;


						}

						.fonts {
							color: #333;
							font-size: 13px;
							text-align: center;
						}
					}

					.margins {
						margin: 0 20px;
					}
				}
			}

			.linebgs {
				position: relative;
				padding: 0 10px;
				margin-top: 10px;

				.linebgpng {
					width: 355px;
					height: 60.5px;
				}

				.contentsfonts {
					-webkit-box-pack: justify;
					-webkit-justify-content: space-between;
					-ms-flex-pack: justify;
					justify-content: space-between;
					padding: 12px 16.5px 12px 22px;
					position: absolute;
					left: 0;
					right: 0;
					top: 0;
					bottom: 0;
					width: 100%;
					height: 100%;
					box-sizing: border-box;

					display: -webkit-box;
					display: -webkit-flex;
					display: -ms-flexbox;
					display: flex;
					-webkit-box-align: center;
					-webkit-align-items: center;
					-ms-flex-align: center;
					align-items: center;

					.lefts {
						display: -webkit-box;
						display: -webkit-flex;
						display: -ms-flexbox;
						display: flex;
						-webkit-box-align: center;
						-webkit-align-items: center;
						-ms-flex-align: center;
						align-items: center;

						-webkit-box-pack: start;
						-webkit-justify-content: flex-start;
						-ms-flex-pack: start;
						justify-content: flex-start;

						image {
							width: 40px;
							height: 40px;
							margin-right: 21px;
						}

						.fonts {
							color: #fff;
							font-weight: 700;
							font-size: 15px;
						}
					}

					.sharesa {
						min-width: 92px;
						min-height: 31px;
						background: #f85d42;
						color: #fff;
						border-radius: 15.5px;
						text-align: center;
						// line-height: 31px;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}

			.metabs {
				padding: 0 10px;
				background: #fff;
				box-sizing: border-box;
				width: 100%;

				.cells {
					-webkit-box-pack: justify;
					-webkit-justify-content: space-between;
					-ms-flex-pack: justify;
					justify-content: space-between;
					border-bottom: 0.5px solid #eee;
					padding: 8px 0;

					display: -webkit-box;
					display: -webkit-flex;
					display: -ms-flexbox;
					display: flex;
					-webkit-box-align: center;
					-webkit-align-items: center;
					-ms-flex-align: center;
					align-items: center;

					.lefts {
						display: -webkit-box;
						display: -webkit-flex;
						display: -ms-flexbox;
						display: flex;
						-webkit-box-align: center;
						-webkit-align-items: center;
						-ms-flex-align: center;
						align-items: center;

						-webkit-box-pack: start;
						-webkit-justify-content: flex-start;
						-ms-flex-pack: start;
						justify-content: flex-start;

						image {
							width: 30.5px;
							height: 30.5px;
							margin-right: 12px;
						}

						.titles {
							.lebs {
								color: #333;
								font-size: 13px;
								font-weight: 700;
								margin-bottom: 4px;
							}

							.values {
								color: #666;
								font-size: 12px;
							}
						}
					}

					.rights {
						image {
							width: 6.5px;
							height: 10px;
						}
					}
				}
			}

		}


	}
</style>
