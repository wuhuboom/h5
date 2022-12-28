<template>
	<view class="share">
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
								<!-- 	<view class="service">
									<image src="../../static/images/service.png" mode="" class="icon"></image>
								</view> -->
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
		<view class="share-box">

		</view>
		<view class="share-invitation">
			<image src="../../static/images/bgpromotionnocn.png" mode="" class="bjImg"></image>
			<view class="uqrcode">
				<canvas ref="canvas" canvas-id="qrcode" style="width: 154px;height:154px;" class="canvas"
					id="qrcode"></canvas>
			</view>
			<view class="inner">
				<view class="btns">
					<view class="lefts">
						{{$t('user.refer.share.invite.title.text')}}
					</view>
					<view class="lines">

					</view>
					<view class="fonts">
						{{qrCodeStr}}
					</view>
					<image src="../../static/images/copyBtn.png" mode="" class="copyicon" @click="copyInviteBtnClick">
					</image>
				</view>
				<view class="btns">
					<view class="lefts">
						{{$t('user.refer.share.invite.link.title.text')}}
					</view>
					<view class="lines">

					</view>
					<view class="fonts">
						{{defalutShareLink}}
					</view>
					<image src="../../static/images/copyBtn.png" mode="" class="copyicon" @click="sharBtnClick"></image>
				</view>
			</view>
			<!-- <view class="Share-code">
				<view class="invite-code">
					{{$t('user.refer.share.invite.title.text')}}
				</view>
				<view class="code">
					{{qrCodeStr}}
				</view>
				<view class="tip">
					{{$t('user.refer.share.copy.desc.text')}}
				</view>
			</view>
			<view class="link-copy1" @click="copyInviteBtnClick">
				{{$t('user.refer.share.copy.invite.text')}}
			</view>
			<view class="middleline">

			</view>
		
			<view class="share-box">
				<view class="share-link">
					{{defalutShareLink}}
				</view>
				<image src="../../static/images/ic_line_copy24px.svg" mode="" class="icon" @click="sharBtnClick">
				</image>
			</view> -->
		</view>

	</view>
</template>

