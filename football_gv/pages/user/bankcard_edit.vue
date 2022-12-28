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
				<!-- <view class="customerService" @click="goToOnLineService">
					<image src="../../static/images/customer_service1.png" mode=""></image>
				</view> -->
			</block>
		</uni-nav-bar>

		<view class="popContainer">
			<view class="popContent">
				<view class="popContentItem">
					{{$t('user.security.center.bankcard.bankadd.input.address.text')}}
					<view class="inputAndArrow">
						<u-input type="text" disabled placeholder="" class="forgetPassword_item_input"
							:custom-style="customInputStyleAdd" v-model="addressSelect" @click="showCardClick" />
						<view class="iconArrow" @click="showCardClick">
							<image src="../../static/images/icon_up.svg" :class="showCardstatus ? 'down' : null">
							</image>
						</view>
					</view>
					<!-- <view class="dropDown">
						<view class="dropDown_postion">
							{{addressSelect}}
						</view>

							<u-dropdown active-color="#fff" ref="uDropdown" @open="open" @close="close">
							<u-dropdown-item height="500" v-model="typeValue" :options="typeOptions"
								@change="dropChange">
							</u-dropdown-item>
						</u-dropdown>

						

					</view> -->
				</view>

				<view class="popContentItem">
					{{$t('user.security.center.bankcard.bankadd.input.province.text')}}
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<u-input type="text" class="forgetPassword_item_input"
						:placeholder="$t('user.security.center.bankcard.bankadd.input.place.province.text')"
						:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="16"
						v-model="provinceStr" @input="inputBankChange" />
				</view>

				<view class="popContentItem">
					{{$t('user.security.center.bankcard.bankadd.input.city.text')}}
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<u-input type="text" class="forgetPassword_item_input"
						:placeholder="$t('user.security.center.bankcard.bankadd.input.place.city.text')"
						:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="16"
						v-model="cityStr" @input="inputBankChange" />
				</view>


				<view class="popContentItem">
					{{$t('user.security.center.bankcard.bankadd.input.branch.text')}}
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<u-input type="text" class="forgetPassword_item_input"
						:placeholder="$t('user.security.center.bankcard.bankadd.input.place.branch.text')"
						:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="16"
						v-model="branchStr" @input="inputBankChange" />
				</view>


				<view class="popContentItem">
					{{$t('user.security.center.bankcard.bankadd.input.account.name.text')}}
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<u-input type="text" class="forgetPassword_item_input"
						:placeholder="$t('user.security.center.bankcard.bankadd.input.place.account.name.text')"
						:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="16"
						v-model="accountNameStr" @input="inputBankChange" />
				</view>


				<!-- 身份证 -->
				<view class="popContentItem" v-if="withDrawAreaStatus">
					{{$t('backapi.self.add.bank.cardID.text')}}
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<u-input type="text" class="forgetPassword_item_input"
						:placeholder="$t('backapi.self.add.bank.cardID.input.text')" :custom-style="customInputStyle"
						:placeholder-style="placeholderStyle" maxlength="30" v-model="cardIDStr"
						@input="inputBankChange" />
				</view>
				<!-- 预留手机号 -->
				<view class="popContentItem" v-if="withDrawAreaStatus">
					{{$t('backapi.self.add.bank.phone.text')}}
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<u-input type="text" class="forgetPassword_item_input"
						:placeholder="$t('backapi.self.add.bank.phone.input.text')" :custom-style="customInputStyle"
						:placeholder-style="placeholderStyle" maxlength="30" v-model="cardPhoneStr"
						@input="inputBankChange" />
				</view>

				<view class="popContentItem">
					{{$t('user.security.center.bankcard.bankadd.input.card.number.text')}}
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<u-input type="text" class="forgetPassword_item_input"
						:placeholder="$t('user.security.center.bankcard.bankadd.input.place.card.number.text')"
						:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="16"
						v-model="cardNumStr" @input="inputBankChange" />
				</view>

				<view class="popContentItem">
					{{$t('user.security.center.bankcard.bankadd.input.confirm.text')}}
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<u-input type="text" class="forgetPassword_item_input"
						:placeholder="$t('user.security.center.bankcard.bankadd.input.place.card.number.text')"
						:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="16"
						v-model="cardConfirmNumStr" @input="inputBankChange" />
				</view>

				<view class="popContentItem">
					{{$t('user.security.center.bankcard.bankadd.input.bank.code.text')}}
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<u-input type="text" class="forgetPassword_item_input"
						:placeholder="$t('user.security.center.bankcard.bankadd.input.place.bank.code.text')"
						:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="16"
						v-model="bankCodeStr" @input="inputBankChange_real" />
				</view>

				<view class="popContentItem">
					{{$t('user.change.phone.code.text')}} <text @click="getSmsCodeClick"
						style="color: #3d8dfe;margin-left: 10px;">({{defalutCodeTitle}})</text>
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<u-input type="text" class="forgetPassword_item_input" :placeholder="smsCodePlace"
						:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="4"
						v-model="smsCode" @input="inputBankChange" />
				</view>

				<view class="popContentItem">
					{{$t('user.security.center.bankcard.bankadd.input.pay.pass.text')}}
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<u-input type="password" class="forgetPassword_item_input" :placeholder="payPwdPlace"
						:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="16"
						v-model="payPwd" @input="inputBankChange" />
				</view>


			</view>

			<view class="popFooter">
				<u-button type="primary"
					:class="changeBtnColorBool ? 'popFooterButton activeButton' : 'popFooterButton'"
					@click="changeBtnColorBool && bankAddBtnClick()" :ripple="true">
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

		<u-popup class="dialog" v-model="showCardstatus" mode="bottom" border-radius="54"
			:mask-custom-style="maskCustomStyle" :custom-style="popCustomStyle">
			<view class="dialogMain">
				<view class="dialogTitle">
					<view class="dialogLine">

					</view>
					<view class="">
						<u-search color="#FFFFFF" search-icon-color="#606266"
							:placeholder="$t('user.security.center.bankcard.address.name.text')" bg-color="#334756"
							:show-action="false" input-align="center" height="60" v-model="keywordCardSearch"
							margin="10px" @search="searchChange" @blur="searchChange" @clear="clearClick">
						</u-search>
					</view>
				</view>
				<view class="dialogContent">
					<view class="dialogContentList">
						<view
							:class="currentSelectType === item.value ? 'dialogContentListCellActive': 'dialogContentListCell'"
							v-for="(item,index) in defaultTypeList" :key="`${item.value}--${index}`"
							@click="selectTypeClick(item)">
							<!-- {{item.value}} -->
							{{item.label}}
						</view>
					</view>
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import {
		bindBankCardEditReq,
		banksReq,
		getPwdPayReq,
		setPwdPayReq,
		servReq,
		phoneCodeOnlineReq,
		playerInfoReq
	} from '@/api/index.js'
	import {
		myMixin,
		addBankMinxi,
		changePhoneMixin
	} from '@/util/mixins.js'
	const TIME_COUNT = 59;
	export default {
		mixins: [myMixin, addBankMinxi, changePhoneMixin],
		data() {
			return {
				navTitle: this.$t('backapi.self.edit.bankcard'),
				addressSelect: '',
				provinceStr: '',
				cityStr: '',
				branchStr: '',
				accountNameStr: '',
				cardNumStr: '',
				cardConfirmNumStr: '',
				bankCodeStr: '',

				defaultServerAdd: '',

				timer: null,
				defalutCodeTitle: this.$t('user.change.phone.get.code.text'),
				smsCode: '',
				smsCodePlace: this.$t('user.change.phone.code.place.text'),

				areaId: 1,

				typeValue: 1,
				typeOptions: [],

				currentSelectType: 1,
				defaultTypeList: [],
				showCardstatus: false,
				keywordCardSearch: '',


				changeBtnColorBool: false,
				payPwd: '',
				usdtAddress: '',
				usdtAddressPlace: '',
				payPwdPlace: this.$t('user.security.center.bankcard.bankadd.input.place.pay.pass.text'),
				customInputStyle: {
					"min-height": "35px",
					"height": "44px",
					"background-color": "rgb(51, 71, 86)",
					"border-radius": "5px",
					"color": "#fff",
					"padding-left": "17px"
				},
				customInputStyleAdd: {
					"min-height": "35px",
					"height": "44px",
					"background-color": "rgb(51, 71, 86)",
					"border-radius": "5px",
					"color": "#fff",
					"padding-left": "5px"
				},
				placeholderStyle: "color:#506778;font-size:12px",


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
				hoverClass: 'u-cell-hover',
				editData: {},

				cardIDStr: '',
				cardPhoneStr: '',
				withDrawAreaStatus: false,
			}
		},
		onShow() {


			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('editBankObjs', (data) => {
				// console.log("data", data);
				this.editData = data

				// this.typeValue = data.bankId
				this.provinceStr = data.province
				this.cityStr = data.city
				this.branchStr = data.subBranch
				this.accountNameStr = data.cardName
				this.cardNumStr = data.cardNumber
				this.cardConfirmNumStr = data.cardNumberTwice
				this.bankCodeStr = data.backEncoding
				this.cardIDStr = data.identityCard
				this.cardPhoneStr = data.phone
			})


			this.getPlayInfo()


			this.getBankInfo()

			// 获取是否设置过提现密码
			this.getPwdPay()


			this.getServerAddData()
		},
		onHide() {
			clearInterval(this.timer)
		},
		methods: {
			goBackBtnClick() {

				uni.navigateTo({
					url: '/pages/user/bankcard_list',
					animationType: 'pop-in',
					animationDuration: 200
				})

				// const queryAddBankUrlFrom = uni.getStorageSync('queryAddBankUrlFrom') || 'other'
				// if (!this.addBankState_Bool) {
				// 	this.urlFromStr = queryAddBankUrlFrom
				// }

				// if (this.urlFromStr === "bankcardlist") {
				// 	uni.navigateTo({
				// 		url: '/pages/user/bankcard_list',
				// 		animationType: 'pop-in',
				// 		animationDuration: 200
				// 	})
				// } else if (this.urlFromStr === "withdraw") {
				// 	uni.navigateTo({
				// 		url: '/pages/withdraw/index',
				// 		animationType: 'pop-in',
				// 		animationDuration: 200
				// 	})
				// }

			},
			async getServerAddData() {
				let resR = await servReq(this.localLoginToken)

				this.defaultServerAdd = resR.data.serviceAddr
			},
			goToOnLineService() {
				window.location.href = this.defaultServerAdd
			},
			async getPlayInfo() {
				let resR = await playerInfoReq(this.localLoginToken)
				// console.log("resR", resR.data);
				if (resR.code === 200) {
					if (resR.data.areaCode == '91') {
						this.areaId = 1
					}

					this.getBankInfo()
				}
			},
			async getBankInfo() {
				let resR = await banksReq({}, this.localLoginToken)
				if (resR.code === 200) {

					if (this.areaId === 1) { //印度
						this.withDrawAreaStatus = false
					} else if (this.areaId === 2) { //加纳
						this.withDrawAreaStatus = true
					}

					// if (resR.data.areaId && resR.data.areaId === 1) { //印度
					// 	this.withDrawAreaStatus = false
					// } else if (resR.data.areaId && resR.data.areaId === 2) { //加纳
					// 	this.withDrawAreaStatus = true
					// }

					let resultData = resR.data.banks
					// console.log("resultData",resultData);
					if (resultData.length === 0) {

						return false
					}
					let newResultData = []
					resultData.forEach((item, index) => {
						newResultData.push({
							label: item.bankCname,
							value: item.id
						})
					})


					this.typeOptions = newResultData
					this.defaultTypeList = newResultData
					this.typeValue = newResultData[0].value
					this.currentSelectType = newResultData[0].value
					this.addressSelect = newResultData[0].label


					// console.log("typeOptions", this.typeOptions);
					// console.log("typeValue", this.typeValue);
					// console.log("addressSelect", this.addressSelect);
				}
			},
			open(index) {
				// 展开某个下来菜单时，先关闭原来的其他菜单的高亮
				// 同时内部会自动给当前展开项进行高亮
				this.$refs.uDropdown.highlight(index);
			},
			close(index) {
				// 关闭的时候，给当前项加上高亮
				this.$refs.uDropdown.highlight(index);
			},
			dropChange(value) {
				// console.log("value",value);
				this.typeValue = value
				this.typeOptions.forEach(item => {
					if (item.value === value) {
						this.addressSelect = item.label
					}
				})
			},
			inputBankChange() {
				this.commonRuls()
			},
			inputBankChange_real() {
				let currStr = this.bankCodeStr.toUpperCase()
				// 去除空格,暂时不用
				// const reg = new RegExp(/\s/)
				// 直接用另种方法,替换空格处理先
				currStr = currStr.replace(/\s*/g, "");
				currStr = currStr.replace(/[^\w./]/ig, '')
				// console.log("currStr", currStr, this.regexRuls(currStr));
				if (this.regexRuls(currStr)) {
					// 为防止头尾存在空格,再次去掉
					this.$nextTick(() => {
						this.bankCodeStr = currStr.trim()
					})

				} else {
					this.$nextTick(() => {
						this.bankCodeStr = ""
					})
				}
				this.commonRuls()

			},
			regexRuls(str) {
				var regex = /^[0-9A-Z]+$/; //正则表达式
				if (regex.test(str)) {
					return true
				} else {
					return false
				}
			},
			commonRuls() {
				let tempWhereStr = ""

				if (this.withDrawAreaStatus) { //需要显示银行卡和预留手机号出来
					tempWhereStr = this.branchStr && this.accountNameStr && this.cardIDStr && this.cardPhoneStr && this
						.cardNumStr && this.cardConfirmNumStr && this.payPwd && this.smsCode && this.bankCodeStr
				} else {
					tempWhereStr = this.branchStr && this.accountNameStr && this.cardNumStr && this.cardConfirmNumStr &&
						this.payPwd && this.smsCode && this.bankCodeStr
				}

				if (tempWhereStr) {
					this.changeBtnColorBool = true
				} else {
					this.changeBtnColorBool = false
				}



			},
			async bankAddBtnClick() {

				let reqParam = {}
				reqParam.bankId = this.typeValue
				if (this.provinceStr) {
					reqParam.province = this.provinceStr
				}
				if (this.cityStr) {
					reqParam.city = this.cityStr
				}

				if (!this.bankCodeStr) {
					uni.showToast({
						title: this.$t('backapi.self.bank.code.isEmpty.text'),
						icon: 'none',
						duration: 2000,
					});
					return false
				}

				reqParam.subBranch = this.branchStr
				reqParam.cardName = this.accountNameStr

				if (this.withDrawAreaStatus) {
					reqParam.identityCard = this.cardIDStr
					reqParam.phone = this.cardPhoneStr
				}

				reqParam.cardNumber = this.cardNumStr
				reqParam.cardNumberTwice = this.cardConfirmNumStr
				reqParam.backCode = this.bankCodeStr

				reqParam.payPwd = this.payPwd
				reqParam.code = this.smsCode
				let resR = await bindBankCardEditReq(reqParam, this.localLoginToken)
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
			showCardClick() {
				this.keywordCardSearch = ""
				// const newRealData = [{
				// 	label: this.addressSelect,
				// 	value: this.currentSelectType
				// }, ...this.typeOptions.filter(item => item.value !== this.currentSelectType)];


				this.defaultTypeList = this.typeOptions
				// this.defaultTypeList = newRealData
				this.showCardstatus = !this.showCardstatus
			},
			searchChange() {
				// keywordCardSearch

				// 先清空展示的数据
				this.defaultTypeList = []
				//前端匹配
				this.defaultTypeList = this.typeOptions.filter((item) => {
					return item.label.indexOf(this.keywordCardSearch) >= 0
				})


			},
			clearClick() {
				this.keywordCardSearch = ""
				// console.log("11", this.defaultTypeList);
				this.defaultTypeList = this.typeOptions
			},
			selectTypeClick(item) {
				// console.log("item", item);
				this.showCardstatus = false
				this.currentSelectType = item.value
				this.typeValue = item.value
				// this.selectTypeNum = item.value
				this.addressSelect = item.label
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
								this.save_updatephone_from('bankCardAdd')
								uni.navigateTo({
									url: '/pages/user/change_phone',
									success: (res) => {
										// 通过eventChannel向被打开页面传送数据	
										res.eventChannel.emit('changePhoneEventClick', {
											from: 'bankCardAdd'
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
		font-size: 13px;
	}

	.radio-style {
		display: flex;
		align-items: center;
	}

	/deep/ .u-dropdown__menu__item {
		justify-content: flex-end;
		margin-right: 15px;
	}


	/deep/ .u-cell-hover {
		background-color: #334756;
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


	.dialog {
		z-index: 10;
	}

	/deep/ .u-drawer-bottom {
		background-color: #132736;
	}


	.dialogMain {
		background-color: #132736;
		height: 450px;
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
		/* margin-top: 10px; */
		margin-top: 5px;
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
		/* flex: 0 0 32.33%; */
		width: 100%;
		margin-right: 1%;

	}

	.dialogContentListCellActive {
		/* 	grid-column-start: 1;
		grid-column-end: 3; */
		background: #3d8dfe;
		/* margin-top: 10px; */
		margin-top: 5px;
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
		/* flex: 0 0 32.33%; */
		width: 100%;
		margin-right: 1%;
	}

	/* 
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
	} */

	.inputAndArrow {
		position: relative;
	}

	.iconArrow {
		position: absolute;
		top: 10px;
		right: 10px;
	}

	.iconArrow image {
		width: 17px;
		height: 9px;
		transition: all .3s ease-out;
		transform: rotate(-180deg);
		-webkit-transform: rotate(-180deg);
	}

	.iconArrow .down {
		transform: rotate(0deg);
		-webkit-transform: rotate(0deg);
	}
</style>
