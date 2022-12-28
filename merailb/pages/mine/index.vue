<template>
	<view class="">
		<view class="mineContainer">
			<view class="backTitleBar-wrapper colCent borderBox">
				<view class="fixedBox">
					<view class="common_header" style="height: 45px;">
						<view class="define">
							<!-- @click="goBackBtnClick" -->
							<view class="define_left_slot">
								<view class="">
									<!-- <u-icon name="arrow-left" size="32"></u-icon> -->
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


			<view class="topContan">
				<view class="info">
					<view class="info_left">
						<image src="../../static/images/1.jpg" mode="" class="avatar"></image>
						<view class="name_invite">
							<view class="namevip">
								{{personInfo.Username}}({{personInfo.VipName}})
							</view>
							<view class="invite">
								{{$t('mine.person.info.invite.text')}}: {{personInfo.InvitationCode}}
							</view>
						</view>
					</view>
					<view class="info_r" @click="copyLinkBtnClick">
						{{$t('mine.person.info.copy.link.text')}}
					</view>
				</view>
				<view class="money_recharge">
					<view class="content">
						<view class="money_title">
							<view class="">
								{{$t('home.info.money.text')}}
							</view>
							<view class="money">
								{{symbolStr}} {{personInfo.Balance}}
							</view>
						</view>
						<view class="btns">
							<view class="btn_withdraw" @click="withdrawClick">
								{{$t('mine.money.withdraw.text')}}
							</view>
							<view class="btn_recharge" @click="rechargeClick">
								{{$t('mine.money.recharge.text')}}
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="commonContainer">
				<view class="commonbtns" @click="cellClick">
					<view class="cell">
						<image src="../../static/images/cell1.png" mode="" class="cell_img"></image>
						<view class="desc">
							{{$t('mine.ceter.cell1.text')}}
						</view>
						<view class="title">
							{{moneyInfo.income}}
						</view>
					</view>
					<view class="cell">
						<image src="../../static/images/cell2.png" mode="" class="cell_img"></image>
						<view class="desc">
							{{$t('mine.ceter.cell2.text')}}
						</view>
						<view class="title">
							{{moneyInfo.recharge}}
						</view>
					</view>
					<view class="cell">
						<image src="../../static/images/cell3.png" mode="" class="cell_img"></image>
						<view class="desc">
							{{$t('mine.ceter.cell3.text')}}
						</view>
						<view class="title">
							-- --
						</view>
					</view>
					<view class="cell">
						<image src="../../static/images/cell4.png" mode="" class="cell_img"></image>
						<view class="desc">
							{{$t('mine.ceter.cell4.text')}}
						</view>
						<view class="title">
							{{moneyInfo.freeze}}
						</view>
					</view>
				</view>
			</view>

			<view class="toolContainer">
				<view class="tooltop">
					{{$t('mine.server.ceter.title.text')}}
				</view>
				<view class="toolcontent">
					<view class="item_cell">
						<view class="item" @click="personClick">
							<view class="img-box">
								<image src="../../static/images/person_t.png" mode=""></image>
							</view>
							<view class="title-box">
								{{$t('mine.server.ceter.btn1.text')}}
							</view>
						</view>
						<view class="item" @click="safeClick">
							<view class="img-box"
								style="background: linear-gradient(90deg, rgb(111, 190, 248), rgb(56, 143, 244));">
								<image src="../../static/images/person_t.png" mode=""></image>
							</view>
							<view class="title-box">
								{{$t('mine.server.ceter.btn7.text')}}
							</view>
						</view>
						<!-- 	<view class="item" @click="gradeClick">
							<view class="img-box"
								style="background: linear-gradient(90deg, rgb(131, 183, 244), rgb(21, 62, 215));">
								<image src="../../static/images/report_t.png" mode=""></image>
							</view>
							<view class="title-box">
								{{$t('mine.server.ceter.btn2.text')}}
							</view>
						</view> -->
						<view class="item" @click="inviteClick">
							<view class="img-box"
								style="background: linear-gradient(90deg, rgb(146, 222, 183), rgb(76, 191, 142));">
								<image src="../../static/images/invite_t.png" mode=""></image>
							</view>
							<view class="title-box">
								{{$t('mine.server.ceter.btn3.text')}}
							</view>
						</view>
						<view class="item" @click="serviceClick">
							<view class="img-box"
								style="background: linear-gradient(90deg, rgb(213, 118, 247), rgb(141, 56, 244))">
								<image src="../../static/images/contact_t.png" mode=""></image>
							</view>
							<view class="title-box">
								{{$t('mine.server.ceter.btn4.text')}}
							</view>
						</view>
						<view class="item" @click="artileClick(1)">
							<view class="img-box"
								style="background: linear-gradient(90deg, rgb(248, 215, 139), rgb(240, 164, 48));">
								<image src="../../static/images/address_t.png" mode=""></image>
							</view>
							<view class="title-box">
								{{$t('mine.server.ceter.btn5.text')}}
							</view>
						</view>
						<view class="item" @click="artileClick(2)">
							<view class="img-box"
								style="background: linear-gradient(90deg, rgb(240, 163, 91), rgb(234, 71, 59));">
								<image src="../../static/images/person_t.png" mode=""></image>
							</view>
							<view class="title-box">
								{{$t('mine.server.ceter.btn6.text')}}
							</view>
						</view>

						<view class="item" @click="artileClick(3)">
							<view class="img-box"
								style="background: linear-gradient(90deg, rgb(240, 163, 91), rgb(234, 71, 59));">
								<image src="../../static/images/person_t.png" mode=""></image>
							</view>
							<view class="title-box">
								{{$t('mine.server.ceter.btn8.text')}}
							</view>
						</view>

					</view>
				</view>
			</view>

			<view class="line">

			</view>

		</view>

		<self-tabbar :current-page="4"></self-tabbar>


	</view>
