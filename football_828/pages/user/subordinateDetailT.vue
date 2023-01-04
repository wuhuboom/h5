<template>
	<view class="orderCenterPage">
		<view class="backTitleBar-wrapper colCent borderBox">
			<view class="fixedBox">
				<view class="common_header" style="height: 44px;background: #1f252f;">
					<view class="define">
						<view class="define_left_slot" @click="goBackBtnClick">
							<view class="">
								<u-icon name="arrow-left" color="#fff" size="32"></u-icon>
							</view>
						</view>
						<view class="define_center_slot">
							<view class="">
								<text class="title">{{navTitle}}</text>
							</view>
						</view>
						<view class="define_right_slot">
							<!-- <view class="">
								<view class="service">
									<image src="../../static/images/service.png" mode="" class="icon"></image>
								</view>
							</view> -->
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

		<view class="searchSelect">
			<view class="bankBox" @click="levelSelectClick">
				<view class="t">
					<text></text>
					<text class="con">
						{{searchStrSelect}}</text>
				</view>
				<u-icon name="arrow-right" color="#fff"></u-icon>
			</view>
		</view>

		<view class="list-view">


			<view class="">
				<mescroll-body ref="mescrollRef" :fixed="false" top="0" :topbar="false" bottom="100" :bottombar="false"
					:safearea="false" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
					:up="upOption">


					<view class="list-item" v-for="(item, index) in dataList" :key="index">

						<view class="order-time">
							<text class="text">{{$t('user.report.account.list.center.list.head.username.text')}}</text>
							<text class="text content">{{item.username}}</text>
						</view>
						<view class="order-time">
							<text class="text">{{$t('home.balance')}}</text>
							<text class="text content">{{item.balance | moneyFormat}}</text>
						</view>
						<view class="tit">
							<text class="text">{{$t('home.recharge')}}</text>
							<text class="text content">{{item.cumulativeTopUp | moneyFormat}}</text>
						</view>
						<view class="order-time">
							<text class="text">{{$t('home.withdraw')}}</text>
							<text class="text content">{{item.cumulativeReflect | moneyFormat}}</text>
						</view>
					</view>

				</mescroll-body>

			</view>
		</view>

		<!-- 提现卡列表 -->
		<u-popup v-model="levelPopBool" mode="bottom" width="315px" border-radius="10">
			<view class="cards-pop">

				<view class="card-list">
					<view class="card" v-for="(item,index) in inputSearchListItemArray" :key="item.id"
						@click="selectLevelClick(item)">
						<view class="left">
							<view class="card-name">
								{{item.nameStr}}
							</view>
						</view>
						<u-icon v-if="currentIndex === item.id" name="checkmark" color="#ffbc00"></u-icon>
					</view>
				</view>
				<view class="" style="width: 100%;height: 30px;">

				</view>
			</view>
		</u-popup>

		<!-- 
		<u-modal v-model="showOrderBool" :title="$t('user.report.account.change.list.tip.text')"
			:confirm-text="$t('modal.confirm.text')" :content-style="contentStyleObj" :confirm-style="confirmStyleObj"
			@confirm="confirmHandle">
			<view class="slot-content">
				{{singleOrderStr}}
			</view>
		</u-modal>
 -->
		<show-modal ref="testRef"></show-modal>
	</view>
</template>

