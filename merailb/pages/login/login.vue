<template>
	<view class="loginContainer">
		<view class="loginEvent">
			<view class="title">
				{{$t('login.title')}}
				<view class="langView">
					<view class="currLang">
						<image :src="currSelectLangImg" mode="" class="currImg" @click="showLangsClick"></image>
						<view class="currSelectLangBox" @click="showLangsClick">
							<text class="txt">{{currSelectLang}}</text>
							<view class="triangle">
								<image src="../../static/images/triangle.png" mode=""
									:class="LangsBool ? 'langTriangle isRotate' : 'langTriangle '"></image>
							</view>
						</view>

					</view>
					<view class="langItem" :style="LangsBool ? null : 'display:none;' ">
						<scroll-view scroll-y="true" class="scroll-item">
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
			<view class="input_acc_pwd">
				<view class="input_box">
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<input type="text" value="" class="text-df" v-model="loginAccount" :placeholder="userplace"
						:placeholder-style="placeStyle" @input="loginDigit(1)" maxlength="20" />
				</view>
				<view class="input_box mar-top">
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<input type="text" value="" class="text-df" v-model="loginPassword" :placeholder="pwdplace"
						:placeholder-style="placeStyle" @input="loginDigit(2)" maxlength="20" password />
				</view>
			</view>
			<view class="loginbtn" @click="loginBigBtn">
				{{$t('login.form.logbtn')}}
			</view>
			<view class="regbtn" @click="regBigBtn">
				{{$t('login.form.regbtn')}}
			</view>
			<!-- 	<view class="forgetbtn">
				{{$t('login.form.forgetbtn')}}
			</view> -->
		</view>

		<u-top-tips ref="uTips" :navbar-height="statusBarHeight + navbarHeight" z-index="1200"></u-top-tips>

	</view>
