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
					{{$t('user.change.phone.old.phone.text')}}
				</view>
				<u-input type="text" disabled class="forgetPassword_item_input" :placeholder="loginPlace"
					:custom-style="customInputStyle" maxlength="16" v-model="oldPhoneStr" />
			</view>
			<view class="forgetPassword_item">
				<view class="forgetPassword_item_title">
					{{$t('user.change.phone.new.phone.text')}}
				</view>
				<view class="phoneViewArea">
					<view class="areaView" @click="areaSelectClick">
						<text style="color: #3d8dfe;margin-right:5px;">+{{selectAreaNum}}</text>
						<u-icon name="arrow-down-fill" color="#3d8dfe" size="22"></u-icon>
					</view>
					<u-input type="number" class="forgetPassword_item_input phoneView" :clearable="false"
						:placeholder="newPhonePlace" :custom-style="customPhoneInputStyle"
						:placeholder-style="placeholderStyle" maxlength="16" v-model="newPhone"
						@input="inputNewPassChange" />


				</view>

			</view>
			<view class="errorTip">
				{{newPhoneTip}}
			</view>
			<view class="forgetPassword_item codeview">
				<view class="forgetPassword_item_title">
					{{$t('user.change.phone.code.text')}}
				</view>
				<u-input type="text" :clearable="false" class="forgetPassword_item_input" :placeholder="phoneCodePlace"
					:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="4"
					v-model="codeSmsStr" @input="inputConfPassChange" />
				<view class="get_code_sms" @click="getSmsCodeClick">
					{{defalutCodeTitle}}
				</view>
			</view>
			<view class="errorTip">
				{{codeSmsTip}}
			</view>

			<view :class="changeBtnColorBool ?'loginBtn active': 'loginBtn'"
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
		phoneBindReq,
		playerInfoReq,
		phoneCodeReq,
		sysConfigReq
	} from '../../api/index.js'
	import {
		myMixin,
		changePhoneMixin,
		addBankMinxi
	} from '@/util/mixins.js'
	// import {mapState,mapMutations} from 'vuex'
	const TIME_COUNT = 59;
	export default {
		data() {
			return {
				defalutCodeTitle: this.$t('user.change.phone.get.code.text'),
				navTitle: this.$t('user.change.phone.title.text'),
				loginPlace: "",
				newPhonePlace: this.$t('user.change.phone.new.phone.place.text'),
				phoneCodePlace: this.$t('user.change.phone.get.code.text'),
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
				newPhone: '',
				codeSmsStr: '',
				changeBtnColorBool: false,
				newPhoneTip: '',
				newPhoneTipBool: false,
				codeSmsTip: '',
				codeSmsTipBool: false,
				localLoginToken: '',
				oldPhoneStr: '',
				timer: null,
				urlFromStr: '',
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
		mixins: [myMixin, changePhoneMixin, addBankMinxi],
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

			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('changePhoneEventClick', async (data) => {
				this.urlFromStr = data.from
			})


			// 初始化语言
			this.initLang()


			// 初始化数据集
			this.initData()


			//获取区号列表
			this.getAreaData()

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

				this.navTitle = this.$t('user.change.phone.title.text')
				this.newPhonePlace = this.$t('user.change.phone.new.phone.place.text')
				this.phoneCodePlace = this.$t('user.change.phone.code.place.text')
				this.defalutCodeTitle = this.$t('user.change.phone.get.code.text')

			},
			async initData() {
				this.newPhone = ""
				this.codeSmsStr = ""
				let resR = await playerInfoReq(this.localLoginToken)
				// console.log("res", resR.data.phone);
				if (resR.code === 200) {
					this.oldPhoneStr = resR.data.phone
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
			goBackBtnClick() {


				const queryChangePhoneFrom = uni.getStorageSync('queryChangePhoneUrlFrom') || 'other'
				// console.log("queryChangePhoneFrom", queryChangePhoneFrom);
				if (!this.updatePhoneState_Bool) {
					this.urlFromStr = queryChangePhoneFrom
				}
				if (this.urlFromStr === "withdraw") {
					uni.navigateTo({
						url: '/pages/withdraw/index',
						animationType: 'pop-in',
						animationDuration: 200
					})
				} else if (this.urlFromStr === "securityCenter") {
					uni.navigateTo({
						url: '/pages/user/securityCenter',
						animationType: 'pop-in',
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
			commonRuls() {
				if (this.newPhone && this.codeSmsStr) {
					this.changeBtnColorBool = true
				} else {
					this.changeBtnColorBool = false
				}
			},
			inputNewPassChange() {
				this.commonRuls()

				if (!this.newPhone) {
					this.newPhoneTip = this.$t('user.security.center.rule.phone.not.empty.text')
					this.newPhoneTipBool = true
				} else {
					this.newPhoneTip = ""
					this.newPhoneTipBool = false
				}

			},
			inputConfPassChange() {
				this.commonRuls()

				if (!this.codeSmsStr) {
					this.codeSmsTip = this.$t('user.security.center.rule.code.not.empty.text')
					this.codeSmsTipBool = true
				} else {
					this.codeSmsTip = ""
					this.codeSmsTipBool = false
				}

			},
			async updateBtnClick() {

				if (!this.newPhone) {

					uni.showToast({
						title: this.$t('user.security.center.rule.phone.not.empty.text'),
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
					clearInterval(this.timer);
					this.timer = null;
					uni.showToast({
						title: this.$t('user.change.phone.change.success.text'),
						icon: 'none',
						duration: 2000
					});

					this.initData()
				} else if (resR.code === 402 || resR.code === 403) {
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
		margin-bottom: 14px;
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
		margin-bottom: 14px;
		margin-top: 20px;
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
		margin-top: 60px;
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
