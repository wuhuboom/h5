<template>
	<view class="forgetPwdPage">
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
				<image src="../../static/images/suo.svg" mode="" class="icon"></image>
				<input type="password" style='width:0;height:0;min-height:0' />
				<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
				<u-input type="password" class="inputs" :placeholder="loginPlace" :custom-style="customInputStyle"
					:placeholder-style="placeholderStyle" maxlength="16" v-model="oldPwd" @input="inputPassChange" />
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
			</view>
		</view>
		<view class="btn_login" @click=" updateBtnClick()">
			{{$t('user.forget.pwd.update.button.text')}}
		</view>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		editPwdReq,
	} from '../../api/index.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	// import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				navTitle: this.$t('user.forget.pwd.title.text'),
				loginPlace: this.$t('user.forget.pwd.login.password.place.text'),
				newPassPlace: this.$t('user.forget.pwd.new.password.place.text'),
				confirmPassPlace: this.$t('user.forget.pwd.confirm.password.place.text'),
				customInputStyle: {
					"min-height": "35px",
					"height": "40px",
					"border-radius": "5px",
					"color": "#fff",
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
		// 		   animationType: 'slide-in-top',
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
		methods: {
			// ...mapMutations(['logout']),
			initLang() { //初始化语言

				let langStr = uni.getStorageSync('ft_lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr

				this.navTitle = this.$t('user.forget.pwd.title.text')
				this.loginPlace = this.$t('user.forget.pwd.login.password.place.text')
				this.newPassPlace = this.$t('user.forget.pwd.new.password.place.text')
				this.confirmPassPlace = this.$t('user.forget.pwd.confirm.password.place.text')

			},
			goBackBtnClick() {
				uni.navigateTo({
					url: '/pages/user/securityCenter',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			commonRuls() {
				if (this.oldPwd && this.newPwd && this.confirmPwd) {
					this.changeBtnColorBool = true
				} else {
					this.changeBtnColorBool = false
				}
			},
			inputPassChange() {
				this.commonRuls()
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

				if (!this.oldPwd) {

					uni.showToast({
						title: this.$t('user.forget.pwd.login.password.place.text'),
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

				let reqParam = {}
				reqParam.origin = this.oldPwd
				reqParam.newpwd = this.newPwd
				reqParam.confirmed = this.confirmPwd

				let resR = await editPwdReq(reqParam, this.localLoginToken)
				if (resR.code === 200) {
					this.logout()
					uni.reLaunch({
						url: '/pages/login/login',
						animationType: 'slide-in-top',
						animationDuration: 200
					});
				} else if (resR.code === 402 || resR.code === 403) {
					// this.logout()
					// uni.reLaunch({
					// 	url: '/pages/login/login',
					// 	animationType: 'slide-in-top',
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
			}
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
		padding: 0 25px;
		margin-top: 15px;
		margin-left: 25px;
		position: relative;
		background-color: #171e25;
		border-radius: 5px;

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
		background: linear-gradient(90deg,#ffd37d,#ca962e);
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
</style>
