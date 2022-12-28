<template>
	<view class="servicePage">

		<view class="backTitleBar-wrapper colCent borderBox">
			<view class="fixedBox">
				<view class="common_header" style="height: 44px;background: transparent;">
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
		<view class="bigbg">
			<view class="avatars">
				<image src="../../static/images/eucust.jpeg" mode=""></image>
			</view>
			<view class="spinwras">
				<view class="spindots">

				</view>
			</view>
			<view class="spinwras vrx">
				<view class="spindots">

				</view>
			</view>
			<image src="../../static/images/bginmgmock.png" mode="" style="width: 100%;"></image>
		</view>
		<view class="contents">
			<view class="tops fontColor">
				{{$t('backapi.self.server.dear.user.text')}}
			</view>
			<view class="bootms">
				{{$t('backapi.self.server.center.user.welcome.text')}}
			</view>
		</view>
		<view class="secda" @click="goToCustomer">
			<image src="../../static/images/secondservice.png" mode="" style="width: 100%;height: 104px;"></image>
			<view class="mines">
				<view class="lefts">
					<view class="top-fonts">
						{{navTitle}}
					</view>
					<view class="middle-fonts">

					</view>
					<view class="bottom-fonts">
						{{$t('notice.content.server')}}
					</view>
				</view>
				<image src="../../static/images/rightarrow.png" mode="" class="rights"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		servReq,
	} from '@/api/index.js'
	import {
		myMixin,
	} from '@/util/mixins.js'
	export default {
		mixins: [myMixin],
		data() {
			return {
				navTitle: '',
				urlFromStr: '',
				defaultServerAdd: '',
			}
		},
		onShow() {
			this.navTitle = this.$t('func.system.server')

			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('severCustomEventClick', async (data) => {
				this.urlFromStr = data.from
			})

			this.getServerAddData()
		},
		methods: {
			goBackBtnClick() {

				const querySeverCustomUrlFrom = uni.getStorageSync('querySeverCustomUrlFrom') || 'other'
				if (!this.matchContent_Bool) {
					this.urlFromStr = querySeverCustomUrlFrom
				}

				if (this.urlFromStr === "home") {
					uni.switchTab({
						url: '/pages/home/index',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (this.urlFromStr === "help") {
					uni.navigateTo({
						url: '/pages/user/help/help',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (this.urlFromStr === "func") {
					uni.switchTab({
						url: '/pages/funList/index',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (this.urlFromStr === "match_c") {
					uni.navigateTo({
						url: '/pages/match/match_content',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (this.urlFromStr === "order_l") {
					uni.switchTab({
						url: '/pages/user/order-list',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (this.urlFromStr === "user") {
					uni.switchTab({
						url: '/pages/user/user',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				}


			},
			async getServerAddData() {
				let resR = await servReq(this.localLoginToken)
				// console.log("resR", resR);
				this.defaultServerAdd = resR.data.serviceAddr
			},
			goToCustomer() {
				window.location.href = this.defaultServerAdd
			},
		},

	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f8f8f8;
	}

	.servicePage {
		// background: url(../../static/images/bginmgmock.png) no-repeat;
		// background-size: 100% 100%;
	}

	.backTitleBar-wrapper {
		position: absolute;

		.fixedBox {
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;
			// background-color: #fff;

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
	@keyframes rotate {
		0% {
			-webkit-transform: rotate(0deg);
		}

		25% {
			-webkit-transform: rotate(90deg);
		}

		50% {
			-webkit-transform: rotate(180deg);
		}

		75% {
			-webkit-transform: rotate(270deg);
		}

		100% {
			-webkit-transform: rotate(360deg);
		}
	}

	@keyframes ani-spin-bounce1 {
		0% {
			transform: scale(0)
		}

		100% {
			transform: scale(1);
			opacity: 0
		}
	}

	@keyframes ani-spin-bounce {

		0% {

			transform: scale(0.3);

			-webkit-transform: scale(0.3);

			opacity: 0.0;

		}

		25% {

			transform: scale(0.3);

			-webkit-transform: scale(0.3);

			opacity: 0.1;

		}

		50% {

			transform: scale(0.5);

			-webkit-transform: scale(0.5);

			opacity: 0.3;

		}

		75% {

			transform: scale(0.8);

			-webkit-transform: scale(0.8);

			opacity: 0.5;

		}

		100% {

			transform: scale(1);

			-webkit-transform: scale(1);

			opacity: 0.0;

		}

	}



	.bigbg {
		height: 267.5px;
		width: 100%;
		position: relative;



		.avatars {
			position: absolute;
			bottom: -20px;
			left: 0;
			right: 0x;
			width: 100%;
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-align: center;
			-webkit-align-items: center;
			-ms-flex-align: center;
			align-items: center;
			-webkit-box-pack: center;
			-webkit-justify-content: center;
			-ms-flex-pack: center;
			justify-content: center;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-webkit-flex-direction: column;
			-ms-flex-direction: column;
			flex-direction: column;
			z-index: 3;

			image {
				width: 163px;
				height: 163px;
				border-radius: 50%;
				-webkit-animation: rotate 10s linear infinite;
				animation: rotate 10s linear infinite;
			}
		}

		.spinwras {
			position: absolute;
			bottom: -35px;
			left: 0;
			right: 0;
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-align: center;
			-webkit-align-items: center;
			-ms-flex-align: center;
			align-items: center;
			-webkit-box-pack: center;
			-webkit-justify-content: center;
			-ms-flex-pack: center;
			justify-content: center;
			z-index: 1;

			.spindots {
				width: 200px;
				height: 200px;
				border-radius: 50%;
				background: -webkit-radial-gradient(center, circle, #0b0066 0, #8e00b8, #6c31cb 100%);
				background: radial-gradient(circle at center, #0b0066 0, #8e00b8, #6c31cb 100%);
				-webkit-animation: ani-spin-bounce 5s ease-in-out 0s infinite;
				animation: ani-spin-bounce 5s ease-in-out 0s infinite;
				// -webkit-animation: ani-spin-bounce 5s 0s ease-in-out infinite;
				// animation: ani-spin-bounce 5s 0s ease-in-out infinite;
			}
		}

		.vrx {
			bottom: -45px;
		}
	}


	.contents {
		width: 100%;
		margin-top: 55px;

		.tops {
			width: 100%;
			text-align: center;
			color: #597ef7;
			font-size: 30px;
		}

		.bootms {
			width: 100%;
			text-align: center;
			font-size: 16px;
			color: #666;
			margin-top: 10px;
			padding: 0 35px;
			box-sizing: border-box;
		}
	}

	.secda {
		padding: 0 10px;
		position: relative;
		margin-top: 50px;

		.mines {
			-webkit-box-align: center;
			-webkit-align-items: center;
			-ms-flex-align: center;
			align-items: center;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			padding: 20px 25px;
			box-sizing: border-box;


		}


		.mines,
		.lefts {
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-pack: justify;
			-webkit-justify-content: space-between;
			-ms-flex-pack: justify;
			justify-content: space-between;
			// height: 100%;
		}


		.lefts {
			-webkit-box-align: start;
			-webkit-align-items: flex-start;
			-ms-flex-align: start;
			align-items: flex-start;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-webkit-flex-direction: column;
			-ms-flex-direction: column;
			flex-direction: column;
			width: 95%;

			.top-fonts {
				color: #fff;
				font-size: 19px;
				font-family: DINCondensedBold;
			}

			.bottom-fonts,
			.middle-fonts {
				color: #fff;
				font-size: 13px;
				font-family: DINCondensedBold;
			}
		}


		.rights {

			width: 24px;
			height: 24px;
		}
	}
</style>
