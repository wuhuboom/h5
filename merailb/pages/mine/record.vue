<template>
	<view class="">
		<view class="orderCenterPage">
			<view class="backTitleBar-wrapper colCent borderBox">
				<view class="fixedBox">
					<view class="common_header" style="height: 45px;">
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

			<u-tabs :list="tabList" :is-scroll="false" :current="current" :gutter="30" :bold="true" font-size="28"
				:item-width="200" :bar-width="140" :bar-height="2" inactive-color="#333" active-color="#333"
				@change="tabChange"></u-tabs>

			<view class="">
				<uni-datetime-picker v-model="range" type="daterange" start="2022-01-01" end="2099-01-01"
					rangeSeparator="-" @change="datetimechange" :clearIcon="false" />
			</view>


			<view class="">

			</view>

			<view class="order_list_container">
				<view class="tableBox">
					<view class="tableBoxCenterTitle">
						<view class="tableBoxCenterTitleItem">
							{{$t('record.table.title1.text')}}
						</view>
						<view class="tableBoxCenterTitleItem" style="width: 30%;">
							{{$t('record.table.title2.text')}}
						</view>
						<view class="tableBoxCenterTitleItem">
							{{$t('record.table.title3.text')}}
						</view>
					</view>
					<view class="tableBoxBody">
						<mescroll-uni ref="mescrollRef" :fixed="true" height="800" top="0" :topbar="false" bottom="0"
							:bottombar="true" :safearea="false" @init="mescrollInit" @down="downCallback"
							@up="upCallback" :down="downOption" :up="upOption">

							<view class="tableBoxBodyTBody" v-for="(item, index) in dataList" :key="index">
								<view class="tableBoxBodyTBodyItem tBodyItemDate">
									{{item.Date}}
								</view>
								<view class="tableBoxBodyTBodyItem tBodyItemBet">
									{{item.Money}}
								</view>
								<!-- :style="item.Status === 1  ? 'color:#11a983' : ''" -->
								<view class="tableBoxBodyTBodyItem tBodyItemLoss">
									{{item.statusStr}}
								</view>
							</view>

						</mescroll-uni>

					</view>
				</view>
			</view>



		</view>

		<self-tabbar :current-page="111"></self-tabbar>

	</view>

</template>

