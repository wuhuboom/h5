<template>
	<view class="main">
		<u-navbar :is-back="true" :border-bottom="false" z-index="1200" :title-bold="true" back-icon-color="#000000E6"
			title-color="#000000E6" :title="navTitle" :custom-back="goBackBtnClick">
		</u-navbar>
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
			<view class="list" v-for="(item,index) in noticeList" :key="item.id">
				<view class="poiText">
					{{index+1}}
				</view>
				<view class="images">
					<u-icon name="bell"></u-icon>
				</view>
				<view class="con">
					<view class="name u-line-1">
						{{item.Content}}
					</view>
					<view class="decs">
						{{item.Created | timestampStr2}}
					</view>
				</view>
				<view class="btn" @click="noticeListItemClick(item)">
					{{$t('notice.list.cell.look.text')}}
				</view>
			</view>
		</scroll-view>

		<u-toast ref="uToast" />

	</view>
</template>

<script>
	import {
		getAnnouncementReq,
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
				backgroundOBj: {
					"background": "transparent"
				},
				scrollTop: 0,

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


				let langStr = uni.getStorageSync('run_lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr



			},
			initData() {

				// this.localLoginToken = this.$store.state.userInfo.token
				// this.localLoginToken = uni.getStorageSync('footballToken');

				// 设置文字
				this.navTitle = this.$t('user.list.cell.sys.notice.text')

				this.noticeList = []
				// 获取公告内容
				this.getNoticeList()
			},

			async getNoticeList() {
				let resR = await getAnnouncementReq(this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {
					let getNoticeList = resR.result
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
				uni.switchTab({
					url: '/pages/user/user',
					animationType: 'pop-in',
					animationDuration: 200
				})

				// const queryNoticListUrlFrom = uni.getStorageSync('queryNoticListUrlFrom') || 'other'
				// // console.log("queryMatchContentItemUrlFrom",queryMatchContentItemUrlFrom);
				// if (!this.matchContent_Bool) {
				// 	this.urlFromStr = queryNoticListUrlFrom
				// }
				// if (this.urlFromStr === 'user') {
				// 	uni.switchTab({
				// 		url: '/pages/user/user',
				// 		animationType: 'pop-in',
				// 		animationDuration: 200
				// 	})
				// } else if (this.urlFromStr === 'home') {
				// 	uni.switchTab({
				// 		url: '/pages/home/index',
				// 		animationType: 'pop-in',
				// 		animationDuration: 200
				// 	})
				// }


			},
			change(index) {
				this.current = index;
			},
			async noticeListItemClick(item) {
				// let reqParam = {}
				// reqParam.noticeId = item.id
				// let resR = await noticeReadReq(reqParam, this.localLoginToken)
				// if (resR.code === 200) {
				// 	uni.navigateTo({
				// 		url: '/pages/notice/notice_detail',
				// 		success: function(res) {
				// 			// 通过eventChannel向被打开页面传送数据
				// 			res.eventChannel.emit('noticeClick', {
				// 				content: item
				// 			})
				// 		},
				// 		animationType: 'slide-in-top',
				// 		animationDuration: 200
				// 	});
				// }
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		background-color: #fff;
	}

	.main {
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;

		.scroll-Y {
			flex: 1;
			overflow: hidden;
			padding-bottom: 20px;

			.list {
				margin: 7px 15px;
				padding: 14px 11px 15px 9px;
				display: flex;
				align-items: center;
				border-radius: 5px;
				position: relative;
				background-size: cover !important;
				background: url(../../static/images/bgblue.png) no-repeat top;

				.poiText {
					position: absolute;
					right: 30px;
					top: 2px;
					font-size: 6px;
					color: #fff;

				}

				.images {
					width: 41px;
					height: 41px;
					border-radius: 50%;
					overflow: hidden;
					background-color: #eff6ff;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: 11px;
				}

				.con {
					flex: 1;
					overflow: hidden;

					.name {
						font-size: 14px;
						font-weight: 700;
						color: #335ed4;
					}

					.decs {
						font-size: 12px;
						font-weight: 400;
						margin-bottom: 5px;
						margin-top: 2px;
						color: #335ed4;
					}
				}

				.btn {
					line-height: 23px;
					border-radius: 11px;
					font-size: 11px;
					color: #fff;
					text-align: center;
					min-width: 61px;
					// background: linear-gradient(90deg, #428aff, #2c72ff);
					background: linear-gradient(90deg, #ff7635, #ff4e3f);
				}

				.u-line-1 {
					display: -webkit-box !important;
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical !important;
				}
			}

		}


		// .list:nth-child(odd) {
		// 	background: url(../../static/images/bgblue.png) no-repeat top;
		// }

	}
</style>
