<template>
	<view class="page-layout">

		<!-- <u-navbar ></u-navbar> -->
		<u-navbar :is-back="!loginStatus" back-icon-size="40" title="" :background="backgroundOBj"
			:border-bottom="false" z-index="1200" back-icon-color="#fff" title-color="#fff" :title="navTitle"
			:custom-back="changeLoginRegView">
			<!-- <view class="slot-left">
				<u-icon name="arrow-left" color="#fff"></u-icon>
			</view>
			<view class="navBarUV">

				<view class="slot-wrap">
					{{navTitle}}
				</view>
			</view> -->
		</u-navbar>

		<view class="bjImg">
			<image src="../../static/images/loginBg.png" mode="" style="width: 100%;height: 264px;"></image>
		</view>

		<view class="mainContainer">
			<view class="inputItem">
				<view class="top">
					<view class="iconImg">
						<image src="../../static/images/user.png" mode=""></image>
					</view>
					<view class="content">
						<input type="text" value="" maxlength="20" :placeholder="$t('login.account.place')"
							v-model="loginAccount" @input="loginAccoutChangeInput"
							:placeholder-style="placeHolderInputStyle" />
					</view>
				</view>
				<view class="center" v-if="usernameAlterTipBool">
					{{usernameAlterTip}}
				</view>
				<view class="line">

				</view>
			</view>

			<view class="inputItem" style="margin-top: 20px;">
				<view class="top">
					<view class="iconImg">
						<image src="../../static/images/password.png" mode=""></image>
					</view>
					<view class="content">
						<input type="pass" value="" :placeholder="$t('login.pass.place')" :password="passwordBool"
							maxlength="20" v-model="loginPassword" @input="loginPassChangeInput"
							:placeholder-style="placeHolderInputStyle" />
						<view class="hidePassImg" @click="loginSeePassClick('login')">
							<image :src="srcImg" mode=""></image>
						</view>
					</view>
				</view>
				<view class="center" v-if="passwordAlterTipBool">
					{{passwordAlterTip}}
				</view>
				<view class="line">

				</view>
			</view>


			<view class="inputItem" style="margin-top: 20px;" v-if="!loginStatus">
				<view class="top">
					<view class="iconImg">
						<image src="../../static/images/iphone.png" mode=""></image>
					</view>
					<view class="content">
						<input type="text" value="" :placeholder="$t('reg.invitecode.place')" maxlength="6"
							v-model="inviteNum" @input="loginInvChangeInput"
							:placeholder-style="placeHolderInputStyle" />
					</view>
				</view>
				<view class="center" v-if="intiveAlterTipBool">
					{{intiveAlterTip}}
				</view>
				<view class="line">

				</view>
			</view>

			<view class="inputItem" style="margin-top: 20px;">
				<view class="top">
					<view class="iconImg">
						<image src="../../static/images/code.png" mode=""></image>
					</view>
					<view class="content">
						<input type="text" value="" :placeholder="$t('login.vercode.place')" maxlength="4"
							v-model="loginVercode" @input="loginVerChangeInput"
							:placeholder-style="placeHolderInputStyle" />
					</view>
					<view class="codeimg" @click="getCodeData">
						<image :src="vercodeImg" mode=""></image>
					</view>
				</view>
				<view class="center" v-if="codeAlterTipBool">
					{{codeAlterTip}}
				</view>
				<view class="line">

				</view>
			</view>

		</view>


		<view class="postBtn" @click="$u.throttle(loginRegfBigBtn, 500)">
			{{ loginStatus ? $t('login.btntitle') : $t('reg.btntitle')}}
		</view>

		<view class="loginTips" v-if="loginStatus">
			<text class="text" @click="changeLoginRegView">{{$t('reg.btntitle')}}</text>
		</view>

		<u-top-tips ref="uTips" :navbar-height="statusBarHeight + navbarHeight" z-index="1200"></u-top-tips>

	</view>
