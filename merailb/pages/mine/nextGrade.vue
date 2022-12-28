<template>
	<view class="">
		<view class="nextGradeContainer">
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


			</view>

			<view class="banner">

			</view>

			<view class="top">
				<view :class="selectGradeIndex === index ? 'topOne topOne_act' :'topOne' "
					v-for="(item,index) in gradeList" :key="index" @click="gradeChange(item,index)">
					{{item.title}}
				</view>
				<!-- <view class="topOne">
					二级
				</view>
				<view class="topOne">
					三级
				</view> -->
			</view>

			<view class="con">
				<view class="conOne">
					<view class="conOneCon">
						<view class="conOneConTop">
							{{$t('next.report.cell.today.commission.text')}}
						</view>
						<view class="conOneConBot">
							{{symbolStr}} 0
						</view>
					</view>
				</view>
				<view class="conOne">
					<view class="conOneCon">
						<view class="conOneConTop">
							{{$t('next.report.cell.all.commission.text')}}
						</view>
						<view class="conOneConBot">
							{{symbolStr}} 0
						</view>
					</view>
				</view>
				<view class="conOne">
					<view class="conOneCon">
						<view class="conOneConTop">
							{{$t('next.report.cell.person.num.text')}}
						</view>
						<view class="conOneConBot">
							0
						</view>
					</view>
				</view>
				<view class="conOne">
					<view class="conOneCon">
						<view class="conOneConTop">
							{{$t('next.report.cell.commission.rate.text')}}
						</view>
						<view class="conOneConBot">
							0
						</view>
					</view>
				</view>
				<view class="conOne">
					<view class="conOneCon">
						<view class="conOneConTop">
							{{$t('next.report.cell.today.recharge.text')}}
						</view>
						<view class="conOneConBot">
							{{symbolStr}} 0
						</view>
					</view>
				</view>
				<view class="conOne">
					<view class="conOneCon">
						<view class="conOneConTop">
							{{$t('next.report.cell.today.withdraw.text')}}
						</view>
						<view class="conOneConBot">
							{{symbolStr}} 0
						</view>
					</view>
				</view>
			</view>

			<view class="card">
				<view class="datequery">
					<!-- 2022-10-14 - 2022-11-14 -->
				</view>
				<view class="dataquery">
					<view class="item_query">
						<view class="text">
							{{$t('next.report.list.center.recharge.text')}}
						</view>
						<view class="num">
							0.00
						</view>
					</view>
					<view class="item_query">
						<view class="text">
							{{$t('next.report.list.center.withdraw.text')}}
						</view>
						<view class="num">
							0.00
						</view>
					</view>
				</view>

				<view class="peoWrap" v-for="(item,index) in nextGradeArr" :key="item.id">
					<view class="per_left">
						<view class="per_top">
							{{item.user.username}}
						</view>
						<view class="per_bottom signle_per_left">
							{{$t('next.report.list.content.left.text')}} {{item.user.money}}
						</view>
					</view>
					<view class="per_right">
						<view class="per_top">
							{{item.user.mobile}}
						</view>
						<view class="per_bottom">
							{{$t('next.report.list.content.right.text')}} {{item.user.level}}
						</view>
					</view>
				</view>
			</view>

			<view class="line">

			</view>

		</view>

		<self-tabbar :current-page="111"></self-tabbar>


	</view>
</template>

