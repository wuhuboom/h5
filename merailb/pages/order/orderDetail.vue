<template>
	<view class="">
		<view class="orderDetail">

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

			<view class="con">
				<view class="cont">
					<image
						src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAChklEQVRIS+2WT0hUURjFz7nvDcZYkgiCRERC1EZb2CbIIh3BP4ugRUHbFEotKSIKWrgIihaFoRZo26AWQQtNcDRQoo0u1I0gGBEhDIlkNiTz3j0xMxn+mRlfCi3Ku7z3O9/v/vnuuZfI0hKDrfdAVbliI2s6p7LFre7XYGuZR/VCHA7VdN7OpGGmTo3eKvSXF+clEOTjUKSrLQgwEW3pgHSVhJy8giJW3l9Yr0sBNdYe9r9+OQXQdWhnQc17HuaSY4TpcSInL/vDo/WQVSoBDUERvtITNsY6VZX9fnTkiWCbkl2uixKIRb5MqeQn3L3FIzzWHk8JEtHmCQjlv8SPXGMfrAG69rrn4VuuVbou9vieebga6FlzE9ZeS08Sk6FI91Fq4ka+F4svrSQj8cKpLr7gD8VmJJQSvOg47jvPT0znBJKHfeGEoGckZp3q4kP+UOy5hPMrOrewOH8jEIg7rqlAKPwZP5YPMtIx6UVbeiQ15gKS7HUjXU2KtpVjV94HJOL7fM+OCwjnBKZXz0URPQaaE9Ag4XSQoiHxlkCfBUsoNAkqWK1Lr3CsPewtxL4HSbjdmB3gdndwgz5jla6N4jSIPgA2IN1AaAB0JFP85kCiLhTpHggIS4Ulos21EN5sDQhOweA1xLSlbdaSdmdxBlBZduC/fy3WeenqrUh6IoABIOCWIvV61CY9eGtn+NeLhhg34CtIwa4FaSx0FkLFTtH8foDXFA3wCWAURLB7mPwDQREB+7dUNDSm3q3uzOga2TzAG2qtk7X9WwKCfG+Il3/iNFY4B+n4/1w0M1fy/I92SZK7mTdvZ5yk5xwwu1P/Un+w5Y6oSxBC20maVUskKD51arru/gTvfn3IOrcuewAAAABJRU5ErkJggg=="
						mode=""></image>
					<view class="title">
						{{showData.GoodsName}}
					</view>
				</view>
				<view class="conb">
					<image :src="showData.GoodsImgUrl" mode="" class="imgs"></image>
					<view class="conb_r">
						<view class="p_title">
							{{showData.GoodsName}}
						</view>
						<view class="price">
							{{symbolStr}} {{showData.OrderMoney}}
						</view>
						<view class="tip">
							{{$t('task.order.detail.content.official.text')}}
						</view>
					</view>
				</view>
			</view>
		</view>


		<view class="lineWrap">
			<view class="line">
				<view class="line_l">
					{{$t('order.single.detail.order.money.text')}}
				</view>
				<view class="line_r">
					{{symbolStr}}{{showData.OrderMoney}}
				</view>
			</view>
			<view class="line">
				<view class="line_l">
					{{$t('order.single.detail.commission.rate.text')}}
				</view>
				<view class="line_r">
					{{showData.CommissionRate}}
				</view>
			</view>
			<view class="line">
				<view class="line_l">
					{{$t('order.single.detail.order.yuji.money.text')}}
				</view>
				<view class="line_r">
					{{showData.yugufree}}
				</view>
			</view>
			<view class="line">
				<view class="line_l">
					{{$t('order.single.detail.order.status.text')}}
				</view>
				<view class="line_r">
					{{showData.Status}}
				</view>
			</view>
		</view>


		<uni-popup ref="popup" type="bottom" :mask-click="true">

			<view class="toastWrap">
				<image src="../../static/images/baodan.jpg" mode="" class="showimg"></image>
				<view class="confirmBtn" @click="closspop">
					{{$t('alert.model.center.btns.confirm')}}
				</view>
				<image src="../../static/images/close-r.png" mode="" class="closeimg" @click="closspop"></image>
			</view>

		</uni-popup>

	</view>
</template>

<script>
	import {
		websiteUrlStr,
		getDoTaskReq,
		submitDoTaskReq
	} from '@/api/index.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	export default {
		mixins: [myMixin],
		data() {
			return {
				navTitle: this.$t('task.order.detail.content.title.text'),
				showData: {},
				urlFromStr: '',
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


			this.$nextTick(() => {
				this.$refs.popup.open('center')
			})

		},
		mounted() {

		},
		computed: {

		},
		methods: {
			goBackBtnClick() {
				uni.switchTab({
					url: '/pages/order/index',
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
			closspop() {
				this.$refs.popup.close()
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

	.orderDetail {
		// height: 100vh;
		background: #f1f1f1;

		.banner {
			background: linear-gradient(to right, #6dcab8, #3a78cb);
			padding: 50px 0 0;
		}

		.con {
			margin: 10px 10px 0;
			background: #fff;
			border-radius: 10px;
			/* box-shadow: 0 0 10px 0 black; */
			box-sizing: border-box;
			padding: 20px 15px 15px;

			.cont {
				display: flex;
				align-items: flex-start;

				image {
					width: 21px;
					height: 14px;
					margin-right: 10px;
				}

				.title {
					font-size: 12px;
					font-weight: 400;
					color: #232f3e;
				}
			}

			.conb {
				box-sizing: border-box;
				padding: 13px 9px 0;
				display: flex;

				.imgs {
					margin-right: 15px;
					width: 70px;
					height: 70px;
				}

				.conb_r {
					display: flex;
					flex-direction: column;

					.p_title {
						font-size: 14px;
						font-weight: 400;
						color: #333;
					}

					.price {
						font-size: 14px;
						font-weight: 400;
						color: #333;
						margin-top: 10px;
					}

					.tip {
						min-width: 80px;
						margin-top: 7px;
						background: linear-gradient(to right, rgb(109, 202, 184), rgb(58, 120, 203));
						box-sizing: border-box;
						border-radius: 5px;
						padding: 4px 12px;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 14px;
						font-weight: 400;
						color: #fff;

					}
				}
			}
		}


	}

	.lineWrap {
		border-radius: 10px;
		background-color: #fff;
		margin: 10px 10px 0;

		.line {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 45px;
			font-size: 14px;
			font-weight: 400;
			color: #333;
			box-sizing: border-box;
			padding: 0 17px;

			.line_l {}

			.line_r {}
		}
	}

	.toastWrap {
		width: 315px;
		margin: 0 auto;
		background: #fff;
		box-sizing: border-box;
		padding: 40px 0 20px;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 10px;

		.showimg {
			width: 153px;
			height: 171px;
		}

		.confirmBtn {
			min-width: 140px;
			height: 42px;
			background: linear-gradient(90deg, #6dcab8, #3a78cb);
			border-radius: 5px;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 47px;
			font-size: 16px;
			font-weight: 500;
			color: #fff;
		}

		.closeimg {
			position: absolute;
			width: 30px;
			height: 30px;
			left: 50%;
			bottom: -40px;
			transform: translateX(-50%);
		}

	}


	/deep/ .uni-popup {
		z-index: 999;
	}
</style>
