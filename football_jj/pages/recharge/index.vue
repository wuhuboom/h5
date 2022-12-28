<template>
	<view class="recharge">
		<!-- left-icon="left" -->

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

		<view class="content">
			<view class="content-top">

				<view class="recharge-type">
					<view class="title" style="border: none;">
						{{$t('recharge.type.text')}}
					</view>
					<view class="type-list">
						<view :class="currentIndex == index ?'type-item active':'type-item' "
							v-for="(item,index) in rechargeList" :key="item.id"
							@click="rechargeTypeItemClick(item,index)">
							<image :src="item.img" mode="" class="recharge-icon"></image>
							<view class="pay-type">
								{{item.name}}
							</view>

							<view class="activedicon" v-if="currentIndex == index">
								<image src="../../static/images/select.png" mode="" class="imgfilterdark"></image>
							</view>
						</view>

					</view>
				</view>
				<view class="recharge-sub">

				</view>
			</view>
		</view>

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
							<input class="input-num" type="number" value="" :placeholder="inputPlace"
								placeholder-style="font-size:14px;color:rgb(80,103,120)" v-model="inputRechargeAmount"
								@input="rechargeAmountInputChange" @focus="rechargeAmountFocus"
								@blur="rechargeAmountBlur" />
							<view class="clear-icon">
								<!-- <image src="../../static/images/x.png" mode=""></image> -->
							</view>
							<view class="money-type">
								{{currencySymbol}}
							</view>
						</view>
						<view class="usdtKey">
							<text>{{$t('recharge.real.amount.text')}}:<text style="color: #ff0000;">
									{{ngnToUsdtMoney}}</text></text>
							<text v-if="!showSingleUsdtBool">{{$t('recharge.usdt.rate.text')}}:{{usdtMoneyRate}}</text>
							<text
								v-if="showSingleUsdtBool">USDT{{$t('recharge.usdt.rate.text')}}:{{usdtMoneyRate}}</text>
						</view>
						<view class="select-number" v-if="quickAmountListBool">
							<view :class="quickAmountSelectIndex === index ? 'item active' : 'item'"
								v-for="(item,index) in quickAmountList" :key="index"
								@click="quickAmountListItemClick(item,index)">
								{{item}}

								<view class="activedicon" v-if="quickAmountSelectIndex === index">
									<image src="../../static/images/select.png" mode="" class="imgfilterdark"></image>
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

	</view>
</template>

<script>
	import {
		rechargePreReq,
		rechargeReq,
		websiteUrlStr,
		playerInfoReq
	} from '@/api/index.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	export default {
		mixins: [myMixin],
		data() {
			return {
				navTitle: this.$t('recharge.title.text'),
				inputPlace: this.$t('recharge.single.amount.text'),
				rechargeList: [],
				rechargePlace: '',
				balanceNum: 0,
				quickAmountList: [],
				quickAmountSelectIndex: "",
				rechargeTipListS: [{
					content: '1. Please obtain the latest payment account every time you recharge, and it is forbidden to save the payment account information.'
				}, {
					content: '2. It is forbidden to save the previous collection account for payment, and the platform is not responsible for the loss caused by the recharge of the previous collection account.'
				}, {
					content: '3. Using this platform for money laundering fraud, the company reserves the right to terminate membership services and freeze their accounts.'
				}],
				rechargeContainerTypeClass: 'rechargeContainerTypeItem',
				currentIndex: 0,
				quickAmountListBool: true,
				loadingWrapBool: false,
				inputRechargeAmount: '',
				showClearInputIconBool: false,
				inputRechargeFocus: false,
				urlFromStr: '',
				showUsdtBool: false,
				showSingleUsdtBool: false,
				isCurrUnhold: null,
				isCurrUnholdMsg: '',
				currencySymbol: '',
				usdtMoneyRate: 0,
				chooseRecType: null,
			}
		},
		onShow() {

			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('rechargeEventClick', async (data) => {
				this.urlFromStr = data.from
			})




			this.currentIndex = 0
			this.inputRechargeAmount = ""
			this.quickAmountSelectIndex = ""

			this.getPayInfoData()


			this.getInformation()
		},
		mounted() {

		},
		computed: {
			changeRechargeBtnStyle() {
				if (!this.inputRechargeAmount) {
					return 'changeRechargeBtnClass'
				} else {
					return 'changeRechargeBtnClassActive'
				}
			},
			ngnToUsdtMoney() {

				if (this.inputRechargeAmount) {
					// return this.inputRechargeAmount / this.usdtMoneyRate
					return this.inputRechargeAmount * this.usdtMoneyRate
				} else {
					return 0.00
				}


			}
		},
		methods: {
			refreshMoney() {
				this.getInformation()
			},
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

				this.inputPlace = this.$t('recharge.single.amount.text') + ": " + item.minMax
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
				this.inputRechargeAmount = this.inputRechargeAmount * 1 + (item) * 1
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
			async rechargeBtnClick() { //充值按钮点击事件
				// console.log("this.chooseRecType", this.chooseRecType);

				if (this.isCurrUnhold === 1) {

					uni.showToast({
						title: this.isCurrUnholdMsg,
						icon: "none",
						duration: 2000
					});

					return false
				}


				if (!this.inputRechargeAmount) {
					return false
				}
				let resR = await rechargeReq({
					payId: this.chooseRecType,
					money: this.inputRechargeAmount * 1
				}, this.localLoginToken)
				if (resR.code === 200) {
					uni.showToast({
						title: resR.msg,
						icon: 'none',
						duration: 2000,
					});

					if (resR.data.UrlAddress) {
						window.location.href = resR.data.UrlAddress
					}


				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f8f8f8;
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

	.recharge {
		height: 100vh;

		.content {
			background-color: #fff;
			margin-top: 10px;

			.content-top {
				background-color: #fff;
				padding: 15px;

			}


			.recharge-type {
				color: #333;
				// margin-top: 13px;



				.title {
					color: #333333;
					font-size: 14px;
				}


				.type-list {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;

					.type-item {
						margin-top: 8px;
						// margin-right: 15px;
						// padding: 12px 0;
						width: 48%;
						font-size: 12px;
						height: 80px;
						color: #333;
						background: #fff;
						background-size: 100% 100%;
						display: flex;
						flex-direction: column;
						align-items: center;
						position: relative;
						border-radius: 3px;
						word-break: break-all;
						border: 1px solid #eee;

						.recharge-icon {
							width: 100%;
							height: 100%;
							border-top-left-radius: 3px;
							border-top-right-radius: 3px;

							width: 60px;
							height: 60px;
							margin-top: 5px;

							// width: 30px;
							// height: 30px;
							// margin-bottom: 5px;
						}

						.pay-type {
							text-align: center;
							line-height: 20px;
							font-weight: 700;
							// 	position: absolute;
							// 	text-align: center;
							// 	height: 24px;
							// 	line-height: 24px;
							// 	background: #1f252f;
							// 	width: 100%;
							// 	bottom: 0;
						}
					}

					.activedicon {
						position: absolute;
						right: -1px;
						bottom: -4px;

						.imgfilterdark {
							width: 20px;
							height: 20px;
						}
					}

					.active {
						border: solid 1px #507ef6;
						color: #507ef6;
						font-weight: 600;
					}
				}
			}

			.recharge-input {
				margin-top: 10px;
				background: #1f252f;
				padding: 10px 15px;
			}
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
