<template>
	<view>

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


		<view class="page-box">
			<view class="head-data">

				<view class="bottom">
					<view class="cell">
						<view class="item">
							{{$t('backapi.self.rebate.top.content.total.text')}}
						</view>
						<view class="item-data">
							+{{totalNum | moneyFormat}}
						</view>
					</view>
					<view class="cell">
						<view class="item">
							{{$t('backapi.self.rebate.top.content.week.text')}}
						</view>
						<view class="item-data">
							+{{weekNum | moneyFormat}}
						</view>
					</view>




				</view>

				<view class="bottom">
					<view class="cell">
						<view class="item">
							{{$t('backapi.self.rebate.top.content.today.text')}}
						</view>
						<view class="item-data">
							+{{todayNum | moneyFormat}}
						</view>
					</view>
					<view class="cell">
						<view class="item">
							{{$t('backapi.self.rebate.top.content.lastweek.text')}}
						</view>
						<view class="item-data">
							+{{lastWeekNum | moneyFormat}}
						</view>
					</view>




				</view>

			</view>
			<view class="table-box">
				<view class="rebateContainerMain">
					<view class="rebateContainerMainTableBox">

						<view class="rebateContainerMainTableBoxBody">

							<mescroll-uni ref="mescrollRef" :fixed="false" height="450px" top="0" :topbar="false"
								bottom="0" :bottombar="false" :safearea="false" @init="mescrollInit"
								@down="downCallback" @up="upCallback" :down="downOption" :up="upOption">

								<view class="items" v-for="(item,index) in rebateList" :key="item.id">
									<view class="tops">
										{{item.createdAt | timeToDate}}
									</view>

									<view class="botms">
										<view class="blockslist">
											<view class="blocks1">
												<view class="labels hascolor">
													{{item.money | moneyFormat}}
												</view>
												<view class="values labelcolor">
													{{$t('user.rebate.center.list.nav.smount.text')}}
												</view>
											</view>

											<view class="blocks1">
												<view class="labels">
													{{item.typeName }}
												</view>
												<view class="values">
													{{$t('user.rebate.center.list.nav.type.text')}}
												</view>
											</view>
										</view>
										<view class="blockslist">
											<view class="blocks1 btns">
												<view class="fonts">
													{{item.ymd}}
												</view>
											</view>
										</view>

									</view>
								</view>

							</mescroll-uni>
						</view>
					</view>
				</view>

			</view>
		</view>


		<view class="rebateContainer">

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
				totalNum: 0,
				weekNum: 0,
				todayNum: 0,
				lastWeekNum: 0,

				yesterdayNum: 0,
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
						icon: "../../static/images/noData-c.png",
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
				uni.switchTab({
					url: '/pages/funList/index',
					animationType: 'slide-in-top',
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
					this.totalNum = resR.data.total
					this.weekNum = resR.data.week
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

	.page-box {
		width: 100%;
		padding: 0 16px;
	}

	.head-data {
		display: flex;
		flex-direction: column;
		// justify-content: space-between;
		justify-content: space-around;
		font-size: 13px;
		font-family: Alibaba PuHuiTi;
		width: 100%;
		background: url(../../static/images/honglibg.png) no-repeat;
		background-size: 100% 100%;
		border-radius: 5px;
		color: #fff;
		padding: 8px 16px 4px;
		margin: 7px 0;
		height: 200px;

		.top {
			margin-bottom: 10px;

			.item {
				font-size: 12px;
			}

			.item-data {
				font-size: 20px;
				color: #fff;
			}
		}


		.bottom {
			margin-bottom: 10px;

			display: flex;
			flex-direction: row;

			.cell {

				display: -webkit-box;
				display: -webkit-flex;
				display: -ms-flexbox;
				display: flex;
				-webkit-box-align: start;
				-webkit-align-items: flex-start;
				-ms-flex-align: start;
				align-items: flex-start;
				-webkit-box-pack: center;
				-webkit-justify-content: center;
				-ms-flex-pack: center;
				justify-content: center;
				-webkit-box-orient: vertical;
				-webkit-box-direction: normal;
				-webkit-flex-direction: column;
				-ms-flex-direction: column;
				flex-direction: column;
				-webkit-box-flex: 1;
				-webkit-flex: 1;
				-ms-flex: 1;
				flex: 1;
				text-align: left;

				.item {
					margin-bottom: 4px;
				}

				.item-data {
					font-size: 13px;
					color: #fff;
					// text-align: center;
				}
			}

		}
	}

	.table-box {
		margin-top: 10px;
	}

	.rebateContainerMainTableBox {
		height: 100%;

	}

	.rebateContainerMainTableBoxHeader {
		height: 50px;
		background: #597ef7;
		// box-shadow: 0 1px 3px rgb(0 0 0 / 16%);
		// border-radius: 5px 5px 0 0;
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
		background: #f8f8f8;
		border-radius: 0 0 5px 5px;

		.items {
			// width: 9.46667rem;
			background: #fff;
			border-radius: 4px;
			margin-top: 5px;
			box-sizing: border-box;
			padding: 13px 20px;
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-pack: justify;
			-webkit-justify-content: space-between;
			-ms-flex-pack: justify;
			justify-content: space-between;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-webkit-flex-direction: column;
			-ms-flex-direction: column;
			flex-direction: column;

			.tops {
				color: #333;
				font-size: 13px;
				font-weight: 700;
			}

			.botms {

				display: -webkit-box;
				display: -webkit-flex;
				display: -ms-flexbox;
				display: flex;
				flex-direction: column;
				-webkit-flex-direction: column;
				-webkit-box-align: center;
				-webkit-align-items: center;
				-ms-flex-align: center;
				align-items: center;
				-webkit-box-pack: justify;
				-webkit-justify-content: space-between;
				-ms-flex-pack: justify;
				justify-content: space-between;

				.blockslist {
					width: 100%;
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

					.blocks1 {
						display: -webkit-box;
						display: -webkit-flex;
						display: -ms-flexbox;
						display: flex;
						-webkit-box-align: center;
						-webkit-align-items: center;
						-ms-flex-align: center;
						align-items: center;
						-webkit-box-pack: center;
						-webkit-justify-content: center;
						-ms-flex-pack: center;
						justify-content: center;
						-webkit-box-orient: vertical;
						-webkit-box-direction: normal;
						-webkit-flex-direction: column;
						-ms-flex-direction: column;
						flex-direction: column;
						position: relative;

						.labels {
							font-size: 16px;
							color: #333;
							font-weight: 700;
							margin-top: 20px;
						}

						.values {
							color: #666;
							font-size: 12px;
							text-align: center;
							margin-top: 4px;
							margin-bottom: 6px;
						}

						.hascolor {
							color: red;
						}

						.labelcolor {
							color: #ff3636;
						}
					}

					.fonts {
						position: absolute;
						width: 100%;
						min-height: 44px;
						top: 0;
						bottom: 0;
						left: 0;
						right: 0;
						text-align: center;
						// line-height: 39px;
						color: #fff;
						font-weight: 700;
						font-size: 16px;
						background: linear-gradient(#FCC42A, #F89508);
						border-radius: 5px;
						padding-top: 15px;
						padding-bottom: 15px;
						display: flex;
						align-items: center;
						justify-content: center;
					}


				}


				.btns {
					// width: 90.5px;
					width: 100%;
					min-height: 39px;

					.btnbg {
						width: 100%;
						// width: 90.5px;
						min-height: 39px;
					}


				}


			}
		}

	}

	.rebateContainerMainTableBoxBodyCell {
		display: flex;
		align-items: center;
		min-height: 42px;
		// background: #334756;
		border-radius: 2px;
		// margin: 10px 10px 0;
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
