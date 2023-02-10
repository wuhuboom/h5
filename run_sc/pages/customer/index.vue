<template>
	<view class="page-layout">
		<view class="back">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
				<u-navbar :is-back="true" :background="backgroundOBj" :border-bottom="false" z-index="1200"
					back-icon-color="#fff" title-color="#fff" :title="navTitle" :custom-back="goBackBtnClick">
				</u-navbar>

				<view class="content">
					<image src="../../static/images/img1.png" mode="" class="logons" style="height: 50px;"></image>
					<view class="textView">
						<view class="txt">
							{{$t('server.page.content.desc1.text')}}
						</view>
						<view class="txt">
							{{$t('server.page.content.desc2.text')}}
						</view>
						<view class="txt">
							{{$t('server.page.content.desc3.text')}}
						</view>
					</view>

					<view class="wrap" @click="goToCustomer">
						<view class="item">
							<view class="lf">
								<view class="name u-line-1">
									{{$t("server.page.bottom.con1.text")}}
								</view>
								<view class="desc u-line-1">
									{{$t("server.page.bottom.con2.text")}}
								</view>
							</view>
							<image src="../../static/images/img2.png" mode="" style="height: 28px;"></image>
						</view>
					</view>
				</view>
			</scroll-view>
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
				backgroundOBj: {
					"background": "transparent"
				},
				scrollTop: 0,

				urlFromStr: '',
				defaultServerAdd: '',
			}
		},
		onShow() {
			this.navTitle = this.$t('server.page.title.text')

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
			async getServerAddData() {
				let resR = await servReq(this.localLoginToken)
				// console.log("resR", resR);
				this.defaultServerAdd = resR.result.CustomerServiceAddress
			},
			goBackBtnClick() {

				uni.switchTab({
					url: '/pages/user/user',
					animationType: 'pop-in',
					animationDuration: 200
				})

				// const querySeverCustomUrlFrom = uni.getStorageSync('querySeverCustomUrlFrom') || 'other'
				// if (!this.matchContent_Bool) {
				// 	this.urlFromStr = querySeverCustomUrlFrom
				// }

				// if (this.urlFromStr === "home") {
				// 	uni.switchTab({
				// 		url: '/pages/home/index',
				// 		animationType: 'pop-in',
				// 		animationDuration: 200
				// 	})
				// } else if (this.urlFromStr === "help") {
				// 	uni.navigateTo({
				// 		url: '/pages/user/help/help',
				// 		animationType: 'pop-in',
				// 		animationDuration: 200
				// 	})
				// }


			},
			goToCustomer() {
				window.location.href = this.defaultServerAdd
			},
		},

	}
</script>

<style lang="scss" scoped>
	page {
		display: block;
		height: 100%;
		position: relative;
	}

	.page-layout {
		height: 100%;

		.back {
			position: relative;
			height: 100vh;
			background: url(../../static/images/back.png) no-repeat 0 0;
			background-size: 100% !important;
			// padding-bottom: 250px;

			.scroll-Y {
				height: 100%;

			}

			.content {
				.logons {
					width: 75px;
					margin-left: 23px;
				}

				.textView {
					margin-left: 33px;
					margin-right: 33px;

					.txt {
						font-size: 15px;
						color: #2d2d2d;
						line-height: 1.4;
						font-weight: 700;
					}
				}

				.wrap {
					margin: 0 11px;
					padding: 15px 10px 0;
					background-color: #fff;
					position: relative;
					border-radius: 10px;
					margin-top: 15px;
					display: flex;
					flex-wrap: wrap;

					&:before {
						content: "";
						width: 0;
						height: 0;
						border-left: 10px solid transparent;
						border-right: 10px solid transparent;
						border-bottom: 10px solid #fff;
						position: absolute;
						top: -10px;
						left: 42px;
					}


					.item {
						margin-bottom: 15px;
						padding: 10px;
						box-sizing: border-box;
						height: 34px;
						overflow: hidden;
						display: flex;
						align-items: center;
						justify-content: center;

						.lf {
							overflow: hidden;

							.name {
								color: #000;
								font-size: 15px;
							}

							.desc {
								color: #5f5f5f;
								font-size: 14px;
							}

							.u-line-1 {
								display: -webkit-box !important;
								overflow: hidden;
								text-overflow: ellipsis;
								word-break: break-all;
								-webkit-line-clamp: 1;
								-webkit-box-orient: vertical !important;
							}
						}

						image {
							width: 30px;
							margin-left: 20px;
						}

					}
				}
			}
		}
	}
</style>
