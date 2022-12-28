<template>
	<view>
		<uni-nav-bar backgroundColor="#00111C" color="#fff" :statusBar="true" :border="false"
			@clickLeft="goBackBtnClick" style="font-weight: 600;" :fixed="true">
			<block slot="left">
				<view class="navLeftBtn">
					<image src="../../static/images/back.svg" mode=""></image>
				</view>
			</block>

			<view class="navTitleCenter">{{navTitle}}</view>
			<block slot="right">
				<view class="customerService" @click="goToOnLineService">
					<image src="../../static/images/customer_service1.png" mode=""></image>
				</view>
			</block>
		</uni-nav-bar>

		<view class="popContainer">
			<view class="popContent">
				<!-- <view class="popContentItem">
					{{$t('user.security.center.bankcard.useradd.select.type.text')}}
					<view class="radioView">
						<u-radio-group v-model="value" active-color="#071a28" class="radio-style" width="50%">
							<u-radio name="USDT">
								USDT
							</u-radio>
						</u-radio-group>
					</view>
				</view>

				<view class="popContentItem">
					{{$t('user.security.center.bankcard.useradd.type.text')}}
					<view class="dropDown">
						<view class="dropDown_postion">
							TRC20
						</view>

						<u-dropdown active-color="#fff">
							<u-dropdown-item v-model="typeValue" :options="typeOptions"></u-dropdown-item>
						</u-dropdown>
					</view>
				</view>
 -->

				<view class="popContentItem">
					{{$t('backapi.self.withdraw.edit.form.sim.number.text')}}
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<u-input type="text" class="forgetPassword_item_input" :placeholder="usdtAddressPlace"
						:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="45"
						v-model="simStr" @input="inputUsdtChange" />
				</view>

				<view class="popContentItem">
					{{$t('backapi.self.withdraw.edit.form.sim.name.text')}}
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<u-input type="text" class="forgetPassword_item_input" :placeholder="usdtAddressPlace"
						:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="45"
						v-model="nameStr" @input="inputUsdtChange" />
				</view>


				<view class="popContentItem">
					{{$t('user.change.phone.code.text')}} <text @click="getSmsCodeClick"
						style="color: #3d8dfe;margin-left: 10px;">({{defalutCodeTitle}})</text>
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<u-input type="text" class="forgetPassword_item_input" :placeholder="smsCodePlace"
						:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="4"
						v-model="smsCode" @input="inputUsdtChange" />
				</view>

				<view class="popContentItem">
					{{$t('user.security.center.bankcard.useradd.pay.passwod.text')}}
					<u-input type="password" class="forgetPassword_item_input" :placeholder="payPwdPlace"
						:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="16"
						v-model="payPwd" @input="inputUsdtChange" />
				</view>


			</view>
			<view class="popTip">
				<view class="popTipTitle">
					<text>{{$t('user.security.center.bankcard.useradd.tip.text')}}</text>
				</view>
				<view class="popTipList">

				</view>
			</view>
			<view class="popFooter">
				<u-button type="primary"
					:class="changeBtnColorBool ? 'popFooterButton activeButton' : 'popFooterButton'"
					@click="changeBtnColorBool && usdtAddBtnClick()" :ripple="true">
					{{$t('user.security.center.bankcard.useradd.submit.text')}}
				</u-button>
			</view>
		</view>

		<u-popup v-model="isShowWithDrawModal" mode="center" :mask-close-able="false"
			:mask-custom-style="maskCustomStyle" :custom-style="popCustomStyle">

			<view class="withdraw_popContainer">
				<view class="withdraw_popContainer_hearder">
					<view class="withdraw_popContainer_hearder_title">{{$t('home.pay.title.text')}}</view>
					<uni-icons type="closeempty" size="25" class="header-icon" color="#3d8dfe"
						@click="isShowWithDrawModal=false"></uni-icons>

				</view>
				<view class="withdraw_popContainer_content">
					<view class="viewTop">
						<u-input type="password" class="withdraw_item_input" :placeholder="withdrawPlace"
							:custom-style="customInputStyle" :placeholder-style="placeholderStyle" :password-icon="true"
							maxlength="16" v-model="inputWithdrawData" @input="withdrawInput" />
					</view>
				</view>
				<view class="withdraw_popContainer_footer">
					<view class="">
						<u-button type="primary" :ripple="true" :class="withdrawPopFooterClass"
							hover-class="withdrawPopFooterButtonHover" @click="confirmSetPayClick">
							{{$t('home.pay.pwd.btn.text')}}
						</u-button>
					</view>
				</view>
			</view>



		</u-popup>


	</view>
</template>

