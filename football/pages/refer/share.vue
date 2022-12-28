<template>
	<view class="sharePage">
		<uni-nav-bar backgroundColor="#00111C" color="#fff" :statusBar="true" :border="false"
			@clickLeft="goBackBtnClick" style="font-weight: 600;" :fixed="true">
			<block slot="left">
				<view class="navLeftBtn">
					<image src="@/static/images/back.svg" mode=""></image>
				</view>
			</block>

			<view class="navTitleCenter">{{navTitle}}</view>
		</uni-nav-bar>

		<view class="shareModel">
			<view class="shareInvitation">
				<view class="shareCode">
					<view class="uqrcode">
						<!-- <uQRCode ref="qrcode" canvas-id="qrcode" value="uQRCode"></uQRCode> -->
						<!-- <uQRCode ref="qrcode" canvas-id="qrcode" value="uQRCode"></uQRCode> -->
						<canvas ref="canvas" canvas-id="qrcode" style="width: 154px;height:154px;" class="canvas"
							id="qrcode"></canvas>

					</view>
					<view class="shareLink">
						{{defalutShareLink}}
					</view>
					<view class="shareButton">
						<view class="" @click="sharBtnClick">
							{{$t('user.refer.share.copy.btn.text')}}
						</view>
					</view>
					<view class="showTips" v-if="showTipsBool">
						{{$t('user.refer.share.copy.success.text')}}
					</view>
				</view>
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
				defalutShareLink: '',
				showTipsBool: false,
				qrCodeStr: '',
			}
		},
		onLoad() {

		},
		onShow() {
			this.getInfoData()


		},
		methods: {
			async getInfoData() {
				let resR = await playerInfoReq(this.localLoginToken)
				if (resR.code === 200) {
					this.qrCodeStr = resR.data.invitationCode
					// this.defalutShareLink = newWebAddress+"/#/pages/login/login?code="+this.qrCodeStr
					if (window.location.href.indexOf('#') === -1) {
						this.defalutShareLink = newWebAddress + "/pages/login/login?code=" + this.qrCodeStr
					} else {
						this.defalutShareLink = newWebAddress + "/#/pages/login/login?code=" + this.qrCodeStr
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
				uni.switchTab({
					url: '/pages/user/user',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			sharBtnClick() {
				setClipboardData(this.defalutShareLink).then(() => {
					this.showTipsBool = true
					setTimeout(() => {
						this.showTipsBool = false
					}, 2000)
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #071a28;
		display: block;

		position: relative;
	}

	.sharePage {
		width: 100%;
		height: 100%;
	}

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

	.shareModel {
		/* 	width: 100%;
	position: absolute;
	z-index: 1; */
		height: calc(100vh - 160px);
		padding: 10px 16px;
	}


	.shareInvitation {
		margin: 0 auto;
		background: url(@/static/images/share.png);
		height: 100%;
		padding: 53px 20px;
		background-size: contain;
		background-repeat: no-repeat;
	}

	.shareCode {
		align-items: center;
	}

	.uqrcode {
		width: 154px;
		margin: 0 auto;
	}

	.shareLink {
		margin: 15px auto;
		width: 251px;
		font-size: 11px;
		color: #fff;
		line-height: 22px;
		text-decoration: underline;
		text-align: center;
		word-break: break-all;
	}

	.shareButton {
		z-index: 2;
		display: flex;
	}

	.shareButton view {
		border-radius: 5px;
		height: 30px;
		font-size: 14px;
		color: #fff;
		line-height: 30px;
		text-align: center;
		background-color: #3d8dfe;
		margin: 0 auto;
		display: inline-block;
		padding: 0 10px;
		margin-bottom: 0;
	}

	.showTips {
		background-color: #334756;
		width: 248px;
		height: 55px;
		color: #00ff65;
		margin: 0 auto;
		border-radius: 5px;
		line-height: 55px;
		z-index: 999;
		text-align: center;
		top: -115px;
		position: relative;
	}
</style>
