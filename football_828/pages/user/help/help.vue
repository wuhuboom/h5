<template>
	<view class="reportManagePage">

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


		<view class="report_container">
			<view class="report_wrap">
				<wrapListCell v-for="(item,index) in dataCenterList" :key="index" :itemCell="item" needOtherStyle
					@click.native="wrapListCell_click(item,index)" :showImgBool="true" />
			</view>
		</view>
	</view>
</template>

<script>
	import wrapListCell from '@/components/wrapListCellView/wrapListCellView.vue'
	export default {
		components: {
			wrapListCell,
		},
		data() {
			return {
				navTitle: this.$t('user.help.center.title.text'),
				dataCenterList: [{
					imageIcon: '../../../static/images/1.svg',
					name: this.$t('user.help.center.recharge.withdraw.text')
				}, {
					imageIcon: '../../../static/images/2.svg',
					name: this.$t('user.help.center.anti.correct.text')
				}, {
					imageIcon: '../../../static/images/6.svg',
					name: this.$t('user.help.center.technical.support.text')
				}, {
					imageIcon: '../../../static/images/4.svg',
					name: this.$t('user.help.center.privacy.solicy.text')
				}, {
					imageIcon: '../../../static/images/5.svg',
					name: this.$t('user.help.center.rule.text')
				}]
			}
		},

		methods: {
			goBackBtnClick() {
				uni.switchTab({
					url: '/pages/user/user',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			wrapListCell_click(item, index) {
				// console.log("index",index);
				if (index === 0) {

				} else if (index === 1) {
					// uni.navigateTo({
					// 	url: '/pages/customer/index',
					// 	success: (res) => {
					// 		// 通过eventChannel向被打开页面传送数据	
					// 		uni.setStorageSync('querySeverCustomUrlFrom', 'help');
					// 		res.eventChannel.emit('severCustomEventClick', {
					// 			from: 'help'
					// 		})
					// 	},
					// 	animationType: 'slide-in-top',
					// 	animationDuration: 200
					// })
				} else if (index === 2) {
					uni.navigateTo({
						url: '/pages/user/help/technical_support',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (index === 3) {
					uni.navigateTo({
						url: '/pages/user/help/privacy_policy',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (index === 4) {
					uni.navigateTo({
						url: '/pages/user/help/user_notice',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #1f252f;
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
</style>
