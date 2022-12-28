<template>
	<view class="forgetPwdPage" @click.stop="otherHideAreaBox" style="height: 100%;">
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
								<!-- 	<view class="service">
									<image src="../../static/images/service.png" mode="" class="icon"></image>
								</view> -->
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
		<!-- <view class="line">

		</view> -->
		<view class="box">

			<view class="boxContainer">
				<view class="item" style="color: #333;" v-if="oldPhoneStr">
					+ {{this.oldPhoneStr}}
				</view>
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
				<view class="item" style="padding: 0;">
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
				<view class="btn_login" @click="$u.throttle(updateBtnClick, 1000)">
					{{$t('user.forget.pwd.update.button.text')}}
				</view>
			</view>


			<!-- 	<view class="item">
				<image src="../../static/images/suo.svg" mode="" class="icon"></image>
				<input type="password" style='width:0;height:0;min-height:0' />
				<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
				<u-input type="password" class="forgetPassword_item_input" :placeholder="loginPlace"
					:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="16"
					v-model="oldPwd" @input="inputPassChange" />
			</view>
			<view class="item">
				<image src="../../static/images/suo.svg" mode="" class="icon"></image>
				<input type="password" style='width:0;height:0;min-height:0' />
				<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
				<u-input type="password" class="forgetPassword_item_input" :placeholder="newPassPlace"
					:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="16"
					v-model="newPwd" @input="inputNewPassChange" />
			</view>
			<view class="tip">
				{{newPwdTip}}
			</view>
			<view class="item">
				<image src="../../static/images/suo.svg" mode="" class="icon"></image>
				<input type="password" style='width:0;height:0;min-height:0' />
				<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
				<u-input type="password" class="forgetPassword_item_input" :placeholder="confirmPassPlace"
					:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="16"
					v-model="confirmPwd" @input="inputConfPassChange" />
			</view>
			<view class="tip">
				{{confPwdTip}}
			</view> -->



		</view>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		editPwdPayReq,
		playerInfoReq,
		sysConfigReq,
		phoneCodeReq,
		phoneCodeOnlineReq,
		phoneBindReq,
	} from '../../api/index.js'
	import {
		myMixin,
		addBankMinxi
	} from '@/util/mixins.js'
	// import {mapState,mapMutations} from 'vuex'
	const TIME_COUNT = 59;
	export default {
		data() {
			return {
				navTitle: this.$t('user.security.center.update.phone.text'),
				phonePlace: this.$t('reg.phone.place'),
				newPassPlace: this.$t('user.forget.pwd2.new.password.place.text'),
				confirmPassPlace: this.$t('user.forget.pwd2.confirm.password.place.text'),
				customInputStyle: {
					"min-height": "35px",
					"height": "44px",
					"border-radius": "5px",
					"color": "333",
					"padding-left": "17px"
				},
				placeholderStyle: "color:#506778;font-size:12px",
				oldPwd: '',
				newPwd: '',
				confirmPwd: '',
				changeBtnColorBool: false,
				newPwdTip: '',
				newPwdTipBool: false,
				confPwdTip: '',
				confPwdTipBool: false,
				localLoginToken: '',

				needPaySwitch: 1,
				oldPhoneStr: '',
				codeSmsStr: '',
				codeSmsTip: '',
				codeSmsTipBool: false,
				phoneTip: '',
				phoneTipBool: false,
				defalutCodeTitle: this.$t('user.change.phone.get.code.text'),
				phoneCodePlace: this.$t('user.change.phone.code.place.text'),
				timer: null,
				navTimer: null,
				showAreaBool: false,
				areaList: [],
				currentSelectIndex: '',
				selectAreaNum: '',
				newPhone: '',
				newPhonePlace: this.$t('user.change.phone.new.phone.place.text'),

				urlFromStr: ''
			}
		},
		mixins: [myMixin, addBankMinxi],
		// computed:{
		// 	...mapState(['hasLogin'])
		// },
		// onLoad() {
		// 	// console.log("this.hasLogin",this.hasLogin);
		// 	if(!this.hasLogin){
		// 		uni.reLaunch({
		// 		   url: '../login/login',
		// 		   animationType: 'slide-in-top',
		// 		   animationDuration: 200
		// 		})
		// 	}
		// },
		onShow() {

			// this.localLoginToken = this.$store.state.userInfo.token
			// this.localLoginToken = uni.getStorageSync('footballToken');


			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('eventBindPhoneClick', async (data) => {
				this.urlFromStr = data.from
			})

			// 初始化语言
			this.initLang()

			this.initBasicData()


		},
		onHide() {
			clearInterval(this.timer)
			if (this.navTimer) {
				clearInterval(this.navTimer)
				this.navTimer = null
			}
		},
		methods: {
			// ...mapMutations(['logout']),
			initLang() { //初始化语言

				let langStr = uni.getStorageSync('ft_lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr

				this.navTitle = this.$t('user.security.center.update.phone.text')
				this.loginPlace = this.$t('user.forget.pwd2.login.password.place.text')
				this.newPassPlace = this.$t('user.forget.pwd2.new.password.place.text')
				this.confirmPassPlace = this.$t('user.forget.pwd2.confirm.password.place.text')

			},
			initBasicData() {
				this.getInfoData()

				// this.sysConfigData()
				this.getAreaData()
			},
			async getInfoData() {
				let resR = await playerInfoReq(this.localLoginToken)
				if (resR.code === 200) {
					if (resR.data.phone) {
						this.oldPhoneStr = resR.data.phone
					}
				}
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
			selectAreaClick(item, index) {
				this.showAreaBool = false
				this.currentSelectIndex = index
				this.selectAreaNum = item
			},
			otherHideAreaBox() {
				this.showAreaBool = false

			},
			async sysConfigData() {
				// 
				let resR = await sysConfigReq()
				if (resR.code === 200) {
					// console.log("resR", resR.data);
					if (resR.data) { //1需要,2不需要短信验证码
						this.needPaySwitch = resR.data.edit_pay_pwd
					}
				}
			},
			goBackBtnClick() {


				const queryBindPhoneUrlFrom = uni.getStorageSync('queryBindPhoneUrlFrom') || 'other'
				if (!this.bindPhoneState_Bool) {
					this.urlFromStr = queryBindPhoneUrlFrom
				}

				if (this.urlFromStr === "withdraw") {
					uni.navigateTo({
						url: '/pages/withdraw/index',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (this.urlFromStr === "info") {
					uni.navigateTo({
						url: '/pages/user/info',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (this.urlFromStr === "user") {
					uni.switchTab({
						url: '/pages/user/user',
						animationType: 'slide-in-top',
						animationDuration: 200
					})


				} else if (this.urlFromStr === "matchOrder") {
					uni.navigateTo({
						url: '/pages/match/match_order',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (this.urlFromStr === "bankCardAdd") {
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
				} else if (this.urlFromStr === "usdtAdd") {
					uni.navigateTo({
						url: '/pages/user/usdt_add',
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
			commonRuls() {
				let realRuls = this.newPhone && this.codeSmsStr

				if (realRuls) {
					this.changeBtnColorBool = true
				} else {
					this.changeBtnColorBool = false
				}
			},
			inputPhoneChange() {
				this.commonRuls()
				if (!this.newPhone) {
					this.phoneTip = this.$t('reg.ruls.phone.empty')
					this.phoneTipBool = true
				} else {
					this.phoneTip = ""
					this.phoneTipBool = false
				}
			},
			inputSmsCodeChange() {
				this.commonRuls()
				if (!this.codeSmsStr) {
					this.codeSmsTip = this.$t('backapi.smsCodeIsEmpty')
					this.codeSmsTipBool = true
				} else {
					this.codeSmsTip = ""
					this.codeSmsTipBool = false
				}
			},
			inputNewPassChange() {
				this.commonRuls()

				if (!this.newPwd) {
					this.newPwdTip = this.$t('reg.ruls.pass.empty')
					this.newPwdTipBool = true
				} else if (this.newPwd.length < 6) {
					this.newPwdTip = this.$t('reg.ruls.pass.length')
					this.newPwdTipBool = true
				} else {
					this.newPwdTip = ""
					this.newPwdTipBool = false
				}

			},
			inputConfPassChange() {
				this.commonRuls()

				if (!this.confirmPwd) {
					this.confPwdTip = this.$t('reg.ruls.passtwo.empty')
					this.newPwdTipBool = true
				} else if (this.confirmPwd.length < 6) {
					this.confPwdTip = this.$t('reg.ruls.passtwo.length')
					this.newPwdTipBool = true
				} else if (this.confirmPwd !== this.newPwd) {
					this.confPwdTip = this.$t('reg.ruls.passtwo.unequal')
					this.newPwdTipBool = true
				} else {
					this.confPwdTip = ""
					this.confPwdTipBool = false
				}

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
					this.codeSmsStr = ""
					clearInterval(this.timer);
					this.timer = null;
					uni.showToast({
						title: this.$t('user.change.phone.change.success.text'),
						icon: 'none',
						duration: 1000
					});

					this.navTimer = setTimeout(() => {
						this.goBackBtnClick()
					}, 1002)



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
		height: calc(100vh - 44px);
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

	// .line {
	// 	width: 100%;
	// 	height: 5px;
	// 	background-color: #171e25;
	// 	margin: 5px 0;
	// }


	.box {
		background-color: #fff;
		margin-top: 10px;
		height: 100%;


		.boxContainer {
			padding-top: 5px;
		}
	}

	.item {
		display: flex;
		align-items: center;
		width: 325px;
		height: 45px;
		padding: 0 15px;
		margin-top: 15px;
		margin-left: 25px;
		position: relative;
		background-color: #f8f8f8;
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
				color: #597ef7;
			}

			.phoneBox {
				position: absolute;
				top: 26px;
				left: -15px;
				z-index: 1004;
				width: 70px;
				background: #f8f8f8;
				overflow: hidden;

				.scroll-Y {
					max-height: 250px;

					.phone-content {
						display: flex;
						flex-direction: column;

						.phoneItem {
							display: inline-block;
							line-height: 34px;
							color: #111222;
							font-size: 12px;
							text-align: center;
						}

						.active {
							background: #597ef7;
							color: #fff;
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
		background: #597ef7;
		// border-radius: 8px;
		font-size: 16px;
		font-family: Hiragino Sans GB;
		font-weight: 400;
		color: #fff;
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
		/* height: 30px; */
		width: 35%;
		/* line-height: 30px; */
		color: #fff;
		text-align: center;
		background: #597ef7;
		max-width: 60%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 0 5px;

	}
</style>
