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


		<view class="technical_container">
			<view class="technical_container_item">
				<view class="technical_container_item_title">
					{{technicalDataTitle1}}
				</view>
				<view class="technical_container_item_content" v-for="(item,index) in technicalDataList1" :key="index">
					<text class="technical_container_item_content_index">{{index+1}}.</text>
					<text class="technical_container_item_content_desc">{{item.content}}</text>
				</view>
			</view>

			<view class="technical_container_item">
				<view class="technical_container_item_title">
					{{technicalDataTitle2}}
				</view>
				<view class="technical_container_item_content" v-for="(item,index) in technicalDataList2" :key="index">
					<text class="technical_container_item_content_index">{{index+1}}.</text>
					<text class="technical_container_item_content_desc">{{item.content}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navTitle: this.$t('user.help.tec.support.title.text'),
				technicalDataTitle1: this.$t('user.help.tec.support.ques.hack.text'),
				technicalDataTitle2: this.$t('user.help.tec.support.ques.protect.text'),
				technicalDataList1: [],
				technicalDataList2: [],
			}
		},
		onShow() {


			this.technicalDataList1 = [{
				content: this.$t('user.help.tec.support.ques.ans.down.text')
			}, {
				content: this.$t('user.help.tec.support.ques.ans.user.text')
			}, {
				content: this.$t('user.help.tec.support.ques.ans.protect.text')
			}, {
				content: this.$t('user.help.tec.support.ques.ans.often.text')
			}]


			this.technicalDataList2 = [{
				content: this.$t('user.help.tec.support.ques.protect.ans1.text')
			}, {
				content: this.$t('user.help.tec.support.ques.protect.ans2.text')
			}]

		},
		methods: {
			goBackBtnClick() {
				uni.navigateTo({
					url: '/pages/user/help/help',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},

		}
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


	.technical_container {
		margin: 12px 16px;
	}

	.technical_container_item {
		background-color: #1f252f;
		margin-bottom: 10px;
		padding: 10px 10px;
		border-radius: 5px;
	}

	.technical_container_item_title {
		color: #fb0;
		font-size: 14px;
	}

	.technical_container_item_content {
		display: flex;
	}

	.technical_container_item_content_index {
		color: #fb0;
		font-size: 12px;
		line-height: 30px;
	}


	.technical_container_item_content_desc {
		color: #fff;
		font-size: 12px;
		line-height: 30px;
	}
</style>
