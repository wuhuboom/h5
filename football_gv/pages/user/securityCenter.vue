<template>
	<view class="reportManagePage">
		<uni-nav-bar backgroundColor="#00111C" color="#fff" :statusBar="true" :border="false"
			@clickLeft="goBackBtnClick" style="font-weight: 600;" :fixed="true">
			<block slot="left">
				<view class="navLeftBtn">
					<image src="../../static/images/back.svg" mode=""></image>
				</view>
			</block>

			<view class="navTitleCenter">{{navTitle}}</view>
		</uni-nav-bar>

		<view class="report_container">
			<view class="report_wrap">
				<wrapListCell v-for="(item,index) in dataCenterList" :key="index" :itemCell="item"
					@click.native="wrapListCell_click(item,index)" />
			</view>
		</view>
	</view>
</template>

<script>
	import wrapListCell from '@/components/wrapListCellView/wrapListCellView.vue'
	import {
		changePhoneMixin
	} from '@/util/mixins.js'
	export default {
		components: {
			wrapListCell,
		},
		mixins: [changePhoneMixin],

		data() {
			return {
				navTitle: this.$t('user.security.center.title.text'),
				dataCenterList: [{
					ids: 0,
					imageIcon: '../../static/images/safe1.svg',
					name: this.$t('user.security.center.login.password.text')
				}, {
					ids: 1,
					imageIcon: '../../static/images/safe2.svg',
					name: this.$t('backapi.self.edit.change.safe.pwd.usdt')
				}, {
					ids: 2,
					imageIcon: '../../static/images/safe2.svg',
					name: this.$t('backapi.self.edit.find.safe.pwd.usdt')
				}, {
					ids: 3,
					imageIcon: '../../static/images/safe3.svg',
					name: this.$t('user.security.center.bankcard.list.text')
				}, {
					ids: 5,
					imageIcon: '../../static/images/safe3.svg',
					name: this.$t('backapi.self.sim.list.title.text')
				}, {
					ids: 4,
					imageIcon: '../../static/images/safe4.svg',
					name: this.$t('user.security.center.update.phone.text')
				}]
			}
		},
		methods: {
			goBackBtnClick() {
				uni.switchTab({
					url: '/pages/user/user',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			wrapListCell_click(item, index) {
				if (item.ids === 0) {
					uni.navigateTo({
						url: '/pages/user/forget_pwd',
						animationType: 'pop-in',
						animationDuration: 200
					})
				} else if (item.ids === 1) {
					uni.navigateTo({
						url: '/pages/user/forget_pwd2',
						animationType: 'pop-in',
						animationDuration: 200
					})
				} else if (item.ids === 2) {
					uni.navigateTo({
						url: '/pages/user/fund_pwd',
						animationType: 'pop-in',
						animationDuration: 200
					})
				} else if (item.ids === 3) {
					uni.navigateTo({
						url: '/pages/user/bankcard_list',
						animationType: 'pop-in',
						animationDuration: 200
					})
				} else if (item.ids === 4) {
					this.save_updatephone_from('securityCenter')
					uni.navigateTo({
						url: '/pages/user/change_phone',
						success: (res) => {
							// 通过eventChannel向被打开页面传送数据	
							res.eventChannel.emit('changePhoneEventClick', {
								from: 'securityCenter'
							})
						},
						animationType: 'pop-in',
						animationDuration: 200
					})
				} else if (item.ids === 5) {
					uni.navigateTo({
						url: '/pages/user/SIM_list',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #071a28;
	}

	.navLeftBtn image {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
	}

	.navTitleCenter {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
	}


	.report_container {}

	.report_wrap {
		margin-bottom: 9px;
		padding: 0 16px;
	}
</style>
