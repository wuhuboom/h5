<template>
	<view class="">
		<view class="safeContainer">
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

			<view class="safeList">
				<view class="safe-item" @click="loginPwdClick">
					<view class="content">
						{{$t('safe.manage.content.log.pwd.text')}}
					</view>
					<view class="action">
						{{$t('safe.manage.content.safe.text')}}
					</view>
					<view class="arrow">
						<u-icon name="arrow-right" color="#8799a3"></u-icon>
					</view>
				</view>
				<view class="safe-item" @click="payPwdClick">
					<view class="content">
						{{$t('safe.manage.content.pay.pwd.text')}}
					</view>
					<view class="action">
						{{$t('safe.manage.content.safe.text')}}
					</view>
					<view class="arrow">
						<u-icon name="arrow-right" color="#8799a3"></u-icon>
					</view>
				</view>
			</view>

		</view>

		<self-tabbar :current-page="111"></self-tabbar>


	</view>
</template>

<script>
	import {

		websiteUrlStr,
		playerInfoReq
	} from '@/api/index.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	export default {
		mixins: [myMixin],
		data() {
			return {
				navTitle: this.$t('safe.manage.title.text'),
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


			// this.getPayInfoData()
			// this.getInformation()
		},
		mounted() {

		},
		computed: {

		},
		methods: {
			async getInformation() {
				this.balanceNum = 0
				let resR = await playerInfoReq(this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {
					this.balanceNum = resR.data.balance / 100

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
			loginPwdClick() {
				uni.navigateTo({
					url: "/pages/safe/pwd",
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			payPwdClick() {
				uni.navigateTo({
					url: "/pages/safe/fundpwd",
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

	.safeContainer {
		// height: 100vh;
		background: #f1f1f1;

		.banner {
			background: linear-gradient(to right, #6dcab8, #3a78cb);
			padding: 30px 0 0;
		}

		.safeList {
			margin-top: 35px;

			overflow: hidden;
			margin-right: 15px;
			margin-left: 15px;
			border-radius: 10px;

			.safe-item {
				position: relative;
				display: flex;
				padding: 0 15px;
				min-height: 50px;
				background-color: #fff;
				justify-content: space-between;
				align-items: center;
				background-color: unset;

				&:after {
					position: absolute;
					top: 0;
					left: 0;
					box-sizing: border-box;
					width: 200%;
					height: 200%;
					border-bottom: 1px solid #ddd;
					border-radius: inherit;
					content: " ";
					-webkit-transform: scale(.5);
					transform: scale(.5);
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					pointer-events: none;
				}

				&:last-child:after {
					border: none;
				}

				.content {
					font-size: 15px;
					line-height: 22.4px;
					flex: 1;
					color: #8799a3;
				}

				.action {
					margin-right: 20px;
					color: #f37b1d;
				}
			}
		}

		.line {
			height: 95px;
		}
	}
</style>
