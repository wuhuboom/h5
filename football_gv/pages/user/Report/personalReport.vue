<template>
	<view class="personalReportPage">
		<uni-nav-bar backgroundColor="#00111C" color="#fff" :statusBar="true" :border="false"
			@clickLeft="goBackBtnClick" style="font-weight: 600;" :fixed="true">
			<block slot="left">
				<view class="navLeftBtn">
					<image src="../../../static/images/back.svg" mode=""></image>
				</view>
			</block>

			<view class="navTitleCenter">{{navTitle}}</view>
		</uni-nav-bar>


		<!-- 		<u-tabs
			:list="tabList" 
			:is-scroll="true" 
			:current="current" 
			:gutter="30"
			:bold="false"
			bg-color="#00111c"
			font-size="20"
			:item-width ="200"
			:bar-width="140"
			:bar-height="2"
			inactive-color="#FFFFFF"
			active-color="#3d8dfe"
			@change="tabChange"
		></u-tabs> -->

		<v-tabs v-model="current" :tabs="tabSimpleList" lineHeight="4rpx" bgColor="#00111c" color="#FFFFFF"
			activeColor="#3d8dfe" @change="tabChange"></v-tabs>

		<view class="personContainer">
			<view class="personSearchBox">
				<u-input v-model="searchUsername" :clearable="false" height="80" :custom-style="customStyleInput"
					:placeholder="placeholderAccount" placeholder-style="color:#506778;font-size:12px" />
				<view class="personSearchBox_searchBtn" @click="searchBtnClick">
					{{$t('user.person.report.center.data.query.search.text')}}
				</view>
			</view>

			<view class="personSearchBox_tableBox">
				<view class="personSearchBox_tableBox_hearder">
					<view class="tableBoxHearderDate">
						{{$t('user.person.report.center.list.head.date.text')}}
					</view>
					<view class="tableBoxHearderUserName">
						{{$t('user.person.report.center.list.head.username.text')}}
					</view>
					<view class="tableBoxHearderRecharge">
						{{$t('user.person.report.center.list.head.recharge.text')}}
					</view>
					<view class="tableBoxHearderWithdraw">
						{{$t('user.person.report.center.list.head.withdraw.text')}}
					</view>
					<view class="tableBoxHearderOperate">
						{{$t('user.person.report.center.list.head.operate.text')}}
					</view>
				</view>
				<view class="personSearchBox_tableBox_tboday">
					<mescroll-uni ref="mescrollRef" :fixed="true" height="900" top="0" :topbar="false" bottom="0"
						:bottombar="true" :safearea="false" @init="mescrollInit" @down="downCallback" @up="upCallback"
						:down="downOption" :up="upOption">

						<view class="personSearchBox_tableBox_tboday_cell" v-for="(item,index) in dataList"
							:key="index">
							<view class="">
								{{item.date}}
							</view>
							<view class="">
								{{currUser}}
							</view>
							<view class="">
								{{item.recharge | moneyFormat}}
							</view>
							<view class="">
								{{Math.abs(item.withdrawal) | moneyFormat}}
							</view>
							<view class="personSearchBox_tableBox_tboday_cell_detail" @click="personDetailClick(item)">
								{{$t('user.person.report.center.list.body.detail.text')}}
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
		<transition>

			<view class="tableBoxBodyTBodyItem_detail_person" v-if="detailMaskBool">
				<view class="tableBoxBodyTBodyItem_detail_person_tit">
					{{$t('user.person.report.center.detail.data.title.text')}}
				</view>
				<view class="tableBoxBodyTBodyItem_detail_person_content">
					<view class="tableBoxBodyTBodyItem_detail_person_item">
						<view class="tableBoxBodyTBodyItem_detail_person_item_label">
							{{$t('user.person.report.center.detail.data.game.bet.text')}}
						</view>
						<view class="tableBoxBodyTBodyItem_detail_person_item_content">
							{{Math.abs(betNum) | moneyFormat }}
						</view>
					</view>
					<view class="tableBoxBodyTBodyItem_detail_person_item">
						<view class="tableBoxBodyTBodyItem_detail_person_item_label">
							{{$t('user.person.report.center.detail.data.game.win.text')}}
						</view>
						<view class="tableBoxBodyTBodyItem_detail_person_item_content">
							{{winNum | moneyFormat}}
						</view>
					</view>
					<view class="tableBoxBodyTBodyItem_detail_person_item">
						<view class="tableBoxBodyTBodyItem_detail_person_item_label">
							{{$t('user.person.report.center.detail.data.agent.rebate.text')}}
						</view>
						<view class="tableBoxBodyTBodyItem_detail_person_item_content">
							{{agengtNum | moneyFormat}}
						</view>
					</view>
					<view class="tableBoxBodyTBodyItem_detail_person_item">
						<view class="tableBoxBodyTBodyItem_detail_person_item_label">
							{{$t('user.person.report.center.detail.data.activity.text')}}
						</view>
						<view class="tableBoxBodyTBodyItem_detail_person_item_content">
							{{activeNum | moneyFormat}}
						</view>
					</view>

				</view>
				<view class="tableBoxBodyTBodyItem_detail_order_btn_top">
					<view class="tableBoxBodyTBodyItem_detail_order_btn " @click="closureClick">
						{{$t('user.person.report.center.detail.data.close.text')}}
					</view>
				</view>
			</view>

		</transition>


	</view>
