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
		
		<view class="technical_container">
			<view class="technical_container_item">
				<view class="technical_container_item_title">
					{{technicalDataTitle1}}
				</view>
				<view class="technical_container_item_content" v-for="(item,index) in technicalDataList1" :key="index">
					<text class="technical_container_item_content_index">{{index+1}}.</text>
					<text class="technical_container_item_content_desc">{{item.content}}</text>
				</view>
			</view>

			<view class="technical_container_item">
				<view class="technical_container_item_title">
					{{technicalDataTitle2}}
				</view>
				<view class="technical_container_item_content" v-for="(item,index) in technicalDataList2" :key="index">
					<text class="technical_container_item_content_index">{{index+1}}.</text>
					<text class="technical_container_item_content_desc">{{item.content}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				navTitle:this.$t('user.help.tec.support.title.text'),
				technicalDataTitle1:this.$t('user.help.tec.support.ques.hack.text'),
				technicalDataTitle2:this.$t('user.help.tec.support.ques.protect.text'),
				technicalDataList1:[],
				technicalDataList2:[],
			}
		},
		onShow() {
			
			
			this.technicalDataList1 = [{
				content:this.$t('user.help.tec.support.ques.ans.down.text')
			},{
				content:this.$t('user.help.tec.support.ques.ans.user.text')
			},{
				content:this.$t('user.help.tec.support.ques.ans.protect.text')
			},{
				content:this.$t('user.help.tec.support.ques.ans.often.text')
			}]
			
			
			this.technicalDataList2 = [{
				content:this.$t('user.help.tec.support.ques.protect.ans1.text')
			},{
				content:this.$t('user.help.tec.support.ques.protect.ans2.text')
			}]
			
		},
		methods: {
			goBackBtnClick(){
				uni.navigateTo({
				   url: '/pages/user/help/help',
				   animationType: 'pop-in',
				   animationDuration: 200
				})
			},
			
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


.technical_container{
	margin: 12px 16px;
}

.technical_container_item{
	background-color: #132736;
	margin-bottom: 10px;
	padding: 10px 10px;
	border-radius: 5px;
}

.technical_container_item_title{
	color: #3d8dfe;
	font-size: 14px;
}

.technical_container_item_content{
	display: flex;
}

.technical_container_item_content_index{
	color: #3d8dfe;
	font-size: 12px;
	line-height: 30px;
}


.technical_container_item_content_desc{
	color: #fff;
	font-size: 12px;
	line-height: 30px;
}

</style>
