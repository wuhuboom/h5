<template>
	<view class="">
		<view class="recharge">
			<!-- left-icon="left" -->

			<view class="backTitleBar-wrapper colCent borderBox">
				<view class="fixedBox">
					<view class="common_header" style="height: 45px;">
						<view class="define">
							<!-- @click="goBackBtnClick" -->
							<view class="define_left_slot">
								<view class="">
									<!-- <u-icon name="arrow-left" size="32"></u-icon> -->
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

			<view class="banner">
				<view class="banner-box">
					<view class="bal-box">
						<view class="content">
							<view class="">
								{{$t('recharge.money.balance.title')}}
							</view>
							<view class="">
								{{symbolStr}}{{balanceNum}}
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="middleContainer">
				<view class="commonPading contitle">
					{{$t('recharge.input.money.text')}}
				</view>
				<view class="commonPading recharge-input">
					<view class="left">
						{{symbolStr}}
					</view>
					<input class="right" type="number" value="" v-model="inputRechargeAmount"
						@input="rechargeAmountInputChange" @focus="rechargeAmountFocus" @blur="rechargeAmountBlur" />
				</view>
				<view class="commonPading limittext">
					{{$t('recharge.limit.money.tip.text')}}{{selectPayItem.PayInterval}}
				</view>
				<view class="commonPading choosetitle">
					{{$t('recharge.quick.choose.text')}}
				</view>
				<view class="chooselist">
					<view class="cell" v-for="(item,index) in quickAmountList" :key="index"
						@click="quickAmountListItemClick(item,index)">
						<view :class="quickAmountSelectIndex === index ? 'item active' : 'item'">
							{{item}}
						</view>
					</view>
				</view>
				<view class="paylist">
					<view class="item" v-for="(item,index) in payList" :key="index" @click="paySelectClick(item,index)">
						<view class="payimg">
							<image src="../../static/images/pay.jpg" mode="" style="width: 22px;height: 22px;"></image>
						</view>
						<view class="payname">
							{{item.Name}}
						</view>
						<view class="paychoose">
							<view class="checkboxpay">
								<!-- <u-icon v-if="payListSelectIndex === index" name="checkmark" color="#fff" size="40"
									class="checkreal"></u-icon> -->
								<uni-icons v-if="payListSelectIndex === index" type="checkmarkempty" color="#fff"
									class="checkreal" size="21" />
							</view>
						</view>
					</view>
					<!-- <view class="item">
						<view class="payimg">
							<image src="../../static/images/pay.jpg" mode="" style="width: 22px;height: 22px;"></image>
						</view>
						<view class="payname">
							3kbpay
						</view>
						<view class="paychoose">
							<view class="checkboxpay">

							</view>
						</view>
					</view> -->
				</view>
				<view class="paybtn" @click="rechargeBtnClick">
					{{$t('recharge.confirm.recharge.text')}}
				</view>
				<!-- 	<view class="paybtn">
					{{$t('recharge.confirm.recharge.text')}}
				</view> -->
				<view class="commonPading tipbottom">
					{{$t('recharge.tip.warning.text')}}
				</view>
			</view>

			<view class="line">

			</view>

			<!-- 
			<view class="middlecontent">

				<view class="recharge-input">
					<view class="usdt">
						<view class="recharge-type">
							<view class="balance">
								{{$t('home.balance')}}:<span class="balanceMoney">{{balanceNum}}</span>
							</view>
							<view class="title">
								{{$t('recharge.amount.text')}}:
							</view>
							<view class="input">

								<view class="clear-icon">
								</view>
								<view class="money-type">
									{{currencySymbol}}
								</view>
							</view>
							<view class="usdtKey">
								<text>{{$t('recharge.real.amount.text')}}:<text style="color: #ff0000;">
										{{ngnToUsdtMoney}}</text></text>
								<text
									v-if="!showSingleUsdtBool">{{$t('recharge.usdt.rate.text')}}:{{usdtMoneyRate}}</text>
								<text
									v-if="showSingleUsdtBool">USDT{{$t('recharge.usdt.rate.text')}}:{{usdtMoneyRate}}</text>
							</view>
							<view class="select-number" v-if="quickAmountListBool">
								<view :class="quickAmountSelectIndex === index ? 'item active' : 'item'"
									v-for="(item,index) in quickAmountList" :key="index"
									@click="quickAmountListItemClick(item,index)">
									{{item}}

									<view class="activedicon" v-if="quickAmountSelectIndex === index">
										<image src="../../static/images/select.png" mode="" class="imgfilterdark">
										</image>
									</view>
								</view>
							</view>
							<view class="recharge_btn">
								<u-button :ripple="false" hover-class="none" :disabled="!inputRechargeAmount"
									:class="inputRechargeAmount ? 'changeColor' :'defalutColor' "
									style="overflow: visible;color: #fff;"
									@click="inputRechargeAmount ? rechargeBtnClick() : null">
									{{$t('recharge.button.now.text')}}
								</u-button>
							</view>
						</view>
					</view>

				</view>

			</view>
 -->
		</view>

		<self-tabbar :current-page="1"></self-tabbar>


	</view>
