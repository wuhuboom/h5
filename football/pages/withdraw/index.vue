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
				{{$t('withdraw.type.text')}}:
			</view>
			<view class="rechargeContainerType">
				<view class="rechargeContainerTypeItem"
					:class="currentIndex==index ?'rechargeContainerTypeItemActive':'' "
					v-for="(item,index) in withdrawList" :key="item.id" @click="rechargeTypeItemClick(item,index)">
					<view class="rechargeContainerTypeItemImage">
						<image :src="item.image" mode=""></image>
					</view>
					<view class="rechargeContainerTypeItemText">
						{{item.text}}
					</view>
				</view>
			</view>

			<view class="rechargeContainerList">
				<view class="selectFlex">
					<view class="">
						{{$t('withdraw.receiving.card.number.text')}}
						<text @click="bindCardUsdtClick">({{$t('withdraw.receiving.bind.text')}})</text>
					</view>
					<view class="dropdownSelfClass _postion">
						<view class="dropDown_postion">
							{{cardNumSelect}}
						</view>
						<u-dropdown active-color="#fff" ref="uDropdown" @open="open" @close="close"
							:mask-close-able="true">
							<u-dropdown-item height="500" v-model="typeValue" :options="typeOptions"
								@change="dropChange">
							</u-dropdown-item>
						</u-dropdown>

					</view>
				</view>
				<view class="rechargeContainerListEnter">
					<view class="rechargeContainerListEnterHeader">
						<view class="">
							{{$t('withdraw.amount.num.text')}}
							<text>( {{$t('withdraw.amount.process.fee.text')}}{{withdrawalRate}}% )</text>
						</view>
					</view>
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<view class="rechargeContainerListInput">
						<input type="number" value="" maxlength=20 :placeholder="inputPlace"
							placeholder-style="font-size:14px;color:rgb(80,103,120)" v-model="inputWithdrawAmount"
							@input="rechargeAmountInputChange" @focus="rechargeAmountFocus"
							@blur="rechargeAmountBlur" />
						<view class="inputMoneyHeaderAll" @click="allMoneyClick">
							{{$t('withdraw.amount.all.text')}}
						</view>
					</view>
					<view class="rechargeContainerListEnterHeader" v-if="showUsdtBool">
						<view class="">
							≈ {{realUsdtMoney}} USDT
						</view>
					</view>
				</view>
				<input type="password" style='width:0;height:0;min-height:0' />
				<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
				<view class="payPassWordContainerList">
					{{$t('withdraw.pay.password.title.text')}}:
					<u-input type="password" class="forgetPassword_item_input" :placeholder="payPlace"
						:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="16"
						v-model="payPass" @input="rechargeAmountInputChange" />
				</view>



				<view class="payPassWordContainerList">
					{{$t('user.change.phone.code.text')}} <text @click="getSmsCodeClick"
						style="color: #3d8dfe;margin-left: 10px;">({{defalutCodeTitle}})</text>
					<u-input type="text" class="forgetPassword_item_input" :placeholder="smsCodePlace"
						:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="4"
						v-model="smsCode" @input="rechargeAmountInputChange" />
				</view>

				<view class="rechargeTipList">
					<view class="rechargeTipTitle">
						{{$t('recharge.tip.title.text')}}
					</view>
					<view class="rechargeTipListS">
						<view class="">
							1、{{$t('withdraw.desc.list1')}} {{everydayWithdrawFree}}
						</view>
						<view class="">
							2、{{$t('withdraw.desc.list2')}} {{everydayWithdrawTimes}}
						</view>
						<view class="">
							3、{{$t('withdraw.desc.list3')}} {{withdrawalRate}}%
						</view>
						<view class="">
							4、{{$t('withdraw.desc.list4')}} {{withdrawMax}},{{$t('withdraw.desc.list5')}}
							{{withdrawMin}}
						</view>
						<view class="">
							5、{{$t('withdraw.desc.list6')}} {{withdrawalToday}}
						</view>
						<view class="">
							6、{{$t('withdraw.desc.list7')}} {{withdrawalRateMin}},{{$t('withdraw.desc.list8')}}
							{{withdrawalRateMax}}
						</view>
						<view class="" v-if="currentIndex === 1">
							7、{{$t('withdraw.desc.list9')}} {{usdtWithdrawPer}}
						</view>
					</view>
				</view>
				<view class="onlineRechargeButton">
					<button :class="changeRechargeBtnStyle" type="default"
						@click="withdrawBtnClick">{{$t('withdraw.button.title.text')}}</button>
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


		<u-popup v-model="isShowWithDrawModal" mode="center" :mask-close-able="false"
			:mask-custom-style="maskCustomStyle" :custom-style="popCustomStyle">

			<view class="withdraw_popContainer">
				<view class="withdraw_popContainer_hearder">
					<view class="withdraw_popContainer_hearder_title">{{$t('home.pay.title.text')}}</view>
					<uni-icons type="closeempty" size="25" class="header-icon" color="#3d8dfe"
						@click="isShowWithDrawModal=false"></uni-icons>

				</view>
				<view class="withdraw_popContainer_content">
					<view class="viewTop">
						<u-input type="password" class="withdraw_item_input" :placeholder="withdrawPlace"
							:custom-style="customInputStyle" :placeholder-style="placeholderStyle" :password-icon="true"
							maxlength="16" v-model="inputWithdrawData" @input="withdrawInput" />
					</view>
				</view>
				<view class="withdraw_popContainer_footer">
					<view class="">
						<u-button type="primary" :ripple="true" :class="withdrawPopFooterClass"
							hover-class="withdrawPopFooterButtonHover" @click="confirmSetPayClick">
							{{$t('home.pay.pwd.btn.text')}}
						</u-button>
					</view>
				</view>
			</view>



		</u-popup>


	</view>
