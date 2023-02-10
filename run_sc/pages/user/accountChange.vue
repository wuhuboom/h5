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
										{{$t('account.change.list.cell.top.font.money.text')}}
									</view>
									<view class="right" style="color: #5b9eff;">
										{{item.FontAmount}}
									</view>
								</view>

								<view class="item_cell">
									<view class="left">
										{{$t('account.change.list.cell.top.change.money.text')}}
									</view>
									<view class="right">
										{{item.ChangeAmount}}
									</view>
								</view>

								<view class="item_cell">
									<view class="left">
										{{$t('account.change.list.cell.top.now.money.text')}}
									</view>
									<view class="right" style="color: #17970e;">
										{{item.NowAmount}}
									</view>
								</view>

								<view class="item_cell">
									<view class="left">
										{{$t('account.change.list.cell.top.kind.text')}}
									</view>
									<view class="right">
										{{item.typeName}}
									</view>
								</view>

								<view class="item_cell">
									<view class="left">
										{{$t('account.change.list.cell.top.create.text')}}
									</view>
									<view class="right" style="font-size: 14px;">
										{{item.Created | timestampStr2}}
									</view>
								</view>
								<view class="item_cell">
									<view class="left">
										{{$t('account.change.list.cell.top.date.text')}}
									</view>
									<view class="right" style="font-size: 14px;">
										{{item.Date}}
									</view>
								</view>

								<view class="item_cell">
									<view class="left">
										{{$t('account.change.list.cell.top.remark.text')}}
									</view>
									<view class="right" style="color:red;font-size: 14px;">
										{{item.Remark}}
									</view>
								</view>
							</view>

						</mescroll-uni>
					</view>
				</view>


			</view>
		</view>

		<u-popup v-model="filterModelBool" mode="bottom" safe-area-inset-bottom closeable border-radius="60"
			:mask-close-able="false">
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
							{{$t('account.change.list.filter.cell.top.type.text')}}
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
							{{$t('account.change.list.filter.cell.top.kind.text')}}
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
				</view>

				<view class="query_btn" @click="querySearch">
					{{$t('account.change.list.filter.cell.bottom.query.text')}}
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import {
		getChangeAmountReq
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
				navTitle: this.$t('user.list.cell.fund.record.text'),
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
				chooseTypeIndex: 1,
				kindList: [],
				kindDisList: [],
				chooseKindIndex: 1,



				mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
				// 下拉刷新的配置(可选, 绝大部分情况无需配置)
				downOption: {

				},
				// 上拉加载的配置(可选, 绝大部分情况无需配置)
				upOption: {
					toTop: {
						right: '20px',
					},
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

		onShow() {


			// 初始化语言
			this.initLang()


		},
		methods: {
			// ...mapMutations(['logout']),
			initLang() { //初始化语言

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
					idkey: 1,
					valueStr: this.$t('account.change.list.filter.cell.top.type.txt1.text'),
					ableid: [1]
				}, {
					idkey: 2,
					valueStr: this.$t('account.change.list.filter.cell.top.type.txt2.text'),
					ableid: [1, 2, 3, 4, 5, 6]
				}, {
					idkey: 3,
					valueStr: this.$t('account.change.list.filter.cell.top.type.txt3.text'),
					ableid: [1, 2, 3, 4, 5, 6]
				}, {
					idkey: 4,
					valueStr: this.$t('account.change.list.filter.cell.top.type.txt4.text'),
					ableid: [1, 2, 4, 6]
				}]


				this.kindDisList = [{
					idkey: 1,
					valueStr: this.$t('account.change.list.filter.cell.top.kind.txt1.text')
				}, {
					idkey: 2,
					valueStr: this.$t('account.change.list.filter.cell.top.kind.txt2.text')
				}, {
					idkey: 3,
					valueStr: this.$t('account.change.list.filter.cell.top.kind.txt3.text')
				}, {
					idkey: 4,
					valueStr: this.$t('account.change.list.filter.cell.top.kind.txt4.text')
				}, {
					idkey: 5,
					valueStr: this.$t('account.change.list.filter.cell.top.kind.txt5.text')
				}, {
					idkey: 6,
					valueStr: this.$t('account.change.list.filter.cell.top.kind.txt6.text')
				}]


				this.kindList = [{
					idkey: 1,
					valueStr: this.$t('account.change.list.filter.cell.top.kind.txt1.text')
				}]

			},
			goBackBtnClick() {
				uni.switchTab({
					url: '/pages/user/user',
					animationType: 'pop-in',
					animationDuration: 200
				})


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
				reqParam.kinds = this.chooseKindIndex
				// reqParam.pageNo = this.pageNo
				reqParam.page = pageNum
				// reqParam.pageSize = this.pageSize
				reqParam.limit = pageSize
				let resR = await getChangeAmountReq(reqParam, this.localLoginToken)

				// console.log("resR",resR.data.results);

				if (resR.code === 200) {
					let resArray = resR.result
					let resultsArrNew = []
					let kindType
					resArray.forEach((item, index) => {
						kindType = this.realTypeReturnName(item.Kinds)
						resultsArrNew.push({
							...item,
							typeName: kindType
						})
					})

					this.mescroll.endBySize(resR.result.length, resR.result.count)
					//设置列表数据
					if (pageNum == 1) this.dataList = []; //如果是第一页需手动制空列表
					this.dataList = this.dataList.concat(resultsArrNew); //追加新数据
				} else if (resR.code === -1004) {
					uni.showToast({
						title: resR.msg,
						icon: 'none',
						duration: 2000,
						success: (res) => {
							//  请求失败,隐藏加载状态
							this.mescroll.endErr()
						}
					});

				} else {
					resArray = []

					//联网失败, 结束加载
					// this.mescroll.endErr();
				}

			},
			realTypeReturnName(type) {
				// console.log("type", type);
				let tempArray = this.kindDisList.find(itemT => {
					if (itemT.idkey == type) {
						return itemT
					}
				})
				if (!tempArray) {
					return ""
				}

				return tempArray.valueStr
			},
			filterBtnClick() {
				this.filterModelBool = true
			},
			typeClick(item) {
				this.chooseTypeIndex = item.idkey
				let newKind = []
				this.kindDisList.forEach((ite, index) => {
					// console.log("ite", ite);
					item.ableid.map((cell, i) => {
						// console.log("cell", cell);
						if (ite.idkey === cell) {
							newKind.push({
								idkey: cell,
								valueStr: ite.valueStr
							})
						}
					})
				})

				this.kindList = newKind
				this.chooseKindIndex = 1
				// console.log("newKind", newKind);
			},
			kindClick(item) {
				this.chooseKindIndex = item.idkey
			},
			querySearch() {
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
		padding: 20px;

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
						// color: #3c9cff;
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
