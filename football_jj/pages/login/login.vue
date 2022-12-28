<template>
	<view class="login">
		<view class="loginEvent">
			<scroll-view scroll-y="true" class="scroll-Y">


				<view class="login-nav" v-if="!loginStatus">
					<view class="lefts" @click="changeLoginRegView">
						<image src="../../static/images/left.png" mode=""></image>
					</view>
					<view class="close" @click="changeLoginRegView">
						<image src="../../static/images/close.png" mode=""></image>
					</view>
				</view>




				<view class="login-logo" v-if="loginStatus">
					<view class="big-logo">
						<image class="logo" :src="defaultLogo" mode=""></image>
					</view>
				</view>

				<view class="lang-top">
					<view class="langView">
						<view class="currLang">

							<image :src="currSelectLangImg" mode="" class="currImg" @click="showLangsClick"></image>
							<view class="currSelectLangBox" @click="showLangsClick">
								<text class="txt">{{currSelectLang}}</text>
								<!-- :class="LangsBool ? 'triangle isRotate' : 'triangle '" -->
								<view class="triangle">
									<image src="../../static/images/triangle.png" mode=""
										:class="LangsBool ? 'langTriangle isRotate' : 'langTriangle '"></image>
								</view>
							</view>

						</view>

						<view class="langItem" :style="LangsBool ? null : 'display:none;' ">
							<scroll-view scroll-y="true" class="scroll-item">
								<!-- :class="item.status === 1 ? 'langItem langActive' : 'langItem' " -->
								<view class="item" v-for="(item,index) in langList" :key="index"
									@click="setLangClick(item)">
									<view class="left">
										<image :src="item.url" mode="" class="icon"></image>
									</view>
									<view class="txt">
										{{item.lang}}
									</view>
								</view>
							</scroll-view>
						</view>
					</view>


				</view>

				<view class="login-form">
					<view class="formInput">
						<input type="password" style='width:0;height:0;min-height:0' />
						<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
						<image src="../../static/images/username.png" mode="" class="icon"></image>
						<input type="text" value="" :placeholder="$t('login.account.place')" maxlength="16"
							v-model="regAccount" @input="regAccoutChangeInput" class="input username"
							placeholder-style="color:#fff;font-size: 14px;" />
						<image src="../../static/images/close.svg" mode="" class="icon right-icon del"
							:style="showUserNameCloseBool ? null : 'display: none;'" @click="showUserNameClick"></image>
						<text class="verify-register-tip" v-if="accountAlterTipBool">{{accountAlterTip}}</text>
					</view>
					<view class="formInput">
						<input type="password" style='width:0;height:0;min-height:0' />
						<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
						<image src="../../static/images/password.png" mode="" class="icon"></image>
						<input type="pass" value="" :placeholder="$t('login.pass.place')" :password="passwordBool"
							maxlength="16" v-model="regPassword" @input="regPassChangeInput" class="input password"
							placeholder-style="color:#fff;font-size: 14px;" />
						<image :src="srcImg" mode="" class="icon right-icon eye" @click="loginSeePassClick('login')">
						</image>
						<text class="verify-register-tip" v-if="passAlterTipBool">{{passAlterTip}}</text>
					</view>
					<view class="formInput" v-if="!loginStatus">
						<input type="password" style='width:0;height:0;min-height:0' />
						<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
						<image src="../../static/images/password.png" mode="" class="icon"></image>
						<input type="pass" value="" :placeholder="$t('reg.passconfirm.place')"
							:password="passwordConfirmBool" maxlength="16" v-model="regConfirmPassword"
							@input="regPassTChangeInput" class="input password"
							placeholder-style="color:#fff;font-size: 14px;" />
						<image :src="srcConfImg" mode="" class="icon right-icon eye"
							@click="loginSeePassClick('regConf')">
						</image>
						<text class="verify-register-tip" v-if="passTAlterTipBool">{{passTAlterTip}}</text>
					</view>

					<view class="formInput" v-if="!loginStatus">
						<input type="password" style='width:0;height:0;min-height:0' />
						<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
						<image src="../../static/images/yaoqing.png" mode="" class="icon"></image>
						<input type="text" value="" :placeholder="$t('reg.invitecode.place')" v-model="regInviteCode"
							@input="regInvChangeInput" class="input username"
							placeholder-style="color:#fff;font-size: 14px;" />
					</view>

					<!-- 注册时候必须绑定手机号 -->

					<view class="phone-item" v-if="!loginStatus">
						<view class="code">
							<text class="codenumber"
								@click.stop="showAreaBool = !showAreaBool">+{{selectAreaNum}}</text>
							<view class="number">
								<view class="phoneBox" :style="!showAreaBool ? 'display:none': null">
									<scroll-view class="scroll-Y" scroll-y>
										<view class="phone-content">
											<view
												:class="currentSelectIndex === index ? 'phoneItem active' : 'phoneItem'"
												v-for="(item,index) in areaList" :key="index"
												@click="selectAreaClick(item,index)">
												{{item}}
											</view>
										</view>
									</scroll-view>
								</view>
								<image src="../../static/images/triangle.png" mode="" class="down"></image>
							</view>
						</view>

						<view class="input-phone">
							<input type="password" style='width:0;height:0;min-height:0' />
							<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
							<input type="number" :placeholder="phonePlace" v-model="newPhone" class="input username"
								placeholder-style="color:#fff;font-size: 14px;" maxlength="16" />
						</view>

					</view>
					<!-- <view class="tip">
						{{phoneTip}}
					</view> -->

					<!-- 短信验证码 -->
					<view class="formInput" v-if="iSCommonBool">
						<input type="password" style='width:0;height:0;min-height:0' />
						<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
						<image src="../../static/images/password.png" mode="" class="icon"></image>
						<input type="text" value="" :placeholder="$t('user.change.phone.code.text')" maxlength="4"
							v-model="loginPhoneCode" class="input username"
							placeholder-style="color:#fff;font-size: 14px;" />
						<view class="get_code_sms" @click="getSmsCodeClick">
							{{defalutCodeTitle}}
						</view>
						<text class="verify-register-tip">{{accountAlterTip}}</text>
					</view>


					<view class="verifyView">
						<view class="verifyInput">
							<input type="password" style='width:0;height:0;min-height:0' />
							<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
							<image src="../../static/images/verifyCode.png" mode="" class="icon"></image>
							<input type="text" value="" :placeholder="$t('login.vercode.place')" maxlength="4"
								v-model="regImgCode" @input="regVerChangeInput" class="input verifyCode"
								placeholder-style="color:#fff;font-size: 14px;" />
						</view>
						<view class="verifyImg">
							<image :src="vercodeImg" mode="" class="icon right-icon-v code-icon" @click="getCodeData">
							</image>
						</view>


						<text class="verify-register-tip" v-if="verAlterTipBool">{{verAlterTip}}</text>
					</view>

					<view class="login-forget">

						<text class="text" v-if="loginStatus"
							@click="forgetpassnotlogin">{{$t('login.forget2.text')}}</text>

						<view class="" @click.stop="serverClick">
							<view class="text">
								<text>{{ $t('func.system.server')}}</text>
							</view>
						</view>
						<view class="" @click.stop="appDownClick">
							<view class="text">
								<text>{{$t('login.apptitle')}}</text>
							</view>
						</view>
					</view>

					<u-button type="primary" class="login_btn" @click="loginRegfBigBtn" hover-class="none">
						{{loginStatus ? $t('login.btntitle') : $t('reg.btntitle')}}
					</u-button>

					<u-button type="primary" class="reg_btn" @click="changeLoginRegView" hover-class="none">
						{{ loginStatus ? $t('reg.btntitle') : $t('login.btntitle')}}
					</u-button>

				</view>

				<!-- 	<view class="login-bottom">
					<view class="bottom-download">
						<view class="feedback-download">
							<text>{{$t('login.downtitle')}}</text>
						</view>
					</view>
					<view class="bottom-download-icon">
						<view class="feedback" @click="serverClick">
							<image src="../../static/images/service.png" mode="" class="icon"></image>
							<text>{{$t('login.chattitle')}}</text>
						</view>
						<view class="feedback" @click="appDownClick">
							<image src="../../static/images/app.svg" mode="" class="icon"></image>
							<text>{{$t('login.apptitle')}}</text>
						</view>
					</view>
				</view>
				 -->
				<view style="width: 100%;height: 50px;">

				</view>

			</scroll-view>


		</view>

		<u-top-tips ref="uTips" :navbar-height="statusBarHeight + navbarHeight" z-index="1200"></u-top-tips>

	</view>
