<template>
	<view class="orderCenterPage">

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


		<!-- <hx-navbar ref="hxnb" :config="configNav">
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
 -->
		<!-- 		<view class="banner">
			<view class="slot-height">

			</view>
			<view class="info-item">
				<view class="toDay">
					<text
						class="title">{{$t('user.report.account.change.query.time.today.text')}}{{$t('tabar.bet')}}</text>
					<text class="num">{{todayBetNum}}</text>
				</view>
		
			</view>
		</view> -->

		<view class="banner">
			<view class="date">
				{{todayBetDate | timestampStr | splitDate}}
			</view>
			<view class="toDay">
				<view class="title">{{$t('user.report.account.change.query.time.today.text')}}{{$t('tabar.bet')}}</view>
				<view class="num">{{todayBetNum}}</view>
			</view>
		</view>

		<mescroll-body ref="mescrollRef" top="0" :topbar="false" bottom="30px" :bottombar="true" :safearea="false"
			@init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">

			<view class="bet-data-item" v-for="(item, index) in dataList" :key="index">
				<view class="order-info" v-if="item.status !== 3">
					<view class="toplines">
						<view class="lefts">
							{{item.startTime | timestampStr | splitDate}}
						</view>
						<view class="imgs">
							<image src="../../static/images/toptixing.png" mode=""></image>
							<view class="matchname">
								{{item.allianceName}}
							</view>
						</view>
						<view class="right">
							{{item.startTime | timestampStr | splittTime}}
						</view>
					</view>
					<view class="constnts">
						<view class="hh">
							<image :src="item.mainLogo ? item.mainLogo:'../../static/images/default.png'" mode="">
							</image>
							<view class="fonts darkfontscolor">
								{{item.mainName}}
							</view>
						</view>
						<view class="vs">
							<view class="vsfontsstyle fontColor">
								VS
							</view>
						</view>
						<view class="cc">
							<view class="fonts darkfontscolor">
								{{item.guestName}}
							</view>
							<image :src="item.guestLogo ? item.guestLogo:'../../static/images/default.png'" mode="">
						</view>
					</view>
					<view class="sx">
						<span class="title">{{$t('order.center.show.detail.score.text')}}</span>
						<span class="score"> {{item.betScore}}</span>
						<span class="odd">@ {{item.betOdds}}%</span>
					</view>
					<view class="tableBoxBodyTBodyItem_detail_order">
						<!-- <view class="bet-title"
							style="background-image: linear-gradient(to right, rgb(82, 139, 255), rgba(255, 255, 255, 0));">
							<text class="title">{{$t('match.content.detail.title')}}</text>
						</view> -->

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
								{{$t('order.center.list.head.date.text')}}
							</view>
							<view class="tableBoxBodyTBodyItem_detail_order_item_content">
								{{item.createdAt | timestampStr}}
							</view>
						</view>

						<!-- <view class="tableBoxBodyTBodyItem_detail_order_item">
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
						</view> -->
						<view class="tableBoxBodyTBodyItem_detail_order_item ">
							<view class="tableBoxBodyTBodyItem_detail_order_item_label scoor">
								{{$t('order.center.show.detail.bet.num.text')}}
							</view>
							<view class="tableBoxBodyTBodyItem_detail_order_item_content scoor">
								{{item.betMoney | moneyFormat}}
							</view>
						</view>
						<!-- 	<view class="tableBoxBodyTBodyItem_detail_order_item">
							<view class="tableBoxBodyTBodyItem_detail_order_item_label">
								{{$t('order.center.show.detail.odds.text')}}
							</view>
							<view class="tableBoxBodyTBodyItem_detail_order_item_content">
								{{item.betOdds}}
							</view>
						</view> -->
						<!-- <view class="tableBoxBodyTBodyItem_detail_order_item">
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
						< <view class="tableBoxBodyTBodyItem_detail_order_item">
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
					</view> -->
						<view class="tableBoxBodyTBodyItem_detail_order_item" style="color: #1a1;">
							<view class="tableBoxBodyTBodyItem_detail_order_item_label">
								<!-- {{$t('order.center.show.detail.operate.text')}} -->
								{{$t('match.order.detail.estimate.profit.text')}}
							</view>
							<view class="tableBoxBodyTBodyItem_detail_order_item_label">
								{{item | yuguMoney}}
							</view>
							<view :class="item.lottStateBoolNum === 1 ? cancelOrderBtnClass : cancelOrderBtnClassUnable"
								@click="item.lottStateBoolNum === 1 ? cancelOrderClick(item) : null">
								{{$t('order.center.show.detail.operate.cancel.text')}}
							</view>
						</view>
					</view>



				</view>
			</view>
		</mescroll-body>
		<view class="zero-modal" :style="!isCancelModalBool ? 'display: none;':null">
			<view class="mask"
				:style="!isCancelModalBool ? 'background-color: rgba(0, 0, 0, 0);display:none':'background-color: rgba(0, 0, 0, .4);'"
				@click="isCancelModalBool = false">

			</view>
			<view class="zero-container"
				:style="!isCancelModalBool ? 'transform: scale(0.8);opacity: 0;':'transform: scale(1);opacity: 1;'">
				<view class="zero-top">
					<text class="title">{{$t('order.center.show.detail.operate.cancel.text')}}</text>
				</view>
				<view class="zero-content">
					<!-- <text class="con">{{$t('modal.cancel.bet.desc')}}</text> -->

					<view class="betContent">
						<view class="conts">
							<span class="title">{{$t('order.center.show.detail.score.text')}}</span>
							<span class="fonts darkfontscolor"> {{cancelItemObj.betScore}}</span>
							<span class="scx">@ {{cancelItemObj.betOdds}}%</span>
						</view>
						<view class="topheads">
							<span class="left">{{cancelItemObj.mainName}}</span>
							<span class="vs">VS</span>
							<span class="right">{{cancelItemObj.guestName}}</span>
						</view>
						<view class="lines">
							<view class="acfonts">
								{{cancelItemObj.allianceName}}
							</view>
							<view class="bcfonts">
								{{cancelItemObj.startTime | timestampStr }}
							</view>
						</view>

						<view class="lines">
							<view class="acfonts scoor">
								{{$t('order.center.show.detail.bet.num.text')}}
							</view>
							<view class="bcfonts scoor">
								{{cancelItemObj.betMoney | moneyFormat}}
							</view>
						</view>
						<view class="lines borderbottom">
							<view class="acfonts scoor" style="color: #1a1;">
								{{$t('match.order.detail.estimate.profit.text')}}
							</view>
							<view class="bcfonts scoor" style="color: #1a1;">
								{{cancelItemObj | yuguMoney}}
							</view>
						</view>

					</view>


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
		betsTodayReq,
		betInfoReq,
		unbetReq,
		noticeReq,
	} from '../../api/index.js'
	import {
		formatDateTimeSolt
	} from '../../common/publicTool.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	import MescrollBodyDiy from "@/uni_modules/mescroll-uni/components/mescroll-diy/football/mescroll-body.vue";
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin, myMixin], // 使用mixin
		components: {
			MescrollBodyDiy
		},
		data() {
			return {
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
				todayBetNum: '-',
				cancelItemObj: {},

				localLoginToken: null,
				todayBetDate: '',
				dataList: [],

				initSearchInputText: this.$t('order.center.search.where.all.text'),
				tabList: [],
				current: 0,
				navTitle: this.$t('tabar.bet'),
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
				queryTime: 1, //默认是今天
				queryType: 1, //默认是全部
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

				mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
				// 下拉刷新的配置(可选, 绝大部分情况无需配置)
				downOption: {

				},
				// 上拉加载的配置(可选, 绝大部分情况无需配置)
				upOption: {
					page: {
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						icon: "../../static/images/noData-c.png",
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
					0) { //未结算/已撤销
					return '--'
				} else if (value.status === 1 && value.statusSettlement === 1) { //已结算
					if (value.statusOpen === 1) { //赢的情况(已中奖)
						return value.winningAmount
					} else if (value.statusOpen === 2) { //输的情况
						return (value.winningAmount) * 1 - value.betMoney
					}
					// if (value.winningAmount > value.betMoney) { //赢的情况
					// 	return value.winningAmount
					// } else if (value.winningAmount === 0) { //输的情况
					// 	return (value.winningAmount) * 1 - value.betMoney
					// }
				}

			},
			yuguMoney(value) {
				//下注金额
				let temp_betMoney = value.betMoney / 100
				// 赔率
				let temp_betOdds = value.betOdds / 100
				// vip收益
				let temp_bonus = value.bonus / 100
				// 手续费
				let temp_chargeRate = value.chargeRate / 100


				// 计算
				// 1000*(收益%+vip%) *(1-手续费%)
				let finalMoney = (temp_betMoney * (temp_betOdds + temp_bonus)) * (1 - temp_chargeRate)
				// console.log("finalMoney", finalMoney);
				return finalMoney.toFixed(3)
			}
		},

		onShow() {

			// this.localLoginToken = this.$store.state.userInfo.token
			// this.localLoginToken = uni.getStorageSync('footballToken');

			// uni.pageScrollTo({
			// 	scrollTop: 0,
			// 	duration: 100,
			// });

			// 初始化语言
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

			// 获取系统通知
			this.initNoticeData()

			this.$nextTick(() => {
				this.mescroll.resetUpScroll();
			})
		},
		methods: {
			initLang() { //初始化语言

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

				this.navTitle = this.$t('tabar.bet')

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
						// 通过eventChannel向被打开页面传送数据	
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
						// 通过eventChannel向被打开页面传送数据	
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
						if (item.readStatus === 0) { //未读
							this.noticeNum = this.noticeNum + 1
						}
					})

				}
			},

			/*mescroll组件初始化的回调,可获取到mescroll对象 (此处可删,mixins已默认)*/
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},

			/*下拉刷新的回调, 重置列表为第一页 (此处可删,mixins已默认)*/
			downCallback() {
				this.dataList = []
				this.mescroll.resetUpScroll();
			},
			/*上拉加载的回调*/
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				// console.log("pageNum",pageNum);
				// console.log("pageSize",pageSize);
				this.getTodayOrderData(pageNum, pageSize)
			},
			/*若希望重新加载列表,只需调用此方法即可(内部会自动page.num=1,再主动触发up.callback)*/
			reloadList() {
				this.mescroll.resetUpScroll();
			},
			async getTodayOrderData(pageNum, pageSize) {
				// 动态更新全局配置
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
				let resR = await betsTodayReq(reqParam, this.localLoginToken)

				// console.log("resR",resR.data.results);
				let resArray = []
				if (resR.code === 200) {
					this.todayBetNum = 0
					this.todayBetNum = resR.data.totalCount

					resArray = resR.data.results
					if (resArray.length !== 0) {
						this.todayBetDate = resArray[0].createdAt
					} else {
						this.todayBetDate = Date.parse(new Date())
					}

					resArray.forEach((item, index) => {

						if (item.settlementTime === 0) {
							item.settlementTimeStr = "---"
						} else {
							item.settlementTimeStr = item.settlementTime
						}

						if (item.status === 1 && item.statusSettlement === 1) {
							item.detailOrderState = this.$t('order.center.show.detail.state.confirm.text')
							if (item.winningAmount > item.betMoney) { //赢的情况
								item.lottStateStr = this.$t('order.center.show.detail.lottey.status.win.text')
								item.lossNumStr = "+" + item.winningAmount
								item.lossNumStyleStr = "color:#28ffbb"
							} else if (item.winningAmount === 0) { //输的情况
								item.lottStateStr = this.$t(
									'order.center.show.detail.lottey.status.notwin.text')
								item.lossNumStr = (item.winningAmount) * 1 - item.betMoney
								item.lossNumStyleStr = "color:#FF0000"
							}
						} else if (item.status === 1) { //未开奖
							item.lossNumStr = '--'
							item.lottStateStr = this.$t('order.center.show.detail.lottey.status.norrizes.text')
							item.detailOrderState = this.$t('order.center.show.detail.state.confirm.text')
							item.lossNumStyleStr = "color:#ffffff"
						} else if (item.status === 3) { //已撤销		
							item.lossNumStr = '--'
							item.lottStateStr = '--'
							item.detailOrderState = this.$t('order.center.show.detail.state.cancel.text')
							item.lossNumStyleStr = "color:#ffffff"
						}

						// if (item.status !== 3) { //除了已撤销的都不统计(先这么写)
						// 	this.todayBetNum = this.todayBetNum + 1
						// }

						// 未开奖才能进行撤单操作
						if (item.status === 1 && item.statusSettlement === 0) {
							item.lottStateBoolNum = 1
						} else {
							item.lottStateBoolNum = 0
						}

						return item
					})

					// console.log("resArray", resArray);
					this.mescroll.endBySize(resR.data.results.length, resR.data.totalCount)
					//设置列表数据
					if (pageNum == 1) this.dataList = []; //如果是第一页需手动制空列表
					this.dataList = this.dataList.concat(resArray); //追加新数据
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

					//联网失败, 结束加载
					// this.mescroll.endErr();
				}

			},
			cancelOrderClick(item) {
				// console.log("item", item);
				this.cancelItemObj = item
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


	.banner {
		margin: 0 10px;
		margin-top: 5px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 5px 20px;
		align-items: center;
		border-radius: 9px;
		background: #fff;

		.date {
			font-size: 14px;
		}

		.toDay {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.title {
				color: #1a1;
				font-size: 16px;
				font-weight: 700;
			}

			.num {
				color: #1a1;
				font-size: 13px;
				font-weight: 700;
			}
		}
	}

	.bet-data-item {
		margin: 0 10px;
		margin-top: 8px;
		background-color: #ffffff;
		border-radius: 9px;

		.order-info {
			.toplines {
				display: flex;
				flex-direction: row;
				justify-content: space-between;

				.lefts {
					color: #929ec1;
					font-size: 12px;
					padding-top: 10px;
					padding-left: 10px;
					width: 90px;
				}

				.imgs {
					position: relative;

					image {
						width: 161.5px;
						height: 25.6px;
					}

					.matchname {
						position: absolute;
						left: 0;
						top: 0;
						bottom: 0;
						right: 0;
						color: #fff;
						font-weight: 700;
						font-size: 13px;
						text-align: center;
						height: 25.6px;
						line-height: 25.6px;
					}
				}

				.right {
					color: #929ec1;
					font-size: 12px;
					padding-top: 10px;
					padding-left: 10px;
					width: 90px;
					text-align: right;
					padding-right: 10px;
				}
			}

			.constnts {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 10px;

				.hh {
					display: flex;
					align-items: center;

					image {
						width: 34.5px;
						height: 34.5px;
					}

					.fonts {
						font-size: 12px;
						color: #929ec1;
						font-weight: 700;
						width: 70px;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						margin-left: 5px;
						text-align: right;
					}
				}

				.vs {
					// width: 10px;
					height: 20px;
					margin: 0 27.5px;

					.vsfontsstyle {
						font-size: 13px;
						font-weight: 700;
						font-family: DINProMedium;
						margin: 0 0.08rem;
						color: #4176f7;
					}
				}


				.cc {
					display: flex;
					align-items: center;

					image {
						width: 34.5px;
						height: 34.5px;
					}

					.fonts {
						font-size: 12px;
						color: #929ec1;
						font-weight: 700;
						width: 70px;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						margin-right: 5px;
						text-align: left;
					}
				}

			}

			.sx {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				margin-top: 5px;

				.title {
					color: #263440;
					font-size: 16px;
					font-weight: 700;
				}

				.score {
					color: #597ef8;
					font-size: 16px;
					font-weight: 700;
					margin: 0 10px;

				}

				.odd {
					color: #ee1c25;
					font-size: 16px;
					font-weight: 700;
				}
			}
		}
	}

	.tableBoxBodyTBodyItem_detail_order {
		margin: 0 10px;
		margin-top: 10px;
		/* background: url(/static/img/item-bg.png); */
		background-size: cover;
		border-radius: 10px;
		border-top-left-radius: 12px;
		overflow: hidden;
		/* z-index: 100; */
		color: #929ec1;

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
		// background-color: #171e25;
		height: 25px;
		width: 81px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.tableBoxBodyTBodyItem_detail_order_item_content {
		color: #333;
		font-weight: 700;
		font-size: 13px;
	}

	.scoor {
		color: #597ef7;
	}

	.cancelBtnView {
		// width: 80px;
		min-width: 56px;
		padding: 0 10px;
		height: 28px;
		color: #fff;
		text-align: center;
		line-height: 28px;
		font-size: 13px;
		background-color: #fe5635;
		border-radius: 4px 4px;
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
		border-radius: 2px;
		color: #333;
		font-weight: 700;
		font-size: 13px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 0.5px solid #e5e5e5;
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
		// height: 194px;
		height: 400px;
		background-color: #fff;
		position: absolute;
		left: 50%;
		margin-left: -43%;
		border-radius: 10px;
		top: 50%;
		margin-top: -200px;
		z-index: 1100;
		transition: all .3s ease;


		.zero-top {

			padding: 12px;
			display: flex;
			flex-direction: row;
			background: #fe5d4f;
			align-items: center;
			justify-content: center;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;

			.title {
				color: #fff;
				font-size: 16px;
				font-weight: 700;
			}
		}


		.zero-content {
			background: #fff;
			// border-radius: 0.16rem 0.16rem;
			// padding: 0.45333rem;
			word-break: break-all;
			display: flex;
			padding: 17px;

			.con {
				color: #eee;
			}

			.betContent {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 100%;

				.conts {
					font-size: 14px;
					color: #333;
					font-weight: 700;
					margin-bottom: 20px;
					// margin-top: 16px;

					.fonts {
						color: #1272c4;
						font-size: 13px;
						// display: inline-block;
						margin-right: 8px;
					}

					.scx {
						color: #ee1c25;
						font-size: .37333rem;
					}
				}

				.topheads {

					display: flex;
					justify-content: space-between;
					align-items: center;
					color: #333;
					text-align: center;
					margin-bottom: 23px;
					width: 100%;

					.left {}

					.vs {}

					.right {}
				}

				.borderbottom {
					border-bottom: 0.5px solid #eee;
				}

				.lines {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 10px 0;
					border-top: 0.5px solid #eee;
					width: 100%;

					.acfonts {
						// width: 4rem;
						font-size: 13px;
						color: #333;
						text-align: left;
					}

					.bcfonts {
						font-size: 13px;
						color: #333;
						text-align: left;
					}

					.scoor {
						color: #597ef7;
						font-weight: 700;
					}
				}

			}
		}

		.opera-btn {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			height: 44px;
			position: absolute;
			bottom: 30px;
			left: 0;
			width: 100%;
			padding: 0 17px;

			.btn {
				color: #ccc;
				// flex: 0 0 50%;
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;


			}

			.cancel {
				// border-right: 0.5px solid #3d4047;
				background: #f7fcfd;
				color: #597ef7;
				border: 1px solid #597ef7;
				border-radius: 6px;
				margin-right: 8px;
			}

			.confirm {
				border-radius: 6px;
				color: #fff;
				background: #597ef7;
			}
		}
	}
</style>
