<template>
	<view>

		<view class="langView">
			<view class="currLang">
				<view class="currImg" @click="showLangsClick">
					<image :src="currSelectLangImg" mode=""></image>
					<view class="currText">
						{{currSelectLang}}
					</view>
				</view>
				<view class="currIconDownView" @click="showLangsClick">
					<i :class="LangsBool ? 'currIconDown isRotate':'currIconDown' "></i>
				</view>
				<view class="langs" v-if="LangsBool">
					<view :class="item.status === 1 ? 'langItem langActive' : 'langItem' "
						v-for="(item,index) in langList" :key="index" @click="setLangClick(item)">
						<view class="langItemImg">
							<image :src="item.url" mode=""></image>
						</view>
						<view class="langItemContent">
							{{item.lang}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="wrap">
			<view class="wrapContent">
				<view class="logo">
					<image :src="defaultLogo" mode=""></image>
				</view>
				<!-- 登录页面 -->
				<view class="loginContent" v-if="loginStatus">
					<view class="">
						<view class="item">
							<view class="loginImage">
								<image src="../../static/images/account.svg" mode=""></image>
							</view>
							<view class="mainInput">
								<input type="text" value="" :placeholder="$t('login.account.place')"
									v-model="loginAccount" @input="inputUserPass" />
							</view>
						</view>
						<view class="item">
							<view class="loginImage">
								<image src="../../static/images/password.svg" mode=""></image>
							</view>
							<view class="type">
								<view class="mainInput">
									<input type="pass" value="" :placeholder="$t('login.pass.place')"
										:password="passwordBool" maxlength="20" v-model="loginPassword"
										@input="inputUserPass" />
								</view>
								<view class="hidePassImg" @click="loginSeePassClick('login')">
									<image :src="srcImg" mode=""></image>
								</view>
							</view>
						</view>
						<!-- <view class="item" v-if="iSCommonBool">
							<view class="areaView" @click="areaSelectClick">
								<text style="color: #3d8dfe;margin-right:5px;">+{{selectAreaNum}}</text>
								<u-icon name="arrow-down-fill" color="#3d8dfe" size="22"></u-icon>
							</view>
							<view class="mainInput" style="margin-left: 0px;">
								<input type="number" value="" :placeholder="$t('reg.phone.place')" v-model="loginPhone"
									maxlength="16" @input="inputUserPass" />
							</view>
						</view> -->
						<view class="alterTip" v-if="iSCommonBool && phoneAlterTipBool">
							{{phoneAlterTip}}
						</view>
						<view class="item" v-if="iSCommonBool">
							<view class="loginImage">
								<image src="../../static/images/password.svg" mode=""></image>
							</view>
							<view class="type">
								<view class="mainInput">
									<input type="text" value="" :placeholder="$t('user.change.phone.code.text')"
										maxlength="4" v-model="loginPhoneCode" @input="inputUserPass" />
									<view class="get_code_sms" @click="getSmsCodeClick">
										{{defalutCodeTitle}}
									</view>
								</view>

							</view>
						</view>
						<view class="alterTip" v-if="iSCommonBool && phoneAlterTipBool">
							{{loginPhoneCodeAlterTip}}
						</view>
						<view class="item">
							<view class="loginImage">
								<image src="../../static/images/verification.svg" mode=""></image>
							</view>
							<view class="type">
								<view class="mainInput">
									<input type="text" value="" :placeholder="$t('login.vercode.place')" maxlength="4"
										v-model="loginVercode" @input="inputUserPass" />
								</view>
								<view class="inviteImg" @click="getCodeData">
									<image :src="vercodeImg" mode=""></image>
								</view>
							</view>
						</view>
						<view class="forgetView" @click="forgetViewClick">
							{{$t('login.forget.text')}}
						</view>
					</view>

					<view :class="changeBtnColor ?'loginBtn active': 'loginBtn'"
						@click="changeBtnColor == 'loginBtn' ? null:$u.throttle(loginRegfBigBtn, 500)">
						{{$t('login.btntitle')}}
					</view>
					<view class="regBtn" @click="changeLoginRegView">
						{{$t('reg.btntitle')}}
					</view>
					<view class="container">
						<view class="top">
							<view class="">

							</view>
							<view class="">
								{{$t('login.downtitle')}}
							</view>
							<view class="">

							</view>
						</view>
						<view class="twoIcon">
							<view class="module" @click="serverClick">
								<view class="imgPic">
									<image src="../../static/images/server.svg" mode=""></image>
								</view>
								<view class="contentText">
									{{$t('login.chattitle')}}
								</view>
							</view>
							<view class="module" @click="appDownClick">
								<view class="imgPic">
									<image src="../../static/images/download.svg" mode=""></image>
								</view>
								<view class="contentText">
									{{$t('login.apptitle')}}
								</view>
							</view>
						</view>
					</view>
				</view>

				<!-- 注册页面 -->
				<view class="loginContent" v-if="!loginStatus">
					<view class="">
						<view class="item">
							<view class="loginImage">
								<image src="../../static/images/account.svg" mode=""></image>
							</view>
							<view class="mainInput">
								<input type="text" value="" :placeholder="$t('reg.account.place')" v-model="regAccount"
									maxlength="16" @input="regAccoutChangeInput" />
							</view>
						</view>
						<view class="alterTip" v-if="accountAlterTipBool">
							{{accountAlterTip}}
						</view>
						<view class="item">
							<view class="loginImage">
								<image src="../../static/images/password.svg" mode=""></image>
							</view>
							<view class="type">
								<view class="mainInput">
									<input type="pass" value="" :placeholder="$t('reg.pass.place')"
										:password="passwordRegBool" maxlength="16" v-model="regPassword"
										@input="regPassChangeInput" />
								</view>
								<view class="hidePassImg" @click="loginSeePassClick('reg')">
									<image :src="srcRegImg" mode=""></image>
								</view>
							</view>
						</view>
						<view class="alterTip" v-if="passAlterTipBool">
							{{passAlterTip}}
						</view>
						<view class="item">
							<view class="loginImage">
								<image src="../../static/images/password.svg" mode=""></image>
							</view>
							<view class="type">
								<view class="mainInput">
									<input type="pass" value="" :placeholder="$t('reg.passconfirm.place')"
										:password="passwordConfirmBool" maxlength="16" v-model="regConfirmPassword"
										@input="regPassTChangeInput" />
								</view>
								<view class="hidePassImg" @click="loginSeePassClick('regConf')">
									<image :src="srcConfImg" mode=""></image>
								</view>
							</view>
						</view>
						<view class="alterTip" v-if="passTAlterTipBool">
							{{passTAlterTip}}
						</view>
						<view class="item">
							<view class="loginImage">
								<image src="../../static/images/inviteicon.svg" mode=""></image>
							</view>
							<view class="mainInput">
								<input type="text" value="" :placeholder="$t('reg.invitecode.place')"
									v-model="regInviteCode" @input="regInvChangeInput" />
							</view>
						</view>
						<view class="item">
							<!-- <view class="loginImage">
								<image src="../../static/images/account.svg" mode=""></image>
							</view> -->
							<view class="areaView" @click="areaSelectClick">
								<text style="color: #3d8dfe;margin-right:5px;">+{{selectAreaNum}}</text>
								<u-icon name="arrow-down-fill" color="#3d8dfe" size="22"></u-icon>
							</view>
							<view class="mainInput">

								<input type="number" value="" :placeholder="$t('reg.phone.place')" v-model="regPhone"
									maxlength="16" @input="regPhoneChangeInput" />
							</view>
						</view>
						<view class="alterTip" v-if="phoneAlterTipBool">
							{{phoneAlterTip}}
						</view>
						<view class="item">
							<view class="loginImage">
								<image src="../../static/images/verification.svg" mode=""></image>
							</view>
							<view class="type">
								<view class="mainInput">
									<input type="text" value="" :placeholder="$t('login.vercode.place')" maxlength="4"
										v-model="regImgCode" @input="regVerChangeInput" />
								</view>
								<view class="inviteImg" @click="getCodeData">
									<image :src="vercodeImg" mode=""></image>
								</view>
							</view>
						</view>
					</view>
					<view class="alterTip" v-if="verAlterTipBool">
						{{verAlterTip}}
					</view>

					<view :class="changeRegBtnColor ?'loginBtn regBigBtn active': 'loginBtn regBigBtn'"
						@click="changeRegBtnColor ? $u.throttle(loginRegfBigBtn, 500) :null">
						{{$t('reg.btntitle')}}
					</view>
					<view class="loginSmallBtn" @click="changeLoginRegView">
						{{$t('login.btntitle')}}
					</view>
				</view>
			</view>
		</view>


		<u-popup class="dialog" v-model="showAreaBool" mode="bottom" border-radius="54"
			:mask-custom-style="maskCustomStyle" :custom-style="popCustomStyle" @open="popOpen" @close="popClose">

			<scroll-view class="" scroll-y>
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
			</scroll-view>

		</u-popup>


		<u-top-tips ref="uTips" :navbar-height="statusBarHeight + navbarHeight" z-index="1200"></u-top-tips>

	</view>
</template>
<script>
	import {
		loginReq,
		loginNewReq,
		notLoginchangePwd,
		phoneCodeNeedNameReq,
		verifyCodeReq,
		registerReq,
		verifyCodeCheckReq,
		sysConfigReq,
		servTmpReq,
		appUrlReq,
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
				defaultLogo: '',
				srcImg: '../../static/images/nosee.svg',
				srcRegImg: '../../static/images/nosee.svg',
				srcConfImg: '../../static/images/nosee.svg',
				passwordBool: true,
				passwordRegBool: true,
				passwordConfirmBool: true,
				loginAccount: '',
				loginPassword: '',
				loginPhone: '',
				loginPhoneCode: '',
				loginVercode: '',
				vercodeImg: 'null',
				changeBtnColor: false,
				LangsBool: false,
				currSelectLangImg: "../../static/images/lang_en.svg",
				currSelectLang: 'EN',
				langList: [{
						lang: "EN",
						type: "EN",
						url: "../../static/images/lang_en.svg",
						status: 1,
					},
					// {
					// 	lang: "CN",
					// 	type: "CN",
					// 	url: "../../static/images/lang_zh.svg",
					// 	status: 0,
					// },
					{
						lang: "HI",
						type: "HI",
						url: "../../static/images/lang_hi.svg",
						status: 0,
					},
					{
						lang: "YK",
						type: "YK",
						url: "../../static/images/lang_yk.svg",
						status: 0,
					},
					{
						lang: "PT",
						type: "PT",
						url: "../../static/images/lang_pt.svg",
						status: 0,
					},
					{
						lang: "ES",
						type: "ES",
						url: "../../static/images/lang_es.svg",
						status: 0,
					},
					{
						lang: "DE",
						type: "DE",
						url: "../../static/images/lang_de.svg",
						status: 0,
					},
					{
						lang: "FR",
						type: "FR",
						url: "../../static/images/lang_fr.svg",
						status: 0,
					},
					{
						lang: "TR",
						type: "TR",
						url: "../../static/images/lang_tr.svg",
						status: 0,
					},
					{
						lang: "IT",
						type: "IT",
						url: "../../static/images/lang_it.svg",
						status: 0,
					},
				],
				langList2: [{
						lang: "en",
						type: "en",
						url: "../../static/images/lang_en.svg"
					},
					// {
					// 	lang: "zh",
					// 	type: "zh",
					// 	url: "../../static/images/lang_zh.svg"
					// },
					{
						lang: "hi",
						type: "hi",
						url: "../../static/images/lang_hi.svg"
					},
					{
						lang: "pt",
						type: "pt",
						url: "../../static/images/lang_pt.svg"
					},
					{
						lang: "es",
						type: "es",
						url: "../../static/images/lang_es.svg"
					},
					{
						lang: "de",
						type: "de",
						url: "../../static/images/lang_de.svg"
					},
					{
						lang: "fr",
						type: "fr",
						url: "../../static/images/lang_fr.svg"
					},
					{
						lang: "tr",
						type: "tr",
						url: "../../static/images/lang_tr.svg"
					},
					{
						lang: "it",
						type: "it",
						url: "../../static/images/lang_it.svg"
					},
				],
				loginStatus: true,
				regAccount: '',
				regPassword: '',
				regConfirmPassword: '',
				regInviteCode: '',
				regPhone: '',
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
				phoneAlterTip: '',
				loginPhoneCodeAlterTip: '',
				accountAlterTipBool: false,
				passAlterTipBool: false,
				passTAlterTipBool: false,
				verAlterTipBool: false,
				phoneAlterTipBool: false,
				loginText: '',
				loginDesc: '',
				tabLoginText: '',


				verifyCodeImg: '',

				regNickName: '',
				regQqNum: '',
				regCode: '',

				currAlterMsg: '',
				currHideStatus: 1, //1不显示,2显示

				needinviteCodeNum: 1, //1.需要2.不需要
				currServerAdd: '',
				currDevOsNum: null,
				downUrl: "",

				showAreaBool: false,
				maskCustomStyle: {
					'background-color': 'rgba(0, 17, 28, 0.45)'
				},
				popCustomStyle: {
					'background': 'transparent',
				},
				areaList: [],
				currentSelectIndex: '',
				selectAreaNum: '',
				iSCommonBool: false,
				defalutCodeTitle: this.$t('user.change.phone.get.code.text'),
				timer: null,
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

			// 获取app下载地址
			this.getAppDownUrlData()

			if (this.isNewDevice) {
				this.iSCommonBool = true
			}
		},
		onHide() {
			clearInterval(this.timer)
		},
		methods: {
			...mapMutations(['login']),
			initLang() { //初始化语言


				let saveLangStr = (uni.getStorageSync('foot_lang') ? uni.getStorageSync('foot_lang') : 'en').toUpperCase()

				// this.currSelectLang = 
				// console.log("this.currSelectLang",this.currSelectLang);
				if (saveLangStr !== 'CN') {
					this.currSelectLangImg = '../../static/images/lang_' + saveLangStr.toLowerCase() + '.svg'
					this.currSelectLang = saveLangStr
				} else {
					this.currSelectLangImg = ''
					this.currSelectLang = ""
				}

				this.$i18n.locale = saveLangStr.toLowerCase()

				this.defalutCodeTitle = this.$t('user.change.phone.get.code.text')

			},
			async getServerAddressData() {
				// servTmpReq
				let resR = await servTmpReq()
				if (resR.code === 200) {
					// console.log("resR", resR.data.serviceAddr);
					if (resR.data) {
						this.currServerAdd = resR.data.serviceAddr
					}

				}
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

				if (currentPageOptions.length !== 0 && currentPageOptions.hasOwnProperty('ojbk')) {
					this.loginStatus = true
					console.log("HACK!");
					uni.setStorageSync('foot_lang', 'cn')
					this.initLang()
				}

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

					this.areaList = resR.data.area_code
					if (this.areaList.length === 0) {
						this.currentSelectIndex = ""
						return false
					}
					this.currentSelectIndex = 0
					this.selectAreaNum = this.areaList[0]
				}
			},
			loginSeePassClick(str) { //显示密码和隐藏密码(3个共用)
				let imgLeftName = "../../static/images/see.svg"
				let imgRightName = "../../static/images/nosee.svg"
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
			inputUserPass() { //登录页面输入框改变监听事件

				if (this.iSCommonBool) { //需要短信验证码
					if (this.loginAccount && this.loginPassword && this.loginVercode && this
						.loginPhoneCode) {
						this.changeBtnColor = true
					} else {
						this.changeBtnColor = false
					}
				} else {
					if (this.loginAccount && this.loginPassword && this.loginVercode) {
						this.changeBtnColor = true
					} else {
						this.changeBtnColor = false
					}
				}


			},
			regAccoutChangeInput() {
				this.commonRuls()

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
				this.commonRuls()
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
				this.commonRuls()
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
				this.commonRuls()

			},
			regPhoneChangeInput() {
				this.commonRuls()

				if (!this.regPhone) {
					this.phoneAlterTip = this.$t('reg.ruls.phone.empty')
					this.phoneAlterTipBool = true
				} else {
					this.phoneAlterTip = ""
					this.phoneAlterTipBool = false
				}

			},
			async regVerChangeInput() {

				this.commonRuls()

				if (!this.regImgCode) {
					this.verAlterTip = this.$t('reg.ruls.vercode.empty')
					this.verAlterTipBool = true
				} else if (this.regImgCode && this.regImgCode.length === 4) { // 检验验证码
					let resR = await verifyCodeCheckReq(this.loginVercodehash, this.regImgCode)
					// console.log("resR",resR);
					if (resR.code !== 200) {
						this.verAlterTipBool = true
						this.verAlterTip = resR.msg
					} else {
						this.verAlterTipBool = false
						this.verAlterTip = ""
					}

				} else {
					this.verAlterTipBool = false
					this.verAlterTip = ""
				}

			},

			commonRuls() {

				if (this.needinviteCodeNum === 1) {
					if (this.regAccount && this.regPassword && this.regConfirmPassword && this
						.regPhone && this.regInviteCode && this.regImgCode) {
						this.changeRegBtnColor = true
					} else {
						this.changeRegBtnColor = false
					}
				} else {
					if (this.regAccount && this.regPassword && this.regConfirmPassword && this.regImgCode) {
						this.changeRegBtnColor = true
					} else {
						this.changeRegBtnColor = false
					}
				}


			},
			showLangsClick() { //显示或者隐藏语言列表点击事件
				this.LangsBool = !this.LangsBool

				let currLangLists = [...this.langList]
				let obj = {};
				currLangLists.filter((item, index) => {
					// console.log("item.type.toLowerCase()", this.currSelectLang.toLowerCase());

					if (item.type === this.currSelectLang && this.currSelectLang) {
						item.status = 1
					} else if (item.type !== this.currSelectLang && this.currSelectLang) {
						item.status = 0
					}

					if (item.status === 1) {
						obj = item;
						currLangLists.splice(index, 1)
						// return;
					}

					return item
				})

				// currLangLists.forEach((item,index)=>{
				// 	if(item.status === 1){
				// 		obj = item;
				// 		currLangLists.splice(index,1)
				// 		return;
				// 	}

				// })

				currLangLists.unshift(obj);
				this.langList = currLangLists

			},
			setLangClick(item) { //选择某个语言进行设置的点击方法

				// console.log("item",item);
				// e的参数zh-Hans // en 这种应用能重启生效 要不然用this.$i18n.locale = 'zh-Hans'
				if (item.type.toLowerCase() !== this.$i18n.locale) {
					// uni.setLocale(item.type.toLowerCase());
					this.$i18n.locale = item.type.toLowerCase();
					uni.setStorageSync('foot_lang', this.$i18n.locale)
				}

				this.defalutCodeTitle = this.$t('user.change.phone.get.code.text')
				this.currSelectLang = item.type.toUpperCase()
				this.currSelectLangImg = item.url
				this.LangsBool = false

			},
			async loginRegfBigBtn() { //注册点击事件
				// console.log("111");
				if (this.loginStatus) { //点击登录页面中登录按钮

					if (this.loginAccount == "") {

						uni.showToast({
							title: this.$t('login.ruls.accout.empty'),
							icon: "none",
							duration: 2000
						});


						return false
					}

					if (this.loginPassword == "") {

						uni.showToast({
							title: this.$t('login.ruls.pass.empty'),
							icon: "none",
							duration: 2000
						});

						return false
					}

					if (this.loginVercode == "") {

						uni.showToast({
							title: this.$t('login.ruls.vercode.empty'),
							icon: "none",
							duration: 2000
						});

						return false
					}
					// this.$refs.loading.showLoading() // 显示

					// uni.showLoading({
					// 	title: 'login...',
					// })




					let reqParam = {}
					reqParam.username = this.loginAccount
					reqParam.password = this.loginPassword
					reqParam.code = this.loginVercode
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


					this.currAlterMsg = loginRes.msg
					// this.$refs.loading.hideLoading() // 隐藏
					// console.log("loginRes",loginRes);
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
						// uni.hideLoading();
						// console.log("loginRes.data", loginRes.data);
						if (loginRes.data) {
							let currData = loginRes.data[0]
							let currMsgKey = currData.msgKey
						}
						// console.log("currData",currData);
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


					// if(this.regAccount == ""){

					// 	uni.showToast({
					// 		title: this.$t('reg.ruls.accout.empty'),
					// 		icon:"none",
					// 		duration: 2000
					// 	});

					// 	return false
					// }



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
							this.$refs.uTips.show({
								title: registerRes.msg,
								type: 'error',
								duration: '1000'
							})

							this.getCodeData()

						}

					}





				}
			},
			confirmLoginToUser(provider) {
				this.login(provider)

				uni.reLaunch({
					url: '/pages/home/index',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			changeLoginRegView() { //切换登录和注册视图点击事件
				this.loginStatus = !this.loginStatus
				this.getCodeData()
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
			getCodeClick() { //点击验证码图片更新验证码
				// console.log("获取验证码点击")
				this.getCodeData();
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
			},
			forgetViewClick() { //忘记密码点击事件
				uni.navigateTo({
					url: '/pages/user/forget_password',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			async getSmsCodeClick() {
				if (!this.loginAccount) {

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
					reqParams.username = this.loginAccount
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
		}
	}
</script>

<style>
	page {
		/* box-shadow: 0 0 8px 2px rgb(0 0 0 / 20%); */
		width: 100%;
		height: 100%;
		position: relative;
		background: url("../../static/images/login-bg.jpg") no-repeat;
		background-size: 100%;
		background-attachment: fixed;
	}

	.langView {
		position: fixed;
		left: 15px;
		top: 15px;
		z-index: 1000;
		color: #fff;
		height: 27px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid #334756;
		width: 75px;
		border-radius: 3px;
		font-size: 12px;
	}

	.currLang {
		display: flex;
		flex-direction: row;
	}

	.currImg {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-right: 30px;
	}

	.currImg image {
		width: 18px;
		height: 18px;
		margin: 0 5px;
	}

	.currIconDownView {
		background: #334756;
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
		width: 22px;
		display: flex;
		align-items: center;
	}

	.currIconDown {
		margin-left: 4px;
		transform: translate(2px, 2px) rotate(-180deg);
		display: inline-block;
		width: 0;
		height: 0;
		border-width: 0 6px 8px;
		border-style: solid;
		border-color: transparent transparent #3d8dfe;
	}

	.isRotate {
		transform: rotate(0deg);
	}

	.wrap {
		position: absolute;
		left: 0;
		right: 0;
		text-align: center;
	}

	.wrapContent {
		max-width: 340px;
		width: 90%;
		margin: 0 20px;
		margin: auto;
		margin-top: 35px;
		border-radius: 8px;
		padding: 5px 0 10px;
	}


	.logo {
		text-align: center;
		margin-top: 40px;
	}

	.logo image {
		height: 80px;
	}

	.item {
		/* margin: 0 20px; */
		margin: 0 5px;
		margin-top: 20px;
		display: flex;
		align-items: center;
		padding: 0 20px;
		border-radius: 10px;
		background: rgba(51, 71, 86, .6);
		height: 47px;
		position: relative;
	}


	.forgetView {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-right: 25px;
		margin-top: 10px;
		font-size: 13px;
		color: #fff;
	}

	.areaView {
		width: 30%;
		height: 47px;
		line-height: 47px;
		margin-left: -20px;
	}

	.alterTip {
		text-align: left;
		margin-top: 10px;
		margin-left: 35px;
		font-size: 12px;
		/* font-weight: bold; */
		color: red;
	}

	.loginImage {
		max-width: 22px;
		max-height: 22px;
		display: flex;
		justify-content: center;
		align-items: center;

	}


	.loginImage image {
		width: 22px;
		height: 22px;
	}


	.mainInput {
		font-size: 14px;
		margin-left: 16px;
		height: 30px;
		/* line-height: 30px; */
		flex: 1;
		text-align: left;
		background: transparent;
		border: none;
		color: #fff;
	}

	.mainInput input {
		display: flex;
		position: relative;
		width: 100%;
		height: 100%;
		flex-direction: column;
		justify-content: center;
		font-size: 12px;
		font-family: Hiragino Sans GB;
		font-weight: 400;
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

	.type {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
	}

	.hidePassImg {
		display: flex;
		width: 30px;
		align-items: center;
		justify-content: center;
		margin-top: 5px;
	}

	.hidePassImg image {
		width: 24px;
		height: 11px;
	}

	.inviteImg {
		display: flex;
	}

	.inviteImg image {
		width: 90px;
		height: 25px;
	}

	.toLR {
		display: flex;
		/* justify-content: end; */
		margin: 20px 0;
		font-weight: 700;
		font-size: 12px;
		line-height: 16px;
		text-align: right;
		color: #3d8dfe;
	}


	.loginBtn {

		height: 50px;
		width: 80%;
		margin: 0 auto;
		background: #334756;
		border-radius: 10px;
		border: none;
		font-size: 16px;
		color: #FFF;
		display: flex;
		justify-content: center;
		align-items: center;

		margin-top: 40px;
	}

	.regBtn {
		background: #334756;
		height: 40px;
		width: 50%;
		margin: 0 auto;
		border-radius: 10px;
		border: none;
		font-size: 16px;
		color: #FFF;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20px;
	}

	.active {
		background: #3d8dfe;
	}

	.container .top {
		margin: 50px 0 10px;
		/* margin: 30px 0 10px; */
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		font-size: 12px;
	}

	.container .top view:first-child,
	.container .top view:last-child {
		border-bottom: 1px dashed #fff;
		width: 30%;
	}

	.twoIcon {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.module {
		width: 40%;
		text-align: center;
	}


	.imgPic image {
		width: 37px;
		height: 37px;
	}

	.contentText {
		font-size: 12px;
		color: #fff;
		font-weight: 500;
		margin-top: 5px;
	}

	.langs {
		position: absolute;
		top: 26px;
		width: 75px;
		height: 150px;
		border: 1px solid #334765;
		border-radius: 0 0 3px 3px;
		overflow: auto;
	}

	.langs::-webkit-scrollbar {
		display: none
	}

	.langItem {
		height: 40px;
		display: flex;
		align-items: center;
		color: #506778;
	}

	.langItemImg {
		display: flex;
		align-items: center;
	}

	.langItemImg image {
		width: 18px;
		height: 18px;
		margin: 0 5px;
	}

	.langActive {
		border-right: 2px solid #3d8dfe;
		color: #fff;
	}

	.loginSmallBtn {
		background: #334756;
		/* line-height: 16px; */
		border-radius: 10px;
		width: 50%;
		height: 40px;
		margin: 20px auto;
		font-size: 12px;
		font-weight: 700;
		/* color: #3d8dfe; */
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		/* margin-bottom: 20px */
	}

	.regBigBtn {
		margin-top: 20px;
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

	/deep/ .uni-input-placeholder {
		color: #fff;
	}
</style>