<script>
	import {
		bindSimCardReq,
		getPwdPayReq,
		setPwdPayReq,
		servReq,
		phoneCodeOnlineReq
	} from '@/api/index.js'
	import {
		myMixin,
		changePhoneMixin
	} from '@/util/mixins.js'
	const TIME_COUNT = 59;
	export default {
		mixins: [myMixin, changePhoneMixin],
		data() {
			return {
				navTitle: this.$t('backapi.self.withdraw.bind.sim.text'),

				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				value: 'USDT',

				typeValue: 1,
				typeOptions: [{
					label: 'TRC20',
					value: 1,
				}],

				defaultServerAdd: '',

				timer: null,
				defalutCodeTitle: this.$t('user.change.phone.get.code.text'),
				smsCode: '',
				smsCodePlace: this.$t('user.change.phone.code.place.text'),

				withdrawPopFooterClass: "withdrawPopFooterButton",
				inputWithdrawData: '',
				isShowWithDrawModal: false,
				withdrawPlace: this.$t('home.pay.pwd.input.place.text'),
				maskCustomStyle: {
					'background-color': 'rgba(0, 17, 28, 0.45)'
				},
				popCustomStyle: {
					'background': 'transparent',
				},
				changeBtnColorBool: false,
				payPwd: '',
				simStr: '',
				nameStr: '',
				usdtAddressPlace: '',
				payPwdPlace: '',
				customInputStyle: {
					"min-height": "35px",
					"height": "44px",
					"background-color": "rgb(51, 71, 86)",
					"border-radius": "5px",
					"color": "#fff",
					"padding-left": "17px",
					"padding-right": "17px",
				},
				placeholderStyle: "color:#506778;font-size:12px",
			}
		},
		onShow() {


			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('eventAddSimPageClick', (data) => {
				this.urlFromStr = data.from
				// console.log("data.from",data.from);
			})


			// 获取是否设置过提现密码
			this.getPwdPay()

			this.getServerAddData()

		},
		onHide() {
			clearInterval(this.timer)
		},
		methods: {
			goBackBtnClick() {

				const queryAddSimUrlFrom = uni.getStorageSync('queryAddSimUrlFrom') || 'other'
				if (!this.addUsdtState_Bool) {
					this.urlFromStr = queryAddSimUrlFrom
				}
				if (this.urlFromStr === "simlist") {
					uni.navigateTo({
						url: '/pages/user/SIM_list',
						animationType: 'pop-in',
						animationDuration: 200
					})
				} else if (this.urlFromStr === "withdraw") {
					uni.navigateTo({
						url: '/pages/withdraw/index',
						animationType: 'pop-in',
						animationDuration: 200
					})
				}

			},
			async getServerAddData() {
				let resR = await servReq(this.localLoginToken)
				this.defaultServerAdd = resR.data.serviceAddr
			},
			goToOnLineService() {
				window.location.href = this.defaultServerAdd
			},
			inputUsdtChange() {
				this.commonRuls()
			},
			commonRuls() {
				if (this.simStr && this.nameStr && this.payPwd && this.smsCode) {
					this.changeBtnColorBool = true
				} else {
					this.changeBtnColorBool = false
				}
			},
			async usdtAddBtnClick() {
				let reqParam = {}
				// reqParam.type = "1"
				// reqParam.subType = '11'
				reqParam.sim = this.simStr
				reqParam.name = this.nameStr
				reqParam.payPwd = this.payPwd
				reqParam.code = this.smsCode
				let resR = await bindSimCardReq(reqParam, this.localLoginToken)
				if (resR.code === 200) {
					uni.showToast({
						title: resR.msg,
						icon: 'none',
						duration: 2000,
					});

					// 添加成功后，返回原页面
					this.goBackBtnClick()
				}
			},
			async getPwdPay() {
				let resR = await getPwdPayReq(this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {
					if (resR.data.paySet === 2) { //1已设置 2未设置
						this.isShowWithDrawModal = true
					} else {
						this.isShowWithDrawModal = false
					}
				}
			},
			withdrawInput() {

			},
			async confirmSetPayClick() {

				if (!this.inputWithdrawData) {

					uni.showToast({
						title: this.$t('home.pay.pwd.alert.text'),
						icon: 'none',
						duration: 2000
					});

					return false
				}

				let reqParam = {}
				reqParam.payPwd = this.inputWithdrawData
				reqParam.payPwdAgain = this.inputWithdrawData
				let resR = await setPwdPayReq(reqParam, this.localLoginToken)
				if (resR.code === 200) {
					this.isShowWithDrawModal = false
				}
			},
			async getSmsCodeClick() {
				if (!this.timer) {
					let resR = await phoneCodeOnlineReq('', this.localLoginToken)
					// console.log("resR", resR);
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


					} else if (resR.code === 103) {
						let currData = resR.data[0]
						let currMsgKey = currData.msgKey
						// console.log("currMsgKey", currMsgKey);
						uni.showToast({
							icon: 'none',
							title: this.$t(`backapi.${currMsgKey}`),
							success: () => {
								this.save_updatephone_from('usdtAdd')
								uni.navigateTo({
									url: '/pages/user/change_phone',
									success: (res) => {
										// 通过eventChannel向被打开页面传送数据	
										res.eventChannel.emit('changePhoneEventClick', {
											from: 'usdtAdd'
										})
									},
									animationType: 'pop-in',
									animationDuration: 200
								})

							}
						});
					}






				}



			}

		}
	}
