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
		</uni-nav-bar>

		<u-tabs :list="tabList" :is-scroll="true" :current="current" :gutter="30" :bold="false" bg-color="#00111c"
			font-size="20" :item-width="200" :bar-width="140" :bar-height="2" inactive-color="#FFFFFF"
			active-color="#3d8dfe" @change="tabChange"></u-tabs>

		<view class="user_container">
			<view class="searchBox">
				<!-- style="width: 50%;" -->
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
								<image v-if=" currentIndex == index && item.valueNum !== 3"
									src="../../static/images/dian.png" mode=""></image>
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
						{{$t('recharge.record.center.list.head.date.text')}}
					</view>
					<view class="tableBoxCenterTitleItem">
						{{$t('recharge.record.center.list.head.type.text')}}
					</view>
					<view class="tableBoxCenterTitleItem">
						{{$t('recharge.record.center.list.head.amount.text')}}
					</view>
					<view class="tableBoxCenterTitleItem">
						{{$t('recharge.record.center.list.head.status.text')}}
					</view>
				</view>
				<view class="tableBoxBody">

					<!-- :fixed="true" height="900" -->
					<mescroll-uni ref="mescrollRef" :fixed="false" top="0" :topbar="false" bottom="0" :bottombar="true"
						:safearea="false" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
						:up="upOption">

						<view class="" v-for="(item, index) in dataList" :key="index">
							<view class="tableBoxBodyTBody">
								<view class="tableBoxBodyTBodyItem tBodyItemDate">
									{{item.createdAt | timestampStr}}
								</view>
								<view class="tableBoxBodyTBodyItem tBodyItemBet">
									{{item.typeName}}
								</view>

								<view class="tableBoxBodyTBodyItem tBodyItemLoss">
									{{item.money|moneyFormat}}
								</view>
								<view class="tableBoxBodyTBodyItem"
									:style="item.status === 1 ?  'color:#3d8dfe' : item.status === 2 || item.status === 4 || item.status === 6 ? 'color:#00ff65' : item.status === 3 ? 'color:red':'color:#fff' ">
									{{item.statusName}}
								</view>
							</view>
							<view class="reasonDesc" v-if="item.status === 3 ">
								<view class="reasonDescTitle">
									{{$t('withdraw.record.center.show.detail.status.fail.reason.text')}}:
								</view>
								<view class="reasonDescContent">
									{{item.remark}}
								</view>
							</view>
						</view>
					</mescroll-uni>

				</view>
			</view>
		</view>




		<show-modal ref="testRef"></show-modal>
	</view>
</template>

