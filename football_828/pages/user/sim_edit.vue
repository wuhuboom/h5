<template>
	<view>

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
			<view class="line">

			</view>
			<view class="items">

				<view class="item">
					{{$t('backapi.self.withdraw.edit.form.sim.number.text')}}
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<u-input type="text" class="uCard" :placeholder="simStrPlace" :custom-style="customInputStyle"
						maxlength="45" v-model="simStr" @input="inputUsdtChange" :clearable="false" />
				</view>

				<view class="item">
					{{$t('backapi.self.withdraw.edit.form.sim.name.text')}}
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<u-input type="text" class="uCard" :placeholder="simStrPlace" :custom-style="customInputStyle"
						maxlength="45" v-model="nameStr" @input="inputUsdtChange" :clearable="false" />
					<!-- <uni-icons type="scan" size="20" color="#99999" class="scan-icon"></uni-icons> -->

				</view>
				<view class="item">
					{{$t('user.change.phone.code.text')}} <text @click="getSmsCodeClick"
						style="color: #ffbc00;margin-left: 10px;">({{defalutCodeTitle}})</text>
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<u-input type="text" class="uCard" :placeholder="smsCodePlace" :custom-style="customInputStyle"
						:placeholder-style="placeholderStyle" maxlength="8" v-model="smsCode"
						@input="inputUsdtChange" />
				</view>
				<view class="item">
					{{$t('user.security.center.bankcard.useradd.pay.passwod.text')}}
					<input type="password" style='width:0;height:0;min-height:0' />
					<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
					<u-input :type="payPassBool ? 'text' : 'password' " :clearable="false" :password-icon="false"
						class="uCard" :placeholder="payPwdPlace" :custom-style="customInputStyle"
						:placeholder-style="placeholderStyle" maxlength="16" v-model="payPwd"
						@input="inputUsdtChange" />
					<uni-icons :type="payPassBool ? 'eye' : 'eye-slash'" size="20" color="#99999" class="scan-icon"
						@click="showPayPass">
					</uni-icons>
				</view>
			</view>
			<button :class="changeBtnColorBool ? 'next btn-active' : 'next'"
				@click="changeBtnColorBool && usdtAddBtnClick()"
				:disabled="changeBtnColorBool ? false : true">{{$t('user.security.center.bankcard.useradd.submit.text')}}</button>
		</view>


	</view>
</template>

<script>
	import {
		// bindSimCardReq,
		bindSimCardEditReq,
		getPwdPayReq,
		setPwdPayReq,
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
				showPayTypeBool: false,
				payPassBool: false,
				navTitle: this.$t('backapi.self.withdraw.edit.sim.text'),

				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				value: 'USDT',

				typeValue: 1,
				typeOptions: [{
					label: 'TRC20',
					value: 1,
				}],

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
				simStrPlace: '',
				payPwdPlace: '',
				customInputStyle: {
					"text-align": "left",
					"border-color": "rgb(220, 223, 230)",
					"padding": "0 40px 0 10px"
				},
				placeholderStyle: "color:#506778;font-size:12px",
			}
		},
		onShow() {


			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('editSimObjs', (data) => {
				this.editData = data
				this.simStr = data.sim
				this.nameStr = data.simName
				this.urlFromStr = data.from


				// console.log("data.from",data.from);
			})


			// 获取是否设置过提现密码
			this.getPwdPay()

		},
		onHide() {
			clearInterval(this.timer)
		},
		methods: {
			goBackBtnClick() {

				uni.navigateTo({
					url: '/pages/user/SIM_list',
					animationType: 'pop-in',
					animationDuration: 200
				})

				// const queryAddSimUrlFrom = uni.getStorageSync('queryAddSimUrlFrom') || 'other'
				// if (!this.addUsdtState_Bool) {
				// 	this.urlFromStr = queryAddSimUrlFrom
				// }
				// if (this.urlFromStr === "usdtlist") {
				// 	uni.navigateTo({
				// 		url: '/pages/user/USDT_list',
				// 		animationType: 'slide-in-top',
				// 		animationDuration: 200
				// 	})
				// } else if (this.urlFromStr === "withdraw") {
				// 	uni.navigateTo({
				// 		url: '/pages/withdraw/index',
				// 		animationType: 'slide-in-top',
				// 		animationDuration: 200
				// 	})
				// }

			},
			goToOnLineService() {
				window.location.href = getApp().globalData.kefuaddress;
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
				reqParam.id = this.editData.id
				reqParam.sim = this.simStr
				reqParam.name = this.nameStr
				reqParam.payPwd = this.payPwd
				reqParam.code = this.smsCode
				let resR = await bindSimCardEditReq(reqParam, this.localLoginToken)
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
				this.showPayTypeBool = !this.showPayTypeBool
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
								this.save_bindphone_from('usdtAdd')
								uni.navigateTo({
									url: '/pages/user/bind_phone',
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

<style lang="scss" scoped>
	page {
		background-color: #1f252f;
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

	.withdraw-usdt-add {

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
				color: #4b4e5c;

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
				background-color: #171e25;
				padding: 0 30px 0 10px;

			}
		}
	}

	.list-cells {
		padding-top: 25px;



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
		padding-top: 25px;
	}

	.card-title {
		position: relative;
		color: #4b4e5c;
		font-size: 13px;
	}

	.uni-list-cell-db {
		position: relative;
		background-color: #171e25;

		.type-name {
			color: #fff;
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
		color: #f8f8f8;
	}

	.next {
		margin-top: 25px;
		width: 90%;
		height: 50px;
		line-height: 50px;
		border-radius: 9px;
	}

	.btn-active {
		background: linear-gradient(90deg, #ffe69f, #ffc24a);
		color: #111;
	}
</style>
