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
		<view class="fixedContent">
			<view class="sortContainer">
				<view class="text">
					{{$t("backapi.self.account.list.sort.swith.text")}}
				</view>
				<switch :checked="checkedSwitch" @change="switch1Change" />
				<view class="result_text" :style="defaultSortNum === 1 ? 'color: #ffba00;' : 'color: #fff;'">
					{{result_text_str}}
				</view>
			</view>
			<view class="inputAndSerchContent">
				<u-input class="inputContent" maxlength="30" v-model="searchUsername" :clearable="false" height="80"
					:custom-style="customStyleInput" :placeholder="placeholderAccount"
					placeholder-style="color:#999;font-size:12px" />
				<u-icon class="iconContent" name="search" color="#fff" @click="searchWhereBtnClick">
				</u-icon>
			</view>

			<view class="bankBox" @click="levelSelectClick">
				<view class="t">
					<text></text>
					<text class="con">
						{{searchStrSelect}}</text>
				</view>
				<u-icon name="arrow-right" color="#fff"></u-icon>
			</view>

		</view>
		<view class="content">

			<view class="accountListContainer">
				<view class="tableBox">
					<mescroll-body ref="mescrollRef" top="0" :topbar="false" bottom="0" :bottombar="true"
						:safearea="false" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">


						<view class="tableBoxBodyTBody" v-for="(item, index) in dataAccountList" :key="item.id">

							<view class="left-data">
								<view class="name">
									<text class="username">{{item.username}}</text>
									<text class="level"
										:style="defaultSortNum === 1 ? 'color:#ffba00' :'color:#fff'">{{defaultSortNum === 1 ? $t('backapi.self.account.list.sort.swith.desc.text') : $t('backapi.self.account.list.sort.swith.asc.text')}}</text>
								</view>
								<text class="date">{{item.theNewLoginTime | timestampStr}}</text>
							</view>
							<!-- <view class="right-data">
								<text class="text">{{$t('user.report.account.list.center.list.head.money.text')}}</text>
								<text class="money">{{item.balance | moneyFormat}}</text>
							</view> -->

						</view>
					</mescroll-body>
				</view>


			</view>

		</view>



		<!-- 弹窗页面 -->
		<u-popup v-model="levelPopBool" mode="bottom" width="315px" border-radius="10">
			<view class="cards-pop">

				<view class="card-list">
					<view class="card" v-for="(item,index) in inputSearchListItemArray" :key="item.id"
						@click="selectLevelClick(item)">
						<view class="left">
							<view class="card-name">
								{{item.nameStr}}
							</view>
						</view>
						<u-icon v-if="currentIndex === item.id" name="checkmark" color="#ffbc00"></u-icon>
					</view>
				</view>
				<view class="" style="width: 100%;height: 30px;">

				</view>
			</view>
		</u-popup>

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

				dataAccountList: [],
				result_text_str: this.$t('backapi.self.account.list.sort.swith.desc.text'),
				currentIndex: 1,
				searchStrSelect: this.$t('backapi.self.statistics.top.content.sub.level1.text'),
				levelPopBool: false,
				inputSearchListItemArray: [{
					nameStr: this.$t('backapi.self.statistics.top.content.sub.level1.text'),
					id: 1,
				}, {
					nameStr: this.$t('backapi.self.statistics.top.content.sub.level2.text'),
					id: 2,
				}, {
					nameStr: this.$t('backapi.self.statistics.top.content.sub.level3.text'),
					id: 3,
				}],
				checkedSwitch: true,
				defaultSortNum: 1, //1默认desc,2asc

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
			levelSelectClick() {
				this.levelPopBool = true
			},
			selectLevelClick(item) {
				this.searchStrSelect = item.nameStr
				this.currentIndex = item.id;
				this.mescroll.scrollTo(0, 300)
				this.levelPopBool = false

				this.dataAccountList = []
				this.mescroll.resetUpScroll();
			},
			switch1Change(e) {
				this.result_text_str = e.detail.value ? this.$t('backapi.self.account.list.sort.swith.desc.text') : this
					.$t(
						'backapi.self.account.list.sort.swith.asc.text')
				this.defaultSortNum = e.detail.value ? 1 : 2

				this.mescroll.scrollTo(0, 300)
				this.levelPopBool = false

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
				reqParam.level = this.currentIndex
				if (this.searchUsername) {
					reqParam.username = this.searchUsername
				}
				reqParam.sort = this.defaultSortNum
				reqParam.pageNo = pageNum
				reqParam.pageSize = pageSize
				let resR = await subPlayersReq(reqParam, this.localLoginToken)
				if (resR.code === 200) {
					this.mescroll.endBySize(resR.data.results.length, resR.data.totalCount)
					//设置列表数据
					if (pageNum == 1) this.dataAccountList = []; //如果是第一页需手动制空列表
					this.dataAccountList = this.dataAccountList.concat(resR.data.results); //追加新数据
				} else if (resR.code === 409) {
					uni.showToast({
						title: this.$t('backapi.self.alert.fast.access.tip.text'),
						icon: 'none',
						duration: 2000,
						success: (res) => {
							//  请求失败,隐藏加载状态
							this.mescroll.endErr()
						}
					});

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

	.fixedContent {
		position: fixed;
		width: 100%;
		padding: 0 20px;
		z-index: 1000;
		// margin-top: 10px;
		background: #1f252f;

		.sortContainer {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			color: #fff;
			margin-top: 10px;
			word-break: break-word;

			.text {
				font-size: 13px;
				margin-right: 10px;
			}

			.result_text {
				color: red;
				font-weight: bold;
			}
		}


		.bankBox {
			height: 40px;
			display: flex;
			flex-direction: row;
			background-color: #171e25;
			justify-content: space-between;
			align-items: center;
			padding: 0 20px;
			border-radius: 4px;
			/* margin: 0 20px; */
			margin-top: 10px;

			.t {
				color: #f8f8f8;

				.con {
					// padding-left: 10px;
					font-size: 14px;
				}
			}
		}


	}





	.tableBox {
		margin-top: 140px;
		padding: 0 10px;
	}

	.inputAndSerchContent {
		display: flex;
		position: relative;
		margin-top: 10px;

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


	/deep/ .u-drawer-bottom {
		background-color: #1f252f;

		.cards-pop {
			padding: 18px 15px 0;

			.pop-title {
				display: flex;
				justify-content: space-between;
				padding-bottom: 25px;
				border-bottom: 0.5px solid #111;

				.title {
					margin: auto;
					text-align: center;

					.title-up {
						font-size: 16px;
						color: #eee;
						font-weight: 700;
					}

					.title-tip {
						color: #ffbc00;
						font-size: 13px;
						padding-top: 5px;
					}
				}
			}

			.card-list {
				font-size: 15px;
				color: #000;

				.card {
					display: flex;
					justify-content: space-between;
					padding: 15px 0 15px 15px;
					border-bottom: 0.5px solid #111;

					.left {
						display: flex;
						justify-content: space-between;

						.card-name {
							color: #ddd;
						}
					}
				}
			}

			.add-card {
				margin-top: 10px;
				font-size: 15px;
				color: #000;
				display: flex;
				justify-content: space-between;
				padding: 15px 0 15px 15px;

				.left {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.add-icon {
						margin-right: 16px;
						width: 18px;
						height: 14px;
					}

					.add-title {
						color: #bbb;
					}
				}
			}
		}


	}
</style>
