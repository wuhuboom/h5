<template>
	<view class="orderCenterPage">
		<hx-navbar ref="hxnb" :config="configNav">
			<block slot="left">
				<view class="left-icon" style="" @click="goToServerBtnClick">
					<image src="../../static/images/service.svg" mode="" class="lianmeng"></image>
				</view>
			</block>
			<block slot="center">
				<view class="">
					{{$t('tabar.bet')}}
				</view>
			</block>
			<block slot="right">
				<view class="right-icon" style="" @click="toNoticeClick">
					<image src="../../static/images/anount.svg" mode="" class="lianmeng"></image>
					<view class="diot" v-if="noticeNum">

					</view>
				</view>
			</block>
		</hx-navbar>

		<view class="bg">

		</view>

		<view class="banner">
			<view class="slot-height">

			</view>
			<view class="info-item">
				<view class="toDay">
					<text
						class="title">{{$t('user.report.account.change.query.time.today.text')}}{{$t('tabar.bet')}}</text>
					<text class="num">{{todayBetNum}}</text>
				</view>
				<!-- <view class="week">

				</view>
				<view class="week_get">

				</view> -->
			</view>
		</view>

		<view class="bet-data-item" style="min-height: 400px;">
			<view class="order-info">
				<mescroll-body ref="mescrollRef" top="0" :topbar="false" bottom="0" :bottombar="true" :safearea="false"
					@init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">

					<view class="tableBoxBodyTBodyItem_detail_order" v-for="(item, index) in dataList" :key="index">
						<view class="bet-title"
							style="background-image: linear-gradient(to right, rgb(82, 139, 255), rgba(255, 255, 255, 0));">
							<text class="title">{{$t('match.content.detail.title')}}</text>
						</view>
						<view class="tableBoxBodyTBodyItem_detail_order_item">
							<view class="tableBoxBodyTBodyItem_detail_order_item_label">
								{{$t('order.center.show.detail.order.num.text')}}
							</view>
							<view class="tableBoxBodyTBodyItem_detail_order_item_content">
								{{item.orderNo}}
							</view>
						</view>
						<view class="tableBoxBodyTBodyItem_detail_order_item">
							<view class="tableBoxBodyTBodyItem_detail_order_item_label">
								{{$t('order.center.show.detail.team.text')}}
							</view>
							<view class="tableBoxBodyTBodyItem_detail_order_item_content">
								{{item.gameInfo}}
							</view>
						</view>
						<view class="tableBoxBodyTBodyItem_detail_order_item">
							<view class="tableBoxBodyTBodyItem_detail_order_item_label">
								{{$t('order.center.show.detail.score.text')}}
							</view>
							<view class="tableBoxBodyTBodyItem_detail_order_item_content">
								{{item.betScore}}
							</view>
						</view>
						<view class="tableBoxBodyTBodyItem_detail_order_item">
							<view class="tableBoxBodyTBodyItem_detail_order_item_label">
								{{$t('order.center.show.detail.screenings.text')}}
							</view>
							<view class="tableBoxBodyTBodyItem_detail_order_item_content">
								{{$t('order.center.show.detail.screenings.full.text')}}
							</view>
						</view>
						<view class="tableBoxBodyTBodyItem_detail_order_item">
							<view class="tableBoxBodyTBodyItem_detail_order_item_label">
								{{$t('order.center.show.detail.state.text')}}
							</view>
							<view class="tableBoxBodyTBodyItem_detail_order_item_content">
								{{item.detailOrderState}}
							</view>
						</view>
						<view class="tableBoxBodyTBodyItem_detail_order_item">
							<view class="tableBoxBodyTBodyItem_detail_order_item_label">
								{{$t('order.center.show.detail.bet.num.text')}}
							</view>
							<view class="tableBoxBodyTBodyItem_detail_order_item_content bet-num">
								{{item.betMoney | moneyFormat}}
							</view>
						</view>
						<view class="tableBoxBodyTBodyItem_detail_order_item">
							<view class="tableBoxBodyTBodyItem_detail_order_item_label">
								{{$t('order.center.show.detail.odds.text')}}
							</view>
							<view class="tableBoxBodyTBodyItem_detail_order_item_content">
								{{item.betOdds}}
							</view>
						</view>
						<view class="tableBoxBodyTBodyItem_detail_order_item">
							<view class="tableBoxBodyTBodyItem_detail_order_item_label">
								{{$t('order.center.show.detail.loss.text')}}
							</view>
							<view class="tableBoxBodyTBodyItem_detail_order_item_content" :style="lossNumStyleStr">
								{{item.lossNumStr | moneyFormat}}
							</view>
						</view>
						<view class="tableBoxBodyTBodyItem_detail_order_item">
							<view class="tableBoxBodyTBodyItem_detail_order_item_label">
								{{$t('order.center.show.detail.lottey.status.text')}}
							</view>
							<view class="tableBoxBodyTBodyItem_detail_order_item_content">
								{{item.lottStateStr}}
							</view>
						</view>
						<view class="tableBoxBodyTBodyItem_detail_order_item">
							<view class="tableBoxBodyTBodyItem_detail_order_item_label">
								{{$t('order.center.show.detail.start.time.text')}}
							</view>
							<view class="tableBoxBodyTBodyItem_detail_order_item_content">
								{{item.startTime | timestampStr}}
							</view>
						</view>
						<view class="tableBoxBodyTBodyItem_detail_order_item">
							<view class="tableBoxBodyTBodyItem_detail_order_item_label">
								{{$t('order.center.show.detail.settlement.time.text')}}
							</view>
							<view class="tableBoxBodyTBodyItem_detail_order_item_content">
								{{item.settlementTimeStr | timestampStr}}
							</view>
						</view>
						<view class="tableBoxBodyTBodyItem_detail_order_item">
							<view class="tableBoxBodyTBodyItem_detail_order_item_label">
								{{$t('order.center.show.detail.operate.text')}}
							</view>
							<view :class="item.lottStateBoolNum === 1 ? cancelOrderBtnClass : cancelOrderBtnClassUnable"
								@click="item.lottStateBoolNum === 1 ? cancelOrderClick(item) : null">
								{{$t('order.center.show.detail.operate.cancel.text')}}
							</view>
						</view>
					</view>

				</mescroll-body>

			</view>
		</view>

		<view class="zero-modal" :style="!isCancelModalBool ? 'display: none;':null">
			<view class="mask"
				:style="!isCancelModalBool ? 'background-color: rgba(0, 0, 0, 0);display:none':'background-color: rgba(0, 0, 0, .4);'"
				@click="isCancelModalBool = false">

			</view>
			<view class="zero-container"
				:style="!isCancelModalBool ? 'transform: scale(0.8);opacity: 0;':'transform: scale(1);opacity: 1;'">
				<view class="zero-top" style="justify-content: left;">
					<text class="title">{{$t('modal.title')}}</text>
				</view>
				<view class="zero-content" style="justify-content: left;">
					<text class="con">{{$t('modal.cancel.bet.desc')}}</text>
				</view>
				<view class="opera-btn">
					<view class="btn cancel" @click="isCancelModalBool = false">
						{{$t('modal.cancel.text')}}
					</view>
					<view class="btn confirm" @click="confirmCancelClick">
						{{$t('modal.confirm.text')}}
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		betsReq,
		betInfoReq,
		unbetReq,
		noticeReq
	} from '../../api/index.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	import MescrollBodyDiy from "@/uni_modules/mescroll-uni/components/mescroll-diy/football/mescroll-body.vue";
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin, myMixin], // ??????mixin
		components: {
			MescrollBodyDiy
		},
		data() {
			return {
				configNav: {
					// title: this.$t('tabar.bet'),
					fixed: true,
					color: '#ffffff',
					//????????????;????????????????????????0-1???;???????????????????????????array?????????????????????string??????????????????
					backgroundColor: [0, ['171E25']],
					// ??????????????????????????????????????????????????????????????????????????????????????????????????????????????? Scroll ??????
					slideBackgroundColor: [1, ['171E25']],
					// ????????? ???????????????????????????
					statusBarBackground: ['', '#ffffff'],
					back: false,
					leftSlot: true,
					rightSlot: true,
				},
				todayBetNum: '-',


				localLoginToken: null,

				dataList: [],

				initSearchInputText: this.$t('order.center.search.where.all.text'),
				tabList: [],
				current: 0,
				navTitle: this.$t('order.center.nav.title.text'),
				showListBool: false,
				arrowClass: 'iconfont icon-arrow-down rightArrow',
				arrowClassActive: 'iconfont icon-arrow-down rightArrow rightArrowActive',
				inputSearchListItemArray: [{
					nameStr: this.$t('order.center.search.where.all.text'),
				}, {
					nameStr: this.$t('order.center.search.where.fbd.text'),
				}],
				currentIndex: 0,
				detailMaskBool: false,
				isCancelModalBool: false,
				pageNo: 1,
				pageSize: 10,
				queryTime: 1, //???????????????
				queryType: 1, //???????????????
				// detailsListBool:false
				beginTimeStr: null,
				settlementTimeStr: null,
				scoreNumStr: null,
				allianceNameStr: null,
				orderNumStr: null,
				detailOrderState: null,
				betMoneyNum: null,
				oddNumStr: null,
				lossNumStr: null,
				lottStateStr: null,
				lossNumStyleStr: null,
				cancelOrderBtnClass: 'tableBoxBodyTBodyItem_detail_order_item_content cancelBtnView',
				cancelOrderBtnClassUnable: 'tableBoxBodyTBodyItem_detail_order_item_content ',
				lottStateBoolNum: 1,
				cancelOrderBetId: 0,
				urlFromStr: '',
				currQueryDetailId: '',
				noticeNum: 0,

				mescroll: null, // mescroll???????????? (????????????,mixins?????????)
				// ?????????????????????(??????, ??????????????????????????????)
				downOption: {

				},
				// ?????????????????????(??????, ??????????????????????????????)
				upOption: {
					page: {
						size: 10 // ?????????????????????,??????10
					},
					noMoreSize: 5, // ???????????????????????????????????????5????????????'-- END --'?????????
					empty: {
						icon: "../../static/images/noData-c.svg",
						tip: 'Absolutely empty'
					},
					textLoading: 'Loading',
					textNoMore: '-- End --'
				}
			}
		},
		filters: {

			statusToStr(value) {
				if (value.status === 1 && value.statusSettlement === 0 || value.status === 3 && value.statusSettlement ===
					0) { //?????????/?????????
					return '--'
				} else if (value.status === 1 && value.statusSettlement === 1) { //?????????
					if (value.statusOpen === 1) { //????????????(?????????)
						return value.winningAmount
					} else if (value.statusOpen === 2) { //????????????
						return (value.winningAmount) * 1 - value.betMoney
					}
					// if (value.winningAmount > value.betMoney) { //????????????
					// 	return value.winningAmount
					// } else if (value.winningAmount === 0) { //????????????
					// 	return (value.winningAmount) * 1 - value.betMoney
					// }
				}

			}
		},

		onShow() {

			// this.localLoginToken = this.$store.state.userInfo.token
			// this.localLoginToken = uni.getStorageSync('footballToken');

			uni.pageScrollTo({
				scrollTop: 0,
				duration: 100,
			});

			// ???????????????
			this.initLang()

			this.queryTime = 1
			this.queryType = 1
			this.dataList = []

			// // #ifndef APP-NVUE
			// const eventChannel = this.getOpenerEventChannel();
			// // #endif
			// eventChannel.on('eventOrderClick', (data) => {
			// 	this.urlFromStr = data.from
			// })

			// ??????????????????
			this.initNoticeData()

			this.$nextTick(() => {
				this.mescroll.resetUpScroll();
			})
		},
		methods: {
			initLang() { //???????????????

				let langStr = uni.getStorageSync('ft_lang')
				// console.log("lang", langStr);
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


				this.initSearchInputText = this.$t('order.center.search.where.all.text')
				this.tabList = [{
					name: this.$t('order.center.tab.nearlySeven.title.text'),
				}, {
					name: this.$t('order.center.tab.nearlyTen.title.text'),
				}, {
					name: this.$t('order.center.tab.nearlyThirty.title.text'),
				}]

				this.navTitle = this.$t('order.center.nav.title.text')

				this.inputSearchListItemArray = [{
					nameStr: this.$t('order.center.search.where.all.text'),
				}, {
					nameStr: this.$t('order.center.search.where.fbd.text'),
				}]


			},
			goToServerBtnClick() {
				uni.navigateTo({
					url: '/pages/customer/index',
					success: (res) => {
						// ??????eventChannel??????????????????????????????	
						uni.setStorageSync('querySeverCustomUrlFrom', 'order_l');
						res.eventChannel.emit('querySeverCustomUrlFrom', {
							from: 'order_l'
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
						// ??????eventChannel??????????????????????????????	
						uni.setStorageSync('queryNoticListUrlFrom', 'order_l');
						res.eventChannel.emit('userNoticeClick', {
							from: 'order_l'
						})
					},
					animationType: 'slide-in-top',
					animationDuration: 200
				})
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
						if (item.readStatus === 0) { //??????
							this.noticeNum = this.noticeNum + 1
						}
					})

				}
			},
			onPageScroll(e) {
				// ???????????????????????????????????????
				this.$refs.hxnb.pageScroll(e);
			},
			/*mescroll????????????????????????,????????????mescroll?????? (????????????,mixins?????????)*/
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},

			/*?????????????????????, ???????????????????????? (????????????,mixins?????????)*/
			downCallback() {
				this.dataList = []
				this.mescroll.resetUpScroll();
			},
			/*?????????????????????*/
			upCallback(page) {
				let pageNum = page.num; // ??????, ?????????1??????
				let pageSize = page.size; // ??????, ????????????10???
				// console.log("pageNum",pageNum);
				// console.log("pageSize",pageSize);
				this.getTodayOrderData(pageNum, pageSize)
			},
			/*???????????????????????????,???????????????????????????(???????????????page.num=1,???????????????up.callback)*/
			reloadList() {
				this.mescroll.resetUpScroll();
			},
			async getTodayOrderData(pageNum, pageSize) {
				// ????????????????????????
				uni.$emit("setMescrollGlobalOption", {
					down: {
						textInOffset: this.$t('alert.textInOffset'),
						textOutOffset: this.$t('alert.textOutOffset'),
						textLoading: this.$t('alert.loading'),
						textSuccess: this.$t('alert.textSuccess'),
						textErr: this.$t('alert.textErr'),
					},
					up: {
						empty: {
							tip: this.$t('alert.absolutely.empty')
						},
						textNoMore: this.$t('alert.nomore'),
						textLoading: this.$t('alert.loading')
					},
				})
				let reqParam = {}
				reqParam.time = this.queryTime
				reqParam.type = this.queryType
				reqParam.pageNo = pageNum
				reqParam.pageSize = pageSize
				let resR = await betsReq(reqParam, this.localLoginToken)

				// console.log("resR",resR.data.results);
				let resArray = []
				if (resR.code === 200) {
					this.todayBetNum = resR.data.totalCount
					resArray = resR.data.results

					resArray.forEach((item, index) => {

						if (item.settlementTime === 0) {
							item.settlementTimeStr = "---"
						} else {
							item.settlementTimeStr = item.settlementTime
						}

						if (item.status === 1 && item.statusSettlement === 1) { //?????????
							item.detailOrderState = this.$t('order.center.show.detail.state.confirm.text')
							if (item.winningAmount > item.betMoney) { //????????????
								item.lottStateStr = this.$t('order.center.show.detail.lottey.status.win.text')
								item.lossNumStr = "+" + item.winningAmount
								item.lossNumStyleStr = "color:#28ffbb"
							} else if (item.winningAmount === 0) { //????????????
								item.lottStateStr = this.$t(
									'order.center.show.detail.lottey.status.notwin.text')
								item.lossNumStr = (item.winningAmount) * 1 - item.betMoney
								item.lossNumStyleStr = "color:#FF0000"
							}
						} else if (item.status === 1) { //?????????
							item.lossNumStr = '--'
							item.lottStateStr = this.$t('order.center.show.detail.lottey.status.norrizes.text')
							item.detailOrderState = this.$t('order.center.show.detail.state.confirm.text')
							item.lossNumStyleStr = "color:#ffffff"
						} else if (item.status === 3) { //?????????		
							item.lossNumStr = '--'
							item.lottStateStr = '--'
							item.detailOrderState = this.$t('order.center.show.detail.state.cancel.text')
							item.lossNumStyleStr = "color:#ffffff"
						}

						// ?????????????????????????????????????????????
						if (item.status === 1 && item.statusSettlement === 0) {
							item.lottStateBoolNum = 1
						} else {
							item.lottStateBoolNum = 0
						}

						return item
					})

					// console.log("resArray", resArray);
					this.mescroll.endBySize(resR.data.results.length, resR.data.totalCount)
					//??????????????????
					if (pageNum == 1) this.dataList = []; //???????????????????????????????????????
					this.dataList = this.dataList.concat(resArray); //???????????????
				} else if (resR.code === 402 || resR.code === 403) {
					resArray = []
					this.logout()
					// this.$refs.uToast.show({
					// 	title: resR.msg,
					// 	url: '/pages/login/login',
					// })
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
				} else {
					resArray = []

					//????????????, ????????????
					// this.mescroll.endErr();
				}

			},
			cancelOrderClick(item) {
				// console.log("item", item);
				this.cancelOrderBetId = item.id
				if (this.cancelOrderBetId !== 0) {
					this.isCancelModalBool = true
				}
			},
			async confirmCancelClick() {
				let reqParam = {}
				reqParam.betId = this.cancelOrderBetId
				let resR = await unbetReq(reqParam, this.localLoginToken)
				if (resR.code === 200) {
					this.isCancelModalBool = false
					this.dataList = []
					this.mescroll.resetUpScroll();
				}

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

	.orderCenterPage {
		.left-icon {
			padding-left: 10px;
		}

		.lianmeng {
			width: 28px;
			height: 28px;
			margin-top: 7px;
		}

		.right-icon {
			padding-right: 10px;
			position: relative;

			.diot {
				position: absolute;
				width: 6px;
				height: 6px;
				background-color: #b33a3a;
				border-radius: 50%;
				right: 17px;
				top: 12px;
			}
		}

		.bg {
			height: 242px;
			background: url(../../static/images/bg-bet.png) no-repeat;
			background-size: 110% 110%;
			background-position: -10px -50px;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 0;
		}

		.banner {
			width: 100%;
			height: 150px;
			position: relative;
			z-index: 99;

			.slot-height {
				height: 88px;
			}

			.info-item {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-items: center;

				view {
					display: flex;
					flex-direction: column;

					.title {
						color: #fff;
						font-size: 13px;
					}

					.num {
						color: #ffbd00;
						font-size: 16px;
						text-align: center;
						padding-top: 10px;
						font-weight: 600;
					}
				}
			}
		}

		.bet-data-item {
			background-color: #161d24;
			width: 100%;
			border-top-left-radius: 15px;
			border-top-right-radius: 15px;
			position: relative;
			z-index: 99;
			padding-bottom: 15px;

			.order-info {
				padding: 17px;
			}
		}

	}

	.tableBoxBodyTBodyItem_detail_order {
		margin-top: 10px;
		background: url(../../static/images/item-bg.png);
		background-size: cover;
		border-radius: 10px;
		border-top-left-radius: 12px;
		overflow: hidden;
		/* z-index: 100; */
		color: #fff;

		.bet-title {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			height: 34px;
			padding: 0 15px;

			.title {
				font-size: 14px;
				color: #fff;
			}
		}


	}

	.bet-num {
		background-color: #171e25;
		height: 25px;
		width: 81px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.tableBoxBodyTBodyItem_detail_order_item_content {
		color: #828ca3
	}

	.cancelBtnView {
		width: 80px;
		height: 28px;
		color: #fff;
		text-align: center;
		line-height: 28px;
		font-size: 13px;
		background-color: rgb(82, 139, 255);
	}




	.tableBoxBodyTBodyItem_detail_order_tit {
		text-align: center;
		font-size: 16px;
		font-weight: 700;
		padding-top: 10px;

	}

	.tableBoxBodyTBodyItem_detail_order_timeScoreTeam {
		font-size: 14px;
		text-align: center;
	}

	.tableBoxBodyTBodyItem_detail_order_score {
		padding: 10px 0;
	}

	.tableBoxBodyTBodyItem_detail_order_score text {
		color: #3d8dfe;
	}

	.tableBoxBodyTBodyItem_detail_order_team {
		padding-bottom: 9px;
		font-size: 14px;
		font-weight: bold;
	}

	.tableBoxBodyTBodyItem_detail_order_item {
		height: 42px;
		// background: #334756;
		padding: 0 20px;
		border-radius: 2px;
		color: #fff;
		// margin: 10px;
		font-weight: 500;
		font-size: 12px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tableBoxBodyTBodyItem_detail_order_btn_top {
		position: absolute;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.tableBoxBodyTBodyItem_detail_order_btn {
		width: 100%;
		height: 50px;
		line-height: 50px;
		background: #3d8dfe;
		text-align: center;
		color: #fff;
		// border-radius: 10px;
		font-size: 16px;
		font-family: Alibaba PuHuiTi;
		font-weight: 400;
	}



	.zero-modal {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1100;

		.mask {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 1100;
			transition: all .3s ease;
		}
	}

	.zero-container {
		width: 86%;
		height: 194px;
		background-color: #292d34;
		position: absolute;
		left: 50%;
		margin-left: -43%;
		border-radius: 5px;
		top: 50%;
		margin-top: -97px;
		z-index: 1100;
		transition: all .3s ease;


		.zero-top {
			padding: 12px;
			display: flex;
			flex-direction: row;
			border-bottom: 0.5px solid #3d4047;

			.title {
				color: #eee;
				font-size: 16px;
				font-weight: 600;
			}
		}

		.zero-content {
			word-break: break-all;
			display: flex;
			padding: 12px;

			.con {
				color: #eee;
			}
		}

		.opera-btn {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			height: 44px;
			border-top: 0.5px solid #3d4047;
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;

			.btn {
				color: #ccc;
				flex: 0 0 50%;
				display: flex;
				justify-content: center;
				align-items: center;


			}

			.cencal {
				border-right: 0.5px solid #3d4047;
			}

			.confirm {
				color: #ffbd00;
			}
		}
	}
</style>
