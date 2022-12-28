<template>
	<view>
		<uni-nav-bar left-icon="left" backgroundColor="#00111C" color="#fff" :title="navTitle" :statusBar="true"
			:border="false" @clickLeft="goBackBtnClick" style="font-weight: 600;" />

		<view class="customerContainer" @click="goToCustomer">
			<!-- <ul>
				
			</ul> -->
			<view class="">
				<view class="customerContainerContent">
					<view class="customerView">
						<view class="customerImageText">
							<image src="../../static/images/cus1.png" mode=""></image>
						</view>
						<view class="customerText">
							<view class="customerImageTextServer">
								{{$t('notice.content.server')}}
							</view>
							<view class="customerImageDialog">
								{{$t('notice.content.dialog')}}
							</view>
						</view>
					</view>

				</view>
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
			this.navTitle = this.$t('notice.title.text')

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
				this.defaultServerAdd = resR.data.serviceAddr
			},
			goBackBtnClick() {

				const querySeverCustomUrlFrom = uni.getStorageSync('querySeverCustomUrlFrom') || 'other'
				if (!this.matchContent_Bool) {
					this.urlFromStr = querySeverCustomUrlFrom
				}

				if (this.urlFromStr === "home") {
					uni.switchTab({
						url: '/pages/home/index',
						animationType: 'pop-in',
						animationDuration: 200
					})
				} else if (this.urlFromStr === "help") {
					uni.navigateTo({
						url: '/pages/user/help/help',
						animationType: 'pop-in',
						animationDuration: 200
					})
				}


			},
			goToCustomer() {
				window.location.href = this.defaultServerAdd
			},
		},

	}
</script>

<style>
	page {
		background-color: #071a28;
	}

	.customerContainerContent {

		height: 95px;
		margin: 8px 17px;
		color: #fff;
		padding: 0 9px;
		border-radius: 4px;
		background-color: #132736;
		margin-top: 44px;
	}

	.customerView {
		display: flex;
		position: relative;
		border-radius: 10px;
	}

	.customerImageText {
		width: 107px;
		margin-right: 11px;
	}

	.customerImageText image {
		/* width: 107px;
		height: 127px;
		vertical-align: middle;
		position: absolute;
		top: -20px; */

		width: 80px;
		height: 94px;
		vertical-align: middle;
		position: absolute;
		/* bottom: 8px; */
		top: 1px;
		left: -7px
	}

	.customerText {
		padding: 28px 0;
		margin-left: 20px;
		font-size: 14px;
		font-family: Helvetica Neue, Helvetica, sans-serif;
	}

	.customerImageTextServer {}

	.customerImageDialog {
		width: 87px;
		color: #3d8dfe;
		margin: 5px 0;
		text-align: left;
		white-space: nowrap;
	}
</style>
