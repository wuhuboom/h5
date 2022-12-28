<template>
	<view>
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
								<!-- 	<view class="service">
									<image src="../../static/images/service.png" mode="" class="icon"></image>
								</view> -->
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
		<view class="flexView">
			<view class="line">

			</view>
			<view class="scrollView">
				<view class="list-view">
					<view class="list-item" v-if="addressStr" @click.stop="bank_edit_click()"
						style="background: linear-gradient(to right, rgb(219, 148, 102), rgb(217, 186, 117));">
						<view class="right-content">
							<view class="content-box">
								<view class="des-box">
									<view class="tit">
										{{addressStr}}
									</view>
									<view class="titl">
										{{$t('user.security.center.bankcard.bankadd.input.account.name.text')}}
										{{cardNickName}}
									</view>
									<view class="titl">
										{{$t('backapi.self.creatimer')}}
										{{cardCreatedTimer | timerFormat}}
									</view>
								</view>
							</view>
							<view class="source">
								<view class="">
									<span class="card-no">
										****
									</span>
									<span class="card-no">
										****
									</span>
									<span class="card-no">
										****
									</span>
									<span class="card-no">
										{{cardNumStr}}
									</span>
								</view>
							</view>
						</view>
					</view>
					<view class="add-card" @click="addBtnClick(1)">
						<image src="../../static/images/add.svg" mode="" class="icon"></image>
						<view class="text">
							{{$t('user.security.center.bankcard.bankadd.title.text')}}
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		bankCardInfo
	} from '../../api/index.js'
	import {
		myMixin,
		addBankMinxi,
		addUsdtMinxi
	} from '@/util/mixins.js'
	import {
		formatDateTimeSolt
	} from '@/common/publicTool.js'
	export default {
		mixins: [myMixin, addBankMinxi, addUsdtMinxi],
		data() {
			return {
				navTitle: this.$t('user.security.center.bankcard.title.text'),
				addressStr: '',
				cardNickName: '',
				cardNumStr: '',
				cardCreatedTimer: '',
				cardInfo: {}
			}
		},
		filters: {
			timerFormat(value) {
				if (value) {
					let tempStr = formatDateTimeSolt(value, 1)
					return tempStr.substr(0, 10)
				} else {
					return ''
				}

			},
		},
		onShow() {

			this.initData()
		},
		methods: {
			async initData() {
				let resR = await bankCardInfo(this.localLoginToken)
				// console.log("resR", resR);
				if (resR.code === 200) {
					if (resR.data) {
						this.cardInfo = resR.data
						this.addressStr = resR.data.bankName
						this.cardNickName = resR.data.username
						this.cardNumStr = resR.data.cardNumber.substr(-4)
						this.cardCreatedTimer = resR.data.createdAt
					}

				}
			},
			goBackBtnClick() {
				uni.navigateTo({
					url: '/pages/user/securityCenter',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			addBtnClick(num) {
				if (num === 1) {
					uni.navigateTo({
						url: '/pages/user/bankcard_add',
						success: (res) => {
							// 通过eventChannel向被打开页面传送数据	
							this.save_addBank_from('bankcardlist')
							res.eventChannel.emit('eventAddBankPageClick', {
								from: 'bankcardlist'
							})
						},
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else {
					uni.navigateTo({
						url: '/pages/user/usdt_add',
						success: (res) => {
							// 通过eventChannel向被打开页面传送数据	
							this.save_addUsdt_from('bankcardlist')
							res.eventChannel.emit('eventAddUsdtPageClick', {
								from: 'bankcardlist'
							})
						},
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				}
			},
			bank_edit_click() {
				uni.navigateTo({
					url: '/pages/user/bankcard_edit',
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('editBankObjs', this.cardInfo)
					},
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #1f252f;
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



	.flexView {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;

		.line {
			width: 100%;
			height: 5px;
			background-color: #171e25;
			margin: 5px 0;
		}

		.scrollView {
			width: 100%;
			height: 100%;
			flex: 1;
			overflow-y: auto;
			overflow-x: hidden;
			position: relative;
			padding-bottom: 58px;
		}
	}

	.list-item {
		font-size: 15px;
		border-radius: 10px;
		width: 100%;
		height: 126px;
		padding: 12px 20px 12px 25px;
		margin-top: 15px;
		box-sizing: border-box;
		background-size: 100% 100%;
		display: flex;
	}

	.add-card {
		background: linear-gradient(90deg, #ffcd6d, #ffb31f);
		font-size: 15px;
		margin-top: 35px;
		color: #000;
		border-radius: 5px;
		padding: 15px;
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: center;
		color: #111;

		.icon {
			width: 21px;
			height: 21px;
			margin-right: 5px;
		}
	}

	.list-view {
		position: relative;
		width: 100%;
		padding: 0 20px 20px;
		overflow: hidden;
		color: #fff;
	}

	.right-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.content-box {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		position: relative;
	}

	.des-box {
		min-height: 45px;
		box-sizing: border-box;
		vertical-align: top;
		font-size: 12px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		color: #fff;
	}


	.tit {
		font-size: 15px;
		max-width: 210px;
		font-weight: 700;
	}

	.tit1 {
		font-size: 14px;
		margin: 10px 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}


	.tit2 {
		font-size: 14px;
		margin: 10px 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.source {
		width: 282px;
		color: #fff;

		view {
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.card-no {
				font-size: 20px;
				margin-right: 16px;
			}
		}
	}
</style>
