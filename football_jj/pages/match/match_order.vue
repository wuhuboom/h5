<template>
	<view class="matchOrderPage">
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
								<view class="service">
									<!-- <image src="../../static/images/service.png" mode="" class="icon"></image> -->
								</view>
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

		<view class="wrap">
			<view class="wrap-item">
				<view class="content">
					<view class="bodan">
						<view class="itavs">
							<view class="bodanbofen darkfontscolor">
								{{scoreStr}}
							</view>
							<view class="bodansx">
								@ {{payRateNum}} %
							</view>
						</view>
						<view class="dates fontfamily darkfontscolor">
							{{detailDateStr | timestampStr}}
						</view>
					</view>
					<view class="matchname">
						<view class="teamh">
							<image :src="matchTeamLeftLogo ? matchTeamLeftLogo:'../../static/images/default.png'"
								mode="" class="matchlogo"></image>
							<view class="matchfonts darkfontscolor">
								{{matchTeamLeft}}
							</view>
						</view>
						<view class="vsfontsstyle fontColor">
							VS
						</view>
						<view class="teamc">
							<view class="matchfonts darkfontscolor">
								{{matchTeamRight}}
							</view>
							<image :src="matchTeamRightLogo ? matchTeamRightLogo:'../../static/images/default.png'"
								mode="" class="matchlogo"></image>
						</view>
					</view>
					<view class="leguaname">
						<view class="names clamp2 darkfontscolor">
							{{detailTitleStr}}
						</view>
						<view class="somefonts brightfontColor darkfontscolor">
							{{$t('match.content.close.text')}}: <counter :endtime='closeTimeStr'
								v-if="this.closeTimeStr"></counter>
						</view>
					</view>

				</view>
			</view>

		</view>

		<view class="details">
			<view class="topblocks">
				<view class="toplines">

				</view>
				<view class="rightmore">
					{{$t('match.order.detail.proce.fee.text')}}
					-{{feeAmountNum}}%
				</view>
			</view>
			<view class="middleslines">
				<view class="amounts talago">
					<view class="titles">
						{{$t('match.order.detail.trans.amount.text')}}
					</view>
					<view class="numbers hasinput">
						<input type="text" value="" class="item-right" :placeholder="placeholderAmount"
							v-model="inputBetMoney" />
					</view>
				</view>
				<view class="amounts torights">
					<view class="titles">
						{{$t('match.order.detail.vip.earnings.text')}}
					</view>
					<view class="numbers special">
						x{{vipRateNum}}%=
					</view>
				</view>
				<view class="amounts">
					<view class="titles">
						{{$t('match.order.detail.estimate.profit.text')}}
					</view>
					<view class="numbers afilas">
						{{yuguMoneyNotFee}}
					</view>
				</view>
			</view>
			<view class="bottomlines">
				<view class="quicklychoice">
					<view
						:class="currFastSelectIndex === index ? 'btns borderColor fontColor active' : 'btns borderColor fontColor'"
						v-for="(item,index) in fastMoneyArray" :key="index" @click="singleMoneyClick(item,index)">
						+{{item}}
					</view>
					<view
						:class="currFastSelectIndex === 777 ? 'btns borderColor fontColor active' : 'btns borderColor fontColor'"
						@click="allMoneyClick">
						{{$t('match.order.detail.money.all.text')}}
					</view>
					<view
						:class="currFastSelectIndex === 888 ? 'btns borderColor fontColor active' : 'btns borderColor fontColor'"
						@click="customMoneyClick">
						{{$t('match.order.detail.money.custom.text')}}
					</view>
					<view class="btns borderColor fontColor" @click="tranRechargeBtnClick">
						{{$t('match.order.detail.money.recharge.text')}}
					</view>
				</view>
			</view>

		</view>

		<view class="toplineblock">
			<view class="leftfonts">
				<span>{{$t('match.order.detail.account.balance.text')}}:</span>
				<span class="splce">{{balanceMoney | moneyFormat}}</span>
			</view>
		</view>


		<view class="oprationbtns">
			<view class="cancel borderColor fontColor" @click="cancelBtnClick">
				{{$t('match.order.detail.button.cacel.text')}}
			</view>
			<view class="confirms btncolor disabled" @click="confirmBtnClick">
				{{$t('match.order.detail.button.confirm.text')}}
			</view>
		</view>

		<!-- 手机号绑定弹窗(这个功能在这个页面会出现闪屏现象，暂时不用，替换成跳转到绑定手机页面) -->
		<u-popup class="dialog" v-model="showNeedBindPhone" mode="top" width="315px" border-radius="10"
			:mask-close-able="false" :mask-custom-style="maskCustomStyle" :custom-style="popCustomStyle"
			z-index="11000">
			<view class="box">

				<view class="item">
					<view class="number">
						<text class="codenumber" @click.stop="showAreaBool = !showAreaBool">+{{selectAreaNum}}</text>
						<view class="phoneBox" :style="!showAreaBool ? 'display:none': null">
							<scroll-view class="scroll-Y" scroll-y>
								<view class="phone-content">
									<view :class="currentSelectIndex === index ? 'phoneItem active' : 'phoneItem'"
										v-for="(item,index) in areaList" :key="index"
										@click="selectAreaClick(item,index)">
										{{item}}
									</view>
								</view>
							</scroll-view>
						</view>
						<image src="../../static/images/Arrow_Down.png" mode="" class="down"></image>
					</view>
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<u-input type="number" class="forgetPassword_item_input phoneView" :clearable="false"
						:placeholder="phonePlace" :custom-style="customInputStyle" :placeholder-style="placeholderStyle"
						maxlength="16" v-model="newPhone" @input="inputPhoneChange" />
				</view>
				<view class="tip">
					{{phoneTip}}
				</view>
				<view class="item">
					<!-- <image src="../../static/images/suo.svg" mode="" class="icon"></image> -->
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<u-input type="text" :clearable="false" class="forgetPassword_item_input"
						:placeholder="phoneCodePlace" :custom-style="customInputStyle"
						:placeholder-style="placeholderStyle" maxlength="4" v-model="codeSmsStr"
						@input="inputSmsCodeChange" />
					<view class="getCodeNum" @click="getSmsCodeClick">
						{{defalutCodeTitle}}
					</view>
				</view>
				<view class="tip">
					{{codeSmsTip}}
				</view>

				<view class="btn_login" @click="updateBtnClick()">
					{{$t('user.forget.pwd.update.button.text')}}
				</view>
			</view>

		</u-popup>

		<u-popup v-model="betBoxstatus" width="315px" mode="center" border-radius="10" @close="popCloseEvent">
			<view class="details-success">
				<view class="success-text">
					<image src="../../static/images/success_pop.png" mode="" class="success"></image>
					<text class="txt">{{$t('backapi.success.bet.text')}}</text>
				</view>
				<view class="contents nomae">
					<view class="topheads">
						<view class="clamp2">
							{{matchTeamLeft}}
						</view>
						<view class="vs">
							VS
						</view>
						<view class="clamp2">
							{{matchTeamRight}}
						</view>
					</view>
					<view class="conts">
						<view class="">
							{{$t('match.content.score.text')}}
						</view>
						<view class="fonts">
							{{scoreStr}}
						</view>
						<view class="scx">
							@{{payRateNum}}%
						</view>
					</view>
					<view class="lines">
						<view class="acfonts">
							{{detailTitleStr}}
						</view>
						<view class="bcfonts">
							{{detailDateStr | timestampStr}}
						</view>
					</view>
					<view class="lines">
						<view class="acfonts">
							{{$t('match.order.detail.trans.amount.text')}}

						</view>
						<view class="bcfonts">
							{{inputBetMoney}}
						</view>
					</view>
					<view class="lines">
						<view class="acfonts">
							{{$t('match.order.detail.estimate.profit.text')}}
						</view>
						<view class="bcfonts">
							{{yuguMoneyNotFee}}
						</view>
					</view>
					<view class="lines">
						<view class="acfonts">
							{{$t('order.center.show.detail.order.num.text')}}
						</view>
						<view class="bcfonts">
							{{orderNum}}
						</view>
					</view>
				</view>
				<view class="btnsreas">
					<view class="cacnels borderColor fontColor" @click="betBoxstatus = false">
						{{$t('match.order.detail.button.close.text')}}
					</view>
					<view class="confirmsbtns btncolor" @click="goTradeClick">
						{{$t('match.order.detail.button.go.trade.text')}}
					</view>
				</view>

				<!-- <view class="vsBg">
					<view class="aVsb">
						<text class="text">{{matchTeamLeft}}</text>
						<view class="text vs">
							<image src="../../static/images/vs.png" mode="" class="vs-img"></image>
						</view>
						<text class="text">{{matchTeamRight}}</text>
					</view>
					<view class="back-match">
						<text class="text">{{$t('match.content.score.text')}}</text>
						<text class="float64">{{scoreStr}}</text>
						<text class="float32">@{{payRateNum}}%</text>
					</view>
				</view>
				<view class="nickname">
					<text class="title">{{detailTitleStr}}</text>
					<text class="time"></text>
				</view> -->
				<!-- 	<view class="gain">
					<text class="title">{{$t('match.order.detail.estimate.profit.text')}}: {{yuguMoneyNotFee}}</text>
				</view> -->
				<!-- <view class="btn">
					<button type="primary" class="goTrade"
						@click="goTradeClick">{{$t('match.order.detail.button.go.trade.text')}}</button>
					<button type="warn" class="close" :plain="true" size="mini"
						@click="betBoxstatus = false">{{$t('match.order.detail.button.close.text')}}({{timerNum}})</button>
				</view> -->
			</view>
		</u-popup>



		<u-toast ref="uToast" />
		<show-toast></show-toast>
		<show-modal ref="testRef"></show-modal>



	</view>
