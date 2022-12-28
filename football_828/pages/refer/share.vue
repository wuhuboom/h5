<template>
	<view class="share">
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
			<view class="Share-code">
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
			<view class="uqrcode">
				<canvas ref="canvas" canvas-id="qrcode" style="width: 154px;height:154px;" class="canvas"
					id="qrcode"></canvas>
			</view>
			<view class="share-box">
				<view class="share-link">
					{{defalutShareLink}}
				</view>
				<image src="../../static/images/ic_line_copy24px.svg" mode="" class="icon" @click="sharBtnClick">
				</image>
			</view>
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
				defalutShareLink: 'https://nihao.com/pages/login/login?code=1228CB808',
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


	.share-box {
		width: 100%;
		height: 10px;
		background-color: #171E25;
	}

	.share-invitation {
		background-size: 100% 100%;
		margin: 0 3%;
		width: 94%;
		border-radius: 5px;
		padding: 24px 0;

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
		position: relative;
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
