<template>
	<view class="wallet_list">
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
		<view class="scrollView">
			<view class="">
				<mescroll-body ref="mescrollRef" :fixed="false" top="0" :topbar="false" bottom="100" :bottombar="false"
					:safearea="false" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
					:up="upOption">

					<view class="list-item" v-for="(item, index) in dataList" :key="index"
						@click="detailListItem(item)">
						<view class="content-box">
							<view class="source C_FFBC00">
								{{item.typeName}}{{item.changeMoney && item.changeMoney.toString().indexOf('-') === -1 ? '+ ': '-'}}
							</view>
							<view
								:class="item.changeMoney && item.changeMoney.toString().indexOf('-') === -1 ? 'money C_FF0000' : 'money C_2Db9FF' ">
								{{item.changeMoney| moneyFormat | changeMonFormat}}
							</view>
							<view class="time">
								<text class="label">{{$t('user.report.account.change.list.date.text')}}</text>
								<text class="con">{{item.createdAt | timestampStr}}</text>
							</view>
							<view class="tit">
								<text class="label">{{$t('user.report.account.change.list.balance.text')}}</text>
								<text class="con">{{item.dnedMoney | moneyFormat}}</text>
							</view>
							<view class="tit">
								<text class="label">{{$t('user.report.account.change.list.orderno.text')}}</text>
								<text class="con">{{item.orderNo}}</text>
							</view>
						</view>
					</view>

				</mescroll-body>

			</view>
		</view>

		<u-modal v-model="showOrderBool" :title="$t('user.report.account.change.list.tip.text')"
			:confirm-text="$t('modal.confirm.text')" :content-style="contentStyleObj" :confirm-style="confirmStyleObj"
			@confirm="confirmHandle">
			<view class="slot-content">
				{{singleOrderStr}}
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {
		balanceChangeReq,
		playerInfoReq
	} from '../../../api/index.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	import {
		setClipboardData,
		getClipboardData
	} from '@/uni_modules/u-clipboard/js_sdk'
	// import {
	// 	getTimeState,
	// 	formatDateToStr,
	// 	formatDateTimeSolt
	// } from '../../../common/publicTool.js'
	// import {mapState,mapMutations} from 'vuex'
	import MescrollBodyDiy from "@/uni_modules/mescroll-uni/components/mescroll-diy/football/mescroll-body.vue";
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin, myMixin], // 使用mixin
		components: {
			MescrollBodyDiy // 避免与main.js注册的全局组件名称相同,否则注册组件失效(iOS真机 APP HBuilderX2.7.9)
		},
		data() {
			return {
				singleOrderStr: '',
				showOrderBool: false,
				contentStyleObj: {
					'text-align': 'center',
					'padding': '30px 0px',
					'color': '#2db9ff'
				},
				confirmStyleObj: {
					"color": "rgb(255, 255, 255)",
					"margin": "20px 16px",
					"height": "37px",
					"border-radius": "40px",
					"text-align": "center",
					"line-height": "35px",
					"background": "rgb(45, 185, 255)"
				},
				navTitle: this.$t('user.report.account.change.title.text'),
				dataList: [],
				typeList: [],
				currUserName: '',
				mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
				// 下拉刷新的配置(可选, 绝大部分情况无需配置)
				downOption: {
					textInOffset: 'The drop-down refresh',
					textOutOffset: 'Release the update',
					textLoading: 'Loading',
					textSuccess: 'Load the success',
					textErr: 'Load failed',
				},
				// 上拉加载的配置(可选, 绝大部分情况无需配置)
				upOption: {
					page: {
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					toTop: {
						src: null,
						offset: 1000,
						duration: 300,
						zIndex: 9990,
						right: 60,
						bottom: 180,
						safearea: false,
						width: 72,
						radius: "50%",
						left: null
					},
					empty: {
						use: true,
						icon: "../../../static/images/empty-data2.png",
						tip: 'Absolutely empty',
						btnText: "",
						fixed: false,
						top: "100rpx",
						zIndex: 99
					},
					textLoading: 'Loading',
					textNoMore: '-- End --'
				}
			}
		},
		filters: {
			changeMonFormat(value) {
				// console.log("value",value);
				if (value) {
					let currDataV = value.toString()
					if (currDataV.indexOf('-') === -1) {
						return "+" + value
					} else {
						return value
					}
				}
			},
			realType(value, that) {
				let currMethodName = ""
				// console.log("value",value,);
				if (value) {
					that.typeList.find((item, index) => {
						if (item.method === value) {
							currMethodName = item.name
						}
					})
				}
				return currMethodName
			}
		},
		onShow() {

			// this.localLoginToken = this.$store.state.userInfo.token
			// this.localLoginToken = uni.getStorageSync('footballToken');
			// 初始化语言
			this.initLang()

			// 获取个人信息
			this.getInfoPerson()
		},
		methods: {
			initLang() { //初始化语言


				let langStr = uni.getStorageSync('ft_lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr

				this.navTitle = this.$t('user.report.account.change.title.text')
				this.typeList = [{
					name: this.$t('user.report.account.change.query.type.all.title.text'),
					narnoid: 1,
					method: 0,
					value: -101,
				}, {
					name: this.$t('user.report.account.change.query.type.expenditure.online.cancel.text'),
					narnoid: 2,
					method: 2,
					value: 10,
				}, {
					name: this.$t('user.report.account.change.query.type.expenditure.manual.reduction.text'),
					narnoid: 3,
					method: 2,
					value: 8,
				}, {
					name: this.$t('user.report.account.change.query.type.expenditure.withdraw.deduction.text'),
					narnoid: 4,
					method: 2,
					value: 2,
				}, {
					name: this.$t('user.report.account.change.query.type.expenditure.bet.text'),
					narnoid: 5,
					method: 2,
					value: 3,
				}, {
					name: this.$t('user.report.account.change.query.type.expenditure.rebate.deduction.text'),
					narnoid: 6,
					method: 2,
					value: 9,
				}, 
				// {
				// 	name: this.$t('user.report.account.change.query.type.expenditure.send.envelope.text'),
				// 	narnoid: 7,
				// 	method: 2
				// },
				{
					name: this.$t('user.report.account.change.query.type.expenditure.send.reward.text'),
					narnoid: 8,
					method: 2
				}, {
					name: this.$t('user.report.account.change.query.type.income.online.recharge.text'),
					method: 1,
					value: 1,
				}, {
					name: this.$t('user.report.account.change.query.type.income.offline.recharge.text'),
					narnoid: 9,
					method: 1,
					value: 11,
				}, {
					name: this.$t('user.report.account.change.query.type.income.manually.add.money.text'),
					narnoid: 10,
					method: 1,
					value: 6,
				}, {
					name: this.$t('user.report.account.change.query.type.income.withdraw.return.text'),
					narnoid: 11,
					method: 1,
					value: 12,
				}, {
					name: this.$t('user.report.account.change.query.type.income.bets.return.text'),
					narnoid: 12,
					method: 1,
					value: 13,
				}, {
					name: this.$t('user.report.account.change.query.type.income.bet.cancel.text'),
					narnoid: 13,
					method: 1,
					value: 7,
				}, {
					name: this.$t('user.report.account.change.query.type.income.bet.rebate.text'),
					narnoid: 14,
					method: 1,
					value: 4,
				}, {
					name: this.$t('user.report.account.change.query.type.income.bet.back.text'),
					narnoid: 15,
					method: 1,
					value: 14,
				},
				// {
				// 	name: this.$t('user.report.account.change.query.type.income.receive.envelops.text'),
				// 	narnoid: 16,
				// 	method: 1
				// }, 
				{
					name: this.$t('user.report.account.change.query.type.income.receive.rewards.text'),
					narnoid: 17,
					method: 1
				}, {
					name: this.$t('user.report.account.change.query.type.income.register.gift.text'),
					narnoid: 18,
					method: 1,
					value: 15,
				}, {
					name: this.$t('user.report.account.change.query.type.income.share.gift.text'),
					narnoid: 19,
					method: 1,
					value: 16,
				}, {
					name: this.$t('user.report.account.change.query.type.income.vip.cash.text'),
					narnoid: 20,
					method: 1,
					value: 17,
				}, {
					name: this.$t('user.report.account.change.query.type.income.activity.cash.text'),
					narnoid: 21,
					method: 1,
					value: 18,
				}, {
					name: this.$t('user.report.account.change.query.type.income.recharge.gift.text'),
					narnoid: 22,
					method: 1,
					value: 19,
				}, {
					name: this.$t('match.order.detail.proce.fee.text'),
					narnoid: 24,
					method: 1,
					value: 20,
				}, {
					name: this.$t('user.report.account.change.query.type.income.lower.level.rebate.text'),
					narnoid: 23,
					method: 1,
					value: 5,
				}, {
					name: this.$t('user.report.account.change.query.type.income.lower.level.recharge.rebate.text'),
					narnoid: 25,
					method: 1,
					value: 21,
				}, {
					name: this.$t('user.report.account.change.query.type.income.lower.level.bet.rebate.text'),
					narnoid: 26,
					method: 1,
					value: 22,
				}, {
					name: this.$t('user.report.account.change.query.type.income.invite.rewards.text'),
					narnoid: 27,
					method: 1,
					value: 23,
				}, {
					name: this.$t('user.report.account.change.query.type.income.first.charge.text'),
					narnoid: 28,
					method: 1,
					value: 24,
				}, {
					name: this.$t('user.report.account.change.query.type.income.active.profit.text'),
					narnoid: 29,
					method: 1,
					value: 25,
				}, {
					name: this.$t('user.report.account.change.query.type.income.sufficient.reward.text'),
					narnoid: 30,
					method: 1,
					value: 26,
				}, {
					name: this.$t('user.report.account.change.query.type.income.fixed.day.text'),
					narnoid: 31,
					method: 1,
					value: 27,
				}, {
					name: this.$t('user.report.account.change.query.type.invite.first.charge.text'),
					narnoid: 32,
					method: 1,
					value: 28,
				}]


			},
			async getInfoPerson() {
				let resR = await playerInfoReq(this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {
					this.currUserName = resR.data.username
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
			goBackBtnClick() {
				uni.switchTab({
					url: '/pages/funList/index',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},

			realTypeName(realTypeName) {
				// console.log("realTypeName", realTypeName);
				let tempArray = this.typeList.find(itemT => {
					if (itemT.value === realTypeName) {
						return itemT
					}
				})
				// console.log("tempArray", tempArray);
				if (!tempArray) {

					return ""
				}
				return tempArray.name
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
				this.getAccountChangeData(pageNum, pageSize)
			},
			/*若希望重新加载列表,只需调用此方法即可(内部会自动page.num=1,再主动触发up.callback)*/
			reloadList() {
				this.mescroll.resetUpScroll();
			},
			async getAccountChangeData(pageNum, pageSize) {
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
				// let valueNum = item.value

				let reqParam = {}
				reqParam.pageNo = pageNum
				reqParam.pageSize = pageSize
				let resR = await balanceChangeReq(reqParam, this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {
					let resultsArr = resR.data.results
					let resultsArrNew = []
					let balanceChangeType
					resultsArr.forEach((item, index) => {
						balanceChangeType = this.realTypeName(item.balanceChangeType)
						resultsArrNew.push({
							...item,
							typeName: balanceChangeType
						})
					})

					this.mescroll.endBySize(resR.data.results.length, resR.data.totalCount)
					//设置列表数据
					if (pageNum == 1) this.dataList = []; //如果是第一页需手动制空列表
					this.dataList = this.dataList.concat(resultsArrNew); //追加新数据
				} else if (resR.code === 409) {
					this.mescroll.endBySize(0, 0)
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
			detailListItem(item) {
				this.showOrderBool = true
				this.singleOrderStr = item.orderNo
			},
			confirmHandle() {
				setClipboardData(this.singleOrderStr).then(() => {
					uni.showToast({
						icon: 'none',
						title: this.$t('user.refer.share.copy.success.text')
					});
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #171e25;
	}

	.wallet_list {
		background: #171e25;
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

	// 导航栏样式结束


	.scrollView {
		padding: 0 10px 10px;
		flex: 1;
		// overflow-x: hidden;
		// overflow-y: auto;
		position: relative;
		// padding-bottom: 58px;
		// height: calc(100vh - 165px);
		height: 100%;
	}

	.list-item {
		padding: 13px;
		background: #1f252f;
		border-radius: 10px;
		margin-top: 6px;
	}

	.content-box {
		position: relative;
		color: #f8f8f8;

		.source {
			font-size: 14px;
			font-weight: 700;
		}

		.C_2Db9FF {
			color: #01b14b;
		}

		.C_FF0000 {
			color: #FF525D;
		}

		.money {
			position: absolute;
			top: 4px;
			right: 0;
			font-size: 14px;
			font-weight: 700;
		}

		.time {
			font-size: 14px;
			margin-top: 12px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			.label {
				color: #7f8aa1;
			}
		}

		.tit {
			font-size: 14px;
			margin-top: 10px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			.label {
				color: #7f8aa1;
			}
		}
	}

	.C_FFBC00 {
		color: #ffbc00;
	}
</style>
