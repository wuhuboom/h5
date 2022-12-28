<template>
	<view class="">
		<view class="inviteContainer">
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

			<view class="main">
				<view class="title1">
					{{$t('invite.friend.desc1.text')}}
				</view>
				<view class="desc">
					<view class="t2">
						{{$t('invite.friend.desc2.text')}}
					</view>
				</view>
				<view class="operate">
					<view class="code">
						<view class="code_l">
							{{$t('invite.friend.code.text')}}
						</view>
						<view class="code_r">
							<view class="num">
								{{qrCodeStr}}
							</view>
							<view class="btn" @click="copyInviteBtn">
								{{$t('invite.friend.copy.btn.text')}}
							</view>
						</view>
					</view>
					<view class="qrcode">
						<canvas ref="canvas" canvas-id="qrcode"
							style="width: 160px;height:160px;border: 1px dashed #000;" class="canvas"
							id="qrcode"></canvas>
					</view>
				</view>
			</view>

			<view class="line">

			</view>
		</view>
		<view class="copy-box" @click.stop="copyLinkClikc">
			{{$t('invite.friend.copy.link.btn.text')}}
		</view>
		<self-tabbar :current-page="111"></self-tabbar>


	</view>
</template>

<script>
	import {
		websiteUrlStr,
		newWebAddress,
		getInformationReq
	} from '@/api/index.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	import {
		setClipboardData,
		getClipboardData
	} from '@/uni_modules/u-clipboard/js_sdk'
	import uQRCode from '@/common/uqrcode.js'
	export default {
		mixins: [myMixin],
		data() {
			return {
				navTitle: this.$t('invite.friend.title.text'),
				defalutShareLink: "https://www.baidu.com",

				qrCodeStr: "",
				urlFromStr: '',

			}
		},
		onShow() {
			this.getInformation()

		},
		mounted() {

		},
		computed: {

		},
		methods: {
			make() {
				//可以在这加一个loading状态
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: this.defalutShareLink,
					size: 160,
					margin: 10,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000'
				})
				// loading状态在二维码生成后关闭
			},
			async getInformation() {
				let resR = await getInformationReq(this.localLoginToken)
				// console.log("resR", resR);
				if (resR.code === 2000) {
					this.qrCodeStr = resR.result.InvitationCode
					let webHost = ""
					if (newWebAddress.indexOf('https') === -1) {
						webHost = "https://" + newWebAddress
					}
					if (window.location.href.indexOf('#') === -1) {
						this.defalutShareLink = webHost + "/pages/login/register?code=" + this.qrCodeStr
					} else {
						this.defalutShareLink = webHost + "/#/pages/login/register?code=" + this.qrCodeStr
					}
					this.make()
				}
			},
			goBackBtnClick() {
				uni.switchTab({
					url: '/pages/mine/index',
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
			copyInviteBtn() {
				setClipboardData(this.qrCodeStr).then(() => {
					uni.showToast({
						icon: 'none',
						title: this.$t('invite.friend.copy.success.text')
					});
				})
			},
			copyLinkClikc() {
				setClipboardData(this.defalutShareLink).then(() => {
					uni.showToast({
						icon: 'none',
						title: this.$t('invite.friend.copy.success.text')
					});
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
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

	.inviteContainer {
		// height: 100vh;
		background: #fff;

		.banner {
			background: linear-gradient(to right, #6dcab8, #3a78cb);
			padding: 30px 0 0;
		}

		.main {
			min-height: calc(100vh - 120px);
			background: url(../../static/images/InvitationBG.png) repeat fixed 50%;

			.title1 {
				padding: 10vh 25px 5px 25px;
				font-size: 24px;
				color: #fee8b9;
				text-align: center;
				font-family: HFVoyager-Regular;
				line-height: 38px;
				font-weight: 800;
			}

			.desc {
				margin-top: 15px;
				text-align: center;

				.t2 {
					display: inline-block;
					margin: 0 auto;
					font-size: 15px;
					// font-family: Rubik-Regular,Rubik;
					font-weight: 400;
					height: 33px;
					line-height: 33px;
					color: #b9193c;
					padding: 0 10px;
					border-radius: 50rem;
					background-color: #ffd4ba;
				}
			}


			.operate {
				padding: 15px;

				.code {
					background-color: #fff;
					color: #333;
					padding: 15px;
					margin-top: 25px;
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					border-radius: 9px;
					border: 10px;

					.code_l {
						text-align: center;
						width: 50%;
					}

					.code_r {
						width: 50%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding-left: 10px;
						border-left: 1px solid rgb(220, 220, 220);

						.btn {
							padding: 2.8px 14px;
							background-color: red;
							color: #fff;
							border-radius: 700px;
						}
					}
				}
			}

			.qrcode {
				background-color: #fff;
				padding: 90px;
				margin-top: 15px;
				border: 10px;
				border-radius: 9px;
			}
		}



		.line {
			height: 95px;
		}
	}

	.copy-box {
		background-color: #fb0;
		color: #fff;
		width: 100%;
		padding: 7px;
		text-align: center;
		border-radius: 5px;
		position: fixed;
		bottom: 50px;
		z-index: 0;
		padding-bottom: 40px;
	}
</style>
