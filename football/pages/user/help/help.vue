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
					<image src="@/static/images/back.svg" mode=""></image>
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
				navTitle:this.$t('user.help.center.title.text'),
				dataCenterList:[{
					imageIcon:'../../../static/images/Recharge_tutorial.svg',
					name:this.$t('user.help.center.recharge.tutorial.text')
				},{
					imageIcon:'../../../static/images/contact_us.svg',
					name:this.$t('user.help.center.contact.us.text')
				},{
					imageIcon:'../../../static/images/user_notice.svg',
					name:this.$t('user.help.center.user.notice.text')
				},{
					imageIcon:'../../../static/images/privacy_policy.svg',
					name:this.$t('user.help.center.privacy.solicy.text')
				},{
					imageIcon:'../../../static/images/technical_support.svg',
					name:this.$t('user.help.center.technical.support.text')
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
					
				}else if(index === 1){
					uni.navigateTo({
					   url: '/pages/customer/index',
					   success: (res) => {
							// 通过eventChannel向被打开页面传送数据	
							uni.setStorageSync('querySeverCustomUrlFrom', 'help');
							res.eventChannel.emit('severCustomEventClick', {from:'help'})
					   },
					   animationType: 'pop-in',
					   animationDuration: 200
					})
				}else if(index === 2){
					uni.navigateTo({
					   url: '/pages/user/help/user_notice',
					   animationType: 'pop-in',
					   animationDuration: 200
					})
				}else if(index === 3){
					uni.navigateTo({
					   url: '/pages/user/help/privacy_policy',
					   animationType: 'pop-in',
					   animationDuration: 200
					})
				}else if(index === 4){
					uni.navigateTo({
					   url: '/pages/user/help/technical_support',
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