</template>

<script>
	import {
		bankCardInfo,
		usdtListReq,
		withdrawalReq,
		withdrawalPreReq,
		playerInfoReq,
		getPwdPayReq,
		setPwdPayReq,
		servReq,
		phoneCodeOnlineReq
	} from '@/api/index.js'
	import {
		myMixin,
		withdrawMinxi,
		addBankMinxi,
		addUsdtMinxi,
		changePhoneMixin
	} from '@/util/mixins.js'
	const TIME_COUNT = 59;
	export default {
		mixins: [myMixin, withdrawMinxi, addBankMinxi, addUsdtMinxi, changePhoneMixin],
		data() {
			return {
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
				payPlace: this.$t('withdraw.enter.pay.password.title.text'),
				smsCode: '',
				smsCodePlace: this.$t('user.change.phone.code.place.text'),
				customInputStyle: {
					"min-height": "0px",
					"background-color": "rgb(51, 71, 86)",
					"border-radius": "5px",
					"color": "#fff",
					"padding": "10px"
				},
				placeholderStyle: "color:#506778;font-size:12px",
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
				defaultServerAdd: '',
				selfPhone: '',
				timer: null,
				defalutCodeTitle: this.$t('user.change.phone.get.code.text'),
			}
		},
		onLoad() {
			this.getCardListData(1) //1为加载数据且自动判定是否跳转
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
			clearInterval(this.timer)
		},
		mounted() {

		},
		computed: {
			changeRechargeBtnStyle() {
				// console.log("this.inputWithdrawAmount",this.inputWithdrawAmount);
				// console.log("this.payPass",this.payPass);
				if (this.inputWithdrawAmount && this.payPass && this.smsCode) {
					return 'changeRechargeBtnClassActive'
				} else {
					return 'changeRechargeBtnClass'
				}
			},
			realUsdtMoney() {
				// console.log("进来");
				if (this.currentIndex === 1) {
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
				// 动态设置图片
				let date = "?t=" + new Date().getTime();
				this.withdrawList = [{
					image: '../../static/images/bankCharge.png' + date,
					text: 'Bank card',
					status: 1,
				}, {
					image: '../../static/images/virtual.png' + date,
					text: 'USDT',
					status: 0,
				}]

				//获取是否设置过提现密码
				this.getPwdPay()
				//获取收款卡号列表
				this.getCardListData(2)
				// 提现前准备数据
				this.getWithdrawPreData()
				// 获取当前账户余额
				this.getAllMoney()

				this.getServerAddData()
			},
			async getServerAddData() {
				let resR = await servReq(this.localLoginToken)
				// console.log("resR", resR);
				this.defaultServerAdd = resR.data.serviceAddr
			},
			goBackBtnClick() {
				// this.remove_withdraw_from()
				const queryWithdrawUrlFrom = uni.getStorageSync('queryWithdrawUrlFrom') || 'other'
				// console.log("queryWithdrawUrlFrom", queryWithdrawUrlFrom);
				// console.log("withdrawState_Bool", this.withdrawState_Bool);
				if (!this.withdrawState_Bool) {
					this.urlFromStr = queryWithdrawUrlFrom
				}
				// console.log("this.urlFromStr", this.urlFromStr);
				if (this.urlFromStr === "home") {
					uni.switchTab({
						url: '/pages/home/index',
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
			dropChange(value) {
				// console.log("value",value);
				this.typeValue = value
				this.typeOptions.forEach(item => {
					if (item.value === value) {
						this.cardNumSelect = item.label
					}
				})
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
			async getCardListData(typeNum) {
				// this.loadingWrapBool = true
				let resR = await bankCardInfo(this.localLoginToken)
				// setTimeout(() => {
				// 	this.loadingWrapBool = false
				// }, 1000)
				// console.log("resR",resR);
				if (resR.code === 200) {
					let resultData = resR.data
					// console.log("resultData",resultData);
					if (!resultData && this.firstIntoNum !== 0) {
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
								animationType: 'pop-in',
								animationDuration: 200
							})
						}


						return false
					} else if (!resultData && this.firstIntoNum === 0) {

					} else {
						let newResultData = [{
							label: resultData.cardName,
							value: resultData.id,
							...resultData
						}]
						// console.log("resultData",resultData);
						this.typeOptions = newResultData
						this.typeValue = resultData.id
						this.cardNumSelect = resultData.cardNumber
					}


				}
			},
			async getUsdtListData() {
				// this.loadingWrapBool = true
				let resR = await usdtListReq(this.localLoginToken)
				// setTimeout(() => {
				// 	this.loadingWrapBool = false
				// }, 1000)
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
							animationType: 'pop-in',
							animationDuration: 200
						})

						return false
					} else if (resultData.length === 0 && this.firstIntoNum === 0) {

					} else {
						let newResultData = []
						resultData.forEach((item, index) => {
							newResultData.push({
								label: item.addr,
								value: item.id
							})
						})
						this.typeOptions = newResultData
						this.typeValue = resultData[0].id
						this.cardNumSelect = resultData[0].addr
					}


				}
			},
			async getWithdrawPreData() {
				let resR = await withdrawalPreReq(this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {

					if (this.currentIndex === 0) {
						this.withdrawalRateMin = resR.data.withdrawalRateMin
						this.withdrawalRateMax = resR.data.withdrawalRateMax
						this.withdrawalRate = resR.data.withdrawalRate
						this.withdrawMin = resR.data.withdrawMin
						this.withdrawMax = resR.data.withdrawMax
					} else if (this.currentIndex === 1) {
						this.usdtWithdrawPer = resR.data.usdtWithdrawPer
						this.withdrawalRateMin = resR.data.usdtWithdrawalRateMin
						this.withdrawalRateMax = resR.data.usdtWithdrawalRateMax
						this.withdrawalRate = resR.data.usdtWithdrawalRate
						this.withdrawMin = resR.data.usdtWithdrawMin
						this.withdrawMax = resR.data.usdtWithdrawMax
					}

					this.everydayWithdrawFree = resR.data.everydayWithdrawFree
					this.withdrawalToday = resR.data.withdrawalToday
					this.everydayWithdrawTimes = resR.data.everydayWithdrawTimes

				}
			},
			async getAllMoney() {
				let resR = await playerInfoReq(this.localLoginToken)
				if (resR.code === 200) {
					let currMoney = resR.data.balance / 100
					let currMoneyStr = currMoney.toString().split('.')[0]
					this.allMoneyNum = currMoney
					if (resR.data.phone) {
						this.selfPhone = resR.data.phone
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
				if (this.currentIndex === 1) {
					uni.navigateTo({
						url: '/pages/user/usdt_add',
						success: (res) => {
							// 通过eventChannel向被打开页面传送数据	
							this.save_addUsdt_from('withdraw')
							res.eventChannel.emit('eventAddUsdtPageClick', {
								from: 'withdraw'
							})
						},
						animationType: 'pop-in',
						animationDuration: 200
					})
				} else {
					uni.navigateTo({
						url: '/pages/user/bankcard_add',
						success: (res) => {
							// 通过eventChannel向被打开页面传送数据	
							this.save_addBank_from('withdraw')
							res.eventChannel.emit('eventAddBankPageClick', {
								from: 'withdraw'
							})
						},
						animationType: 'pop-in',
						animationDuration: 200
					})
				}
			},
			open(index) {
				// 展开某个下来菜单时，先关闭原来的其他菜单的高亮
				// 同时内部会自动给当前展开项进行高亮
				this.$refs.uDropdown.highlight();
			},
			close(index) {
				// 关闭的时候，给当前项加上高亮
				this.$refs.uDropdown.highlight(index);
			},
			async rechargeTypeItemClick(item, index) {
				// console.log("111",index);
				this.firstIntoNum = 1


				this.inputWithdrawAmount = ""
				this.currentIndex = index;
				this.rechargeContainerTypeClass = "rechargeContainerTypeItem rechargeContainerTypeItemActive"
				this.inputPlace = this.$t('withdraw.enter.amount.num.text')

				// 根据选择不同的提现方式,进行不通的方法获取对应的数据
				if (index === 0) {
					this.getCardListData(1) //2为只加载数据
					this.showUsdtBool = false
				} else {
					this.getUsdtListData()

				}

				this.getWithdrawPreData()


			},
			rechargeAmountInputChange() {
				this.showClearInputIconBool = true

				if (this.currentIndex === 1 && this.inputWithdrawAmount) {
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
				window.location.href = this.defaultServerAdd;
			},
			async withdrawBtnClick() { //提现按钮点击事件

				let reqParam = {}
				if (this.typeValue === 0) {

					return false
				}
				reqParam.usdtId = this.typeValue
				reqParam.type = this.currentIndex + 1
				if (!this.inputWithdrawAmount) {

					return false
				}
				reqParam.money = this.inputWithdrawAmount
				if (!this.payPass) {

					return false
				}
				reqParam.code = this.smsCode
				reqParam.payPwd = this.payPass
				let resR = await withdrawalReq(reqParam, this.localLoginToken)
				if (resR.code === 200) {
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
			async getSmsCodeClick() {
				if (!this.timer) {
					let resR = await phoneCodeOnlineReq('', this.localLoginToken)
					// console.log("resR", resR);
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


					} else if (resR.code === 103) {
						let currData = resR.data[0]
						let currMsgKey = currData.msgKey
						// console.log("currMsgKey", currMsgKey);
						uni.showToast({
							icon: 'none',
							title: this.$t(`backapi.${currMsgKey}`),
							success: () => {
								this.save_updatephone_from('withdraw')
								uni.navigateTo({
									url: '/pages/user/change_phone',
									success: (res) => {
										this.remove_withdraw_from()
										// 通过eventChannel向被打开页面传送数据	
										res.eventChannel.emit('changePhoneEventClick', {
											from: 'withdraw'
										})
									},
									animationType: 'pop-in',
									animationDuration: 200
								})
							}
						});
					}






				}



			}
		}
	}
</script>

<style scoped>
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
		color: #FFF;
		font-size: 14px;
	}

	.payPassWordContainerList {}

	.forgetPassword_item_input {
		/* height: 42px; */
		line-height: 42px;
		background: #334756;
		border-radius: 5px;
		/* margin-bottom: 34px; */
		margin: 15px 0;
		color: #fff;
	}



	.rechargeContainerListEnter {
		color: #f0f0f0;
		margin-bottom: 16px;
	}

	.rechargeContainerListInput {
		width: 100%;
		background: #334756;
		border-radius: 5px;
		margin: 15px 0;
		height: 43px;
		padding: 0px;
		border-color: rgb(220, 223, 230);
		text-align: left;
		display: flex;

		position: relative;
	}

	.rechargeContainerListInput input {
		/* min-height: 43px; */
		padding: 10px;
		color: #fff;
		flex: 1;

	}

	/deep/.uni-input-wrapper {
		width: calc(100% - 66px);
	}

	.inputMoneyHeaderAll {
		position: absolute;
		right: 0;
		top: 0;
		width: 66px;
		height: 100%;
		color: #fff;
		font-size: 16px;
		background: #3d8dfe;
		border-radius: 0 5px 5px 0;
		display: flex;
		align-items: center;
		justify-content: center;
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

	.selectFlex {
		font-size: 14px;
	}

	.selectFlex text {
		margin: 0 10px;
		color: #3d8dfe;
		font-weight: 500;
	}


	.dropdownSelfClass {
		width: 100%;
		height: 43px;
		background: #334756;
		border-radius: 5px;
		margin: 10px 0 15px 0;
		display: flex;
		align-items: center;
		justify-content: space-between;

	}

	._postion {
		position: relative;
	}

	.dropDown_postion {
		position: absolute;
		margin-left: 10px;
		color: #fff;
		font-size: 13px;
	}

	.radio-style {
		display: flex;
		align-items: center;
	}


	.radio-style {
		display: flex;
		align-items: center;
	}

	/deep/ .u-dropdown__menu__item {
		justify-content: flex-end;
		margin-right: 15px;
	}

	/deep/ .u-cell-item-box {
		background-color: #132736;
		border-radius: 0 0 5px 5px;
		box-shadow: inset 0 15px 10px -15px rgb(0 0 0 / 36%);
	}

	/deep/ .u-cell__value .u-icon--right {
		border: 3px solid #f0f3f6;
		border-radius: 50%;
		opacity: 1;
		background: #132736;

	}

	/deep/ .u-radio__icon-wrap--checked {
		border-color: #fff !important;
	}

	/deep/ .u-dropdown__content__mask {
		background: transparent;
	}

	/deep/ .uicon-checkbox-mark:before {
		visibility: hidden;
	}

	/deep/ .uicon-checkbox-mark span {
		display: block;
		width: 70%;
		background: #3d8dfe;
		height: 70%;
		position: absolute;
		border-radius: 50%;
		left: 16%;
		top: 14%;
	}

	/deep/ .u-flex {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	/deep/ .u-input__right-icon__item {
		margin: 0 10px;
	}



	.withdraw_popContainer {
		width: 350px;
		background: #132736;
		border-radius: 10px;
	}


	.withdraw_popContainer_hearder {
		height: 50px;
		line-height: 50px;
		width: 340px;
		text-align: center;
	}

	.withdraw_popContainer_hearder_title {
		height: 100%;
		color: #fff;
		font-size: 16px;
	}

	.header-icon {
		position: absolute;
		right: 10px;
		top: 0
	}

	.withdraw_popContainer_content {
		padding: 15px;
		margin: 15px 0 0;
		font-size: 16px;
		color: #fff;
		text-align: center;

	}



	.viewTop {
		display: flex;
		flex-direction: column;
		/* padding: 0 10px 0;
	position: relative; */
	}

	.withdraw_item_input {
		width: 100%;
		height: 44px;
		background: #334756;
		border-radius: 5px;
	}

	/deep/ .u-mode-center-box {
		background: transparent;
	}

	.withdraw_popContainer_footer {
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.withdrawPopFooterButton {
		height: 50px;
		width: 200px;
		background-color: #3d8dfe;
		border-radius: 10px;
	}

	.withdrawPopFooterButtonHover {
		background: #334756;
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
