<template>
	<view class="recharge">
		<!-- left-icon="left" -->

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
				<view class="balance">
					<view class="balance-top">
						<view class="balance-title">
							{{$t('home.balance')}}
						</view>
						<view class="balance-img" @click="refreshMoney">
							<image src="../../static/images/refer.svg" mode="" class="refer"></image>
						</view>
					</view>
					<view class="ammout">
						<text class="banText">{{balanceNum}}</text>
					</view>
				</view>
				<view class="recharge-type">
					<view class="title">
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
						</view>
					</view>
				</view>
				<view class="recharge-sub">

				</view>
			</view>
			<view class="recharge-input">
				<view class="usdt">
					<view class="recharge-type">
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
							</view>
						</view>
						<view class="recharge_btn">
							<u-button :class="inputRechargeAmount ? 'changeColor' :'' " style="overflow: visible;"
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
				rechargeList: [{
					image: '../../static/images/bankCharge.png',
					text: 'GMS Pay',
					status: 1,
				}, {
					image: '../../static/images/upi.png',
					text: 'Xft Pay-UPI',
					status: 1,
				}, {
					image: '../../static/images/virtual.png',
					text: 'USDT',
					status: 0,
				}],
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
			// ??????acceptDataFromOpenerPage?????????????????????????????????eventChannel??????????????????????????????
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
					let returnAmountStr = ""
					// return this.inputRechargeAmount / this.usdtMoneyRate
					let reAmountStr = (this.inputRechargeAmount * this.usdtMoneyRate).toString()
					// console.log("reAmountStr", reAmountStr, typeof reAmountStr);
					reAmountStr = reAmountStr.split('.')
					// console.log("reAmountStr", reAmountStr, reAmountStr[0], reAmountStr[1]);
					let leftAmount = reAmountStr[0]
					if (reAmountStr[1]) {
						let saveToStr = reAmountStr[1].substring(0, 2)
						returnAmountStr = leftAmount + "." + saveToStr
					} else {
						returnAmountStr = reAmountStr[0]
					}

					return returnAmountStr
					// return this.inputRechargeAmount * this.usdtMoneyRate 
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
							// ??????eventChannel??????????????????????????????
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
				//unhold:0??????1?????? unholdMsg:??????????????????
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
			quickAmountListItemClick(item, index) { //??????????????????????????????
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
			async rechargeBtnClick() { //????????????????????????
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
		background-color: #1f252f;
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

	// ???????????????

	.recharge {
		height: 100vh;

		.content {
			background-color: #171e25;

			.content-top {
				background-color: #1f252f;
				padding: 15px;

				.balance {
					color: #020202;
					font-size: 15px;
					border-radius: 6px;
					justify-content: space-between;
					padding: 20px;
					// background-size: contain;
					background-image: url(../../static/images/bg-recharge.png);
					background-repeat: no-repeat;
					background-size: 100% 100%;

					.balance-top {
						display: flex;
						align-items: center;

					}

					.balance-title {
						color: #020202;
					}

					.balance-img {
						text-align: center;
						margin-left: 5px;
						flex: 1;
						display: flex;
						align-items: center;

						.refer {
							width: 16px;
							height: 16px;
						}
					}

					.ammout {
						display: flex;
						align-items: center;

						.banText {
							margin-right: 10px;
							padding-top: 5px;
							font-size: 24px;
							color: #020202;
						}
					}
				}



			}


			.recharge-type {
				color: #333;
				margin-top: 13px;

				.title {
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
						color: #fff;
						background: url(../../static/images/type2.png) no-repeat;
						background-size: 100% 100%;
						display: flex;
						flex-direction: column;
						align-items: center;
						position: relative;
						border-radius: 3px;
						word-break: break-all;


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

							// 	position: absolute;
							// 	text-align: center;
							// 	height: 24px;
							// 	line-height: 24px;
							// 	background: #1f252f;
							// 	width: 100%;
							// 	bottom: 0;
						}
					}

					.active {
						border: solid 1px #ffbd00;
						color: #ffbd00;
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
	}

	.title {
		color: #fff;
		font-size: 16px;
	}

	.recharge-type {
		font-size: 14px;

		.title {
			color: #fff;
		}

		.input {
			display: flex;
			align-items: center;
			flex-direction: row;
			justify-content: space-between;
			background-color: #f7f7f8;
			border-radius: 5px;
			position: relative;
			margin-top: 7px;
			padding: 8px;
			background-color: #171e25;
			color: #f8f8f8;

			.input-num {
				font-size: 18px;
				flex: 75%;
				position: relative;
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
				color: #ffc24a;
				text-align: center;
			}
		}

		.usdtKey {
			display: flex;
			justify-content: space-between;
			padding: 10px 5px;
			color: #fff;
		}

		.select-number {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-top: 5px;

			.item {
				width: 30%;
				color: #4f4f4f;
				font-size: 16px;
				margin-bottom: 5px;
				margin-top: 5px;
				height: 38px;
				line-height: 38px;
				background-color: #f7f7f8;
				text-align: center;
				border-radius: 5px;
				border: solid 1px #fff;
				// margin-right: 15px;
				background: #171e25;
				color: #fff;
				border: none;
			}

			.active {
				background: linear-gradient(90deg, #ffd37d, #ca962e);
				color: #222;
				border: none;
			}
		}


		.recharge_btn {
			position: relative;
			overflow: hidden;
			width: 345px;
			height: 50px;
			margin-top: 10px;

			.changeColor {
				background: linear-gradient(90deg, #ffd37d, #ca962e);
				color: #111
			}
		}


	}
</style>
