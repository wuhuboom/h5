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
		<view class="u-flex user-box list-item">
			<view class="u-m-r-20">
				<u-avatar :src="avatarSrc" size="140"></u-avatar>
				<view class="add">
					<image src="../../static/images/xiangji1fill.svg" mode="" class="icon"></image>
				</view>
			</view>
			<view class="u-flex-1">
				<view class="uname u-font-18 u-p-b-20">
					<text>{{personName}}</text>
					<view class="vip">
						<text class="txt">VIP{{personVip}}</text>
					</view>
					<!-- <text class="txt">{{personVip}}</text> -->
				</view>
				<view class="uid u-font-14 u-tips-color">
					ID:{{personID}}
				</view>
			</view>
		</view>
		<view class="list-item">
			<view class="cell" @click="wrapListCell_click(0)">
				<view class="item">
					<view class="avatar">
						<image class="icon" src="../../static/images/yiliaohangyedeI2.svg" mode=""></image>
					</view>
					<text class="label">{{this.$t('user.person.info.phone.bind.text')}}</text>
				</view>
				<view class="right">
					<text style="color: #ffbc00;padding-right: 10px;">{{defalutBindPhoneStr}}</text>
					<u-icon name="arrow-right" color="#f8f8f8" size="28"></u-icon>
				</view>
			</view>

			<view class="cell" @click="wrapListCell_click(1)">
				<view class="item">
					<view class="avatar">
						<image class="icon" src="../../static/images/yqm.png" mode=""></image>
					</view>
					<text class="label">{{this.$t('user.refer.share.invite.title.text')}}</text>
				</view>
				<view class="right">
					<text style="color: #f8f8f8;padding-right: 10px;">{{defalutInviteStr}}</text>
					<u-icon name="arrow-right" color="#f8f8f8" size="28"></u-icon>
				</view>
			</view>

			<view class="cell" @click="wrapListCell_click(2)">
				<view class="item">
					<view class="avatar">
						<image class="icon" src="../../static/images/register-time.svg" mode=""></image>
					</view>
					<text class="label">{{this.$t('user.person.info.reg.time.text')}}</text>
				</view>
				<view class="right">
					<text style="color: #f8f8f8;">{{defalutRegTimeStr | timestampStr}}</text>
					<!-- <u-icon name="arrow-right" color="#f8f8f8" size="28"></u-icon> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		playerInfoReq,
	} from '../../api/index.js'
	import {
		myMixin,
		setInviteMixin,
		setBindPhoneMixin
	} from '@/util/mixins.js'
	export default {
		mixins: [myMixin, setInviteMixin, setBindPhoneMixin],
		data() {
			return {
				navTitle: this.$t('user.person.info.title.text'),
				defalutBindPhoneStr: this.$t('user.person.info.no.bind.text'),
				defalutInviteStr: '',
				defalutRegTimeStr: '',
				personName: '',
				personVip: '',
				personID: '',
				avatarSrc: '../../static/images/avatar1.jpeg',
				phoneStr: '',
				isBindPhone: false,
			}
		},
		onShow() {

			// this.localLoginToken = this.$store.state.userInfo.token
			// this.localLoginToken = uni.getStorageSync('footballToken');

			// 初始化语言
			this.initLang()

			this.initBasicData()
		},
		methods: {
			initLang() { //初始化语言

				let langStr = uni.getStorageSync('ft_lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr


			},
			initBasicData() {
				this.initData()
			},
			async initData() {

				let resR = await playerInfoReq(this.localLoginToken)
				// console.log("res", resR.data);
				if (resR.code === 200) {
					this.personName = resR.data.username
					this.personVip = resR.data.vipLevel
					this.personID = resR.data.userId
					this.defalutInviteStr = resR.data.invitationCode
					this.defalutRegTimeStr = resR.data.createdAt
					if (resR.data.phone) {
						this.phoneStr = resR.data.phone
						this.isBindPhone = false
						this.defalutBindPhoneStr = this.$t('user.person.info.alreay.bind.text')
					} else {
						this.isBindPhone = true
						this.defalutBindPhoneStr = this.$t('user.person.info.no.bind.text')
					}


				} else {

				}
			},
			goBackBtnClick() {
				uni.switchTab({
					url: '/pages/user/user',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			wrapListCell_click(index) {
				if (index === 0) {
					uni.navigateTo({
						url: '/pages/user/bind_phone',
						success: (res) => {
							this.save_bindphone_from('info')
							// 通过eventChannel向被打开页面传送数据	
							res.eventChannel.emit('eventBindPhoneClick', {
								from: 'info'
							})
						},
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (index === 1) {
					uni.navigateTo({
						url: "/pages/refer/share",
						success: (res) => {
							this.save_invite_from('info')
							// 通过eventChannel向被打开页面传送数据	
							res.eventChannel.emit('eventInviteClick', {
								from: 'info'
							})
						},
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (index === 2) {
					// uni.navigateTo({
					// 	url: '/pages/user/forget_pwd',
					// 	animationType: 'slide-in-top',
					// 	animationDuration: 200
					// })
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
		font-size: 14px;
	}

	.cell {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
		padding: 11px 8px;
		border-bottom: 2px solid #171e25;
		width: 90%;
		margin: 0 auto;

		.item {
			display: flex;
			align-items: center;
			flex-direction: row;
			justify-content: center;

			.avatar {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 33px;
				height: 33px;
				border-radius: 50%;

				.icon {
					width: 33px;
					height: 33px;
				}
			}
		}

		.label {
			color: #f8f8f8;
			padding-left: 15px;
		}

		.right {
			display: flex;
		}

	}

	.u-flex {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 7px;
	}


	.user-box {
		background-color: #1f252f;
		display: flex;
		flex-direction: column;
		padding-top: 40px;
		padding-bottom: 30px;
		justify-content: center;

		.u-m-r-20 {
			position: relative;
			border-radius: 50%;
			border: solid 2px #ffd37d;

			.add {
				width: 25px;
				height: 25px;
				position: absolute;
				right: 0;
				bottom: 0;
				background-color: #fff;
				border-radius: 50%;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;

				.icon {
					width: 16px;
					height: 16px;
				}
			}
		}

		.uname {
			font-size: 20px;
			color: #f8f8f8;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			position: relative;

			.vip {
				width: 71px;
				height: 21px;
				// width: 35px;
				// height: 17px;
				// background: url(../../static/images/vip.png) no-repeat 50%;
				// background-size: 100%;
				background: url(../../static/images/vip.png) no-repeat;
				background-size: 100% 100%;
				margin-left: 5px;
				display: flex;
				align-items: center;
				justify-content: center;

				.txt {
					font-size: 13px;
					text-align: center;
					padding-left: 12px;
					color: #8a5100;
					font-weight: bold;
				}
			}

			// .txt {
			// 	color: #ffb300;
			// 	font-style: italic;
			// 	font-weight: bold;
			// 	font-size: 15px;
			// 	position: absolute;
			// 	top: 1.8px;
			// 	right: -6px;
			// }
		}

		.uid {
			font-size: 12px;
			font-family: Microsoft YaHei;
			color: #7f8aa1;
			text-align: center;
		}
	}



	.u-m-r-20 {
		margin-right: 10px;
	}

	.u-flex-1 {
		// flex: 1;
		margin-top: 13px;
	}

	.u-p-b-20 {
		padding-bottom: 10px;
	}

	.u-font-18 {
		font-size: 18px;
	}

	.u-tips-color {
		color: #909399;
	}

	.u-font-14 {
		font-size: 14px;
	}
</style>
