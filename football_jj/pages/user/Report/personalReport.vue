<template>
	<view class="personalReportPage">


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

		<view class="content">
			<view class="tab">
				<text :class="selectCurrent === index ? 'text active':'text'" v-for="(item,index) in tabList"
					:key="index" @click="tabChange(item,index)">
					{{item.name}}</text>
			</view>
			<!-- 	<view class="line">

			</view> -->
			<view class="bet-data-item">
				<view class="order-info">
					<mescroll-body ref="mescrollRef" :fixed="true" height="900" top="0" :topbar="false" bottom="0"
						:bottombar="true" :safearea="false" @init="mescrollInit" @down="downCallback" @up="upCallback"
						:down="downOption" :up="upOption">
						<view class="con-item" v-for="(item,index) in dataList" :key="index">
							<!-- <view class="bet-title">
								{{$t('user.person.report.center.detail.data.title.text')}}-{{currUser}}
							</view> -->
							<view class="bet-detail">
								<view class="label">
									{{$t('user.person.report.center.list.head.date.text')}}
								</view>
								<view class="content">
									{{item.date}}
								</view>
							</view>
							<view class="bet-detail">
								<view class="label">
									{{$t('user.person.report.center.list.head.recharge.text')}}

								</view>
								<view class="content">
									{{item.recharge | moneyFormat}}
								</view>
							</view>
							<view class="bet-detail">
								<view class="label">
									{{$t('user.person.report.center.list.head.withdraw.text')}}
								</view>
								<view class="content">
									{{Math.abs(item.withdrawal) | moneyFormat}}
								</view>
							</view>
							<view class="bet-detail">
								<view class="label">
									{{$t('user.person.report.center.detail.data.game.bet.text')}}
								</view>
								<view class="content">
									{{Math.abs(item.bet) | moneyFormat }}
								</view>
							</view>
							<view class="bet-detail">
								<view class="label">
									{{$t('user.person.report.center.detail.data.game.win.text')}}
								</view>
								<view class="content">
									{{item.bingo | moneyFormat}}
								</view>
							</view>
							<view class="bet-detail">
								<view class="label">
									{{$t('user.person.report.center.detail.data.agent.rebate.text')}}
								</view>
								<view class="content">
									{{item.rebate | moneyFormat}}
								</view>
							</view>
							<view class="bet-detail">
								<view class="label">
									{{$t('user.person.report.center.detail.data.activity.text')}}
								</view>
								<view class="content">
									{{item.activity | moneyFormat}}
								</view>
							</view>
						</view>
					</mescroll-body>
				</view>
			</view>
		</view>




	</view>
</template>