</template>

<script>
	import {
		websiteUrlStr,
		getInformationReq,
		rechargeReq,

		rechargePreReq,
		playerInfoReq
	} from '@/api/index.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	export default {
		mixins: [myMixin],
		filters: {
			limitPay(value) {
				// PayInterval
			}
		},
		data() {
			return {
				navTitle: this.$t('tabar.recharge'),
				quickAmountList: [],
				quickAmountSelectIndex: "",
				urlFromStr: '',
				payList: [],
				payListSelectIndex: 0,
				balanceNum: 0,
				inputRechargeAmount: '',
				chooseRecType: null,
				selectPayItem: {},


				// inputPlace: this.$t('recharge.single.amount.text'),
				rechargeList: [],
				rechargePlace: '',



				rechargeContainerTypeClass: 'rechargeContainerTypeItem',
				currentIndex: 0,
				quickAmountListBool: true,
				loadingWrapBool: false,
				showClearInputIconBool: false,
				inputRechargeFocus: false,
				showUsdtBool: false,
				showSingleUsdtBool: false,
				isCurrUnhold: null,
				isCurrUnholdMsg: '',
				currencySymbol: '',
				usdtMoneyRate: 0,
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


			this.currentIndex = 0
			this.inputRechargeAmount = ""
			this.quickAmountSelectIndex = ""
			this.payListSelectIndex = 0
			// this.getPayInfoData()


			this.getInformation()
			this.getPayList()

		},
		mounted() {

		},
		computed: {
			// changeRechargeBtnStyle() {
			// 	if (!this.inputRechargeAmount) {
			// 		return 'changeRechargeBtnClass'
			// 	} else {
			// 		return 'changeRechargeBtnClassActive'
			// 	}
			// },
			// ngnToUsdtMoney() {

			// 	if (this.inputRechargeAmount) {
			// 		// return this.inputRechargeAmount / this.usdtMoneyRate
			// 		return this.inputRechargeAmount * this.usdtMoneyRate
			// 	} else {
			// 		return 0.00
			// 	}


			// }
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
						// this.inputPlace = this.$t('recharge.single.amount.text') + ":" + resR.data[0].minMax
					}

				}
			},
			goBackBtnClick() {

				const queryRechargeUrlFrom = uni.getStorageSync('queryRechargeUrlFrom') || 'other'
				if (!this.rechargeState_Bool) {
					this.urlFromStr = queryRechargeUrlFrom
				}

				if (this.urlFromStr === "home") {
					uni.switchTab({
						url: '/pages/home/index',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (this.urlFromStr === "matchOrder") {
					uni.navigateTo({
						url: '/pages/match/match_order',
						success: (res) => {
							// 通过eventChannel向被打开页面传送数据
							const detailContentItemAndType = uni.getStorageSync('detailContentItemAndType')
							// console.log("detailContentItemAndType",detailContentItemAndType);
							if (detailContentItemAndType) {
								res.eventChannel.emit('match_content_Click', {
									content: detailContentItemAndType.item,
									gameType: detailContentItemAndType.gameType
								})

							}
						},
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (this.urlFromStr === "user") {
					uni.switchTab({
						url: '/pages/user/user',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else {
					uni.switchTab({
						url: '/pages/user/user',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				}

			},
			async getInformation() {
				this.balanceNum = 0
				let resR = await getInformationReq(this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 2000) {
					this.balanceNum = resR.result.Balance
				}
			},
			async getPayList() {
				let reqParam = {}
				let resR = await rechargeReq(reqParam, this.localLoginToken, "getPay")
				// console.log("resR", resR);
				if (resR.code === 2000) {
					let resArr = resR.result
					let newArr = []

					if (resArr[0].hasOwnProperty('PayFast')) {
						if (resArr[0].PayFast) {
							this.quickAmountList = resArr[0].PayFast.split('-')
						}
					} else {
						this.quickAmountList = []
					}

					resArr.forEach((item, index) => {
						// console.log("item", item);
						if (item.PayType !== 1) {
							newArr.push(item)
						}
					})

					this.payList = newArr

					if (newArr.length !== 0) {
						this.selectPayItem = newArr[0]
					} else {
						this.selectPayItem = {}
					}

				}
			},
			paySelectClick(item, index) {
				this.payListSelectIndex = index
				this.selectPayItem = item
				if (item.PayFast) {
					this.quickAmountList = item.PayFast.split('-')
				}
			},
			async rechargeBtnClick() { //充值按钮点击事件
				// console.log("this.chooseRecType", this.chooseRecType);

				// if (this.isCurrUnhold === 1) {

				// 	uni.showToast({
				// 		title: this.isCurrUnholdMsg,
				// 		icon: "none",
				// 		duration: 2000
				// 	});

				// 	return false
				// }


				if (!this.inputRechargeAmount) {
					uni.showToast({
						title: this.$t('recharge.input.money.notempty.title'),
						icon: 'none',
						duration: 2000,
					});

					return false
				}
				let resR = await rechargeReq({
					pay_channels_id: this.selectPayItem.ID,
					money: this.inputRechargeAmount * 1
				}, this.localLoginToken, "recharge")
				if (resR.code === 2000) {
					// this.getInformation()
					// uni.showToast({
					// 	title: resR.msg,
					// 	icon: 'none',
					// 	duration: 2000,
					// });
					// console.log("resR.resulut", resR.resulut);
					if (resR.result.url) {
						window.location.href = resR.result.url
					}
				}
			},

			rechargeTypeItemClick(item, index) {
				//unhold:0正常1维护 unholdMsg:维护提示消息
				this.isCurrUnhold = item.unhold
				this.isCurrUnholdMsg = item.unholdMsg
				this.currencySymbol = item.currencySymbol
				if (this.isCurrUnhold === 1) {

					uni.showToast({
						title: this.isCurrUnholdMsg,
						icon: "none",
						duration: 2000
					});

					return false
				}

				this.quickAmountSelectIndex = ""

				this.chooseRecType = item.id
				this.usdtMoneyRate = item.rate

				// console.log("111", item, index);
				this.inputRechargeAmount = ""
				if (item.status === 0) {
					this.quickAmountListBool = false
				} else {
					this.quickAmountListBool = true
				}
				this.currentIndex = index;
				this.rechargeContainerTypeClass = "rechargeContainerTypeItem rechargeContainerTypeItemActive"

				// this.inputPlace = this.$t('recharge.single.amount.text') + ": " + item.minMax
				if (item.hasOwnProperty('fast')) {
					this.quickAmountListBool = true
					this.quickAmountList = item.fast.split('-')
				} else {
					// this.quickAmountListBool = false
					this.quickAmountListBool = true
					this.quickAmountList = [10, 50, 100, 200, 500, 1000, 2000, 5000, 10000]
				}

				if (item.type === 1) {
					this.showSingleUsdtBool = true
				} else {
					this.showSingleUsdtBool = false
				}
			},
			quickAmountListItemClick(item, index) { //快速充值金额点击事件
				this.inputRechargeAmount = item
				this.quickAmountSelectIndex = index
			},
			rechargeAmountInputChange() {
				this.showClearInputIconBool = true
			},
			rechargeAmountFocus() {
				this.showClearInputIconBool = this.inputRechargeAmount ? true : false
			},
			rechargeAmountBlur(e) {
				this.showClearInputIconBool = false
				// console.log("1111",this.inputRechargeAmount,this.inputRechargeFocus);
			},
			clearInputIconClick() {
				// console.log("2222",this.inputRechargeAmount);
				this.showClearInputIconBool = false
				this.inputRechargeAmount = ''
			},
			goToOnLineService() {
				window.location.href = getApp().globalData.kefuaddress;
			},

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

	.recharge {
		height: 100vh;


		.banner {
			background: linear-gradient(to right, #6dcab8, #3a78cb);

			.banner-box {
				border-radius: 18px 18px 0 0;
				height: 160px;
				width: 100%;
				display: flex;

				.bal-box {
					width: 100%;
					padding: 0 22px;
					display: flex;
					align-items: center;

					.content {
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 22px;
						color: #fff;
						width: 100%;
					}
				}
			}
		}


		.middleContainer {
			background-color: #fff;
			color: #666;
			border-radius: 20px 20px 0 0;
			overflow: hidden;
			margin-top: -20px;

			.commonPading {
				padding: 15px;
			}

			.contitle {
				color: #333;
				border-bottom: 1px solid #fbfbfb;
			}

			.recharge-input {
				display: flex;
				align-items: center;
				color: #333;
				border-bottom: 1px solid #fbfbfb;

				.left {
					font-size: 22px;
					// margin-right: 10px;
					width: 40%;
				}

				.right {
					font-size: 30px;
				}
			}

			.limittext {
				color: #aaa;
			}

			.choosetitle {
				color: #333;
			}

			.chooselist {
				padding: 0 15px;
				text-align: center;
				display: flex;
				flex-wrap: wrap;

				.cell {
					text-align: center;
					padding: 0 5px;
					width: 33.33%;

					.item {
						width: 100%;
						text-align: center;
						color: #1e7eee;
						font-style: 500;
						background: #f6fafe;
						border-radius: 9px;
						margin-bottom: 10px;
						border: 1px solid #ddd;
						padding: 14px 0;
					}

					.active {
						border: 1px solid #1e7eee;
					}
				}
			}

			.paylist {
				padding: 0 25px;

				.item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 10px 0;
					border-bottom: 1px solid #efefef;

					.payimg {
						display: flex;
						align-items: center;
					}

					.payname {
						width: 80%;
						display: flex;
						align-items: center;
					}

					.paychoose {
						.checkboxpay {
							margin-right: 5px;
							border: 1px solid #d1d1dd;
							background: #fff;
							border-radius: 50%;
							width: 22px;
							height: 22px;
							position: relative;

							.checkreal {
								position: absolute;
								border-radius: 50%;
								background-color: #0081ff;
								border-color: #0081ff;

							}
						}
					}
				}
			}

			.paybtn {
				// width: 40px;
				margin: 0 15px;
				height: 40px;
				line-height: 42px;
				text-align: center;
				font-size: 16px;
				margin-top: 20px;
				background: linear-gradient(to right, rgb(109, 202, 184), rgb(58, 120, 203));
				color: #fff;
				border: none;
				border-radius: 5px;

			}

			.tipbottom {
				font-size: 14px;
			}
		}


		.line {
			height: 90px;
		}

		.middlecontent {
			background-color: #fff;
			margin-top: 10px;

			.recharge-input {
				padding: 15px;

				.usdt {
					.recharge-type {

						.balance {
							color: #9ca5b1;
							text-align: center;

							.balanceMoney {
								color: #507ef6;
								margin-left: 10px;
							}
						}


					}
				}
			}
		}
	}


	.recharge-type {
		font-size: 14px;

		.title {
			color: #333;
			padding: 10px 0;
			border-bottom: 1px solid #eee;
		}

		.input {

			display: flex;
			align-items: center;
			flex-direction: row;
			justify-content: space-between;
			/* background-color: #f7f7f8; */
			/* border-radius: 5px; */
			position: relative;
			margin-top: 7px;
			padding: 8px;
			color: #f8f8f8;


			.input-num {
				font-size: 24px;
				font-weight: 400;
				flex: 75%;
				position: relative;
				color: #424654;
			}

			.clear-icon {
				width: 12px;
				height: 12px;
				font-size: 14px;
				color: #999;
				font-weight: 700;
				flex: 0 0 12px;
				opacity: .8;
				margin-right: 5px;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.money-type {
				flex: 1;
				font-size: 21px;
				color: #507ef6;
				text-align: center;
			}
		}

		.usdtKey {
			display: flex;
			justify-content: space-between;
			padding: 10px 5px;
			color: #333;
		}

		.select-number {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-top: 5px;

			.item {
				width: 30%;
				color: #333;
				font-size: 16px;
				margin-bottom: 5px;
				margin-top: 5px;
				height: 38px;
				line-height: 38px;
				background-color: #fff;
				text-align: center;
				border-radius: 5px;
				border: 1px solid #eee;
				// margin-right: 15px;
				position: relative;

				.activedicon {
					position: absolute;
					right: -1px;
					bottom: -13px;

					.imgfilterdark {
						width: 16px;
						height: 16px;
					}
				}
			}

			.active {
				// background: linear-gradient(90deg, #ffd37d, #ca962e);
				border-color: #507ef6;
				color: #507ef6;
			}
		}


		.recharge_btn {
			position: relative;
			overflow: hidden;
			width: 345px;
			height: 50px;
			margin-top: 10px;

			.defalutColor {
				background-color: #597ef7;
				opacity: .5;
				// border: 1px solid #1989fa;
			}

			.changeColor {
				opacity: 1;
				background: #597ef7;
				color: #fff
			}
		}


	}
</style>
