<template>
	<view class="noticeDetailPage">
		<uni-nav-bar
			left-icon="left" 
			backgroundColor	="#00111C"
			color="#fff"
			:title="navTitle" 
			:statusBar="true"
			:border="false"
			@clickLeft="goBackBtnClick"
			style="font-weight: 600;"
	
		/>
		
		<view class="noticeGroup">
			<view class="noticeGroupTitleTime">
				<view class="noticeGroupInfo">
					<view class="noticeGroupTitle">
						{{detailTitle}}
					</view>
					<text>{{detailTime | timestampStr}}</text>
				</view>
			</view>
			<view class="noticeGroupWrap" >
				<view class="noticeGroupContent" v-html="detailTiDesc">
					<!-- {{detailTiDesc}} -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import {
	// 	getTimeState,
	// 	formatDateToStr,
	// 	formatDateTimeSolt
	// } from '../../common/publicTool.js'
	import {myMixin} from '@/util/mixins.js'
	export default {
		data() {
			return {
				navTitle:'Platform Announcement',
				detailTitle:"",
				detailTime:"",
				detailTiDesc:"",
			}
		},
		mixins:[myMixin],
		// filters:{
		// 	timestampStr(value){
		// 		// console.log("val",formatDateToStr(value));
		// 		return formatDateTimeSolt(value,1)
		// 	}
		// },
		
		onShow() {
			
			this.navTitle = this.$t('notice.list.platform')
			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
		    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
		    eventChannel.on('noticeClick', (data)=> {
			  // console.log(data)
			  this.detailTitle = data.content.title
			  this.detailTime = data.content.createdAt
			  this.detailTiDesc = data.content.content
			  
			  
			  
			  
		    })
			
			
		},
		methods: {
			goBackBtnClick(){
				uni.navigateTo({
					url:'/pages/list/notice_list'
				});
			}
		}
	}
</script>

<style>
page{
	background-color: #071a28;
}

.noticeGroup{
	margin: 10px 16px;
	padding: 10px 10px;
	background-color: #132736;
	border-radius: 5px;
	min-height: calc(100vh - 84px);
}

.noticeGroupTitleTime{
	width: 100%;
	align-items: center;
	letter-spacing: 0.5px;
	margin-bottom: 10px;
}

.noticeGroupInfo{
	font-size: 14px;
	text-align: center;
}

.noticeGroupInfo text{
	display: block;
	color: #a3b7c5;
	margin: 7px 15px;
}

.noticeGroupTitle{
	font-weight: 700;
	color: #3d8dfe;
	text-align: center;
}

.noticeGroupWrap{
	letter-spacing: 0.5px;
	line-height: 21px;
}

.noticeGroupContent{
	font-size: 12px;
	font-family: Hiragino Sans GB;
	color: #fff;
	text-align: left;
	word-break: break-all;
}


</style>
