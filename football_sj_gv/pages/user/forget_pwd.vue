<template>
	<view class="forgetPwdPage">
		<uni-nav-bar backgroundColor="#00111C" color="#fff" :statusBar="true" :border="false"
			@clickLeft="goBackBtnClick" style="font-weight: 600;" :fixed="true">
			<block slot="left">
				<view class="navLeftBtn">
					<image src="../../static/images/back.svg" mode=""></image>
				</view>
			</block>

			<view class="navTitleCenter">{{navTitle}}</view>
		</uni-nav-bar>

		<view class="forgetPassword_concontainer">

			<view class="password-tab">
				<view :class="tabIndex === 1 ? 'password-tab-left active-tab' : 'password-tab-left'"
					@click="changeTabClcik">
					{{$t('user.forget.pwd.change.pass.button.text')}}
				</view>
				<view :class="tabIndex === 2 ? 'password-tab-right active-tab':'password-tab-right' "
					@click="forGetTabClcik">
					{{$t('user.forget.pwd.forget.pass.button.text')}}
				</view>
			</view>



			<view class="" style="color: red;font-size: 13px;margin-bottom: 10px;"
				v-if="tabIndex === 2 && showTipForget">
				{{$t('user.forget.pwd.forget.tip.text')}}
			</view>

			<view class="forgetPassword_item" v-if="tabIndex === 2 && oldPhoneStr && !showTipForget">
				<view class="forgetPassword_item_title">
					{{$t('user.change.phone.old.phone.text')}}
				</view>
				<u-input type="text" disabled class="forgetPassword_item_input" :placeholder="loginPlace"
					:custom-style="customInputStyle" maxlength="16" v-model="oldPhoneStr" />
			</view>

			<!-- 	<view class="forgetPassword_item" v-if="tabIndex === 2 && !showTipForget">>
				<view class="forgetPassword_item_title">
					{{$t('user.account.str')}}
				</view>
				<input type="password" style='width:0;height:0;min-height:0' />
				<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
				<u-input type="text" class="forgetPassword_item_input" :placeholder="newUserNamePlace"
					:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="16"
					v-model="newUserName" @input="inputNewUserNameChange" />
			</view>
			<view class="errorTip">
				{{newUserNameTip}}
			</view> -->
			<view class="forgetPassword_item codeview" v-if="tabIndex === 2 && !showTipForget">
				<view class="forgetPassword_item_title">
					{{$t('user.change.phone.code.text')}}
				</view>
				<input type="password" style='width:0;height:0;min-height:0' />
				<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
				<u-input type="text" :clearable="false" class="forgetPassword_item_input" :placeholder="phoneCodePlace"
					:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="4"
					v-model="codeSmsStr" @input="inputSmsCodeChange" />
				<view class="get_code_sms" @click="getSmsCodeClick">
					{{defalutCodeTitle}}
				</view>
			</view>
			<view class="errorTip">
				{{codeSmsTip}}
			</view>


			<view class="forgetPassword_item" v-if="tabIndex === 1">
				<view class="forgetPassword_item_title">
					{{$t('user.forget.pwd.login.password.text')}}
				</view>
				<input type="password" style='width:0;height:0;min-height:0' />
				<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
				<u-input type="password" class="forgetPassword_item_input" :placeholder="loginPlace"
					:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="16"
					v-model="oldPwd" @input="inputPassChange" />
			</view>

			<view class="forgetPassword_item" v-if="!showTipForget">
				<view class="forgetPassword_item_title">
					{{$t('user.forget.pwd.new.password.text')}}
				</view>
				<input type="password" style='width:0;height:0;min-height:0' />
				<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
				<u-input type="password" class="forgetPassword_item_input" :placeholder="newPassPlace"
					:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="16"
					v-model="newPwd" @input="inputNewPassChange" />
			</view>
			<view class="errorTip">
				{{newPwdTip}}
			</view>
			<view class="forgetPassword_item" v-if="!showTipForget">
				<view class="forgetPassword_item_title">
					{{$t('user.forget.pwd.confirm.password.text')}}
				</view>
				<u-input type="password" class="forgetPassword_item_input" :placeholder="confirmPassPlace"
					:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="16"
					v-model="confirmPwd" @input="inputConfPassChange" />
			</view>
			<view class="errorTip">
				{{confPwdTip}}
			</view>


			<view v-if="!showTipForget" :class="changeBtnColorBool ?'loginBtn active': 'loginBtn'"
				@click="changeBtnColorBool && updateBtnClick()">
				{{$t('user.forget.pwd.update.button.text')}}
			</view>
		</view>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		editPwdReq,
		playerInfoReq,
		changePwdOnlineReq,
		phoneCodeOnlineReq
	} from '../../api/index.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	// import {mapState,mapMutations} from 'vuex'
	const TIME_COUNT = 59;
	export default {
		data() {
			return {
				navTitle: this.$t('user.forget.pwd.title.text'),
				loginPlace: this.$t('user.forget.pwd.login.password.place.text'),
				newPassPlace: this.$t('user.forget.pwd.new.password.place.text'),
				newUserNamePlace: this.$t('reg.account.place'),
				confirmPassPlace: this.$t('user.forget.pwd.confirm.password.place.text'),
				customInputStyle: {
					"min-height": "35px",
					"height": "44px",
					"background-color": "rgb(51, 71, 86)",
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
				tabIndex: 1,
				oldPhoneStr: '',
				timer: null,
				codeSmsStr: '',
				codeSmsTip: '',
				codeSmsTipBool: false,
				defalutCodeTitle: this.$t('user.change.phone.get.code.text'),
				phoneCodePlace: this.$t('user.change.phone.get.code.text'),
				showTipForget: false,
			}
		},
		mixins: [myMixin],
		// computed:{
		// 	...mapState(['hasLogin'])
		// },
		// onLoad() {
		// 	// console.log("this.hasLogin",this.hasLogin);
		// 	if(!this.hasLogin){
		// 		uni.reLaunch({
		// 		   url: '../login/login',
		// 		   animationType: 'pop-in',
		// 		   animationDuration: 200
		// 		})
		// 	}
		// },
		onShow() {

			// this.localLoginToken = this.$store.state.userInfo.token
			// this.localLoginToken = uni.getStorageSync('footballToken');

			// 初始化语言
			this.initLang()


		},
		onHide() {
			clearInterval(this.timer)
		},
		methods: {
			// ...mapMutations(['logout']),
			initLang() { //初始化语言

				let langStr = uni.getStorageSync('lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr

				this.navTitle = this.$t('user.forget.pwd.title.text')
				this.loginPlace = this.$t('user.forget.pwd.login.password.place.text')
				this.newPassPlace = this.$t('user.forget.pwd.new.password.place.text')
				this.newUserNamePlace = this.$t('reg.account.place')
				this.confirmPassPlace = this.$t('user.forget.pwd.confirm.password.place.text')
				this.defalutCodeTitle = this.$t('user.change.phone.get.code.text')
				this.phoneCodePlace = this.$t('user.change.phone.get.code.text')

			},
			async initData() {

				this.codeSmsStr = ""
				let resR = await playerInfoReq(this.localLoginToken)
				// console.log("res", resR.data.phone);
				if (resR.code === 200) {
					if (resR.data.phone) {
						this.oldPhoneStr = resR.data.phone
						this.showTipForget = false
					} else {
						this.showTipForget = true
					}
				} else {

				}
			},
			goBackBtnClick() {
				uni.navigateTo({
					url: '/pages/user/securityCenter',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			commonRuls() {

				if (this.tabIndex === 1) {
					if (this.oldPwd && this.newPwd && this.confirmPwd) {
						this.changeBtnColorBool = true
					} else {
						this.changeBtnColorBool = false
					}
				} else if (this.tabIndex === 2) {
					// && this.newUserName
					if (this.codeSmsStr && this.newPwd && this.confirmPwd) {
						this.changeBtnColorBool = true
					} else {
						this.changeBtnColorBool = false
					}
				}


			},
			inputPassChange() {
				this.commonRuls()
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

				if (this.tabIndex === 1) {
					if (!this.oldPwd) {
						uni.showToast({
							title: this.$t('user.forget.pwd.login.password.place.text'),
							icon: "none",
							duration: 2000
						});
						return false
					}
				} else if (this.tabIndex === 2) {
					if (!this.codeSmsStr) {
						uni.showToast({
							title: this.$t('backapi.smsCodeIsEmpty'),
							icon: "none",
							duration: 2000
						});
						return false
					}

					// if (!this.newUserName) {

					// 	uni.showToast({
					// 		title: this.$t('reg.account.place'),
					// 		icon: "none",
					// 		duration: 2000
					// 	});

					// 	return false
					// }
				}



				if (!this.newPwd) {

					uni.showToast({
						title: this.$t('user.forget.pwd.new.password.place.text'),
						icon: "none",
						duration: 2000
					});

					return false
				}

				if (!this.confirmPwd) {

					uni.showToast({
						title: this.$t('user.forget.pwd.confirm.password.place.text'),
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

				let reqParam = {}
				if (this.tabIndex === 1) {
					reqParam.origin = this.oldPwd
					reqParam.newpwd = this.newPwd
					reqParam.confirmed = this.confirmPwd
				} else if (this.tabIndex === 2) {
					// reqParam.username = this.newUserName
					reqParam.phone = this.oldPhoneStr
					reqParam.code = this.codeSmsStr
					reqParam.newPwd = this.newPwd
					reqParam.twicePwd = this.confirmPwd
				}

				let resR
				if (this.tabIndex === 1) {
					resR = await editPwdReq(reqParam, this.localLoginToken)
				} else if (this.tabIndex === 2) {
					resR = await changePwdOnlineReq(reqParam, this.localLoginToken)
				}

				if (resR.code === 200) {
					this.logout()
					uni.reLaunch({
						url: '/pages/login/login',
						animationType: 'pop-in',
						animationDuration: 200
					});
					// uni.showToast({
					// 	title: this.$t(`user.forget.pwd.change.pass.success.text`),
					// 	icon: 'none',
					// 	duration: 2000,
					// });

				} else if (resR.code === 402 || resR.code === 403) {
					// this.logout()
					// uni.reLaunch({
					// 	url: '/pages/login/login',
					// 	animationType: 'pop-in',
					// 	animationDuration: 200
					// });
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
			forGetTabClcik() {
				this.changeBtnColorBool = false
				this.tabIndex = 2
				// 初始化数据
				this.initData()
				this.commonRuls()
			},
			changeTabClcik() {
				this.changeBtnColorBool = false
				this.showTipForget = false
				this.tabIndex = 1
				this.commonRuls()
			},
			async getSmsCodeClick() {
				if (!this.oldPhoneStr) {
					uni.showToast({
						icon: 'none',
						title: this.$t('user.security.center.rule.phone.not.empty.text'),
					});
					return false
				}

				// if (!this.newUserName) {

				// 	uni.showToast({
				// 		title: this.$t('reg.account.place'),
				// 		icon: "none",
				// 		duration: 2000
				// 	});

				// 	return false
				// }

				if (!this.timer) {
					let reqParams = {}
					reqParams.phone = this.oldPhoneStr
					// reqParams.username = this.newUserName
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


			},
		}
	}
</script>

<style>
	page {
		background-color: #071a28;
	}

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


	.forgetPwdPage {
		padding-bottom: 20px;
	}

	.forgetPassword_concontainer {
		width: 90%;
		margin: auto;
		margin-top: 34px;
	}


	.password-tab {
		display: flex;
		justify-content: space-between;
		font-size: 15px;
		margin: 20px 0;
		color: #FFFFFF;
	}

	.password-tab-left {
		flex: 1;
		text-align: center;
		box-sizing: border-box;
		font-size: 12px;
		font-weight: 400;
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 35px;
		background: #334756;
		color: #fff;
		padding: 0 1px;
		border-radius: 5px 0 0 5px;
	}

	.password-tab-right {
		flex: 1;
		text-align: center;
		box-sizing: border-box;
		font-size: 12px;
		font-weight: 400;
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 35px;
		background: #334756;
		color: #fff;
		padding: 0 1px;
		border-radius: 0 5px 5px 0;
	}

	.active-tab {
		background: #3d8dfe;
		color: #fff;
	}

	.forgetPassword_item {
		align-items: center;
		border-radius: 2px;
	}

	.codeview {

		position: relative;
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
		margin-bottom: 12px;
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
		margin-bottom: 20px;
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
		margin-top: 40px;
	}

	.active {
		background: #3d8dfe;
	}
</style>