<script>
	import {
		// rechargePreReq,
		// rechargeReq,
		// websiteUrlStr,
		// playerInfoReq
	} from '@/api/index.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	export default {
		mixins: [myMixin],
		data() {
			return {
				navTitle: this.$t('next.report.title.text'),
				gradeList: [{
					title: this.$t('next.report.tab.title1.text')
				}, {
					title: this.$t('next.report.tab.title2.text')
				}, {
					title: this.$t('next.report.tab.title3.text')
				}],

				selectGradeIndex: 0,
				nextGradeArr: [{
					"id": 41980,
					"user": {
						"id": 42007,
						"username": "Eddy sanchez",
						"mobile": "9381860578",
						"money": "20.00",
						"level": 0,
						"topup_money": "0.00",
						"cash_money": "0.00"
					}
				}, {
					"id": 41840,
					"user": {
						"id": 41867,
						"username": "Lupitagp",
						"mobile": "4121166645",
						"money": "20.00",
						"level": 0,
						"topup_money": "0.00",
						"cash_money": "0.00"
					}
				}, {
					"id": 40690,
					"user": {
						"id": 40717,
						"username": "Fernando0102",
						"mobile": "8671567951",
						"money": "20.00",
						"level": 0,
						"topup_money": "0.00",
						"cash_money": "0.00"
					}
				}, {
					"id": 38059,
					"user": {
						"id": 38085,
						"username": "Juan andres hernandez escobar",
						"mobile": "8118240625",
						"money": "68.00",
						"level": 1,
						"topup_money": "0.00",
						"cash_money": "0.00"
					}
				}, {
					"id": 38046,
					"user": {
						"id": 38072,
						"username": "Lucaslopezsarao",
						"mobile": "8135943378",
						"money": "20.00",
						"level": 0,
						"topup_money": "0.00",
						"cash_money": "0.00"
					}
				}, {
					"id": 36919,
					"user": {
						"id": 36943,
						"username": "JAVIERMARQUEZ",
						"mobile": "6621870387",
						"money": "20.00",
						"level": 0,
						"topup_money": "0.00",
						"cash_money": "0.00"
					}
				}, {
					"id": 30612,
					"user": {
						"id": 30636,
						"username": "Eterno",
						"mobile": "664 766 0066",
						"money": "20.00",
						"level": 0,
						"topup_money": "0.00",
						"cash_money": "0.00"
					}
				}, {
					"id": 29116,
					"user": {
						"id": 29136,
						"username": "Eduardo Loera Carrizales",
						"mobile": "8123051487",
						"money": "20.00",
						"level": 0,
						"topup_money": "0.00",
						"cash_money": "0.00"
					}
				}, {
					"id": 28495,
					"user": {
						"id": 28515,
						"username": "Carmen Juárez",
						"mobile": "4611142915",
						"money": "20.00",
						"level": 0,
						"topup_money": "0.00",
						"cash_money": "0.00"
					}
				}, {
					"id": 26831,
					"user": {
						"id": 26851,
						"username": "Crisxthianx",
						"mobile": "2294466473",
						"money": "20.00",
						"level": 0,
						"topup_money": "0.00",
						"cash_money": "0.00"
					}
				}],


				urlFromStr: '',
			}
		},
		onShow() {

			// // #ifndef APP-NVUE
			// const eventChannel = this.getOpenerEventChannel();
			// // #endif
			// // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			// eventChannel.on('rechargeEventClick', async (data) => {
			// 	this.urlFromStr = data.from
			// })

			this.nextGradeArr = []

			// this.getPayInfoData()
			// this.getInformation()
		},
		mounted() {

		},
		computed: {

		},
		methods: {
			async getPayInfoData() {
				this.loadingWrapBool = true
				let resR = await rechargePreReq({}, this.localLoginToken)
				setTimeout(() => {
					this.loadingWrapBool = false
				}, 1000)
				// console.log("resR",resR);
				if (resR.code === 200) {
					let rechargeData = resR.data
					this.usdtMoneyRate = rechargeData[0].rate
					this.isCurrUnhold = rechargeData[0].unhold
					this.isCurrUnholdMsg = rechargeData[0].unholdMsg
					this.currencySymbol = rechargeData[0].currencySymbol
					if (rechargeData[0].type === 1) {
						this.showSingleUsdtBool = true
					} else {
						this.showSingleUsdtBool = false
					}

					rechargeData.forEach((item, index) => {
						item.img = websiteUrlStr + "/" + item.img
					})

					this.rechargeList = rechargeData
					if (this.rechargeList.length !== 0) {
						this.chooseRecType = this.rechargeList[0].id

					}

					if (resR.data.length !== 0) {
						// console.log("this.rechargeList[0].id",this.rechargeList[0].id);
						if (resR.data[0].hasOwnProperty('fast')) {
							this.quickAmountListBool = true
							this.quickAmountList = resR.data[0].fast.split('-')
						} else {
							// this.quickAmountListBool = false
							this.quickAmountListBool = true
							this.quickAmountList = [10, 50, 100, 200, 500, 1000, 2000, 5000, 10000]
						}
						this.inputPlace = this.$t('recharge.single.amount.text') + ":" + resR.data[0].minMax
					}

				}
			},
			async getInformation() {
				this.balanceNum = 0
				let resR = await playerInfoReq(this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {
					this.balanceNum = resR.data.balance / 100


				} else if (resR.code === 402 || resR.code === 403) {
					this.logout()
					this.$refs.uToast.show({
						title: resR.msg,
						url: '/pages/login/login',
					})

				}


			},
			goBackBtnClick() {
				uni.switchTab({
					url: '/pages/mine/index',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
				// const queryRechargeUrlFrom = uni.getStorageSync('queryRechargeUrlFrom') || 'other'
				// if (!this.rechargeState_Bool) {
				// 	this.urlFromStr = queryRechargeUrlFrom
				// }

				// if (this.urlFromStr === "home") {
				// 	uni.switchTab({
				// 		url: '/pages/home/index',
				// 		animationType: 'slide-in-top',
				// 		animationDuration: 200
				// 	})
				// } else if (this.urlFromStr === "matchOrder") {
				// 	uni.navigateTo({
				// 		url: '/pages/match/match_order',
				// 		success: (res) => {
				// 			// 通过eventChannel向被打开页面传送数据
				// 			const detailContentItemAndType = uni.getStorageSync('detailContentItemAndType')
				// 			// console.log("detailContentItemAndType",detailContentItemAndType);
				// 			if (detailContentItemAndType) {
				// 				res.eventChannel.emit('match_content_Click', {
				// 					content: detailContentItemAndType.item,
				// 					gameType: detailContentItemAndType.gameType
				// 				})

				// 			}
				// 		},
				// 		animationType: 'slide-in-top',
				// 		animationDuration: 200
				// 	})
				// } else if (this.urlFromStr === "user") {
				// 	uni.switchTab({
				// 		url: '/pages/user/user',
				// 		animationType: 'slide-in-top',
				// 		animationDuration: 200
				// 	})
				// } else {
				// 	uni.switchTab({
				// 		url: '/pages/user/user',
				// 		animationType: 'slide-in-top',
				// 		animationDuration: 200
				// 	})
				// }

			},
			paySelectClick(item, index) {
				this.payListSelectIndex = index
			},
			gradeChange(item, index) {
				this.selectGradeIndex = index
			}

		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f1f1f1;
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

	.nextGradeContainer {
		// height: 100vh;
		background: #f1f1f1;

		.banner {
			background: linear-gradient(to right, #6dcab8, #3a78cb);
			padding: 30px 0 0;
		}

		.top {
			background: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 59px;
			height: 50px;
			margin-top: 10px;

			.topOne {
				height: 100%;
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #232f3e;
				border-bottom: 5px solid #fff;
				line-height: 50px;

			}

			.topOne_act {
				border-bottom: 5px solid #ff7300;
				color: #ff7300;
			}
		}



		.con {
			margin: 10px 10px 0;
			background: linear-gradient(90deg, #6dcab8, #3a78cb);
			border-radius: 10px;
			box-sizing: border-box;
			padding: 20px;
			display: flex;
			flex-wrap: wrap;

			.conOne {
				display: flex;
				justify-content: space-between;
				margin-top: 10px;
				margin-right: 20px;
				// width: 50%;

				&:nth-child(-n+2) {
					margin-top: 0;
				}

				&:nth-child(2n) {
					margin-right: 0;
				}

				.conOneCon {
					width: 147px;

					.conOneConTop {
						font-size: 14px;
						// font-family: PingFangSC-Medium,PingFang SC;
						font-weight: 500;
						color: #fff;
					}

					.conOneConBot {
						font-size: 14px;
						background: hsla(0, 0%, 100%, .2);
						font-weight: 500;
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						box-sizing: border-box;
						padding: 10px 0;
						border-radius: 5px;
						color: #fff;
						margin-top: 10px;
					}
				}
			}
		}

		.card {
			background: #fff;
			border-radius: 10px;
			box-sizing: border-box;
			padding: 15px 15px 11px;
			margin: 10px 10px 0;
			font-size: 12px;
			color: #333;

			.dataquery {
				display: flex;
				align-items: center;
				justify-content: center;
				border-bottom: 1px solid #f6f6f6;

				.item_query {
					width: 50%;
					box-sizing: border-box;
					padding: 17px 0;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					font-size: 12px;
					font-weight: 400;
					color: #333;
				}
			}

			.peoWrap {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-top: 10px;

				.per_left,
				.per_right {
					margin-top: 10px;

					.per_top {
						font-size: 14px;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #333;
					}

					.per_bottom {
						font-size: 14px;
						font-weight: 400;
						color: #999;
						text-align: right;
					}

					.signle_per_left {
						text-align: left;
					}


				}


			}
		}


		.line {
			height: 95px;
		}
	}
</style>