<script>
	import {
		reportFormReq,
		playerInfoReq
	} from '@/api/index.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	import MescrollBodyDiy from "@/uni_modules/mescroll-uni/components/mescroll-diy/football/mescroll-body.vue";
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin, myMixin], // 使用mixin
		components: {
			MescrollBodyDiy // 避免与main.js注册的全局组件名称相同,否则注册组件失效(iOS真机 APP HBuilderX2.7.9)
		},
		data() {
			return {
				navTitle: this.$t('user.person.report.center.title.text'),
				current: 0,
				tabList: [{
					name: this.$t('user.person.report.center.nearly7.text'),
				}, {
					name: this.$t('user.person.report.center.nearly10.text'),
				}, {
					name: this.$t('user.person.report.center.nearly30.text'),
				}],
				selectCurrent: 0,
				customStyleInput: {
					"border-radius": "5px",
					"background-color": "#334756",
					"text-indent": "10px",
					"color": "#fff"
				},
				placeholderAccount: this.$t('user.person.report.center.data.query.account.text'),
				searchUsername: '',
				detailMaskBool: false,
				dataList: [],
				currUser: '',

				mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
				// 下拉刷新的配置(可选, 绝大部分情况无需配置)
				downOption: {

				},
				// 上拉加载的配置(可选, 绝大部分情况无需配置)
				upOption: {
					page: {
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						icon: "../../../static/images/nodata.png",
						tip: 'Absolutely empty'
					},
					textLoading: 'Loading',
					textNoMore: '-- End --'
				}
			}
		},
		onShow() {
			this.getInfoData()
		},
		methods: {
			goBackBtnClick() {
				uni.navigateTo({
					url: '/pages/user/statistics',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			async getInfoData() {
				let resR = await playerInfoReq(this.localLoginToken)
				if (resR.code === 200) {
					// console.log("resR",resR);
					this.currUser = resR.data.username
				}
			},
			tabChange(item, index) {
				this.selectCurrent = index;
				this.dataList = []
				this.mescroll.resetUpScroll();
			},
			/*mescroll组件初始化的回调,可获取到mescroll对象 (此处可删,mixins已默认)*/
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},

			/*下拉刷新的回调, 重置列表为第一页 (此处可删,mixins已默认)*/
			downCallback() {
				this.dataList = []
				this.mescroll.resetUpScroll();
			},
			/*上拉加载的回调*/
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				// console.log("pageNum",pageNum);
				// console.log("pageSize",pageSize);
				this.getPersonReportData(pageNum, pageSize)
			},
			/*若希望重新加载列表,只需调用此方法即可(内部会自动page.num=1,再主动触发up.callback)*/
			reloadList() {
				this.mescroll.resetUpScroll();
			},
			async getPersonReportData(pageNum, pageSize) {
				// 动态更新全局配置
				uni.$emit("setMescrollGlobalOption", {
					down: {
						textInOffset: this.$t('alert.textInOffset'),
						textOutOffset: this.$t('alert.textOutOffset'),
						textLoading: this.$t('alert.loading'),
						textSuccess: this.$t('alert.textSuccess'),
						textErr: this.$t('alert.textErr'),
					},
					up: {
						empty: {
							tip: this.$t('alert.absolutely.empty')
						},
						textNoMore: this.$t('alert.nomore'),
						textLoading: this.$t('alert.loading')
					},
				})
				let reqParam = {}
				if (this.searchUsername) {
					reqParam.username = this.searchUsername
				}

				reqParam.time = this.selectCurrent + 3
				// reqParam.pageNo = pageNum
				// reqParam.pageSize = pageSize
				let resR = await reportFormReq(reqParam, this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {
					this.mescroll.endBySize(resR.data.length, 0)
					//设置列表数据
					if (pageNum == 1) this.dataList = []; //如果是第一页需手动制空列表
					this.dataList = this.dataList.concat(resR.data); //追加新数据
				} else if (resR.code === 402 || resR.code === 403) {
					this.logout()
					uni.showToast({
						title: resR.msg,
						icon: 'none',
						duration: 2000,
						success: (res) => {
							uni.reLaunch({
								url: '/pages/login/login'
							})
						}
					});
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f8f8f8;
		height: 100%;
		position: relative;
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


	.content {
		margin-top: 10px;
	}

	.tab {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 100%;
		height: 41px;
		background-color: #fff;
		box-shadow: 0px 1px 2px #fff;

		.text {
			color: #a5a9b2;
			font-size: 14px;
			border-bottom: 1px solid hsla(0, 0%, 100%, 0);
			line-height: 41px;
		}

		.active {
			font-size: 16px;
			font-weight: 600;
			padding-bottom: 5px;
			color: #507ef6;
			border-bottom: 2px solid #507ef6;
		}
	}

	.line {
		width: 100%;
		background-color: #171e25;
		height: 10px;
	}

	.bet-data-item {
		// background-color: #161d24;
		width: 100%;
		// border-top-left-radius: 15px;
		// border-top-right-radius: 15px;
		position: relative;
		z-index: 99;
		padding-bottom: 15px;

		.order-info {
			// padding: 0 17px;

			.con-item {
				margin-top: 10px;
				background: #fff;
				// background: url(../../../static/images/item-bg.png);
				background-size: cover;
				// border-radius: 10px;
				// border-top-left-radius: 12px;
				overflow: hidden;
				/* z-index: 100; */
				color: #333;

				.bet-title {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					height: 34px;
					padding: 0 15px;
				}

				.bet-detail {
					height: 42px;
					padding: 0 20px;
					border-radius: 2px;
					color: #333;
					font-weight: 500;
					font-size: 12px;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}
		}


	}
</style>
