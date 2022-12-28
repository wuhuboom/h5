<template>
	<view class="reportManagePage">
		<uni-nav-bar
			backgroundColor	="#00111C"
			color="#fff"
			:statusBar="true"
			:border="false"
			@clickLeft="goBackBtnClick"
			style="font-weight: 600;"
			:fixed="true"
		>
			<block slot="left">
				<view class="navLeftBtn">
					<image src="../../static/images/back.svg" mode=""></image>
				</view>
			</block>
		
			<view class="navTitleCenter">{{navTitle}}</view>
		</uni-nav-bar>
		
		<view class="report_container">
			<view class="report_wrap">
				<wrapListCell  v-for="(item,index) in dataCenterList" :key="index" :itemCell="item" @click.native="wrapListCell_click(item,index)" :showImgBool="true"/>
			</view>
		</view>
	</view>
</template>

<script>
	import wrapListCell from '@/components/wrapListCellView/wrapListCellView.vue'
	export default {
		components:{
			wrapListCell,
		},
		data() {
			return {
				navTitle:this.$t('user.report.manage.title.text'),
				dataCenterList:[{
					imageIcon:'../../static/images/Rebate_Center.svg',
					name:this.$t('user.report.manage.list.rebate.center.text')
				},{
					imageIcon:'../../static/images/Order_center.svg',
					name:this.$t('user.report.manage.list.order.center.text')
				},{
					imageIcon:'../../static/images/Data_center.svg',
					name:this.$t('user.report.manage.list.data.center.text')
				},{
					imageIcon:'../../static/images/Account_change_report.svg',
					name:this.$t('user.report.manage.list.account.change.center.text')
				},{
					imageIcon:'../../static/images/Personal_report.svg',
					name:this.$t('user.report.manage.list.personal.center.text')
				},{
					imageIcon:'../../static/images/Team_report.svg',
					name:this.$t('user.report.manage.list.team.center.text')
				},{
					imageIcon:'../../static/images/user_list.svg',
					name:this.$t('user.report.manage.list.user.center.text')
				}]
			}
		},
		methods: {
			goBackBtnClick(){
				uni.switchTab({
				   url: '/pages/user/user',
				   animationType: 'pop-in',
				   animationDuration: 200
				})
			},
			wrapListCell_click(item,index){
				// console.log("index",index);
				if(index === 0){
					uni.navigateTo({
					   url: '/pages/user/rebateCenter',
					   animationType: 'pop-in',
					   animationDuration: 200
					})
				}else if(index === 1){
					uni.navigateTo({
					   url: '/pages/user/orderCenter',
					   success: (res) => {
							// 通过eventChannel向被打开页面传送数据	
							uni.setStorageSync('queryOrderCenterUrlFrom', 'report');
							res.eventChannel.emit('eventOrderClick', {from:'report'})
					   },
					   animationType: 'pop-in',
					   animationDuration: 200
					})
				}else if(index === 2){
					uni.navigateTo({
					   url: '/pages/user/statistics',
					   animationType: 'pop-in',
					   animationDuration: 200
					})
				}else if(index === 3){
					uni.navigateTo({
					   url: '/pages/user/Report/accountChange',
					   animationType: 'pop-in',
					   animationDuration: 200
					})
				}else if(index === 4){
					uni.navigateTo({
					   url: '/pages/user/Report/personalReport',
					   animationType: 'pop-in',
					   animationDuration: 200
					})
				}else if(index === 5){
					uni.navigateTo({
					   url: '/pages/user/Report/teamReport',
					   animationType: 'pop-in',
					   animationDuration: 200
					})
					
				}else if(index === 6){
					uni.navigateTo({
					   url: '/pages/user/Report/accountList',
					   animationType: 'pop-in',
					   animationDuration: 200
					})
				}
			}
		}
	}
</script>

<style>
page{
	background-color: #071a28;
}

.navLeftBtn image{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
}

.navTitleCenter{
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
}


.report_container{
	
}

.report_wrap{
	margin-bottom: 9px;
	padding: 0 16px;
}

</style>
