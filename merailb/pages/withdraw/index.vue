<template>
	<view class="">
		<view class="withdrawContainer">
			<view class="backTitleBar-wrapper colCent borderBox">
				<view class="fixedBox">
					<view class="common_header" style="height: 45px;">
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


			</view>

			<view class="banner">

			</view>

			<view class="moneyContain">
				<view class="money_poundage">
					<view class="money">
						<view class="title">
							{{$t('withdraw.money.balance.text')}}
						</view>
						<view class="num">
							{{balanceNum}}
						</view>
					</view>
					<view class="poundage">
						<view class="">
							{{$t('withdraw.money.withdraw.poundage.text')}}: {{handfree}}%
						</view>
					</view>
				</view>
			</view>

			<view class="inputContain">
				<view class="input_t">
					{{$t('withdraw.money.input.text')}}
				</view>
				<view class="input_v">
					<text class="text">{{symbolStr}}</text>
					<input type="number" value="" class="inputMoney" v-model="withdrawmoney" />
				</view>
				<view class="real_btn">
					<view class="actual_money">
						{{$t('withdraw.money.actual.text')}}: {{actualMoney}}
					</view>
					<view class="all_money" @click="allMoneyClick">
						{{$t('withdraw.money.all.money.text')}}
					</view>
				</view>
			</view>

			<view class="bankContain">
				<view class="item">
					<view class="">
						{{$t('withdraw.content.title.text')}}
					</view>
					<view class="">
						{{bankname}}
					</view>
				</view>
				<view class="item">
					<view class="">
						{{$t('withdraw.content.nickname.text')}}
					</view>
					<view class="">
						{{username}}
					</view>
				</view>
				<view class="item">
					<view class="">
						{{$t('withdraw.content.account.text')}}
					</view>
					<view class="">
						{{cardstr}}
					</view>
				</view>
				<view class="item">
					<view class="">
						{{$t('withdraw.content.phone.text')}}
					</view>
					<view class="">
						{{phonestr}}
					</view>
				</view>
				<view class="item">
					<view class="">
						{{$t('withdraw.content.email.text')}}
					</view>
					<view class="">
						{{emailstr}}
					</view>
				</view>
			</view>

			<view class="tipContain">
				<view class="title">
					{{$t('withdraw.tip.title.text')}} :
				</view>
				<view class="tipcell">
					{{$t('withdraw.tip.con1.text')}}
				</view>
				<view class="tipcell">
					{{$t('withdraw.tip.con2.text')}}
				</view>
			</view>

			<view class="confirmWithdrawBtn" @click="withdrawClick">
				{{$t('withdraw.btns.withdraw.confirm.text')}}
			</view>

			<view class="line">

			</view>

		</view>
		<self-tabbar :current-page="111"></self-tabbar>
	</view>
</template>

