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
					@click.native="wrapListCell_click(item,index)" :showImgBool="true" />
			</view>
		</view>
	</view>
</template>

<script>
	import wrapListCell from '@/components/wrapListCellView/wrapListCellView.vue'
	import {
		accoutListMixin
	} from '@/util/mixins.js'
	export default {
		mixins: [accoutListMixin], // 使用mixin
		components: {
			wrapListCell,
		},
		data() {
			return {
				navTitle: this.$t('user.report.manage.title.text'),
				dataCenterList: [{
						imageIcon: '../../static/images/Rebate_Center.svg',
						name: this.$t('user.report.manage.list.rebate.center.text'),
						id: 0
					}, {
						imageIcon: '../../static/images/Order_center.svg',
						name: this.$t('user.report.manage.list.order.center.text'),
						id: 1
					}, {
						imageIcon: '../../static/images/Data_center.svg',
						name: this.$t('user.report.manage.list.data.center.text'),
						id: 2
					}, {
						imageIcon: '../../static/images/Account_change_report.svg',
						name: this.$t('user.report.manage.list.account.change.center.text'),
						id: 3
					}, {
						imageIcon: '../../static/images/Personal_report.svg',
						name: this.$t('user.report.manage.list.personal.center.text'),
						id: 4
					},
					// {
					// 	imageIcon:'../../static/images/Team_report.svg',
					// 	name:this.$t('user.report.manage.list.team.center.text'),
					// id: 5
					// },
					{
						imageIcon: '../../static/images/user_list.svg',
						name: this.$t('user.report.manage.list.user.center.text'),
						id: 6
					}
				]
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
				// console.log("index",index);
				if (item.id === 0) {
					uni.navigateTo({
						url: '/pages/user/rebateCenter',
						animationType: 'pop-in',
						animationDuration: 200
					})
				} else if (item.id === 1) {
					uni.navigateTo({
						url: '/pages/user/orderCenter',
						success: (res) => {
							// 通过eventChannel向被打开页面传送数据	
							uni.setStorageSync('queryOrderCenterUrlFrom', 'report');
							res.eventChannel.emit('eventOrderClick', {
								from: 'report'
							})
						},
						animationType: 'pop-in',
						animationDuration: 200
					})
				} else if (item.id === 2) {
					uni.navigateTo({
						url: '/pages/user/statistics',
						animationType: 'pop-in',
						animationDuration: 200
					})
				} else if (item.id === 3) {
					uni.navigateTo({
						url: '/pages/user/Report/accountChange',
						animationType: 'pop-in',
						animationDuration: 200
					})
				} else if (item.id === 4) {
					uni.navigateTo({
						url: '/pages/user/Report/personalReport',
						animationType: 'pop-in',
						animationDuration: 200
					})
				} else if (item.id === 5) {
					uni.navigateTo({
						url: '/pages/user/Report/teamReport',
						animationType: 'pop-in',
						animationDuration: 200
					})

				} else if (item.id === 6) {
					uni.navigateTo({
						url: '/pages/user/Report/accountList',
						animationType: 'pop-in',
						animationDuration: 200,
						success: (res) => {
							this.save_accountlist_from('report')
							// 通过eventChannel向被打开页面传送数据	
							res.eventChannel.emit('accountListEventClick', {
								from: 'report'
							})
						},
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
