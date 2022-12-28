<template>
	<view>
		<uni-nav-bar backgroundColor="#00111C" color="#fff" :statusBar="true" :border="false"
			@clickLeft="goBackBtnClick" style="font-weight: 600;" :fixed="true">
			<block slot="left">
				<view class="navLeftBtn">
					<image src="../../static/images/back.svg" mode=""></image>
				</view>
			</block>

			<view class="navTitleCenter">{{navTitle}}</view>
		</uni-nav-bar>

		<view class="rebateContainer">
			<view class="rebateContainerHeader">
				<view class="today_rebate">
					<view class="today_rebate_tip">
						{{$t('user.rebate.center.today.rebate.text')}}
					</view>
					<view class="today_rebate_num">
						+{{todayNum | moneyFormat}}
					</view>
				</view>
				<view class="yes_week_rebate">
					<view class="yes_rebate">
						<view class="yes_rebate_tip">
							{{$t('user.rebate.center.yes.rebate.text')}}
						</view>
						<view class="yes_rebate_num">
							+{{yesterdayNum | moneyFormat}}
						</view>
					</view>
					<view class="week_rebate">
						<view class="week_rebate_tip">
							{{$t('user.rebate.center.lastweek.rebate.text')}}
						</view>
						<view class="week_rebate_num">
							+{{lastWeekNum | moneyFormat}}
						</view>
					</view>
				</view>
			</view>
			<view class="rebateContainerMain">
				<view class="rebateContainerMainTableBox">
					<view class="rebateContainerMainTableBoxHeader">
						<view class="textCenter_tableBox">
							{{$t('user.rebate.center.list.nav.date.text')}}
						</view>
						<view class="textCenter_tableBox">
							{{$t('user.rebate.center.list.nav.type.text')}}
						</view>
						<view class="textCenter_tableBox">
							{{$t('user.rebate.center.list.nav.smount.text')}}
						</view>
						<view class="textCenter_tableBox">
							{{$t('user.rebate.center.list.nav.operate.text')}}
						</view>
					</view>
					<view class="rebateContainerMainTableBoxBody">


						<mescroll-uni ref="mescrollRef" :fixed="false" height="350px" top="0" :topbar="false" bottom="0"
							:bottombar="false" :safearea="false" @init="mescrollInit" @down="downCallback"
							@up="upCallback" :down="downOption" :up="upOption">
							<view class="rebateContainerMainTableBoxBodyCell" v-for="(item,index) in rebateList"
								:key="item.id">
								<view class="rebateContainerMainTableBoxBodyCell_Date">
									{{item.createdAt | timeToDate}}
								</view>
								<view class="rebateContainerMainTableBoxBodyCell_Type">
									<!-- {{$t('user.rebate.center.list.cell.profit.text')}} -->
									{{item.typeName }}
								</view>
								<view class="rebateContainerMainTableBoxBodyCell_Money">
									{{item.money | moneyFormat}}
								</view>
								<view class="rebateContainerMainTableBoxBodyCell_Operate"
									:style="item.status === 1 ? 'color: #00ff65;' : item.status === 3 || item.status === 4 ? 'color: #3d8dfe;' : 'color: #fff;'"
									@click="item.status === 1 ? receiveClick(item) : null">
									{{item.status === 1 ? $t('user.rebate.center.list.cell.receive.text') : item.status === 3 ? $t('user.rebate.center.list.cell.wait.person.text') : $t('user.rebate.center.list.cell.already.receive.text')}}
								</view>
							</view>


						</mescroll-uni>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		rebateStatisReq,
		rebateListReq,
		rebateDrawReq
	} from '@/api/index.js'
	// import {
	// 	getTimeState,
	// 	formatDateToStr,
	// 	formatDateTimeSolt
	// } from '../../common/publicTool.js'
	// import {mapState,mapMutations} from 'vuex'
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
				navTitle: this.$t('user.rebate.center.title.text'),
				yesterdayNum: 0,
				todayNum: 0,
				lastWeekNum: 0,
				pageNoNum: 1,
				pageSizeNum: 10,
				rebateList: [],
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
					toTop: {
						src: null,
						offset: 1000,
						duration: 300,
						zIndex: 9990,
						// right: 20,
						// bottom: 40,
						right: 60,
						bottom: 180,
						// right: 20,
						// bottom: 120,
						safearea: false,
						width: 72,
						radius: "50%",
						left: null
					},
					empty: {
						use: true,
						icon: "../../static/images/nodata.png",
						tip: 'Absolutely empty',
						btnText: "",
						fixed: false,
						top: "100rpx",
						zIndex: 99
					},
					textLoading: 'Loading',
					textNoMore: '-- End --'
				},
				listHeight: 0,
			}
		},
		filters: {
			// typeToStr(value){
			// 	if(value){
			// 		if(value.type)
			// 		return value
			// 	}
			// }
		},
		onShow() {

			// 初始化数据
			this.initData()
		},
		methods: {
			goBackBtnClick() {
				uni.navigateTo({
					url: '/pages/user/report_management',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			initData() { //初始化数据集

				// 初始化统计数据
				this.getStatisData()

				// 初始化列表数据
				this.getListData(this.pageNoNum, this.pageSizeNum)


			},
			async getStatisData() { //初始化统计数据
				let resR = await rebateStatisReq({}, this.localLoginToken)
				if (resR.code === 200) {
					this.yesterdayNum = resR.data.yesterday
					this.todayNum = resR.data.today
					this.lastWeekNum = resR.data.lastWeek
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
			async getListData(pageNo, pageSize) { //初始化列表数据
				// 动态更新全局配置
				uni.$emit("setMescrollGlobalOption", {
					up: {
						empty: {
							tip: this.$t('alert.absolutely.empty')
						},
						textNoMore: this.$t('alert.nomore')
					},
				})
				let resParam = {}
				resParam.pageNo = pageNo
				resParam.pageSize = pageSize

				let resR = await rebateListReq(resParam, this.localLoginToken)
				if (resR.code === 200) {
					let resultsArr = resR.data.results
					let resultsArrNew = []
					let rebateType
					resultsArr.forEach((item, index) => {
						// rebateType = this.realTypeName(item.type)
						// 1下注返佣 2盈利返佣 3充值返佣
						if (item.type === 1) {
							rebateType = this.$t('user.rebate.center.list.cell.bet.text')
						} else if (item.type === 2) {
							rebateType = this.$t('user.rebate.center.list.cell.profit.text')
						} else if (item.type === 3) {
							rebateType = this.$t('user.rebate.center.list.cell.recharge.text')
						}

						resultsArrNew.push({
							...item,
							typeName: rebateType
						})
					})

					this.mescroll.endBySize(resR.data.results.length, resR.data.totalCount)
					//设置列表数据
					if (pageNo == 1) this.rebateList = []; //如果是第一页需手动制空列表
					this.rebateList = this.rebateList.concat(resultsArrNew); //追加新数据

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
			/*mescroll组件初始化的回调,可获取到mescroll对象 (此处可删,mixins已默认)*/
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},

			/*下拉刷新的回调, 重置列表为第一页 (此处可删,mixins已默认)*/
			downCallback() {
				this.rebateList = []
				this.mescroll.resetUpScroll();
			},
			/*上拉加载的回调*/
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条

				// console.log("pageNum",pageNum);
				// console.log("pageSize",pageSize);
				this.getListData(pageNum, pageSize)
			},
			/*若希望重新加载列表,只需调用此方法即可(内部会自动page.num=1,再主动触发up.callback)*/
			reloadList() {
				this.mescroll.resetUpScroll();
			},
			getRebateData() {
				this.mescroll.endBySize(0, 1)
			},
			async receiveClick(item) {
				// console.log("领取点击事件",item);
				let resParam = {}
				resParam.id = item.id
				let resR = await rebateDrawReq(resParam, this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {
					uni.showToast({
						title: this.$t('user.rebate.center.list.cell.receive.success.text'),
						icon: 'none',
						duration: 2000,
						success: (res) => {
							this.mescroll.resetUpScroll();
						}
					});
				} else if (resR.code === 103) {
					let currMsgKey = resR.data[0].msgKey
					uni.showToast({
						title: this.$t(`backapi.${currMsgKey}`),
						icon: 'none',
						duration: 2000,
					});
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

	.rebateContainer {
		padding: 0 16px;
		height: calc(100% - 54px);
	}

	.rebateContainerHeader {
		margin-top: 10px;
		height: 139px;
		background: url(../../static/images/tu1_2x.png);
		background-size: 100% 100%;
		padding: 10px;
	}


	.rebateContainerMain {
		height: calc(100% - 149px);
		margin-top: 10px;
	}

	.today_rebate {}

	.today_rebate_tip {
		font-size: 12px;
		font-weight: 400;
		line-height: 15px;
		color: #3d8dfe;

	}

	.today_rebate_num {
		font-size: 32px;
		font-weight: 500;
		color: #fff;
		line-height: 60px;
	}

	.yes_week_rebate {
		display: flex;
	}

	.yes_rebate {
		width: 50%;
	}

	.yes_rebate_tip {
		font-size: 12px;
		font-weight: 400;
		line-height: 15px;
		color: #3d8dfe;

	}

	.yes_rebate_num {
		font-size: 16px;
		font-weight: 500;
		color: #fff;
		line-height: 35px;
	}

	.week_rebate {
		width: 50%;
	}

	.week_rebate_tip {
		font-size: 12px;
		font-weight: 400;
		line-height: 15px;
		color: #3d8dfe;
	}


	.week_rebate_num {
		font-size: 16px;
		font-weight: 500;
		color: #fff;
		line-height: 35px;
	}

	.rebateContainerMainTableBox {
		height: 100%;

	}

	.rebateContainerMainTableBoxHeader {
		height: 50px;
		background: #334756;
		box-shadow: 0 1px 3px rgb(0 0 0 / 16%);
		border-radius: 5px 5px 0 0;
		/* width: 100%; */
		padding: 0 10px;
		display: flex;
		align-items: center;
	}

	.textCenter_tableBox {
		width: 25%;
		font-size: 12px;
		font-family: Alibaba PuHuiTi;
		font-weight: 500;
		line-height: 20px;
		color: #fff;
		text-align: center;
	}

	.rebateContainerMainTableBoxBody {
		height: calc(100% - 60px);
		background: #132736;
		border-radius: 0 0 5px 5px;
	}

	.rebateContainerMainTableBoxBodyCell {
		display: flex;
		align-items: center;
		min-height: 42px;
		background: #334756;
		border-radius: 2px;
		margin: 10px 10px 0;
	}

	.rebateContainerMainTableBoxBodyCell_Date {
		width: 25%;
		color: #fff;
		font-size: 12px;
		text-align: center;
	}

	.rebateContainerMainTableBoxBodyCell_Type {
		width: 25%;
		color: #fff;
		font-size: 12px;
		text-align: center;
	}

	.rebateContainerMainTableBoxBodyCell_Money {
		width: 25%;
		color: #fff;
		font-size: 12px;
		text-align: center;
	}

	.rebateContainerMainTableBoxBodyCell_Operate {
		width: 25%;
		color: #fff;
		font-size: 12px;
		text-align: center;
	}
</style>
