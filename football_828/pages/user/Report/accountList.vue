<template>
	<view class="accountReportPage">

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

		<view class="content">
			<view class="accountListContainer">
				<view class="inputAndSerchContent">
					<u-input class="inputContent" maxlength="30" v-model="searchUsername" :clearable="false" height="80"
						:custom-style="customStyleInput" :placeholder="placeholderAccount"
						placeholder-style="color:#999;font-size:12px" />
					<u-icon class="iconContent" name="search" color="#fff" @click="searchWhereBtnClick">
					</u-icon>
				</view>
				<view class="tableBox">
					<mescroll-body ref="mescrollRef" top="0" :topbar="false" bottom="0" :bottombar="true"
						:safearea="false" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">


						<view class="tableBoxBodyTBody" v-for="(item, index) in dataAccountList" :key="item.id">

							<view class="left-data">
								<view class="name">
									<text class="username">{{item.username}}</text>
									<text class="level"
										:style="item.status === 1 ? 'color:#ffba00' :'color:#fff'">{{item.status === 1 ? $t('user.report.account.list.center.list.data.status.text') : $t('user.report.account.list.center.list.data.unable.text')}}</text>
								</view>
								<text class="date">{{item.theNewLoginTime | timestampStr}}</text>
							</view>
							<view class="right-data">
								<text class="text">{{$t('user.report.account.list.center.list.head.money.text')}}</text>
								<text class="money">{{item.balance | moneyFormat}}</text>
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
		subPlayersReq
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
				navTitle: this.$t('user.report.account.list.center.title.text'),
				searchUsername: '',
				customStyleInput: {
					"border-radius": "5px",
					"background-color": "#171e25",
					"text-indent": "10px",
					"color": "#fff"
				},
				placeholderAccount: this.$t('user.report.account.list.center.search.where.input.account.text'),
				initSearchInputText: this.$t('user.report.account.list.center.search.where.all.text'),
				inputSearchListItemArray: [{
					nameStr: this.$t('user.report.account.list.center.search.where.all.text'),
				}, {
					nameStr: this.$t('user.report.account.list.center.search.where.fbd.text'),
				}, {
					nameStr: this.$t('user.report.account.list.center.search.where.query.text'),
				}],
				showListBool: false,
				arrowClass: 'iconfont icon-arrow-down rightArrow',
				arrowClassActive: 'iconfont icon-arrow-down rightArrow rightArrowActive',
				currentIndex: 0,
				dataAccountList: [],

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
						icon: "../../../static/images/noData-c.svg",
						tip: 'Absolutely empty'
					},
					textLoading: 'Loading',
					textNoMore: '-- End --'
				}
			}
		},
		methods: {
			goBackBtnClick() {
				uni.navigateTo({
					url: '/pages/user/statistics',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			searchWhereBtnClick() {
				// this.pageNo = 1
				// this.pageSize = 10
				this.dataAccountList = []
				this.mescroll.resetUpScroll();
			},
			/*下拉刷新的回调, 重置列表为第一页 (此处可删,mixins已默认)*/
			downCallback() {
				this.dataAccountList = []
				this.mescroll.resetUpScroll();
			},
			/*上拉加载的回调*/
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				// console.log("pageNum",pageNum);
				// console.log("pageSize",pageSize);
				this.getAccountListData(pageNum, pageSize)
			},
			/*若希望重新加载列表,只需调用此方法即可(内部会自动page.num=1,再主动触发up.callback)*/
			reloadList() {
				this.mescroll.resetUpScroll();
			},
			async getAccountListData(pageNum, pageSize) {
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
				reqParam.time = this.currentIndex + 1
				if (this.searchUsername) {
					reqParam.username = this.searchUsername
				}
				reqParam.pageNo = pageNum
				reqParam.pageSize = pageSize
				let resR = await subPlayersReq(reqParam, this.localLoginToken)
				if (resR.code === 200) {
					this.mescroll.endBySize(resR.data.results.length, resR.data.totalCount)
					//设置列表数据
					if (pageNum == 1) this.dataAccountList = []; //如果是第一页需手动制空列表
					this.dataAccountList = this.dataAccountList.concat(resR.data.results); //追加新数据
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #171e25;
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

	.content {
		margin-top: 6px;
	}

	.accountListContainer {
		background-color: #1f252f;

		padding: 15px;
	}

	.inputAndSerchContent {
		display: flex;
		position: relative;

		.iconContent {
			position: absolute;
			right: 10px;
			/* z-index: 0; */
			bottom: 10px;
			top: 10px;
		}
	}

	.tableBoxBodyTBody {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 15px 0;
		border-bottom: 0.5px solid #202b3f;
		position: relative;

		.left-data {
			display: flex;
			flex-direction: column;

			.name {
				.username {
					font-size: 14px;
					color: #f8f8f8;
					font-weight: 600;
				}

				.level {
					background-color: #353d4c;
					color: #ffba00;
					line-height: 25px;
					padding: 2px 15px;
					margin-left: 10px;
					font-size: 13px;
					border-radius: 25px;
				}
			}

			.date {
				color: #7f8aa7;
				font-size: 13px;
				padding-top: 6px;
			}
		}

		.right-data {
			display: flex;
			flex-direction: column;
			text-align: right;
			// padding-right: 25px;

			.text {
				font-size: 14px;
				color: #f8f8f8;
				font-weight: 600;
			}

			.money {
				padding-top: 10px;
				color: #ffba00;
			}
		}
	}
</style>
