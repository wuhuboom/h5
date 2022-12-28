<template>
	<view class="noticeDetailPage">
		<view class="backTitleBar-wrapper colCent borderBox">
			<view class="fixedBox">
				<view class="common_header" style="height: 44px;">
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
			<view class="placeBox">
				<view class="topbarbox">

				</view>
				<view class="placeemptbox" style="height: 45px;">

				</view>
			</view>

		</view>

		<view class="notice-detail">
			<view class="item-background">
				<view class="item">
					<image src="../../static/images/notice.png" mode=""></image>
					<view class="item-title">
						<view class="cell-title">
							{{detailTitle}}
						</view>
						<view class="cell-text-right">
							{{detailTime | timestampStr}}
						</view>
					</view>
				</view>
				<view class="cell-content">
					<rich-text :nodes="detailTiDesc">
					</rich-text>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	// import {
	// 	getTimeState,
	// 	formatDateToStr,
	// 	formatDateTimeSolt
	// } from '../../common/publicTool.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	export default {
		data() {
			return {
				navTitle: 'Platform Announcement',
				detailTitle: "",
				detailTime: "",
				detailTiDesc: "",
			}
		},
		mixins: [myMixin],
		// filters:{
		// 	timestampStr(value){
		// 		// console.log("val",formatDateToStr(value));
		// 		return formatDateTimeSolt(value,1)
		// 	}
		// },

		onShow() {

			this.navTitle = this.$t('notice.list.platform')
			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('noticeClick', (data) => {
				// console.log(data)
				this.detailTitle = data.content.title
				this.detailTime = data.content.createdAt
				this.detailTiDesc = data.content.content

			})


		},
		methods: {
			goBackBtnClick() {
				uni.navigateTo({
					url: '/pages/list/notice_list'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f8f8f8;
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

	.notice-detail {
		margin-top: 10px;
		/* padding: 10px 0; */
		background: #fff;
		height: calc(100vh - 44px);
	}

	.item-background {
		background: #fff;
		// border-radius: 10px;
	}

	.item {
		width: 100%;
		// border-bottom: 0.5px solid #333f52;
		padding: 5px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		padding: 0 20px;

		image {
			width: 32px;
			height: 32px;
		}

		.item-title {
			padding: 10px 15px;

			.cell-title {
				font-size: 15px;
				font-weight: 700;
				color: #333;
				line-height: 13px;
			}

			.cell-text-right {
				font-weight: 700;
				color: #7f8aa1;
				font-size: 14px;
				font-family: Hiragino Sans GB;
				font-weight: 400;
				margin-top: 10px;
			}
		}


	}

	.cell-content {
		font-size: 14px;
		padding: 15px 20px 25px 20px;
		font-family: Hiragino Sans GB;
		font-weight: 400;
		color: #424654;
		word-wrap: break-word;
		letter-spacing: 1px;
		line-height: 2;
	}
</style>
