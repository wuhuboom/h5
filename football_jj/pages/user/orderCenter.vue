<template>
	<view class="orderCenterPage">
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

		<!-- 
		<uni-nav-bar backgroundColor="#00111C" color="#fff" :statusBar="true" :border="false"
			@clickLeft="goBackBtnClick" style="font-weight: 600;" :fixed="true">
			<block slot="left">
				<view class="navLeftBtn">
					<image src="../../static/images/back.svg" mode=""></image>
				</view>
			</block>

			<view class="navTitleCenter">{{navTitle}}</view>
		</uni-nav-bar> -->

		<u-tabs :list="tabList" :is-scroll="false" :current="current" :gutter="30" :bold="true" font-size="28"
			:item-width="200" :bar-width="140" :bar-height="2" inactive-color="#a5a9b2" active-color="#507ef6"
			@change="tabChange"></u-tabs>

		<view class="user_container">
			<view class="tableBox">
				<view class="tableBoxCenterTitle">
					<view class="tableBoxCenterTitleItem">
						{{$t('order.center.list.head.date.text')}}
					</view>
					<view class="tableBoxCenterTitleItem">
						{{$t('order.center.list.head.bet.text')}}
					</view>
					<view class="tableBoxCenterTitleItem">
						{{$t('order.center.list.head.loss.text')}}
					</view>
					<view class="tableBoxCenterTitleItem">
						{{$t('order.center.list.head.detail.text')}}
					</view>
				</view>
				<view class="tableBoxBody">
					<mescroll-uni ref="mescrollRef" :fixed="true" height="900" top="0" :topbar="false" bottom="0"
						:bottombar="true" :safearea="false" @init="mescrollInit" @down="downCallback" @up="upCallback"
						:down="downOption" :up="upOption">

						<view class="tableBoxBodyTBody" v-for="(item, index) in dataList" :key="index">
							<view class="tableBoxBodyTBodyItem tBodyItemDate">
								{{item.createdAt | timestampStrSlice}}
							</view>
							<view class="tableBoxBodyTBodyItem tBodyItemBet">
								<!-- {{item.betMoney | moneyFormat}} ({{item.id}}) -->
								{{item.betMoney | moneyFormat}}
							</view>
							<view class="tableBoxBodyTBodyItem tBodyItemLoss"
								:style="item.status === 1 && item.statusSettlement === 1 && item.statusOpen === 1 ? 'color:#11a983' : item.status === 1 && item.statusSettlement === 1 && item.statusOpen === 2 ? 'color:#ff0000':'color:#333'">
								{{item|statusToStr|moneyFormat}}
							</view>
							<view class="tableBoxBodyTBodyItem" style="font-weight: 700;"
								@click="tableBoxBodyTBodyItemDetailClick(item)">
								{{$t('order.center.list.head.detail.text')}}
							</view>
						</view>

					</mescroll-uni>

				</view>
			</view>
		</view>

		<!-- ?????? -->
		<view class="tableBoxBodyTBodyItem_detail_mask" v-if="detailMaskBool" @click="detailMaskClick">

		</view>
		<!-- name="mybox" -->
		<!-- 	 <transition >
			
		 </transition > -->


		<!--
			0.????????? 1????????? 2????????? 3 ????????? 4????????? status
			0????????? 1????????? statusSettlement
			0????????? 1????????? 2?????????  statusOpen
		 -->
		<view class="tableBoxBodyTBodyItem_detail_order" v-if="detailMaskBool">
			<view class="bet-title">
				<text class="title">{{$t('match.content.detail.title')}}</text>
			</view>
			<scroll-view scroll-y="true" style="height: 355px;">
				<view class="tableBoxBodyTBodyItem_detail_order_item">
					<view class="tableBoxBodyTBodyItem_detail_order_item_label">
						{{$t('order.center.show.detail.order.num.text')}}
					</view>
					<view class="tableBoxBodyTBodyItem_detail_order_item_content">
						{{orderNumStr}}
					</view>
				</view>
				<view class="tableBoxBodyTBodyItem_detail_order_item">
					<view class="tableBoxBodyTBodyItem_detail_order_item_label">
						{{$t('order.center.show.detail.team.text')}}
					</view>
					<view class="tableBoxBodyTBodyItem_detail_order_item_content">
						{{allianceNameStr}}
					</view>
				</view>
				<view class="tableBoxBodyTBodyItem_detail_order_item">
					<view class="tableBoxBodyTBodyItem_detail_order_item_label">
						{{$t('order.center.show.detail.score.text')}}
					</view>
					<view class="tableBoxBodyTBodyItem_detail_order_item_content">
						{{scoreNumStr}}
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
						{{detailOrderState}}
					</view>
				</view>
				<view class="tableBoxBodyTBodyItem_detail_order_item">
					<view class="tableBoxBodyTBodyItem_detail_order_item_label">
						{{$t('order.center.show.detail.bet.num.text')}}
					</view>
					<view class="tableBoxBodyTBodyItem_detail_order_item_content bet-num">
						{{betMoneyNum | moneyFormat}}
					</view>
				</view>
				<view class="tableBoxBodyTBodyItem_detail_order_item">
					<view class="tableBoxBodyTBodyItem_detail_order_item_label">
						{{$t('order.center.show.detail.odds.text')}}
					</view>
					<view class="tableBoxBodyTBodyItem_detail_order_item_content">
						{{oddNumStr}}
					</view>
				</view>
				<view class="tableBoxBodyTBodyItem_detail_order_item">
					<view class="tableBoxBodyTBodyItem_detail_order_item_label">
						{{$t('order.center.show.detail.loss.text')}}
					</view>
					<view class="tableBoxBodyTBodyItem_detail_order_item_content" :style="lossNumStyleStr">
						{{lossNumStr | moneyFormat}}
					</view>
				</view>
				<view class="tableBoxBodyTBodyItem_detail_order_item">
					<view class="tableBoxBodyTBodyItem_detail_order_item_label">
						{{$t('order.center.show.detail.lottey.status.text')}}
					</view>
					<view class="tableBoxBodyTBodyItem_detail_order_item_content">
						{{lottStateStr}}
					</view>
				</view>
				<view class="tableBoxBodyTBodyItem_detail_order_item">
					<view class="tableBoxBodyTBodyItem_detail_order_item_label">
						{{$t('order.center.show.detail.start.time.text')}}
					</view>
					<view class="tableBoxBodyTBodyItem_detail_order_item_content">
						{{beginTimeStr | timestampStr}}
					</view>
				</view>
				<view class="tableBoxBodyTBodyItem_detail_order_item">
					<view class="tableBoxBodyTBodyItem_detail_order_item_label">
						{{$t('order.center.show.detail.settlement.time.text')}}
					</view>
					<view class="tableBoxBodyTBodyItem_detail_order_item_content">
						{{settlementTimeStr | timestampStr}}
					</view>
				</view>
				<view class="tableBoxBodyTBodyItem_detail_order_item">
					<view class="tableBoxBodyTBodyItem_detail_order_item_label">
						{{$t('order.center.show.detail.operate.text')}}
					</view>
					<view :class="lottStateBoolNum === 1 ? cancelOrderBtnClass : cancelOrderBtnClassUnable"
						@click="lottStateBoolNum === 1 ? cancelOrderClick() : null">
						{{$t('order.center.show.detail.operate.cancel.text')}}
					</view>
				</view>
			</scroll-view>
			<view class="tableBoxBodyTBodyItem_detail_order_btn_top">
				<!-- <view class="tableBoxBodyTBodyItem_detail_order_cancel_btn">
					{{$t('modal.cancel.text')}}
				</view> -->
				<view class="tableBoxBodyTBodyItem_detail_order_btn " @click="closureClick">
					{{$t('order.center.show.detail.btn.closure.text')}}
				</view>
			</view>
		</view>

		<view class="zero-modal" :style="!isCancelModalBool ? 'display: none;':null">
			<view class="mask"
				:style="!isCancelModalBool ? 'background-color: rgba(0, 0, 0, 0);display:none':'background-color: rgba(0, 0, 0, .4);'"
				@click="isCancelModalBool = false">

			</view>
			<view class="zero-container"
				:style="!isCancelModalBool ? 'transform: scale(0.8);opacity: 0;':'transform: scale(1);opacity: 1;'">
				<view class="zero-top" style="justify-content: center;">
					<text class="title">{{$t('modal.title')}}</text>
				</view>
				<view class="zero-content" style="justify-content: center;">
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


		<show-modal ref=" testRef">
		</show-modal>
	</view>
