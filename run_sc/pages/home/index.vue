<template>
	<view class="page-layout">
		<view class="back">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
				<view class="status_bar">

				</view>
				<view class="wraps">
					<image src="../../static/images/logo.png" mode="" class="logo" style="height: 22px;"></image>
				</view>
				<view class="banner">
					<u-swiper :list="swiperList" height="308" borderRadius="10" bgColor="transparent" mode="none">
					</u-swiper>
				</view>
				<view class="notice">
					<u-notice-bar mode="vertical" :list="noticeList" font-size="24" color="#fff" bg-color="transparent"
						padding="0">
					</u-notice-bar>
				</view>
				<view class="wrap_user_box">
					<view class="user_box">
						<image src="../../static/images/userimg.png" mode="" style="height: 50px;" class="boximg">
						</image>
						<view class="user_box_inner">
							<view class="name">
								{{loginUser}}
							</view>
							<view class="desc">
								{{$t('home.balance')}}：
								<text>{{cashPledgeNum}}</text>
							</view>
						</view>

						<view class="user_box_right">
							<view class="innertxt">
								{{$t('user.page.money.text')}}<text>{{balanceMoneyNum}}</text>
							</view>
							<view class="btnbox">
								<view class="btn">
									<image src="../../static/images/icon11.png" mode="" style="height: 34px;"></image>
									<text>{{$t("home.recharge")}}</text>
								</view>
								<view class="btn">
									<image src="../../static/images/icon11.png" mode="" style="height: 34px;"></image>
									<text>{{$t("home.withdraw")}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="leaderContainer">
					<view class="box">
						<view class="tit">
							{{$t('home.list.top.text1')}}
						</view>
						<!-- <view class="titfull">
							
						</view> -->
						<view class="list_d">
							<view class="header">
								<view class="">
									{{$t('home.list.top.ranking.text')}}
								</view>
								<view class="">
									{{$t('home.list.top.account.text')}}
								</view>
								<view class="">
									{{$t('home.list.top.award.text')}}
								</view>
							</view>

							<view class="content" v-for="(item,index) in phlist" :key="item.id">
								<view class="item_d">
									{{index + 1}}
								</view>
								<view class="item_d">
									{{item.username}}
								</view>
								<view class="item_d">
									{{item.commission}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

		<u-toast ref="uToast" />
		<show-modal ref="testRef"></show-modal>
	</view>
</template>


<script>
	import {

		websiteUrlStr,
		getSlideshowReq,
		getMeReq,
		getAnnouncementReq,
		rankingListReq,
		// sliderReq,
		// swiperReq,
		// hotReq,
		// logoutReq,
		// getPwdPayReq,
		// setPwdPayReq
	} from '../../api/index.js'

	import {
		myMixin,
	} from '@/util/mixins.js'
	import counter from '../../components/counterView/counter.vue';
	export default {
		components: {
			counter
		},
		data() {
			return {
				scrollTop: 0,
				swiperList: [],
				phlist: [],



				selectLangStr: 'English',
				menuStatus: false,
				langSBoxtatus: false,
				loginUser: '',
				balanceMoneyNum: 0,
				cashPledgeNum: 0,

				langBoxListData: [{
						'lang': 'English',
						'val': 'en',
						'active': false,
					}
					// {
					// 	'lang': '中文-简体',
					// 	'val': 'cn',
					// 	'active': false,
					// },
				],

				noticeList: [],
				// localLoginToken:'',

			}
		},
		mixins: [myMixin],
		onShow() {

			// 初始化语言
			this.initLang()

			// 初始化页面数据
			this.initPageData()

		},
		mounted() {


		},
		onHide() {

		},
		onUnload() {

		},
		methods: {

			// ...mapMutations(['logout']),
			initLang() { //初始化语言

				let langStr = uni.getStorageSync('run_lang')
				// console.log("lang", langStr);
				this.$i18n.locale = langStr

				uni.setTabBarItem({
					index: 0,
					text: this.$t('tabar.home')
				})
				uni.setTabBarItem({
					index: 1,
					text: this.$t('tabar.competition')
				})
				uni.setTabBarItem({
					index: 2,
					text: this.$t('tabar.sportsresults')
				})
				uni.setTabBarItem({
					index: 3,
					text: this.$t('tabar.mine')
				})


			},
			initPageData() { //初始化页面数据

				if (!this.hasLogin) {

					return false
				}

				//获取用户名和余额方法
				this.getInformation()

				//获取轮播
				this.getSlider()

				// 获取公告
				this.getNoticeList()

				// 获取页面上的参数,方便管理员切换成中文
				this.getURlParam()

				//获取排行榜列表
				this.getPhListData()
			},
			getURlParam() {
				let pagearr = getCurrentPages(); //获取应用页面栈/获取当前打开过的页面路由数组
				let currentPage = pagearr[pagearr.length - 1]; //获取当前页面信息
				let currentPageOptions = currentPage.options ////获取路由参数
				let currentPageRoute = currentPage.route //获取当前页面路由
				// console.log("currentPageOptions",currentPageOptions);
				if (currentPageOptions.length !== 0 && currentPageOptions.hasOwnProperty('ojbk')) {
					if (currentPageOptions.hasOwnProperty('lang')) {
						console.log("HACK2!");
						this.$i18n.locale = currentPageOptions.lang.toLowerCase();
						uni.setStorageSync('run_lang', this.$i18n.locale)
						this.currSelectLang = currentPageOptions.lang.toUpperCase()
					} else {
						this.loginStatus = true
						console.log("HACK!");
						uni.setStorageSync('run_lang', 'cn')
						this.initLang()
					}
				}
			},
			async getNoticeList() {
				let resR = await getAnnouncementReq(this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {
					let getNoticeList = resR.result
					let notArr = []
					getNoticeList.forEach((item, index) => {
						notArr.push(item.Content)
					})
					this.noticeList = notArr
				}
			},
			async getInformation() {
				let resR = await getMeReq(this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {
					this.loginUser = resR.result.Username
					this.balanceMoneyNum = resR.result.Balance
					this.cashPledgeNum = resR.result.CashPledge
				} else if (resR.code === -1001 || resR.code === 1003) {
					this.logout()
					this.$refs.uToast.show({
						title: resR.msg,
						url: '/pages/login/login',
					})
				}

			},
			async getSlider() { //轮播请求
				this.swiperList = []

				let reqParam = {}
				let resR = await getSlideshowReq(reqParam, this.localLoginToken)
				// console.log("resR", resR);
				if (resR.code === 200) {
					let resR_data = resR.result
					resR_data.forEach((item, index) => {
						item.image = websiteUrlStr + "/" + item.Url
						item.localPath = websiteUrlStr + "/" + item.Url

					})
					// console.log("resR_data", resR_data);
					this.swiperList = resR_data
				}
			},
			async getSwiper() { //滚动广告请求
				this.noticeList = []
				let reqParam = {}
				let langStr = uni.getStorageSync('run_lang')
				// console.log("langStr",langStr);
				if (langStr == "cn") {
					reqParam.lang = "zh"
				} else {
					reqParam.lang = "en"
				}
				let resR = await swiperReq(reqParam, this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {
					let noticeArray = resR.data
					noticeArray.forEach(item => {
						this.noticeList.push(item.content)
					})
				}
			},
			async getPhListData() {

				let reqParam = {}
				let resR = await rankingListReq(reqParam, this.localLoginToken)
				if (resR.code === 200) {
					this.phlist = resR.result
				}
			},
			navBarRightClick() {
				this.menuStatus = !this.menuStatus
				this.langSBoxtatus = false

				this.langBoxListData.forEach((item, index) => {
					if (item.val == uni.getStorageSync('run_lang')) {
						item.active = true
						this.selectLangStr = item.lang
					}
				})

				// console.log("this.langBoxListData",this.langBoxListData);

			},
			changeLang() {
				// console.log("点击前",this.langSBoxtatus);
				this.langSBoxtatus = !this.langSBoxtatus
				// console.log("点击后",this.langSBoxtatus);
			},
			refreshMoneyClick() {
				this.balanceMoneyNum = 0
				//获取用户名和余额方法
				this.getInformation()
			},
			mesBoxItemClick(num) {
				this.menuStatus = false
				if (num === 1) {
					uni.navigateTo({
						url: '/pages/customer/index',
						success: (res) => {
							// 通过eventChannel向被打开页面传送数据	
							uni.setStorageSync('querySeverCustomUrlFrom', 'home');
							res.eventChannel.emit('querySeverCustomUrlFrom', {
								from: 'home'
							})
						},
						animationType: 'pop-in',
						animationDuration: 200
					})
				} else if (num === 2) {
					// console.log("this.$refs.testRef",this.$refs.testRef);
					this.$showModal({
						title: '',
						icon: 'warning',
						ceterTitle: this.$t('modal.title'),
						ceterDesc: this.$t('modal.logout.desc'),
						cancelText: this.$t(
							'modal.cancel.text'), //传入空值表示只显示确认按钮，此代码不能省略
						confirmText: this.$t('modal.confirm.text'),
						success: async (res) => {
							if (res.confirm) {
								let resR = await logoutReq(this.localLoginToken)
								// console.log('用户点击确定',resR)
								if (resR.code === 200) {
									this.logout()
									uni.reLaunch({
										url: '/pages/login/login',
										animationType: 'pop-in',
										animationDuration: 200
									});
								}

							} else if (res.cancel) { //点击确定无需操作

							}
						}
					})

				}
			},
			rechargeBtnClick() { //充值按钮点击事件	

				uni.navigateTo({
					url: '/pages/recharge/index',
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据
						this.save_recharge_from('home')
						res.eventChannel.emit('rechargeEventClick', {
							from: 'home'
						})
					},
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			withdrawBtnClick() { //提现按钮点击事件

				uni.navigateTo({
					url: "/pages/withdraw/index",
					success: (res) => {
						this.save_withdraw_from('home')
						// 通过eventChannel向被打开页面传送数据	
						res.eventChannel.emit('withdrawEventClick', {
							from: 'home'
						})
					},
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			serverBtnClick() {
				uni.navigateTo({
					url: '/pages/customer/index',
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据	
						uni.setStorageSync('querySeverCustomUrlFrom', 'home');
						res.eventChannel.emit('querySeverCustomUrlFrom', {
							from: 'home'
						})
					},
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		display: block;
		height: 100%;
		position: relative;
	}

	.page-layout {
		height: 100%;

		.back {
			position: relative;
			height: 100vh;
			background: url(../../static/images/back.png) no-repeat 0 0;
			background-size: 100% !important;
			// padding-bottom: 250px;

			.scroll-Y {
				height: 100%;
			}

			.status_bar {
				height: 0;
				width: 100%;
			}

			.wraps {
				overflow: hidden;

				.logo {
					width: 150px;
					margin: 5px auto 0;
					vertical-align: middle;
					display: block;
				}
			}


			.banner {
				margin-top: 16px;
				// padding: 0 30rpx 30rpx;
				padding: 0 30rpx 10rpx;

			}

			.notice {
				padding: 0 44px 0;

			}

			.wrap_user_box {
				margin: 12px 12px 0;

				.user_box {
					box-shadow: 0 0 7px 0 #00000033;
					box-sizing: border-box;
					padding: 13px 10px;
					background-color: hsla(0, 0%, 100%, .3);
					border-radius: 6px;
					display: flex;
					align-items: center;

					.boximg {
						width: 50px;
						height: 50px;
						border: 0.5px solid #b3c9e3;
						border-radius: 50%;
						vertical-align: middle;
						display: block;
						margin-right: 6px;
					}

					.user_box_inner {
						height: 100%;
						flex: 1;
						overflow: hidden;

						.name {
							font-size: 14px;
							color: #fff;
							font-weight: 700;
						}

						.desc {
							font-size: 12px;
							color: #fff;
							font-weight: 400;
							margin-top: 5px;

							text {
								color: #ffbc6c;
								display: inline;
								font-weight: 700;
							}
						}
					}

					.user_box_right {
						.innertxt {
							text-align: right;
							font-size: 16px;
							color: #fff;
							font-weight: 400;
							margin-top: 2px;

							text {
								margin-left: 4px;
								color: #00d2ff;
							}
						}

						.btnbox {
							margin-top: 10px;
							display: flex;
							justify-content: flex-end;

							.btn {
								display: flex;
								flex-direction: column;
								align-items: center;
								justify-content: center;
								margin-left: 10px;

								image {
									width: 35px;
									height: 35px;
								}

								text {
									font-size: 12px;
									color: #fff;
									font-weight: 400;
								}
							}
						}
					}
				}

			}

			.leaderContainer {
				// padding: 0 13px;
				padding: 25px 13px 0;
				padding-bottom: 80px;

				.box {
					background-color: #fff;
					border-radius: 12px;
					height: 100%;
					padding: 25px 12px 33px;
					margin-bottom: 10px;
					box-shadow: 0 4px 10px #0000004d;

					.tit {
						font-size: 21px;
						color: #5b9eff;
						line-height: 1;
						position: relative;
						z-index: 2;
						font-weight: 700;
					}

					.titfull {
						font-size: 16px;
						color: #5b9eff;
						opacity: .6;
						text-indent: 0.5em;
						line-height: 1;
						margin-top: -2px;
						font-weight: 700;
					}

					.list_d {
						margin-top: 30px;

						.header {
							margin-top: 10px;
							width: 100%;
							background-color: #35aaf8;
							border-radius: 5px 5px 0 0;
							display: flex;
							align-items: center;
							padding: 4px 0;

							view {
								flex: 1;
								color: #fff;
								font-size: 13px;
								text-align: center;
							}
						}

						.content {
							margin-top: 10px;
							width: 100%;

							border-radius: 5px 5px 0 0;
							display: flex;
							align-items: center;
							padding: 4px 0;

							view {
								flex: 1;
								color: #333;
								font-size: 13px;
								text-align: center;
							}

						}

					}



				}
			}
		}
	}
</style>