</template>

<script>
	import {
		reportFormReq,
		playerInfoReq
	} from '@/api/index.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	import MescrollBodyDiy from "@/uni_modules/mescroll-uni/components/mescroll-diy/football/mescroll-body.vue";
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin, myMixin], // 使用mixin
		components: {
			MescrollBodyDiy // 避免与main.js注册的全局组件名称相同,否则注册组件失效(iOS真机 APP HBuilderX2.7.9)
		},
		data() {
			return {
				navTitle: this.$t('user.person.report.center.title.text'),
				current: 0,
				tabSimpleList: [
					this.$t('user.statistics.center.today.text'),
					this.$t('user.statistics.center.yes.text'),
					this.$t('user.statistics.center.nearly7.text'),
					this.$t('user.statistics.center.nearly10.text'),
					this.$t('user.statistics.center.nearly30.text')
				],

				tabList: [{
					name: this.$t('user.person.report.center.today.text'),
				}, {
					name: this.$t('user.person.report.center.yes.text'),
				}, {
					name: this.$t('user.person.report.center.nearly7.text'),
				}, {
					name: this.$t('user.person.report.center.nearly10.text'),
				}, {
					name: this.$t('user.person.report.center.nearly30.text'),
				}],
				customStyleInput: {
					"border-radius": "5px",
					"background-color": "#334756",
					"text-indent": "10px",
					"color": "#fff"
				},
				placeholderAccount: this.$t('user.person.report.center.data.query.account.text'),
				searchUsername: '',
				detailMaskBool: false,
				dataList: [],
				pageNo: 1,
				pageSize: 10,
				betNum: 0,
				winNum: 0,
				agengtNum: 0,
				activeNum: 0,
				currUser: '',

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
						icon: "../../../static/images/nodata.png",
						tip: 'Absolutely empty'
					},
					textLoading: 'Loading',
					textNoMore: '-- End --'
				}
			}
		},
		onShow() {

			this.current = 0
			this.dataList = []
			this.getInfoData()
			this.getPersonReportData(this.pageNo, this.pageSize)

		},
		methods: {
			goBackBtnClick() {
				uni.navigateTo({
					url: '/pages/user/report_management',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			async getInfoData() {
				let resR = await playerInfoReq(this.localLoginToken)
				if (resR.code === 200) {
					// console.log("resR",resR);
					this.currUser = resR.data.username
				}
			},
			tabChange(index) {
				this.current = index;
				this.dataList = []
				this.mescroll.resetUpScroll();
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
				this.getPersonReportData(pageNum, pageSize)
			},
			/*若希望重新加载列表,只需调用此方法即可(内部会自动page.num=1,再主动触发up.callback)*/
			reloadList() {
				this.mescroll.resetUpScroll();
			},
			async getPersonReportData(pageNum, pageSize) {
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
				if (this.searchUsername) {
					reqParam.username = this.searchUsername
				}
				reqParam.time = this.current + 1
				// reqParam.pageNo = pageNum
				// reqParam.pageSize = pageSize
				let resR = await reportFormReq(reqParam, this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {
					this.mescroll.endBySize(resR.data.length, 0)
					//设置列表数据
					if (pageNum == 1) this.dataList = []; //如果是第一页需手动制空列表
					this.dataList = this.dataList.concat(resR.data); //追加新数据
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
			personDetailClick(item) {
				this.detailMaskBool = true
				this.betNum = item.bet
				this.winNum = item.bingo
				this.agengtNum = item.rebate
				this.activeNum = item.activity
			},
			detailMaskClick() {
				this.detailMaskBool = false
			},
			closureClick() {
				this.detailMaskBool = false
			},
			searchBtnClick() {
				this.dataList = []
				this.mescroll.resetUpScroll();
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

	.personalReportPage {}

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


	.personContainer {
		padding: 0 16px;
		height: calc(100% - 88px);
		padding-bottom: 10px;
	}

	.personSearchBox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 10px;
		padding-bottom: 4px;
	}

	.personSearchBox_searchBtn {
		text-align: center;
		font-size: 14px;
		background-color: #3d8dfe;
		width: 73px;
		height: 42px;
		line-height: 42px;
		border-radius: 5px;
		font-weight: 400;
		color: #fff;
		margin-left: 10px;
	}

	.personSearchBox_tableBox {
		height: calc(100% - 65px);
		margin-top: 6px;
		padding-bottom: 4px;
		border-radius: 5px;
		overflow: hidden;

	}

	.personSearchBox_tableBox_hearder {
		/* width: 100%; */
		font-size: 12px;
		background: #334756;
		box-shadow: 0 1px 3px rgb(0 0 0 / 16%);
		border-radius: 5px 5px 0 0;
		padding: 0 10px;
		display: flex;
		align-items: center;
	}

	.personSearchBox_tableBox_hearder view {
		width: 20%;
		color: #fff;
		font-family: Robot;
		display: flex;
		align-items: center;
		justify-content: center;
		word-wrap: break-word;
		padding: 10px 0;
		text-align: center;
	}

	.personSearchBox_tableBox_tboday {
		background: #132736;
	}

	.personSearchBox_tableBox_tboday_cell {
		height: 42px;
		display: flex;
		align-items: center;
		background: #334756;
		border-radius: 2px;
		margin: 10px;
		font-family: SimHei;
	}

	.personSearchBox_tableBox_tboday_cell view {
		font-size: 12px;
		color: #fff;
		width: 20%;
		text-align: center;
	}

	.personSearchBox_tableBox_tboday_cell_detail {
		color: #00ff65 !important;
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

	.tableBoxBodyTBodyItem_detail_person {
		position: absolute;
		left: 0;
		right: 0;
		top: -10px;
		bottom: 0;
		margin: auto;
		overflow: hidden;
		width: calc(100% - 32px);
		height: 360px;
		background-color: #132736;
		border-radius: 10px;
		z-index: 1000;
		color: #fff;
	}

	.tableBoxBodyTBodyItem_detail_person_tit {
		text-align: center;
		font-size: 16px;
		font-weight: 700;
		padding-top: 10px;

	}

	.tableBoxBodyTBodyItem_detail_person_content {
		margin-top: 10px;
	}


	.tableBoxBodyTBodyItem_detail_person_item {
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

	.tableBoxBodyTBodyItem_detail_person_item_label {}

	.tableBoxBodyTBodyItem_detail_person_item_content {}


	.tableBoxBodyTBodyItem_detail_order_btn_top {
		position: absolute;
		bottom: 25px;
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





	/*上下抖动*/
	@keyframes anm8 {
		0% {
			transform: translateY(0px);
		}

		10% {
			transform: translateY(-23px);
		}

		20% {
			transform: translateY(0px);
		}

		30% {
			transform: translateY(-20px);
		}

		40% {
			transform: translateY(0px);
		}

		50% {
			transform: translateY(-13px);
		}

		60% {
			transform: translateY(0px);
		}

		70% {
			transform: translateY(-8px);
		}

		80% {
			transform: translateY(0px);
		}

		90% {
			transform: translateY(-5px);
		}

		100% {
			transform: translateY(0px);
		}
	}


	@-webkit-keyframes slide-in-elliptic-top-fwd {
		0% {
			-webkit-transform: translateY(-600px) rotateX(-30deg) scale(0);
			transform: translateY(-600px) rotateX(-30deg) scale(0);
			-webkit-transform-origin: 50% 100%;
			transform-origin: 50% 100%;
			opacity: 0;
		}

		100% {
			-webkit-transform: translateY(0) rotateX(0) scale(1);
			transform: translateY(0) rotateX(0) scale(1);
			-webkit-transform-origin: 50% 1400px;
			transform-origin: 50% 1400px;
			opacity: 1;
		}
	}

	@keyframes slide-in-elliptic-top-fwd {
		0% {
			-webkit-transform: translateY(-600px) rotateX(-30deg) scale(0);
			transform: translateY(-600px) rotateX(-30deg) scale(0);
			-webkit-transform-origin: 50% 100%;
			transform-origin: 50% 100%;
			opacity: 0;
		}

		100% {
			-webkit-transform: translateY(0) rotateX(0) scale(1);
			transform: translateY(0) rotateX(0) scale(1);
			-webkit-transform-origin: 50% 1400px;
			transform-origin: 50% 1400px;
			opacity: 1;
		}
	}

	@-webkit-keyframes slide-out-elliptic-bottom-bck {
		0% {
			-webkit-transform: translateY(0) rotateX(0) scale(1);
			transform: translateY(0) rotateX(0) scale(1);
			-webkit-transform-origin: 50% -1400px;
			transform-origin: 50% -1400px;
			opacity: 1;
		}

		100% {
			-webkit-transform: translateY(600px) rotateX(30deg) scale(0);
			transform: translateY(600px) rotateX(30deg) scale(0);
			-webkit-transform-origin: 50% 100%;
			transform-origin: 50% 100%;
			opacity: 1;
		}
	}

	@keyframes slide-out-elliptic-bottom-bck {
		0% {
			-webkit-transform: translateY(0) rotateX(0) scale(1);
			transform: translateY(0) rotateX(0) scale(1);
			-webkit-transform-origin: 50% -1400px;
			transform-origin: 50% -1400px;
			opacity: 1;
		}

		100% {
			-webkit-transform: translateY(600px) rotateX(30deg) scale(0);
			transform: translateY(600px) rotateX(30deg) scale(0);
			-webkit-transform-origin: 50% 100%;
			transform-origin: 50% 100%;
			opacity: 1;
		}
	}



	@-webkit-keyframes roll-in-left {
		0% {
			-webkit-transform: translateX(-800px) rotate(-540deg);
			transform: translateX(-800px) rotate(-540deg);
			opacity: 0;
		}

		100% {
			-webkit-transform: translateX(0) rotate(0deg);
			transform: translateX(0) rotate(0deg);
			opacity: 1;
		}
	}

	@keyframes roll-in-left {
		0% {
			-webkit-transform: translateX(-800px) rotate(-540deg);
			transform: translateX(-800px) rotate(-540deg);
			opacity: 0;
		}

		100% {
			-webkit-transform: translateX(0) rotate(0deg);
			transform: translateX(0) rotate(0deg);
			opacity: 1;
		}
	}

	@-webkit-keyframes roll-out-right {
		0% {
			-webkit-transform: translateX(0) rotate(0deg);
			transform: translateX(0) rotate(0deg);
			opacity: 1;
		}

		100% {
			-webkit-transform: translateX(1000px) rotate(540deg);
			transform: translateX(1000px) rotate(540deg);
			opacity: 0;
		}
	}

	@keyframes roll-out-right {
		0% {
			-webkit-transform: translateX(0) rotate(0deg);
			transform: translateX(0) rotate(0deg);
			opacity: 1;
		}

		100% {
			-webkit-transform: translateX(1000px) rotate(540deg);
			transform: translateX(1000px) rotate(540deg);
			opacity: 0;
		}
	}


	.v-enter-active {
		animation: slide-in-elliptic-top-fwd 1s linear;
		-webkit-animation: slide-in-elliptic-top-fwd 1s linear;
	}

	.v-leave-active {
		animation: slide-out-elliptic-bottom-bck 1s linear;
		-webkit-animation: slide-out-elliptic-bottom-bck 1s linear;
	}
</style>
