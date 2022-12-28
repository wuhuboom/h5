<template>
	<view class="">
		<view class="recharge">
			<!-- left-icon="left" -->

			<view class="backTitleBar-wrapper colCent borderBox">
				<view class="fixedBox">
					<view class="common_header" style="height: 45px;">
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


			</view>

			<view class="banner">

			</view>

			<view class="middleContainer">
				<view class="commonPading contitle">
					{{$t('get.content.order.text')}}
					<uni-icons type="right" color="#333" size="17" />
				</view>

				<view class="commission">
					<view class="today">
						<view class="num">
							{{statistiObj.today_commission}}
						</view>
						<view class="title">
							{{$t('get.content.today.commission.text')}}({{symbolStr}})
						</view>
					</view>
					<view class="person">
						<view class="num">
							{{statistiObj.personal_commission}}
						</view>
						<view class="title">
							{{$t('get.content.person.commission.text')}}({{symbolStr}})
						</view>
					</view>
				</view>

				<view class="order">
					<view class="done">
						<view class="num">
							{{statistiObj.already_accomplish_task_order}}
						</view>
						<view class="title">
							{{$t('get.content.done.order.text')}}
						</view>
					</view>
					<view class="freeze">
						<view class="num">
							{{statistiObj.freeze_num}}
						</view>
						<view class="title">
							{{$t('get.content.freeze.num.text')}}
						</view>
					</view>
					<view class="residue">
						<view class="num">
							{{statistiObj.remaining_task_order_num}}
						</view>
						<view class="title">
							{{$t('get.content.remaining.order.text')}}
						</view>
					</view>
				</view>

				<view class="money">
					<view class="freeze">
						<view class="num">
							{{statistiObj.freeze_money}}
						</view>
						<view class="title">
							{{$t('get.content.freeze.money.text')}}({{symbolStr}})
						</view>
					</view>
					<view class="moneystr">
						<view class="num">
							{{symbolStr}} {{statistiObj.balance}}
						</view>
						<view class="title">
							{{$t('get.content.curr.money.text')}}({{symbolStr}})
						</view>
					</view>
				</view>

			</view>

			<view class="noticeContainer">
				<view class="notice-img">
					<image src="../../static/images/s_notice.png" mode=""></image>
				</view>
				<swiper class="swiper" circular :indicator-dots="false" :autoplay="true" interval="2100" duration="1600"
					:vertical="true" :disable-touch="true" :acceleration="true">
					<swiper-item class="newlist" v-for="(item,index) in newListItemArr" :key="index">
						<view class="cell-item">
							<view class="conone top">
								{{item.nickname}}
							</view>
							<view class="conone top" style="color: rgb(255, 115, 0);">
								{{$t('get.scorll.commission.text')}}
							</view>
							<view class="conone bottom">
								{{item.create_time}}
							</view>
						</view>
					</swiper-item>

				</swiper>

			</view>

			<view class="btnContainer">
				<view class="autoget" @click="autoGetClick">
					{{$t('get.btns.auto.get.text')}}
				</view>
				<view class="stopget">
					{{$t('get.btns.stop.get.text')}}
				</view>
			</view>

			<view class="tipContainer">
				<view class="top">
					{{$t('get.tip.title.text')}}
				</view>
				<view class="bottom">
					{{$t('get.tip.content1.text')}}
					{{$t('get.tip.content2.text')}}
					{{$t('get.tip.content3.text')}}
				</view>
			</view>

			<view class="line">

			</view>

		</view>

		<self-tabbar :current-page="2"></self-tabbar>

	</view>
</template>