</script>

<style scoped>
	page {
		background-color: #071a28;
		height: 100%;
		position: relative;
	}


	.navLeftBtn {}

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

	.customerService {
		height: 100%;
		margin-right: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.customerService image {
		width: 27px;
		height: 27px;
	}

	.popContainer {
		/* width: 100%; */
		padding: 15px;
	}

	.popContent {}

	.popContentItem {
		color: #fff;
	}

	.radioView {
		margin: 15px 0;
	}

	.dropDown {
		width: 100%;
		height: 43px;
		background: #334756;
		border-radius: 5px;
		margin: 15px 0;
		display: flex;
		align-items: center;
	}

	.dropDown_postion {
		position: absolute;
		margin-left: 10px;
		color: #fff;
	}

	.radio-style {
		display: flex;
		align-items: center;
	}

	/deep/ .u-dropdown__menu__item {
		justify-content: flex-end;
		margin-right: 15px;
	}

	/deep/ .u-cell-item-box {
		background-color: #132736;
		border-radius: 0 0 5px 5px;
		box-shadow: inset 0 15px 10px -15px rgb(0 0 0 / 36%);
	}

	/deep/ .u-cell__value .u-icon--right {
		border: 3px solid #f0f3f6;
		border-radius: 50%;
		opacity: 1;
		background: #132736;

	}

	/deep/ .u-radio__icon-wrap--checked {
		border-color: #fff !important;
	}

	/deep/ .u-dropdown__content__mask {
		background: transparent;
	}

	/deep/ .uicon-checkbox-mark:before {
		visibility: hidden;
	}

	/deep/ .uicon-checkbox-mark span {
		display: block;
		width: 70%;
		background: #3d8dfe;
		height: 70%;
		position: absolute;
		border-radius: 50%;
		left: 16%;
		top: 14%;
	}

	/deep/ .u-flex {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	/deep/ .u-input__right-icon__item {
		margin: 0 10px;
	}

	.forgetPassword_item_input {
		/* height: 42px; */
		line-height: 44px;
		background: #334756;
		border-radius: 5px;
		margin: 15px 0;
		color: #fff;
	}

	.popTip {
		color: #fff;
		font-size: 12px;
		background: #132736;
		padding: 10px 15px;
		position: relative;
		top: 10px;
	}

	.popTipTitle {
		display: flex;
		align-items: center;
		font-size: 12px;
		color: #3d8dfe;
		margin-bottom: 6px;
	}

	.popFooter {
		height: 100%;
		display: flex;
		align-items: center;
		margin-top: 40px;
	}


	.popFooterButton {
		height: 50px;
		width: 80%;
		background: #334756;
		border-radius: 10px;
	}

	.activeButton {
		background: #3d8dfe;
	}


	.popFooterButtonHover {
		background: #334756;
	}

	.withdraw_popContainer {
		width: 350px;
		background: #132736;
		border-radius: 10px;
	}

	.withdraw_popContainer_hearder {
		height: 50px;
		line-height: 50px;
		width: 340px;
		text-align: center;
	}

	.withdraw_popContainer_hearder_title {
		height: 100%;
		color: #fff;
		font-size: 16px;
	}

	.header-icon {
		position: absolute;
		right: 10px;
		top: 0
	}

	.withdraw_popContainer_content {
		padding: 15px;
		margin: 15px 0 0;
		font-size: 16px;
		color: #fff;
		text-align: center;

	}


	.viewTop {
		display: flex;
		flex-direction: column;
		/* padding: 0 10px 0;
	position: relative; */
	}

	.withdraw_item_input {
		width: 100%;
		height: 44px;
		background: #334756;
		border-radius: 5px;
	}

	/deep/ .u-mode-center-box {
		background: transparent;
	}

	.withdraw_popContainer_footer {
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.withdrawPopFooterButton {
		height: 50px;
		width: 200px;
		background-color: #3d8dfe;
		border-radius: 10px;
	}

	.withdrawPopFooterButtonHover {
		background: #334756;
	}
</style>
