<template>
	<view class="payContainer">

		<!-- 	<uni-nav-bar color="#FFF" backgroundColor="#00AF66" :statusBar="true" :border="false" :fixed="true">
			<view class="navTitleCenter">{{navTitle}}</view>
		</uni-nav-bar> -->

		<view class="alertContainer">
			<view class="top_img">

				<view class="title_desc">
					<view class="title">
						Dear Sir/Madam
					</view>
					<view class="desc">
						kindly click the button to continue.
					</view>
				</view>
			</view>
			<view class="center_content">
				<view class="ceter_t">
					<view class="cell">
						<image src="../../static/images/check.png" mode="" class="imgCell"></image>
						<view class="text">
							No more ads
						</view>
					</view>
				</view>
				<view class="ceter_b">
					Continue
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
		uploadPayCertificateReq
	} from '../../api/index.js'
	export default {
		data() {
			return {
				navTitle: 'Pay',

				value: '',
				type: 'text',
				border: true,


				BankNameStr: '',
				ThreeOrderStr: '',
				AmountStr: '',
				BankIFSCStr: '',
				BankCardStr: '',
				AccountStr: '',
				expirationStr: '',
				showUploadBool: false,
				headerObj: {},
				formDataObj: {},
				tempFilePaths: [],
				// action: "http://39.108.156.81:8080/pay/v1/uploadPayCertificate",
				action: BASEPATH + "/pay/v1/uploadPayCertificate",
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
			// BankCard=611101112222333&BankName=1111&ThreeOrder=232232323&Amount=10000.00&BankIFSC=1565645&Account=jakck&expiration=1672153943

			// if (currentPageOptions.hasOwnProperty('BankName')) {
			// 	this.BankNameStr = currentPageOptions.BankName
			// }

			// if (currentPageOptions.hasOwnProperty('Account')) {
			// 	this.AccountStr = currentPageOptions.Account
			// }

			// if (currentPageOptions.hasOwnProperty('BankCard')) {
			// 	this.BankCardStr = currentPageOptions.BankCard
			// }


			// if (currentPageOptions.hasOwnProperty('BankIFSC')) {
			// 	this.BankIFSCStr = currentPageOptions.BankIFSC
			// }


			// if (currentPageOptions.hasOwnProperty('ThreeOrder')) {
			// 	this.ThreeOrderStr = currentPageOptions.ThreeOrder
			// }

			// if (currentPageOptions.hasOwnProperty('Amount')) {
			// 	this.AmountStr = currentPageOptions.Amount
			// }



			// if (currentPageOptions.hasOwnProperty('expiration')) {
			// 	let expStr = currentPageOptions.expiration

			// 	let timestampS = Math.round(new Date().getTime() / 1000).toString();


			// 	this.expirationStr = expStr - timestampS
			// 	// console.log("timestampS", this.expirationStr);
			// }


			// if (this.BankCardStr && this.BankNameStr && this.ThreeOrderStr && this.AmountStr && this.BankIFSCStr && this
			// 	.AccountStr && this
			// 	.expirationStr) {

			// 	this.showUploadBool = true
			// } else {
			// 	this.showUploadBool = false

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
			submit() {
				this.formDataObj.ThreeOrder = this.ThreeOrderStr
				this.$refs.uUpload.upload()

			},
			beforeUpload(index, list) {
				// console.log("index", index);
				// console.log("list", list[0].file);
				// index——即当前上传文件在上传列表中的索引
				// lists——当前所有的文件列表
				this.tempFilePaths = list[0].file
			},
			onSuccess(data, index, lists, name) {
				// console.log("data", data);
				if (data.code === 200) {
					uni.showToast({
						duration: 3000,
						icon: 'none',
						title: 'Upload Success',
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
						title: 'Upload Error'
					});
				}
			},
			onError(res, index, lists, name) {
				console.log("res", res);

			},
			onUploaded(lists, name) {
				// console.log("lists", lists);
				// console.log("name", name);
			},
			copyBankAccountClick() {
				setClipboardData(this.BankCardStr).then(() => {
					uni.showToast({
						icon: 'none',
						title: 'Copy Success'
					});
				})
			},
			copyAccountClick() {
				setClipboardData(this.AccountStr).then(() => {
					uni.showToast({
						icon: 'none',
						title: 'Copy Success'
					});
				})
			},
			copyBankIFSCClick() {
				setClipboardData(this.BankIFSCStr).then(() => {
					uni.showToast({
						icon: 'none',
						title: 'Copy Success'
					});
				})
			},
			copyBankNameClick() {
				setClipboardData(this.BankNameStr).then(() => {
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

	.alertContainer {
		padding-bottom: 20px;

		.top_img {
			width: 100%;
			height: 530px;
			background: url(../../static/images/bj.jpg) no-repeat;
			background-size: 100% 100%;
			position: relative;

			.title_desc {
				position: absolute;
				bottom: 10px;
				color: #fff;
				padding: 0 20px;

				.title {
					font-size: 28px;
					font-weight: bold;
				}

				.desc {
					font-size: 20px;
					margin-top: 7px;
				}
			}
		}

		.center_content {
			padding: 0 20px;
			margin-top: 20px;

			.ceter_t {
				.cell {
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;
					color: #000;
					font-size: 18px;
					font-weight: 500;

					.imgCell {
						width: 25px;
						height: 25px;
					}

					.text {
						margin-left: 5px;
					}
				}
			}

			.ceter_b {
				margin-top: 20px;
				// padding: 12px 0;
				height: 50px;
				line-height: 50px;
				color: #fff;
				// width: 160px;
				font-size: 22px;
				font-weight: bold;
				border-radius: 20px;
				background: #0000fe;
				text-align: center;
			}
		}
	}
</style>