<script>
	import {
		dataCenterDetailTwoReq
	} from '../../api/index.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	import {
		setClipboardData,
		getClipboardData
	} from '@/uni_modules/u-clipboard/js_sdk'
	import MescrollBodyDiy from "@/uni_modules/mescroll-uni/components/mescroll-diy/football/mescroll-body.vue";
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin, myMixin], // 使用mixin
		components: {
			MescrollBodyDiy
		},
		data() {
			return {
				currentIndex: 1,
				searchStrSelect: this.$t('backapi.self.statistics.top.content.sub.level1.text'),
				levelPopBool: false,
				inputSearchListItemArray: [{
					nameStr: this.$t('backapi.self.statistics.top.content.sub.level1.text'),
					id: 1,
				}, {
					nameStr: this.$t('backapi.self.statistics.top.content.sub.level2.text'),
					id: 2,
				}, {
					nameStr: this.$t('backapi.self.statistics.top.content.sub.level3.text'),
					id: 3,
				}],

				singleOrderStr: '',
				showOrderBool: false,
				contentStyleObj: {
					'text-align': 'center',
					'padding': '30px 0px',
					'color': '#2db9ff'
				},
				confirmStyleObj: {
					"color": "rgb(255, 255, 255)",
					"margin": "20px 16px",
					"height": "37px",
					"border-radius": "40px",
					"text-align": "center",
					"line-height": "35px",
					"background": "rgb(45, 185, 255)"
				},

				localLoginToken: null,
				dataList: [],
				navTitle: this.$t('user.statistics.center.data.head.lowerlevel.text'),
				// inputSearchListItemArray: [],
				// inputSearchListItemArray_type: [],
				pageNo: 1,
				pageSize: 10,
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
						icon: "../../static/images/noData.png",
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



			this.dataList = []
			this.currentIndex = 1;
			this.getLevelRecordData(this.pageNo, this.pageSize)


			this.$nextTick(() => {
				this.mescroll.scrollTo(0, 300)
				// this.mescroll.showTopBtn()
			})





			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			eventChannel.on('eventOrderClick', (data) => {
				this.urlFromStr = data.from
			})


		},
		methods: {
			initLang() { //初始化语言


				let langStr = uni.getStorageSync('ft_lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr
				this.navTitle = this.$t('user.statistics.center.data.head.lowerlevel.text')
				// this.inputSearchListItemArray = [{
				// 	nameStr: this.$t('recharge.record.center.search.where.status.all.text'),
				// 	valueNum: 0
				// }, {
				// 	nameStr: this.$t('recharge.record.center.search.where.status.pendding.text'),
				// 	valueNum: 1
				// }, {
				// 	nameStr: this.$t('recharge.record.center.show.detail.status.pay.arrives.text'),
				// 	valueNum: 2
				// }, {
				// 	nameStr: this.$t('recharge.record.center.show.detail.status.scored.text'),
				// 	valueNum: 3
				// }, {
				// 	nameStr: this.$t('recharge.record.center.show.detail.status.pay.timeout.text'),
				// 	valueNum: 4
				// }]

				// this.inputSearchListItemArray_type = [{
				// 	nameStr: this.$t('recharge.record.center.search.where.type.all.text'),
				// 	valueNum: 0
				// }, {
				// 	nameStr: this.$t('recharge.record.center.search.where.type.online.text'),
				// 	valueNum: 1
				// }, {
				// 	nameStr: this.$t('recharge.record.center.search.where.type.offline.text'),
				// 	valueNum: 2
				// }]

			},
			levelSelectClick() {
				this.levelPopBool = true
			},
			selectLevelClick(item) {
				this.searchStrSelect = item.nameStr
				this.currentIndex = item.id;
				this.mescroll.scrollTo(0, 300)
				this.levelPopBool = false

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
				this.getLevelRecordData(pageNum, pageSize)
			},
			/*若希望重新加载列表,只需调用此方法即可(内部会自动page.num=1,再主动触发up.callback)*/
			reloadList() {
				this.mescroll.resetUpScroll();
			},
			async getLevelRecordData(pageNum, pageSize) {
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
				reqParam.level = this.currentIndex
				reqParam.pageNo = pageNum
				reqParam.pageSize = pageSize
				let resR = await dataCenterDetailTwoReq(reqParam, this.localLoginToken)

				// console.log("resR",resR.data.results);
				let resArray
				if (resR.code === 200) {
					resArray = resR.data.results
					this.mescroll.endBySize(resR.data.results.length, resR.data.totalCount)
					//设置列表数据
					if (pageNum == 1) this.dataList = []; //如果是第一页需手动制空列表
					this.dataList = this.dataList.concat(resArray); //追加新数据
					// console.log("this.dataList",this.dataList);
				} else if (resR.code === 409) {
					uni.showToast({
						title: this.$t('backapi.self.alert.fast.access.tip.text'),
						icon: 'none',
						duration: 2000,
						success: (res) => {
							//  请求失败,隐藏加载状态
							this.mescroll.endErr()
						}
					});

				} else if (resR.code === 402 || resR.code === 403) {
					resArray = []
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
				} else {
					resArray = []
					//联网失败, 结束加载
					// this.mescroll.endErr();
				}


			},
			goBackBtnClick() {
				uni.navigateTo({
					url: '/pages/user/statistics',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			// realTypeName(realTypeName, typeNum) {
			// 	// console.log("realTypeName",realTypeName);
			// 	let tempFindArray = []
			// 	if (typeNum === 1) {
			// 		tempFindArray = this.inputSearchListItemArray
			// 	} else if (typeNum === 2) {
			// 		tempFindArray = this.inputSearchListItemArray_type
			// 	}
			// 	let tempArray = tempFindArray.find(itemT => {
			// 		if (itemT.valueNum === realTypeName) {

			// 			return itemT
			// 		}
			// 	})
			// 	// console.log("tempArray",tempArray);
			// 	// return tempArray.nameStr
			// 	if (tempArray) {
			// 		return tempArray.nameStr
			// 	} else {
			// 		return this.$t('recharge.record.center.show.detail.status.pay.other.text')
			// 	}
			// },
			detailListItem(item) {
				this.showOrderBool = true
				this.singleOrderStr = item.orderNo
			},
			confirmHandle() {
				setClipboardData(this.singleOrderStr).then(() => {
					uni.showToast({
						icon: 'none',
						title: this.$t('user.refer.share.copy.success.text')
					});
				})
			}


		}

	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #171E25;
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
		color: #fff;
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
	.searchSelect {
		// background: #1f252f;
		// position: relative;
		background: #171e25;
		// background: #1f252f;
		position: fixed;
		width: 100%;
		z-index: 1000;

		.bankBox {
			// width: 100%;
			height: 40px;
			display: flex;
			flex-direction: row;
			background-color: #1f252f;
			justify-content: space-between;
			align-items: center;
			padding: 0 20px;
			border-radius: 4px;
			margin: 0 20px;
			margin-top: 20px;

			.t {
				color: #f8f8f8;

				.con {
					// padding-left: 10px;
					font-size: 14px;
				}
			}
		}

	}

	.list-view {
		margin: 10px 16px 0;
		display: flex;
		flex-direction: column;
		margin-top: 80px;



		.list-item {
			padding: 15px;
			background: #1f252f;
			border-radius: 10px;
			margin-bottom: 15px;
			position: relative;
			color: #4b4e5c;
		}
	}

	.list-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.one-list,
	.order-time,
	.tit {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		width: 100%;

		.source {
			font-size: 14px;
			font-weight: 600;
			padding-bottom: 3px;
			padding-top: 3px;
		}

		.text {
			font-size: 14px;
			padding-bottom: 9px;
			padding-top: 9px;
			color: #7f8aa1;
			font-weight: 400;
		}

		.content {
			color: #f8f8f8;
		}

		.money {
			font-size: 15px;
			font-weight: 600;
			padding-bottom: 3px;
			padding-top: 3px;
		}
	}

	.C_FF0000 {
		color: #ff525d;
	}

	/deep/ .u-drawer-bottom {
		background-color: #1f252f;

		.cards-pop {
			padding: 18px 15px 0;

			.pop-title {
				display: flex;
				justify-content: space-between;
				padding-bottom: 25px;
				border-bottom: 0.5px solid #111;

				.title {
					margin: auto;
					text-align: center;

					.title-up {
						font-size: 16px;
						color: #eee;
						font-weight: 700;
					}

					.title-tip {
						color: #ffbc00;
						font-size: 13px;
						padding-top: 5px;
					}
				}
			}

			.card-list {
				font-size: 15px;
				color: #000;

				.card {
					display: flex;
					justify-content: space-between;
					padding: 15px 0 15px 15px;
					border-bottom: 0.5px solid #111;

					.left {
						display: flex;
						justify-content: space-between;

						.card-name {
							color: #ddd;
						}
					}
				}
			}

			.add-card {
				margin-top: 10px;
				font-size: 15px;
				color: #000;
				display: flex;
				justify-content: space-between;
				padding: 15px 0 15px 15px;

				.left {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.add-icon {
						margin-right: 16px;
						width: 18px;
						height: 14px;
					}

					.add-title {
						color: #bbb;
					}
				}
			}
		}


	}
</style>
