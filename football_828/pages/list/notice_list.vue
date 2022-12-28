<template>
	<view class="noticeListPage">
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


		<view class="detail">
			<view class="detail-tab">
				<view :class="current === index ? 'active' : null" v-for="(item,index) in noticeTab" :key="index"
					@click="changeTab(index)">
					{{item.name}}
					<view class="border-line" v-if="current === index">

					</view>
				</view>
			</view>
		</view>

		<view class="notice-list" v-if="current === 0">
			<view class="item" v-for="(item,index) in noticeList" :key="item.id" @click="noticeListItemClick(item)">
				<view class="top">
					<view class="cell-title">
						【{{ item.title }}】
					</view>
					<view class="cell-text-right">
						<text class="data">{{$t('notice.datetime.text')}}: {{item.createdAt | timestampStr}}</text>
						<text :class="item.readStatus === 1 ? 'detail red':'detail'">{{item.readStatus === 1 ?
							$t('notice.read.text') : $t('notice.look.text')}}</text>
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
				navTitle: '',
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
		// 		   animationType: 'slide-in-top',
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


				let langStr = uni.getStorageSync('ft_lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr



			},
			initData() {

				// this.localLoginToken = this.$store.state.userInfo.token
				// this.localLoginToken = uni.getStorageSync('footballToken');

				// 设置文字
				this.navTitle = this.$t('func.system.notice.center')
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
				let langStr = uni.getStorageSync('ft_lang')
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
					this.noticeList = resR.data

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
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (this.urlFromStr === 'home') {
					uni.switchTab({
						url: '/pages/home/index',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (this.urlFromStr === 'func') {
					uni.switchTab({
						url: '/pages/funList/index',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (this.urlFromStr === 'order_l') {
					uni.switchTab({
						url: '/pages/user/order-list',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				}


			},
			changeTab(index) {
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

	.detail-tab {
		padding: 7px 0px;
		display: flex;
		justify-content: space-between;
		color: #f8f8f8;
		background: #1f252f;

		view {
			flex: 1;
			text-align: center;
			box-sizing: border-box;
			font-weight: 600;
			line-height: 25px;
			font-size: 15px;
			color: #b4b6bf;
		}


		.active {
			color: #f5af28;
			position: relative;
		}
	}


	.border-line {
		width: 35%;
		margin: auto;
		border-bottom: 2px solid #f5af28;
	}


	.notice-list {
		padding: 0 20px;

		.item {
			width: 100%;
			position: relative;
			background: #1f252f;
			border-radius: 5px;
			margin: 2% auto;
		}
	}

	.top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;

		.cell-title {
			font-size: 16px;
			font-family: Hiragino Sans GB;
			font-weight: 600;
			color: #f8f8f8;
			flex: 80%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			height: 50px;
			padding: 12px 10px;
			border-bottom: 0.5px solid #202b3f;
		}
	}


	.cell-text-right {
		font-size: 12px;
		font-weight: 700;
		color: #999;
		font-family: Hiragino Sans GB;
		font-weight: 400;
		text-align: center;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		height: 50px;
		align-items: center;
		padding: 0 15px;

		.date {
			color: #7f8aa7;
			font-size: 13px;
		}

		.detail {
			color: #f5af28;
			font-size: 13px;
		}

		.red {
			color: red;
			font-size: 13px;
			font-weight: 400;
		}
	}
</style>