</template>
<script>
	import {
		loginReq,
		verifyCodeReq,
		registerReq,
		verifyCodeCheckReq,
		sysConfigReq,
		servTmpReq,
		loginNewReq,
		phoneCodeNeedNameReq,
		appUrlReq
	} from '../../api/index.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {
		changeTitleMixin,
		newDeviceMixin
	} from '../../util/mixins.js'
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	const TIME_COUNT = 59;
	// import { setClipboardData, getClipboardData } from '@/uni_modules/u-clipboard/js_sdk'
	export default {
		mixins: [changeTitleMixin, newDeviceMixin],
		data() {
			return {
				showUserNameCloseBool: false,
				srcImg: '../../static/images/eye1.svg',
				srcConfImg: '../../static/images/eye1.svg',
				passwordBool: true,
				passwordRegBool: true,
				passwordConfirmBool: true,
				loginAccount: '',
				loginPassword: '',
				loginVercode: '',
				vercodeImg: 'null',
				changeBtnColor: false,
				LangsBool: false,
				currSelectLangImg: "../../static/images/en.svg",
				currSelectLang: 'English',
				currSelectLangType: 'EN',
				langList: [{
						lang: "EN",
						type: "EN",
						url: "../../static/images/en.svg",
						status: 1,
					},
					{
						lang: "ES",
						type: "ES",
						url: "../../static/images/es.svg",
						status: 0,
					},
					{
						lang: "RU",
						type: "RU",
						url: "../../static/images/ru.svg",
						status: 0,
					},
					{
						lang: "YK",
						type: "YK",
						url: "../../static/images/yk.svg",
						status: 0,
					},
					{
						lang: "PT",
						type: "PT",
						url: "../../static/images/pt.png",
						status: 0,
					},
					{
						lang: "CN",
						type: "CN",
						url: "../../static/images/zh.svg",
						status: 0,
					},
					{
						lang: "CHT",
						type: "CHT",
						url: "../../static/images/cht.svg",
						status: 0,
					},

					{
						lang: "ID",
						type: "ID",
						url: "../../static/images/id.svg",
						status: 0,
					},
					{
						lang: "TH",
						type: "TH",
						url: "../../static/images/th.svg",
						status: 0,
					},
					{
						lang: "FR",
						type: "FR",
						url: "../../static/images/fr.svg",
						status: 0,
					},
					{
						lang: "SA",
						type: "SA",
						url: "../../static/images/sa.svg",
						status: 0,
					},
					{
						lang: "KO",
						type: "KO",
						url: "../../static/images/ko.svg",
						status: 0,
					},
					{
						lang: "JA",
						type: "JA",
						url: "../../static/images/ja.svg",
						status: 0,
					},
					{
						lang: "MS",
						type: "MS",
						url: "../../static/images/ms.svg",
						status: 0,
					},
				],
				loginStatus: true,
				regAccount: '',
				regPassword: '',
				regConfirmPassword: '',
				regInviteCode: '',
				regImgCode: '',
				changeRegBtnColor: false,
				loginVercodehash: '',
				// 状态栏高度，H5中，此值为0，因为H5不可操作状态栏
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
				// 导航栏内容区域高度，不包括状态栏高度在内
				navbarHeight: 0,
				accountAlterTip: '',
				passAlterTip: '',
				passTAlterTip: '',
				verAlterTip: '',
				accountAlterTipBool: false,
				passAlterTipBool: false,
				passTAlterTipBool: false,
				verAlterTipBool: false,

				regNickName: '',
				regQqNum: '',
				regCode: '',

				currAlterMsg: '',
				currHideStatus: 1, //1不显示,2显示

				needinviteCodeNum: 1, //1.需要2.不需要
				currServerAdd: '',

				areaList: [],
				currentSelectIndex: '',
				selectAreaNum: '',
				iSCommonBool: false,
				defalutCodeTitle: this.$t('user.change.phone.get.code.text'),
				timer: null,
				loginPhoneCode: '',
				defaultLogo: '',

				showAreaBool: false,
				newPhone: '',
				phoneTip: '',
				phoneTipBool: false,
				phonePlace: this.$t('reg.phone.place'),


				currDevOsNum: null,
				downUrl: "",
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
		onLoad() {},
		onShow() {

			// // #ifdef H5
			// 	document.title = "七喜娱乐"
			// // #endif

			let dateStr = "?t=" + new Date().getTime();
			this.defaultLogo = '../../static/images/wb_logo2.png' + dateStr
			this.iSCommonBool = false


			// 初始化语言
			this.initLang()
			//初始化验证码
			this.getCodeData();
			// 获取URL链接是存在邀请码code
			this.getURlParam()
			// 获取系统配置
			this.getSysConfigData()
			// 获取客服地址(临时)
			this.getServerAddressData()

			// 获取手机区号
			this.getAreaData()

			// 获取app下载地址
			this.getAppDownUrlData()

			if (this.isNewDevice) {
				this.iSCommonBool = true
			}
			// console.log("isNewDevice", this.isNewDevice);
		},
		onHide() {
			clearInterval(this.timer)
		},
		methods: {
			...mapMutations(['login']),
			initLang() { //初始化语言

				this.currSelectLangType = (uni.getStorageSync('ft_lang') ? uni.getStorageSync('ft_lang') : 'en')
					.toUpperCase()
				this.langList.forEach((item, index) => {
					if (item.type === this.currSelectLangType) {
						this.currSelectLang = item.lang
					}
				})
				// console.log("this.currSelectLangType", this.currSelectLangType);
				// console.log("this.currSelectLang",this.currSelectLang);
				if (this.currSelectLangType !== 'CN') {
					this.currSelectLangImg = '../../static/images/' + this.currSelectLangType.toLowerCase() + '.svg'
				} else {
					this.currSelectLangImg = '../../static/images/zh.svg'
				}

				this.$i18n.locale = this.currSelectLangType.toLowerCase()
				this.phonePlace = this.$t('reg.phone.place')

			},
			async getAppDownUrlData() {
				// console.log("获取链接", this.currDevOsNum);
				let currDevInfo = uni.getSystemInfoSync()
				// console.log("设备信息", currDevInfo);
				// if (currDevInfo.osName && currDevInfo.platform  === 'android') 
				if (currDevInfo.platform && currDevInfo.platform === 'ios') {
					this.currDevOsNum = 1
				} else {
					this.currDevOsNum = 0
				}
				// console.log("获取设备", this.currDevOsNum);
				let resR = await appUrlReq()
				// console.log("resR", resR.data);
				if (resR.code === 200) {
					// console.log("已获取链接", resR.data, resR.data.length);
					if (resR.data && resR.data.length !== 0) {
						let urlArr = resR.data
						urlArr.forEach((item, index) => {
							if (item.appType === this.currDevOsNum) {
								this.downUrl = item.appUrl
							}
						})
					}

				}

				// 
			},
			async getServerAddressData() {
				let resR = await servTmpReq()
				// console.log("resR", resR.data.serviceAddr);
				if (resR.data && resR.data.serviceAddr) {
					this.currServerAdd = resR.data.serviceAddr
				}
			},
			serverClick() {
				if (this.currServerAdd) {
					window.location.href = this.currServerAdd
				}
			},
			appDownClick() {
				// console.log("app下载点击", this.downUrl);
				if (this.downUrl) {
					window.location.href = this.downUrl
				}
			},
			getURlParam() {
				let pagearr = getCurrentPages(); //获取应用页面栈/获取当前打开过的页面路由数组
				let currentPage = pagearr[pagearr.length - 1]; //获取当前页面信息
				let currentPageOptions = currentPage.options ////获取路由参数
				let currentPageRoute = currentPage.route //获取当前页面路由
				// console.log("currentPageOptions",currentPageOptions);
				if (currentPageOptions.length !== 0 && currentPageOptions.hasOwnProperty('code')) {
					this.regInviteCode = currentPageOptions.code
					this.loginStatus = false
				}
			},
			async getSysConfigData() {
				let resR = await sysConfigReq()
				// console.log("resR",resR);
				if (resR.code === 200) {
					this.needinviteCodeNum = resR.data.invitation_code
				}
			},
			showUserNameClick() { //登录页面用户名关闭图标的点击事件
				this.loginAccount = ""
				this.showUserNameCloseBool = false
			},
			loginSeePassClick(str) { //显示密码和隐藏密码(3个共用)
				let imgLeftName = "../../static/images/eye2.svg"
				let imgRightName = "../../static/images/eye1.svg"
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
			regAccoutChangeInput() {
				// console.log("111", this.regAccount.length);
				if (!this.regAccount) {
					this.accountAlterTip = this.$t('reg.ruls.accout.empty')
					this.accountAlterTipBool = true
				} else if (this.regAccount.length < 5) {
					this.accountAlterTip = this.$t('reg.ruls.accout.length')
					this.accountAlterTipBool = true
				} else {
					this.accountAlterTip = ""
					this.accountAlterTipBool = false
				}
			},
			regPassChangeInput() {
				// console.log("this.regPassword.length", this.regPassword.length);
				if (!this.regPassword) {
					this.passAlterTip = this.$t('reg.ruls.pass.empty')
					this.passAlterTipBool = true
				} else if (this.regPassword.length < 6) {
					this.passAlterTip = this.$t('reg.ruls.pass.length')
					this.passAlterTipBool = true
				} else {
					this.passAlterTip = ""
					this.passAlterTipBool = false
				}

			},
			regPassTChangeInput() {
				if (!this.regConfirmPassword) {
					this.passTAlterTip = this.$t('reg.ruls.passtwo.empty')
					this.passTAlterTipBool = true
				} else if (this.regConfirmPassword.length < 6) {
					this.passTAlterTip = this.$t('reg.ruls.passtwo.length')
					this.passTAlterTipBool = true
				} else if (this.regConfirmPassword !== this.regPassword) {
					this.passTAlterTip = this.$t('reg.ruls.passtwo.unequal')
					this.passTAlterTipBool = true
				} else {
					this.passTAlterTip = ""
					this.passTAlterTipBool = false
				}
			},
			regInvChangeInput() {

			},
			async regVerChangeInput() {

				if (!this.regImgCode) {
					this.verAlterTip = this.$t('reg.ruls.vercode.empty')
					this.verAlterTipBool = true
				} else if (this.regImgCode && this.regImgCode.length === 4) { // 检验验证码
					let resR = await verifyCodeCheckReq(this.loginVercodehash, this.regImgCode)
					// console.log("resR", resR);
					if (resR.code !== 200) {
						this.verAlterTipBool = true
						let currData = resR.data[0]
						let currMsgKey = currData.msgKey
						this.verAlterTip = this.$t(`backapi.${currMsgKey}`)
					} else {
						this.verAlterTipBool = false
						this.verAlterTip = ""
					}

				} else {
					this.verAlterTipBool = false
					this.verAlterTip = ""
				}

			},
			showLangsClick() { //显示或者隐藏语言列表点击事件
				this.LangsBool = !this.LangsBool
				let currLangLists = [...this.langList]
				let obj = {};
				currLangLists.filter((item, index) => {
					// console.log("item.type.toLowerCase()",this.currSelectLang.toLowerCase());
					// console.log("item.lang === this.currSelectLangType", item.lang === this.currSelectLangType);
					if (item.type === this.currSelectLangType) {
						item.status = 1
					} else {
						item.status = 0
					}

					if (item.status === 1) {
						obj = item;
						currLangLists.splice(index, 1)
						// return;
					}

					return item
				})

				currLangLists.unshift(obj);
				this.langList = currLangLists

			},
			setLangClick(item) { //选择某个语言进行设置的点击方法
				// console.log("item", item.lang);
				// e的参数zh-Hans // en 这种应用能重启生效 要不然用this.$i18n.locale = 'zh-Hans'
				if (item.type.toLowerCase() !== this.$i18n.locale) {
					// uni.setLocale(item.type.toLowerCase());
					this.$i18n.locale = item.type.toLowerCase();
					uni.setStorageSync('ft_lang', this.$i18n.locale)
				}

				this.phonePlace = this.$t('reg.phone.place')
				this.currSelectLang = item.lang
				this.currSelectLangType = item.type.toUpperCase()
				this.currSelectLangImg = item.url
				this.LangsBool = false

			},
			async loginRegfBigBtn() { //注册点击事件
				if (this.loginStatus) { //点击登录页面中登录按钮
					if (this.regAccount == "") {
						uni.showToast({
							title: this.$t('login.ruls.accout.empty'),
							icon: "none",
							duration: 2000
						});
						return false
					}
					if (this.regPassword == "") {
						uni.showToast({
							title: this.$t('login.ruls.pass.empty'),
							icon: "none",
							duration: 2000
						});
						return false
					}

					if (this.regImgCode == "") {
						uni.showToast({
							title: this.$t('login.ruls.vercode.empty'),
							icon: "none",
							duration: 2000
						});
						return false
					}
					// uni.showLoading({
					// 	title: '登录中...',
					// })
					let reqParam = {}
					reqParam.username = this.regAccount
					reqParam.password = this.regPassword
					reqParam.code = this.regImgCode
					reqParam.verifyKey = this.loginVercodehash
					if (this.iSCommonBool) {
						// if (this.selectAreaNum) {
						// 	reqParam.areaCode = this.selectAreaNum
						// }
						// if (this.loginPhone && this.selectAreaNum) {
						// 	reqParam.phone = this.selectAreaNum + this.loginPhone
						// } else {
						// 	uni.showToast({
						// 		title: this.$t('backapi.phoneIsEmpty'),
						// 		icon: "none",
						// 		duration: 2000
						// 	});
						// 	return false
						// }
						if (this.loginPhoneCode) {
							reqParam.phoneCode = this.loginPhoneCode
						} else {
							uni.showToast({
								title: this.$t('backapi.smsCodeIsEmpty'),
								icon: "none",
								duration: 2000
							});
							return false
						}

					}
					let loginRes
					if (this.iSCommonBool) {
						loginRes = await loginNewReq(reqParam)
					} else {
						loginRes = await loginReq(reqParam)
					}

					// uni.hideLoading();
					this.currAlterMsg = loginRes.msg
					this.loginVercode = ""
					this.loginVercodehash = ""
					if (loginRes.code === 200) {
						if (this.iSCommonBool) {
							this.set_device(false)
						}
						this.confirmLoginToUser(loginRes.data)
					} else if (loginRes.code === 106) { //这个新设备提醒
						this.getCodeData()
						this.iSCommonBool = true
						// 全局状态
						this.set_device(true)
						uni.showToast({
							icon: 'none',
							title: this.$t('backapi.userNotMatchPhone'),
							duration: 2000,
						});

					} else {
						let currData = loginRes.data[0]
						// console.log("currData",currData);
						let currMsgKey = currData.msgKey
						// currMsgKey = "backapi."+ currMsgKey
						// this.$refs.uTips.show({
						// 	title: this.$t(`backapi.${currMsgKey}`),
						// 	type: 'error',
						// 	duration: '2000'
						// })
						this.loginVercode = ""
						this.getCodeData()


					}

				} else { //注册

					if (this.regAccount && this.regPassword && this.regConfirmPassword && this.regImgCode && this
						.loginVercodehash) {
						let currRegData = {}
						currRegData.username = this.regAccount
						currRegData.password = this.regPassword
						currRegData.twoPassword = this.regConfirmPassword
						if (this.selectAreaNum) {
							currRegData.areaCode = this.selectAreaNum
						}
						if (this.regPhone && this.selectAreaNum) {
							currRegData.phone = this.selectAreaNum + this.regPhone
						}
						currRegData.code = this.regImgCode
						if (this.selectAreaNum) {
							currRegData.areaCode = this.selectAreaNum
						}
						if (this.newPhone && this.selectAreaNum) {
							currRegData.phone = this.selectAreaNum + this.newPhone
						}
						if (this.needinviteCodeNum === 1) {
							currRegData.invitationCode = this.regInviteCode
						}
						currRegData.verifyKey = this.loginVercodehash

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
								this.regImgCode = ""
								this.loginStatus = true
							}, 1300);

						} else {
							// this.$refs.uTips.show({
							// 	title: registerRes.msg,
							// 	type: 'error',
							// 	duration: '1000'
							// })

							this.getCodeData()

						}

					}
				}
			},
			confirmLoginToUser(provider) {
				this.login(provider)
				uni.reLaunch({
					url: '/pages/home/index',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			changeLoginRegView() { //切换登录和注册视图点击事件
				this.loginStatus = !this.loginStatus
				this.getCodeData()
			},
			forgetpassnotlogin() {
				uni.navigateTo({
					url: '/pages/user/forget_not_lo',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			async getCodeData() { //获取验证码方法
				this.loginVercodehash = ""
				this.loginVercode = ""
				this.regImgCode = ""
				let verifyRes = await verifyCodeReq(new Date().getTime())
				// console.log("verifyRes",verifyRes);
				if (verifyRes.code === 200) {
					this.vercodeImg = verifyRes.data.img
					this.loginVercodehash = verifyRes.data.verifyKey
				} else {
					// this.$refs.uTips.show({
					// 	title: verifyRes.msg,
					// 	type: 'error',
					// 	duration: '2000'
					// })
				}
			},
			hideloadfunction() { //隐藏后的关闭事件


				if (this.currHideStatus == 1) { //不显示

					uni.showToast({
						title: this.currAlterMsg,
						duration: 2000
					});



				} else { //显示错误弹窗


					this.$refs.uTips.show({
						title: this.currAlterMsg,
						type: 'error',
						duration: '2000'
					})
				}

			},
			async getSmsCodeClick() {
				if (!this.regAccount) {

					uni.showToast({
						title: this.$t('login.ruls.accout.empty'),
						icon: "none",
						duration: 2000
					});
					return false
				}

				if (!this.timer) {
					let reqParams = {}
					// reqParams.phone = this.selectAreaNum + this.loginPhone
					reqParams.username = this.regAccount
					let resR = await phoneCodeNeedNameReq(reqParams)
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
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: url("../../static/images/postimg.png") no-repeat;
		background-size: cover;
	}

	// .loginEvent {
	// 	background: rgba(8, 19, 40, .4);
	// }

	.login {
		// width: 100%;
		height: 100vh;

		background: rgba(8, 19, 40, .4);

		padding: 20px;
		overflow: hidden;
		position: relative;
		// background-color: #081328;

		.scroll-Y {
			width: 100%;
			height: 100vh;
			position: relative;
			z-index: 99;
		}

		.lang-top {

			display: flex;
			flex-direction: row;
			// justify-content: space-between;
			justify-content: flex-start;
			margin-bottom: 20px;

			.langView {
				width: 92px;
				// height: 32px;
				padding: 8px 0;
				background-color: #fff;
				/* border-radius: 5px; */
				/* border: 1px solid rgba(255, 255, 255, 0.2); */
				border: 0.5px solid rgba(0, 0, 0, .15);
				position: relative;

				.currLang {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					height: 100%;
					padding-left: 5px;

					.currImg {
						width: 18px;
						height: 18px;
						flex: 0 0 18px;
						border-radius: 50%;
					}

					.currSelectLangBox {
						flex: 1;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: center;
						height: 100%;

						.txt {
							flex: 1;
							display: flex;
							justify-content: center;
							align-items: center;
							color: #333;
							font-weight: 700;
							// font-size: 12px;
						}

						.triangle {
							flex: 0 0 31px;
							display: flex;
							justify-content: center;
							align-items: center;
							// background-color: rgba(0, 0, 0, .2);
							height: 100%;


							.langTriangle {
								width: 16px;
								height: 7px;
								transition: all .3s ease;
							}

							.isRotate {
								// transform: rotate(0deg);
								transform: rotate(180deg);
							}
						}

					}

				}

				.langItem {
					position: absolute;
					left: 0;
					top: 34px;
					width: 100%;
					background-color: #fff;
					/* border: 1px solid rgba(255, 255, 255, 0.2); */
					z-index: 999;
					// border-radius: 6px;

					.scroll-item {
						min-height: 100px;
						max-height: 350px;

						.item {
							text-align: center;
							line-height: 40px;
							color: #333;
							display: flex;
							justify-content: flex-start;
							align-items: center;
							// padding: 0 10px;
							padding-left: 5px;
							// border-bottom: 0.5px solid #222;

							.left {
								flex: 0 0 21px;
								display: flex;
								justify-content: space-between;
								align-items: center;
								margin-right: 5px;

								.icon {
									width: 18px;
									height: 18px;
									border-radius: 50%;
								}
							}

							.txt {
								// flex: 1;
							}
						}
					}

				}




			}





		}


		.login-nav {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin-bottom: 30px;

			.lefts {
				image {
					width: 9.5px;
					height: 16.5px;
				}
			}

			.close {
				image {
					width: 13px;
					height: 13px;
				}
			}


		}

		.login-logo {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			// margin-top: 52px;
			margin-top: 20px;
			margin-bottom: 30px;

			.big-logo {
				width: 95px;
				height: 95px;

				.logo {
					width: 100%;
					height: 100%;
				}
			}
		}

		.login-form {

			.verifyView {
				width: 100%;
				height: 46px;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				.verifyInput {
					background: rgba(255, 255, 255, 0.3);
					border: 1px solid #f8f9f9;
					border-radius: 5px;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 0 14px;
					height: 46px;
					color: #fff;

					.icon {
						width: 22px;
						height: 22px;
						// flex: 0 0 20px;
						margin-right: 14px;
					}

				}


				.verifyImg {
					.right-icon {
						// position: absolute;
						// top: 50%;
						// right: 2px;
						top: 5%;
						// right: 10px;
					}

					.right-icon-v {
						// right: 20px;
						right: -5px;
					}

					.del {
						width: 11px;
						height: 14px;
						margin-top: -7px;
					}

					.code-icon {
						width: 80px;
						height: 46px;
						// flex: 0 0 75px;
						// border-radius: 5px;
						// position: absolute;
						top: 1px;
					}
				}

				.verify-register-tip {
					background: #ffffff;
					color: red;
					position: absolute;
					bottom: -20px;
					font-size: 14px;
				}

			}


			.formInput {
				width: 100%;
				height: 46px;
				// background-color: rgba(0, 0, 0, .5);
				background: hsla(0, 0%, 100%, .3);
				border: 1px solid #f8f9f9;
				border-radius: 5px;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				padding: 0 14px;
				position: relative;
				margin-bottom: 25px;

				.icon {
					width: 22px;
					height: 22px;
					// flex: 0 0 20px;
					margin-right: 14px;
				}

				.verify-register-tip {
					background: #ffffff;
					color: red;
					position: absolute;
					bottom: -20px;
					font-size: 14px;
				}

				.input {
					color: #f8f8f8;
					flex: 1;
					padding-right: 24px;

					.password {
						font-size: 17px;
						border: none;
						background-color: hsla(0, 0%, 100%, 0);
						outline: none;
						padding: 0;
					}
				}

				.right-icon {
					// position: absolute;
					// top: 50%;
					// right: 2px;
					top: 5%;
					// right: 10px;
				}

				.right-icon-v {
					// right: 20px;
					right: -5px;
				}

				.del {
					width: 11px;
					height: 14px;
					margin-top: -7px;
				}

				.eye {
					width: 24px;
					height: 24px;
					margin-top: -7px;
				}

				.code-icon {
					width: 80px;
					height: 38px;
					flex: 0 0 75px;
					border-radius: 5px;
					position: absolute;
					top: 4px;
				}

			}

			.phone-item {
				width: 100%;
				/* height: 46px; */
				/* background: rgba(255, 255, 255, 0.3); */
				/* border: 1px solid #f8f9f9; */
				border-radius: 5px;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				/* padding: 0 14px; */
				position: relative;
				margin-bottom: 25px;

				.code {
					width: 30%;
					color: #333;
					display: flex;
					flex-direction: row;
					justify-content: center;
					background: #fff;
					border: 1px solid #f8f9f9;
					padding: 11px 0;
					// border-radius: 5px;
				}


				.input-phone {
					background: rgba(255, 255, 255, 0.3);
					border: 1px solid #f8f9f9;
					padding: 10px 0;
					margin-left: 10px;
					width: 100%;
					border-radius: 5px;
				}

				.number {
					position: relative;
					/* width: 55px; */
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					margin-left: 5px;

					.codenumber {
						position: relative;
						color: #ffc24a;
					}

					.phoneBox {
						position: absolute;
						top: 30px;
						left: -55px;
						z-index: 1004;
						width: 75px;
						background: #FFF;
						/* border-radius: 5px; */
						overflow: hidden;

						.scroll-Y {
							max-height: 200px;

							.phone-content {
								display: flex;
								flex-direction: column;

								.phoneItem {
									display: inline-block;
									line-height: 34px;
									color: #333;
									font-size: 12px;
									text-align: center;
								}

								.active {
									background: #597ef7;
									color: #FFF;
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

				input {
					width: 100%;
					padding-left: 15px;
					color: #fff;
				}

			}


			.login_btn {
				width: 100%;
				height: 45px;
				background: #597ef7;
				text-align: center;
				line-height: 45px;
				border-radius: 7px;
				color: #fff;
				font-weight: 600;
				font-size: 16px;
				border-radius: 3px;
			}

			.reg_btn {
				margin-top: 10px;
				width: 100%;
				height: 45px;
				background: linear-gradient(180deg, #565656, #303030);
				text-align: center;
				line-height: 45px;
				border-radius: 7px;
				color: #fff;
				font-weight: 600;
				font-size: 16px;
				border-radius: 3px;
			}

		}

		.login-forget {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20px;

			.text {
				margin-top: 15px;
				// color: #ffb300;
				color: #fff;
				font-size: 14px;
			}
		}

		.login-bottom {
			margin-top: 57px;

			.bottom-download {
				.feedback-download {
					font-size: 12px;
					color: #fff;
					position: relative;
					display: flex;
					flex-direction: row;
					justify-content: center;

					&:before {
						content: "";
						width: 100px;
						height: 0.5px;
						border-bottom: 0.5px dashed;
						position: absolute;
						left: 0;
						top: 50%;
					}

					&:after {
						content: "";
						width: 100px;
						height: 0.5px;
						border-bottom: 0.5px dashed;
						position: absolute;
						right: 0;
						top: 50%;
					}
				}
			}

			.bottom-download-icon {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				padding-top: 32px;

				.feedback {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.icon {
						width: 50px;
						height: 50px;
					}

					& text {
						color: #fff;
						font-size: 16px;
						padding-top: 5px;
						display: flex;
						justify-content: center;
						align-items: center;
						text-align: center;
					}
				}
			}
		}


	}

	.get_code_sms {
		position: absolute;
		// right: 10px;
		right: 0px;
		color: #3d8dfe;
		z-index: 100;
		// bottom: 0px;
		height: 42px;
		max-width: 40%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 13px;
		text-align: center;
	}
</style>
