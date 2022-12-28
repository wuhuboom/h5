<template>
	<view class="onLineRechargePage">

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

		<view class="withdraw-swiper-page">
			<view class="addCard_top_box" @click="bindCardUsdtClick">
				<text class="title" v-if="this.currentIndex === 2">{{$t('withdraw.add.usdt.type.text')}}</text>
				<text class="title" v-if="this.currentIndex === 1">{{$t('withdraw.add.bank.type.text')}}</text>
				<text class="title" v-if="this.currentIndex === 3">{{$t('backapi.self.withdraw.add.sim.text')}}</text>
				<image src="../../static/images/add.png" mode="" class="icon"></image>
			</view>
			<view class="scroll-box-item">
				<scroll-view :scroll-x="false" class="scroll-view_H">
					<view :class="currentIndex === item.type ?'scroll-view-item_H active':'scroll-view-item_H' "
						v-for="(item,index) in withdrawList" :key="item.id" @click="rechargeTypeItemClick(item,index)">
						<view class="scroll-content">
							<image :src="item.image" mode="" class="icon"
								:style="item.type === 2 ? 'width: 48px;height: 48px;':'width: 73px;height: 48px;'">
							</image>
							<text
								:style="currentIndex == item.type ? 'color:#f8f8f8' : 'color:#ffbc00'">{{item.text}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="tab-view">
				<text class="title">{{$t('withdraw.receiving.card.number.text')}}</text>
				<view class="bankBox" @click="bankBoxClick">
					<view class="t">
						<text></text>
						<text class="con">
							{{cardNumSelect}}</text>
					</view>
					<u-icon name="arrow-right" color="#fff"></u-icon>
				</view>
				<text class="intro" style="display: none;"></text>
				<view class="amount">
					<view class="amount-title">
						{{$t('withdraw.amount.num.text')}}
					</view>
					<view class="input-money">
						<input type="password" style='width:0;height:0;min-height:0' />
						<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
						<input class="t-input" type="number" value="" maxlength=20 :placeholder="inputPlace"
							placeholder-style="font-size:14px;color:rgb(80,103,120)" v-model="inputWithdrawAmount"
							@input="rechargeAmountInputChange" @focus="rechargeAmountFocus"
							@blur="rechargeAmountBlur" />
					</view>
					<!-- <view class="pay-password-title">
						{{$t('withdraw.pay.password.title.text')}}
					</view>
					<view class="input-money">
							<input type="password" style='width:0;height:0;min-height:0' />
						<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
						<input class="t-input" type="password" value="" maxlength=6 :placeholder="payPlace"
							placeholder-style="font-size:14px;color:rgb(80,103,120)" v-model="payPass"
							@input="rechargeAmountInputChange" />
						<view class="show-pass-view">

						</view>
						<u-input type="password" class="forgetPassword_item_input" :placeholder="payPlace"
							:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="16"
							v-model="payPass" @input="rechargeAmountInputChange" />
					</view> -->
					<view class="info-money">
						<view class="">
							<view class="info-money-num">
								<text>{{$t('home.balance')}}:{{allMoneyNum}}</text>
								<text class="info-money-all"
									@click="allMoneyClick">{{$t('withdraw.amount.all.text')}}</text>
							</view>
							<view class="info-money-num">
								<text>{{$t('withdraw.actual.money.text')}}:</text>
								<text class="info-money-all" style="font-size: 16px;">{{actualAmountTran}}</text>
								<text style="margin-left: 2px;font-size: 16px;">{{currencySymbol}}</text>
							</view>
							<view class="info-money-num" style="margin-top: 10px;">
								1、{{$t('withdraw.desc.list1')}} {{everydayWithdrawFree}}
							</view>
							<view class="info-money-num">
								2、{{$t('withdraw.desc.list2')}} {{everydayWithdrawTimes}}
							</view>
							<view class="info-money-num">
								3、{{$t('withdraw.desc.list3')}} {{withdrawalRate}}%
							</view>
							<view class="info-money-num">
								4、{{$t('withdraw.desc.list4')}} {{withdrawMax}},{{$t('withdraw.desc.list5')}}
								{{withdrawMin}}
							</view>
							<view class="info-money-num">
								5、{{$t('withdraw.desc.list6')}} {{withdrawalToday}}
							</view>
							<view class="info-money-num">
								6、{{$t('withdraw.desc.list7')}} {{withdrawalRateMin}},{{$t('withdraw.desc.list8')}}
								{{withdrawalRateMax}}
							</view>
							<view class="info-money-num">
								7、{{$t('withdraw.desc.list9')}} {{usdtWithdrawPer}}
							</view>

						</view>
					</view>

				</view>
				<view class="withfraw-btn">
					<view class="tx-active">
						<u-button :class="changeRechargeBtnStyle" style="overflow: visible;"
							@click="inputWithdrawAmount ? withdrawBtnClick() : null">
							{{$t('withdraw.button.title.text')}}
						</u-button>
					</view>
				</view>
			</view>
		</view>

		<!-- 安全验证弹窗  -->
		<u-popup v-model="safePopBool" mode="center" border-radius="10" :mask-close-able="false" z-index="777">
			<view class="popup-box">
				<view class="modal-top">
					<view class="modal-left">

					</view>
					<view class="title">
						<text>{{$t('withdraw.safe.check.text')}}</text>
					</view>
					<view class="close" @click="closeSafePopClick">
						X
					</view>
				</view>
				<view class="money">
					<view class="label">
						{{$t('withdraw.amount.num.text')}}
					</view>
					<view class="content">
						{{inputWithdrawAmount}}
					</view>
				</view>
				<view class="input-form">
					<view class="label">
						{{$t('user.change.phone.code.text')}}
					</view>
					<view class="input-view">
						<input type="password" style='width:0;height:0;min-height:0' />
						<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
						<input class="txmm-input" type="text" value="" maxlength=4 :placeholder="smsCodePlace"
							placeholder-style="font-size:14px;color:rgb(80,103,120)" v-model="sms_code"
							@input="rechargeAmountInputChange" />
						<view class="getVerifyCode" @click="getSmsCodeClick">
							{{defalutCodeTitle}}
						</view>
					</view>
				</view>
				<view class="input-form">
					<view class="label">
						{{$t('withdraw.pay.password.title.text')}}
					</view>
					<view class="input-view">
						<input type="password" style='width:0;height:0;min-height:0' />
						<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
						<input class="txmm-input" type="password" value="" maxlength=16 :placeholder="payPlace"
							placeholder-style="font-size:14px;color:rgb(80,103,120)" v-model="payPass"
							@input="rechargeAmountInputChange" />
						<view class="txt" @click="forgetfunpass">
							{{$t('withdraw.forget.pass.text')}}?
						</view>
					</view>
				</view>
				<view class="item">
					<view class="label">
						{{$t('withdraw.desc.list9')}}
					</view>
					<view class="content">
						{{usdtWithdrawPer}}
					</view>
				</view>
				<view class="item">
					<view class="label">
						{{$t('withdraw.desc.list3')}}
					</view>
					<view class="content">
						{{withdrawalRate}}%
					</view>
				</view>
				<view class="item">
					<view class="label">
						{{$t('withdraw.with.money.text')}}
					</view>
					<view class="content">
						{{withdrawNumRate}}
					</view>
				</view>
				<view class="item">
					<view class="label">
						{{$t('withdraw.actual.money.text')}}
					</view>
					<view class="content">
						{{actualAmountTran}} {{currencySymbol}}
					</view>
				</view>
				<view class="determine" @click="confirmWithdrawClick">
					{{$t('withdraw.btn.confirm.text')}}
				</view>
				<view class="count">
					<text class="txt">{{$t('withdraw.desc.list6')}} {{withdrawalToday}}</text>
				</view>
			</view>
		</u-popup>

		<!-- 提现卡列表 -->
		<u-popup v-model="cardsPopBool" mode="bottom" width="315px" border-radius="10">
			<view class="cards-pop">
				<view class="pop-title" v-if="currentIndex === 1">
					<view class="title">
						<view class="title-up">
							{{$t('withdraw.select.with.type.text')}}
						</view>
						<view class="title-tip">
							{{$t('withdraw.bank.time.text')}}
						</view>
					</view>
					<view class="" style="width: 23px;">

					</view>
					<u-icon name="checkbox-mark111" color="#fff"></u-icon>
				</view>
				<view class="card-list">
					<view class="card" v-for="(item,index) in typeOptions" :key="item.id"
						@click="selectCardClick(item)">
						<view class="left">
							<view class="card-name">
								{{item.label}}
							</view>
						</view>
						<u-icon v-if="typeValue === item.id" name="checkmark" color="#ffbc00"></u-icon>
					</view>
				</view>
				<view class="add-card" @click="addNewCardClick" v-if="currentIndex === 1">
					<view class="left">
						<image src="../../static/images/card.png" mode="" class="add-icon"></image>
						<view class="add-title">
							{{$t('withdraw.use.new.card.text')}}
						</view>
					</view>
					<u-icon name="checkbox-mark111" color="#fff"></u-icon>
				</view>
				<view class="" style="width: 100%;height: 30px;">

				</view>
			</view>
		</u-popup>


	</view>
</template>

<script>
	import {
		bankCardInfo,
		simCardInfoInfo,
		usdtListReq,
		withdrawalReq,
		withdrawalPreReq,
		playerInfoReq,
		getPwdPayReq,
		setPwdPayReq,
		phoneCodeOnlineReq,
		websiteUrlStr
	} from '@/api/index.js'
	import {
		myMixin,
		withdrawMinxi,
		addBankMinxi,
		addUsdtMinxi,
		addSimMinxi,
		setBindPhoneMixin,
		setFunPassMixin
	} from '@/util/mixins.js'
	const TIME_COUNT = 59;
	export default {
		mixins: [myMixin, withdrawMinxi, addBankMinxi, addSimMinxi, addUsdtMinxi, setBindPhoneMixin, setFunPassMixin],
		data() {
			return {
				cardsPopBool: false,
				currSelectId: '',
				safePopBool: false,
				navTitle: this.$t('withdraw.title.text'),
				inputPlace: this.$t('withdraw.enter.amount.num.text'),
				withdrawList: [],
				rechargePlace: '',
				rechargeTipListS: [],
				rechargeContainerTypeClass: 'rechargeContainerTypeItem',
				currentIndex: 0,
				loadingWrapBool: false,
				inputWithdrawAmount: '',
				showClearInputIconBool: false,
				inputRechargeFocus: false,
				urlFromStr: '',
				typeValue: 0,
				typeOptions: [],
				cardNumSelect: '',
				everydayWithdrawFree: '',
				withdrawalToday: '',
				usdtWithdrawPer: '',
				withdrawalRateMin: '',
				withdrawalRateMax: '',
				withdrawalRate: '',
				withdrawMin: '',
				withdrawMax: '',
				everydayWithdrawTimes: '',
				allMoneyNum: 0,
				usdtMoney: 0,
				smsCodePlace: this.$t("user.change.phone.code.place.text"),
				payPlace: this.$t('withdraw.enter.pay.password.title.text'),
				customInputStyle: {
					"min-height": "0px",
					"background-color": "rgb(51, 71, 86)",
					"border-radius": "5px",
					"color": "#fff",
					"padding": "10px"
				},
				placeholderStyle: "color:#506778;font-size:12px",
				sms_code: '',
				payPass: '',
				showUsdtBool: false,
				isShowWithDrawModal: false,
				firstIntoNum: 0,
				withdrawPlace: this.$t('home.pay.pwd.input.place.text'),
				maskCustomStyle: {
					'background-color': 'rgba(0, 17, 28, 0.45)'
				},
				popCustomStyle: {
					'background': 'transparent',
				},
				customInputStyle: {
					"min-height": "35px",
					"height": "44px",
					"background-color": "rgb(51, 71, 86)",
					"border-radius": "5px",
					"color": "#fff",
					"padding-left": "17px"
				},
				placeholderStyle: "color:#506778;font-size:12px",
				withdrawPopFooterClass: "withdrawPopFooterButton",
				inputWithdrawData: '',

				defalutCodeTitle: this.$t('user.change.phone.get.code.text'),
				timer: null,
				isHavePhone: false,
				currencySymbol: '',
			}
		},
		onLoad() {

			// // 银行卡获取列表
			// this.getCardListData(1) //1为加载数据且自动判定是否跳转

			// this.getUsdtListData()
		},
		onShow() {

			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('withdrawEventClick', async (data) => {
				this.urlFromStr = data.from
			})


			// 初始化语言
			this.initLang()


			// 初始化基本数据
			this.initBaiseData()


		},
		onHide() {
			// console.log("this.timer", this.timer);
			// if (!this.openWithDrawModelBool) {
			// 	clearInterval(this.timer)
			// }

		},
		mounted() {

		},
		computed: {
			withdrawNumRate() { //提现费用。计算出提现手续费用
				// this.inputWithdrawAmount / this.usdtWithdrawPer
				// return this.inputWithdrawAmount * (this.withdrawalRate / 100)
				// // 这是输入金额
				// console.log("this.inputWithdrawAmount ", this.inputWithdrawAmount);
				// // 这是汇率参数
				// console.log("this.usdtWithdrawPer ", this.usdtWithdrawPer);
				// // 这是手续费参数
				// console.log("this.withdrawalRate ", this.withdrawalRate);
				// console.log("withdrawNumRate ", (this.inputWithdrawAmount / this.usdtWithdrawPer) * (this.withdrawalRate /
				// 	100));
				return (this.inputWithdrawAmount / this.usdtWithdrawPer) * (this.withdrawalRate / 100)
			},
			actualAmountTran() { //实际到账金额
				return ((this.inputWithdrawAmount / this.usdtWithdrawPer) * 1) - (this.withdrawNumRate * 1)

			},
			changeRechargeBtnStyle() {
				// console.log("this.inputWithdrawAmount",this.inputWithdrawAmount);
				// console.log("this.payPass",this.payPass);
				if (this.inputWithdrawAmount) {
					return 'changeColor'
				} else {
					return ''
				}
			},
			realUsdtMoney() {
				// console.log("进来");
				if (this.currentIndex === 0) {
					// 100/620-(100/620)*0.07
					let currPer = this.usdtWithdrawPer
					let currUsdtRate = this.withdrawalRate
					// console.log("11", (this.inputWithdrawAmount - currPer),  (1 - (currUsdtRate/100)));
					return (this.inputWithdrawAmount / currPer) - (this.inputWithdrawAmount / currPer) * (currUsdtRate /
						100)
				}
			}
		},
		methods: {
			initLang() {
				// this.rechargeTipListS = [{
				// 	content:"1、"+this.$t('withdraw.desc.list1') + " " + this.everydayWithdrawFree
				// }]
			},
			initBaiseData() {


				//获取是否设置过提现密码
				this.getPwdPay()
				// //获取收款卡号列表
				// this.getCardListData(2)
				// 提现前准备数据
				this.getWithdrawPreData()
				// 获取当前账户余额
				this.getAllMoney()
			},
			goBackBtnClick() {
				// this.remove_withdraw_from()
				const queryWithdrawUrlFrom = uni.getStorageSync('queryWithdrawUrlFrom') || 'other'
				// console.log("queryWithdrawUrlFrom",queryWithdrawUrlFrom);
				if (!this.withdrawState_Bool) {
					this.urlFromStr = queryWithdrawUrlFrom
				}
				if (this.urlFromStr === "home") {
					uni.switchTab({
						url: '/pages/home/index',
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
			async getPwdPay() {
				let resR = await getPwdPayReq(this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {
					if (resR.data.paySet === 2) { //1已设置 2未设置
						this.isShowWithDrawModal = true
					} else {
						this.isShowWithDrawModal = false
					}
				}
			},
			async getCardListData(typeNum) { //获取银行卡列表

				this.loadingWrapBool = true
				let resR = await bankCardInfo(this.localLoginToken)
				setTimeout(() => {
					this.loadingWrapBool = false
				}, 1000)
				// console.log("resR",resR);
				if (resR.code === 200) {
					let resultData = resR.data
					// console.log("resultData", resultData, this.firstIntoNum);
					if (!resultData && this.firstIntoNum !== 0) {
						this.cardNumSelect = ""
						if (typeNum === 1) {
							uni.navigateTo({
								url: '/pages/user/bankcard_add',
								success: (res) => {
									// 通过eventChannel向被打开页面传送数据	
									this.save_addBank_from('withdraw')
									res.eventChannel.emit('eventAddBankPageClick', {
										from: 'withdraw'
									})
								},
								animationType: 'slide-in-top',
								animationDuration: 200
							})
						}


						return false
					} else if (!resultData && this.firstIntoNum === 0) {

					} else {


						let newResultData = [{
							label: this.cardFilter(resultData.cardNumber),
							value: resultData.id,
							...resultData
						}]
						// console.log("resultData", resultData);
						this.typeOptions = newResultData
						this.typeValue = resultData.id
						this.cardNumSelect = resultData.bankName + this.cardFilter(resultData.cardNumber)
					}


				}
			},
			async getUsdtListData() { //获取USDT
				this.loadingWrapBool = true
				let resR = await usdtListReq(this.localLoginToken)
				setTimeout(() => {
					this.loadingWrapBool = false
				}, 1000)
				if (resR.code === 200) {
					let resultData = resR.data
					// console.log("resultDataSSSS",resultData);

					if (resultData.length === 0 && this.firstIntoNum !== 0) {

						uni.navigateTo({
							url: '/pages/user/usdt_add',
							success: (res) => {
								// 通过eventChannel向被打开页面传送数据	
								this.save_addUsdt_from('withdraw')
								res.eventChannel.emit('eventAddUsdtPageClick', {
									from: 'withdraw'
								})
							},
							animationType: 'slide-in-top',
							animationDuration: 200
						})

						return false
					} else if (resultData.length === 0 && this.firstIntoNum === 0) {

					} else {
						let newResultData = []
						resultData.forEach((item, index) => {
							newResultData.push({
								label: this.usdtFilter(item.addr),
								value: item.id,
								...item
							})
						})
						// console.log("newResultData", newResultData);
						this.typeOptions = newResultData
						this.typeValue = resultData[0].id
						this.cardNumSelect = '(' + resultData[0].protocol + ') ' + this.usdtFilter(resultData[0].addr)
					}


				}
			},
			async getSimListData() { //获取SIM
				this.loadingWrapBool = true
				let resR = await simCardInfoInfo(this.localLoginToken)
				setTimeout(() => {
					this.loadingWrapBool = false
				}, 1000)
				if (resR.code === 200) {
					let resultData = resR.data
					if (!resultData) {
						this.typeOptions = []
						this.typeValue = ""
						this.cardNumSelect = ""
						return false
					}


					// console.log("resultDataSSSS", resultData);
					if (resultData.length === 0 && this.firstIntoNum !== 0) {
						// 			uni.navigateTo({
						// 				url: '/pages/user/usdt_add',
						// 				success: (res) => {
						// 					// 通过eventChannel向被打开页面传送数据	
						// 					this.save_addUsdt_from('withdraw')
						// 					res.eventChannel.emit('eventAddUsdtPageClick', {
						// 						from: 'withdraw'
						// 					})
						// 				},
						// 				animationType: 'slide-in-top',
						// 				animationDuration: 200
						// 			})

						// 			return false
					} else if (resultData.length === 0 && this.firstIntoNum === 0) {

					} else {
						let newResultData = []
						newResultData.push({
							label: resultData.sim,
							value: resultData.id,
							...resultData
						})
						// resultData.forEach((item, index) => {

						// })
						// console.log("newResultData", newResultData);
						this.typeOptions = newResultData
						this.typeValue = resultData.id
						this.cardNumSelect = resultData.sim
					}


				}
			},




			selectCardClick(item) { //卡列表弹窗选择点击事件
				this.typeValue = item.id
				this.cardNumSelect = item.label
				this.cardsPopBool = false
			},
			async getWithdrawPreData() {
				let resR = await withdrawalPreReq(this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {
					let withDrawData = resR.data
					if (withDrawData.length !== 0) {
						withDrawData.forEach(item => {
							item.image = websiteUrlStr + "/" + item.img
							if (item.type === 2) { //USDT
								item.text = 'USDT'
							} else if (item.type === 1) {
								item.text = this.$t('withdraw.record.center.show.detail.type.bank.text')
							} else if (item.type === 3) {
								item.text = "SIM"
							}
						})
						this.withdrawList = withDrawData
						if (!this.openWithDrawModelBool) {
							this.currentIndex = withDrawData[0].type
						}
						// 根据选择不同的提现方式,进行不通的方法获取对应的数据
						if (this.currentIndex === 2) {
							this.getUsdtListData()
						} else if (this.currentIndex === 1) {
							this.getCardListData(1) //2为只加载数据
							this.showUsdtBool = false
						} else if (this.currentIndex === 3) {
							this.getSimListData()
						}

						if (!this.openWithDrawModelBool) {
							this.currencySymbol = withDrawData[0].currencySymbol
							this.withdrawalRate = withDrawData[0].withdrawalRate
							this.withdrawalRateMin = withDrawData[0].withdrawalRateMin
							this.withdrawalRateMax = withDrawData[0].withdrawalRateMax
							this.withdrawMin = withDrawData[0].withdrawMin
							this.withdrawMax = withDrawData[0].withdrawMax
							this.usdtWithdrawPer = withDrawData[0].rate
							this.everydayWithdrawFree = withDrawData[0].everydayWithdrawFree
							this.withdrawalToday = withDrawData[0].withdrawalToday
							this.everydayWithdrawTimes = withDrawData[0].everydayWithdrawTimes
						}



					}


				}
			},
			async getAllMoney() {
				let resR = await playerInfoReq(this.localLoginToken)
				if (resR.code === 200) {
					let currMoney = resR.data.balance / 100
					let currMoneyStr = currMoney.toString().split('.')[0]
					this.allMoneyNum = currMoney

					if (resR.data && resR.data.phone) {
						this.isHavePhone = true
					} else {
						this.isHavePhone = false
					}



				}
			},
			allMoneyClick() {
				this.inputWithdrawAmount = this.allMoneyNum
				if (this.currentIndex === 1) {
					this.showUsdtBool = true
				} else {
					this.showUsdtBool = false
				}
			},
			bindCardUsdtClick() {
				if (this.currentIndex === 2) {
					uni.navigateTo({
						url: '/pages/user/usdt_add',
						success: (res) => {
							// 通过eventChannel向被打开页面传送数据	
							this.save_addUsdt_from('withdraw')
							res.eventChannel.emit('eventAddUsdtPageClick', {
								from: 'withdraw'
							})
						},
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (this.currentIndex === 1) {
					uni.navigateTo({
						url: '/pages/user/bankcard_add',
						success: (res) => {
							// 通过eventChannel向被打开页面传送数据	
							this.save_addBank_from('withdraw')
							res.eventChannel.emit('eventAddBankPageClick', {
								from: 'withdraw'
							})
						},
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (this.currentIndex === 3) {
					uni.navigateTo({
						url: '/pages/user/sim_add',
						success: (res) => {
							// 通过eventChannel向被打开页面传送数据	
							this.save_addsim_from('withdraw')
							res.eventChannel.emit('eventAddSimPageClick', {
								from: 'withdraw'
							})
						},
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				}
			},
			async rechargeTypeItemClick(item, index) {
				// console.log("111", item);
				this.firstIntoNum = 1
				this.currentIndex = item.type
				this.inputWithdrawAmount = ""
				this.rechargeContainerTypeClass = "rechargeContainerTypeItem rechargeContainerTypeItemActive"
				this.inputPlace = this.$t('withdraw.enter.amount.num.text')

				// console.log("this.currentIndex", this.currentIndex);
				// 根据选择不同的提现方式,进行不通的方法获取对应的数据
				// console.log("item.type ", item.type);
				if (item.type === 2) {
					this.getUsdtListData()
				} else if (item.type === 1) {
					this.getCardListData(1) //2为只加载数据
					this.showUsdtBool = false
				} else if (item.type === 3) {
					this.getSimListData() //2为只加载数据
					this.showUsdtBool = false
				}

				// this.getWithdrawPreData()
				this.usdtWithdrawPer = item.rate
				this.currencySymbol = item.currencySymbol
				this.withdrawalRateMin = item.withdrawalRateMin
				this.withdrawalRateMax = item.withdrawalRateMax
				this.withdrawalRate = item.withdrawalRate
				this.withdrawMin = item.withdrawMin
				this.withdrawMax = item.withdrawMax

				this.everydayWithdrawFree = item.everydayWithdrawFree
				this.withdrawalToday = item.withdrawalToday
				this.everydayWithdrawTimes = item.everydayWithdrawTimes

			},
			rechargeAmountInputChange() {
				this.showClearInputIconBool = true
				// this.currentIndex === 1 && 
				if (this.inputWithdrawAmount) {
					this.showUsdtBool = true
				} else {
					this.showUsdtBool = false
				}


			},
			rechargeAmountFocus() {
				this.showClearInputIconBool = this.inputWithdrawAmount ? true : false

			},
			rechargeAmountBlur(e) {
				this.showClearInputIconBool = false
				// console.log("1111",this.inputWithdrawAmount,this.inputRechargeFocus);
			},
			clearInputIconClick() {
				// console.log("2222",this.inputWithdrawAmount);
				this.showClearInputIconBool = false
				this.inputWithdrawAmount = ''
			},
			goToOnLineService() {
				window.location.href = getApp().globalData.kefuaddress;
			},
			bankBoxClick() {
				this.cardsPopBool = true
			},
			withdrawBtnClick() { //提现按钮点击事件
				this.payPass = ""
				this.sms_code = ""
				this.safePopBool = true
				this.set_withdraw_model_bool(true)
			},
			closeSafePopClick() {
				this.payPass = ""
				this.safePopBool = false
				this.set_withdraw_model_bool(false)
			},
			async confirmWithdrawClick() {
				let reqParam = {}

				if (!this.sms_code) {

					uni.showToast({
						title: this.$t('user.security.center.rule.code.not.empty.text'),
						icon: "none",
						duration: 2000
					});

					return false
				}


				if (this.typeValue === 0) {

					return false
				}

				reqParam.code = this.sms_code
				reqParam.usdtId = this.typeValue
				// console.log("this.currentIndex", this.currentIndex);
				reqParam.type = this.currentIndex
				// if (this.currentIndex === 0) {
				// 	reqParam.type = 2
				// } else if (this.currentIndex === 1) {
				// 	reqParam.type = 1
				// }

				if (!this.inputWithdrawAmount) {

					return false
				}
				reqParam.money = this.inputWithdrawAmount
				if (!this.payPass) {

					uni.showToast({
						icon: 'none',
						title: this.$t('backapi.payPwdError')
					});

					return false
				}
				reqParam.payPwd = this.payPass
				let resR = await withdrawalReq(reqParam, this.localLoginToken)
				this.sms_code = ""
				if (resR.code === 200) {
					this.set_withdraw_model_bool(false)
					this.safePopBool = false
					uni.showToast({
						title: resR.msg,
						icon: 'none',
						duration: 2000,
					});
				}
			},
			async confirmSetPayClick() {

				if (!this.inputWithdrawData) {

					uni.showToast({
						title: this.$t('home.pay.pwd.alert.text'),
						icon: 'none',
						duration: 2000
					});

					return false
				}

				let reqParam = {}
				reqParam.payPwd = this.inputWithdrawData
				reqParam.payPwdAgain = this.inputWithdrawData
				let resR = await setPwdPayReq(reqParam, this.localLoginToken)
				if (resR.code === 200) {
					this.isShowWithDrawModal = false
					uni.showToast({
						icon: 'none',
						title: this.$t('backapi.setPaySuccess')
					});
				}
			},
			withdrawInput() {

			},
			cardFilter(num) {
				if (num) {
					return '****' + num.substring(num.length - 4);
				}
			},
			usdtFilter(str) {
				// return str.substr(0, 5) + '***' + str.substr(38, str.split('').length);
				return str.substr(0, 5) + '...' + str.substr(-4);
			},
			addNewCardClick() {
				this.cardsPopBool = false
				this.bindCardUsdtClick()
			},
			async getSmsCodeClick() {

				if (this.isHavePhone) {
					if (!this.timer) {
						let reqParams = {}
						let resR = await phoneCodeOnlineReq(reqParams, this.localLoginToken)
						if (resR.code === 200) {
							uni.showToast({
								icon: 'none',
								title: this.$t('user.change.phone.send.success.text'),
							});
							if (!this.timer) {
								this.count = TIME_COUNT;
								this.timer = setInterval(() => {
									if (this.count > 0 && this.count <= TIME_COUNT) {
										this.defalutCodeTitle = this.count + this.$t(
											'user.change.phone.send.try.again.text')
										this.count--;
									} else {
										// this.show = true;
										this.defalutCodeTitle = this.$t('user.change.phone.get.code.text')
										clearInterval(this.timer);
										this.timer = null;
									}
								}, 1000)
							}
						}


					}

				} else {
					uni.navigateTo({
						url: '/pages/user/bind_phone',
						success: (res) => {
							this.save_bindphone_from('withdraw')
							// 通过eventChannel向被打开页面传送数据	
							res.eventChannel.emit('eventBindPhoneClick', {
								from: 'withdraw'
							})
						},
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				}



			},
			forgetfunpass() {
				uni.navigateTo({
					url: '/pages/user/forget_pwd2',
					success: (res) => {
						this.save_funpass_from('withdraw')
						// 通过eventChannel向被打开页面传送数据	
						res.eventChannel.emit('eventFunPassClick', {
							from: 'withdraw'
						})
					},
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			}
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

	// 导航栏结束
	.withdraw-swiper-page {
		.addCard_top_box {
			width: 100%;
			height: 42px;
			margin-top: 15px;
			background-color: rgba(255, 194, 74, .2);
			display: flex;
			flex-direction: row;
			padding: 0 20px;
			justify-content: space-between;
			align-items: center;

			.title {
				font-size: 16px;
				color: #ffbc00;
			}

			.icon {
				width: 42px;
				height: 42px;
			}
		}

		.scroll-box-item {
			padding: 0 21px;

			.scroll-view_H {
				white-space: nowrap;
				width: 100%;

				.scroll-view-item_H {
					display: inline-block;
					width: 43%;
					height: 90px;
					text-align: center;
					font-size: 18px;
					margin-top: 25px;
					background: url(../../static/images/type2.png) no-repeat;
					background-size: 110% 110%;
					background-position: -6px -3px;
					border-radius: 10px;
					border: solid 1px #999;
					margin-right: 23px;

					.scroll-content {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						height: 100%;

						.icon {
							width: 72px;
							height: 40px;
						}

						text {
							color: #ffbc00;
							padding-top: 5px;
							font-size: 13px;
						}
					}
				}

				.active {
					border: solid 1px #ffbc00;

					text {
						color: #f8f8f8;
					}
				}
			}
		}
	}


	.tab-view {
		padding: 0 21px;
		padding-top: 15px;
		display: flex;
		flex-direction: column;

		.title {
			color: #7f8aa7;
			font-size: 13px;
		}

		.bankBox {
			width: 100%;
			height: 40px;
			display: flex;
			flex-direction: row;
			background-color: #171e25;
			justify-content: space-between;
			align-items: center;
			padding: 0 10px;
			border-radius: 4px;
			margin-top: 10px;

			.t {
				color: #f8f8f8;

				.con {
					// padding-left: 10px;
					font-size: 14px;
				}
			}
		}


		.amount {
			padding-top: 10px;

			.amount-title {
				font-size: 13px;
				color: #7f8aa1;
			}

			.input-money {
				height: 40px;
				display: flex;
				align-items: center;
				background-color: #171e25;
				border-radius: 4px;
				margin-top: 10px;
				width: 100%;
				color: #f8f8f8;

				.t-input {
					width: 100%;
					padding: 0 10px;
				}

				.show-pass-view {
					width: 24px;
					height: 19px;
					margin-right: 10px;
					background: url(../../static/images/eye1.svg) no-repeat;
					background-size: 100% 100%;
				}
			}

			.pay-password-title {
				margin-top: 10px;
				font-size: 13px;
				color: #7f8aa1;
			}
		}
	}

	.info-money {
		margin-top: 10px;
		font-size: 12px;
		margin-bottom: 20px;
	}

	.info-money-num {
		color: #b4b6bf;
	}

	.info-money-all {
		color: #ffbc00;
		margin-left: 5px;
	}

	.changeColor {
		background: linear-gradient(90deg, #ffd37d, #ca962e);
		color: #111
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


	/deep/ .u-mode-center-box {
		background-color: #1f252f;

		.popup-box {
			width: 330px;
			font-size: 14px;

			.modal-top {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 0 15px;
				height: 44px;
				font-size: 16px;

				.title,
				.close {
					color: #f8f8f8;
				}
			}

			.money {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				width: 88%;
				margin: 5px auto 0;
				height: 40px;
				padding: 0 15px;
				background: linear-gradient(90deg, #e6c258, #f7ef98, #e6c258);
				border-top-left-radius: 10px;
				border-top-right-radius: 10px;
			}

			.input-form {
				display: flex;
				flex-direction: column;
				padding: 0 15px;
				margin-top: 15px;

				.label {
					color: #7f8aa1;
					padding-bottom: 10px;
				}

				.getVerifyCode {
					background: linear-gradient(90deg, #e6c258, #f7ef98);
					padding: 0 5px;
					line-height: 25px;
					border-radius: 30px;
					font-size: 12px;
					color: #303133
				}

				.input-view {
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					height: 40px;
					background-color: #171e25;
					align-items: center;
					color: #f8f8f8;
					padding: 0 10px;

					.txt {
						color: #e6c258;
						width: 30%;
						display: flex;
						align-items: center;
						justify-content: center;
					}

					.txmm-input {
						width: 70%;
					}
				}
			}

			.item {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				height: 40px;
				color: #f8f8f8;
				padding: 7px 18px;

				.label {
					color: #7f8aa1;
				}
			}

			.determine {
				width: 90%;
				height: 45px;
				background: linear-gradient(90deg, #f7ef98, #e6c258);
				margin: 5px auto 0;
				text-align: center;
				line-height: 45px;
				border-radius: 5px;
			}

			.count {
				color: #fb0;
				text-align: center;
				line-height: 70px;
				font-size: 14px;
			}
		}

	}

	/deep/ .uni-scroll-view-content {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
	}
</style>
