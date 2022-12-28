<template>
	<view class="matchOrderPage">
		<uni-nav-bar left-icon="left" backgroundColor="#00111C" color="#fff" :title="navTitle" :statusBar="true"
			:border="false" @clickLeft="goBackBtnClick"
			style="font-weight: 600;position: fixed;left: 0;top: 0;z-index: 1000;width: 100%;">
			<template #right>
				<view class="navBarLeft" @click="refreshWebClick">
					<image src="../../static/images/cfresh.svg" mode="" class="freshImage"></image>
				</view>
			</template>
		</uni-nav-bar>

		<view class="addition">
			{{additionStr}}
		</view>

		<view class="matchArea">
			<view class="time-bg-view">

			</view>
			<view class="detail-date">
				<view class="detail-date-time">
					<view class="detailTimeView">
						{{$t('match.order.detail.score.text')}} {{scoreStr}}
					</view>
				</view>
				<view class="detailDateView">
					{{detailDateStr | timestampStr}}
				</view>
			</view>
			<view class="detail-title">
				{{detailTitleStr}}
			</view>
			<view class="matchTwo">
				<view class="matchListLeft">
					<!-- <image src="../../static/images/default.png" mode=""></image> -->
					<image :src="matchTeamLeftLogo ? matchTeamLeftLogo:'../../static/images/default.png'" mode="">
					</image>
					{{matchTeamLeft}}
				</view>
				<view class="matchVS">

				</view>
				<view class="matchListRight">
					<!-- <image src="../../static/images/default.png" mode=""></image> -->
					<image :src="matchTeamRightLogo ? matchTeamRightLogo:'../../static/images/default.png'" mode="">
					</image>

					{{matchTeamRight}}
				</view>
			</view>
		</view>
		<view class="balanceArea">
			<view class="balanceAreaTop">
				<image src="../../static/images/wallet.svg" mode=""></image>
				<view class="balanceAreaTopTitle">
					{{$t('match.order.detail.account.balance.text')}}
				</view>
			</view>
			<view class="balanceAreaContent">
				<view class="balanceAreaContentMoney">
					{{balanceMoney | moneyFormat}}
				</view>
			</view>
		</view>
		<view class="transArea">
			<view class="transAreaTop">
				<view class="transAreaTopItem">
					<view class="transAreaTopItemTitle">
						{{$t('match.order.detail.trans.amount.text')}}
					</view>
				</view>

				<view class="transAreaTopItem">
					<view class="transAreaTopItemTitle">
						{{$t('match.order.detail.estimate.profit.text')}}
					</view>
				</view>
			</view>
			<view class="transAreaBottom">

				<view class="transAreaBottomInputBtns">
					<view class="transAreaBottomInput_trans">
						<!-- onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" -->
						<input type="number" value="" class="transAreaBottomInput_trans_amount"
							:placeholder="placeholderAmount" v-model="inputBetMoney" @input="inputBetMoney_input" />
						<view class="transAreaBottomInput_trans_desc">
							<view class="payRateTitle">
								{{$t('match.order.detail.pay.rate.text')}}
							</view>
							<view class="payRate">
								<!-- x7.48(%) -->
								x{{payRateNum}}(%)
								<!-- x{{payRateNum}} -->
							</view>
						</view>
						<view class="transAreaBottomInput_trans_desc">
							<view class="payRateTitle">
								{{$t('match.order.detail.vip.earnings.text')}}
							</view>
							<view class="payRate">
								x{{vipRateNum}}(%)
							</view>
						</view>
					</view>
					<view class="transAreaBottomInput_yugu">
						<view class="transAreaBottomInput_yugu_result">
							{{yuguMoney}}
						</view>
						<view class="transAreaBottomInput_yugu_desc">
							<view class="proceFeeTitle">
								{{$t('match.order.detail.proce.fee.text')}}
							</view>
							<view class="fee_amount">
								<!-- -0% -->
								-{{feeAmountNum}}%
							</view>
						</view>
					</view>

				</view>

				<view class="transAreaBottomMoney">
					<view class="transAreaBottomMoneyBtns">
						<view class="transAreaBottomMoneyBtnsItem" v-for="(item,index) in fastMoneyArray" :key="index"
							@click="singleMoneyClick(item)">
							{{item}}
						</view>
						<!-- 	<view class="transAreaBottomMoneyBtnsItem">
							1000
						</view>
						<view class="transAreaBottomMoneyBtnsItem">
							5000
						</view> -->
						<view class="transAreaBottomMoneyBtnsItem" @click="allMoneyClick">
							{{$t('match.order.detail.money.all.text')}}
						</view>
						<view class="transAreaBottomMoneyBtnsItem" style="width: auto;padding: 0 10px;"
							@click="customMoneyClick">
							{{$t('match.order.detail.money.custom.text')}}
						</view>
						<view class="transAreaBottomMoneyBtnsItem tranRecharge" @click="tranRechargeBtnClick">
							{{$t('match.order.detail.money.recharge.text')}}
						</view>
					</view>
				</view>
			</view>




		</view>
		<view class="detailOrderCancelConfirm">
			<view class="detailOrderCancelBtn" @click="cancelBtnClick">
				{{$t('match.order.detail.button.cacel.text')}}
			</view>

			<view class="detailOrderConfirmBtn" @click="$u.throttle(confirmBtnClick, 500)">
				{{$t('match.order.detail.button.confirm.text')}}
			</view>
		</view>


		<u-popup class="dialog" v-model="showNeedBindPhone" mode="top" border-radius="54"
			:mask-custom-style="maskCustomStyle" :mask-close-able="false" :custom-style="popCustomStyle">
			<view class="forgetPassword_concontainer" style=" touch-action: none;">
				<!-- 			<view class="forgetPassword_item">
					<view class="forgetPassword_item_title">
						{{$t('user.change.phone.old.phone.text')}}
					</view>
					<u-input type="text" disabled class="forgetPassword_item_input" :placeholder="loginPlace"
						:custom-style="customInputStyle" maxlength="16" v-model="oldPhoneStr" />
				</view> -->
				<view class="forgetPassword_item">
					<view class="forgetPassword_item_title">
						{{$t('user.change.phone.new.phone.text')}}
					</view>
					<view class="phoneViewArea">
						<view class="areaView" @click="areaSelectClick">
							<text style="color: #3d8dfe;margin-right:5px;">+{{selectAreaNum}}</text>
							<u-icon name="arrow-down-fill" color="#3d8dfe" size="22"></u-icon>
						</view>
						<u-input type="number" class="forgetPassword_item_input phoneView" :clearable="false"
							:placeholder="newPhonePlace" :custom-style="customPhoneInputStyle"
							:placeholder-style="placeholderStyle" maxlength="16" v-model="newPhone" />
					</view>

				</view>
				<view class="forgetPassword_item codeview">
					<view class="forgetPassword_item_title">
						{{$t('user.change.phone.code.text')}}
					</view>
					<u-input type="text" :clearable="false" class="forgetPassword_item_input"
						:placeholder="phoneCodePlace" :custom-style="customInputStyle"
						:placeholder-style="placeholderStyle" maxlength="4" v-model="codeSmsStr" />
					<view class="get_code_sms" @click="getSmsCodeClick">
						{{defalutCodeTitle}}
					</view>
				</view>
				<view class="loginBtn active" @click="updateBtnClick()">
					{{$t('user.forget.pwd.update.button.text')}}
				</view>
			</view>

		</u-popup>


		<u-picker v-model="showAreaBool" :default-selector="[0]" mode="selector" :range="areaList"
			:cancel-text="this.$t('match.order.detail.button.cacel.text')"
			:confirm-text="this.$t('match.order.detail.button.confirm.text')" @confirm="confirmSelectArea"></u-picker>

		<u-toast ref="uToast" />
		<show-toast></show-toast>
		<show-modal ref="testRef"></show-modal>
	</view>
