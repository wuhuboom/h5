<template>
	<view class="">
		<view class="orderPage">
			<view class="backTitleBar-wrapper colCent borderBox">
				<view class="fixedBox">
					<view class="common_header" style="height: 44px;">
						<view class="define">
							<!-- @click="goBackBtnClick" -->
							<view class="define_left_slot">
								<view class="">
									<!-- <u-icon name="arrow-left" size="32"></u-icon> -->
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
					<text :class="taskListState === item.idkey ? 'text active':'text'" v-for="(item,index) in tabList"
						:key="index" @click="tabChange(item,index)">
						{{item.name}}</text>
				</view>

			</view>
			<view class="" style="margin-top: 55px;">
				<view class="order" v-if="listData.length !== 0" v-for="(item,index) in listData" :key="item.ID"
					@click="orderDetailClick(item,index)">
					<view class="orderTop">
						<view class="orderTopOne">
							{{item.showTimeStr}}
						</view>
						<view class="orderTopOne">
							<span
								:style="taskListState === 5 ?'color: #3874f6;':'color: #999;'">{{item.showStatusStr}}</span>
						</view>
					</view>
					<view class="orderCon">
						<view class="orderConL">
							<image :src="item.GoodsImgUrl" mode=""></image>
						</view>
						<view class="orderConR">
							<view class="item">
								{{item.GoodsName}}
							</view>
							<view class="item">
								<text>{{$t('task.item.content.price.text')}}</text>
								<text class="marl20">{{symbolStr}}{{item.OrderMoney}}</text>
							</view>
							<view class="item">
								<text>{{$t('task.item.content.commission.rate.text')}}</text>
								<text class="marl20">{{item.CommissionRate | commissionStr}}</text>
							</view>
							<view class="item">
								<text>{{$t('task.item.content.expected.commission.text')}}</text>
								<text class="marl20">{{item.yugufree}}</text>
							</view>
						</view>

					</view>
					<view class="orderBot" v-if="item.Status === 5 || item.Status === 2">
						<view class="orderBotL">
							<view class="title" v-if="item.Status === 5">
								{{$t('task.tab.title3.text')}}
							</view>
							<view class="time">
								<u-count-down :timestamp="item.timestamp" :show-hours="true" bg-color="#333"
									color="#fff" separator-color="#fff" @end="endEvent(item)">
								</u-count-down>

							</view>
						</view>
						<view class="orderBotR" v-if="item.Status === 6">
							{{$t('task.item.content.complaints.text')}}
						</view>
					</view>
				</view>

			</view>
			<view class="" v-if="listData.length === 0">
				<view class="empty" style="height: 300px;">
					<image src="../../static/images/emp.png" mode="" class="emp" style="height: 320px;"></image>
				</view>
				<view class="goon">
					<view class="btn" @click="getTaskBtnClick">
						{{$t('task.item.content.get.order.text')}}
					</view>
				</view>
			</view>

			<view class="line">

			</view>
		</view>
		<self-tabbar :current-page="3"></self-tabbar>


	</view>

</template>

