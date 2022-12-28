<template>
	<view class="">
		<view class="bindcardContainer">
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

			<view class="cardWrap">
				<view class="account_info">
					{{$t('bank.card.bind.tip.title.text')}}
				</view>
				<view class="account_desc">
					{{$t('bank.card.bind.tip.desc.text')}}
				</view>
				<view class="account_input">
					<view class="input_cell">
						<view class="title">
							{{$t('bank.card.bind.form.username.text')}}
						</view>
						<view class="bottom">
							<input type="text" value="" :placeholder="$t('bank.card.bind.form.username.place.text')"
								class="input_bottom" v-model="username" />
						</view>
					</view>
					<view class="input_cell">
						<view class="title">
							{{$t('bank.card.bind.form.list.text')}}
						</view>
						<view class="bottom signleB">
							<picker @change="bindPickerChange" :value="selec_bank_index" :range="bankArray"
								style="flex: 1 1 0%;">
								<view class="uni-input">{{bankArray[selec_bank_index]}}</view>
							</picker>
							<text>▼</text>
						</view>
					</view>
					<view class="input_cell">
						<view class="title">
							{{$t('bank.card.bind.form.account.text')}}
						</view>
						<view class="bottom">
							<input type="text" value="" :placeholder="$t('bank.card.bind.form.account.place.text')"
								class="input_bottom" v-model="cardstr" />
						</view>
					</view>
					<view class="input_cell">
						<view class="title">
							{{$t('bank.card.bind.form.idcard.text')}}
						</view>
						<view class="bottom">
							<input type="text" value="" :placeholder="$t('bank.card.bind.form.idcard.place.text')"
								class="input_bottom" v-model="idnumstr" />
						</view>
					</view>
					<view class="input_cell">
						<view class="title">
							{{$t('bank.card.bind.form.phone.text')}}
						</view>
						<view class="bottom">
							<input type="text" value="" :placeholder="$t('bank.card.bind.form.phone.place.text')"
								class="input_bottom" v-model="phonestr" />
						</view>
					</view>
					<view class="input_cell">
						<view class="title">
							{{$t('bank.card.bind.form.email.text')}}
						</view>
						<view class="bottom padding-b">
							<input type="text" value="" :placeholder="$t('bank.card.bind.form.email.place.text')"
								class="input_bottom" v-model="emailstr" />
						</view>
					</view>
				</view>

				<view class="confirmbtn" @click="confirmBindClick">
					{{$t('bank.card.bind.form.btn.confirm.text')}}
				</view>

				<view class="tip">
					<view class="tip_t">
						{{$t('bank.card.bind.tip.bottom.title.text')}}
					</view>
					<view class="tip_b">
						{{$t('bank.card.bind.tip.bottom.desc.text')}}
					</view>
				</view>
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
		setBankReq,

	} from '@/api/index.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	export default {
		mixins: [myMixin],
		data() {
			return {
				navTitle: this.$t('bank.card.bind.title.text'),
				bankArray: [], //专门处理银行列表
				originArr: [], //获取到就保存当前列表
				selec_bank_index: 0,

				urlFromStr: '',
				username: "",
				cardstr: "",
				idnumstr: "",
				emailstr: "",
				phonestr: "",
				bandid: "",

			}
		},
		onShow() {

			// // #ifndef APP-NVUE
			// const eventChannel = this.getOpenerEventChannel();
			// // #endif
			// // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			// eventChannel.on('rechargeEventClick', async (data) => {
			// 	this.urlFromStr = data.from
			// })
			this.getBankInfo()

			this.getBankList()


		},
		mounted() {

		},
		computed: {

		},
		methods: {
			goBackBtnClick() {
				uni.navigateTo({
					url: '/pages/mine/me',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
				// const queryRechargeUrlFrom = uni.getStorageSync('queryRechargeUrlFrom') || 'other'
				// if (!this.rechargeState_Bool) {
				// 	this.urlFromStr = queryRechargeUrlFrom
				// }

				// if (this.urlFromStr === "home") {
				// 	uni.switchTab({
				// 		url: '/pages/home/index',
				// 		animationType: 'slide-in-top',
				// 		animationDuration: 200
				// 	})
				// } else if (this.urlFromStr === "matchOrder") {
				// 	uni.navigateTo({
				// 		url: '/pages/match/match_order',
				// 		success: (res) => {
				// 			// 通过eventChannel向被打开页面传送数据
				// 			const detailContentItemAndType = uni.getStorageSync('detailContentItemAndType')
				// 			// console.log("detailContentItemAndType",detailContentItemAndType);
				// 			if (detailContentItemAndType) {
				// 				res.eventChannel.emit('match_content_Click', {
				// 					content: detailContentItemAndType.item,
				// 					gameType: detailContentItemAndType.gameType
				// 				})

				// 			}
				// 		},
				// 		animationType: 'slide-in-top',
				// 		animationDuration: 200
				// 	})
				// } else if (this.urlFromStr === "user") {
				// 	uni.switchTab({
				// 		url: '/pages/user/user',
				// 		animationType: 'slide-in-top',
				// 		animationDuration: 200
				// 	})
				// } else {
				// 	uni.switchTab({
				// 		url: '/pages/user/user',
				// 		animationType: 'slide-in-top',
				// 		animationDuration: 200
				// 	})
				// }

			},
			bindPickerChange: function(e) { //银行卡选择的方法
				this.bandid = this.originArr[e.detail.value]["id"]
				// console.log('picker发送选择改变，携带值为', e.detail.value, this.bandid)
				this.selec_bank_index = e.detail.value
			},
			async getBankList() {
				let reqParam = {}
				let resR = await setBankReq(reqParam, this.localLoginToken, 'get')
				if (resR.code === 2000) {
					// console.log("resR", resR.result);
					this.selec_bank_index = 0
					if (resR.result.length !== 0) {
						this.bandid = resR.result[0]["id"]
						this.originArr = resR.result
						resR.result.forEach((item) => {
							this.bankArray.push(item.name)
						})
					}
				}
			},
			async getBankInfo() {
				let reqParam = {}
				let resR = await setBankReq(reqParam, this.localLoginToken, 'getBank')
				if (resR.code === 2000) {
					this.username = resR.result.Username
					this.cardstr = resR.result.Card
					this.idnumstr = resR.result.IdCard
					this.phonestr = resR.result.Phone
					this.emailstr = resR.result.Mail

				}
			},
			async confirmBindClick() {
				let reqParam = {}
				reqParam.bank_card_id = this.bandid

				if (this.username) {
					reqParam.username = this.username
				}
				if (this.cardstr) {
					reqParam.card = this.cardstr
				}

				if (this.idnumstr) {
					reqParam.id_card = this.idnumstr
				}

				if (this.emailstr) {
					reqParam.mail = this.emailstr
				}
				if (this.phonestr) {
					reqParam.phone = this.phonestr
				}

				let resR = await setBankReq(reqParam, this.localLoginToken, 'set')
				if (resR.code === 2000) {
					// console.log("resR", resR);
					uni.showToast({
						icon: 'none',
						title: "ok"
					});
				}
			},
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

	.bindcardContainer {
		// height: 100vh;
		background: #f1f1f1;

		.banner {
			background: linear-gradient(to right, #6dcab8, #3a78cb);
			padding: 30px 0 0;
		}

		.cardWrap {
			padding: 15px;
			margin-top: 20px;

			.account_info {
				font-size: 22px;
				font-weight: 700;
				color: #333;
			}

			.account_desc {
				color: #aaa;
			}

			.account_input {
				margin-top: 15px;
				border-radius: 9px;
				border: 10px;
				background-color: #fff;
				color: #333;
				padding: 0 15px;

				.input_cell {
					border-bottom: 3px solid #eee;

					&:last-child {
						border: none;
					}

					.title {
						padding: 15px 0;
						font-weight: 400;
						font-size: 14px;
					}

					.bottom {

						.input_bottom {
							margin-bottom: 10px;
							font-size: 14px;
						}


					}

					.padding-b {
						padding-bottom: 15px;
					}

					.signleB {
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding-bottom: 15px;

					}
				}
			}

			.confirmbtn {
				// margin: 0 15px;
				text-align: center;
				font-size: 16px;
				margin-top: 20px;
				background: linear-gradient(90deg, #6dcab8, #3a78cb);
				color: #fff;
				border: none;
				border-radius: 700px;
				height: 40px;
				line-height: 42px;
			}

			.tip {
				background-color: #fff;
				color: #666;
				padding: 15px;
				margin: 15px 0;
				border: 10px;
				border-radius: 9px;

				.tip_t {
					padding-bottom: 15px;
					border-bottom: 1px solid rgb(238, 238, 238);
					font-size: 14px;

				}

				.tip_b {
					font-size: 14px;
					padding-top: 15px;
				}
			}
		}


		.line {
			height: 80px;
		}
	}
</style>
