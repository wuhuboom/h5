<template>
	<view class="payContainer">

		<uni-nav-bar color="#FFF" backgroundColor="#00AF66" :statusBar="true" :border="false" :fixed="true">
			<view class="navTitleCenter">{{navTitle}}</view>
		</uni-nav-bar>

		<view class="payContent">
			<view class="expireDate">
				<u-count-down ref="uCountDown" bg-color="#00AF66" separator-color="#fff" color="#fff"
					:timestamp="expirationStr" :show-days="false" :show-hours="true" font-size="34"></u-count-down>
			</view>
			<view class="payInfoContent">

				<view class="moneyImg">
					<image src="../../static/images/money.png" class="img_money"></image>
				</view>

				<view class="qzImg">
					<image src="../../static/images/qz.png" class="img_qz"></image>
				</view>

				<view class=" infoCell">
					<view class="step">
						<view class="s_text">
							Step 1.
						</view>
						<view class="s_content">

						</view>
					</view>
					<view class="title">
						Copy UPI Information
					</view>
					<view class="operate">

						<view class="operate_cell">

							<view class="content">
								<view class="title">
									Amount
								</view>
								<view class="amount">
									{{amountStr}}
								</view>
								<!-- <view class="copy">
									<view class="c_content">
										copy
									</view>
								</view> -->
							</view>
							<view class="copy" @click="copyAmountClick">
								<view class="c_content">
									copy
								</view>
								<!-- <view class="title">
									Amount
								</view>
								<view class="amount">
									500.00
								</view>
 -->
							</view>

						</view>
						<view class="operate_cell">

							<view class="content">
								<view class="title">
									VPA/UPI
								</view>
								<view class="amount" style="font-size: 15px;margin-top: 5px;">
									{{upiStr}}
								</view>
								<!-- <view class="copy">
									<view class="c_content">
										copy
									</view>
								</view> -->
							</view>
							<view class="copy" @click="copyUpiClick">
								<view class="c_content">
									copy
								</view>
								<!-- <view class="title">
									Amount
								</view>
								<view class="amount">
									500.00
								</view>
 -->
							</view>

						</view>

					</view>
				</view>

				<view class="infoCell">
					<view class="step">
						<view class="s_text">
							Step 2.
						</view>
						<view class="s_content">

						</view>
					</view>
					<view class="title">
						Transfer and don't modify this amount to us by UPI transfer.
					</view>
					<view class="operate">

						<view class="operate_warn">
							<view class="imgCon">
								<image src="../../static/images/warningImg.png" class="imgWarning"></image>
							</view>
							<view class="desc">
								Please record your reference No.{Ref No.} after payment
							</view>
						</view>

					</view>
				</view>

				<view class="infoCell">
					<view class="step">
						<view class="s_text">
							Step 3.
						</view>
						<view class="s_content">

						</view>
					</view>
					<view class="title">
						Please enter Ref No. to complete the recharge
					</view>
					<view class="operate">

						<view class="operate_warn">
							<view class="imgCon">
								<image src="../../static/images/warningImg.png" class="imgWarning"></image>
							</view>
							<view class="desc">
								Be sure to<text style="margin: 0 5px;color: red;"> return </text> this page to fill in
								the<text style="margin: 0 5px;color: red;">UTR numbers after</text>
								you have completed your payment
							</view>

						</view>
						<view class="inputConta">
							<u-input v-model="proof_of_payment" :type="type" :border="border" maxlength="12"
								placeholder="UTR (UPI Ref.ID) must be 12 digits" placeholder-style="color:#75759A" />
						</view>
					</view>
				</view>

			</view>
			<view class="payShowMSG">
				<view class="safe">
					<image src="../../static/images/safe.png" mode=""></image>
				</view>
				<view class="content">
					©2022 Fastpay Technical Support All Rights Reserved
				</view>
			</view>
			<view class="payBottom" v-if="showUploadBool">
				<view class="payBtn" @click="$u.throttle(submitPayMenentClick, 1500)">
					Submit UTR
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		setClipboardData,
		getClipboardData
	} from '@/uni_modules/u-clipboard/js_sdk'
	import {
		uploadCertificatReq
	} from '../../api/index.js'
	export default {
		data() {
			return {
				navTitle: 'Pay',
				expirationStr: '',
				upiStr: '',
				amountStr: '',
				proof_of_payment: '',
				type: 'text',
				border: true,
				orderNumStr: '',
				showUploadBool: true,
			}
		},
		onLoad() {

		},
		onShow() {

			let pagearr = getCurrentPages(); //获取应用页面栈/获取当前打开过的页面路由数组
			// console.log("pagearr",pagearr);
			let currentPage = pagearr[pagearr.length - 1]; //获取当前页面信息
			let currentPageOptions = currentPage.options ////获取路由参数
			let currentPageRoute = currentPage.route //获取当前页面路由
			// console.log("currentPageRoute",currentPageRoute);
			// upi=123@gmial.com&amount=100&expiration=1673270728&order_num=324324324EWRWE

			if (currentPageOptions.hasOwnProperty('order_num')) {
				this.orderNumStr = currentPageOptions.order_num
			}


			if (currentPageOptions.hasOwnProperty('upi')) {
				this.upiStr = currentPageOptions.upi
			}

			if (currentPageOptions.hasOwnProperty('amount')) {
				this.amountStr = currentPageOptions.amount
			}

			if (currentPageOptions.hasOwnProperty('expiration')) {
				let expStr = currentPageOptions.expiration
				// let expStr = "1673270728"
				let timestampS = Math.round(new Date().getTime() / 1000).toString();
				this.expirationStr = expStr - timestampS
				// console.log("timestampS", timestampS);
			}


			if (this.orderNumStr && this.upiStr && this.amountStr && this.expirationStr) {
				this.showUploadBool = true
			} else {
				this.showUploadBool = false

				uni.showToast({
					duration: 3000,
					icon: 'none',
					title: 'The payment address is abnormal, please return'
				});
			}

		},
		onHide() {

		},
		methods: {
			async submitPayMenentClick() {
				if (!this.proof_of_payment) {
					uni.showToast({
						duration: 6000,
						icon: 'none',
						title: 'UTR is not allowed to be empty'
					});

					return false
				}


				if (!this.orderNumStr) {
					uni.showToast({
						duration: 3000,
						icon: 'none',
						title: 'The payment address is abnormal, please return'
					});
					return false
				}


				if (this.proof_of_payment.length > 12 || this.proof_of_payment.length < 12) {
					uni.showToast({
						duration: 3000,
						icon: 'none',
						title: 'UTR only allows input of 12 bits'
					});

					return false
				}



				let reqParam = {}
				reqParam.order_num = this.orderNumStr
				reqParam.proof_of_payment = this.proof_of_payment
				let resR = await uploadCertificatReq(reqParam, '')
				if (resR.code === 200) {
					uni.showToast({
						duration: 3000,
						icon: 'none',
						title: 'Submit Success',
						success: () => {
							setTimeout(function() {
								// 成功后返回上一级
								// window.history.go(-1);
							}, 3000);
						}
					});
				} else {
					uni.showToast({
						duration: 3000,
						icon: 'none',
						title: resR.msg
					});
				}

			},
			copyAmountClick() {
				setClipboardData(this.amountStr).then(() => {
					uni.showToast({
						icon: 'none',
						title: 'Copy Success'
					});
				})
			},
			copyUpiClick() {
				setClipboardData(this.upiStr).then(() => {
					uni.showToast({
						icon: 'none',
						title: 'Copy Success'
					});
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	page {
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
		font-size: 16px;
		font-weight: bold;
	}

	.payContainer {
		background: #F9F9F9;
		height: 100%;
		overflow: auto;

		.payContent {
			height: 150px;
			width: 100%;
			background: #00AF66;
			position: relative;

			.expireDate {
				width: 100%;
				height: 50px;

				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: bold;

				// position: absolute;
				// bottom: 0;
				// top: 20px;
				// left: 0;
				// right: 0;
			}

			.payInfoContent {
				margin: 0 10px;
				// height: 625px;
				background: #fff;
				// position: absolute;
				// bottom: 0;
				// top: 70px;
				// left: 0;
				// right: 0;
				border-radius: 5px;
				padding-bottom: 40px;
				box-shadow: 0px 4px 4px #ccc;
				position: relative;
				margin-top: 20px;

				.moneyImg {
					position: absolute;
					// top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);

					.img_money {
						width: 55px;
						height: 55px;
					}
				}

				.qzImg {
					position: absolute;
					right: 20px;
					// left: 50%;
					transform: translateY(-50%);

					.img_qz {
						width: 25px;
						height: 25px;
					}
				}


				.infoCell {
					margin: 0 20px;
					// margin-top: 25px;
					padding-top: 20px;

					.step {

						font-weight: bold;

						.s_content {}

						.s_text {
							font-size: 18px;
							// color: #f5a623;
						}
					}

					.title {
						font-weight: bold;
						margin-top: 5px;
						color: #878787;
						font-size: 13px;
					}

					.operate {

						.operate_warn {

							margin-top: 10px;
							display: flex;
							flex-direction: row;
							align-items: center;

							.imgCon {

								.imgWarning {
									width: 16px;
									height: 15px;
								}
							}


							.desc {
								margin-left: 10px;
								color: #868686;
								font-size: 12px;
							}
						}

						.inputConta {
							margin-left: 20px;
							margin-top: 10px;
						}

						.operate_cell {
							margin-top: 30px;

							.title {
								width: 100px;
								height: 30px;
								background: #fff;
								border: 3px solid #005AFF;
								border-radius: 30px;
								position: absolute;
								right: 0;
								bottom: 0;
								left: 0;
								margin: auto;
								top: -50px;
								display: flex;
								align-items: center;
								justify-content: center;
								color: #005AFF;
							}

							.content {
								color: #fff;
								font-size: 18px;
								font-weight: bold;
								border-radius: 30px;
								background: #005AFF;
								height: 50px;
								display: flex;
								align-items: center;
								position: relative;
								z-index: 1000;

								.amount {
									padding: 0 10px;
									/* margin-left: 20px; */
									word-break: break-word;
									width: 100%;
									display: flex;
									align-items: center;
									// justify-content: center;
									/* height: 20px; */
									// font-size: 15px;



								}
							}

							.copy {
								color: #A8A8A8;
								font-size: 18px;
								font-weight: bold;
								border-radius: 15px;
								background: #E4F1FF;
								margin-top: -30px;
								height: 50px;
								display: flex;
								align-items: flex-end;
								/* align-items: center; */
								justify-content: center;
								position: relative;
							}

							// .copy {
							// 	// color: #fff;
							// 	color: #005AFF;
							// 	font-size: 18px;
							// 	font-weight: bold;
							// 	border-radius: 30px;
							// 	background: #E4F1FF;
							// 	height: 50px;
							// 	display: flex;
							// 	align-items: center;
							// 	justify-content: center;
							// 	position: absolute;
							// 	right: 0;
							// 	width: 60px;
							// }


							// .copy {
							// 	// color: #fff;
							// 	color: #A5A5A5;
							// 	font-size: 18px;
							// 	font-weight: bold;
							// 	border-radius: 30px;
							// 	background: #E4F1FF;
							// 	height: 50px;
							// 	display: flex;
							// 	align-items: center;
							// 	justify-content: center;
							// 	position: absolute;
							// 	width: 100%;
							// 	top: 30px;
							// }

						}
					}
				}
			}

			.payShowMSG {
				padding-bottom: 100px;
				margin-top: 20px;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				color: #a6a6a6;
				margin: 20px;

				.safe {
					image {
						width: 19px;
						height: 19px;
					}
				}

				.content {
					margin-left: 10px;
				}
			}

			.payBottom {
				// background: linear-gradient(90deg, #3a9ef3, #3C9CF2);
				// height: 55px;
				// width: 100%;
				// position: fixed;
				// bottom: 0;
				// /* width: 100%; */
				// background: #fff;
				// min-width: 375px;
				// max-width: 100%;

				position: fixed;
				bottom: 0;
				left: 0;
				right: 0;
				margin-left: auto;
				margin-right: auto;
			}

			.payBtn {
				background: linear-gradient(180deg, #578BF9, #21B2EB);
				height: 50px;
				border-radius: 10px;
				margin: 10px;
				color: #fff;
				font-weight: bold;
				display: flex;
				align-items: center;
				justify-content: center;

			}
		}

		/deep/ .u-input {
			box-shadow: inset 0px 1px 3px 0px #0000001c;
		}

		/deep/ .uni-navbar--fixed {
			z-index: 2000;
		}
	}
</style>