<script>
	import {
		getDoTaskReq,
		getTaskFirstPageReq,
	} from '@/api/index.js'
	import {
		randomString,
		randomNum,
		getRandomNum,
		formatSoltDateTime,
		forMate
	} from '../../common/publicTool.js'
	import {
		myMixin,
		taskListMixin
	} from '@/util/mixins.js'
	export default {
		mixins: [myMixin, taskListMixin],
		data() {
			return {
				navTitle: this.$t('tabar.get'),
				statistiObj: {},


				newListItemArr: [{
						"id": 0,
						"avatar": "../../static/images/avatar5.jpg",
						"money": 21277.86,
						"nickname": "G***ry",
						"user_id": 0,
						"create_time": "15-10-2022 21:35:31"
					},
					{
						"id": 0,
						"avatar": "../../static/images/avatar8.jpg",
						"money": 46100.05,
						"nickname": "Char***",
						"user_id": 0,
						"create_time": "15-10-2022 21:37:04"
					},
					{
						"id": 0,
						"avatar": "../../static/images/avatar10.jpg",
						"money": 27647.57,
						"nickname": "De***",
						"user_id": 0,
						"create_time": "15-10-2022 21:38:20"
					},
					{
						"id": 0,
						"avatar": "../../static/images/avatar16.jpg",
						"money": 14595.51,
						"nickname": "Au***",
						"user_id": 0,
						"create_time": "15-10-2022 21:39:18"
					},
					{
						"id": 0,
						"avatar": "../../static/images/avatar8.jpg",
						"money": 9577.58,
						"nickname": "Dou****",
						"user_id": 0,
						"create_time": "15-10-2022 21:40:22"
					},
					{
						"id": 0,
						"avatar": "../../static/images/avatar7.jpg",
						"money": 48523.85,
						"nickname": "Bo***",
						"user_id": 0,
						"create_time": "15-10-2022 21:42:00"
					},
					{
						"id": 0,
						"avatar": "../../static/images/avatar3.jpg",
						"money": 49295.67,
						"nickname": "Bo***",
						"user_id": 0,
						"create_time": "15-10-2022 21:43:08"
					},
					{
						"id": 0,
						"avatar": "../../static/images/avatar7.jpg",
						"money": 33225.83,
						"nickname": "E***c",
						"user_id": 0,
						"create_time": "15-10-2022 21:44:25"
					},
					{
						"id": 0,
						"avatar": "../../static/images/avatar7.jpg",
						"money": 35351.33,
						"nickname": "Bra****",
						"user_id": 0,
						"create_time": "15-10-2022 21:45:53"
					},
					{
						"id": 0,
						"avatar": "../../static/images/avatar8.jpg",
						"money": 20815.87,
						"nickname": "Col***",
						"user_id": 0,
						"create_time": "15-10-2022 21:46:49"
					}
				],

				urlFromStr: '',

			}
		},
		onShow() {

			// // #ifndef APP-NVUE
			// const eventChannel = this.getOpenerEventChannel();
			// // #endif
			// // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			// eventChannel.on('rechargeEventClick', async (data) => {
			// 	this.urlFromStr = data.from
			// })

			this.buildVirtualData()

			this.statistiData()


		},
		mounted() {

		},
		computed: {

		},
		methods: {
			goBackBtnClick() {

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
			buildVirtualData() {

				let timerStr = 0
				let creatTime = 0
				let virtualArr = []
				let nicknameres = ""

				for (let i = 0; i < 20; i++) {
					nicknameres = randomString(6)
					timerStr = Date.parse(new Date()) / 1000;
					creatTime = timerStr + getRandomNum(30, 120)
					virtualArr.push({
						id: i + 1,
						nickname: forMate(nicknameres, 2, 3),
						money: getRandomNum(5000, 50000),
						create_time: formatSoltDateTime(creatTime, 1000)
					})

				}

				this.newListItemArr = virtualArr

			},
			async statistiData() {
				let resR = await getTaskFirstPageReq(this.localLoginToken)
				if (resR.code === 2000) {
					// console.log("resR.result", resR.result);
					this.statistiObj = resR.result
				}
			},
			async autoGetClick() { //会有三个状态，1.冻结任务，2.为分配任务，3
				let resR = await getDoTaskReq(this.localLoginToken)
				if (resR.code === 2000) { //这是第一次点击获取的时候的状态
					uni.navigateTo({
						url: "/pages/order/signleDetail"
					})
				} else if (resR.code === 300) { //存在结算状态
					this.set_tasklist_num(5)
					uni.switchTab({
						url: "/pages/order/index",
						success: (res) => {

						},
					})
				}
			}
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

	.recharge {
		// height: 100vh;
		background: #f1f1f1;

		.banner {
			background: linear-gradient(to right, #6dcab8, #3a78cb);
			padding: 30px 0 0;
		}


		.middleContainer {
			background-color: #fff;
			color: #666;
			border-radius: 20px 20px 0 0;
			overflow: hidden;
			margin-top: -20px;

			.commonPading {
				padding: 15px;
			}

			.contitle {
				color: #333;
				border-bottom: 1px solid #fbfbfb;
			}

			.commission {
				display: flex;
				padding: 15px 0;
				margin: 0 15px;
				border-bottom: 1px solid #eeeff2;

				.today {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding-top: 10px;
					box-sizing: border-box;
					width: 50%;

					.num {
						font-weight: 700;
						font-size: 22px;

					}

					.title {
						font-size: 11px;
						font-weight: 400;
						color: #999;
						text-align: center;
					}
				}

				.person {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding-top: 10px;
					box-sizing: border-box;
					width: 50%;

					.num {
						font-weight: 700;
						font-size: 22px;

					}

					.title {
						font-size: 11px;
						font-weight: 400;
						color: #999;
						text-align: center;
					}
				}
			}

			.order {
				display: flex;
				justify-content: space-between;
				margin: 0 20px;
				padding: 15px 0;
				border-bottom: 1px solid #eeeff2;

				.done {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding-top: 10px;
					box-sizing: border-box;

					.num {
						font-weight: 700;
						font-size: 22px;

					}

					.title {
						font-size: 11px;
						font-weight: 400;
						color: #999;
						text-align: center;
					}
				}

				.freeze {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding-top: 10px;
					box-sizing: border-box;
					margin-left: 15px;

					.num {
						font-weight: 700;
						font-size: 22px;

					}

					.title {
						font-size: 11px;
						font-weight: 400;
						color: #999;
						text-align: center;
					}
				}

				.residue {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding-top: 10px;
					box-sizing: border-box;
					margin-left: 15px;

					.num {
						font-weight: 700;
						font-size: 22px;

					}

					.title {
						font-size: 11px;
						font-weight: 400;
						color: #999;
						text-align: center;
					}
				}
			}


			.money {
				display: flex;
				justify-content: space-between;
				margin: 0 15px;
				padding-bottom: 15px;
				border-bottom: 1px solid #eeeff2;

				.freeze {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding-top: 10px;
					box-sizing: border-box;
					width: 50%;

					.num {
						font-weight: 700;
						font-size: 22px;

					}

					.title {
						font-size: 11px;
						font-weight: 400;
						color: #999;
						text-align: center;
					}
				}

				.moneystr {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding-top: 10px;
					box-sizing: border-box;
					width: 50%;

					.num {
						font-weight: 700;
						font-size: 22px;

					}

					.title {
						font-size: 11px;
						font-weight: 400;
						color: #999;
						text-align: center;
					}
				}

			}

		}



		.noticeContainer {
			background: #fff;
			color: #666;
			margin: 10px 15px 0px;
			display: flex;
			justify-content: space-between;
			// align-items: center;

			.notice-img {
				display: flex;
				align-items: center;
				margin: 0 5px;

				image {
					width: 22px;
					height: 22px;
				}


			}

			.swiper {
				width: 100%;
				margin-right: 15px;
				padding: 0;
				background-color: #fff;
				color: #666;
				height: 50px;

				.newlist {
					.cell-item {
						display: flex;
						justify-content: space-around;
						align-items: center;
						height: 50px;
					}
				}
			}
		}

		.btnContainer {
			padding: 5px 15px;

			.autoget {
				margin-top: 20px;
				text-align: center;
				font-size: 16px;

				height: 50px;
				line-height: 42px;
				background: linear-gradient(to right, rgb(109, 202, 184), rgb(58, 120, 203));
				color: #fff;
				border: none;
				border-radius: 700px;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.stopget {
				margin-top: 20px;
				text-align: center;
				font-size: 16px;

				height: 50px;
				line-height: 42px;
				background: none;
				color: #1e7eee;
				border: 1px solid #1e7eee;
				border-radius: 700px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.tipContainer {
			background-color: #fff;
			color: #666;
			margin: 10px 15px 0;

			.top {
				padding: 10px 15px;
				border-bottom: 1px solid #eeeff2;
			}

			.bottom {
				padding: 15px;
				color: #aaa;
			}
		}


		.line {
			height: 90px;
		}

	}
</style>
