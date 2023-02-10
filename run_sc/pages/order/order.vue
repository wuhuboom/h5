<template>
	<view class="page-layout">
		<view class="back">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
				<view class="main">
					<u-navbar :is-back="false" :background="backgroundOBj" :border-bottom="false" z-index="1200"
						back-icon-color="#fff" title-color="#fff" :title="navTitle">
					</u-navbar>
					<view class="orderContainer">

						<view class="receive_order">
							<view class="rec_action">
								<view class="rec_body" :style="rec_b_style" @click="receiveClick">
									{{workText}}
								</view>
							</view>
						</view>

						<view class="leaderContainer" v-if="receiverList.length !== 0">
							<view class="box">
								<view class="tit">
									{{$t('order.receive.list.head.tip.text')}}
								</view>
								<view class="list_d" v-for="(item,index) in receiverList" :key="item.id">
									<view class="top">
										<view class="content">
											<view class="title">
												{{$t('order.receive.list.cell.ordernum.text')}}
											</view>
											<view class="con">
												<view class="real_c">
													{{item.OwnOrder}}
												</view>
											</view>
										</view>
										<view class="btn" @click="cofirmReceiverMoneyClick(item)">
											{{$t('order.receive.list.cell.oprate.confirm2.text')}}
										</view>
									</view>
									<view class="bottom">
										<view class="title">
											{{$t("order.receive.list.cell.expiretime.text")}}
										</view>
										<view class="time">
											{{item.ExpireTime |timestampStr2}}
										</view>
									</view>
								</view>
							</view>
						</view>

					</view>
				</view>
			</scroll-view>
		</view>



		<u-popup v-model="confirmModelBool" mode="center" border-radius="40" :mask-close-able="false">
			<view class="classModel">
				<image src="../../static/images/bg.png" mode="" class="headImg" style="height: 176px;"></image>
				<view class="center_txt">
					{{$t('order.receive.model.center.text')}}
				</view>
				<view class="container">
					<view class="left">
						{{$t('order.receive.model.form.input.left.text')}}
					</view>
					<view class="right">
						<input type="text" value="" :placeholder="$t('order.receive.model.form.input.place.text')"
							v-model="actualAmount" :placeholder-style="placeholderStyle" />
					</view>
				</view>
				<view class="btns">
					<view class="cancel" @click="cancelModelClick">
						{{$t('order.receive.list.cell.oprate.cancel.text')}}
					</view>
					<view class="confirm" @click="confirmModelClick">
						{{$t('order.receive.list.cell.oprate.confirm.text')}}
					</view>
				</view>
			</view>
		</u-popup>


	</view>
</template>

