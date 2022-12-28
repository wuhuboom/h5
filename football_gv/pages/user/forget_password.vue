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

			<view class="forgetPassword_item">
				<view class="forgetPassword_item_title">
					{{$t('user.security.center.bind.phone.password.text')}}
				</view>
				<view class="phoneViewArea">
					<view class="areaView" @click="areaSelectClick">
						<text style="color: #3d8dfe;margin-right:5px;">+{{selectAreaNum}}</text>
						<u-icon name="arrow-down-fill" color="#3d8dfe" size="22"></u-icon>
					</view>
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<u-input type="number" class="forgetPassword_item_input phoneView" :clearable="false"
						:placeholder="newPhonePlace" :custom-style="customPhoneInputStyle"
						:placeholder-style="placeholderStyle" maxlength="16" v-model="newPhone"
						@input="inputNeedPhoneChange" />


				</view>

			</view>
			<view class="errorTip">
				{{newPhoneTip}}
			</view>
			<view class="forgetPassword_item" v-if="tabIndex === 2 && !showTipForget">>
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
			</view>
			<view class="forgetPassword_item codeview">
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

			<view class="forgetPassword_item">
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
			<view class="forgetPassword_item">
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

		<u-popup class="dialog" v-model="showAreaBool" mode="bottom" border-radius="54"
			:mask-custom-style="maskCustomStyle" :custom-style="popCustomStyle" @open="popOpen" @close="popClose">
			<view class="dialogMain">
				<view class="dialogTitle">
					<view class="dialogLine">

					</view>
				</view>
				<view class="dialogContent">
					<view class="dialogContentList">
						<view
							:class="currentSelectIndex === index ? 'dialogContentListCellActive': 'dialogContentListCell'"
							v-for="(item,index) in areaList" :key="index" @click="selectAreaClick(item,index)">
							{{item}}
						</view>
					</view>
				</view>
			</view>
		</u-popup>

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
				customPhoneInputStyle: {
					"min-height": "35px",
					"height": "44px",
					"background-color": "rgb(51, 71, 86)",
					"border-radius": "5px",
					"color": "#fff",
					"padding-left": "75px"
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
				tabIndex: 2,
				oldPhoneStr: '',
				timer: null,
				codeSmsStr: '',
				codeSmsTip: '',
				codeSmsTipBool: false,
				defalutCodeTitle: this.$t('user.change.phone.get.code.text'),
				phoneCodePlace: this.$t('user.change.phone.get.code.text'),
				showTipForget: false,
				newPhone: '',
				newPhoneTip: '',
				newPhoneTipBool: false,
				newPhonePlace: this.$t('user.change.phone.new.phone.place.text'),

				showAreaBool: false,
				maskCustomStyle: {
					'background-color': 'rgba(0, 17, 28, 0.45)'
				},
				popCustomStyle: {
					'background': 'transparent',
				},
				areaList: [],
				currentSelectIndex: '',
				selectAreaNum: ''
			}
		},
		onShow() {
			// 初始化语言
			this.initLang()

			//获取区号列表
			this.getAreaData()
		},
		onHide() {
			clearInterval(this.timer)
		},
		methods: {
			initLang() { //初始化语言

				let langStr = uni.getStorageSync('foot_lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr

				this.navTitle = this.$t('login.forget2.text')
				this.loginPlace = this.$t('user.forget.pwd.login.password.place.text')
				this.newPassPlace = this.$t('user.forget.pwd.new.password.place.text')
				this.newUserNamePlace = this.$t('reg.account.place')
				this.confirmPassPlace = this.$t('user.forget.pwd.confirm.password.place.text')
				this.defalutCodeTitle = this.$t('user.change.phone.get.code.text')
				this.phoneCodePlace = this.$t('user.change.phone.get.code.text')

				this.newPhonePlace = this.$t('user.change.phone.new.phone.place.text')

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
			goBackBtnClick() {
				uni.reLaunch({
					url: '/pages/login/login',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			commonRuls() {

				if (this.codeSmsStr && this.newPwd && this.confirmPwd && this.newPhone && this.newUserName) {
					this.changeBtnColorBool = true
				} else {
					this.changeBtnColorBool = false
				}


			},
			inputPassChange() {
				this.commonRuls()
			},
			inputNeedPhoneChange() {
				this.commonRuls()
				if (!this.newPhone) {
					this.newPhoneTip = this.$t('reg.ruls.phone.empty')
					this.newPhoneTipBool = true
				} else {
					this.newPhoneTip = ""
					this.newPhoneTipBool = false
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

				if (!this.newUserName) {

					uni.showToast({
						title: this.$t('reg.account.place'),
						icon: "none",
						duration: 2000
					});

					return false
				}

				if (!this.codeSmsStr) {
					uni.showToast({
						title: this.$t('backapi.smsCodeIsEmpty'),
						icon: "none",
						duration: 2000
					});
					return false
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

				if (!this.selectAreaNum) {

					return false
				}

				let reqParam = {}
				reqParam.phone = this.selectAreaNum + this.newPhone
				reqParam.username = this.newUserName
				reqParam.code = this.codeSmsStr
				reqParam.newPwd = this.newPwd
				reqParam.twicePwd = this.confirmPwd
				reqParam.areaCode = this.selectAreaNum

				let resR = await phoneChangePwdReq(reqParam, this.localLoginToken)
				if (resR.code === 200) {
					clearInterval(this.timer);
					this.timer = null;
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
			areaSelectClick() {
				this.showAreaBool = true
			},
			selectAreaClick(item, index) {
				this.showAreaBool = false
				this.currentSelectIndex = index
				this.selectAreaNum = item
			},
			popOpen() {
				this.showAreaBool = true
			},
			popClose() {
				this.showAreaBool = false
			}
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


	.dialog {
		z-index: 10;
	}


	.dialogMain {
		background-color: #132736;
		height: 350px;
		/* overflow-y: scroll; */
	}


	.dialogTitle {
		width: 100%;
		margin: 0 auto;
		/* border-bottom: 1px solid #10222f; */
	}


	.dialogLine {
		height: 5px;
		background: #fff;
		border-radius: 2px;
		width: 82px;
		margin: 10px auto;
		margin-bottom: 5px;
	}

	.dialogContent {
		margin-top: 10px;
		/* padding: 2px 0 2px 18px; */
		padding: 2px 10px;
	}

	.dialogContentList {
		display: flex;
		justify-content: left;
		/* flex-wrap: wrap; */
		flex-flow: row wrap;
		padding-bottom: 52px;
		width: 100%;


		/* grid-template-columns: repeat(auto-fill, 30%); */
		/* grid-template-columns: 1fr 1fr 1fr; */
		/* display: grid;
	grid-template-columns: repeat(3, 31.33%);
	grid-gap: 0 10px; */
	}

	.dialogContentListCell {
		/* 	grid-column-start: 1;
		grid-column-end: 3; */
		margin-top: 10px;
		/* width: 30%; */
		min-height: 24px;
		text-align: center;
		font-size: 12px;
		font-weight: 500;
		color: #fff;
		background: #334756;
		border-radius: 5px;
		/* margin-right: 11px; */
		/* margin:3px; */
		display: flex;
		/* width: 32.33%; */
		margin-right: 0.08rem;
		align-items: center;
		justify-content: center;
		padding: 3px 0;
		/* flex:1; */
		/* flex: 1 1 33.33%; */
		flex: 0 0 32.33%;
		margin-right: 1%;

	}

	.dialogContentListCellActive {
		/* 	grid-column-start: 1;
		grid-column-end: 3; */
		background: #3d8dfe;
		margin-top: 10px;
		/* width: 30%; */
		min-height: 24px;
		text-align: center;
		font-size: 12px;
		font-weight: 500;
		color: #fff;
		border-radius: 5px;
		/* margin-right: 11px; */
		/* margin:3px; */
		display: flex;
		/* width: 32.33%; */
		margin-right: 0.08rem;
		align-items: center;
		justify-content: center;
		padding: 3px 0;
		/* flex:1; */
		/* flex: 1 1 33.33%; */
		flex: 0 0 32.33%;
		margin-right: 1%;
	}

	.dialogContentListCell:nth-child(3n) {
		margin-right: 0
	}

	.dialogContentListCell:nth-child(3n+1) {
		margin-left: 0.5%;
	}

	.dialogContentListCellActive:nth-child(3n) {
		margin-right: 0
	}

	.dialogContentListCellActive:nth-child(3n+1) {
		margin-left: 0.5%;
	}

	/deep/ .u-drawer-bottom {
		background-color: #132736;
	}
</style>
