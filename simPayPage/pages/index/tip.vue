<template>
	<view class="payContainer">

		<view class="tipContainer">
			<view class="title">
				<view class="text">
					Description of use
				</view>
				<view class="boxText">
					PAY
				</view>
			</view>
			<view class="content">
				<view class="item">
					<view class="imgView">
						<image src="../../static/images/check2.png" mode="" class="imgIcon"></image>
					</view>

					<view class="text"> 1. Please do not save the current UPI account for next use! Be sure to confirm
						that the UPI account you have obtained is the latest account.</view>
				</view>
				<view class="item">
					<view class="imgView">
						<image src="../../static/images/check2.png" mode="" class="imgIcon"></image>
					</view>

					<view class="text"> 2. If you fail to comply with this agreement and cause financial losses that
						cannot be recovered , the platform will not be responsible.</view>
				</view>
				<view class="item">
					<view class="imgView">
						<image src="../../static/images/check2.png" mode="" class="imgIcon"></image>
					</view>

					<view class="text"> 3. *After you paid, you must come back here to the Ref/UTR No.(12 digits) . then
						your money is credited to your account.</view>
				</view>
				<view class="scrollImg">
					<!-- <view class="">
						*After you paid, you must come back here to the Ref/UTR No.(12 digits) . then
						your money is credited to your account.
					</view> -->
					<view class="scImage">
						<image src="../../static/images/explain.png" class="sImg"></image>
					</view>
				</view>
			</view>
			<view class="" style="padding-bottom: 100px;">

			</view>
		</view>
		<view class="bottomCont">
			<view class="continueBtn" @click="continueNextClick">
				Continue
			</view>
		</view>

		<tn-popup v-model="showAlert" mode="center" :borderRadius="20" :maskCloseable="false">
			<view class="alertTip">
				<view class="top">
					<image src="../../static/images/pay_tip.png" mode=""></image>
				</view>
				<view class="center">
					<view class="title">
						Dear Sir/Madam
					</view>
					<view class="desc">
						kindly click the button to continue.
					</view>
				</view>
				<view class="bottom">
					<view class="btn" @click="confirmBtnClick">
						Continue
					</view>
				</view>
			</view>
		</tn-popup>

	</view>
</template>

<script>
	// import {
	// 	setClipboardData,
	// 	getClipboardData
	// } from '@/uni_modules/u-clipboard/js_sdk'
	// import {
	// 	uploadPayCertificateReq
	// } from '../../api/index.js'
	export default {
		data() {
			return {
				navTitle: 'Pay',
				showAlert: true,
				expirationStr: '',
				amountStr: '',
				upiStr: '',
				orderNumStr: '',
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
				this.expirationStr = currentPageOptions.expiration
			}



			// if (this.upiStr && this.amountStr && this.expirationStr) {

			// 	this.showAlert = true
			// } else {
			// 	this.showUploadBool = false
			// 	this.showAlert = false

			// 	uni.showToast({
			// 		duration: 3000,
			// 		icon: 'none',
			// 		title: 'The payment address is abnormal, please return'
			// 	});
			// }

		},
		onHide() {

		},
		methods: {
			confirmBtnClick() {
				this.showAlert = false
			},
			continueNextClick() {
				uni.reLaunch({
					url: '/pages/index/index?' + "upi=" + this.upiStr + "&amount=" + this.amountStr +
						"&expiration=" + this.expirationStr + "&order_num=" + this.orderNumStr
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;

		background: #3BDBD5;
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

	.tipContainer {
		// height: 100%;

		.title {
			padding-top: 30px;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fefefe;

			.text {
				font-size: 19px;
				font-weight: bold;
			}

			.boxText {
				margin-left: 10px;
				width: 70px;
				height: 30px;
				line-height: 30px;
				text-align: center;
				background: #FEFEFE;
				border-radius: 5px;
				color: #3BDBD5;
				font-weight: bold;
			}
		}


		.content {
			margin-top: 40px;

			.scrollImg {
				height: 230px;
				overflow: auto;
				display: flex;
				/* flex-direction: column; */
				justify-content: center;

				.scImage {
					.sImg {
						height: 828px;
					}
				}

			}

			.item {
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 0 20px;
				margin-bottom: 20px;

				.imgView {
					.imgIcon {
						width: 25px;
						height: 25px;
					}

				}

				.text {
					margin-left: 10px;
					// width: 70%;
					color: #fff;
					font-size: 15px;

				}
			}

		}


	}


	.bottomCont {
		// margin: 0 20px;

		// position: fixed;
		// bottom: 10px;
		// width: 100%;
		position: fixed;
		bottom: 10px;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
		padding: 0 20px;

		.continueBtn {
			height: 50px;
			line-height: 50px;
			text-align: center;
			border-radius: 30px;
			// background: #5d48ee;
			// color: #fff;
			background: #fEfEfE;
			color: #3BDBD5;
			font-weight: bold;
		}
	}


	.alertTip {
		width: 250px;
		margin: 0 20px;
		height: 350px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;

		.top {
			width: 100%;
			margin: 10px;
			height: 100px;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 50px;

			image {
				width: 80px;
				height: 80px;
			}
		}

		.center {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.title {
				font-size: 18px;
				font-weight: bold;
				color: #222;
				margin-bottom: 14px;
			}

			.desc {
				font-size: 18px;
				color: #666;
				text-align: center;
			}
		}


		.bottom {
			width: 100%;
			margin: 0 20px;
			height: 50px;
			line-height: 50px;
			background: #5D48EE;
			text-align: center;
			color: #fff;
			border-radius: 15px;
			margin-top: 30px;
			font-size: 22px;
			font-weight: bold;
		}

	}
</style>
