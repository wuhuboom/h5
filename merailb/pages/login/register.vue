<template>
	<view class="regContainer">
		<view class="title">
			{{$t('reg.title')}}
		</view>
		<view class="image_avatar">
			<image src="../../static/images/login2.jpg" mode=""></image>
		</view>
		<view class="content_input">
			<view class="title">
				{{$t('reg.form.account.title')}}
			</view>
			<view class="input-box">
				<input type="text" v-model="regAccount" value="" class="text-df" :placeholder="userplace"
					:placeholder-style="placeStyle" maxlength="20" @input="regDigit(1)" />
			</view>
			<view class="title">
				{{$t('reg.form.phone.title')}}
			</view>
			<view class="input-box">
				<input type="text" v-model="regPhone" value="" class="text-df" placeholder=""
					:placeholder-style="placeStyle" maxlength="20" @input="regDigit(2)" />
			</view>
			<view class="title">
				{{$t('reg.form.password.title')}}
			</view>
			<view class="input-box">
				<input type="text" v-model="regPassword" value="" class="text-df" placeholder=""
					:placeholder-style="placeStyle" maxlength="20" @input="regDigit(3)" />
			</view>
			<view class="title">
				{{$t('reg.form.password.pay.title')}}
			</view>
			<view class="input-box">
				<input type="text" v-model="regPayPwd" value="" class="text-df" :placeholder="pwdpayplace"
					:placeholder-style="placeStyle" disabled="" @click="payPwdClick" maxlength="6" @input="regDigit(4)"
					password />
			</view>
			<view class="title">
				{{$t('reg.form.invite.title')}}
			</view>
			<view class="input-box">
				<input type="text" v-model="regInvite" value="" class="text-df" :placeholder="inviteplace"
					:placeholder-style="placeStyle" maxlength="8" @input="regDigit(5)" />
			</view>

			<view class="regbtn" @click="regBigBtn">
				{{$t('reg.form.regbtn')}}
			</view>

			<view class="loginbtn" @click="loginBigBtn">
				{{$t('reg.form.logbtn')}}
			</view>
		</view>


		<!-- 以下是该组件使用的全部属性 -->
		<best-payment-password ref="paymentPassword" digits="6" @submit="checkConfirmPwd" @cancel="cancelPayPwd()"
			:forget="false"></best-payment-password>



	</view>
</template>

