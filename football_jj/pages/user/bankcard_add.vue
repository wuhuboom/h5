<template>
	<view>

		<view class="backTitleBar-wrapper colCent borderBox">
			<view class="fixedBox">
				<view class="common_header" style="height: 44px;">
					<view class="define">
						<view class="define_left_slot" @click="goBackBtnClick">
							<view class="">
								<u-icon name="arrow-left" size="32"></u-icon>
							</view>
						</view>
						<view class="define_center_slot">
							<view class="">
								<text class="title">{{navTitle}}</text>
							</view>
						</view>
						<view class="define_right_slot">
							<view class="">
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

		<view class="withdraw-usdt-add">
			<view class="items">

				<view class="uni-list">
					<view class="uni-list-cell list-cells">
						<view class="card-title">
							{{$t('user.security.center.bankcard.bankadd.input.address.text')}}
						</view>
						<view class="uni-list-cell-db" @click="showPayTypeClick">
							<view class="type-name">
								{{cardNumSelect}}
							</view>
							<uni-icons type="bottom" size="20" color="#333"></uni-icons>
						</view>
					</view>
				</view>

				<view class="item">
					{{$t('user.security.center.bankcard.bankadd.input.province.text')}}
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<u-input type="text" class="uCard"
						:placeholder="$t('user.security.center.bankcard.bankadd.input.place.province.text')"
						:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="16"
						v-model="provinceStr" @input="inputBankChange" />
				</view>
				<view class="item">
					{{$t('user.security.center.bankcard.bankadd.input.city.text')}}
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<u-input type="text" class="uCard"
						:placeholder="$t('user.security.center.bankcard.bankadd.input.place.city.text')"
						:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="16"
						v-model="cityStr" @input="inputBankChange" />
				</view>
				<view class="item">
					{{$t('user.security.center.bankcard.bankadd.input.branch.text')}}
					<u-input type="text" class="uCard"
						:placeholder="$t('user.security.center.bankcard.bankadd.input.place.branch.text')"
						:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="16"
						v-model="branchStr" @input="inputBankChange" />
				</view>
				<view class="item">
					{{$t('user.security.center.bankcard.bankadd.input.account.name.text')}}
					<u-input type="text" class="uCard"
						:placeholder="$t('user.security.center.bankcard.bankadd.input.place.account.name.text')"
						:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="16"
						v-model="accountNameStr" @input="inputBankChange" />
				</view>

				<!-- 身份证 -->
				<view class="item" v-if="withDrawAreaStatus">
					{{$t('backapi.self.add.bank.cardID.text')}}
					<u-input type="text" class="uCard" :placeholder="$t('backapi.self.add.bank.cardID.input.text')"
						:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="30"
						v-model="cardIDStr" @input="inputBankChange" />
				</view>
				<!-- 预留手机号 -->
				<view class="item" v-if="withDrawAreaStatus">
					{{$t('backapi.self.add.bank.phone.text')}}
					<u-input type="text" class="uCard" :placeholder="$t('backapi.self.add.bank.phone.input.text')"
						:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="30"
						v-model="cardPhoneStr" @input="inputBankChange" />
				</view>

				<view class="item">
					{{$t('user.security.center.bankcard.bankadd.input.card.number.text')}}
					<u-input type="text" class="uCard"
						:placeholder="$t('user.security.center.bankcard.bankadd.input.place.card.number.text')"
						:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="30"
						v-model="cardNumStr" @input="inputBankChange" />
				</view>
				<view class="item">
					{{$t('user.security.center.bankcard.bankadd.input.confirm.text')}}
					<u-input type="text" class="uCard"
						:placeholder="$t('user.security.center.bankcard.bankadd.input.place.card.number.text')"
						:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="30"
						v-model="cardConfirmNumStr" @input="inputBankChange" />
				</view>
				<view class="item">
					{{$t('user.security.center.bankcard.bankadd.input.bank.code.text')}}
					<u-input type="text" class="uCard"
						:placeholder="$t('user.security.center.bankcard.bankadd.input.place.bank.code.text')"
						:custom-style="customInputStyle" :placeholder-style="placeholderStyle" maxlength="16"
						v-model="bankCodeStr" @input="inputBankChange_real" />
				</view>
				<view class="item">
					{{$t('user.change.phone.code.text')}} <text @click="getSmsCodeClick"
						style="color: #597ef7;margin-left: 10px;">({{defalutCodeTitle}})</text>
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<u-input type="text" class="uCard" :placeholder="smsCodePlace" :custom-style="customInputStyle"
						:placeholder-style="placeholderStyle" maxlength="16" v-model="smsCode"
						@input="inputBankChange" />
				</view>
				<view class="item">
					{{$t('user.security.center.bankcard.useradd.pay.passwod.text')}}
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<u-input :type="payPassBool ? 'text' : 'password' " :clearable="false" :password-icon="false"
						class="uCard" :placeholder="payPwdPlace" :custom-style="customInputStyle"
						:placeholder-style="placeholderStyle" maxlength="16" v-model="payPwd"
						@input="inputBankChange" />
					<uni-icons :type="payPassBool ? 'eye' : 'eye-slash'" size="20" color="#99999" class="scan-icon"
						@click="showPayPass">
					</uni-icons>
				</view>
			</view>
			<view class="" style="padding-bottom: 20px;">
				<button :class="changeBtnColorBool ? 'next btn-active' : 'next'"
					@click="changeBtnColorBool && bankAddBtnClick()"
					:disabled="changeBtnColorBool ? false : true">{{$t('user.security.center.bankcard.useradd.submit.text')}}</button>
			</view>
		</view>

		<!-- 提现卡列表 -->
		<u-popup v-model="cardsAllPopBool" mode="bottom" width="315px" border-radius="10">
			<view class="">

			</view>
			<view class="cards-pop cards">
				<u-search color="#333" shape="square" search-icon-color="#606266"
					:placeholder="$t('user.security.center.bankcard.address.name.text')" bg-color="#f8f8f8"
					:show-action="true" :action-text="rightActionText" :action-style="rightActionStyle"
					input-align="center" height="60" v-model="keywordCardSearch" margin="8px 0" @search="searchChange"
					@blur="searchChange" @clear="clearClick">
				</u-search>
				<scroll-view scroll-y="true" class="card-list cards-list">
					<view class="card" v-for="(item,index) in defaultTypeList" :key="item.value"
						@click="selectCardClick(item)">
						<view class="left">
							<view class="card-name">
								{{item.label}}
							</view>
						</view>
						<u-icon v-if="typeValue === item.value" name="checkmark" color="#597ef7"></u-icon>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		bindBankCardReq,
		banksReq,
		getPwdPayReq,
		setPwdPayReq,
		phoneCodeOnlineReq,
	} from '@/api/index.js'
	import {
		myMixin,
		addBankMinxi,
		changePhoneMixin,
		withdrawMinxi
	} from '@/util/mixins.js'
	const TIME_COUNT = 59;
	export default {
		mixins: [myMixin, addBankMinxi, changePhoneMixin, withdrawMinxi],
		data() {
			return {
				cardNumSelect: '',
				cardsAllPopBool: false,
				payPassBool: false,
				navTitle: this.$t('user.security.center.bankcard.bankadd.title.text'),
				addressSelect: '',
				provinceStr: '',
				cityStr: '',
				branchStr: '',
				accountNameStr: '',

				cardNumStr: '',
				cardConfirmNumStr: '',
				bankCodeStr: '',


				typeValue: "",
				typeOptions: [],
				keywordCardSearch: '',
				defaultTypeList: [],
				rightActionText: this.$t('backapi.self.bank.search.text'),
				rightActionStyle: {
					// color: "#fff"
				},

				timer: null,
				defalutCodeTitle: this.$t('user.change.phone.get.code.text'),
				smsCode: '',
				smsCodePlace: this.$t('user.change.phone.code.place.text'),

				changeBtnColorBool: false,
				payPwd: '',
				usdtAddress: '',
				usdtAddressPlace: '',
				payPwdPlace: this.$t('user.security.center.bankcard.bankadd.input.place.pay.pass.text'),
				customInputStyle: {
					"text-align": "left",
					"border-color": "rgb(220, 223, 230)",
					"padding": "0 40px 0 10px"
				},
				placeholderStyle: "color:#33333369;font-size:13px",


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
			eventChannel.on('eventAddBankPageClick', (data) => {
				this.urlFromStr = data.from
				// console.log("data.from",data.from);
			})

			this.getBankInfo()

			// 获取是否设置过提现密码
			this.getPwdPay()
		},
		onHide() {
			clearInterval(this.timer)
		},
		methods: {
			goBackBtnClick() {

				const queryAddBankUrlFrom = uni.getStorageSync('queryAddBankUrlFrom') || 'other'
				if (!this.addBankState_Bool) {
					this.urlFromStr = queryAddBankUrlFrom
				}
				// console.log("this.urlFromStr", this.urlFromStr);

				if (this.urlFromStr === "bankcardlist") {
					uni.navigateTo({
						url: '/pages/user/bankcard_list',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (this.urlFromStr === "withdraw") {

					// 此页面返回源页面需清除此状态,否则无法正常显示其默认的内容
					this.set_withdraw_model_bool(false)

					uni.navigateTo({
						url: '/pages/withdraw/index',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				}

			},
			goToOnLineService() {
				window.location.href = getApp().globalData.kefuaddress;
			},
			async getBankInfo() {
				let resR = await banksReq({}, this.localLoginToken)
				if (resR.code === 200) {

					if (resR.data.areaId && resR.data.areaId === 1) { //印度
						this.withDrawAreaStatus = false
					} else if (resR.data.areaId && resR.data.areaId === 2) { //加纳
						this.withDrawAreaStatus = true
					}

					let resultData = resR.data.banks
					// console.log("resultData",resultData);
					if (resultData.length === 0) {

						return false
					}
					let newResultData = []
					resultData.forEach((item, index) => {
						newResultData.push({
							label: item.bankCname,
							value: item.id,
						})
					})

					// console.log("newResultData", newResultData);
					this.typeOptions = newResultData
					this.defaultTypeList = newResultData
					this.typeValue = newResultData[0].value
					// console.log("this.typeValue", this.typeValue);
					this.addressSelect = newResultData[0].label
					this.cardNumSelect = this.addressSelect
				}
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
						.cardNumStr && this.cardConfirmNumStr &&
						this.payPwd && this.smsCode && this.bankCodeStr
				} else {
					tempWhereStr = this.branchStr && this.accountNameStr && this.cardNumStr && this
						.cardConfirmNumStr &&
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
				let resR = await bindBankCardReq(reqParam, this.localLoginToken)
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
			showPayPass() {
				this.payPassBool = !this.payPassBool
			},
			showPayTypeClick() {
				this.keywordCardSearch = ""
				this.defaultTypeList = this.typeOptions
				this.cardsAllPopBool = !this.cardsAllPopBool
			},
			selectCardClick(item) { //卡列表弹窗选择点击事件

				this.typeValue = item.value
				this.cardNumSelect = item.label

				this.typeOptions.sort((a, b) => a.value === item.value ? -1 : 0)
				this.cardsAllPopBool = false
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
				this.defaultTypeList = this.typeOptions
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
								this.save_bindphone_from('bankCardAdd')
								uni.navigateTo({
									url: '/pages/user/bind_phone',
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


<style lang="scss" scoped>
	page {
		background-color: #f8f8f8;
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
		// color: #fff;
		font-weight: 700;
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

	.withdraw-usdt-add {
		background: #fff;
		margin-top: 10px;

		.line {
			width: 100%;
			height: 7px;
			background-color: #171e25;
			margin-top: 15px;


		}

		.items {
			padding: 0 16px;

			.item {
				font-size: 13px;
				margin-top: 15px;
				position: relative;
				color: #7f8aa1;

				.scan-icon {
					position: absolute;
					bottom: 8px;
					right: 10px;
				}
			}



			.uCard {
				font-size: 12px;
				margin-top: 8px;
				font-weight: 400;
				border-radius: 5px;
				background-color: #f8f8f8;
				padding: 0 30px 0 10px;

			}
		}
	}

	.money-name {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: 16px;
		height: 40px;

		.card-top-title {
			font-size: 16px;
			color: #f8f8f8;

			.name {
				padding-left: 5px;
			}
		}

		.card-right {
			display: flex;
			align-items: center;
			flex-direction: row;

			.icon {
				width: 23px;
				height: 23px;
			}

			.name {
				padding-left: 10px;
				color: #7f8aa1;
			}
		}
	}

	.list-cells {
		padding-top: 10px;
	}

	.card-title {
		position: relative;
		color: #7f8aa1;
		font-size: 13px;
	}

	.uni-list-cell-db {
		position: relative;
		background-color: #f8f8f8;

		.type-name {
			color: #333;
		}

		.selector-item {
			position: absolute;
			width: 100%;
			background-color: #171e25;
			left: 0;
			top: 46px;
			border-radius: 5px;
			z-index: 9999;
			padding-left: 10px;
			padding-right: 10px;

			.scroll-Y {
				height: 175px;
				overflow: hidden;

				.item {
					margin-top: 0px;
					padding-top: 13px;
					padding-bottom: 13px;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;

					&:nth-last-child(1) {
						border-bottom: 0px;
					}

					.title {
						color: #999;
						font-weight: 500;
						font-size: 13px;
					}
				}

				.active {
					.title {
						color: #fb0;
					}
				}
			}
		}
	}

	.uni-list-cell-db,
	.card-name-type {
		width: 100%;
		height: 45px;
		border-radius: 5px;
		display: flex;
		justify-content: space-between;
		padding: 0 10px;
		margin: 10px 0;
		align-items: center;
		font-size: 14px;
		border-radius: 5px;
	}

	/deep/ .u-input__input {
		color: #333;
	}

	.next {
		margin-top: 25px;
		width: 90%;
		height: 50px;
		line-height: 50px;
		border-radius: 9px;
	}

	.btn-active {
		background: #597ef7;
		color: #fff;
	}

	/deep/ uni-view.u-input__right-icon.u-flex {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 10px;
	}


	/deep/ .u-drawer-bottom {
		background-color: #fff;

		.cards {
			height: 450px;

			.cards-list {
				height: 350px;
				overflow: auto;
			}
		}

		.cards-pop {
			padding: 18px 15px 0;


			.card-list {
				font-size: 15px;
				color: #f8f8f8;
				padding-bottom: 30px;
				margin-top: 20px;

				.card {
					display: flex;
					justify-content: space-between;
					padding: 15px 0 15px 15px;
					// border-bottom: 0.5px solid #111;
					font-size: 12px;

					.left {
						display: flex;
						justify-content: space-between;

						.card-name {
							color: #333;
						}
					}
				}
			}

		}


	}
</style>