<script>
	import {
		newWebAddress,
		playerInfoReq
	} from '../../api/index.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	import uQRCode from '@/common/uqrcode.js'
	import {
		setClipboardData,
		getClipboardData
	} from '@/uni_modules/u-clipboard/js_sdk'

	export default {
		mixins: [myMixin],
		data() {
			return {
				navTitle: this.$t('user.refer.share.title.text'),
				defalutShareLink: '',
				showTipsBool: false,
				qrCodeStr: '',
				urlFromStr: '',
			}
		},
		onLoad() {

		},
		onShow() {

			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('eventInviteClick', async (data) => {
				this.urlFromStr = data.from
			})

			this.getInfoData()


		},
		methods: {
			async getInfoData() {
				let resR = await playerInfoReq(this.localLoginToken)
				if (resR.code === 200) {
					this.qrCodeStr = resR.data.invitationCode
					let webHost = ""
					if (newWebAddress.indexOf('https') === -1) {
						webHost = "https://" + newWebAddress
					}
					// this.defalutShareLink = newWebAddress+"/#/pages/login/login?code="+this.qrCodeStr
					if (window.location.href.indexOf('#') === -1) {
						this.defalutShareLink = webHost + "/pages/login/login?code=" + this.qrCodeStr
					} else {
						this.defalutShareLink = webHost + "/#/pages/login/login?code=" + this.qrCodeStr
					}

					this.make()

				}
			},
			make() {
				//可以在这加一个loading状态
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: this.defalutShareLink,
					size: 150,
					margin: 10,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000'
				})
				// loading状态在二维码生成后关闭
			},
			goBackBtnClick() {



				const queryInviteUrlFrom = uni.getStorageSync('queryInviteUrlFrom') || 'other'
				if (!this.inviteState_Bool) {
					this.urlFromStr = queryInviteUrlFrom
				}

				if (this.urlFromStr === "user") {
					uni.switchTab({
						url: '/pages/user/user',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (this.urlFromStr === "info") {
					uni.navigateTo({
						url: '/pages/user/info',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (this.urlFromStr === "statistics") {
					uni.navigateTo({
						url: '/pages/user/statistics',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				}
			},
			copyInviteBtnClick() {
				setClipboardData(this.qrCodeStr).then(() => {
					uni.showToast({
						icon: 'none',
						title: this.$t('user.refer.share.copy.success.text')
					});
				})
			},
			sharBtnClick() {
				setClipboardData(this.defalutShareLink).then(() => {
					uni.showToast({
						icon: 'none',
						title: this.$t('user.refer.share.copy.success.text')
					});
				})
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


	.share-box {
		width: 100%;
		height: 10px;
		background-color: #f8f8f8;
	}

	.share-invitation {
		background-size: 100% 100%;
		/* margin: 0 20px; */
		/* width: 100%; */
		border-radius: 5px;
		/* padding: 24px 20px; */
		margin: 0 20px;
		background: #fff;
		position: relative;

		.bjImg {
			width: 100%;
			height: 504px;
		}


		.inner {
			position: absolute;
			bottom: 23px;
			left: 0;
			right: 0;
			width: 100%;
			padding: 0 20.5px;
			box-sizing: border-box;

			.btns {
				width: 269px;
				height: 35px;
				display: -webkit-box;
				display: -webkit-flex;
				display: -ms-flexbox;
				display: flex;
				-webkit-box-align: center;
				-webkit-align-items: center;
				-ms-flex-align: center;
				align-items: center;
				-webkit-box-pack: justify;
				-webkit-justify-content: space-between;
				-ms-flex-pack: justify;
				justify-content: space-between;
				border: 1px solid #597ef7;
				border-radius: 4px;
				padding-left: 16px;
				padding-right: 10px;
				margin: 0 auto;
				margin-top: 10px;

				.lefts {
					color: #333;
					font-size: 13px;
					width: 80px;
					white-space: nowrap;
					margin-right: 10px;

				}

				.lines {
					width: 1px;
					height: 16px;
					background: #7590e6;
				}

				.fonts {
					font-size: 13px;
					color: #597ef7;
					padding-left: 20px;
					box-sizing: border-box;
					-webkit-box-flex: 1;
					-webkit-flex: 1;
					-ms-flex: 1;
					flex: 1;
					max-width: 165px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.copyicon {
					width: 13px;
					height: 15.5px;
				}
			}
		}

		.Share-code {
			text-align: center;
			width: 85%;
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: #111113;
			background-color: #171e25;
			padding: 20px 15px;
			border-radius: 15px;

			.invite-code {
				color: #f8f8f8;
				font-size: 16px;
			}


			.code {
				margin: 10px auto;
				font-size: 50px;
				font-weight: 600;
				color: #ffbc00;
				letter-spacing: 4px;
			}

			.tip {
				font-size: 13px;
				color: #7f8aa1;
			}
		}

		.share-box {
			background-color: #171e25;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			height: 70px;
			padding: 10px;
			width: 90%;
			margin: 20px auto 0;
			border-radius: 5px;

			.share-link {
				font-size: 12px;
				color: #717171;
				line-height: 22px;
				text-decoration: underline;
				text-align: center;
				word-break: break-all;
			}

			.icon {
				width: 39px;
				height: 43px;
			}


		}
	}

	.uqrcode {
		width: 180px;
		margin: 10px auto 0;
		position: absolute;
		top: 80px;
		left: 0;
		right: 0;
	}

	.share {
		.uqrcode {
			display: flex;
			justify-content: center;
		}
	}

	.link-copy1 {
		color: #111;
		font-size: 16px;
		min-width: 170px;
		max-width: 270px;
		line-height: 40px;
		min-height: 40px;
		background: linear-gradient(90deg, #ffd37d, #ca962e);
		opacity: 1;
		border-radius: 50px;
		padding: 0 10px;
		text-align: center;
		margin-top: 30px;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 45px;
	}
</style>