</template>

<script>
	import {
		preReq,
		betReq,
		phoneCodeReq,
		phoneBindReq,
		sysConfigReq
	} from '../../api/index.js'
	import {
		myMixin,
		matchOrderMinxi,
		rechargeMinxi,
		changePhoneMixin
	} from '@/util/mixins.js'
	import counter from '../../components/counterView/counter.vue';
	const TIME_COUNT = 59;
	export default {
		components: {
			counter,
		},
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
				closeTimeStr: null,
				scoreStr: "",
				balanceMoney: 0,
				placeholderAmount: "",
				localLoginToken: "",
				payRateNum: 0,
				vipRateNum: 0,
				feeAmountNum: 0,
				fastMoneyArray: null,
				urlFromStr: '',
				inputBetMoney: '',
				reqGameID: null,
				reqOddID: null,
				curGameTypeNum: null,
				currFastSelectIndex: 888,
				betBoxstatus: false,
				orderNum: '',
				timerNum: 2,
				intVal: null,
				showNeedBindPhone: false,
				maskCustomStyle: {
					'background-color': 'rgba(0, 17, 28, 0.45)'
				},
				popCustomStyle: {
					'background': 'transparent',
				},

				oldPhoneStr: '',
				codeSmsStr: '',
				codeSmsTip: '',
				codeSmsTipBool: false,
				phoneTip: '',
				phoneTipBool: false,
				defalutCodeTitle: this.$t('user.change.phone.get.code.text'),
				phoneCodePlace: this.$t('user.change.phone.code.place.text'),
				timer: null,
				showAreaBool: false,
				areaList: [],
				currentSelectIndex: '',
				selectAreaNum: '',
				newPhone: '',
				newPhonePlace: this.$t('user.change.phone.new.phone.place.text'),
				phonePlace: this.$t('reg.phone.place'),
				customInputStyle: {
					"min-height": "35px",
					"height": "44px",
					"border-radius": "5px",
					"color": "#fff",
					"padding-left": "17px"
				},
				placeholderStyle: "color:#506778;font-size:12px",

			}
		},
		mixins: [myMixin, matchOrderMinxi, rechargeMinxi, changePhoneMixin],
		computed: {
			// ...mapState(['hasLogin','selectBetNul','matchOrder_Bool']),
			yuguMoney() {
				if (this.inputBetMoney) {
					// return this.inputBetMoney * (this.payRateNum/100) - this.feeAmountNum
					// return (this.inputBetMoney * ((this.payRateNum) / 100) - (this.feeAmountNum / 100)).toFixed(3)
					return (this.inputBetMoney * (((this.payRateNum) / 100) + ((this.vipRateNum) / 100))).toFixed(3)
				} else {
					return "0.00"
				}

			},
			yuguMoneyNotFee() {
				if (this.inputBetMoney) {

					//下注金额
					let temp_betMoney = this.inputBetMoney
					// 赔率
					let temp_betOdds = this.payRateNum / 100
					// vip收益
					let temp_bonus = this.vipRateNum / 100
					// 手续费
					let temp_chargeRate = this.feeAmountNum / 100
					let finalMoney = (temp_betMoney * (temp_betOdds + temp_bonus)) * (1 - temp_chargeRate)
					// 	let finalMoney = (this.inputBetMoney * ((this.payRateNum) / 100) + (this.vipRateNum) / 100))) * (1 -
					// (this.feeAmountNum / 100))
					return finalMoney.toFixed(3)
					// return (this.inputBetMoney * (((this.payRateNum) / 100) + ((this.vipRateNum) / 100)) - (this
					// 	.feeAmountNum /
					// 	100)).toFixed(3)
				} else {
					return "0.00"
				}

			}

		},
		onLoad() {

			//初始化语言
			this.initLang()

			if (!this.matchOrder_Bool) {
				const queryMatchOrderItem = uni.getStorageSync('queryMatchOrderItem')
				if (queryMatchOrderItem) {
					// 使用网络请求
					// this.requestInitData(queryMatchOrderItem.game.id,queryMatchOrderItem.lossPerCent.id)

					this.closeTimeStr = null
					this.closeTimeStr = queryMatchOrderItem.game.remainingTime

					this.vipRateNum = queryMatchOrderItem.bonus
					// 直接本地获取
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

			this.getAreaData()

			this.orderNum = ""
		},
		onHide() {
			clearInterval(this.timer)
		},
		methods: {
			initLang() { //初始化语言

				let langStr = uni.getStorageSync('ft_lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr

				this.navTitle = this.$t('match.order.detail.title.text')
				this.additionStr = this.$t('match.order.detail.bet.desc.text')
				this.placeholderAmount = this.$t('match.order.detail.please.enter.text')

			},
			async getAreaData() {
				let resR = await sysConfigReq()
				// console.log("resR", resR);
				if (resR.code === 200) {
					this.areaList = resR.data.area_code
					if (this.areaList.length === 0) {
						this.currentSelectIndex = ""
						return false
					}
					this.currentSelectIndex = 0
					this.selectAreaNum = this.areaList[0]
				}
			},
			otherHideAreaBox() {
				this.showAreaBool = false

			},
			selectAreaClick(item, index) {
				this.showAreaBool = false
				this.currentSelectIndex = index
				this.selectAreaNum = item
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
					this.closeTimeStr = 0
					this.closeTimeStr = resR.data.game.remainingTime

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
					animationType: 'slide-in-top',
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
					animationType: 'slide-in-top',
					animationDuration: 200
				});
			},
			singleMoneyClick(item, index) {
				this.currFastSelectIndex = index
				// console.log("item",item);
				if (this.inputBetMoney) {
					let oldMoney = this.inputBetMoney
					this.inputBetMoney = oldMoney * 1 + item * 1
				} else {
					this.inputBetMoney = item
				}
			},
			allMoneyClick() {
				this.currFastSelectIndex = 777
				let tempMoneyStr = ((this.balanceMoney * 1) / 100).toString()
				let allMoneyStr = tempMoneyStr.split('.')[0]

				this.inputBetMoney = ((this.balanceMoney * 1) / 100)
				// this.inputBetMoney = allMoneyStr
			},
			customMoneyClick() {
				this.currFastSelectIndex = 888
				this.inputBetMoney = 0
			},
			cancelBtnClick() {
				this.goBackBtnClick()
			},
			async confirmBtnClick() {
				// console.log("selectBetNul",this.selectBetNul);

				if (!this.inputBetMoney) {

					uni.showToast({
						icon: 'none',
						title: this.$t(`backapi.moneyIsNull`),
						duration: 2000
					});
					return false
				}

				this.timerNum = 2
				let reqParam = {}
				reqParam.gameId = this.reqGameID
				reqParam.oddsId = this.reqOddID
				reqParam.money = this.inputBetMoney
				reqParam.type = this.selectBetNul
				let resR = await betReq(reqParam, this.localLoginToken)

				if (resR.code === 200) {
					// console.log("resR",resR);
					this.betBoxstatus = true

					this.orderNum = resR.data.orderNo
					// this.intVal = setInterval(() => {
					// 	if (this.timerNum < 1) {
					// 		this.betBoxstatus = false
					// 		clearInterval(this.intVal)
					// 	} else {
					// 		this.timerNum = this.timerNum - 1
					// 	}
					// }, 1000)


				} else { //103会有错误字段
					let currData = resR.data[0]
					let currMsgKey = currData.msgKey
					if (currMsgKey === 'phoneNotBind') { //针对未绑定手机号进行处理

						// this.showNeedBindPhone = true

						this.save_bindphone_from('matchOrder')
						uni.navigateTo({
							url: '/pages/user/bind_phone',
							success: (res) => {
								this.$store.state.matchOrder_Bool = false
								// 通过eventChannel向被打开页面传送数据	
								res.eventChannel.emit('changePhoneEventClick', {
									from: 'matchOrder'
								})
							},
							animationType: 'pop-in',
							animationDuration: 200
						})

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

			},
			popCloseEvent() {
				// console.log("1111");
				// clearInterval(this.intVal)
			},
			goTradeClick() {
				uni.switchTab({
					url: '/pages/user/order-list',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			async updateBtnClick() {

				if (!this.newPhone) {

					uni.showToast({
						title: this.$t('reg.ruls.phone.empty'),
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
					this.defalutCodeTitle = this.$t('user.change.phone.get.code.text')
					clearInterval(this.timer);
					this.timer = null;
					uni.showToast({
						title: this.$t('user.change.phone.change.success.text'),
						icon: 'none',
						duration: 2000
					});

					// this.initData()
				} else if (resR.code === 402 || resR.code === 403) {
					this.logout()
					this.$refs.uToast.show({
						title: resR.msg,
						url: '/pages/login/login',
					})
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

	// 导航栏样式结束

	.wrap {
		padding: 0 3px;

		.wrap-item {
			background: url(../../static/images/lanebg2.png);
			background-position: 50%;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-align: center;
			-webkit-align-items: center;
			-ms-flex-align: center;
			align-items: center;
			-webkit-box-pack: justify;
			-webkit-justify-content: space-between;
			-ms-flex-pack: justify;
			justify-content: space-between;
			height: 117px;
			border-radius: 6px;
			box-sizing: border-box;
			padding: 10px 13px;
			margin-top: 7px;

			.content {
				width: 100%;
				height: 100%;

				.bodan {
					width: 100%;
					display: -webkit-box;
					display: -webkit-flex;
					display: -ms-flexbox;
					display: flex;
					-webkit-box-align: center;
					-webkit-align-items: center;
					-ms-flex-align: center;
					align-items: center;
					-webkit-box-pack: justify;
					-webkit-justify-content: space-between;
					-ms-flex-pack: justify;
					justify-content: space-between;

					.itavs {
						font-size: 16px;
						font-weight: 700;
						margin-top: 5px;
						-webkit-box-flex: 1;
						-webkit-flex: 1;
						-ms-flex: 1;
						flex: 1;
						display: -webkit-box;
						display: -webkit-flex;
						display: -ms-flexbox;
						display: flex;
						-webkit-box-align: center;
						-webkit-align-items: center;
						-ms-flex-align: center;
						align-items: center;

						.bodanbofen {
							color: #53618b;
							margin-right: 10px;
							font-family: DINProMedium;
							// width: 100%;
							white-space: nowrap;
						}

						.bodansx {
							color: #ee1c25;
							font-family: FontName;
							white-space: nowrap;
						}
					}

					.dates {
						color: #929ec1;
						font-size: 10px;
						text-align: right;
						// width: 2rem;
					}
				}

				.matchname {
					width: 100%;
					display: -webkit-box;
					display: -webkit-flex;
					display: -ms-flexbox;
					display: flex;
					-webkit-box-align: center;
					-webkit-align-items: center;
					-ms-flex-align: center;
					align-items: center;
					-webkit-box-pack: start;
					-webkit-justify-content: flex-start;
					-ms-flex-pack: start;
					justify-content: flex-start;
					margin: 10px 0;

					.teamh {
						display: -webkit-box;
						display: -webkit-flex;
						display: -ms-flexbox;
						display: flex;
						-webkit-box-align: center;
						-webkit-align-items: center;
						-ms-flex-align: center;
						align-items: center;
						-webkit-box-pack: end;
						-webkit-justify-content: flex-end;
						-ms-flex-pack: end;
						justify-content: flex-end;
						-webkit-box-flex: 1;
						-webkit-flex: 1;
						-ms-flex: 1;
						flex: 1;

						.matchfonts {
							color: #929ec1;
							font-size: 12px;
							vertical-align: middle;
							margin-left: 6px;
							width: 80px;
							text-align: right;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							overflow: hidden;
							-webkit-box-orient: vertical;
						}

						.matchlogo {
							width: 35px;
							height: 35px;
							background: #eee;
							border-radius: 50%;
						}
					}

					.vsfontsstyle {
						font-size: 14px;
						font-weight: 700;
						font-family: DINProMedium;
						margin: 0 6px;
						color: #4176f7;
					}

					.teamc {
						display: -webkit-box;
						display: -webkit-flex;
						display: -ms-flexbox;
						display: flex;
						-webkit-box-align: center;
						-webkit-align-items: center;
						-ms-flex-align: center;
						align-items: center;
						-webkit-box-pack: start;
						-webkit-justify-content: flex-start;
						-ms-flex-pack: start;
						justify-content: flex-start;
						-webkit-box-flex: 1;
						-webkit-flex: 1;
						-ms-flex: 1;
						flex: 1;

						.matchfonts {
							color: #929ec1;
							font-size: 12px;
							vertical-align: middle;
							margin-right: 6px;
							width: 80px;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							overflow: hidden;
							-webkit-box-orient: vertical;
						}

						.matchlogo {
							width: 35px;
							height: 35px;
							background: #eee;
							border-radius: 50%;
						}
					}
				}

				.leguaname {
					width: 100%;
					display: -webkit-box;
					display: -webkit-flex;
					display: -ms-flexbox;
					display: flex;
					-webkit-box-align: center;
					-webkit-align-items: center;
					-ms-flex-align: center;
					align-items: center;
					-webkit-box-pack: justify;
					-webkit-justify-content: space-between;
					-ms-flex-pack: justify;
					justify-content: space-between;

					.names {
						color: #929ec1;
						font-size: 12px;
					}

					.somefonts {
						display: -webkit-box;
						display: -webkit-flex;
						display: -ms-flexbox;
						display: flex;
						-webkit-box-align: center;
						-webkit-align-items: center;
						-ms-flex-align: center;
						align-items: center;
						color: #6f8ede;
						font-size: 10px;
					}
				}
			}
		}
	}

	.details {
		background: #fff;
		padding: 10px;
		box-sizing: border-box;
		margin-top: 5px;

		.topblocks {
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-align: center;
			-webkit-align-items: center;
			-ms-flex-align: center;
			align-items: center;
			-webkit-box-pack: justify;
			-webkit-justify-content: space-between;
			-ms-flex-pack: justify;
			justify-content: space-between;

			.rightmore {
				color: #666;
				font-size: 12px;
				text-align: right;
				white-space: nowrap;
			}
		}

		.middleslines {
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-align: center;
			-webkit-align-items: center;
			align-items: center;
			-webkit-box-pack: justify;
			-webkit-justify-content: space-between;
			justify-content: space-between;
			margin-top: 10px;
			margin-bottom: 28px;

			.amounts {
				display: -webkit-box;
				display: -webkit-flex;
				display: -ms-flexbox;
				display: flex;
				-webkit-box-align: center;
				-webkit-align-items: center;
				align-items: center;
				-webkit-box-pack: justify;
				-webkit-justify-content: space-between;
				justify-content: space-between;

				-webkit-box-flex: 1;
				-webkit-flex: 1;
				-ms-flex: 1;
				flex: 1;
				-ms-flex-align: center;
				-ms-flex-pack: justify;
				-webkit-box-orient: vertical;
				-webkit-box-direction: normal;
				-webkit-flex-direction: column;
				-ms-flex-direction: column;
				flex-direction: column;
				height: 60px;

				.titles {
					color: #333;
					font-size: 13px;
				}

				.numbers {
					color: #333;
					font-size: 30px;
					font-weight: 700;
					vertical-align: bottom;

					.item-right {
						font-size: 22px;
						font-weight: 700;
					}
				}

				.special {
					color: #333;
					font-size: 13px;
				}

				.afilas {
					color: #1a1;
					font-size: 16px;
				}
			}

			.talago {
				-webkit-box-align: start;
				-webkit-align-items: flex-start;
				-ms-flex-align: start;
				align-items: flex-start;
				-webkit-box-flex: 1.6;
				-webkit-flex: 1.6;
				-ms-flex: 1.6;
				flex: 1.6;
			}
		}

		.bottomlines {
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-align: center;
			-webkit-align-items: center;
			-ms-flex-align: center;
			align-items: center;
			-webkit-box-pack: justify;
			-webkit-justify-content: space-between;
			-ms-flex-pack: justify;
			justify-content: space-between;

			.quicklychoice {
				display: -webkit-box;
				display: -webkit-flex;
				display: -ms-flexbox;
				display: flex;
				-webkit-box-align: center;
				-webkit-align-items: center;
				-ms-flex-align: center;
				align-items: center;

				-webkit-box-pack: start;
				-webkit-justify-content: flex-start;
				-ms-flex-pack: start;
				justify-content: flex-start;
				flex-wrap: wrap;

				.btns {
					min-width: 73px;
					height: 26px;
					border-radius: 4px;
					border: 1px solid #597ef7;
					text-align: center;
					line-height: 26px;
					color: #597ef7;
					font-size: 14px;
					margin-right: 6px;
					margin-top: 6px;
					padding: 0 10px;
					box-sizing: border-box;
				}


				.active {
					color: #fff;
					background: #597ef7;
				}
			}
		}
	}


	.toplineblock {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		-ms-flex-pack: justify;
		justify-content: space-between;
		padding: 0 10px;
		height: 40px;
		box-sizing: border-box;
		background: #fff;
		margin-top: 5px;
		margin-bottom: 5px;

		.leftfonts {
			font-size: 13px;
			color: #333;
			font-weight: 700;

			.splce {
				color: #414655;
				font-size: 16px;
			}
		}





	}

	.oprationbtns {
		width: 100%;
		height: auto;
		position: fixed;
		bottom: 48px;
		left: 0;
		right: 0;
		padding: 0 10px;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		-ms-flex-pack: justify;
		justify-content: space-between;
		box-sizing: border-box;

		.cancel {
			margin-right: 8px;
			border-radius: 6px;
			background: #fff;
			color: #597ef7;
			box-sizing: border-box;
			border: 1px solid #597ef7;

			-webkit-box-flex: 1;
			-webkit-flex: 1;
			-ms-flex: 1;
			flex: 1;
			height: 40px;
			line-height: 40px;
			text-align: center;
			font-weight: 700;
			font-size: 14px;
			letter-spacing: 1px;
		}

		.confirms {
			-webkit-box-flex: 1;
			-webkit-flex: 1;
			-ms-flex: 1;
			flex: 1;
			height: 40px;
			line-height: 40px;
			text-align: center;
			font-weight: 700;
			font-size: 14px;
			letter-spacing: 1px;

			border-radius: 6px;
			color: #fff;
			background: #597ef7;
		}
	}


	.detail-popup-body-btn {
		display: flex;
		width: 100%;
		justify-content: space-between;
		margin-top: 80px;

		.btn {
			min-width: 48%;
			height: 43px;
			line-height: 43px;
			text-align: center;
			border-radius: 25px;
			font-size: 16px;
			font-family: Alibaba PuHuiTi;
			background: #37404f;
			color: #fff;
			border-radius: 6px;
			background-size: 100%;
		}

		.btn-ok {
			min-width: 48%;
			height: 43px;
			color: #111;
			background: #ffc24a;
			margin: 0;
			padding: 0 15px;
			background: #d8d8d8;
			border-radius: 6px;
			background-image: linear-gradient(90deg, #ffe691, #ffc24a);
			background-size: 100%;
		}
	}


	.details-success {

		padding: 17px;

		.success-text {
			text-align: center;
			vertical-align: middle;
			display: flex;
			justify-content: center;
			// padding-top: 20px;
			// padding-bottom: 25px;

			.success {
				width: 20.5px;
				height: 17.5px;
				margin-right: 10px;
			}

			.txt {
				color: #4dad47;
				font-size: 16px;
				// line-height: 30px;
				font-weight: 600;
				letter-spacing: 1px;
			}
		}


		.contents {
			color: #333;
			font-size: 13px;
			letter-spacing: 1px;
			text-align: center;
			margin: 33px 0 20px 0;

			.topheads {
				font-size: 14px;
				color: #333;
				font-weight: 700;
				text-align: center;
				display: -webkit-box;
				display: -webkit-flex;
				display: -ms-flexbox;
				display: flex;
				-webkit-box-align: center;
				-webkit-align-items: center;
				-ms-flex-align: center;
				align-items: center;
				-webkit-box-pack: center;
				-webkit-justify-content: center;
				-ms-flex-pack: center;
				justify-content: center;

				view {
					display: block;
					-webkit-box-flex: 1;
					-webkit-flex: 1;
					-ms-flex: 1;
					flex: 1;
				}

				.clamp2 {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}


			}

			.conts {
				font-size: 14px;
				color: #333;
				font-weight: 700;
				margin-bottom: 20px;
				margin-top: 16px;

				display: flex;
				justify-content: center;
				align-items: center;

				.fonts {
					color: #1272c4;
					font-size: 13px;
					display: inline-block;
					margin-right: 8px;
				}

				.scx {
					color: #ee1c25;
					font-size: 14px;
				}
			}


			.lines {
				display: -webkit-box;
				display: -webkit-flex;
				display: -ms-flexbox;
				display: flex;
				-webkit-box-align: center;
				-webkit-align-items: center;
				-ms-flex-align: center;
				align-items: center;
				-webkit-box-pack: justify;
				-webkit-justify-content: space-between;
				-ms-flex-pack: justify;
				justify-content: space-between;
				padding: 8px 0;
				border-top: 0.5px solid #eee;

				.acfonts {
					font-size: 13px;
					color: #333;
					text-align: left;
					white-space: nowrap;
				}

				.bcfonts {
					font-size: 13px;
					color: #333;
					text-align: left;
				}
			}
		}

		.nomae {
			margin-top: 8px;
		}

		.btnsreas {
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-align: center;
			-webkit-align-items: center;
			-ms-flex-align: center;
			align-items: center;
			-webkit-box-pack: justify;
			-webkit-justify-content: space-between;
			-ms-flex-pack: justify;
			justify-content: space-between;
			padding: 0;

			.cacnels {
				background: #f7fcfd;
				color: #597ef7;
				border: 1px solid #597ef7;
				border-radius: 6px;
				margin-right: 8px;

				-webkit-box-flex: 1;
				-webkit-flex: 1;
				-ms-flex: 1;
				flex: 1;
				box-sizing: border-box;
				line-height: 40px;
				height: 40px;
				text-align: center;
				letter-spacing: 1px;
				font-size: 14px;
			}


			.confirmsbtns {

				-webkit-box-flex: 1;
				-webkit-flex: 1;
				-ms-flex: 1;
				flex: 1;
				box-sizing: border-box;
				line-height: 40px;
				height: 40px;
				text-align: center;
				letter-spacing: 1px;
				font-size: 14px;

				border-radius: 6px;
				color: #fff;
				background: #597ef7;
			}
		}

		.vsBg {
			width: 100%;
			height: 88px;
			// background-image: url(../../static/images/success_bg.png);
			background-size: 100% 100%;
		}

		.aVsb {
			display: flex;
			justify-content: space-between;
			padding-left: 15px;
			padding-right: 20px;
			padding-top: 15px;
			padding-bottom: 7px;
			align-items: center;

			.text {
				font-size: 14px;
				font-weight: 600;
				text-align: center;
			}

			.vs {
				flex: 0 0 10%;

				.vs-img {
					width: 24px;
					height: 24px;
				}
			}
		}

		.back-match {
			display: flex;
			justify-content: center;
			line-height: 30px;

			.text {
				font-weight: 600;
				font-size: 16px;
			}


			.float64 {
				color: #0081ff;
				padding: 0 15px;
				font-weight: 600;
				font-size: 16px;
			}

			.float32 {
				font-weight: 600;
				font-size: 16px;
				color: red;
			}
		}

		.nickname {
			display: flex;
			justify-content: space-between;
			padding: 15px;
			border-bottom-width: 0.5px;
			border-bottom-style: solid;
			border-bottom-color: #eee;

			.title {
				font-size: 16px;
				padding: 0 5px;
			}

			.time {
				font-size: 16px;
				padding: 0 5px;
			}
		}

		.gain {
			display: flex;
			justify-content: space-between;
			padding: 16px;
			border-bottom: none;

			.title {
				color: #26b53d;
				font-weight: 600;
			}
		}

		.btn {
			display: flex;
			flex-direction: column;
			margin-top: 15px;
			margin-bottom: 25px;
			padding: 0 15px;

			.goTrade {
				width: 100%;
				margin-bottom: 15px;
				background: linear-gradient(90deg, #ffd37d, #ca962e);
				color: #111;
				font-weight: 600;
				height: 40px;
				line-height: 40px;
				font-size: 14px;
			}
		}
	}

	// /deep/ .u-mode-center-box {
	// 	background-color: #1f252f;
	// }

	uni-button[type=warn][plain] {
		border: none;
	}

	.close {
		font-weight: 600;
		font-size: 16px;
	}

	// /deep/ .u-drawer-top {
	// 	background-color: #1f252f;
	// }

	.dialog {
		z-index: 10;
	}

	.box {
		margin-top: 50px;
		margin-bottom: 50px;

		.item {
			display: flex;
			align-items: center;
			// width: 325px;
			height: 45px;
			padding: 0 15px;
			margin-top: 15px;
			margin-left: 25px;
			margin-right: 25px;
			position: relative;
			background-color: #171e25;
			border-radius: 5px;

			.number {
				position: relative;
				width: 55px;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				// padding-right: 7px;

				.codenumber {
					position: relative;
					color: #ffc24a;
				}

				.phoneBox {
					position: absolute;
					top: 26px;
					left: -25px;
					z-index: 1004;
					width: 80px;
					background: #222232;
					border-radius: 5px;
					overflow: hidden;
					height: 150px;

					.scroll-Y {
						max-height: 250px;

						.phone-content {
							display: flex;
							flex-direction: column;

							.phoneItem {
								display: inline-block;
								line-height: 34px;
								color: #fff;
								font-size: 12px;
								text-align: center;
							}

							.active {
								background: linear-gradient(90.06deg, #ffc24a 1%, #ffc24a 99.95%);
								color: #111222;
							}
						}
					}
				}

				.down {
					width: 10px;
					height: 7px;
				}
			}

			.icon {
				width: 19px;
				height: 23px;
				left: -13px;
				top: 0;
			}
		}

		.inputs {
			width: 325px;
			height: 40px;
			border-radius: 20px;
		}

		.tip {
			width: 100%;
			font-size: 12px;
			font-family: Hiragino Sans GB;
			font-weight: 400;
			color: #db1401;
			line-height: 13px;
			margin: 4px 0 0 0px;
			margin-left: 52px;
		}

		.btn_login {
			width: 325px;
			height: 50px;
			background: linear-gradient(90deg, #ffd37d, #ca962e);
			border-radius: 8px;
			font-size: 16px;
			font-family: Hiragino Sans GB;
			font-weight: 400;
			color: #111;
			line-height: 50px;
			text-align: center;
			margin: auto;
			margin-top: 34px;
		}

		/deep/ .u-input__right-icon {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}

		.getCodeNum {
			font-size: 13px;
			/* width: 90px; */
			height: 30px;
			/* line-height: 30px; */
			border-radius: 15px;
			color: #111;
			text-align: center;
			background: linear-gradient(90deg, #ffd37d, #ca962e);
			max-width: 60%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding: 0 5px;

		}


	}
</style>