</template>

<script>
	// 这里过滤的是除了数字的其他字符
	function filterInput(val) {
		return val.replace(/[^A-z0-9]/g, "");
	}
	import {
		preReq,
		betReq,
		phoneBindReq,
		phoneCodeReq,
		sysConfigReq
	} from '../../api/index.js'
	import {
		myMixin,
		matchOrderMinxi,
		rechargeMinxi
	} from '@/util/mixins.js'
	const TIME_COUNT = 59;
	// import {
	// 	getTimeState,
	// 	formatDateToStr,
	// 	formatDateTimeSolt
	// } from '../../common/publicTool.js'
	// import {mapState,mapMutations} from 'vuex'
	// import showToast from '@/components/show-toast/show-toast.vue';
	export default {
		// components:{
		// 	showToast,
		// },
		// filters:{
		// 	timestampStr(value){
		// 		// console.log("val",formatDateToStr(value));
		// 		return formatDateTimeSolt(value,1)
		// 	}
		// },
		data() {
			return {
				navTitle: 'Order detail',
				additionStr: "",
				detailDateStr: '',
				detailTitleStr: '',
				matchTeamLeft: '',
				matchTeamLeftLogo: '',
				matchTeamRight: '',
				matchTeamRightLogo: '',
				scoreStr: "",
				balanceMoney: 0,
				balanceIntMoney: 0,
				placeholderAmount: "",
				localLoginToken: "",
				payRateNum: 0,
				vipRateNum: 0,
				feeAmountNum: 0,
				fastMoneyArray: null,
				urlFromStr: '',
				inputBetMoney: '',
				// computedMoney: '',
				reqGameID: null,
				reqOddID: null,
				curGameTypeNum: null,
				showNeedBindPhone: false,
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
				customPhoneInputStyle: {
					"min-height": "35px",
					"height": "44px",
					"background-color": "rgb(51, 71, 86)",
					"border-radius": "5px",
					"color": "#fff",
					"padding-left": "75px"
				},
				placeholderStyle: "color:#506778;font-size:12px",
				codeSmsStr: '',
				timer: null,
				newPhonePlace: this.$t('user.change.phone.new.phone.place.text'),
				phoneCodePlace: this.$t('user.change.phone.get.code.text'),
				defalutCodeTitle: this.$t('user.change.phone.get.code.text'),
				newPhone: '',
				areaList: [],
				currentSelectIndex: '',
				selectAreaNum: '',
				showAreaBool: false,
			}
		},
		mixins: [myMixin, matchOrderMinxi, rechargeMinxi],
		watch: {
			// // //deep:true
			// inputBetMoney: {
			// 	// this.inputBetMoney = filterInput(val);
			// 	handler(newVal, oldVal) {
			// 		let newValArr = newVal.toString().split('.')
			// 		console.log("AA-newValArr", newValArr);
			// 		console.log("BB-newVal", newVal);
			// 		let newTempVal = ""
			// 		if (newValArr[1]) {
			// 			console.log("进来newValArr[0]", newValArr[0]);
			// 			newTempVal = newValArr[0]
			// 		} else {
			// 			console.log("不进来newVal", newVal);
			// 			newTempVal = newVal
			// 		}
			// 		return newTempVal

			// 	},
			// 	// deep: true
			// }
		},
		computed: {
			// ...mapState(['hasLogin','selectBetNul','matchOrder_Bool']),
			// inputBetMoney: {
			// 	// get() {
			// 	// 	return this.computedMoney
			// 	// },
			// 	// set(val) {
			// 	// 	console.log("val", val);

			// 	// 	let realMoneyStr = ""
			// 	// 	let tempNewMoney = val
			// 	// 	let tempSplitMoneyStr = val
			// 	// 	// if (tempNewMoney * 1 >= (this.balanceMoney * 1) / 100) {
			// 	// 	// 	let tempMoneyStr = ((this.balanceMoney * 1) / 100).toString()
			// 	// 	// 	let allMoneyStr = tempMoneyStr.split('.')[0]
			// 	// 	// 	this.inputBetMoney = allMoneyStr
			// 	// 	// } else {
			// 	// 	// 	this.inputBetMoney = this.inputBetMoney.replace(/[^\d]/g, "")
			// 	// 	// }

			// 	// 	if (tempNewMoney.indexOf('.') === -1) {
			// 	// 		realMoneyStr = tempNewMoney
			// 	// 		console.log("BBB", tempNewMoney, typeof tempNewMoney);
			// 	// 	} else {
			// 	// 		// let tempMoneyStr = ((tempNewMoney * 1) / 100).toString()
			// 	// 		let tempMoneyStr = tempSplitMoneyStr.split('.')[0]
			// 	// 		console.log("AAA", tempMoneyStr, typeof tempMoneyStr);

			// 	// 		realMoneyStr = tempMoneyStr
			// 	// 	}

			// 	// 	this.computedMoney = realMoneyStr


			// 	// }
			// },
			yuguMoney() {
				if (this.inputBetMoney) {
					// return this.inputBetMoney * (this.payRateNum/100) - this.feeAmountNum
					return (this.inputBetMoney * (((this.payRateNum) / 100) + ((this.vipRateNum) / 100)) - (this
						.feeAmountNum /
						100)).toFixed(3)
				} else {
					return "0.00"
				}

			}

		},
		onLoad() {

			// if(!this.hasLogin){
			// 	uni.reLaunch({
			// 	   url: '../login/login',
			// 	   animationType: 'pop-in',
			// 	   animationDuration: 200
			// 	})
			// }

			// // this.localLoginToken = uni.getStorageSync('footballToken');
			// this.localLoginToken = this.$store.state.userInfo.token

			//初始化语言
			this.initLang()

			//获取区号列表
			this.getAreaData()

			// console.log("order_selectBetNul",this.selectBetNul);

			if (!this.matchOrder_Bool) {
				const queryMatchOrderItem = uni.getStorageSync('queryMatchOrderItem')
				if (queryMatchOrderItem) {
					// 使用网络请求
					// this.requestInitData(queryMatchOrderItem.game.id,queryMatchOrderItem.lossPerCent.id)
					// 直接本地获取

					this.vipRateNum = queryMatchOrderItem.bonus

					// 球队信息
					this.reqGameID = queryMatchOrderItem.game.id
					this.reqOddID = queryMatchOrderItem.lossPerCent.id
					this.scoreStr = queryMatchOrderItem.lossPerCent.scoreHome + "-" + queryMatchOrderItem.lossPerCent
						.scoreAway
					this.detailTitleStr = queryMatchOrderItem.game.allianceName
					this.detailDateStr = queryMatchOrderItem.game.startTime
					this.matchTeamLeft = queryMatchOrderItem.game.mainName
					this.matchTeamRight = queryMatchOrderItem.game.guestName
					this.matchTeamLeftLogo = queryMatchOrderItem.game.mainLogo
					this.matchTeamRightLogo = queryMatchOrderItem.game.guestLogo

					// 金额相关
					this.balanceMoney = queryMatchOrderItem.balance
					let tempMoneyStr = (queryMatchOrderItem.balance / 100).toString()
					let allMoneyStr = tempMoneyStr.split('.')[0]
					this.balanceIntMoney = allMoneyStr



					const gameTypeNum = uni.getStorageSync('gameTypeNum')
					if (gameTypeNum) {
						if (gameTypeNum === 2) {
							this.payRateNum = queryMatchOrderItem.lossPerCent.antiPerCent
						} else if (gameTypeNum === 1) {
							// this.payRateNum =  queryMatchOrderItem.lossPerCent.lossPerCent
							this.payRateNum = queryMatchOrderItem.lossPerCent.antiPerCent
						}
					}

					this.feeAmountNum = queryMatchOrderItem.betHandMoneyRate

					// 快捷充值fastMoney
					let fastMoenyArr = queryMatchOrderItem.fastMoney.split('-')
					this.fastMoneyArray = fastMoenyArr
				}


			}

			// 初次获取页面数据
			this.initPageData()

			if (this.selectBetNul) { //正常点击进来的
				// console.log("正常点击进来的");
			} else { //刷新页面进来的
				// console.log("刷新页面进来的");
				const selectBetNum = uni.getStorageSync('selectBetNum')
				if (selectBetNum) {
					this.change_bet_num(selectBetNum)
				}

			}

		},
		onShow() {

			// this.balanceMoney = 0
			this.balanceIntMoney = 0
		},
		onHide() {
			clearInterval(this.timer)
		},
		methods: {
			// ...mapMutations(['save_match_order','remove_match_order','logout','change_bet_num','remove_bet_num','change_match_bool']),
			refreshWebClick() {
				window.location.reload()
			},
			initLang() { //初始化语言

				let langStr = uni.getStorageSync('foot_lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr

				this.navTitle = this.$t('match.order.detail.title.text')
				this.additionStr = this.$t('match.order.detail.bet.desc.text')
				this.placeholderAmount = this.$t('match.order.detail.please.enter.text')

				this.newPhonePlace = this.$t('user.change.phone.new.phone.place.text')
				this.phoneCodePlace = this.$t('user.change.phone.code.place.text')
				this.defalutCodeTitle = this.$t('user.change.phone.get.code.text')

			},
			initPageData() {

				// #ifndef APP-NVUE
				const eventChannel = this.getOpenerEventChannel();
				// #endif
				// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
				eventChannel.on('match_content_Click', (data) => {

					// 暂时用不上
					// this.urlFromStr = data.from
					this.curGameTypeNum = data.gameType
					this.save_gametype_num(data.gameType)
					// console.log("this.curGameTypeNum",this.curGameTypeNum);
					this.requestInitData(data.content.gameId, data.content.id)
				})
			},
			async requestInitData(gameId, oddsId) {
				this.reqGameID = gameId
				this.reqOddID = oddsId
				let resR = await preReq({
					gameId,
					oddsId
				}, this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {
					this.save_match_order(resR.data)
					// 球队信息
					this.scoreStr = resR.data.lossPerCent.scoreHome + "-" + resR.data.lossPerCent.scoreAway
					this.detailTitleStr = resR.data.game.allianceName
					this.detailDateStr = resR.data.game.startTime
					this.matchTeamLeft = resR.data.game.mainName
					this.matchTeamRight = resR.data.game.guestName
					this.matchTeamLeftLogo = resR.data.game.mainLogo
					this.matchTeamRightLogo = resR.data.game.guestLogo

					// vip收益
					this.vipRateNum = resR.data.bonus

					// 金额相关
					this.balanceMoney = resR.data.balance
					let tempMoneyStr = (resR.data.balance / 100).toString()
					let allMoneyStr = tempMoneyStr.split('.')[0]
					this.balanceIntMoney = allMoneyStr

					if (this.curGameTypeNum === 2) {
						this.payRateNum = resR.data.lossPerCent.antiPerCent
					} else if (this.curGameTypeNum === 1) {
						// this.payRateNum =  resR.data.lossPerCent.lossPerCent
						this.payRateNum = resR.data.lossPerCent.antiPerCent
					}

					this.feeAmountNum = resR.data.betHandMoneyRate

					// 快捷充值fastMoney
					let fastMoenyArr = resR.data.fastMoney.split('-')
					this.fastMoneyArray = fastMoenyArr

				} else if (resR.code === 402 || resR.code === 403) {
					this.logout()
					this.$refs.uToast.show({
						title: resR.msg,
						url: '/pages/login/login',
					})
				}
			},
			goBackBtnClick() {
				// uni.navigateBack({
				// 	delta: 1
				// });
				this.remove_bet_num()
				this.remove_match_order()
				this.remove_gametype_num()
				this.change_match_bool()
				uni.navigateTo({
					url: '/pages/match/match_content',
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			tranRechargeBtnClick() {
				uni.navigateTo({
					url: '/pages/recharge/index',
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据
						this.save_recharge_from('matchOrder')
						res.eventChannel.emit('rechargeEventClick', {
							from: 'matchOrder'
						})
					},
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			singleMoneyClick(item) {
				// console.log("item",item);
				if (this.inputBetMoney) {
					let oldMoney = this.inputBetMoney
					this.inputBetMoney = oldMoney * 1 + item * 1
				} else {
					this.inputBetMoney = item
				}
			},
			inputBetMoney_input() {
				// let postMoneyStr = ""
				// console.log("下注金额", this.inputBetMoney);
				// console.log("全部余额", this.balanceMoney);
				// let currBalanceMoney = (this.balanceMoney * 1) / 100
				// currBalanceMoney = currBalanceMoney.toString()
				// let currInputMoney = this.inputBetMoney
				// console.log("处理单位后全部余额", currBalanceMoney);
				// console.log("当前输入金额", currInputMoney);

				// if (currInputMoney.indexOf('.') === -1) { //不存在小数点
				// 	console.log("不存在小数点的下注金额", currInputMoney);
				// 	postMoneyStr = currInputMoney
				// } else { //存在小数点

				// 	let currInputMoneyArr = currInputMoney.split('.')
				// 	console.log("小数点的数组", currInputMoneyArr);
				// 	console.log("小数点的数组长度", currInputMoneyArr.length);
				// 	let currInputMoneyArrLeft = currInputMoneyArr[0]
				// 	console.log("取小数点左边数据集", currInputMoneyArrLeft);

				// 	this.inputBetMoney = currInputMoneyArrLeft
				// 	console.log("当前输入框内容", this.inputBetMoney);

				// 	postMoneyStr = currInputMoneyArrLeft
				// 	// this.inputBetMoney = currInputMoney.replace(/[^\d]/g, ""); // 清除"数字"以外的字符 
				// }


				// this.inputBetMoney = postMoneyStr

				// console.log("this.inputBetMoney", this.inputBetMoney);

				// let realMoneyStr = ""
				// let tempNewMoney = this.inputBetMoney
				// let tempSplitMoneyStr = this.inputBetMoney
				// // if (tempNewMoney * 1 >= (this.balanceMoney * 1) / 100) {
				// // 	let tempMoneyStr = ((this.balanceMoney * 1) / 100).toString()
				// // 	let allMoneyStr = tempMoneyStr.split('.')[0]
				// // 	this.inputBetMoney = allMoneyStr
				// // } else {
				// // 	this.inputBetMoney = this.inputBetMoney.replace(/[^\d]/g, "")
				// // }

				// if (tempNewMoney * 1) {
				// 	if (tempNewMoney * 1 >= (this.balanceMoney * 1) / 100 && tempNewMoney.length >= (((this.balanceMoney *
				// 			1) / 100).toString())[0].length) {
				// 		let tempMoneyStr = ((this.balanceMoney * 1) / 100).toString()
				// 		let allMoneyStr = tempMoneyStr.split('.')[0]
				// 		realMoneyStr = allMoneyStr
				// 	}
				// } else {
				// 	console.log("heheh");
				// }


				// // if (tempNewMoney.indexOf('.') === -1) {
				// // 	realMoneyStr = tempNewMoney
				// // 	console.log("BBB", tempNewMoney, typeof tempNewMoney);
				// // } else {
				// // 	// let tempMoneyStr = ((tempNewMoney * 1) / 100).toString()
				// // 	let tempMoneyStr = tempSplitMoneyStr.split('.')[0]
				// // 	console.log("AAA", tempMoneyStr, typeof tempMoneyStr);

				// // 	realMoneyStr = tempMoneyStr
				// // }

				// this.inputBetMoney = realMoneyStr




			},
			allMoneyClick() {
				this.inputBetMoney = 0

				// 这个是不允许小数
				// this.inputBetMoney = this.balanceIntMoney
				// 这个是允许小数
				this.inputBetMoney = this.balanceMoney / 100

				// let tempMoneyStr = (this.balanceMoney / 100).toString()
				// let allMoneyStr = tempMoneyStr.split('.')[0]
				// this.inputBetMoney = allMoneyStr
			},
			customMoneyClick() {
				this.inputBetMoney = 0
			},
			cancelBtnClick() {
				this.goBackBtnClick()
			},
			areaSelectClick() {
				this.showAreaBool = true
			},
			confirmSelectArea(value) {
				// console.log("value", this.areaList[value]);	
				this.selectAreaNum = this.areaList[value]
			},
			async getAreaData() {
				let resR = await sysConfigReq()
				// console.log("resR", resR);
				if (resR.code === 200) {
					let areaCodeArr = resR.data.area_code
					// areaCodeArr.forEach(item => {
					// 	this.areaList.push({
					// 		label: item,
					// 		value: item
					// 	})
					// })
					this.areaList = areaCodeArr
					// if ()
					if (this.areaList.length === 0) {
						this.currentSelectIndex = ""
						return false
					}
					this.currentSelectIndex = 0
					this.selectAreaNum = this.areaList[0]
				}
			},
			async getSmsCodeClick() {
				if (!this.newPhone) {
					uni.showToast({
						icon: 'none',
						title: this.$t('user.security.center.rule.phone.not.empty.text'),
					});
					return false
				}


				if (!this.timer) {
					let reqParams = {}
					reqParams.phone = this.selectAreaNum + this.newPhone
					let resR = await phoneCodeReq(reqParams, this.localLoginToken)
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


			},
			async updateBtnClick() {

				if (!this.newPhone) {

					uni.showToast({
						title: this.$t('user.security.center.rule.phone.not.empty.text'),
						icon: "none",
						duration: 2000
					});

					return false
				}

				if (!this.codeSmsStr) {

					uni.showToast({
						title: this.$t('user.security.center.rule.code.not.empty.text'),
						icon: "none",
						duration: 2000
					});

					return false
				}

				if (!this.selectAreaNum) {

					return false
				}

				let reqParam = {}
				reqParam.phone = this.selectAreaNum + this.newPhone
				reqParam.code = this.codeSmsStr
				reqParam.areaCode = this.selectAreaNum

				let resR = await phoneBindReq(reqParam, this.localLoginToken)
				if (resR.code === 200) {
					this.showNeedBindPhone = false
					this.defalutCodeTitle = this.$t('user.change.phone.get.code.text')
					clearInterval(this.timer);
					this.timer = null;
					uni.showToast({
						title: this.$t('user.change.phone.change.success.text'),
						icon: 'none',
						duration: 2000
					});


				} else if (resR.code === 402 || resR.code === 403) {
					this.logout()
					this.$refs.uToast.show({
						title: resR.msg,
						url: '/pages/login/login',
					})
				} else {
					let currMsgKey = resR.data[0].msgKey
					uni.showToast({
						title: this.$t(`backapi.${currMsgKey}`),
						icon: 'none',
						duration: 2000
					});
				}
			},
			async confirmBtnClick() {

				// console.log("selectBetNul",this.selectBetNul);

				let reqParam = {}
				reqParam.gameId = this.reqGameID
				reqParam.oddsId = this.reqOddID
				reqParam.money = this.inputBetMoney
				reqParam.type = this.selectBetNul
				let resR = await betReq(reqParam, this.localLoginToken)

				if (resR.code === 200) {
					// console.log("resR",resR);
					this.$showModal({
						title: '',
						icon: 'success',
						ceterTitle: this.$t('backapi.success.bet.text'),
						ceterDesc: '',
						cancelText: '', //传入空值表示只显示确认按钮，此代码不能省略
						confirmText: this.$t('modal.confirm.text'),
						success: (res) => {
							if (res.confirm) {
								this.remove_bet_num()
								this.remove_match_order()
								this.change_match_bool()
								uni.navigateTo({
									url: '/pages/match/match_content',
									animationType: 'pop-in',
									animationDuration: 200
								});
							} else if (res.cancel) { //点击确定无需操作

							}
						}
					})
				} else { //103会有错误字段
					// console.log("111", resR.data);
					if (resR.data) {
						let currData = resR.data[0]
						let currMsgKey = currData.msgKey
						// this.$refs.uToast.show({
						// 	title: this.$t(`backapi.${currMsgKey}`),
						// 	type: 'error', 
						// })

						if (currMsgKey === 'phoneNotBind') { //针对未绑定手机号进行处理

							this.showNeedBindPhone = true

						} else {

							this.$showToast({
								title: "error",
								content: this.$t(`backapi.${currMsgKey}`),
								icon: 'fail',
								success: res => {
									// console.log("res",res);
								}
							});
						}


					}

				}

			}
		}
	}
</script>

<style>
	page {
		background-color: #071a28;
	}

	.navBarLeft {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.freshImage {
		width: 27px;
		height: 27px;
	}


	.matchOrderPage {
		/* display: flex;
			flex-direction: column; */
		width: 100%;
		background: #071a28;
		height: 100%;
		position: relative;
		/* height: calc(100vh - var(--window-top)); */
	}

	.addition {
		display: flex;
		align-items: center;
		justify-content: center;
		color: red;
		margin: 10px 0;
		font-size: 12px;
		margin-top: 50px;
	}

	.matchArea {
		background: #132736 url(../../static/images/list_bg.png) no-repeat top;
		background-size: 100%;
		margin: 15px 15px 0 15px;
		box-shadow: 0 3px 6px rgb(0 0 0 / 16%);
		border-radius: 10px;
		overflow: auto;
		position: relative;
	}

	.detail-date {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 7px 10px 0px;
		position: inherit;
		z-index: 10;
	}

	.detail-date-time {
		display: flex;
		align-items: center;
		font-size: 13px;
		font-family: SimHei;
		font-weight: 400;
		color: #fff;
	}

	.detailTimeView {}

	.detailDateView {
		font-size: 13px;
		font-weight: 400px;
		font-family: SimHei;
		color: #fff;
	}

	.detail-title {
		text-align: center;
		font-size: 14px;
		font-family: Hiragino Sans GB;
		/* padding-top: 20px; */
		padding-top: 70px;
		color: #fff;
	}

	.time-bg-view {
		position: absolute;
		top: 0;
		left: 0;
		background: linear-gradient(-90deg, rgba(128, 90, 0, 0), #3d8dfe);
		height: 26px;
		width: 30%;
	}


	.matchTwo {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		padding-top: 5px;
		/* padding-top: 30px; */
		padding-bottom: 15px;
		color: #FDFDFD;
	}

	.matchListLeft {
		text-align: center;
		font-size: 12px;
		font-family: FZDaHei-B02S;
		font-weight: 500;
		width: 43%;
	}

	.matchListLeft image {
		display: block;
		margin: 0 auto 10px;
		width: 36px;
		height: 36px;
		border-radius: 50px;
	}

	.matchVS {
		width: 40px;
		height: 40px;
		text-align: center;
		font-size: 14px;
		background: url(../../static/images/vs.png) no-repeat top;
		background-size: 100%;
	}

	.matchListRight {
		text-align: center;
		font-size: 12px;
		font-family: FZDaHei-B02S;
		font-weight: 500;
		width: 43%;
	}

	.matchListRight image {
		display: block;
		margin: 0 auto 10px;
		width: 36px;
		height: 36px;
		border-radius: 50px;
	}


	.balanceArea {
		border-radius: 4px;
		margin: 15px;
		line-height: 40px;
	}

	.balanceAreaTop {
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
	}

	.balanceAreaTop image {
		width: 27px;
		height: 26px;
	}

	.balanceAreaTopTitle {
		display: flex;
		font-size: 16px;
		font-family: Hiragino Sans GB;
		color: #fff;
		align-items: center;
		margin-left: 8px;
	}

	.balanceAreaContent {
		display: flex;
		justify-content: center;
		align-items: center;
		background: url(@/static/images/balance-content-bg.png) no-repeat top;
		background-size: 100% 100%;
		height: 60px;
		width: 100%;
	}

	.balanceAreaContentMoney {
		font-size: 32px;
		font-family: Alibaba PuHuiti;
		font-weight: 500;
		color: #3d8dfe;
	}

	.transArea {
		border-radius: 4px;
		margin: 15px;
	}

	.transAreaTop {
		display: flex;
		justify-content: space-between;
	}

	.transAreaTopItem {
		font-size: 16px;
		color: #fff;
		width: 50%;
		text-align: center;
		position: relative;
	}

	.transAreaTopItemTitle {
		line-height: 30px;
		text-align: left;
		text-indent: 5px;
	}

	.transAreaBottom {
		background: #132736;
		border-radius: 10px;
		padding-bottom: 1px;
	}

	.transAreaBottomInputBtns {
		display: flex;
		justify-content: space-between;
	}

	.transAreaBottomInput_trans {
		width: 48%;
		text-align: left;
		text-indent: 10px;
		/* border: 0 !important; */
		color: #fff;
		overflow: inherit;
	}

	.transAreaBottomInput_trans_amount {
		font-family: Hiragino Sans GB;
		height: 45px;
		line-height: 45px;
		font-size: 16px;
		background: #334756;
		border-radius: 5px;
	}

	.transAreaBottomInput_trans_desc {

		display: flex;
		line-height: 32px;
		font-size: 12px;
	}

	.transAreaBottomInput_yugu {
		width: 48%;
	}

	.transAreaBottomInput_yugu_result {
		font-size: 16px;
		color: #fff;
		font-family: Roboto;
		font-weight: 500;
		line-height: 45px;
		background: #334756;
		border-radius: 5px;
		text-indent: 10px;


		overflow: auto;
	}

	.transAreaBottomInput_yugu_desc {
		font-size: 12px;
		font-family: Hiragino Sans GB;
		font-weight: 400;
		color: #fff;
		display: flex;
		/* align-items: center; */
		line-height: 32px;
		text-indent: 5px;
	}

	.proceFeeTitle {}

	.fee_amount,
	.payRate {
		color: #3d8dfe;
	}

	.transAreaBottomMoney {
		margin: 0 14px;
	}

	.transAreaBottomMoneyBtns {
		display: block;
		overflow: hidden;
		padding: 10px 0;
	}

	.transAreaBottomMoneyBtnsItem {
		font-size: 14px;
		color: #fff;
		min-width: 70px;
		height: 33px;
		line-height: 33px;
		text-align: center;
		background: #334756;
		border-radius: 4px;
		margin: 5px;
		float: left;
	}

	.tranRecharge {
		background: #3d8dfe;
		padding: 0 10px;
	}

	.detailOrderCancelConfirm {
		display: flex;
		width: 90%;
		justify-content: space-between;
		margin: 10px auto;
	}

	.detailOrderCancelBtn {
		width: 46%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		font-size: 16px;
		font-family: Alibaba PuHuiTi;
		color: #fff;
		border-radius: 10px;
		background: #334756;
	}

	.detailOrderConfirmBtn {
		width: 46%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		font-size: 16px;
		font-family: Alibaba PuHuiTi;
		color: #fff;
		border-radius: 10px;
		background: #3d8dfe;
	}


	/* 新加未绑定手机号无法下注 */

	.forgetPassword_concontainer {
		width: 90%;
		margin: auto;
		margin-top: 50px;
		margin-bottom: 50px;
	}

	.forgetPassword_item {
		align-items: center;
		border-radius: 2px;
	}

	.codeview {

		position: relative;
	}


	.areaView {
		position: absolute;
		color: #fff;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		left: 30px;
		height: 44px;
	}


	.forgetPassword_item_title {
		color: #c2c2c2;
		margin-bottom: 15px;
	}

	.forgetPassword_item_input {
		/* height: 42px; */
		line-height: 42px;
		background: #334756;
		border-radius: 5px;
		margin-bottom: 14px;
		color: #fff;
	}

	.get_code_sms {
		position: absolute;
		right: 10px;
		color: #3d8dfe;
		z-index: 100;
		bottom: 0px;
		height: 42px;
		max-width: 40%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 13px;
		text-align: center;
	}

	.errorTip {
		width: 100%;
		font-size: 12px;
		font-family: Hiragino Sans GB;
		font-weight: 400;
		color: #db1401;
		line-height: 13px;
		margin-bottom: 14px;
		margin-top: 20px;
	}

	.uni-input-input {
		padding-left: 17px;
		color: #fff;
	}

	/deep/ .u-flex {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	/deep/ .u-input__right-icon__item {
		margin: 0 10px;
	}



	.loginBtn {

		height: 50px;
		line-height: 50px;
		/* width: 80%; */
		margin: 0 15px;
		font-weight: 400;
		font-size: 16px;
		color: #FFF;
		text-align: center;
		box-shadow: 0 2px 4px 0 rgb(0 0 0 / 25%);
		background: #334756;
		border-radius: 10px;
		border: none;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 60px;
	}

	.active {
		background: #3d8dfe;
	}


	.dialog {
		z-index: 10;
	}

	/deep/ .u-drawer-top {
		background-color: #132736;
	}
</style>