</template>
<script>
	import {
		loginReq,
		registerReq,
		generateCaptchaReq,
	} from '../../api/index.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {
		changeTitleMixin,
	} from '../../util/mixins.js'
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	// import { setClipboardData, getClipboardData } from '@/uni_modules/u-clipboard/js_sdk'
	export default {
		mixins: [changeTitleMixin],
		data() {
			return {
				changeRegBtnColor: false,
				// 状态栏高度，H5中，此值为0，因为H5不可操作状态栏
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
				// 导航栏内容区域高度，不包括状态栏高度在内
				navbarHeight: 0,

				navTitle: this.$t('login.btntitle'),
				backgroundOBj: {
					"background": "transparent"
				},
				placeHolderInputStyle: "color:#c5c5c5;font-size:14px",
				usernameAlterTip: '',
				usernameAlterTipBool: false,
				passwordAlterTip: '',
				passwordAlterTipBool: false,
				intiveAlterTip: '',
				intiveAlterTipBool: false,
				codeAlterTip: '',
				codeAlterTipBool: false,
				loginAccount: '',
				loginPassword: '',
				loginVercode: '',
				loginVercodehash: '',
				inviteNum: '',



				vercodeImg: 'null',
				loginStatus: true,

				defaultLogo: '',
				srcImg: '../../static/images/nosee.png',
				srcRegImg: '../../static/images/nosee.png',
				srcConfImg: '../../static/images/nosee.png',
				passwordBool: true,
				passwordRegBool: true,
				passwordConfirmBool: true,

				currSelectLang: 'EN',
				langList: [{
						lang: "EN",
						type: "EN",
						status: 1,
					},
					// {
					// 	lang: "CN",
					// 	type: "CN",
					// 	status: 0,
					// },
				],
				currAlterMsg: '',

			}
		},
		computed: {
			...mapState(['hasLogin'])
		},

		onLoad() {
			// this.getCodeData();
		},
		mounted() {

		},

		onShow() {

			let dateStr = "?t=" + new Date().getTime();
			this.defaultLogo = '../../static/images/logo3.svg' + dateStr
			// 初始化语言
			this.initLang()
			//初始化验证码
			this.getCodeData();
			// 获取URL链接是存在邀请码code
			this.getURlParam()
		},
		onHide() {
			clearInterval(this.timer)
		},
		methods: {
			...mapMutations(['login']),
			initLang() { //初始化语言

				let saveLangStr = (uni.getStorageSync('run_lang') ? uni.getStorageSync('run_lang') : 'en').toUpperCase()

				if (saveLangStr !== 'CN') {
					this.currSelectLang = saveLangStr
				} else {
					this.currSelectLang = ""
				}

				this.$i18n.locale = saveLangStr.toLowerCase()


			},
			getURlParam() {
				let pagearr = getCurrentPages(); //获取应用页面栈/获取当前打开过的页面路由数组
				let currentPage = pagearr[pagearr.length - 1]; //获取当前页面信息
				let currentPageOptions = currentPage.options ////获取路由参数
				let currentPageRoute = currentPage.route //获取当前页面路由
				// console.log("currentPageOptions",currentPageOptions);

				if (currentPageOptions.length !== 0 && currentPageOptions.hasOwnProperty('ojbk')) {

					if (currentPageOptions.hasOwnProperty('lang')) {
						console.log("HACK2!");
						this.$i18n.locale = currentPageOptions.lang.toLowerCase();
						uni.setStorageSync('run_lang', this.$i18n.locale)
						this.currSelectLang = currentPageOptions.lang.toUpperCase()
					} else {
						this.loginStatus = true
						console.log("HACK!");
						uni.setStorageSync('run_lang', 'cn')
						this.initLang()
					}

				}

				if (currentPageOptions.length !== 0 && currentPageOptions.hasOwnProperty('code') && currentPageOptions
					.code) {
					this.inviteNum = currentPageOptions.code
					this.loginStatus = false
				}


			},
			loginSeePassClick(str) { //显示密码和隐藏密码(3个共用)
				let imgLeftName = "../../static/images/see.png"
				let imgRightName = "../../static/images/nosee.png"
				switch (str) {
					case 'login': //登录页面中密码的显示
						//如果为真，则代表现在密码是隐藏状态,需改变图片为开眼状态
						this.srcImg = this.passwordBool ? imgLeftName : imgRightName
						this.passwordBool = !this.passwordBool;
						break;
					case 'reg': //注册页面中密码的显示
						this.srcRegImg = this.passwordRegBool ? imgLeftName : imgRightName
						this.passwordRegBool = !this.passwordRegBool;
						break;
					case 'regConf': //注册页面中确认密码的显示
						this.srcConfImg = this.passwordConfirmBool ? imgLeftName : imgRightName
						this.passwordConfirmBool = !this.passwordConfirmBool;
						break;
					default:

				}
			},
			loginAccoutChangeInput() {
				this.commonRuls()
				if (!this.loginAccount) {
					this.usernameAlterTip = this.$t('reg.ruls.accout.empty')
					this.usernameAlterTipBool = true
				} else if (this.loginAccount.length < 6) {
					this.usernameAlterTip = this.$t('reg.ruls.accout.length')
					this.usernameAlterTipBool = true
				} else {
					this.usernameAlterTip = ""
					this.usernameAlterTipBool = false
				}

			},
			loginPassChangeInput() {
				this.commonRuls()
				if (!this.loginPassword) {
					this.passwordAlterTip = this.$t('reg.ruls.pass.empty')
					this.passwordAlterTipBool = true
				} else if (this.loginPassword.length < 6) {
					this.passwordAlterTip = this.$t('reg.ruls.pass.length')
					this.passwordAlterTipBool = true
				} else {
					this.passwordAlterTip = ""
					this.passwordAlterTipBool = false
				}

			},
			loginInvChangeInput() {
				this.commonRuls()
				if (!this.inviteNum) {
					this.intiveAlterTip = this.$t('reg.ruls.invite.empty')
					this.intiveAlterTipBool = true
				} else {
					this.intiveAlterTip = ""
					this.intiveAlterTipBool = false
				}

			},
			loginVerChangeInput() {
				this.commonRuls()
				if (!this.loginVercode) {
					this.codeAlterTip = this.$t('reg.ruls.vercode.empty')
					this.codeAlterTipBool = true
				} else {
					this.codeAlterTip = ""
					this.codeAlterTipBool = false
				}

				// else if (this.regImgCode && this.regImgCode.length === 4) { // 检验验证码
				// 	let resR = await verifyCodeCheckReq(this.loginVercodehash, this.regImgCode)
				// 	// console.log("resR",resR);
				// 	if (resR.code !== 200) {
				// 		this.verAlterTipBool = true
				// 		this.verAlterTip = resR.msg
				// 	} else {
				// 		this.verAlterTipBool = false
				// 		this.verAlterTip = ""
				// 	}

				// } else {
				// 	this.verAlterTipBool = false
				// 	this.verAlterTip = ""
				// }

			},
			commonRuls() {

				if (this.loginAccount && this.loginPassword && this.loginVercode) {
					this.changeRegBtnColor = true
				} else {
					this.changeRegBtnColor = false
				}

			},
			async loginRegfBigBtn() { //注册点击事件
				// console.log("111");
				if (this.loginStatus) { //点击登录页面中登录按钮

					// this.$refs.loading.showLoading() // 显示
					// uni.showLoading({
					// 	title: 'login...',
					// })

					// if (this.loginAccount == "") {

					// 	uni.showToast({
					// 		title: this.$t('login.ruls.accout.empty'),
					// 		icon: "none",
					// 		duration: 2000
					// 	});

					// 	return false
					// }

					// if (this.loginPassword == "") {

					// 	uni.showToast({
					// 		title: this.$t('login.ruls.pass.empty'),
					// 		icon: "none",
					// 		duration: 2000
					// 	});

					// 	return false
					// }


					// if (this.loginVercode == "") {
					// 	this.codeAlterTip = this.$t('reg.ruls.vercode.empty')
					// 	this.codeAlterTipBool = true
					// 	uni.showToast({
					// 		title: this.$t('login.ruls.vercode.empty'),
					// 		icon: "none",
					// 		duration: 2000
					// 	});

					// 	return false
					// }

					let accout_bool_v = this.checkParamEmpty(this.loginAccount, "account")
					let pass_bool_v = this.checkParamEmpty(this.loginPassword, "password")
					let verc_bool_v = this.checkParamEmpty(this.loginVercode, "code")

					if (accout_bool_v && pass_bool_v && verc_bool_v && this.loginVercodehash) {
						let reqParam = {}
						reqParam.username = this.loginAccount
						reqParam.password = this.loginPassword
						let valueCode = this.loginVercode.replace(/\ +/g, "");
						reqParam.value = valueCode
						reqParam.id = this.loginVercodehash

						let loginRes = await loginReq(reqParam)

						this.currAlterMsg = loginRes.msg
						// this.$refs.loading.hideLoading() // 隐藏
						// console.log("loginRes",loginRes);
						this.loginVercode = ""
						this.loginVercodehash = ""
						if (loginRes.code === 200) {
							this.confirmLoginToUser(loginRes.result)
						} else {
							this.loginVercode = ""
							this.getCodeData()
						}

					}


				} else { //注册

					// if (this.loginAccount == "") {

					// 	uni.showToast({
					// 		title: this.$t('login.ruls.accout.empty'),
					// 		icon: "none",
					// 		duration: 2000
					// 	});

					// 	return false
					// }

					// if (this.loginPassword == "") {

					// 	uni.showToast({
					// 		title: this.$t('login.ruls.pass.empty'),
					// 		icon: "none",
					// 		duration: 2000
					// 	});

					// 	return false
					// }

					// if (this.inviteNum == "") {
					// 	this.intiveAlterTip = this.$t('reg.ruls.invite.empty')
					// 	this.intiveAlterTipBool = true
					// 	uni.showToast({
					// 		title: this.$t('reg.ruls.invite.empty'),
					// 		icon: "none",
					// 		duration: 2000
					// 	});

					// 	return false
					// }

					// if (this.loginVercode == "") {
					// 	this.codeAlterTip = this.$t('reg.ruls.vercode.empty')
					// 	this.codeAlterTipBool = true
					// 	uni.showToast({
					// 		title: this.$t('login.ruls.vercode.empty'),
					// 		icon: "none",
					// 		duration: 2000
					// 	});

					// 	return false
					// }


					let accout_bool_v = this.checkParamEmpty(this.loginAccount, "account")
					let pass_bool_v = this.checkParamEmpty(this.loginPassword, "password")
					let invite_bool_v = this.checkParamEmpty(this.inviteNum, "invite")
					let verc_bool_v = this.checkParamEmpty(this.loginVercode, "code")

					if (accout_bool_v && pass_bool_v && invite_bool_v && verc_bool_v && this
						.loginVercodehash) {
						let currRegData = {}
						currRegData.username = this.loginAccount
						currRegData.password = this.loginPassword
						currRegData.invitation_code = this.inviteNum

						let valueCode = this.loginVercode.replace(/\ +/g, "");
						// let valueCode = this.loginVercode.replace(/^\s+|\s+$/g, '')
						currRegData.value = valueCode
						currRegData.id = this.loginVercodehash

						let registerRes = await registerReq(currRegData)
						if (registerRes.code === 200) {
							this.$refs.uTips.show({
								title: registerRes.msg,
								type: 'success',
								duration: '1000'
							})
							//延迟跳转
							setTimeout(() => {
								this.getCodeData()
								this.loginVercode = ""
								this.loginStatus = true

							}, 1300);

						} else {
							this.getCodeData()
						}

					}

				}
			},
			checkParamEmpty(paramKey, type) {

				if (paramKey.replace(/\ +/g, "").length == 0) {
					switch (type) {
						case 'account':
							this.usernameAlterTip = this.$t('reg.ruls.accout.empty')
							this.usernameAlterTipBool = true
							uni.showToast({
								title: this.$t('reg.ruls.accout.empty'),
								icon: "none",
								duration: 2000
							});
							break;
						case 'password':
							this.passwordAlterTip = this.$t('reg.ruls.pass.empty')
							this.passwordAlterTipBool = true
							uni.showToast({
								title: this.$t('reg.ruls.pass.empty'),
								icon: "none",
								duration: 2000
							});
							break;
						case 'invite':
							this.intiveAlterTip = this.$t('reg.ruls.invite.empty')
							this.intiveAlterTipBool = true
							uni.showToast({
								title: this.$t('reg.ruls.invite.empty'),
								icon: "none",
								duration: 2000
							});
							break;
						case 'code':
							this.codeAlterTip = this.$t('reg.ruls.vercode.empty')
							this.codeAlterTipBool = true
							uni.showToast({
								title: this.$t('login.ruls.vercode.empty'),
								icon: "none",
								duration: 2000
							});
							break;
						default:

					}
					return false
				}

				return true
				// return false
			},
			confirmLoginToUser(provider) { //确认登录
				this.login(provider)
				uni.reLaunch({
					url: '/pages/home/index',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			changeLoginRegView() { //切换登录和注册视图点击事件

				this.usernameAlterTip = ''
				this.usernameAlterTipBool = false
				this.passwordAlterTip = ''
				this.passwordAlterTipBool = false
				this.intiveAlterTip = ''
				this.intiveAlterTipBool = false
				this.codeAlterTip = ''
				this.codeAlterTipBool = false

				this.loginStatus = !this.loginStatus
				this.navTitle = this.loginStatus ? this.$t('login.btntitle') : this.$t('reg.btntitle')
				this.getCodeData()
			},
			async getCodeData() { //获取验证码方法
				this.loginVercodehash = ""
				this.loginVercode = ""
				let verifyRes = await generateCaptchaReq(new Date().getTime())
				// console.log("verifyRes",verifyRes);
				if (verifyRes.code === 200) {
					this.vercodeImg = verifyRes.result.base_64_blog
					this.loginVercodehash = verifyRes.result.id
				} else {
					// this.$refs.uTips.show({
					// 	title: verifyRes.msg,
					// 	type: 'error',
					// 	duration: '2000'
					// })
				}
			},
			getCodeClick() { //点击验证码图片更新验证码
				// console.log("获取验证码点击")
				this.getCodeData();
			},


		}
	}
</script>

<style lang="scss" scoped>
	.page-layout {
		height: 100%;

		/* overflow: hidden; */
		.slot-left {
			margin-left: 20px;
			// width: 30%;
		}

		.navBarUV {
			display: flex;
			flex-direction: row;
			width: 100%;
			align-items: center;
			justify-content: center;



			.slot-wrap {
				display: flex;
				align-items: center;
				justify-content: center;
				// width: 70%;
				color: #fff;
			}
		}
	}

	.bjImg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
	}

	.mainContainer {
		margin-top: 15px;
		padding: 0 47px;
		margin-top: 250px;

		.inputItem {
			.top {
				display: flex;
				justify-content: flex-start;
				align-items: center;


				.iconImg {
					margin-left: 20px;

					image {
						width: 14px;
						height: 18px;
						vertical-align: middle;
					}
				}

				.content {
					margin-left: 10px;
					display: flex;

					.hidePassImg {
						display: flex;
						width: 30px;
						align-items: center;
						justify-content: center;
						// margin-top: 5px;

						image {
							width: 24px;
							height: 24px;
						}
					}


				}

				.codeimg {
					image {
						width: 80px;
						height: 30px;
					}
				}
			}

			.center {
				margin-left: 20px;
				font-size: 12px;
				line-height: 12px;
				color: #f56c6c;
				margin-top: 15px;
			}

			.line {
				margin-top: 5px;
				border-bottom: 1px solid #d6d7d9;
				transform: scaleY(0.5);
				border-top-color: rgb(214, 215, 217);
				border-right-color: rgb(214, 215, 217);
				border-left-color: rgb(214, 215, 217);
			}
		}
	}

	.postBtn {
		margin: 33px auto 0;
		width: 280px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		color: #fff;
		font-weight: 400;
		font-size: 16px;
		background: url(../../static/images/btn.png) no-repeat top;
		background-size: contain;
	}

	.loginTips {
		display: flex;
		align-items: center;
		justify-content: space-between;
		// padding: 27px 72px 75px;
		padding: 27px 72px 25px;

		.text {
			display: inline-block;
			font-size: 11px;
			color: #bababa;
			font-weight: 400;
			white-space: nowrap;
		}
	}
</style>