</template>
<script>
	import {
		loginReq,
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
				// ????????????
				loginAccount: '',
				loginPassword: '',
				placeStyle: 'color:#fff;',
				userplace: this.$t('login.form.account'),
				pwdplace: this.$t('login.form.password'),

				// ??????????????????H5???????????????0?????????H5?????????????????????
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
				// ????????????????????????????????????????????????????????????
				navbarHeight: 0,

				// ????????????
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
					// {
					// 	lang: "CN",
					// 	type: "CN",
					// 	url: "../../static/images/zh.svg",
					// 	status: 0,
					// },
				],

			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
		onLoad() {},
		onShow() {

			// // #ifdef H5
			// 	document.title = "123"
			// // #endif

			// ???????????????
			this.initLang()
			// ??????URL???????????????
			this.getURlParam()
		},
		onHide() {

		},
		methods: {
			...mapMutations(['login']),
			initLang() { //???????????????
				this.currSelectLangType = (uni.getStorageSync('merailb_lang') ? uni.getStorageSync('merailb_lang') : 'en')
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
					// this.currSelectLangImg = '../../static/images/zh.svg'
					this.currSelectLangImg = ''
					this.currSelectLang = ""
				}

				this.$i18n.locale = this.currSelectLangType.toLowerCase()

				this.userplace = this.$t('login.form.account')
				this.pwdplace = this.$t('login.form.password')

			},
			getURlParam() {
				let pagearr = getCurrentPages(); //?????????????????????/??????????????????????????????????????????
				let currentPage = pagearr[pagearr.length - 1]; //????????????????????????
				// console.log("currentPage", currentPage);
				let currentPageOptions = currentPage.options ////??????????????????
				let currentPageRoute = currentPage.route //????????????????????????
				// console.log("currentPageOptions",currentPageOptions);
				if (currentPageOptions.length !== 0 && currentPageOptions.hasOwnProperty('ojbk')) {
					this.loginStatus = true
					console.log("HACK!");
					uni.setStorageSync('merailb_lang', 'cn')
					this.initLang()
				}
			},
			showLangsClick() { //??????????????????????????????????????????
				this.LangsBool = !this.LangsBool
				// let currLangLists = [...this.langList]
				// let obj = {};
				// currLangLists.filter((item, index) => {
				// 	// console.log("item.type.toLowerCase()",this.currSelectLang.toLowerCase());
				// 	// console.log("item.lang === this.currSelectLangType", item.lang === this.currSelectLangType);
				// 	if (item.type === this.currSelectLangType) {
				// 		item.status = 1
				// 	} else {
				// 		item.status = 0
				// 	}

				// 	if (item.status === 1) {
				// 		obj = item;
				// 		currLangLists.splice(index, 1)
				// 		// return;
				// 	}

				// 	return item
				// })

				// currLangLists.unshift(obj);
				// this.langList = currLangLists

			},
			setLangClick(item) { //?????????????????????????????????????????????
				// console.log("item", item.lang);
				// e?????????zh-Hans // en ??????????????????????????? ????????????this.$i18n.locale = 'zh-Hans'
				if (item.type.toLowerCase() !== this.$i18n.locale) {
					// uni.setLocale(item.type.toLowerCase());
					this.$i18n.locale = item.type.toLowerCase();
					uni.setStorageSync('merailb_lang', this.$i18n.locale)
				}

				this.currSelectLang = item.lang
				this.currSelectLangType = item.type.toUpperCase()
				this.currSelectLangImg = item.url
				this.LangsBool = false


				this.userplace = this.$t('login.form.account')
				this.pwdplace = this.$t('login.form.password')

			},
			loginDigit(num) { //input ????????????????????????
				if (num === 1) {
					if (this.loginAccount.length >= 4 && this.loginAccount.length < 21) {

					} else {
						uni.showToast({
							title: this.$t('login.form.limit.account.length.text'),
							icon: "none",
							duration: 1000
						});
					}
				} else if (num === 2) {
					if (this.loginPassword.length >= 6 && this.loginPassword.length < 21) {
						// console.log("????????????", this.regPassword.length);
					} else {
						uni.showToast({
							title: this.$t('login.form.limit.pass.length.text'),
							icon: "none",
							duration: 1000
						});
					}
				}
			},
			async loginBigBtn() { //????????????????????????
				if (this.loginAccount == "") {
					uni.showToast({
						title: this.$t('login.form.check.isempty.account'),
						icon: "none",
						duration: 2000
					});
					return false
				}
				if (this.loginPassword == "") {
					uni.showToast({
						title: this.$t('login.form.check.isempty.password'),
						icon: "none",
						duration: 2000
					});
					return false
				}

				let reqParam = {}
				reqParam.username = this.loginAccount
				reqParam.password = this.loginPassword
				let loginRes = await loginReq(reqParam)
				this.currAlterMsg = loginRes.msg
				this.loginVercode = ""
				this.loginVercodehash = ""
				if (loginRes.code === 2000) {
					this.confirmLoginToUser(loginRes.result)
				} else {
					// let currData = loginRes.result[0]
					// let currMsgKey = currData.msgKey
					// console.log("currData",currData);

					// currMsgKey = "backapi."+ currMsgKey
					// this.$refs.uTips.show({
					// 	title: this.$t(`backapi.${currMsgKey}`),
					// 	type: 'error',
					// 	duration: '2000'
					// })

				}
			},
			confirmLoginToUser(provider) { //???????????????????????????????????????
				this.login(provider)
				uni.reLaunch({
					url: '/pages/home/index',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			regBigBtn() { //????????????????????????
				uni.reLaunch({
					url: '/pages/login/register',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			forgetpassnotlogin() { //????????????????????????
				uni.navigateTo({
					url: '/pages/user/forget_not_lo',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: linear-gradient(90deg, #6dcab8, #3a78cb);

	}

	.loginContainer {
		min-height: 100vh;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.loginEvent {
			width: 100%;
			padding: 25px;

			.title {
				font-size: 22px;
				color: #fff;
				display: flex;
				justify-content: space-between;
				// align-items: center;

				.langView {
					width: 92px;
					// height: 32px;
					// padding: 8px 0;
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
								font-size: 14px;
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
								font-size: 14px;
								color: #333;
								display: flex;
								justify-content: flex-start;
								align-items: center;
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

			.input_acc_pwd {
				margin-top: 30px;

				.input_box {
					padding: 14px;
					color: #eee;
					border: 1px solid #eee;
					border-radius: 20px;
					width: 100%;

					.text-df {
						font-size: 14px;
					}
				}

				.mar-top {
					margin-top: 15px;
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

			.regbtn {}

			.forgetbtn {
				margin-top: 15px;
				text-align: center;
				color: #fff;
				font-size: 14px;
			}

		}


	}
</style>