<script>
	import {
		registerReq,
		loginReq
	} from '@/api/index.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import bestPaymentPassword from '../../components/sanshui-payment-password/index.vue'

	export default {
		components: {
			bestPaymentPassword
		},
		data() {
			return {
				placeStyle: 'color:#fff;',
				regAccount: '',
				regPassword: '',
				regPhone: '',
				regPayPwd: '',
				regInvite: '',
				userplace: this.$t('reg.form.account'),
				pwdplace: this.$t('reg.form.password'),
				phoneplace: this.$t('reg.form.phone'),
				pwdpayplace: this.$t('reg.form.password.pay'),
				inviteplace: this.$t('reg.form.invite'),

			}
		},
		onShow() {

			let pagearr = getCurrentPages(); //获取应用页面栈/获取当前打开过的页面路由数组
			let currentPage = pagearr[pagearr.length - 1]; //获取当前页面信息
			let currentPageOptions = currentPage.options ////获取路由参数
			let currentPageRoute = currentPage.route //获取当前页面路由
			// console.log("currentPageOptions",currentPageOptions);
			if (currentPageOptions.length !== 0 && currentPageOptions.hasOwnProperty('code')) {
				this.regInvite = currentPageOptions.code
			}
		},
		mounted() {

		},
		computed: {

		},
		methods: {
			...mapMutations(['login']),
			regDigit(num) {
				if (num === 1) {
					if (this.regAccount.length >= 4 && this.regAccount.length < 21) {

					} else {
						uni.showToast({
							title: this.$t('reg.form.limit.account.length.text'),
							icon: "none",
							duration: 1000
						});
					}
				} else if (num === 2) {
					if (this.regPhone.length <= 20) {

					} else {
						uni.showToast({
							title: this.$t('reg.form.limit.phone.length.text'),
							icon: "none",
							duration: 1000
						});
					}
				} else if (num === 3) {
					if (this.regPassword.length >= 6 && this.regPassword.length < 21) {
						// console.log("密码长度", this.regPassword.length);
					} else {
						uni.showToast({
							title: this.$t('reg.form.limit.pwd.length.text'),
							icon: "none",
							duration: 1000
						});
					}
				} else if (num === 4) {
					if (this.regPayPwd.length < 6) {

					} else {
						uni.showToast({
							title: this.$t('reg.form.limit.paypwd.length.text'),
							icon: "none",
							duration: 1000
						});
					}
				} else if (num === 5) {
					if (this.regInvite.length === 8) {

					} else {
						uni.showToast({
							title: this.$t('reg.form.limit.invite.length.text'),
							icon: "none",
							duration: 1000
						});
					}
				}
			},
			payPwdClick() {
				this.$refs.paymentPassword.modalFun('show');
			},
			checkConfirmPwd(e) { //输入支付密码后
				this.regPayPwd = e.value
			},
			async regBigBtn() {
				if (this.regAccount == "") {
					uni.showToast({
						title: this.$t('reg.form.check.isempty.account'),
						icon: "none",
						duration: 2000
					});
					return false
				}

				if (this.regPassword == "") {
					uni.showToast({
						title: this.$t('reg.form.check.isempty.password'),
						icon: "none",
						duration: 2000
					});
					return false
				}

				if (this.regPayPwd == "") {
					uni.showToast({
						title: this.$t('reg.form.check.isempty.pay.password'),
						icon: "none",
						duration: 2000
					});
					return false
				}


				if (this.regInvite == "") {
					uni.showToast({
						title: this.$t('reg.form.check.isempty.invite'),
						icon: "none",
						duration: 2000
					});
					return false
				}


				let reqParam = {}
				reqParam.username = this.regAccount
				if (this.regPhone) {
					reqParam.phone = this.regPhone
				}
				reqParam.password = this.regPassword
				reqParam.pay_password = this.regPayPwd
				reqParam.invitation_code = this.regInvite

				let resR = await registerReq(reqParam)
				this.currAlterMsg = resR.msg
				if (resR.code === 2000) {

					// 注册成功后主动进行账号登录方法
					this.regSuccessGoToLogin()

					// uni.navigateTo({
					// 	url: "/pages/login/login"
					// })


				} else {
					let currData = resR.data[0]
					// console.log("currData",currData);
					let currMsgKey = currData.msgKey
					// currMsgKey = "backapi."+ currMsgKey
					// this.$refs.uTips.show({
					// 	title: this.$t(`backapi.${currMsgKey}`),
					// 	type: 'error',
					// 	duration: '2000'
					// })
					// uni.showToast({
					// 	icon: 'none',
					// 	title: this.$t('backapi.userNotMatchPhone'),
					// 	duration: 2000,
					// });
				}
			},
			async regSuccessGoToLogin() {
				let reqParam = {}
				reqParam.username = this.regAccount
				reqParam.password = this.regPassword
				let loginRes = await loginReq(reqParam)
				if (loginRes.code === 2000) {
					this.confirmLoginToUser(loginRes.result)
				} else {

				}
			},
			confirmLoginToUser(provider) { //登录成功保存数据并跳转首页
				this.login(provider)
				uni.reLaunch({
					url: '/pages/home/index',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			loginBigBtn() {
				uni.navigateTo({
					url: "/pages/login/login"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: linear-gradient(90deg, #6dcab8, #3a78cb);
	}

	.regContainer {
		padding: 25px;

		.title {
			font-size: 22px;
			text-align: center;
			color: #fff;
		}

		.image_avatar {
			margin-top: 15px;
			text-align: center;

			image {
				width: 80px;
				border-radius: 50rem;
				border: 2px solid rgb(153, 153, 153);
				height: 80px;
			}
		}

		.content_input {
			margin-top: 20px;

			.title {
				margin-top: 20px;
				font-size: 14px;
				color: #fff;
				text-align: left;
			}

			.input-box {
				padding: 15px 0 5px 0;
				color: #eee;
				border-bottom: 1px solid #eee;

				.text-df {
					font-size: 14px;
				}
			}

			.loginbtn,
			.regbtn {
				height: 48px;
				line-height: 48px;
				text-align: center;
				font-size: 16px;
				margin-top: 20px;
				border-radius: 20px;
				background: #56b3f8;
				color: #fff;
				border: 1px solid #56b3f8;
			}

			.loginbtn {
				background: #d2d6dc;
				color: #fff;
				border: 1px solid #d2d6dc;
			}
		}
	}
</style>
