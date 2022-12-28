<template>
	<view class="noticeListPage">
		<uni-nav-bar left-icon="left" backgroundColor="#00111C" color="#fff" :title="navTitle" :statusBar="true"
			:border="false" @clickLeft="goBackBtnClick" style="font-weight: 600;" />

		<u-tabs :list="noticeTab" bg-color="#00111C" active-color="#3d8dfe" inactive-color="#FFF" font-size="28"
			bar-width="120" :bold="false" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<view class="noticeListBox" v-if="current === 0">
			<view class="noticeListItem" v-for="(item,index) in noticeList" :key="item.id"
				@click="noticeListItemClick(item)">
				<view class="noticeContent">
					<view class="noticeContent_top">
						【{{ item.title }}】
						<view class="noticeContent_top_read" v-if="item.readStatus === 1">
							<span>{{$t('notice.read.text')}}</span>
						</view>
						<text v-if="item.readStatus === 0">{{$t('notice.unread.text')}}</text>
					</view>
					<view class="noticeContent_bottom">
						<view class="noticeContent_bottom_cell">
							{{item.content}}
						</view>
						<image src="../../static/images/arrow.svg" mode=""></image>
					</view>
				</view>
			</view>
		</view>

		<u-toast ref="uToast" />

	</view>
</template>

<script>
	import {
		noticeReq,
		noticeReadReq
	} from '../../api/index.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	// import {
	// 	getTimeState,
	// 	formatDateToStr,
	// } from '../../common/publicTool.js'
	// import {mapState} from 'vuex'
	export default {
		data() {
			return {
				navTitle: 'Platform Announcement',
				noticeTab: [],
				noticeList: [],
				current: 0,
				localLoginToken: "",
				urlFromStr: null,
			}
		},
		mixins: [myMixin],
		// computed:{
		// 	...mapState(['hasLogin'])
		// },
		// onLoad() {
		// 	// console.log("this.hasLogin",this.hasLogin);
		// 	if(!this.hasLogin){
		// 		uni.reLaunch({
		// 		   url: '../login/login',
		// 		   animationType: 'pop-in',
		// 		   animationDuration: 200
		// 		})
		// 	}
		// },
		onShow() {

			// 初始化语言
			this.initLang()

			// 初次加载数据
			this.initData()


			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('userNoticeClick', async (data) => {
				this.urlFromStr = data.from
			})


		},
		methods: {
			initLang() { //初始化语言


				let langStr = uni.getStorageSync('lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr



			},
			initData() {

				// this.localLoginToken = this.$store.state.userInfo.token
				// this.localLoginToken = uni.getStorageSync('footballToken');

				// 设置文字
				this.navTitle = this.$t('notice.list.platform')
				this.noticeTab = [{
					name: this.$t('notice.list.platform')
				}, {
					name: this.$t('notice.list.message')
				}]
				this.noticeList = []
				// 获取公告内容
				this.getNoticeList()
			},

			async getNoticeList() {
				let reqParam = {}
				let langStr = uni.getStorageSync('lang')
				// console.log("langStr",langStr);
				if (langStr == "cn") {
					reqParam.lang = "zh"
				} else {
					reqParam.lang = "en"
				}
				let resR = await noticeReq(reqParam, this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {
					let getNoticeList = resR.data
					this.noticeList = getNoticeList
				} else if (resR.code === 402 || resR.code === 403) {
					this.$refs.uToast.show({
						title: resR.msg,
						url: '/pages/login/login',
					})
					this.logout()
				}
			},

			goBackBtnClick() {
				const queryNoticListUrlFrom = uni.getStorageSync('queryNoticListUrlFrom') || 'other'
				// console.log("queryMatchContentItemUrlFrom",queryMatchContentItemUrlFrom);
				if (!this.matchContent_Bool) {
					this.urlFromStr = queryNoticListUrlFrom
				}
				if (this.urlFromStr === 'user') {
					uni.switchTab({
						url: '/pages/user/user',
						animationType: 'pop-in',
						animationDuration: 200
					})
				} else if (this.urlFromStr === 'home') {
					uni.switchTab({
						url: '/pages/home/index',
						animationType: 'pop-in',
						animationDuration: 200
					})
				}


			},
			change(index) {
				this.current = index;
			},
			async noticeListItemClick(item) {
				let reqParam = {}
				reqParam.noticeId = item.id
				let resR = await noticeReadReq(reqParam, this.localLoginToken)
				if (resR.code === 200) {
					uni.navigateTo({
						url: '/pages/notice/notice_detail',
						success: function(res) {
							// 通过eventChannel向被打开页面传送数据
							res.eventChannel.emit('noticeClick', {
								content: item
							})
						},
						animationType: 'slide-in-top',
						animationDuration: 200
					});
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #071a28;
	}

	.noticeListBox {
		padding: 0 0 34px 0;
		background: #071a28;
		height: calc(100vh);
	}

	.noticeListItem {
		width: 94%;
		position: relative;
		/* padding: 0 23px 0 13px; */
		letter-spacing: 0.5px;
		height: 60px;
		background-color: #132736;
		margin: 10px auto;
		border-radius: 5px;
	}

	.noticeContent {
		/* width: 100%; */
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		margin: 0 25px;
	}

	.noticeContent_top {
		font-size: 14px;
		font-family: Hiragino Sans GB;
		color: #fff;
		font-weight: 600;
		display: flex;
		justify-content: space-between;
		word-break: keep-all;
	}



	.noticeContent_top_read {
		color: #506778;
		font-size: 13px;
		font-weight: 400;
	}

	.noticeContent_top text {
		color: red;
		font-size: 13px;
		font-weight: 400;
	}

	.noticeContent_bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}


	.noticeContent_bottom_cell {
		font-size: 12px;
		line-height: 21px;
		word-break: break-all;
		font-family: Hiragino Sans GB;
		font-weight: 400;
		color: #fff;
		/* overflow: hidden;
	display: -webkit-box;
	text-overflow: ellipsis;
	-webkit-line-clamp:1;
	-webkit-box-orient:vertical; */
		overflow: hidden;
		/*内容超出后隐藏*/
		text-overflow: ellipsis;
		/* 超出内容显示为省略号 */
		white-space: nowrap;
		/* 文本不进行换行 */
		width: 80%;
	}

	.noticeContent_bottom image {
		width: 12px;
		height: 17px;
	}
</style>