<script>
	import {
		websiteUrlStr,
		getTaskOrderReq
	} from '@/api/index.js'
	import {
		myMixin,
		taskListMixin
	} from '@/util/mixins.js'
	import {
		timestampTen,
		formatSoltDateTime
	} from '@/common/publicTool.js'
	import MescrollBodyDiy from "@/uni_modules/mescroll-uni/components/mescroll-diy/football/mescroll-body.vue";
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin, myMixin, taskListMixin], // 使用mixin
		components: {
			MescrollBodyDiy // 避免与main.js注册的全局组件名称相同,否则注册组件失效(iOS真机 APP HBuilderX2.7.9)
		},
		data() {
			return {
				currStatus: 2,
				selectCurrent: 2,
				navTitle: this.$t('tabar.task'),
				tabList: [{
					idkey: 2,
					name: this.$t('task.tab.title1.text'),
				}, {
					idkey: 3,
					name: this.$t('task.tab.title2.text'),
				}, {
					idkey: 5,
					name: this.$t('task.tab.title3.text'),
				}, {
					idkey: 6,
					name: this.$t('task.tab.title4.text'),
				}],
				listData: [],
			}
		},
		filters: {
			commissionStr(value) {
				// console.log("value", value, typeof value);
				if (value) {
					return (value * 100) + "%"
				} else {
					return value
				}
			}
		},
		onShow() {

			this.initLang()

			this.getTaskListData()
			// console.log("taskListState", this.taskListState);
		},
		// activated() {
		// 	this.getTaskListData()
		// },
		methods: {
			initLang() { //初始化语言
				let langStr = uni.getStorageSync('merailb_lang')
				let langUpperStr = langStr.toUpperCase()
				// console.log("lang",langStr);
				this.$i18n.locale = langStr
				this.tabList = [{
					idkey: 2,
					name: this.$t('task.tab.title1.text'),
				}, {
					idkey: 3,
					name: this.$t('task.tab.title2.text'),
				}, {
					idkey: 5,
					name: this.$t('task.tab.title3.text'),
				}, {
					idkey: 6,
					name: this.$t('task.tab.title4.text'),
				}]
			},
			goBackBtnClick() {
				uni.navigateTo({
					url: '/pages/user/statistics',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			async getTaskListData() {
				let reqParam = {}
				reqParam.status = this.taskListState
				let resR = await getTaskOrderReq(reqParam, this.localLoginToken)
				if (resR.code === 2000) {
					// console.log("resR", resR);
					let resNew = resR.result
					resNew.forEach((item, index) => {
						item.DialogImgUrl = websiteUrlStr + "/" + item.DialogImage
						item.GoodsImgUrl = websiteUrlStr + "/" + item.GoodsImageUrl
						if (item.CommissionMoney) {
							item.yugufree = item.CommissionMoney
						} else if (item.CommissionRate) {
							let comStr = (item.OrderMoney * item.CommissionRate).toString()
							// console.log("comStr", comStr.split('.'));
							let buildStr = comStr.split('.')
							if (buildStr.length === 2) {
								let comArr = buildStr[1].substring(0, 2)
								let newStr = buildStr[0] + "." + comArr
								item.yugufree = newStr
							}
						}
						if (item.Status === 2) { //订单超时
							item.timestamp = item.GetAt - timestampTen()
						} else { //订单结算
							item.timestamp = item.ClearAt - timestampTen()
						}

						item.showTimeStr = formatSoltDateTime(item.Created, 1000)
						if (item.Status === 2) {
							item.showStatusStr = this.$t('task.tab.title1.text')
						} else if (item.Status === 3) {
							item.showStatusStr = this.$t('task.tab.title2.text')
						} else if (item.Status === 5) {
							item.showStatusStr = this.$t('task.tab.title3.text')
						} else if (item.Status === 6) {
							item.showStatusStr = this.$t('task.tab.title4.text')
						}
					})

					// console.log("resNew", resNew);
					this.listData = resNew
				}
			},
			endEvent(item) {
				if (item.Status === 5) {
					uni.switchTab({
						url: "/pages/get/index"
					})
				}
			},
			getTaskBtnClick() {
				uni.switchTab({
					url: "/pages/get/index"
				})
			},
			tabChange(item, index) {
				this.set_tasklist_num(item.idkey)
				// this.currStatus = item.idkey;
				this.listData = []
				this.getTaskListData()
			},
			orderDetailClick(item, index) {
				if (item.Status !== 2) {
					// uni.navigateTo({
					// 	url: "/pages/order/orderDetail"
					// })
				} else {
					uni.navigateTo({
						url: "/pages/order/signleDetail"
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f1f1f1;
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


	.content {
		// margin-top: 10px;
		position: fixed;
		width: 100%;
		z-index: 100;
	}

	.tab {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 100%;
		// height: 41px;
		background-color: #fff;
		box-shadow: 0px 1px 2px #fff;

		.text {
			padding: 12px 0;
			color: #333;
			font-size: 14px;
			// border-bottom: 2px solid #000;
		}

		.active {
			font-size: 14px;
			font-weight: 600;
			padding-bottom: 5px;
			color: #333;
			border-bottom: 2px solid #000;
		}
	}

	.empty {
		margin: 0 20px;

		.emp {
			width: 100%;
		}
	}


	.goon {
		.btn {
			text-align: center;
			font-size: 16px;
			background: linear-gradient(to right, rgb(109, 202, 184), rgb(58, 120, 203));
			color: #fff;
			border: none;
			border-radius: 5px;
			height: 40px;
			line-height: 42px;
			width: 80%;
			margin: auto;
		}
	}


	.order {
		box-sizing: border-box;
		background: #fff;
		margin: 10px 10px 0;
		border-radius: 10px;
		padding: 0 9px 18px;

		.orderTop {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 50px;
			box-sizing: border-box;
			padding: 0 10px;

			.orderTopOne {

				&:nth-child(1) {
					font-size: 12px;
					font-weight: 400;
					color: #999;
				}

				&:nth-child(2) {
					font-size: 12px;
					font-weight: 400;
					color: #ff7300;
				}
			}
		}

		.orderCon {
			display: flex;
			box-sizing: border-box;
			padding: 7px 10px 16px;
			border: 1px solid #eee;

			.orderConL {
				image {
					width: 52px;
					height: 58px;
				}
			}

			.orderConR {
				margin-left: 24px;
				font-size: 12px;
				font-weight: 400;
				color: #999;

				.item {
					margin-top: 2px;

					&:nth-child(1) {
						font-size: 16px;
						font-weight: 500;
						color: #333;
						margin-top: 0;
					}



					.marl20 {
						margin-left: 10px;
					}
				}
			}


		}

		.orderBot {
			display: flex;
			align-items: center;
			box-sizing: border-box;
			justify-content: space-between;
			padding-top: 10px;

			.orderBotL {
				display: flex;
				align-items: center;

				.title {
					font-size: 12px;
					font-weight: 400;
					color: #999;
				}

				.time {
					margin-left: 8px;
					display: flex;
					align-items: center;
					justify-content: center;
					background: #333;
					border-radius: 5px;
					font-size: 12px;
					font-weight: 500;
					color: #fff;
					box-sizing: border-box;
					padding: 4px 10px;
				}
			}

			.orderBotR {
				background: linear-gradient(to right, rgb(109, 202, 184), rgb(58, 120, 203));
				border-radius: 5px;
				font-size: 12px;
				font-weight: 500;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				padding: 4px 10px;
			}
		}


	}

	.line {
		width: 100%;
		background-color: #f1f1f1;
		height: 100px;
	}
</style>
