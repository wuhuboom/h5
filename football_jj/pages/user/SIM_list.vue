<template>
	<view>
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
			<!-- <view class="line">

			</view> -->
			<view class="scrollView">
				<view class="list-view">
					<view class="list-item" v-for="(item,index) in simListData" :key="item.id"
						v-if="simListData && simListData.length !== 0" @click="sim_edit_click(item)">

						<view class="topsc">
							<view class="left">
								<image :src="item.image" mode="aspectFit" class="usdt" style="width: 50px;"></image>
							</view>
							<view class="right">
								<view class="content-box">
									<view class="tit1">
										{{item.simName}}
									</view>
									<!-- <view class="tit1">
										{{item.username}}
									</view> -->
									<!-- <view class="tit">
							
									</view> -->
								</view>
								<view class="source">
									<view class="">
										<view class="card-no">
											{{item.username}}
										</view>
										<!-- <image src="../../static/images/copy.svg" mode="" class="icon"
											@click.stop="copyAddrClick(item)"></image> -->
									</view>
								</view>
							</view>
							<view class="copy" @click.stop="copyAddrClick(item)">
								<view class="dots"></view>
								<view class="dots"></view>
								<view class="dots"></view>
							</view>

						</view>

						<view class="bottomsc">
							{{item.sim }}
						</view>
					</view>
					<view class="add-card" @click="addBtnClick(3)">
						<image src="../../static/images/add-r.png" mode="" class="icon"></image>
						<view class="text">
							{{$t('backapi.self.withdraw.add.sim.text')}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		simCardInfoInfo,
		websiteUrlStr
	} from '../../api/index.js'
	import {
		myMixin,
		addBankMinxi,
		addUsdtMinxi,
		addSimMinxi
	} from '@/util/mixins.js'
	import {
		setClipboardData,
		getClipboardData
	} from '@/uni_modules/u-clipboard/js_sdk'
	export default {
		mixins: [myMixin, addBankMinxi, addSimMinxi, addUsdtMinxi],
		filters: {
			addrUsdtFilter(str) {
				return str.substr(0, 5) + '...' + str.substr(-4);
			}
		},
		data() {
			return {
				navTitle: this.$t('backapi.self.sim.list.title.text'),
				addressStr: '',
				usdtUserName: '',
				protocol: '',
				simListData: [],
			}
		},
		onShow() {

			this.initData()
		},
		methods: {
			async initData() {
				let resR = await simCardInfoInfo(this.localLoginToken)
				// console.log("resR", resR);
				if (resR.code === 200) {
					let withDrawData = resR.data
					let resArr = []
					resArr.push({
						image: websiteUrlStr + "/" + withDrawData.img,
						...resR.data
					})
					this.simListData = resArr
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
							// ??????eventChannel??????????????????????????????	
							this.save_addBank_from('bankcardlist')
							res.eventChannel.emit('eventAddBankPageClick', {
								from: 'bankcardlist'
							})
						},
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (num === 2) {
					uni.navigateTo({
						url: '/pages/user/usdt_add',
						success: (res) => {
							// ??????eventChannel??????????????????????????????	
							this.save_addUsdt_from('usdtlist')
							res.eventChannel.emit('eventAddUsdtPageClick', {
								from: 'usdtlist'
							})
						},
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (num === 3) {
					uni.navigateTo({
						url: '/pages/user/sim_add',
						success: (res) => {
							// ??????eventChannel??????????????????????????????	
							this.save_addsim_from('simlist')
							res.eventChannel.emit('eventAddSimPageClick', {
								from: 'simlist'
							})
						},
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				}
			},
			copyAddrClick(item) {
				setClipboardData(item.sim).then(() => {
					uni.showToast({
						icon: 'none',
						title: this.$t('user.refer.share.copy.success.text')
					});
				})
			},
			sim_edit_click(item) {
				uni.navigateTo({
					url: '/pages/user/sim_edit',
					success: (res) => {
						// ??????eventChannel??????????????????????????????
						res.eventChannel.emit('editSimObjs', item)
					},
					animationType: 'pop-in',
					animationDuration: 200
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f8f8f8;
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

	// ???????????????



	.flexView {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		background: #fff;
		margin-top: 10px;

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

	.list-view {
		position: relative;
		width: 100%;
		padding: 0 15px 15px;
		overflow: hidden;
		color: #fff;
	}


	.list-item {
		font-size: 15px;
		border-radius: 10px;
		width: 100%;
		height: 142.5px;
		padding: 12px 10px 15px 10px;
		margin-top: 15px;
		box-sizing: border-box;
		background: url(../../static/images/cardname.png) no-repeat;
		background-size: 100% 100%;
		// border-bottom: 2px solid #262d34;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;

		padding: 16.5px 23px;

		.topsc {

			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;

			.left {
				margin-right: 10px;

				.usdt {
					width: 29px;
					height: 39px;
				}
			}

			.right {
				width: 90%;
			}

			.copy {
				display: -webkit-box;
				display: -webkit-flex;
				display: -ms-flexbox;
				display: flex;
				-webkit-box-align: center;
				-webkit-align-items: center;
				-ms-flex-align: center;
				align-items: center;
				-webkit-box-pack: center;
				-webkit-justify-content: center;
				-ms-flex-pack: center;
				justify-content: center;
				-webkit-box-orient: vertical;
				-webkit-box-direction: normal;
				-webkit-flex-direction: column;
				-ms-flex-direction: column;
				flex-direction: column;
				padding: 0 4px;
				box-sizing: border-box;

				.dots {
					width: 4.5px;
					height: 4.5px;
					background: #fff;
					border-radius: 50%;
					margin-bottom: 2px;
				}
			}
		}


		.bottomsc {
			font-size: 19px;
		}


	}


	.content-box {
		display: flex;
		// align-items: flex-start;
		// justify-content: space-between;
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
		font-size: 13px;
		margin-left: 20px;
		line-height: 25px;
		background: hsla(0, 0%, 100%, .1);
		padding: 0 10px;
		border-radius: 20px;
		color: #ffb628;
		display: flex;
		align-items: center;
	}

	.tit1 {
		font-size: 14px;
		margin: 5px 0;
		font-size: 700;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.source {
		// margin-top: 10px;
		color: #fff;

		view {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			width: 100%;

			.card-no {
				width: 86%;
				display: inline-block;
				font-size: 13px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.icon {
				flex: 0 0 16px;
				width: 16px;
				height: 16px;
			}
		}
	}

	.add-card {
		background: #597ef7;
		font-size: 15px;
		margin-top: 25px;
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

		.text {
			color: #fff;
			font-size: 14px;
			font-weight: 700;
		}
	}
</style>