<script>
	import {
		getRecordsReq,
	} from '../../api/index.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	import {
		getCurrentDate,
		getDate
	} from '../../common/publicTool.js'
	import MescrollBodyDiy from "@/uni_modules/mescroll-uni/components/mescroll-diy/football/mescroll-body.vue";
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin, myMixin], // 使用mixin
		components: {
			MescrollBodyDiy
		},
		data() {
			return {
				navTitle: this.$t('record.title.text'),
				tabList: [],
				queryKind: 3, //默认是
				current: 2,
				range: [],
				startTimerStr: "",
				endTimerStr: "",
				localLoginToken: null,
				dataList: [],
				pageNo: 1,
				pageSize: 10,
				beginTimeStr: null,
				endTimeStr: null,
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
				}

			}
		},

		onShow() {

			// 初始化语言
			this.initLang()

			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			eventChannel.on('recordOrderEventClick', (data) => {
				this.urlFromStr = data.from
			})

			let dateArr = [];
			dateArr.push(getDate(new Date(), 0))
			dateArr.push(getDate(new Date(), 1))
			this.startTimerStr = (new Date(Date.parse(dateArr[0].replace(/-/g, "/")))).getTime() / 1000;
			this.endTimerStr = (new Date(Date.parse(dateArr[1].replace(/-/g, "/")))).getTime() / 1000;
			this.range = dateArr
		},
		methods: {
			initLang() { //初始化语言

				let langStr = uni.getStorageSync('merailb_lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr

				this.navTitle = this.$t('record.title.text')

				this.tabList = [{
					name: this.$t('record.tab.title1.text'),
				}, {
					name: this.$t('record.tab.title2.text'),
				}, {
					name: this.$t('record.tab.title3.text'),
				}]

			},
			goBackBtnClick() {
				const queryRecordOrderUrlFrom = uni.getStorageSync('queryRecordOrderUrlFrom') || 'other'
				// console.log("queryRecordOrderUrlFrom",queryRecordOrderUrlFrom);
				if (!this.orderRState_Bool) {
					this.urlFromStr = queryRecordOrderUrlFrom
				}

				if (this.urlFromStr === "mine") {
					uni.switchTab({
						url: '/pages/mine/index',
						animationType: 'slide-in-top',
						animationDuration: 200
					})

				} else if (this.urlFromStr === "home") {
					uni.switchTab({
						url: '/pages/home/index',
						animationType: 'slide-in-top',
						animationDuration: 200
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
				this.getOrderData(pageNum, pageSize)
			},
			/*若希望重新加载列表,只需调用此方法即可(内部会自动page.num=1,再主动触发up.callback)*/
			reloadList() {
				this.mescroll.resetUpScroll();
			},
			async getOrderData(pageNum, pageSize) {
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
				reqParam.limit = pageSize
				reqParam.page = pageNum
				reqParam.kinds = this.queryKind
				if (this.startTimerStr) {
					reqParam.start = this.startTimerStr
				}
				if (this.endTimerStr) {
					reqParam.end = this.endTimerStr
				}

				let resR = await getRecordsReq(reqParam, this.localLoginToken)
				let resArray
				if (resR.code === 2000) {
					// console.log("resR", resR.result.data, resR.result.total);
					resArray = resR.result.data
					resArray.forEach(((item) => {
						if (item.Kinds === 1) { //提现
							if (item.Status === 1 || item.Status === 3 || item.Status === 4) {
								item.statusStr = this.$t('record.table.content.withdraw.status')
							} else if (item.Status === 6) {
								item.statusStr = this.$t('record.table.content.withdraw.fail.status')
							} else if (item.Status === 2) {
								item.statusStr = this.$t('record.table.content.withdraw.success.status')
							}

						} else if (item.Kinds === 2) { //充值
							if (item.Status === 1) {
								item.statusStr = this.$t('record.table.content.recharge.status')
							} else if (item.Status === 3) {
								item.statusStr = this.$t('record.table.content.recharge.success.status')
							} else if (item.Status === 4) {
								item.statusStr = this.$t('record.table.content.recharge.fail.status')
							}
						} else if (item.Kinds === 3) { //佣金
							item.statusStr = this.$t('record.table.content.commission.success.status')
						}

					}))
					this.mescroll.endBySize(resR.result.data.length, resR.result.total)
					//设置列表数据
					if (pageNum == 1) this.dataList = []; //如果是第一页需手动制空列表
					this.dataList = this.dataList.concat(resArray); //追加新数据
				}
				// else if (resR.code === 402 || resR.code === 403) {
				// 	resArray = []
				// 	this.logout()
				// 	uni.showToast({
				// 		title: resR.msg,
				// 		icon: 'none',
				// 		duration: 2000,
				// 		success: (res) => {
				// 			uni.reLaunch({
				// 				url: '/pages/login/login'
				// 			})
				// 		}
				// 	});
				// } 
				else {
					resArray = []
					//联网/查询失败, 结束加载
					this.mescroll.endErr();
				}

			},
			tabChange(index) {
				// console.log("tabChange", index);
				this.current = index;
				this.queryKind = index + 1
				this.dataList = []
				this.mescroll.resetUpScroll();
			},
			datetimechange(e) {
				this.startTimerStr = (new Date(Date.parse(e[0].replace(/-/g, "/")))).getTime() / 1000;
				this.endTimerStr = (new Date(Date.parse(e[1].replace(/-/g, "/")))).getTime() / 1000;
				// console.log('change事件:', e[0]);
				this.mescroll.resetUpScroll();
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f1f1f1;
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
			background: linear-gradient(to right, #6dcab8, #3a78cb);
			color: #fff;

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



	.order_list_container {
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
		height: calc(100vh - 215px);
		// border-radius: 5px;
		overflow: hidden;
	}

	.tableBoxCenterTitle {
		/* width: 100%; */
		height: 50px;
		line-height: 50px;
		background: linear-gradient(to right, #6dcab8, #3a78cb);
		display: flex;
		align-items: center;
		// opacity: .7;
	}

	.tableBoxCenterTitleItem {
		width: 40%;
		font-size: 13px;
		color: #fff;
		font-weight: 700;
		line-height: 20px;
		text-align: center;
	}

	.tableBoxBody {
		// background: #1f252f;
		/* 用原生的scrollView的时候.用上 */
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
		// background: #fff;
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
		width: 40%;
		height: 42px;
		line-height: 42px;

	}

	.tBodyItemDate {
		color: #333;
		font-size: 12px;
	}

	.tBodyItemBet {
		width: 30%;
		color: #333;
		// border-right: 0.5px solid #ccc;
		// border-left: 0.5px solid #ccc;
	}

	.tBodyItemLoss {
		color: #333;
		border-right: 0.5px solid #ccc;
		// font-weight: 700;
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
