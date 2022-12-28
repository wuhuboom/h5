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
		
		<view class="ques_container">
			<view class="ques_item item-boder">
				<view class="answer">
					<view class="desc_text" v-for="(item,index) in dataList1" :key="index">
						<text class="desc_text_num">{{index + 1}}.</text>
						{{item.content}}
					</view>
				</view>
			</view>
			<view class="ques_item ">
				<view class="answer privicy4">
					<view class="desc_text">
						{{ansTitle}}
					</view>
				</view>
			</view>
			<view class="ques_item item-boder">
				<view class="que_title">
					<view class="title">
						{{dataAnsTitle2}}
					</view>
				</view>
				<view class="answer">
					<view class="desc_text" v-for="(item,index) in dataList2" :key="index">
						<text class="desc_text_num">{{index + 1}}.</text>
						{{item.content}}
					</view>
				</view>
			</view>
			<view class="ques_item item-boder">
				<view class="que_title">
					<view class="title">
						{{dataAnsTitle3}}
					</view>
				</view>
				<view class="answer">
					<view class="desc_text" v-for="(item,index) in dataList3" :key="index">
						<text class="desc_text_num">{{index + 1}}.</text>
						{{item.content}}
					</view>
				</view>
			</view>
			<view class="ques_item item-boder">
				<view class="que_title">
					<view class="title">
						{{dataAnsTitle4}}
					</view>
				</view>
				<view class="answer">
					<view class="desc_text" v-for="(item,index) in dataList4" :key="index">
						<text class="desc_text_num">{{index + 1}}.</text>
						{{item.content}}
					</view>
				</view>
			</view>
			<view class="ques_item item-boder">
				<view class="que_title">
					<view class="title">
						{{dataAnsTitle5}}
					</view>
				</view>
				<view class="answer">
					<view class="desc_text" v-for="(item,index) in dataList5" :key="index">
						<text class="desc_text_num">{{index + 1}}.</text>
						{{item.content}}
					</view>
				</view>
			</view>
			<view class="ques_item item-boder">
				<view class="que_title">
					<view class="title">
						{{dataAnsTitle6}}
					</view>
				</view>
				<view class="answer">
					<view class="desc_text" v-for="(item,index) in dataList6" :key="index">
						<text class="desc_text_num">{{index + 1}}.</text>
						{{item.content}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				navTitle:this.$t('user.help.privacy.support.title.text'),
				ansTitle:this.$t('user.help.privacy.support.ques.ans.title.center.text'),
				dataAnsTitle2:this.$t('user.help.privacy.support.ques.introduction.title.text'),
				dataAnsTitle3:this.$t('user.help.privacy.support.ques.purpose.title.text'),
				dataAnsTitle4:this.$t('user.help.privacy.support.ques.confidentiality.title.text'),
				dataAnsTitle5:this.$t('user.help.privacy.support.ques.recipientinformation.title.text'),
				dataAnsTitle6:this.$t('user.help.privacy.support.ques.monitor.title.text'),
				dataList1:[],
				dataList2:[],
				dataList3:[],
				dataList4:[],
				dataList5:[],
				dataList6:[],
			}
		},
		onShow() {
			
			
			this.dataList1 = [{
				content:this.$t('user.help.privacy.support.ques.ans.normal1.text')
			},{
				content:this.$t('user.help.privacy.support.ques.ans.normal2.text')
			},{
				content:this.$t('user.help.privacy.support.ques.ans.normal3.text')
			}]
			
			this.dataList2 = [{
				content:this.$t('user.help.privacy.support.ques.introduction.ans1.text')
			}]
			
			
			
			this.dataList3 = [{
				content:this.$t('user.help.privacy.support.ques.purpose.ans1.text')
			}]
			
			this.dataList4 = [{
				content:this.$t('user.help.privacy.support.ques.accessinformation.ans1.text')
			}]
			
			this.dataList5 = [{
				content:this.$t('user.help.privacy.support.ques.confidentiality.ans1.text')
			}]
			
			this.dataList6 = [{
				content:this.$t('user.help.privacy.support.ques.monitor.ans1.text')
			},{
				content:this.$t('user.help.privacy.support.ques.monitor.ans2.text')
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


.ques_container{
	padding: 0 17px 30px;
}

.ques_item{
	
	margin: 13px 0;
	border-radius: 8px;
	color: #fff;
}

.item-boder{
	background: #132736;
	padding: 10px;
	
}

.answer{
	
}

.desc_text{
	display: flex;
	font-size: 12px;
	color: #fff;
	font-weight: 400;
	margin-top: 5px;
}

.desc_text_num{
	color: #3d8dfe;
	margin-right: 3px;
}

.privicy4{
	display: flex;
	justify-content: center;
}

.privicy4 .desc_text{
	color: #3d8dfe;
	font-size: 14px;
	text-align: center;
	margin-top: 0;
}

.que_title .title{
	display: flex;
	font-size: 14px;
	color: #3d8dfe;
	font-weight: 400;
}

</style>
