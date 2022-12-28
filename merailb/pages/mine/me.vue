<template>
	<view class="">
		<view class="meContainer">
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

			<view class="info">
				<view class="content">
					<view class="content_l">
						{{$t('person.content.account.text')}}
					</view>
					<view class="content_r">
						{{username}}
					</view>
				</view>
				<view class="content">
					<view class="content_l">
						{{$t('person.content.phone.text')}}
					</view>
					<view class="content_r">
						{{phoneStr}}
					</view>
				</view>
				<view class="content" @click.stop="bindcardClick">
					<view class="content_l">
						{{$t('person.content.card.text')}}
					</view>
					<view class="content_r">
						{{bindStatuStr}}
						<u-icon name="arrow-right" color="#333"></u-icon>
					</view>
				</view>
			</view>

			<view class="logout" @click="logoutClick">
				{{$t('person.content.logout.btn.text')}}
			</view>

		</view>

		<self-tabbar :current-page="111"></self-tabbar>


	</view>
</template>

<script>
	import {
		getInformationReq,
		setBankReq
	} from '@/api/index.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	export default {
		mixins: [myMixin],
		data() {
			return {
				navTitle: this.$t('person.title.text'),
				username: '',
				phoneStr: '',
				bindStatuStr: '',
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

			this.getInformation()
			this.getBankInfo()
		},
		mounted() {

		},
		computed: {

		},
		methods: {

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
			async getInformation() {
				let resR = await getInformationReq(this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 2000) {
					this.username = resR.result.Username
					this.phoneStr = resR.result.Phone
				}
			},
			async getBankInfo() {
				let reqParam = {}
				let resR = await setBankReq(reqParam, this.localLoginToken, 'getBank')
				if (resR.code === 2000) {
					this.bindStatuStr = this.$t('person.content.already.bind.card.text')
				} else if (resR.code === 400) {
					this.bindStatuStr = this.$t('person.content.no.bind.card.text')
				}
			},
			bindcardClick() {
				uni.navigateTo({
					url: "/pages/mine/bindcard",
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			logoutClick() {
				this.logout()
				uni.reLaunch({
					url: '/pages/login/login',
					animationType: 'pop-in',
					animationDuration: 200
				});
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

	.meContainer {
		// height: 100vh;
		background: #fff;

		.banner {
			background: linear-gradient(to right, #6dcab8, #3a78cb);
			padding: 30px 0 0;
		}


		.info {
			padding: 0 15px;
			margin-top: 20px;

			.content {
				display: flex;
				justify-content: space-between;
				padding: 20px 0;
				border-bottom: 2px solid #eee;
				color: #333;
				font-size: 14px;

				.content_l {}

				.content_r {}
			}
		}

		.logout {
			margin: 0 5%;
			width: 90%;
			padding: 10px;
			border: 1px solid #dedede;
			color: #666;
			text-align: center;
			border-radius: 700px;
			position: fixed;
			bottom: 90px;
		}


		.line {
			height: 95px;
		}
	}
</style>
