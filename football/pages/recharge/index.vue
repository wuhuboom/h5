<template>
	<view class="onLineRechargePage">
		<!-- left-icon="left" -->

		<uni-nav-bar backgroundColor="#00111C" color="#fff" :statusBar="true" :border="false"
			@clickLeft="goBackBtnClick" style="font-weight: 600;" :fixed="true">
			<block slot="left">
				<view class="navLeftBtn">
					<image src="../../static/images/back.svg" mode=""></image>
				</view>
			</block>

			<view class="navTitleCenter">{{navTitle}}</view>
			<block slot="right">
				<view class="customerService" @click="goToOnLineService">
					<image src="../../static/images/customer_service1.png" mode=""></image>
				</view>
			</block>
		</uni-nav-bar>

		<view class="rechargeContainer">
			<view class="rechargeContainerTitle">
				{{$t('recharge.type.text')}}:
			</view>
			<view class="rechargeContainerType">
				<view class="rechargeContainerTypeItem"
					:class="currentIndex==index ?'rechargeContainerTypeItemActive':'' "
					v-for="(item,index) in rechargeList" :key="item.id" @click="rechargeTypeItemClick(item,index)">
					<view class="rechargeContainerTypeItemImage">
						<image :src="item.img" mode=""></image>
					</view>
					<view class="rechargeContainerTypeItemText">
						{{item.name}}
					</view>
				</view>
			</view>

			<view class="rechargeContainerList">
				<view class="rechargeContainerListEnter">
					{{$t('recharge.amount.text')}}:
					<view class="rechargeContainerListInput">
						<input type="number" value="" :placeholder="inputPlace"
							placeholder-style="font-size:14px;color:rgb(80,103,120)" v-model="inputRechargeAmount"
							@input="rechargeAmountInputChange" @focus="rechargeAmountFocus"
							@blur="rechargeAmountBlur" />
						<view class="clearInputIcon u-close" v-if="showClearInputIconBool"
							@mousedown.native="clearInputIconClick">
							<!-- <uni-icons type="close" size="30"></uni-icons> -->
							<u-icon name="close-circle-fill"></u-icon>
						</view>
						<view class="rechargeUsdtClass" v-if="showUsdtBool">
							USDT
						</view>

					</view>

				</view>
				<view class="rateSpaceTwo" v-if="showUsdtBool">
					<view class="currentMoneyRate" style="font-size: 12px;">
						{{$t('recharge.real.amount.text')}} ≈ {{ngnToUsdtMoney}}
					</view>
					<view class="currentMoneyRateRight">
						USDT{{$t('recharge.usdt.rate.text')}}:{{usdtMoneyRate}}
					</view>
				</view>
				<view class="quickAmountList" v-if="quickAmountListBool">
					<view class="quickAmountListItem" v-for="(item,index) in quickAmountList" :key="index"
						hover-class="quickAmountListItemHover" hover-stay-time="200"
						@click="quickAmountListItemClick(item)">
						{{item}}
					</view>
				</view>
				<view class="rechargeTipList">
					<view class="rechargeTipTitle">
						{{$t('recharge.tip.title.text')}}
					</view>
					<view class="rechargeTipListS">
						<view class="" v-for="(item,index) in rechargeTipListS" :key="index">
							{{item.content}}
						</view>
					</view>
				</view>
				<view class="onlineRechargeButton">
					<button :class="changeRechargeBtnStyle" type="default"
						@click="inputRechargeAmount ? $u.throttle(rechargeBtnClick, 1000) : null">{{$t('recharge.button.now.text')}}</button>
				</view>
			</view>
		</view>


		<view class="loadingWrap" v-if="loadingWrapBool">
			<!-- animate__animated animate__bounce -->
			<view class="bounce animatedLoadingView">

			</view>
			<view class="">
				Loading...
			</view>
		</view>

	</view>
</template>

