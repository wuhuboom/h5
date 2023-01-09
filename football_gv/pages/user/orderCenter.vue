<template>
	<view class="orderCenterPage">

		<uni-nav-bar backgroundColor="#00111C" color="#fff" :statusBar="true" :border="false"
			@clickLeft="goBackBtnClick" style="font-weight: 600;" :fixed="true">
			<block slot="left">
				<view class="navLeftBtn">
					<image src="../../static/images/back.svg" mode=""></image>
				</view>
			</block>

			<view class="navTitleCenter">{{navTitle}}</view>
			<!-- <block slot="right">
				<view class="customerService" @click="goToOnLineService">
					<image src="../../static/images/customer_service1.png" mode=""></image>
				</view>
			</block> -->
		</uni-nav-bar>
		<v-tabs v-model="current" :tabs="tabSimpleList" lineHeight="4rpx" bgColor="#00111c" color="#FFFFFF"
			activeColor="#3d8dfe" @change="tabChange"></v-tabs>
		<!-- 		
		<u-tabs :list="tabList" :is-scroll="true" :current="current" :gutter="30" :bold="false" bg-color="#00111c"
			font-size="20" :item-width="200" :bar-width="140" :bar-height="2" inactive-color="#FFFFFF"
			active-color="#3d8dfe" @change="tabChange"></u-tabs> -->

		<view class="user_container">
			<view class="searchBox">
				<view class="searchBoxList" @click="searchBoxListClick">
					<view class="searchInputShow">
						{{initSearchInputText}}
					</view>
					<span :class="!showListBool?arrowClass:arrowClassActive"></span>
					<view class="inputSearchList" :style="!showListBool?'display: none;':''">
						<scroll-view scroll-y="true" class="scrollInputSearchList">

							<view class="inputSearchListItem" v-for="(item,index) in inputSearchListItemArray"
								:key="index" @click="inputSearchListItemClick(item,index)">
								<view class="">
									{{item.nameStr}}
								</view>
								<image v-if=" currentIndex == index " src="../../static/images/dian.png" mode="">
								</image>
							</view>

						</scroll-view>
					</view>
				</view>
				<view class="searchBtn" @click="searchWhereBtnClick">
					{{$t('order.center.search.where.query.text')}}
				</view>
			</view>
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
								:style="item.status === 1 && item.statusSettlement === 1 && item.statusOpen === 1 ? 'color:#28ffbb' : item.status === 1 && item.statusSettlement === 1 && item.statusOpen === 2 ? 'color:#ff0000':'color:#fff'">
								{{item|statusToStr|moneyFormat}}
							</view>
							<view class="tableBoxBodyTBodyItem" @click="tableBoxBodyTBodyItemDetailClick(item)">
								{{$t('order.center.list.head.detail.text')}}
							</view>
						</view>

					</mescroll-uni>

				</view>
			</view>
		</view>

		<!-- 详情 -->
		<view class="tableBoxBodyTBodyItem_detail_mask" v-if="detailMaskBool" @click="detailMaskClick">

		</view>
		<!-- name="mybox" -->
		<!-- 	 <transition >
			
		 </transition > -->

		<!--
			0.未确认 1已确认 2已取消 3 已撤消 4已回滚 status
			0未结算 1已结算 statusSettlement
			0未开奖 1已中奖 2未中奖  statusOpen
		 -->

		<view class="tableBoxBodyTBodyItem_detail_order" v-if="detailMaskBool">
			<view class="tableBoxBodyTBodyItem_detail_order_tit">
				{{$t('order.center.show.detail.title.text')}}
			</view>
			<view class="tableBoxBodyTBodyItem_detail_order_timeScoreTeam">
				<view class="">
					{{beginTimeStr | timestampStr}}
				</view>
				<view class="tableBoxBodyTBodyItem_detail_order_score">
					{{$t('order.center.show.detail.score.text')}}:<text>{{scoreNumStr}}</text>
				</view>
				<view class="tableBoxBodyTBodyItem_detail_order_team">
					{{allianceNameStr}}
				</view>
			</view>
			<scroll-view scroll-y="true" style="height: 350px;">
				<view class="tableBoxBodyTBodyItem_detail_order_item">
					<view class="tableBoxBodyTBodyItem_detail_order_item_label">
						{{$t('order.center.show.detail.order.num.text')}}:
					</view>
					<view class="tableBoxBodyTBodyItem_detail_order_item_content">
						{{orderNumStr}}
					</view>
				</view>
				<view class="tableBoxBodyTBodyItem_detail_order_item">
					<view class="tableBoxBodyTBodyItem_detail_order_item_label">
						{{$t('order.center.show.detail.team.text')}}:
					</view>
					<view class="tableBoxBodyTBodyItem_detail_order_item_content">
						{{allianceNameStr}}
					</view>
				</view>
				<view class="tableBoxBodyTBodyItem_detail_order_item">
					<view class="tableBoxBodyTBodyItem_detail_order_item_label">
						{{$t('order.center.show.detail.score.text')}}:
					</view>
					<view class="tableBoxBodyTBodyItem_detail_order_item_content">
						{{scoreNumStr}}
					</view>
				</view>
				<view class="tableBoxBodyTBodyItem_detail_order_item">
					<view class="tableBoxBodyTBodyItem_detail_order_item_label">
						{{$t('order.center.show.detail.screenings.text')}}:
					</view>
					<view class="tableBoxBodyTBodyItem_detail_order_item_content">
						{{$t('order.center.show.detail.screenings.full.text')}}
					</view>
				</view>
				<view class="tableBoxBodyTBodyItem_detail_order_item">
					<view class="tableBoxBodyTBodyItem_detail_order_item_label">
						{{$t('order.center.show.detail.state.text')}}:
					</view>
					<view class="tableBoxBodyTBodyItem_detail_order_item_content">
						{{detailOrderState}}
					</view>
				</view>
				<view class="tableBoxBodyTBodyItem_detail_order_item">
					<view class="tableBoxBodyTBodyItem_detail_order_item_label">
						{{$t('order.center.show.detail.bet.num.text')}}:
					</view>
					<view class="tableBoxBodyTBodyItem_detail_order_item_content">
						{{betMoneyNum | moneyFormat}}
					</view>
				</view>
				<view class="tableBoxBodyTBodyItem_detail_order_item">
					<view class="tableBoxBodyTBodyItem_detail_order_item_label">
						{{$t('order.center.show.detail.odds.text')}}:
					</view>
					<view class="tableBoxBodyTBodyItem_detail_order_item_content">
						{{oddNumStr}}
					</view>
				</view>
				<view class="tableBoxBodyTBodyItem_detail_order_item">
					<view class="tableBoxBodyTBodyItem_detail_order_item_label">
						{{$t('order.center.show.detail.loss.text')}}:
					</view>
					<view class="tableBoxBodyTBodyItem_detail_order_item_content" :style="lossNumStyleStr">
						{{lossNumStr | moneyFormat}}
					</view>
				</view>
				<view class="tableBoxBodyTBodyItem_detail_order_item">
					<view class="tableBoxBodyTBodyItem_detail_order_item_label">
						{{$t('order.center.show.detail.lottey.status.text')}}:
					</view>
					<view class="tableBoxBodyTBodyItem_detail_order_item_content">
						{{lottStateStr}}
					</view>
				</view>
				<view class="tableBoxBodyTBodyItem_detail_order_item">
					<view class="tableBoxBodyTBodyItem_detail_order_item_label">
						{{$t('order.center.show.detail.start.time.text')}}:
					</view>
					<view class="tableBoxBodyTBodyItem_detail_order_item_content">
						{{beginTimeStr | timestampStr}}
					</view>
				</view>
				<view class="tableBoxBodyTBodyItem_detail_order_item">
					<view class="tableBoxBodyTBodyItem_detail_order_item_label">
						{{$t('order.center.show.detail.settlement.time.text')}}:
					</view>
					<view class="tableBoxBodyTBodyItem_detail_order_item_content">
						{{settlementTimeStr | timestampStr}}
					</view>
				</view>
				<view class="tableBoxBodyTBodyItem_detail_order_item">
					<view class="tableBoxBodyTBodyItem_detail_order_item_label">
						{{$t('order.center.show.detail.operate.text')}}:
					</view>
					<view :class="lottStateBoolNum === 1 ? cancelOrderBtnClass : cancelOrderBtnClassUnable"
						@click="lottStateBoolNum === 1 ? cancelOrderClick() : null">
						{{$t('order.center.show.detail.operate.cancel.text')}}
					</view>
				</view>
			</scroll-view>
			<view class="tableBoxBodyTBodyItem_detail_order_btn_top">
				<view class="tableBoxBodyTBodyItem_detail_order_btn " @click="closureClick">
					{{$t('order.center.show.detail.btn.closure.text')}}
				</view>
			</view>
		</view>


		<show-modal ref="testRef"></show-modal>
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
		mixins: [MescrollMixin, myMixin], // 使用mixin
		components: {
			MescrollBodyDiy
		},
		data() {
			return {

				localLoginToken: null,

				dataList: [],

				initSearchInputText: this.$t('order.center.search.where.all.text'),
				tabSimpleList: [],
				tabList: [{
					name: this.$t('order.center.tab.today.title.text'),
				}, {
					name: this.$t('order.center.tab.yes.title.text'),
				}, {
					name: this.$t('order.center.tab.nearlySeven.title.text'),
				}, {
					name: this.$t('order.center.tab.nearlyTen.title.text'),
				}, {
					name: this.$t('order.center.tab.nearlyThirty.title.text'),
				}],
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
				cancelOrderBtnClass: 'tableBoxBodyTBodyItem_detail_order_item_content ableOrder',
				cancelOrderBtnClassUnable: 'tableBoxBodyTBodyItem_detail_order_item_content unavailableOrder',
				lottStateBoolNum: 1,
				cancelOrderBetId: 0,
				urlFromStr: '',

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
						icon: "../../static/images/order-record.png",
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

			}
		},

		onShow() {

			// this.localLoginToken = this.$store.state.userInfo.token
			// this.localLoginToken = uni.getStorageSync('footballToken');

			// 初始化语言
			this.initLang()

			this.current = 0
			this.queryTime = 1
			this.queryType = 1
			this.dataList = []

			// 获取今日订单中心
			this.getTodayOrderData(this.pageNo, this.pageSize)

			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			eventChannel.on('eventOrderClick', (data) => {
				this.urlFromStr = data.from
			})


		},
		methods: {
			initLang() { //初始化语言

				let langStr = uni.getStorageSync('foot_lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr

				this.initSearchInputText = this.$t('order.center.search.where.all.text')

				this.tabSimpleList = [
						this.$t('user.statistics.center.today.text'),
						this.$t('user.statistics.center.yes.text'),
						this.$t('user.statistics.center.nearly7.text'),
						this.$t('user.statistics.center.nearly10.text'),
						this.$t('user.statistics.center.nearly30.text')
					],

					this.tabList = [{
						name: this.$t('order.center.tab.today.title.text'),
					}, {
						name: this.$t('order.center.tab.yes.title.text'),
					}, {
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
					up: {
						empty: {
							tip: this.$t('alert.absolutely.empty')
						},
						textNoMore: this.$t('alert.nomore')
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
					//设置列表数据
					if (pageNum == 1) this.dataList = []; //如果是第一页需手动制空列表
					this.dataList = this.dataList.concat(resR.data.results); //追加新数据
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
				this.queryTime = index + 1
				this.pageNo = 1
				this.pageSize = 10
				this.dataList = []
				this.stopLoadMoreDataBool = false
				// this.getTodayOrderData(this.pageNo,this.pageSize)
				this.mescroll.resetUpScroll();
			},
			goBackBtnClick() {

				const queryOrderCenterUrlFrom = uni.getStorageSync('queryOrderCenterUrlFrom') || 'other'
				// console.log("queryMatchContentItemUrlFrom",queryMatchContentItemUrlFrom);
				if (!this.matchContent_Bool) {
					this.urlFromStr = queryOrderCenterUrlFrom
				}

				if (this.urlFromStr === "user") {
					uni.switchTab({
						url: '/pages/user/user',
						animationType: 'pop-in',
						animationDuration: 200
					})
				} else if (this.urlFromStr === "report") {
					uni.navigateTo({
						url: '/pages/user/report_management',
						animationType: 'pop-in',
						animationDuration: 200
					})
				}



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
				// console.log("item",item);
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
					if (resR.data.betinfo.status === 1 && resR.data.betinfo.statusSettlement === 1) { //已开奖
						this.detailOrderState = this.$t('order.center.show.detail.state.confirm.text')
						if (resR.data.betinfo.winningAmount > resR.data.betinfo.betMoney) { //赢的情况
							this.lottStateStr = this.$t('order.center.show.detail.lottey.status.win.text')
							this.lossNumStr = "+" + resR.data.betinfo.winningAmount
							this.lossNumStyleStr = "color:#28ffbb"
						} else if (resR.data.betinfo.winningAmount === 0) { //输的情况
							this.lottStateStr = this.$t('order.center.show.detail.lottey.status.notwin.text')
							this.lossNumStr = (resR.data.betinfo.winningAmount) * 1 - resR.data.betinfo.betMoney
							this.lossNumStyleStr = "color:#FF0000"
						}
					} else if (resR.data.betinfo.status === 1) { //未开奖(已确认)
						this.lossNumStr = '--'
						this.lottStateStr = this.$t('order.center.show.detail.lottey.status.norrizes.text')
						this.detailOrderState = this.$t('order.center.show.detail.state.confirm.text')
						this.lossNumStyleStr = "color:#ffffff"
					} else if (resR.data.betinfo.status === 3) { //已撤销
						this.lossNumStr = '--'
						this.lottStateStr = '--'
						this.detailOrderState = this.$t('order.center.show.detail.state.cancel.text')
						this.lossNumStyleStr = "color:#ffffff"
					}

					//下注类型:2反波胆,1正波胆,根据下注类型,显示对应赔率
					if (resR.data.betinfo.betType === 2) {
						this.oddNumStr = resR.data.odds.antiPerCent
					} else if (resR.data.betinfo.betType === 1) {
						this.oddNumStr = resR.data.odds.lossPerCent
					}

					// 未开奖且未结算才能进行撤单操作
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
			async cancelOrderClick() {

				if (this.cancelOrderBetId !== 0) {
					// console.log("撤单点击事件",this.cancelOrderBetId);

					this.$showModal({
						title: '',
						icon: 'warning',
						ceterTitle: this.$t('modal.title'),
						ceterDesc: this.$t('modal.cancel.bet.desc'),
						cancelText: this.$t('modal.cancel.text'), //传入空值表示只显示确认按钮，此代码不能省略
						confirmText: this.$t('modal.confirm.text'),
						success: async (res) => {
							if (res.confirm) {

								let reqParam = {}
								reqParam.betId = this.cancelOrderBetId
								let resR = await unbetReq(reqParam, this.localLoginToken)
								if (resR.code === 200) {
									this.$showModal({
										title: '',
										icon: 'success',
										ceterTitle: this.$t('modal.cancel.bet.success.desc'),
										ceterDesc: '',
										cancelText: '', //传入空值表示只显示确认按钮，此代码不能省略
										confirmText: this.$t('modal.confirm.text'),
										success: (res) => {
											if (res.confirm) {
												uni.navigateTo({
													url: '/pages/user/orderCenter',
													animationType: 'pop-in',
													animationDuration: 200
												});
											} else if (res.cancel) { //点击确定无需操作

											}
										}
									})
								}

							} else if (res.cancel) { //点击确定无需操作

							}
						}
					})

				}



			}
		}
	}
</script>

<style>
	page {
		background-color: #071a28;
		height: 100%;
		position: relative;
	}

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
		padding: 0 16px;
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
		/*设置所有动画的效果：0.3s 淡出效果*/
		transition: all .3s ease-out;
	}

	.rightArrowActive {
		/*旋转180度*/
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
		box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
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
		border-radius: 5px;
		overflow: hidden;
	}

	.tableBoxCenterTitle {
		/* width: 100%; */
		height: 50px;
		line-height: 50px;
		background: #334756;
		box-shadow: 0 1px 3px rgb(0 0 0 / 16%);
		border-radius: 5px 5px 0 0;
		padding: 0 10px;
		display: flex;
		align-items: center;
	}

	.tableBoxCenterTitleItem {
		width: 25%;
		font-size: 12px;
		color: #fff;
		font-weight: 500;
		line-height: 20px;
		text-align: center;
	}

	.tableBoxBody {
		background: #132736;
		/* 用原生的scrollView的时候.用上 */
		/* height: calc(100% - 70px); */
		padding-bottom: 10px;
	}

	.srcoll_tableBoxBody {
		height: 100%;
	}

	.tableBoxBodyTBody {
		/* margin: 10px 10px 0; */
		margin: 10px 10px;
		height: 42px;
		background: #334756;
		border-radius: 2px;
		display: flex;
		align-items: center;

	}

	.tableBoxBodyTBodyItem {
		text-align: center;
		/* font-size: 12px; */
		font-size: 13px;
		font-family: Alibaba PuHuiTi;
		font-weight: 400;
		color: #3d8dfe;
		width: 25%;
	}

	.tBodyItemDate {
		color: #fff;
	}

	.tBodyItemBet {
		color: #fff;
	}

	.tBodyItemLoss {
		color: #fff;
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
		top: 10%;
		left: 16px;
		bottom: 80px;
		overflow: hidden;
		width: calc(100% - 32px);
		height: 550px;
		background-color: #132736;
		border-radius: 10px;
		/* z-index: 100; */
		z-index: 1000;
		color: #fff;
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
		background: #334756;
		padding: 0 20px;
		border-radius: 2px;
		color: #fff;
		margin: 10px;
		font-weight: 500;
		font-size: 12px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tableBoxBodyTBodyItem_detail_order_btn_top {
		position: absolute;
		bottom: 15px;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.tableBoxBodyTBodyItem_detail_order_btn {
		width: 200px;
		height: 50px;
		line-height: 50px;
		background: #3d8dfe;
		text-align: center;
		color: #fff;
		border-radius: 10px;
		font-size: 16px;
		font-family: Alibaba PuHuiTi;
		font-weight: 400;
	}

	.unavailableOrder {
		color: #a3b7c5;
	}

	.ableOrder {
		color: #3d8dfe;
	}

	/* 优先用name */
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

	/* 动画 */
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