<script>
	import {
		getMeReq,
		imWorkingReq,
		getReceiveCollectionOrderReq,
		confirmTheOrderReq
	} from '../../api/index.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	export default {
		components: {},
		data() {
			return {
				navTitle: this.$t('tabar.competition'),
				username: '',
				balance: 0,
				workStatus: false,
				receiverList: [],
				backgroundOBj: {
					"background": "transparent"
				},
				scrollTop: 0,
				workText: '...',
				rec_b_style: '',
				confirmModelBool: false,
				actualAmount: '',
				placeholderStyle: 'font-size:14px;',
				confirmItem: {},
			}
		},
		filters: {

		},
		mixins: [myMixin],
		onShow() {


			// 初始化语言
			this.initLang()

			//初次获取个人信息数据
			this.initPlayInfoData()

			// 获取接单列表
			this.getReceiveListData()


		},
		methods: {
			// ...mapMutations(['logout']),
			initLang() { //初始化语言

				let langStr = uni.getStorageSync('run_lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr

				uni.setTabBarItem({
					index: 0,
					text: this.$t('tabar.home')
				})
				uni.setTabBarItem({
					index: 1,
					text: this.$t('tabar.competition')
				})
				uni.setTabBarItem({
					index: 2,
					text: this.$t('tabar.sportsresults')
				})
				uni.setTabBarItem({
					index: 3,
					text: this.$t('tabar.mine')
				})


			},
			async initPlayInfoData() {
				this.balance = 0.00
				let resR = await getMeReq(this.localLoginToken)
				// console.log("resR",resR.data);
				if (resR.code === 200) {
					// console.log("resR",resR.data);
					this.username = resR.result.Username
					this.balance = resR.result.Balance
					if (resR.result && resR.result.Working == 2) { //代表接单中...
						this.workText = this.$t('order.receive.btn.stop.text')
						this.workStatus = true
						this.rec_b_style = 'background: linear-gradient(120deg, #CE9FFC, #7367F0);color: #fff'
					} else if (resR.result && resR.result.Working == 1) { //代表停止接单...
						this.workText = this.$t('order.receive.btn.start.text')
						this.workStatus = false
						this.rec_b_style = 'background: linear-gradient(120deg, #81FBB8, #28C76F);color: #fff'
					}
				}
			},
			async getReceiveListData() {
				let reqParam = {}
				reqParam.status = 1
				let resR = await getReceiveCollectionOrderReq(reqParam, this.localLoginToken)
				// console.log("resR",resR.result);
				if (resR.code === 200) {
					this.receiverList = resR.result
				}
			},
			async receiveClick() {
				let reqParam = {}
				reqParam.work = this.workStatus ? 1 : 2
				let resR = await imWorkingReq(reqParam, this.localLoginToken)
				if (resR.code === 200) {
					if (resR.msg == "2") {
						this.workText = this.$t('order.receive.btn.stop.text')
						this.workStatus = true
						this.rec_b_style = 'background: linear-gradient(120deg, #CE9FFC, #7367F0);color: #fff'
					} else if (resR.msg == "1") {
						this.workText = this.$t('order.receive.btn.start.text')
						this.workStatus = false
						this.rec_b_style = 'background: linear-gradient(120deg, #81FBB8, #28C76F);color: #fff'
					}
				}
			},
			cofirmReceiverMoneyClick(item) {
				this.confirmItem = item
				this.confirmModelBool = true
				this.actualAmount = item.ActualAmount
			},
			cancelModelClick() {
				this.confirmModelBool = false
			},
			async confirmModelClick() {
				let reqParam = {}
				reqParam.id = this.confirmItem.ID
				reqParam.amount = this.actualAmount
				this.confirmModelBool = false
				let resR = await confirmTheOrderReq(reqParam, this.localLoginToken)
				if (resR.code === 200) {
					uni.showToast({
						icon: 'none',
						title: resR.msg,
					});

					this.getReceiveListData()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		display: block;
		height: 100%;
		position: relative;
	}

	.page-layout {
		height: 100%;

		.back {
			position: relative;
			height: 100vh;
			background: url(../../static/images/back.png) no-repeat 0 0;
			background-size: 100% !important;
			// padding-bottom: 250px;

			.scroll-Y {
				height: 100%;

				.orderContainer {

					.receive_order {
						padding-top: 30px;

						.rec_action {
							display: flex;
							justify-content: center;
							flex-wrap: wrap;

							.rec_body {
								border-radius: 50%;
								// background: linear-gradient(120deg, #CE9FFC, #7367F0);

								text-align: center;
								height: 168px;
								width: 168px;
								line-height: 168px;
								color: #fff;
								font-weight: bold;
								font-size: 22.4px;
							}
						}
					}

					.leaderContainer {
						padding: 25px 13px 0;
						padding-bottom: 80px;

						.box {
							background-color: #fff;
							border-radius: 12px;
							height: 100%;
							padding: 25px 12px 33px;
							margin-bottom: 10px;
							box-shadow: 0 4px 10px #0000004d;

							.tit {
								font-size: 21px;
								color: #5b9eff;
								line-height: 1;
								position: relative;
								z-index: 2;
								font-weight: 700;
							}

							.list_d {
								background: url(../../static/images/bg2.png) no-repeat 0;
								background-size: contain;
								padding: 15px 17px;
								margin-top: 10px;

								.top {
									background: linear-gradient(0deg, #f5f5ff, #fffefe);
									box-shadow: 0px 0.5px 2px 0px #3274e080;
									border-radius: 10px;
									display: flex;
									align-items: center;
									padding: 21px 15px 15px;

									.content {
										flex: 1;

										.title {
											font-size: 15px;
											line-height: 1;
											color: #000000;
										}

										.con {
											display: flex;
											align-items: center;
											margin-top: 7px;

											.real_c {
												display: -webkit-box !important;
												overflow: hidden;
												text-overflow: ellipsis;
												word-break: break-all;
												-webkit-line-clamp: 2;
												-webkit-box-orient: vertical !important;
												font-size: 9px;
												color: #ff4300;
											}
										}
									}

									.btn {
										background-color: rgb(255, 78, 63);
										border-radius: 11px;
										color: #fff;
										font-size: 11px;
										height: 23;
										line-height: 23px;
										padding-left: 7px;
										padding-right: 8px;

									}
								}

								.bottom {
									// display: flex;
									// align-items: flex-start;
									// flex-direction: column;
									// margin-top: 5px;

									display: flex;
									align-items: center;
									flex-direction: column;
									margin-top: 15px;
									flex-flow: row wrap;
									justify-content: space-between;

									.title {
										font-size: 11px;
										color: #2e74ff;
									}

									.time {
										font-size: 9px;
										color: #ff4300;
										margin-top: 5px;
										margin-bottom: 5px;
									}
								}
							}
						}
					}

				}

			}
		}
	}


	.classModel {
		overflow: hidden;
		box-sizing: border-box;
		border-radius: 20px;
		width: 282px;
		min-height: 332px;
		background-size: contain;

		.headImg {
			width: 100%;
			margin-top: -60px;
			margin-bottom: 22px;



		}

		.center_txt {
			text-align: center;
			font-size: 16px;
			color: rgb(28, 28, 32);
			font-weight: bold;
		}

		.container {
			padding: 0 10px;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			// text-align: center;
			font-size: 14px;
			color: rgb(28, 28, 32);
			margin-top: 30px;

			.left {
				height: 20px;
				margin-right: 5px;
			}

			.right {
				width: 40%;
			}
		}

		.btns {
			padding: 0 20px;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;
			margin-top: 30px;


			.cancel {
				width: 110px;
				height: 40px;
				line-height: 40px;
				background: #676767;
				box-shadow: 0 5px 0 #243c47;
				border-radius: 30px;
				text-align: center;
				font-size: 14px;
				color: #fff;
			}

			.confirm {
				width: 110px;
				height: 40px;
				line-height: 40px;
				background: #0686E7;
				box-shadow: 0 5px 0 #016fd7;
				border-radius: 30px;
				text-align: center;
				font-size: 14px;
				color: #fff;
			}
		}
	}
</style>