<script>
	import {
		rechargePreReq,
		rechargeReq,
		websiteUrlStr,
		servReq
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
				// quickAmountList:[{
				// 	amount:"500"
				// },{
				// 	amount:"1000"
				// },{
				// 	amount:"2000"
				// },{
				// 	amount:"5000"
				// },{
				// 	amount:"10000"
				// },{
				// 	amount:"20000"
				// },{
				// 	amount:"50000"
				// },{
				// 	amount:"100000"
				// }],
				quickAmountList: [],
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
				usdtMoneyRate: 0,
				chooseRecType: null,
				defaultServerAdd: '',
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





			this.getPayInfoData()


			this.getServerAddData()
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
			async getPayInfoData() {
				// this.loadingWrapBool = true
				let resR = await rechargePreReq({}, this.localLoginToken)
				// setTimeout(() => {
				// 	this.loadingWrapBool = false
				// }, 1000)
				// console.log("resR",resR);
				if (resR.code === 200) {
					let rechargeData = resR.data
					rechargeData.forEach((item, index) => {
						item.img = websiteUrlStr + "/" + item.img
						if (item.type === 1) { //是USDT才显示汇率
							this.usdtMoneyRate = item.rate
						}

						// if (index === 0 && item.type === 1) {
						// 	this.showUsdtBool = true
						// } else {
						// 	this.showUsdtBool = false
						// }
					})

					this.rechargeList = rechargeData
					if (this.rechargeList.length !== 0) {
						this.chooseRecType = this.rechargeList[0].id

						if (this.rechargeList[0].type === 1) {
							this.showUsdtBool = true
						} else {
							this.showUsdtBool = false
						}
					}

					if (resR.data.length !== 0) {
						// console.log("this.rechargeList[0].id",this.rechargeList[0].id);
						if (resR.data[0].hasOwnProperty('fast')) {
							this.quickAmountListBool = true
							this.quickAmountList = resR.data[0].fast.split('-')
						} else {
							this.quickAmountListBool = false
							this.quickAmountList = []
						}

						this.inputPlace = this.$t('recharge.single.amount.text') + ":" + resR.data[0].minMax
					}



				}
			},
			async getServerAddData() {
				let resR = await servReq(this.localLoginToken)
				// console.log("resR", resR);
				this.defaultServerAdd = resR.data.serviceAddr
			},
			goBackBtnClick() {

				const queryRechargeUrlFrom = uni.getStorageSync('queryRechargeUrlFrom') || 'other'
				if (!this.rechargeState_Bool) {
					this.urlFromStr = queryRechargeUrlFrom
				}

				if (this.urlFromStr === "home") {
					uni.switchTab({
						url: '/pages/home/index',
						animationType: 'pop-in',
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
						animationType: 'pop-in',
						animationDuration: 200
					})
				} else if (this.urlFromStr === "user") {
					uni.switchTab({
						url: '/pages/user/user',
						animationType: 'pop-in',
						animationDuration: 200
					})
				} else {
					uni.switchTab({
						url: '/pages/user/user',
						animationType: 'pop-in',
						animationDuration: 200
					})
				}

			},
			rechargeTypeItemClick(item, index) {
				this.chooseRecType = item.id
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
					this.quickAmountListBool = false
					this.quickAmountList = []
				}


				if (item.type === 1) {
					this.showUsdtBool = true
				} else {
					this.showUsdtBool = false
				}




			},
			quickAmountListItemClick(item) { //快速充值金额点击事件
				this.inputRechargeAmount = this.inputRechargeAmount * 1 + (item) * 1
			},
			rechargeAmountInputChange() {
				this.showClearInputIconBool = true
			},
			rechargeAmountFocus() {
				this.showClearInputIconBool = this.inputRechargeAmount ? true : false
				// if(this.inputRechargeAmount){
				// 	this.showClearInputIconBool = true
				// }else{
				// 	this.showClearInputIconBool = false
				// }
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
				window.location.href = this.defaultServerAdd;
			},
			async rechargeBtnClick() { //充值按钮点击事件
				// console.log("this.chooseRecType", this.chooseRecType);
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

<style>
	page {
		background-color: #071a28;
		height: 100%;
		position: relative;
	}

	.onLineRechargePage {}

	.navLeftBtn {}

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

	.customerService {
		height: 100%;
		margin-right: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.customerService image {
		width: 27px;
		height: 27px;
	}

	.rechargeContainer {
		padding: 0 15px 50px;
	}

	.rechargeContainerTitle {
		color: #fff;
		font-size: 16px;
		padding: 22px 0;
	}

	.rechargeContainerType {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.rechargeContainerTypeItem {
		width: 48%;
		margin-bottom: 16px;
		position: relative;
		overflow: hidden;
		border-radius: 5px;
	}

	.rechargeContainerTypeItemActive {
		border: 1px solid #3d8dfe;
	}

	.rechargeContainerTypeItemImage {
		/* width: 100%;
	height: 78px; */
	}

	.rechargeContainerTypeItemImage image {
		width: 100%;
		height: 78px;
	}

	.rechargeContainerTypeItemText {
		background: #334756f2;
		line-height: 24px;
		font-size: 14px;
		position: absolute;
		bottom: 0;
		width: 100%;
		border-radius: 0 0 5px 5px;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.rechargeContainerList {
		margin: 10px 0;
	}

	.rechargeContainerListEnter {
		color: #f0f0f0;
	}

	.rechargeContainerListInput {
		/* width: 80%; */
		background: #334756;
		border-radius: 5px;
		margin: 15px 0;
		height: 43px;
		padding: 0px;
		border-color: rgb(220, 223, 230);
		text-align: left;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.rechargeUsdtClass {
		width: 15%;
	}

	.rateSpaceTwo {
		display: flex;
		justify-content: space-between;
		color: #fff;
		font-size: 12px;
	}

	.currentMoneyRate {
		color: #fff;
	}


	.rechargeContainerListInput input {
		/* min-height: 43px; */
		padding: 10px;
		color: #fff;
		flex: 1;
	}

	.clearInputIcon {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-right: 10px;
	}

	.quickAmountList {
		display: flex;
		flex-wrap: wrap;
	}

	.quickAmountListItem {
		font-size: 14px;
		width: 60px;
		height: 30px;
		background-color: #474747;
		margin: 10px 10px 10px 0;
		/* padding: 5px; */
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 5px;
		color: #fff;
	}

	.quickAmountListItemHover {
		background-color: #3d8dfe;
	}

	.rechargeTipList {

		color: #fff;
		font-size: 12px;
		background: #132736;
		border-radius: 5px;
		padding: 10px 15px;
		margin: 15px 0 35px;
	}

	.rechargeTipTitle {
		display: flex;
		align-items: center;
		font-size: 12px;
		color: #3d8dfe;
		margin-bottom: 6px;
	}

	.rechargeTipListS {}

	.rechargeTipListS view {
		margin: 5px 0;
	}

	.onlineRechargeButton {
		color: #f0f0f0;
	}

	.changeRechargeBtnClass {
		font-size: 15px;
		color: #fff;
		background: rgb(51, 71, 86);
		height: 50px;
		line-height: 50px;
		border-radius: 10px;
		margin: 0 10px;
	}

	.changeRechargeBtnClassActive {
		font-size: 15px;
		color: #fff;
		background: #3d8dfe;
		height: 50px;
		line-height: 50px;
		border-radius: 10px;
		margin: 0 10px;
	}

	.loadingWrap {
		height: 100%;
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		background: rgb(0, 0, 0, .5);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		z-index: 10000;
		color: #fff;
	}

	.bounceInUp {
		animation-name: bounceInUp;

	}

	.bounce {
		/*  animation-name: bounceInUp; */
		animation: bounceInUp 2.5s infinite 0.5s both;
		transform-origin: center bottom;
	}

	/* @keyframes bounceInUp {
	60%,80%,to {
		transform: translateY(-60px);
	    animation-timing-function: ease;
	}
	
	70% {transform: translateY(10px);}
	90% {transform: translateY(60px);}
}

 */

	@keyframes bounceInUp {

		0%,
		7%,
		25%,
		36%,
		45%,
		50% {
			animation-timing-function: ease-out;
			transform: translate3d(0, 0, 0);
		}

		15%,
		16% {
			animation-timing-function: ease-in;
			transform: translate3d(0, -42px, 0);
		}

		30% {
			animation-timing-function: ease-in;
			transform: translate3d(0, -24px, 0);
		}

		41% {
			animation-timing-function: ease-in;
			transform: translate3d(0, -12px, 0);
		}

		47% {
			animation-timing-function: ease-in;
			transform: translate3d(0, -3px, 0);
		}
	}

	@-webkit-keyframes bounceInUp {

		0%,
		7%,
		25%,
		36%,
		45%,
		50% {
			animation-timing-function: ease-out;
			transform: translate3d(0, 0, 0);
		}

		15%,
		16% {
			animation-timing-function: ease-in;
			transform: translate3d(0, -42px, 0);
		}

		30% {
			animation-timing-function: ease-in;
			transform: translate3d(0, -24px, 0);
		}

		41% {
			animation-timing-function: ease-in;
			transform: translate3d(0, -12px, 0);
		}

		47% {
			animation-timing-function: ease-in;
			transform: translate3d(0, -3px, 0);
		}
	}

	.animatedLoadingView {
		width: 84px;
		height: 76px;
		background-image: url(../../static/images/ball.png);
		background-repeat: no-repeat;
		background-position: 0 0;
		background-size: 100% 100%;
		animation-duration: 1.5s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
		-webkit-animation-iteration-count: infinite;
		animation-iteration-count: infinite;
	}
</style>