</template>

<script>
	import {
		websiteUrlStr,
		newWebAddress,
		getInformationReq,
		getMoneyInformationReq
	} from '@/api/index.js'
	import {
		myMixin,
		setOrderRecordMixin,
		withdrawMinxi
	} from '@/util/mixins.js'
	import {
		setClipboardData,
		getClipboardData
	} from '@/uni_modules/u-clipboard/js_sdk'
	export default {
		mixins: [myMixin, setOrderRecordMixin, withdrawMinxi],
		data() {
			return {
				navTitle: this.$t('tabar.mine'),
				personInfo: {},
				moneyInfo: {},
				qrCodeLinkStr: '',
				urlFromStr: '',

			}
		},
		onShow() {
			this.getInformation()
			this.getMoneyInformation()
		},
		mounted() {

		},
		computed: {

		},
		methods: {
			goBackBtnClick() {

			},
			async getInformation() {
				let resR = await getInformationReq(this.localLoginToken)
				// console.log("resR", resR);
				if (resR.code === 2000) {
					this.personInfo = resR.result
					let webHost = ""
					if (newWebAddress.indexOf('https') === -1) {
						webHost = "https://" + newWebAddress
					}
					if (window.location.href.indexOf('#') === -1) {
						this.qrCodeLinkStr = webHost + "/pages/login/register?code=" + resR.result.InvitationCode
					} else {
						this.qrCodeLinkStr = webHost + "/#/pages/login/register?code=" + resR.result
							.InvitationCode
					}
				}
			},
			async getMoneyInformation() {
				let resR = await getMoneyInformationReq(this.localLoginToken)
				// console.log("resR", resR);
				if (resR.code === 2000) {
					this.moneyInfo = resR.result
				}
			},
			copyLinkBtnClick() {
				setClipboardData(this.qrCodeLinkStr).then(() => {
					uni.showToast({
						icon: 'none',
						title: this.$t('invite.friend.copy.success.text')
					});
				})
			},
			withdrawClick() {
				uni.navigateTo({
					url: "/pages/withdraw/index",
					success: (res) => {
						this.save_withdraw_from('mine')
						// 通过eventChannel向被打开页面传送数据	
						res.eventChannel.emit('withdrawEventClick', {
							from: 'mine'
						})
					},
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			rechargeClick() {
				uni.switchTab({
					url: "/pages/recharge/index",
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			cellClick() {
				uni.navigateTo({
					url: "/pages/mine/record",
					success: (res) => {
						this.save_order_r_from('mine')
						// 通过eventChannel向被打开页面传送数据	
						res.eventChannel.emit('recordOrderEventClick', {
							from: 'mine'
						})
					},
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			personClick() {
				uni.navigateTo({
					url: "/pages/mine/me",
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			gradeClick() {
				uni.navigateTo({
					url: "/pages/mine/nextGrade",
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			inviteClick() {
				uni.navigateTo({
					url: "/pages/mine/invitation",
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			serviceClick() {
				uni.navigateTo({
					url: "/pages/sevice/sevice",
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			artileClick(num) {
				if (num === 1) {
					uni.navigateTo({
						url: "/pages/article/job",
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (num === 2) {
					uni.navigateTo({
						url: "/pages/article/aboutus",
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (num === 3) {
					uni.navigateTo({
						url: "/pages/article/agent",
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				}
			},
			safeClick() {
				uni.navigateTo({
					url: "/pages/mine/safe",
					animationType: 'slide-in-top',
					animationDuration: 200
				})
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

	.mineContainer {
		// height: 100vh;
		background: #f1f1f1;

		.banner {
			background: linear-gradient(to right, #6dcab8, #3a78cb);
			padding: 30px 0 0;
		}


		.topContan {
			background: #fff;
			color: #333;
			margin-top: 10px;

			.info {
				display: flex;
				justify-content: space-between;
				padding: 15px;
				padding-bottom: 15px;
				border-bottom: 1px solid #eeeff2;

				.info_left {
					display: flex;

					.avatar {
						width: 60px;
						height: 60px;
						border-radius: 50%;


					}

					.name_invite {
						margin-left: 15px;

						.namevip {}

						.invite {
							margin-top: 15px;
						}
					}
				}

				.info_r {
					border-radius: 700px;
					border: 1px solid #eee;
					height: 30px;
					line-height: 29px;
					padding: 0 7px;
				}
			}

			.money_recharge {
				padding: 15px;

				.content {
					border: 10px;
					border-radius: 9px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20px;
					color: #fff;
					background: linear-gradient(315deg, #a78e6f, #d5bd9d);

					.money_title {
						.money {
							margin-top: 5px;
							font-size: 22px;
						}
					}

					.btns {
						display: flex;

						.btn_withdraw {
							padding: 2px 10px;
							border-radius: 700px;
							border: 1px solid #fff;
							color: #fff;
							display: flex;
							align-items: center;
							justify-content: center;
							text-align: center;
						}

						.btn_recharge {
							margin-left: 10px;
							background: #fff;
							color: #a78e6f;
							padding: 2px 10px;
							border-radius: 700px;
							border-bottom: 1px solid #fff;
							display: flex;
							align-items: center;
							justify-content: center;
							text-align: center;
						}
					}
				}
			}
		}

		.commonContainer {
			margin-top: 10px;
			padding: 0 10px;

			.commonbtns {
				display: flex;
				justify-content: space-around;
				border-radius: 9px;
				border: 10px;
				margin-top: 5px;
				padding: 15px;

				background-color: #fff;
				color: #333;
				text-align: center;

				.cell {
					.cell_img {
						width: 40px;
						height: 40px;
					}

					.title {
						font-size: 18px;
						margin-top: 5px;
					}
				}

			}
		}

		.toolContainer {
			margin-top: 10px;
			background-color: #fff;
			color: #333;

			.tooltop {
				padding: 15px;
				font-size: 16px;
				font-weight: 700;
				border-bottom: 1px solid #eeeff2;
			}

			.toolcontent {
				padding: 15px;

				.item_cell {
					display: flex;
					flex-wrap: wrap;

					.item {
						width: 25%;
						text-align: center;
						margin-bottom: 10px;

						.img-box {
							border-radius: 700px;
							width: 42px;
							height: 42px;
							margin: 0 auto;
							padding: 13%;
							background: linear-gradient(90deg, rgb(235, 100, 90), rgb(231, 81, 71));

							image {
								width: 100%;
								height: 20px;
							}
						}

						.title-box {
							margin-top: 5px;
						}
					}
				}
			}
		}

		.line {
			height: 95px;
		}
	}
</style>
