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
					<view class="list-item" v-for="(item,index) in usdtListData" :key="item.id"
						v-if="usdtListData && usdtListData.length !== 0" @click="usdt_edit_click(item)">
						<view class="left">
							<image src="../../static/images/usdt.png" mode="" class="usdt"></image>
						</view>
						<view class="right">
							<view class="content-box">
								<view class="tit1">
									{{item.username}}
								</view>
								<view class="tit">
									{{item.protocol}}
								</view>
							</view>
							<view class="source">

							</view>
							<view class="source">
								<view class="">
									<view class="card-no">
										{{item.addr | addrUsdtFilter}}
									</view>
									<image src="../../static/images/copy.svg" mode="" class="icon"
										@click.stop="copyAddrClick(item)"></image>
								</view>
							</view>
						</view>
					</view>
					<view class="add-card" @click="addBtnClick(2)">
						<image src="../../static/images/add.svg" mode="" class="icon"></image>
						<view class="text">
							{{$t('user.security.center.bankcard.Add.title.text')}}{{$t('user.security.center.bankcard.useradd.title.text')}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		usdtListReq
	} from '../../api/index.js'
	import {
		myMixin,
		addBankMinxi,
		addUsdtMinxi
	} from '@/util/mixins.js'
	import {
		setClipboardData,
		getClipboardData
	} from '@/uni_modules/u-clipboard/js_sdk'
	export default {
		mixins: [myMixin, addBankMinxi, addUsdtMinxi],
		filters: {
			addrUsdtFilter(str) {
				return str.substr(0, 5) + '...' + str.substr(-4);
			}
		},
		data() {
			return {
				navTitle: this.$t('user.security.center.bankcard.virtual.list.title.text'),
				addressStr: '',
				usdtUserName: '',
				protocol: '',
				usdtListData: [],
			}
		},
		onShow() {

			this.initData()
		},
		methods: {
			async initData() {
				let resR = await usdtListReq(this.localLoginToken)
				// console.log("resR", resR);
				if (resR.code === 200) {
					this.usdtListData = resR.data
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
							this.save_addUsdt_from('usdtlist')
							res.eventChannel.emit('eventAddUsdtPageClick', {
								from: 'usdtlist'
							})
						},
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				}
			},
			copyAddrClick(item) {
				setClipboardData(item.addr).then(() => {
					uni.showToast({
						icon: 'none',
						title: this.$t('user.refer.share.copy.success.text')
					});
				})
			},
			usdt_edit_click(item) {
				uni.navigateTo({
					url: '/pages/user/usdt_edit',
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('editUsdtObjs', item)
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
		padding: 12px 10px 15px 10px;
		margin-top: 15px;
		box-sizing: border-box;
		background-size: 100% 100%;
		border-bottom: 2px solid #262d34;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;


		.left {
			margin-right: 10px;

			.usdt {
				width: 29px;
				height: 29px;
			}
		}

		.right {
			width: 90%;
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
		margin-top: 10px;
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
		background: linear-gradient(90deg, #ffcd6d, #ffb31f);
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
	}
</style>