<script>
	import {
		websiteUrlStr,
		getInformationReq,
		setBankReq,
		withdrawReq,

	} from '@/api/index.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	export default {
		mixins: [myMixin],
		data() {
			return {
				navTitle: this.$t('home.tool.withdraw'),
				urlFromStr: '',
				username: "",
				cardstr: "",
				phonestr: "",
				emailstr: "",
				bankname: "",
				balanceNum: 0,
				withdrawmoney: '',
				handfree: "",
			}
		},
		onShow() {

			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('withdrawEventClick', async (data) => {
				this.urlFromStr = data.from
			})




			// this.currentIndex = 0
			// this.inputRechargeAmount = ""
			// this.quickAmountSelectIndex = ""

			// this.getPayInfoData()
			this.getInformation()
			this.getWithdrawInfo()
			this.getBankInfo()
		},
		mounted() {

		},
		computed: {
			actualMoney() {
				return this.withdrawmoney * 1 * (1 - (this.handfree / 100))
			}
		},
		methods: {
			goBackBtnClick() {

				const queryRechargeUrlFrom = uni.getStorageSync('queryWithdrawUrlFrom') || 'other'
				if (!this.withdrawState_Bool) {
					this.urlFromStr = queryRechargeUrlFrom
				}

				if (this.urlFromStr === "home") {
					uni.switchTab({
						url: '/pages/home/index',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (this.urlFromStr === "mine") {
					uni.switchTab({
						url: '/pages/mine/index',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				}

			},
			async getWithdrawInfo() {
				let resR = await withdrawReq({}, this.localLoginToken, "getHand")
				if (resR.code === 2000) {
					this.handfree = resR.result
				}
			},
			async getInformation() {
				this.balanceNum = 0
				let resR = await getInformationReq(this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 2000) {
					this.balanceNum = resR.result.Balance
				}

			},
			async getBankInfo() {
				let reqParam = {}
				let resR = await setBankReq(reqParam, this.localLoginToken, 'getBank')
				if (resR.code === 2000) {
					this.username = resR.result.Username
					this.cardstr = resR.result.Card
					this.phonestr = resR.result.Phone
					this.emailstr = resR.result.Mail
					this.bankname = resR.result.BankName
				}
			},
			allMoneyClick() {
				this.withdrawmoney = this.balanceNum
			},
			async withdrawClick() {

				if (!this.withdrawmoney) {
					uni.showToast({
						title: this.$t('withdraw.input.money.notempty.title'),
						icon: 'none',
						duration: 2000,
					});

					return false
				}

				let reqParam = {}
				reqParam.money = this.withdrawmoney
				let resR = await withdrawReq(reqParam, this.localLoginToken, "")
				if (resR.code === 2000) {
					uni.showToast({
						title: resR.msg,
						icon: 'none',
						duration: 2000,
					});
					this.withdrawmoney = ""
					this.getInformation()


				} else if (resR.code === 401) {
					uni.showToast({
						title: this.$t('backapi.MinWithdrawal') + resR.result,
						icon: 'none',
						duration: 2000,
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f1f1f1;
	}

	.backTitleBar-wrapper {
		.fixedBox {
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;
			background: linear-gradient(to right, #6dcab8, #3a78cb);
			color: #fff;

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

	.withdrawContainer {
		// height: 100vh;
		background: #f1f1f1;

		.banner {
			background: linear-gradient(to right, #6dcab8, #3a78cb);
			padding: 30px 0 0;
		}

		.moneyContain {
			padding: 15px;
			margin-top: 15px;

			.money_poundage {
				border-radius: 9px;
				border: 10px;
				padding: 5px 15px;
				color: #fff;
				background: linear-gradient(315deg, #a78e6f, #d5bd9d);

				.money {
					padding: 10px 0;
					border-bottom: 1px solid #fff;

					.title {}

					.num {
						margin-top: 5px;
						font-size: 34px;
					}
				}

				.poundage {
					padding: 15px 0;
					color: #e5e5e5;
				}
			}
		}

		.inputContain {

			padding: 15px;
			background-color: #fff;
			color: #333;

			.input_t {}

			.input_v {
				display: flex;
				align-items: center;
				padding: 10px 0;
				border-bottom: 1px solid rgb(238, 238, 238);

				.text {
					font-size: 22px;
				}

				.inputMoney {
					font-size: 30px;
					flex: 1 1 0%;
				}
			}

			.real_btn {
				margin-top: 15px;
				display: flex;
				justify-content: space-between;

				.actual_money {}

				.all_money {
					color: #d8c18e;
				}
			}
		}


		.bankContain {
			margin-top: 15px;
			background-color: #fff;
			color: #333;
			padding: 0 15px;

			.item {
				display: flex;
				justify-content: space-between;
				padding: 12px 0;
				border-bottom: 1px solid #eee;
			}

		}


		.tipContain {
			padding: 15px;

			.title {
				font-weight: 500;
				font-size: 14px;
				color: #333;
			}

			.tipcell {
				margin-top: 5px;
				color: #aaa;
			}
		}


		.confirmWithdrawBtn {
			margin: 0 15px;
			background: linear-gradient(90deg, #6dcab8, #3a78cb);
			color: #fff;
			border: none;
			border-radius: 5px;
			height: 40px;
			line-height: 42px;
			text-align: center;
			font-size: 16px;
			margin-top: 20px;
		}

		.line {
			height: 90px;
		}

	}
</style>