<script>
	import {
		withdrawLogReq
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
				initSearchInputText: "",
				initSearchInputText_type: "",
				tabList: [],
				current: 0,
				navTitle: this.$t('withdraw.record.center.nav.title.text'),
				showListBool: false,
				showListBoolType: false,
				arrowClass: 'iconfont icon-arrow-down rightArrow',
				arrowClassActive: 'iconfont icon-arrow-down rightArrow rightArrowActive',
				inputSearchListItemArray: [],
				inputSearchListItemArray_type: [],
				currentIndex: 0,
				currentIndexType: 0,
				detailMaskBool: false,
				pageNo: 1,
				pageSize: 10,
				queryTime: 1, //默认是今天
				queryType: 0, //默认是全部
				queryStatus: 0, //默认是全部

				urlFromStr: '',
				typeList: [],
				statusList: [],


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
						icon: "../../static/images/withdraw-record.png",
						tip: 'Absolutely Empty'
					},
					textLoading: 'Loading',
					textNoMore: '-- END --'
				}
			}
		},
		// computed:{
		// 	...mapState(['hasLogin'])
		// },
		onShow() {

			// this.localLoginToken = this.$store.state.userInfo.token
			// this.localLoginToken = uni.getStorageSync('footballToken');

			// 初始化语言
			this.initLang()

			this.current = 0
			this.queryTime = 1
			this.queryType = 0
			this.queryStatus = 0
			this.dataList = []

			// 获取今日订单中心
			this.getRechargeRecordData(this.pageNo, this.pageSize)

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

				this.initSearchInputText = this.$t('withdraw.record.center.search.where.status.all.text')
				this.initSearchInputText_type = this.$t('withdraw.record.center.search.where.status.all.text')
				this.tabList = [{
					name: this.$t('withdraw.record.center.tab.today.title.text'),
				}, {
					name: this.$t('withdraw.record.center.tab.yes.title.text'),
				}, {
					name: this.$t('withdraw.record.center.tab.nearlySeven.title.text'),
				}, {
					name: this.$t('withdraw.record.center.tab.nearlyTen.title.text'),
				}, {
					name: this.$t('withdraw.record.center.tab.nearlyThirty.title.text'),
				}]

				this.navTitle = this.$t('withdraw.record.center.nav.title.text')

				this.inputSearchListItemArray = [{
					nameStr: this.$t('withdraw.record.center.search.where.status.all.text'),
					valueNum: 0
				}, {
					nameStr: this.$t('withdraw.record.center.search.where.status.pendding.text'),
					valueNum: 1
				}, {
					nameStr: this.$t('withdraw.record.center.search.where.status.pass.text'),
					valueNum: 2
				}]



				this.typeList = [{
					nameStr: this.$t('withdraw.record.center.show.detail.type.bank.text'),
					valueNum: 1
				}, {
					nameStr: this.$t('withdraw.record.center.show.detail.usdt.bank.text'),
					valueNum: 2
				}]


				// 提现状态
				this.statusList = [{
					nameStr: this.$t('withdraw.record.center.show.detail.status.need.audit.text'),
					valueNum: 1
				}, {
					nameStr: this.$t('withdraw.record.center.show.detail.status.already.audit.text'),
					valueNum: 2
				}, {
					nameStr: this.$t('withdraw.record.center.show.detail.status.fail.text'),
					valueNum: 3
				}, {
					nameStr: this.$t('withdraw.record.center.show.detail.status.withdraw.success.text'),
					valueNum: 4
				}, {
					nameStr: this.$t('withdraw.record.center.show.detail.status.paid.in.text'),
					valueNum: 5
				}, {
					nameStr: this.$t('backapi.self.pay.failed.text'),
					valueNum: 6
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
				this.getRechargeRecordData(pageNum, pageSize)
			},
			/*若希望重新加载列表,只需调用此方法即可(内部会自动page.num=1,再主动触发up.callback)*/
			reloadList() {
				this.mescroll.resetUpScroll();
			},
			async getRechargeRecordData(pageNum, pageSize) {
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
				if (this.queryStatus !== 0) {
					reqParam.status = this.queryStatus
				}

				// reqParam.pageNo = this.pageNo
				reqParam.pageNo = pageNum
				// reqParam.pageSize = this.pageSize
				reqParam.pageSize = pageSize
				let resR = await withdrawLogReq(reqParam, this.localLoginToken)

				// console.log("resR",resR.data.results);
				let resArray
				if (resR.code === 200) {
					resArray = resR.data.results
					let resultsArrNew = []
					let strType
					let strStatus
					resArray.forEach((item, index) => {

						strType = this.realTypeName(item.type, 1)
						strStatus = this.realTypeName(item.status, 2)

						resultsArrNew.push({
							...item,
							statusName: strStatus,
							typeName: strType
						})
					})

					this.mescroll.endBySize(resR.data.results.length, resR.data.totalCount)
					//设置列表数据
					if (pageNum == 1) this.dataList = []; //如果是第一页需手动制空列表
					this.dataList = this.dataList.concat(resultsArrNew); //追加新数据
					// console.log("this.dataList",this.dataList);
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
				// console.log(this.queryStatus,this.queryType);
				this.pageNo = 1
				this.pageSize = 10
				this.dataList = []
				this.stopLoadMoreDataBool = false
				// this.getTodayOrderData(this.pageNo,this.pageSize)
				this.mescroll.resetUpScroll();
			},
			tabChange(index) {
				// console.log("index",index);
				this.showListBool = false
				this.showListBoolType = false
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
				uni.switchTab({
					url: '/pages/user/user',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			searchBoxListClick() {
				this.showListBool = !this.showListBool
				this.showListBoolType = false
			},
			searchBoxListTypeClick() {
				this.showListBool = false
				this.showListBoolType = !this.showListBoolType
			},
			inputSearchListItemClick(item, index) {
				// console.log("index",index);
				this.initSearchInputText = item.nameStr
				this.currentIndex = index;
				// this.queryStatus = index + 1
				if (index === 0) {
					this.queryStatus = 0
				} else {
					this.queryStatus = index
				}
			},
			inputSearchListItemClick_type(item, index) {
				// console.log("index11",index);
				this.initSearchInputText_type = item.nameStr
				this.currentIndexType = index;
				// this.queryType = index + 1
				if (index === 0) {
					this.queryType = 0
				} else {
					this.queryType = index
				}
			},
			realTypeName(realTypeName, typeNum) {
				// console.log("realTypeName",realTypeName);
				let tempFindArray = []
				if (typeNum === 1) {
					tempFindArray = this.typeList
				} else if (typeNum === 2) {
					tempFindArray = this.statusList
				}
				// console.log("tempFindArray",tempFindArray);
				let tempArray = tempFindArray.find(itemT => {
					if (itemT.valueNum === realTypeName) {

						return itemT
					}
				})
				// console.log("tempArray",tempArray);
				// return tempArray.nameStr
				if (tempArray) {
					return tempArray.nameStr
				} else {
					return this.$t('recharge.record.center.show.detail.status.pay.other.text')
				}
			},

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
		width: 100%;
		margin-right: 3%;
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
		height: calc(100% - 70px);
		padding-bottom: 10px;
	}

	.srcoll_tableBoxBody {
		height: 100%;
	}

	.tableBoxBodyTBody {
		/* margin: 10px 10px 0; */
		margin: 10px 10px 0;
		height: 42px;
		background: #334756;
		border-radius: 2px;
		display: flex;
		align-items: center;

	}

	.reasonDesc {
		margin: 0px 10px;
		height: 42px;
		background: #334756;
		border-radius: 2px;
		display: flex;
		align-items: center;
		margin-top: -1px;
	}

	.reasonDescTitle {
		margin-left: 10px;
		color: #fff;
		font-size: 13px;
		margin-right: 10px;
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
