<template>
	<view class="page-layout">
		<view class="back">
			<view class="main">
				<u-navbar :is-back="true" :background="backgroundOBj" :border-bottom="false" z-index="1200"
					back-icon-color="#fff" title-color="#fff" :title="navTitle" :custom-back="goBackBtnClick">
				</u-navbar>

				<view class="content_container">
					<view class="searchBox">
						<view class="filterBtn" @click="filterBtnClick">
							{{$t("account.change.filter.btn.text")}}
						</view>

					</view>
					<view class="tableBox">
						<mescroll-uni ref="mescrollRef" :fixed="true" height="900" top="0" :topbar="false" bottom="0"
							:bottombar="true" :safearea="false" @init="mescrollInit" @down="downCallback"
							@up="upCallback" :down="downOption" :up="upOption">

							<view class="tableBoxBodyTBody" v-for="(item, index) in dataList" :key="index">
								<view class="item_cell">
									<view class="left">
										{{$t('order.record.list.cell.top.MerChantNum.text')}}
									</view>
									<view class="right">
										{{item.MerChantNum}}
									</view>
								</view>

								<view class="item_cell">
									<view class="left">
										{{$t('order.record.list.cell.top.MerchantOrderNum.text')}}
									</view>
									<view class="right">
										{{item.MerchantOrderNum}}
									</view>
								</view>

								<view class="item_cell">
									<view class="left">
										{{$t('order.record.list.cell.top.OwnOrder.text')}}
									</view>
									<view class="right">
										{{item.OwnOrder}}
									</view>
								</view>

								<view class="item_cell">
									<view class="left">
										{{$t('order.record.list.cell.top.Amount.text')}}
									</view>
									<view class="right">
										{{item.Amount}}
									</view>
								</view>

								<view class="item_cell">
									<view class="left">
										{{$t('order.record.list.cell.top.ActualAmount.text')}}
									</view>
									<view class="right">
										{{item.ActualAmount }}
									</view>
								</view>
								<view class="item_cell">
									<view class="left">
										{{$t('order.record.list.cell.top.Kinds.text')}}
									</view>
									<view class="right">
										{{item.kindName}}
									</view>
								</view>

								<view class="item_cell">
									<view class="left">
										{{$t('order.record.list.cell.top.Status.text')}}
									</view>
									<view class="right">
										{{item.typeName}}
									</view>
								</view>

								<view class="item_cell">
									<view class="left">
										{{$t('order.record.list.cell.top.Upi.text')}}
									</view>
									<view class="right">
										{{item.Upi}}
									</view>
								</view>

								<view class="item_cell">
									<view class="left">
										{{$t('order.record.list.cell.top.remark.text')}}
									</view>
									<view class="right">
										{{item.Remark}}
									</view>
								</view>

								<view class="item_cell">
									<view class="left">
										{{$t('order.record.list.cell.top.date.text')}}
									</view>
									<view class="right">
										{{item.Date}}
									</view>
								</view>

								<view class="item_cell">
									<view class="left">
										{{$t('order.record.list.cell.top.create.text')}}
									</view>
									<view class="right">
										{{item.Created | timestampStr2}}
									</view>
								</view>

							</view>

						</mescroll-uni>
					</view>
				</view>


			</view>
		</view>
		<!--mode="bottom" height="1300" -->
		<u-popup v-model="filterModelBool" safe-area-inset-bottom closeable border-radius="60" :mask-close-able="false"
			width="700">
			<view class="filterContainer">
				<view class="title">
					{{$t('account.change.list.filter.top.title.text')}}
				</view>
				<view class="desctxt">
					{{$t('account.change.list.filter.top.desc.text')}}
				</view>
				<view class="line">

				</view>
				<view class="content">
					<view class="cell">
						<view class="txt">
							{{$t('order.record.list.filter.cell.top.statu.text')}}
						</view>
						<view class="lists">
							<view :class="chooseTypeIndex === item.idkey ? 'i_list_active' : 'i_list'"
								v-for="(item,index) in typeList" :key="item.idkey" @click="typeClick(item)">
								{{item.valueStr}}
								<image src="../../static/images/checktrue.png" mode="" class="checkimg"
									v-if="chooseTypeIndex === item.idkey"></image>
							</view>
						</view>
					</view>

					<view class="cell" style="margin-top: 10px;">
						<view class="txt">
							{{$t('order.record.list.filter.cell.top.kind.text')}}
						</view>
						<view class="lists">
							<view :class="chooseKindIndex === item.idkey ? 'i_list_active' : 'i_list'"
								v-for="(item,index) in kindList" :key="item.idkey" @click="kindClick(item)">
								{{item.valueStr}}
								<image src="../../static/images/checktrue.png" mode="" class="checkimg"
									v-if="chooseKindIndex === item.idkey"></image>
							</view>
						</view>

					</view>

					<view class="cell" style="margin-top: 10px;">
						<view class="txt">
							{{$t('order.record.list.filter.cell.top.start.text')}}
						</view>
						<view class="lists" style="margin-top: 10px;">
							<uni-datetime-picker v-model="startTimerStr" returnType="timestamp" />
						</view>
					</view>

					<view class="cell" style="margin-top: 10px;">
						<view class="txt">
							{{$t('order.record.list.filter.cell.top.end.text')}}
						</view>
						<view class="lists" style="margin-top: 10px;">
							<uni-datetime-picker v-model="endTimerStr" returnType="timestamp" />
						</view>
					</view>
				</view>
				<!-- 		<uni-datetime-picker v-model="rangeArr" type="datetimerange" rangeSeparator="-"
								@change="datetimechange" /> -->

				<view class="query_btn" @click="querySearch">
					{{$t('account.change.list.filter.cell.bottom.query.text')}}
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import {
		getCollectionRecordReq
	} from '../../api/index.js'
	import {
		myMixin,
	} from '@/util/mixins.js'
	import MescrollBodyDiy from "@/uni_modules/mescroll-uni/components/mescroll-diy/football/mescroll-body.vue";
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		components: {

		},
		mixins: [MescrollMixin, myMixin],
		filters: {
			saveTwoStr(value) {
				// console.log("value", value);
				// console.log("val",formatDateToStr(value));
				return value.toFixed(2)
			}
		},
		data() {
			return {
				navTitle: this.$t('user.list.cell.order.record.text'),
				backgroundOBj: {
					"background": "transparent"
				},
				scrollTop: 0,
				dataUserList: [],

				username: '',
				balance: 0,
				cashPledge: 0,
				vipNum: 0,
				reateAmount: 0,
				dataUserListCellStyle: 'border-radius: 10px;',
				noticeNum: 0,
				currDevOsNum: null,
				downUrl: "",
				realSymbolName: '',
				realSymbol: '',

				dataList: [],
				filterModelBool: false,
				typeList: [],
				chooseTypeIndex: 999,
				kindList: [],
				chooseKindIndex: 999,
				isQueryAll: true,
				rangeArr: [],
				startTimerStr: "",
				endTimerStr: "",

				mescroll: null, // mescroll???????????? (????????????,mixins?????????)
				// ?????????????????????(??????, ??????????????????????????????)
				downOption: {

				},
				// ?????????????????????(??????, ??????????????????????????????)
				upOption: {
					toTop: {
						right: '20px',
					},
					page: {
						size: 10 // ?????????????????????,??????10
					},
					noMoreSize: 5, // ???????????????????????????????????????5????????????'-- END --'?????????
					empty: {
						icon: "../../static/images/order-record.png",
						tip: 'Absolutely empty'
					},
					textLoading: 'Loading',
					textNoMore: '-- End --'
				}
			}
		},

		onShow() {


			// ???????????????
			this.initLang()


		},
		methods: {
			// ...mapMutations(['logout']),
			initLang() { //???????????????

				let langStr = uni.getStorageSync('run_lang')
				// console.log("lang",langStr);
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
					text: this.$t('tabar.sportsresults')
				})
				uni.setTabBarItem({
					index: 3,
					text: this.$t('tabar.mine')
				})

				this.typeList = [{
					idkey: 999,
					valueStr: this.$t('order.record.list.filter.cell.top.all.text'),
				}, {
					idkey: 1,
					valueStr: this.$t('order.record.list.filter.cell.top.statu.txt1.text'),
				}, {
					idkey: 2,
					valueStr: this.$t('order.record.list.filter.cell.top.statu.txt2.text'),
				}, {
					idkey: 3,
					valueStr: this.$t('order.record.list.filter.cell.top.statu.txt3.text'),
				}, {
					idkey: 4,
					valueStr: this.$t('order.record.list.filter.cell.top.statu.txt4.text'),
				}, {
					idkey: 5,
					valueStr: this.$t('order.record.list.filter.cell.top.statu.txt5.text'),
				}, {
					idkey: 6,
					valueStr: this.$t('order.record.list.filter.cell.top.statu.txt6.text'),
				}]


				this.kindList = [{
					idkey: 999,
					valueStr: this.$t('order.record.list.filter.cell.top.all.text'),
				}, {
					idkey: 1,
					valueStr: this.$t('order.record.list.filter.cell.top.kind.txt1.text')
				}, {
					idkey: 2,
					valueStr: this.$t('order.record.list.filter.cell.top.kind.txt2.text')
				}]



			},
			goBackBtnClick() {
				uni.switchTab({
					url: '/pages/user/user',
					animationType: 'pop-in',
					animationDuration: 200
				})


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
				// reqParam.pageNo = this.pageNo
				reqParam.page = pageNum
				// reqParam.pageSize = this.pageSize
				reqParam.limit = pageSize

				if (this.chooseTypeIndex != 999) {
					reqParam.status = this.chooseTypeIndex
				}

				if (this.chooseKindIndex != 999) {
					reqParam.kinds = this.chooseKindIndex
				}

				if (this.startTimerStr) {
					reqParam.start = this.startTimerStr / 1000
				}

				if (this.endTimerStr) {
					reqParam.end = this.endTimerStr / 1000
				}
				let resR = await getCollectionRecordReq(reqParam, this.localLoginToken)

				// console.log("resR",resR.data.results);

				if (resR.code === 200) {
					let resArray = resR.result
					let resultsArrNew = []
					let typeArr
					let kindArr
					resArray.forEach((item, index) => {
						typeArr = this.realTypeReturnName(item.Status)
						kindArr = this.realKindReturnName(item.Kinds)
						resultsArrNew.push({
							...item,
							typeName: typeArr,
							kindName: kindArr,
						})
					})

					this.mescroll.endBySize(resR.result.length, resR.result.count)
					//??????????????????
					if (pageNum == 1) this.dataList = []; //???????????????????????????????????????
					this.dataList = this.dataList.concat(resultsArrNew); //???????????????
				} else if (resR.code === -1004) {
					uni.showToast({
						title: resR.msg,
						icon: 'none',
						duration: 2000,
						success: (res) => {
							//  ????????????,??????????????????
							this.mescroll.endErr()
						}
					});

				} else {
					resArray = []

					//????????????, ????????????
					// this.mescroll.endErr();
				}

			},
			realTypeReturnName(type) {
				// console.log("type", type);
				let tempArray = this.typeList.find(itemT => {
					if (itemT.idkey == type) {
						return itemT
					}
				})
				if (!tempArray) {
					return ""
				}

				return tempArray.valueStr
			},
			realKindReturnName(kind) {
				let tempArray = this.kindList.find(itemT => {
					if (itemT.idkey == kind) {
						return itemT
					}
				})
				if (!tempArray) {
					return ""
				}

				return tempArray.valueStr
			},
			datetimechange(e) {
				// console.log("e", e);
				this.startTimerStr = (new Date(Date.parse(e[0].replace(/-/g, "/")))).getTime() / 1000;
				this.endTimerStr = (new Date(Date.parse(e[1].replace(/-/g, "/")))).getTime() / 1000;

				console.log('change??????:', this.startTimerStr, this.endTimerStr);
				// this.mescroll.resetUpScroll();
			},
			changeLog(e) {
				// console.log("e", e);
			},
			filterBtnClick() {
				this.filterModelBool = true
			},
			typeClick(item) {
				// if (item.idkey === 999) {
				// 	this.isQueryAll = true
				// } else {
				// 	this.isQueryAll = false
				// }


				this.chooseTypeIndex = item.idkey

			},
			kindClick(item) {
				// if (item.idkey === 999) {
				// 	this.isQueryAll = true
				// } else {
				// 	this.isQueryAll = false
				// }
				this.chooseKindIndex = item.idkey
			},

			querySearch() {
				// console.log("11", this.startTimerStr);
				this.filterModelBool = false
				this.dataList = []
				this.mescroll.resetUpScroll();
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		display: block;
		height: 100%;
		position: relative;
	}

	.page-layout {
		height: 100%;

		.back {
			position: relative;
			height: 100vh;
			background: url(../../static/images/back.png) no-repeat 0 0;
			background-size: 100% !important;
			// padding-bottom: 250px;
		}

		.content_container {
			// margin: 0 13px;
			margin: 15px 13px 10px;
			background-color: #fff;
			border-radius: 12px;
			padding: 25px 12px 33px;
			// margin-bottom: 10px;

			.searchBox {
				.filterBtn {
					margin: auto;
					// width: 107px;
					height: 29px;
					line-height: 29px;
					background: url(../../static/images/btn1.png) no-repeat 50%;
					background-size: contain;
					text-align: center;
					font-size: 15px;
					color: #fff;
				}
			}

			.tableBox {

				margin-top: 30px;


				.tableBoxBodyTBody {
					background: #fff;
					// background-color: #fafafa;

					// -webkit-box-shadow: 0 8px 12px #ebedf0;
					// box-shadow: 0 8px 12px #ebedf0;
					box-shadow: 0px 0px 6px 0px #367bcb2e;
					border-radius: 10px;
					padding: 13px;
					margin: 0 10px;
					margin-top: 16px;

					.item_cell {
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: space-between;
						margin-top: 10px;

						.left {
							color: #999;
						}

						.right {
							color: #1c1c1c;
							width: 50%;
							word-break: break-word;
						}


					}
				}
			}
		}
	}


	.filterContainer {
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 20px 10px;

		.title {
			font-size: 21px;
			color: #5b9eff;
			font-weight: bold;
		}

		.desctxt {
			font-size: 16px;
			color: #5b9eff;
			opacity: .6;
			text-indent: 0.5em;
			line-height: 1;
			margin-top: -2px;
			word-break: break-word;
		}

		.line {
			margin-top: 10px;
			background: #f1f1f1;
			height: 1px;

		}

		.content {
			margin-top: 10px;

			.cell {
				.txt {}

				.lists {
					// margin-top: 15px;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					flex-wrap: wrap;

					image {
						width: 20px;
						height: 20px;
					}

					.i_list {
						font-size: 13px;
						margin-top: 10px;
						width: 40%;
						padding: 5px 12px;
						background: #fff;
						border-radius: 5px;
						border: 1px solid #D0D0D0;
						color: #262626;
						text-align: center;
						position: relative;


						// &:nth-of-type(2) {
						// 	margin-left: 10px
						// }

						.checkimg {
							position: absolute;
							bottom: 0;
							right: 0;
						}
					}

					.i_list_active {
						font-size: 13px;
						margin-top: 10px;
						width: 40%;
						padding: 5px 12px;
						background: #fff;
						border-radius: 5px;
						border: 2px solid #3c9cff;
						color: #3c9cff;
						font-weight: bold;
						text-align: center;
						position: relative;

						.checkimg {
							position: absolute;
							bottom: 0;
							right: 0;
						}
					}


				}
			}
		}


		.query_btn {
			margin-top: 30px;
			padding: 10px 0;
			background-color: #35aaf8;
			box-shadow: 0 7px 0 #0585e6;


			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			border-radius: 7px;
		}

	}
</style>