</template>

<script>
	import {
		betsReq,
		betInfoReq,
		unbetReq,
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

			// ???????????????
			this.initLang()

			this.current = 0
			this.queryTime = 3
			this.queryType = 1
			this.dataList = []

			// // ????????????????????????
			// this.getTodayOrderData(this.pageNo, this.pageSize)

			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			eventChannel.on('eventOrderClick', (data) => {
				this.urlFromStr = data.from
			})


		},
		methods: {
			initLang() { //???????????????

				let langStr = uni.getStorageSync('ft_lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr

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
				// reqParam.pageNo = this.pageNo
				reqParam.pageNo = pageNum
				// reqParam.pageSize = this.pageSize
				reqParam.pageSize = pageSize
				let resR = await betsReq(reqParam, this.localLoginToken)

				// console.log("resR",resR.data.results);
				let resArray
				if (resR.code === 200) {
					resArray = resR.data.results
					this.mescroll.endBySize(resR.data.results.length, resR.data.totalCount)
					//??????????????????
					if (pageNum == 1) this.dataList = []; //???????????????????????????????????????
					this.dataList = this.dataList.concat(resR.data.results); //???????????????
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
			searchWhereBtnClick() {
				// this.current = index;
				// this.queryTime = index + 1
				this.pageNo = 1
				this.pageSize = 10
				this.dataList = []
				this.stopLoadMoreDataBool = false
				// this.getTodayOrderData(this.pageNo,this.pageSize)
				this.mescroll.resetUpScroll();
			},
			tabChange(index) {
				this.showListBool = false
				this.current = index;
				if (index === 0) {
					this.queryTime = 3
				} else if (index === 1) {
					this.queryTime = 4
				} else if (index === 2) {
					this.queryTime = 5
				}
				this.pageNo = 1
				this.pageSize = 10
				this.dataList = []
				this.stopLoadMoreDataBool = false
				// this.getTodayOrderData(this.pageNo,this.pageSize)
				this.mescroll.resetUpScroll();
			},
			goBackBtnClick() {

				uni.switchTab({
					url: '/pages/funList/index',
					animationType: 'slide-in-top',
					animationDuration: 200
				})

				// const queryOrderCenterUrlFrom = uni.getStorageSync('queryOrderCenterUrlFrom') || 'other'
				// // console.log("queryMatchContentItemUrlFrom",queryMatchContentItemUrlFrom);
				// if (!this.matchContent_Bool) {
				// 	this.urlFromStr = queryOrderCenterUrlFrom
				// }

				// if (this.urlFromStr === "user") {
				// 	uni.switchTab({
				// 		url: '/pages/user/user',
				// 		animationType: 'slide-in-top',
				// 		animationDuration: 200
				// 	})
				// } else if (this.urlFromStr === "report") {
				// 	uni.navigateTo({
				// 		url: '/pages/user/report_management',
				// 		animationType: 'slide-in-top',
				// 		animationDuration: 200
				// 	})
				// }



			},
			searchBoxListClick() {
				this.showListBool = !this.showListBool
			},
			inputSearchListItemClick(item, index) {
				// console.log("index",index);
				this.initSearchInputText = item.nameStr
				this.currentIndex = index;
				this.queryType = index + 1
			},
			async tableBoxBodyTBodyItemDetailClick(item) {
				// console.log("item", item);
				this.currQueryDetailId = item.id
				uni.showLoading({
					title: this.$t('loading.msg.text'),
				})

				let reqParam = {}
				reqParam.betId = item.id
				let resR = await betInfoReq(reqParam, this.localLoginToken)
				uni.hideLoading();
				// console.log("resR",resR);
				if (resR.code === 200) {

					this.beginTimeStr = resR.data.game.startTime
					this.scoreNumStr = resR.data.odds.scoreHome + "-" + resR.data.odds.scoreAway
					this.allianceNameStr = resR.data.betinfo.gameInfo
					this.orderNumStr = resR.data.betinfo.orderNo
					this.betMoneyNum = resR.data.betinfo.betMoney

					if (resR.data.betinfo.settlementTime === 0) {
						this.settlementTimeStr = "---"
					} else {
						this.settlementTimeStr = resR.data.betinfo.settlementTime
					}
					if (resR.data.betinfo.status === 1 && resR.data.betinfo.statusSettlement === 1) { //?????????
						this.detailOrderState = this.$t('order.center.show.detail.state.confirm.text')
						if (resR.data.betinfo.winningAmount > resR.data.betinfo.betMoney) { //????????????
							this.lottStateStr = this.$t('order.center.show.detail.lottey.status.win.text')
							this.lossNumStr = "+" + resR.data.betinfo.winningAmount
							this.lossNumStyleStr = "color:#11a983"
						} else if (resR.data.betinfo.winningAmount === 0) { //????????????
							this.lottStateStr = this.$t('order.center.show.detail.lottey.status.notwin.text')
							this.lossNumStr = (resR.data.betinfo.winningAmount) * 1 - resR.data.betinfo.betMoney
							this.lossNumStyleStr = "color:#FF0000"
						}
					} else if (resR.data.betinfo.status === 1) { //?????????(?????????)
						this.lossNumStr = '--'
						this.lottStateStr = this.$t('order.center.show.detail.lottey.status.norrizes.text')
						this.detailOrderState = this.$t('order.center.show.detail.state.confirm.text')
						this.lossNumStyleStr = "color:#ffffff"
					} else if (resR.data.betinfo.status === 3) { //?????????
						this.lossNumStr = '--'
						this.lottStateStr = '--'
						this.detailOrderState = this.$t('order.center.show.detail.state.cancel.text')
						this.lossNumStyleStr = "color:#ffffff"
					}

					//????????????:2?????????,1?????????,??????????????????,??????????????????
					if (resR.data.betinfo.betType === 2) {
						this.oddNumStr = resR.data.odds.antiPerCent
					} else if (resR.data.betinfo.betType === 1) {
						this.oddNumStr = resR.data.odds.lossPerCent
					}

					// ?????????????????????????????????????????????
					if (resR.data.betinfo.status === 1 && resR.data.betinfo.statusSettlement === 0) {
						this.lottStateBoolNum = 1
						this.cancelOrderBetId = resR.data.betinfo.id
					} else {
						this.lottStateBoolNum = 0
						this.cancelOrderBetId = 0
					}


				}

				this.detailMaskBool = true
			},
			detailMaskClick() {
				this.detailMaskBool = false
			},
			closureClick() {
				this.detailMaskBool = false
			},
			cancelOrderClick() {
				if (this.cancelOrderBetId !== 0) {
					// console.log("??????????????????",this.cancelOrderBetId);
					this.isCancelModalBool = true
				}
			},
			async confirmCancelClick() {
				let reqParam = {}
				reqParam.betId = this.cancelOrderBetId
				let resR = await unbetReq(reqParam, this.localLoginToken)
				if (resR.code === 200) {
					this.isCancelModalBool = false

					let reqParam = {}
					reqParam.betId = this.currQueryDetailId
					let resR = await betInfoReq(reqParam, this.localLoginToken)
					// console.log("resR",resR);
					if (resR.code === 200) {

						this.beginTimeStr = resR.data.game.startTime
						this.scoreNumStr = resR.data.odds.scoreHome + "-" + resR.data.odds.scoreAway
						this.allianceNameStr = resR.data.betinfo.gameInfo
						this.orderNumStr = resR.data.betinfo.orderNo
						this.betMoneyNum = resR.data.betinfo.betMoney

						if (resR.data.betinfo.settlementTime === 0) {
							this.settlementTimeStr = "---"
						} else {
							this.settlementTimeStr = resR.data.betinfo.settlementTime
						}
						if (resR.data.betinfo.status === 2) { //?????????
							this.detailOrderState = this.$t('order.center.show.detail.state.confirm.text')
							if (resR.data.betinfo.winningAmount > resR.data.betinfo.betMoney) { //????????????
								this.lottStateStr = this.$t('order.center.show.detail.lottey.status.win.text')
								this.lossNumStr = "+" + resR.data.betinfo.winningAmount
								this.lossNumStyleStr = "color:#28ffbb"
							} else if (resR.data.betinfo.winningAmount === 0) { //????????????
								this.lottStateStr = this.$t('order.center.show.detail.lottey.status.notwin.text')
								this.lossNumStr = (resR.data.betinfo.winningAmount) * 1 - resR.data.betinfo.betMoney
								this.lossNumStyleStr = "color:#FF0000"
							}
						} else if (resR.data.betinfo.status === 1) { //?????????
							this.lossNumStr = '--'
							this.lottStateStr = this.$t('order.center.show.detail.lottey.status.norrizes.text')
							this.detailOrderState = this.$t('order.center.show.detail.state.confirm.text')
							this.lossNumStyleStr = "color:#ffffff"
						} else if (resR.data.betinfo.status === 3) { //?????????		
							this.detailOrderState = this.$t('order.center.show.detail.state.cancel.text')
							this.lossNumStyleStr = "color:#ffffff"
						}

						//????????????:2?????????,1?????????,??????????????????,??????????????????
						if (resR.data.betinfo.betType === 2) {
							this.oddNumStr = resR.data.odds.antiPerCent
						} else if (resR.data.betinfo.betType === 1) {
							this.oddNumStr = resR.data.odds.lossPerCent
						}

						// ?????????????????????????????????
						if (resR.data.betinfo.status === 1) {
							this.lottStateBoolNum = 1
							this.cancelOrderBetId = resR.data.betinfo.id
						} else {
							this.lottStateBoolNum = resR.data.betinfo.status
							this.cancelOrderBetId = 0
						}

					}
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

	// ???????????????


	.orderCenterPage {}

	.navLeftBtn image {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
	}

	.navTitleCenter {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
	}



	.user_container {
		// padding: 0 16px;
		height: 100%;
	}

	.searchBox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 4px;
		padding-top: 10px;
	}

	.searchBoxList {
		width: 90%;
		margin-right: 5%;
		height: 42px;
		font-size: 12px;
		background-color: #334756;
		/* border: 0px; */
		color: #fff;
		border-radius: 5px;
		padding-left: 10px;
		position: relative;
	}

	.searchInputShow {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;

	}


	.searchBtn {
		font-family: Roboto;
		width: 73px;
		min-height: 42px;
		text-align: center;
		background-color: #3d8dfe;
		font-size: 14px;
		font-weight: 500;
		color: #fff;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 5px;

	}

	.rightArrow {
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		align-items: center;
		height: 100%;
		font-weight: 100;
		width: 12%;
		justify-content: center;
		font-size: 16px;
		color: #fff;
		/* transition: transform .2s cubic-bezier(.645, .045, .355, 1); */
		/*??????????????????????????????0.3s ????????????*/
		transition: all .3s ease-out;
	}

	.rightArrowActive {
		/*??????180???*/
		transform: rotate(180deg);
	}

	.inputSearchList {
		position: absolute;
		width: 100%;
		left: 0;
		top: 42px;
		box-sizing: border-box;
		z-index: 100;
	}

	.scrollInputSearchList {
		border-radius: 5px;
		width: 100%;
		max-height: 10em;
		background-color: #132736;
		// box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
		padding: 10px 0;
	}

	.inputSearchListItem {
		display: flex;
		align-items: center;
		justify-content: space-between;
		line-height: 37px;
		font-weight: 400;
		padding: 0 10px;
	}

	.inputSearchListItem image {
		width: 15px;
		height: 15px;
	}

	.tableBox {
		margin-top: 6px;
		height: calc(100vh - 165px);
		// border-radius: 5px;
		overflow: hidden;
	}

	.tableBoxCenterTitle {
		/* width: 100%; */
		height: 50px;
		line-height: 50px;
		background: #597ef8;
		// box-shadow: 0 1px 3px rgb(0 0 0 / 16%);
		// border-radius: 5px 5px 0 0;
		// padding: 0 10px;
		display: flex;
		align-items: center;
		// opacity: .7;
	}

	.tableBoxCenterTitleItem {
		width: 25%;
		font-size: 13px;
		color: #fff;
		font-weight: 700;
		line-height: 20px;
		text-align: center;
	}

	.tableBoxBody {
		// background: #1f252f;
		/* ????????????scrollView?????????.?????? */
		/* height: calc(100% - 70px); */
		padding-bottom: 10px;
		opacity: .7;
	}

	.srcoll_tableBoxBody {
		height: 100%;
	}

	.tableBoxBodyTBody {
		/* margin: 10px 10px 0; */
		// margin: 10px 10px;
		height: 42px;
		background: #fff;
		border-radius: 2px;
		display: flex;
		align-items: center;

		border-bottom: 0.5px solid #ccc;
	}

	.tableBoxBodyTBodyItem {
		text-align: center;
		/* font-size: 12px; */
		font-size: 13px;
		font-family: Alibaba PuHuiTi;
		font-weight: 400;
		color: #507ef6;
		width: 25%;
		height: 42px;
		line-height: 42px;

	}

	.tBodyItemDate {
		color: #333;
		font-size: 12px;
	}

	.tBodyItemBet {
		color: #333;
		border-right: 0.5px solid #ccc;
		border-left: 0.5px solid #ccc;
	}

	.tBodyItemLoss {
		color: #333;
		border-right: 0.5px solid #ccc;
		font-weight: 700;
	}

	.tableBoxBodyTBodyItem_detail_mask {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		font-size: 12px;
		background-color: #000;
		/* z-index: 100; */
		z-index: 1000;
		opacity: .45;
	}

	.tableBoxBodyTBodyItem_detail_order {
		position: absolute;
		// top: 10%;
		// left: 16px;
		// bottom: 80px;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		overflow: hidden;
		width: calc(100% - 32px);
		height: 450px;
		// background: url(../../static/images/item-bg.png);
		background: #fff;
		background-size: cover;
		border-radius: 10px;
		/* z-index: 100; */
		z-index: 1000;
		color: #fff;

		.bet-title {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			height: 34px;
			padding: 0 15px;
			margin-top: 10px;


			.title {
				font-size: 14px;
				color: #000000;
				width: 100%;
				text-align: center;
				font-weight: 500;
			}
		}


	}

	.bet-num {
		// background-color: #171e25;
		height: 25px;
		// width: 81px;
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
		color: #666;
		// margin: 10px;
		font-weight: 500;
		font-size: 12px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tableBoxBodyTBodyItem_detail_order_btn_top {
		position: absolute;
		bottom: 10px;
		width: 100%;
		display: flex;
		justify-content: center;
		padding: 0 30px;
	}

	.tableBoxBodyTBodyItem_detail_order_cancel_btn {
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		color: #3f7fff;
		// border-radius: 10px;
		font-size: 16px;
		font-family: Alibaba PuHuiTi;
		font-weight: 400;
		border-radius: 4px;
		border: 1px solid #3f7fff;
	}

	.tableBoxBodyTBodyItem_detail_order_btn {
		width: 100%;
		height: 40px;
		line-height: 40px;
		background: #3d8dfe;
		text-align: center;
		color: #fff;
		// border-radius: 10px;
		font-size: 16px;
		font-family: Alibaba PuHuiTi;
		font-weight: 400;
		border-radius: 4px;
		// margin-left: 10px;
	}

	.unavailableOrder {
		color: #a3b7c5;
	}

	.ableOrder {
		color: #3d8dfe;
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
		background-color: #fff;
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
			// border-bottom: 0.5px solid #3d4047;

			.title {
				color: #000;
				font-size: 16px;
				font-weight: 600;
			}
		}

		.zero-content {
			word-break: break-all;
			display: flex;
			padding: 12px;

			.con {
				color: #666;
			}
		}

		.opera-btn {
			// display: flex;
			// flex-direction: row;
			// justify-content: space-between;
			// height: 44px;
			// // border-top: 0.5px solid #3d4047;

			// width: 100%;

			position: absolute;
			bottom: 0;
			left: 0;
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
			width: 100%;
			padding: 0 15px 30px;
			box-sizing: border-box;

			.btn {
				// color: #ccc;
				// flex: 0 0 50%;
				// display: flex;
				// justify-content: center;
				// align-items: center;

				border-radius: 5px;
				border: 1px solid #3f7fff;
				font-size: 14px;
				width: 130px;
				height: 36px;
				line-height: 36px;
				text-align: center;
			}

			.cencal {
				border-right: 0.5px solid #3d4047;
			}

			.confirm {
				background: #3f7fff;
				color: #fff;
			}
		}
	}


	/* ?????????name */
	/* .mybox-leave-active,.mybox-enter-active{
	transition: all 1s ease;
}
.mybox-leave-active,.mybox-enter{
	height:0px !important;
}
.mybox-leave,.mybox-enter-active{
	height: 550px;
}
 */

	/* ?????? */
	@keyframes donghua {
		from {
			transform: translateX(-100%);
		}

		to {
			transform: translateX(0px);
		}
	}

	@-webkit-keyframes donghua {
		from {
			transform: translateX(-100%);
		}

		to {
			transform: translateX(0px);
		}
	}

	@keyframes donghuaReverse {
		from {
			transform: translateX(0);
		}

		to {
			transform: translateX(+100%);
		}
	}

	@-webkit-keyframes donghuaReverse {
		from {
			transform: translateX(0);
		}

		to {
			transform: translateX(+100%);
		}
	}

	.v-enter-active {
		animation: donghua 1s linear;
		-webkit-animation: donghua 1s linear;
	}

	.v-leave-active {
		animation: donghuaReverse 1s linear;
		-webkit-animation: donghuaReverse 1s linear;
	}

	.refresherViewImg {
		text-align: center;
		margin-top: 10px;

	}

	.refresherImg {
		width: 70rpx;
		height: 70rpx
	}
</style>
