<template>
	<view class="">
		<view class="pwdContainer">
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

			<view class="pwdCon">
				<view class="origin_new_input">
					<view class="origin_i">
						<view class="title">
							{{$t('safe.manage.change.pwd.origin.text')}}
						</view>
						<view class="right_input">
							<input type="password" style='width:0;height:0;min-height:0' />
							<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
							<input type="text" value="" v-model="old_password" />
						</view>
					</view>
					<view class="new_i">
						<view class="title">
							{{$t('safe.manage.change.pwd.new.text')}}
						</view>
						<view class="right_input">
							<input type="password" style='width:0;height:0;min-height:0' />
							<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
							<input type="text" value="" password v-model="new_password" />
						</view>
					</view>
				</view>
			</view>

			<view class="confirmChangeBtn" @click="confirmEditClick">
				{{$t('safe.manage.change.confirm.btn.text')}}
			</view>


		</view>


		<self-tabbar :current-page="111"></self-tabbar>


	</view>
</template>

<script>
	import {
		websiteUrlStr,
		updatePasswordReq
	} from '@/api/index.js'
	import {
		myMixin
	} from '@/util/mixins.js'

	export default {
		mixins: [myMixin],

		data() {
			return {
				navTitle: this.$t('safe.manage.content.log.pwd.text'),
				urlFromStr: '',
				old_password: "",
				new_password: "",
			}
		},
		onShow() {

			// // #ifndef APP-NVUE
			// const eventChannel = this.getOpenerEventChannel();
			// // #endif
			// // ??????acceptDataFromOpenerPage?????????????????????????????????eventChannel??????????????????????????????
			// eventChannel.on('rechargeEventClick', async (data) => {
			// 	this.urlFromStr = data.from
			// })

		},
		mounted() {

		},
		computed: {

		},
		methods: {
			goBackBtnClick() {
				uni.navigateTo({
					url: '/pages/mine/safe',
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
				// 			// ??????eventChannel??????????????????????????????
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
			async confirmEditClick() {
				let reqParam = {}
				reqParam.old_password = this.old_password
				reqParam.password = this.new_password
				let resR = await updatePasswordReq(reqParam, this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 2000) {
					// uni.showToast({
					// 	icon: 'none',
					// 	title: "ok"
					// });
					this.logout()
					uni.reLaunch({
						url: '/pages/login/login',
						animationType: 'pop-in',
						animationDuration: 200
					});
				}

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

	// ???????????????

	.pwdContainer {
		// height: 100vh;
		background: #f1f1f1;

		.banner {
			background: linear-gradient(to right, #6dcab8, #3a78cb);
			padding: 30px 0 0;
		}


		.pwdCon {
			padding: 15px;
			margin-top: 20px;

			.origin_new_input {
				background-color: #fff;
				color: #333;
				padding: 15px;
				border: 10px;
				border-radius: 9px;

				.origin_i,
					{
					display: flex;
					padding: 10px 0;
					border-bottom: 1px solid #eee;


					.title {
						width: 90px;
						font-weight: 400;
						font-size: 14px;
						font-family: Helvetica Neue, Helvetica, sans-serif;
					}

					.right_input {
						font-size: 14px;
						flex: 1 1 0%;
					}
				}

				.new_i {
					display: flex;
					border-bottom: none;
					padding-top: 10px;

					.title {
						width: 90px;
						font-weight: 400;
						font-size: 14px;
						font-family: Helvetica Neue, Helvetica, sans-serif;
					}

					.right_input {
						font-size: 14px;
						flex: 1 1 0%;
					}
				}
			}
		}

		.confirmChangeBtn {
			margin: 0 15px;
			text-align: center;
			font-size: 16px;
			margin-top: 20px;
			background: linear-gradient(90deg, #6dcab8, #3a78cb);
			color: #fff;
			border: none;
			border-radius: 700px;
			height: 40px;
			line-height: 42px;
		}

		.line {
			height: 95px;
		}
	}
</style>
