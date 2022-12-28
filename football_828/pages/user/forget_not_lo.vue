<template>
	<view class="forgetPwdPage" @click.stop="otherHideAreaBox" style="height: 100%;">
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
		<view class="line">

		</view>
		<view class="box">



			<view class="item">
				<view class="number">
					<text class="codenumber" @click.stop="showAreaBool = !showAreaBool">+{{selectAreaNum}}</text>
					<view class="phoneBox" :style="!showAreaBool ? 'display:none': null">
						<scroll-view class="scroll-Y" scroll-y>
							<view class="phone-content">
								<view :class="currentSelectIndex === index ? 'phoneItem active' : 'phoneItem'"
									v-for="(item,index) in areaList" :key="index" @click="selectAreaClick(item,index)">
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
				<image src="../../static/images/username.svg" mode="" class="icon"></image>
				<input type="password" style='width:0;height:0;min-height:0' />
				<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
				<u-input type="text" class="forgetPassword_item_input" :placeholder="newUserNamePlace"
					:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="16"
					v-model="newUserName" @input="inputNewUserNameChange" />
			</view>
			<view class="tip">
				{{newUserNameTip}}
			</view>


			<view class="item">
				<!-- <image src="../../static/images/suo.svg" mode="" class="icon"></image> -->
				<input type="password" style='width:0;height:0;min-height:0' />
				<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
				<u-input type="text" :clearable="false" class="forgetPassword_item_input" :placeholder="phoneCodePlace"
					:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="4"
					v-model="codeSmsStr" @input="inputSmsCodeChange" />
				<view class="getCodeNum" @click="getSmsCodeClick">
					{{defalutCodeTitle}}
				</view>
			</view>
			<view class="tip">
				{{codeSmsTip}}
			</view>
			<!-- 	<view class="item">
				<image src="../../static/images/suo.svg" mode="" class="icon"></image>
				<input type="password" style='width:0;height:0;min-height:0' />
				<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
				<u-input type="password" class="forgetPassword_item_input" :placeholder="loginPlace"
					:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="16"
					v-model="oldPwd" @input="inputPassChange" />
			</view> -->
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
			</view>


			<view class="btn_login" @click="updateBtnClick()">
				{{$t('user.forget.pwd.update.button.text')}}
			</view>
		</view>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		phoneChangePwdReq,
		notLoginchangePwd,
		sysConfigReq
	} from '../../api/index.js'
	const TIME_COUNT = 59;
	export default {
		data() {
			return {
				navTitle: this.$t('login.forget2.text'),
				phonePlace: this.$t('reg.phone.place'),
				newPassPlace: this.$t('user.forget.pwd2.new.password.place.text'),
				newUserNamePlace: this.$t('reg.account.place'),
				confirmPassPlace: this.$t('user.forget.pwd2.confirm.password.place.text'),
				customInputStyle: {
					"min-height": "35px",
					"height": "44px",
					"border-radius": "5px",
					"color": "#fff",
					"padding-left": "17px"
				},
				placeholderStyle: "color:#506778;font-size:12px",
				oldPwd: '',
				newPwd: '',
				confirmPwd: '',
				newUserName: '',
				changeBtnColorBool: false,
				newPwdTip: '',
				newPwdTipBool: false,
				newUserNameTip: '',
				newUserNameTipBool: false,
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

				showAreaBool: false,
				areaList: [],
				currentSelectIndex: '',
				selectAreaNum: '',
				newPhone: '',
				newPhonePlace: this.$t('user.change.phone.new.phone.place.text'),

				urlFromStr: ''
			}
		},
		onShow() {

			this.timer = null;

			// 初始化语言
			this.initLang()

			this.initBasicData()


		},
		onHide() {
			clearInterval(this.timer)
		},
		methods: {
			// ...mapMutations(['logout']),
			initLang() { //初始化语言

				let langStr = uni.getStorageSync('ft_lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr

				this.navTitle = this.$t('login.forget2.text')
				this.loginPlace = this.$t('user.forget.pwd2.login.password.place.text')
				this.newPassPlace = this.$t('user.forget.pwd2.new.password.place.text')
				this.newUserNamePlace = this.$t('reg.account.place')
				this.confirmPassPlace = this.$t('user.forget.pwd2.confirm.password.place.text')

			},
			initBasicData() {
				this.getAreaData()
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
				uni.reLaunch({
					url: '/pages/login/login',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
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
			inputNewUserNameChange() {
				if (!this.newUserName) {
					this.newUserNameTip = this.$t('reg.ruls.accout.empty')
					this.newUserNameTipBool = true
				} else {
					this.newUserNameTip = ""
					this.newUserNameTipBool = false
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

				if (!this.newUserName) {

					uni.showToast({
						title: this.$t('reg.account.place'),
						icon: "none",
						duration: 2000
					});

					return false
				}


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

				if (this.confirmPwd !== this.newPwd) {

					uni.showToast({
						title: this.$t('reg.ruls.passtwo.unequal'),
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
				reqParam.newPwd = this.newPwd
				reqParam.twicePwd = this.confirmPwd
				reqParam.username = this.newUserName
				reqParam.code = this.codeSmsStr
				reqParam.areaCode = this.selectAreaNum
				let resR = await phoneChangePwdReq(reqParam, this.localLoginToken)
				if (resR.code === 200) {
					// uni.showToast({
					// 	title: this.$t(`user.forget.pwd.change.pass.success.text`),
					// 	icon: 'none',
					// 	duration: 1000,
					// });
					clearInterval(this.timer);
					this.timer = null;
					uni.reLaunch({
						url: '/pages/login/login',
						animationType: 'pop-in',
						animationDuration: 200
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

				if (!this.newUserName) {

					uni.showToast({
						title: this.$t('reg.account.place'),
						icon: "none",
						duration: 2000
					});

					return false
				}

				if (!this.timer) {
					let reqParams = {}
					reqParams.phone = this.selectAreaNum + this.newPhone
					reqParams.username = this.newUserName
					let resR = await notLoginchangePwd(reqParams, this.localLoginToken)
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
		background-color: #1f252f;
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

	.line {
		width: 100%;
		height: 5px;
		background-color: #171e25;
		margin: 5px 0;
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
			// left: -13px;
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
</style>
