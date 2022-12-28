<template>
	<view class="reportManagePage">
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
		<view class="line">

		</view>
		<view class="list-item">
			<ft82ListCell v-for="(item,index) in dataCenterList" :key="index" :itemCell="item"
				@click.native="wrapListCell_click(item,index)">

			</ft82ListCell>
		</view>
	</view>
</template>

<script>
	import {
		setFunPassMixin
	} from '@/util/mixins.js'
	import ft82ListCell from '@/components/ft82ListCellView/ft82ListCellView.vue'
	export default {
		components: {
			ft82ListCell
		},
		mixins: [setFunPassMixin],
		data() {
			return {
				navTitle: this.$t('user.security.center.title.text'),
				dataCenterList: [{
					ids: 0,
					imageIcon: '../../static/images/1.png',
					name: this.$t('user.security.center.bankcard.bank.title.text'),
					style: "background-color: #ffc24a4d;",
					imageStyle: 'width: 21px;height: 17px;'
				}, {
					ids: 6,
					imageIcon: '../../static/images/1.png',
					name: this.$t('backapi.self.sim.list.title.text'),
					style: "background-color: #ffc24a4d;",
					imageStyle: 'width: 21px;height: 17px;'
				}, {
					ids: 1,
					imageIcon: '../../static/images/2l.png',
					name: this.$t('user.security.center.bankcard.virtual.list.title.text'),
					style: "background-color: #4741E04D;",
					imageStyle: 'width: 17px;height: 20px;'
				}, {
					ids: 2,
					imageIcon: '../../static/images/3.png',
					name: this.$t('user.security.center.login.password.text'),
					style: "background-color: #F14B894D;",
					imageStyle: 'width: 15px;height: 20px;'
				}, {
					ids: 5,
					imageIcon: '../../static/images/5.png',
					name: this.$t('login.forget2.text'),
					style: "background-color: #d4237a4D;",
					imageStyle: 'width: 31px;height: 31px;'
				}, {
					ids: 4,
					imageIcon: '../../static/images/4.png',
					name: this.$t('backapi.self.edit.find.safe.pwd.usdt'),
					style: "background-color: #00000000;",
					imageStyle: 'width: 33px;height: 33px;'
				}, {
					ids: 3,
					imageIcon: '../../static/images/4.png',
					name: this.$t('backapi.self.edit.change.safe.pwd.usdt'),
					style: "background-color: #00000000;",
					imageStyle: 'width: 33px;height: 33px;'
				}]
			}
		},
		methods: {
			goBackBtnClick() {
				uni.switchTab({
					url: '/pages/user/user',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			wrapListCell_click(item, index) {
				if (item.ids === 0) {
					uni.navigateTo({
						url: '/pages/user/bankcard_list',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (item.ids === 6) {
					uni.navigateTo({
						url: '/pages/user/SIM_list',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (item.ids === 1) {
					uni.navigateTo({
						url: '/pages/user/USDT_list',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (item.ids === 2) {
					uni.navigateTo({
						url: '/pages/user/forget_pwd',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (item.ids === 3) {
					uni.navigateTo({
						url: '/pages/user/forget_pwd2',
						success: (res) => {
							this.save_funpass_from('security')
							// 通过eventChannel向被打开页面传送数据	
							res.eventChannel.emit('eventFunPassClick', {
								from: 'security'
							})
						},
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (item.ids === 4) {
					uni.navigateTo({
						url: '/pages/user/fund_pwd',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (item.ids === 5) {
					uni.navigateTo({
						url: '/pages/user/change_pass',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				}



			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #171e25;
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

	.line {
		width: 100%;
		height: 10px;
		background-color: #171e25;
	}

	.list-item {
		background-color: #1f252f;
	}
</style>
