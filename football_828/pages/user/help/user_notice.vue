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



		<view class="ques_container">
			<view class="ques_item item-boder">
				<view class="que_title">
					<view class="title">
						{{dataAnsTitle1}}
					</view>
				</view>
				<view class="answer">
					<view class="desc_text" v-for="(item,index) in dataList1" :key="index">
						<text class="desc_text_num">{{index + 1}}.</text>
						{{item.content}}
					</view>
				</view>
			</view>
			<view class="ques_item item-boder">
				<view class="que_title">
					<view class="title">
						{{dataAnsTitle2}}
					</view>
				</view>
				<view class="answer">
					<view class="desc_text" v-for="(item,index) in dataList2" :key="index">
						<text class="desc_text_num">{{index + 1}}.</text>
						{{item.content}}
					</view>
				</view>
			</view>
			<view class="ques_item item-boder">
				<view class="que_title">
					<view class="title">
					</view>
				</view>
				<view class="answer">
					<view class="desc_text" v-for="(item,index) in dataList3" :key="index">
						<text class="desc_text_num">{{index + 1}}.</text>
						{{item.content}}
					</view>
				</view>
			</view>
			<view class="ques_item item-boder">
				<view class="que_title">
					<view class="title">
						{{dataAnsTitle4}}
					</view>
				</view>
				<view class="answer">
					<view class="desc_text" v-for="(item,index) in dataList4" :key="index">
						<text class="desc_text_num">{{index + 1}}.</text>
						{{item.content}}
					</view>
				</view>
			</view>
			<view class="ques_item item-boder">
				<view class="que_title">
					<view class="title">
						{{dataAnsTitle5}}
					</view>
				</view>
				<view class="answer">
					<view class="desc_text" v-for="(item,index) in dataList5" :key="index">
						<text class="desc_text_num">{{index + 1}}.</text>
						{{item.content}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navTitle: this.$t('user.help.notice.rule.support.title.text'),
				dataAnsTitle1: this.$t('user.help.notice.rule.support.ques.use.title.text'),
				dataAnsTitle2: this.$t('user.help.notice.rule.support.ques.bet.title.text'),
				dataAnsTitle4: this.$t('user.help.notice.rule.support.ques.disclaimer.title.text'),
				dataAnsTitle5: this.$t('user.help.notice.rule.support.ques.general.title.text'),
				dataList1: [],
				dataList2: [],
				dataList3: [],
				dataList4: [],
				dataList5: [],
			}
		},
		onShow() {


			this.dataList1 = [{
				content: this.$t('user.help.notice.rule.support.ques.use.ans1.text')
			}, {
				content: this.$t('user.help.notice.rule.support.ques.use.ans2.text')
			}]

			this.dataList2 = [{
				content: this.$t('user.help.notice.rule.support.ques.bet.ans1.text')
			}, {
				content: this.$t('user.help.notice.rule.support.ques.bet.ans2.text')
			}]

			this.dataList3 = [{
				content: this.$t('user.help.notice.rule.support.ques.bet.ans11.text')
			}, {
				content: this.$t('user.help.notice.rule.support.ques.bet.ans12.text')
			}]

			this.dataList4 = [{
				content: this.$t('user.help.notice.rule.support.ques.disclaimer.ans1.text')
			}, {
				content: this.$t('user.help.notice.rule.support.ques.disclaimer.ans2.text')
			}, {
				content: this.$t('user.help.notice.rule.support.ques.disclaimer.ans3.text')
			}, {
				content: this.$t('user.help.notice.rule.support.ques.disclaimer.ans4.text')
			}]


			this.dataList5 = [{
				content: this.$t('user.help.notice.rule.support.ques.general.ans1.text')
			}, {
				content: this.$t('user.help.notice.rule.support.ques.general.ans2.text')
			}, {
				content: this.$t('user.help.notice.rule.support.ques.general.ans3.text')
			}, {
				content: this.$t('user.help.notice.rule.support.ques.general.ans4.text')
			}, {
				content: this.$t('user.help.notice.rule.support.ques.general.ans5.text')
			}, {
				content: this.$t('user.help.notice.rule.support.ques.general.ans6.text')
			}, {
				content: this.$t('user.help.notice.rule.support.ques.general.ans7.text')
			}, {
				content: this.$t('user.help.notice.rule.support.ques.general.ans8.text')
			}, {
				content: this.$t('user.help.notice.rule.support.ques.general.ans9.text')
			}, {
				content: this.$t('user.help.notice.rule.support.ques.general.ans10.text')
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

<style lang="scss" scope>
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

	.ques_container {
		padding: 0 17px 30px;
	}

	.ques_item {

		margin: 13px 0;
		border-radius: 8px;
		color: #fff;
	}

	.item-boder {
		background: #1f252f;
		padding: 10px;

	}

	.answer {}

	.desc_text {
		display: flex;
		font-size: 12px;
		color: #fff;
		font-weight: 400;
		margin-top: 5px;
	}

	.desc_text_num {
		color: #fb0;
		margin-right: 3px;

	}

	.desc_text_num span {
		display: block;
		width: 18px;
		text-align: center;
	}

	.privicy4 {
		display: flex;
		justify-content: center;
	}

	.privicy4 .desc_text {
		color: #fb0;
		font-size: 14px;
		text-align: center;
		margin-top: 0;
	}

	.que_title .title {
		display: flex;
		font-size: 14px;
		color: #fb0;
		font-weight: 400;
	}
</style>
