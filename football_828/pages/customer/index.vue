<template>
	<view>

		<view class="backTitleBar-wrapper colCent borderBox">
			<view class="fixedBox">
				<view class="common_header" style="height: 44px;background: #1f252f;">
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

		<view class="serviceContainer">
			<view class="item  u-skeleton">
				<view class="list icons">
					<block>
						<image src="../../static/images/kf.png" mode="" class="icon u-skeleton-circle"></image>
					</block>
				</view>
				<view class="list content">
					<text class="title u-skeleton-rect">{{$t('notice.title.text')}}</text>
					<text class="details u-skeleton-rect">{{$t('notice.content.server')}}</text>
				</view>
				<view class="list dialogue">
					<button type="default" class="dialogBtn u-skeleton-fillet"
						@click="goToCustomer">{{$t('notice.content.dialog')}}</button>
				</view>
			</view>
		</view>


		<!--引用组件-->
		<u-skeleton :loading="loading" :animation="true" bgColor="#1f252f"></u-skeleton>
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
				loading: true, // 是否显示骨架屏组件
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

			// 通过延时模拟向后端请求数据，调隐藏骨架屏
			setTimeout(() => {
				this.loading = false;
			}, 1000)

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
		background-color: #171e25;
	}

	.backTitleBar-wrapper {
		.fixedBox {
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;
			background-color: #fff;

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


	.serviceContainer {
		.item {
			// width: 298px;
			// width: 100%;
			background-color: #1f252f;
			display: flex;
			margin: 8px 20px;
			border-radius: 8px;
			justify-content: space-between;
			padding: 8px;


			.content {
				flex: 128px;
				padding: 0 8px;

				.title {
					// display: block;
					font-size: 13px;
					color: #fb0;
				}

				.details {
					font-size: 11px;
					color: #ddd;
					display: block;
					padding-top: 4px;
				}
			}

			.dialogue {
				display: flex;
				align-items: center;

				.dialogBtn {
					font-size: 8px;
					color: #111;
					display: block;
					background: linear-gradient(90deg, #ffe69f, #ffc24a);
				}
			}
		}

		.icons {
			width: 54px;
			height: 54px;
			background: #fff;
			border-radius: 50%;
			vertical-align: middle;
			margin: 12px 0;

			.icon {
				width: 50px;
				height: 50px;
				display: block;
				border-radius: 50%;
				margin: 2px auto 0;
			}
		}
	}
</style>
