<template>
	<view class="">
		<view class="articleContainer">
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
			<view class="detailContent">
				<view class="title_c">
					{{$t('article.no.title.text')}}
				</view>
				<view class="desc_c">
					{{$t('contact.no.time.text')}}
				</view>

				<view class="center_c">
					<h2 style="text-align:center;color:#2ecc71">{{$t('job.desc.title.text')}}</h2>
					<p>&nbsp;</p>
					<p style="text-align:center;margin-top: 15px;">
						<image src="../../static/images/jobdesc.jpg" mode="" style="height:175px; width:350px"></image>
					</p>
					<p>{{$t('job.desc.content.p1.text')}}</p>
					<p>{{$t('job.desc.content.p2.text')}}</p>
					<p>{{$t('job.desc.content.p3.text')}}</p>
					<p>{{$t('job.desc.content.p4.text')}}</p>
					<p></p>
				</view>
			</view>

			<view class="line">

			</view>
		</view>

		<self-tabbar :current-page="111"></self-tabbar>

	</view>
</template>

<script>
	import {
		myMixin
	} from '@/util/mixins.js'
	export default {
		mixins: [myMixin],
		data() {
			return {
				navTitle: this.$t('job.desc.title.text'),
			}
		},
		onShow() {


		},
		mounted() {

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

	.articleContainer {
		// height: 100vh;
		background: #f1f1f1;

		.banner {
			background: linear-gradient(to right, #6dcab8, #3a78cb);
			padding: 30px 0 0;
		}

		.detailContent {
			margin-top: 20px;
			padding: 15px;

			.title_c {
				font-size: 22px;
			}

			.desc_c {
				margin-top: 15px;
				color: #aaa;
			}

			.center_c {
				margin-top: 15px;
				font-size: 14px;
			}
		}

		.line {
			height: 90px;
		}

	}
</style>
