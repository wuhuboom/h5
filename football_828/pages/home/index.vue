<template>
	<view>
		<view class="Homepage">
			<view class="backTitleBar-wrapper colCent borderBox">
				<view class="fixedBox">
					<view class="common_header" style="height: 44px;background: #1f252f;">
						<view class="define">
							<view class="define_left_slot">
								<view class="lang">
									<view class="lang-view">
										<view class="langs" @click="changeLang">
											<image :src="defaultLangImg" mode="" class="lang-icon"
												style="height: 20px;"></image>
											<text class="lang-text">{{selectLangStr}}</text>
										</view>
									</view>
								</view>
							</view>
							<view class="define_center_slot">
								<view class="logo">
									<view class="logo_center_img"
										style="width: 110px;display: flex;align-items: center;justify-content: center;">
										<image src="../../static/images/wb_logo.png" mode="" class="log-img"
											style="height: 28px;"></image>
										<view class="" style="color: #fff;">
											Ver1.3
										</view>

									</view>
								</view>
							</view>
							<view class="define_right_slot">
								<view class="anount">
									<view class="anount-view">
										<image src="../../static/images/annout.svg" mode="" class="anount-icon"
											@click="toNoticeClick"></image>
										<view class="diot" v-if="noticeNum" @click="toNoticeClick">

										</view>
									</view>
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

			<view class="contents">
				<view class="contents-wrap">
					<view class="swiper">
						<u-swiper :list="swiperList" height="180px" bgColor="#071A28" mode="none" interval="5500">
						</u-swiper>
					</view>
					<view class="notice">
						<view class="notice-img">
							<image src="../../static/images/horn.svg" mode=""></image>
						</view>
						<!-- <uni-notice-bar scrollable :speed="10" background-color="#1f252f" :text="noticeText" /> -->
						<!-- color="#ff9a43" color="#76808f" color="#cacaca" -->
						<u-notice-bar :volume-icon="false" mode="horizontal" :list="noticeList" color="#76808f"
							speed="100" bg-color="#1f252f"></u-notice-bar>
					</view>
					<view class="service-list">
						<view class="user-msg" @click="refreshMoneyClick">
							<view class="user">
								<text class="uname"> {{loginUser}}</text>
								<view class="level">
									<text class="vip-txt">VIP{{vipLevelNum}}</text>
								</view>

							</view>
							<view class="balance">
								{{balanceMoneyNum | moneyFormat}}
							</view>
						</view>
						<view class="item-list">
							<view class="service-item" @click="rechargeBtnClick">
								<image src="../../static/images/deposit.svg" mode="" class="img"></image>
								<view class="text">{{$t('home.recharge')}}</view>
							</view>
							<view class="service-item" @click="withdrawBtnClick">
								<image src="../../static/images/withdraw_money.svg" mode="" class="img"></image>
								<view class="text">{{$t('home.withdraw')}}</view>
							</view>
							<view class="service-item" @click="goToServerBtnClick">
								<image src="../../static/images/service-home.svg" mode="" class="img"></image>
								<view class="text">{{$t('home.service')}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="hot-events">
					<image src="../../static/images/hot_match.png" mode="" class="hot-icon" style="height: 18px;">
					</image>
					<view class="hot-event-title">
						{{$t('home.hot')}}
					</view>
				</view>
				<!-- 	<view class="hot-event">
					
				</view> -->
				<matchListView :listData="matchList" :fromUrlNum="1" styleData="padding: 0px 0px 20px;margin-top: 9px;"
					keyNameStr="hot"></matchListView>
			</view>

		</view>

		<u-popup v-model="langSBoxtatus" mode="center" width="315px" border-radius="10">
			<view class="lang-grid">
				<view class="lang-title">
					<text>{{$t('home.pop.change.lang')}}</text>
				</view>
				<view class="grid_box">
					<scroll-view class="scroll-y" scroll-y="true">
						<view class="grid-item">
							<!-- style="color: ff45f0;" -->
							<view class="grid-col" v-for="(item,index) in langBoxListData" :key="index"
								:style="item.active ? 'color: #ffbf45;': null" @click="menuItemClick(item)">
								<view class="lang-svg">
									<image :src="item.url" mode="" class="icon"></image>
								</view>
								{{item.lang}}
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</u-popup>


		<!-- 是否已绑定提现密码 -->
		<u-popup v-model="isNeedPayPwdModel" mode="bottom" width="315px" border-radius="10" :mask-close-able="false">
			<view class="cards-pop">
				<view class="pop-title">
					<view class="title">
						<view class="title-up">
							{{$t('home.pay.title.text')}}
						</view>
					</view>
					<view class="" style="width: 23px;">

					</view>
					<u-icon name="checkbox-mark111" color="#fff"></u-icon>
				</view>
				<view class="setWithdraw">
					<view class="setWithdrawTitle">
						{{$t('home.pay.pwd.tip.text')}}
					</view>
					<view class="input-view">
						<input type="password" style='width:0;height:0;min-height:0' />
						<input type="text" autocomplete="off" style='width:0;height:0;min-height:0' />
						<input class="txmm-input" :password="!withdrawInputBool" value="" maxlength=16
							:placeholder="withdrawPlace" placeholder-style="font-size:14px;color:rgb(80,103,120)"
							v-model="inputWithdrawData" />

						<view class="showPassImg" @click="withdrawInputBool = !withdrawInputBool">
							<image
								:src="!withdrawInputBool ? '../../static/images/eye1.svg' :'../../static/images/eye2.svg'"
								mode=""></image>
						</view>
					</view>

				</view>
				<view class="withdrawSetBtn" @click="confirmSetPayClick">
					{{$t('home.pay.pwd.btn.text')}}
				</view>
				<view class="" style="width: 100%;height: 50px;">

				</view>
			</view>
		</u-popup>




		<u-toast ref="uToast" />
		<show-modal ref="testRef"></show-modal>
	</view>
</template>


<script>
	import {
		websiteUrlStr,
		sliderReq,
		swiperReq,
		hotReq,
		playerInfoReq,
		logoutReq,
		getPwdPayReq,
		setPwdPayReq,
		noticeReq
	} from '../../api/index.js'

	import {
		myMixin,
		withdrawMinxi,
		rechargeMinxi
	} from '@/util/mixins.js'
	import counter from '../../components/counterView/counter.vue';
	export default {
		components: {
			counter
		},
		data() {
			return {
				popCustomStyle: {
					'background': '#1f252f',
				},

				noticeNum: 0,
				noticeText: '',
				defaultLangImg: '../../static/images/en.png',
				selectLangStr: '',
				menuStatus: false,
				langSBoxtatus: false,
				showTimeStatus: '',
				loginUser: '',
				withdrawPlace: this.$t('home.pay.pwd.input.place.text'),
				withdrawInputBool: false,
				showSeeBool: false,
				inputWithdrawData: '',
				// русский:俄罗斯,Português:葡萄牙语,
				//Español:西班牙语, //Indonesia:印尼,
				// ไทย:泰国,Français:法语,
				// म:印地语,한국인:韩语,
				//Japan:日语,Melayu:马来语,
				//Deutsch:德语, //Türkiye:土耳其语,
				//Italiano:意大利语,українська:乌克兰语
				langBoxListData: [{
						lang: "English",
						type: "EN",
						url: "../../static/images/en.svg",
						'active': false,
					},
					// {
					// 	lang: "中文-简体",
					// 	type: "CN",
					// 	url: "../../static/images/zh.svg",
					// 	'active': false,
					// },
					{
						lang: "русский",
						type: "RU",
						url: "../../static/images/ru.svg",
						'active': false,
					},
					{
						lang: "Português",
						type: "PT",
						url: "../../static/images/pt.png",
						'active': false,
					},
					{
						lang: "Español",
						type: "ES",
						url: "../../static/images/es.svg",
						'active': false,
					},
					{
						lang: "Indonesia",
						type: "ID",
						url: "../../static/images/id.svg",
						'active': false,
					},
					{
						lang: "українська",
						type: "YK",
						url: "../../static/images/yk.svg",
						'active': false,
					},
					// {
					// 	lang: "中文-繁體",
					// 	type: "CHT",
					// 	url: "../../static/images/cht.svg",
					// 	'active': false,
					// },
					{
						lang: "ไทย",
						type: "TH",
						url: "../../static/images/th.svg",
						'active': false,
					},
					{
						lang: "français",
						type: "FR",
						url: "../../static/images/fr.svg",
						'active': false,
					},

					{
						lang: "मैं",
						type: "SA",
						url: "../../static/images/sa.svg",
						'active': false,
					},
					{
						lang: "한국인",
						type: "KO",
						url: "../../static/images/ko.svg",
						'active': false,
					},
					{
						lang: "Japan",
						type: "JA",
						url: "../../static/images/ja.svg",
						'active': false,
					},
					{
						lang: "Melayu",
						type: "MS",
						url: "../../static/images/ms.svg",
						'active': false,
					},

				],
				swiperList: [],
				noticeList: [],
				balanceMoneyNum: null,
				vipLevelNum: 0,
				matchList: [],
				// localLoginToken:'',

				isNeedPayPwdModel: false,

			}
		},
		mixins: [myMixin, withdrawMinxi, rechargeMinxi],

		onShow() {

			// this.localLoginToken = this.$store.state.userInfo.token
			// this.localLoginToken = uni.getStorageSync('footballToken');

			// 初始化语言
			this.initLang()

			// 初始化页面数据
			this.initPageData()



		},
		mounted() {


		},
		onHide() {
			this.menuStatus = false
		},
		onUnload() {

		},
		methods: {

			// ...mapMutations(['logout']),

			initLang() { //初始化语言

				let langStr = uni.getStorageSync('ft_lang')
				let langUpperStr = langStr.toUpperCase()
				// console.log("lang",langStr);
				this.$i18n.locale = langStr
				this.langBoxListData.forEach((item, index) => {
					if (item.type === langUpperStr) {
						this.selectLangStr = item.lang
						item.active = true
					}
				})
				if (langUpperStr !== 'CN') {
					if (langUpperStr == 'PT') {
						this.defaultLangImg = '../../static/images/pt.png'
					} else {
						this.defaultLangImg = '../../static/images/' + langUpperStr.toLowerCase() + '.svg'
					}
				} else {
					// this.defaultLangImg  = '../../static/images/zh.svg'
					this.defaultLangImg = ""
				}

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
					text: this.$t('tabar.funlist')
				})
				uni.setTabBarItem({
					index: 3,
					text: this.$t('tabar.bet')
				})
				uni.setTabBarItem({
					index: 4,
					text: this.$t('tabar.mine')
				})

			},
			initPageData() { //初始化页面数据

				if (!this.hasLogin) {

					return false
				}

				// 获取URL打印
				this.getURlParam()

				// 获取系统通知
				this.initNoticeData()

				// 获取是否设置过提现密码
				this.getPwdPay()

				//获取用户名和余额方法
				this.getInformation()

				//获取轮播
				this.getSlider()

				// 获取公告
				this.getSwiper()

				//获取热门赛事
				this.getHotMatch()

			},
			getURlParam() {
				let pagearr = getCurrentPages(); //获取应用页面栈/获取当前打开过的页面路由数组
				let currentPage = pagearr[pagearr.length - 1]; //获取当前页面信息
				let currentPageOptions = currentPage.options ////获取路由参数
				let currentPageRoute = currentPage.route //获取当前页面路由
				// console.log("currentPageOptions",currentPageOptions);
				if (currentPageOptions.length !== 0 && currentPageOptions.hasOwnProperty('ojbk')) {
					console.log("HACK!");
					uni.setStorageSync('ft_lang', 'cn')
					this.initLang()
				}
			},
			async initNoticeData() {
				let reqParam = {}
				let langStr = uni.getStorageSync('ft_lang')
				// console.log("langStr",langStr);
				if (langStr == "cn") {
					reqParam.lang = "zh"
				} else {
					reqParam.lang = "en"
				}
				let resR = await noticeReq(reqParam, this.localLoginToken)
				if (resR.code === 200) {
					this.noticeNum = 0
					let noticeAllList = resR.data
					if (noticeAllList.length === 0) {

						return false
					}

					noticeAllList.forEach((item, index) => {
						if (item.readStatus === 0) { //未读
							this.noticeNum = this.noticeNum + 1
						}
					})

				}
			},
			async getPwdPay() {
				let resR = await getPwdPayReq(this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {
					if (resR.data.paySet === 2) { //1已设置 2未设置
						this.isNeedPayPwdModel = true
					} else {
						this.isNeedPayPwdModel = false
					}
				}
			},
			async getInformation() {
				let resR = await playerInfoReq(this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {
					this.loginUser = resR.data.username
					this.balanceMoneyNum = resR.data.balance
					this.vipLevelNum = resR.data.vipLevel
				} else if (resR.code === 402 || resR.code === 403) {
					this.logout()
					this.$refs.uToast.show({
						title: resR.msg,
						url: '/pages/login/login',
					})


					// uni.reLaunch({
					// 	url: '/pages/login/login',
					// 	animationType: 'slide-in-top',
					// 	animationDuration: 200
					// });
				}


			},
			async getSlider() { //轮播请求
				this.swiperList = []
				let reqParam = {}
				let langStr = uni.getStorageSync('ft_lang')
				// console.log("langStr",langStr);
				if (langStr == "cn") {
					reqParam.lang = "zh"
				} else {
					reqParam.lang = "en"
				}

				let resR = await sliderReq(reqParam, this.localLoginToken)
				if (resR.code === 200) {
					let resR_data = resR.data
					resR_data.forEach((item, index) => {
						item.image = websiteUrlStr + "/" + item.localPath
						item.localPath = websiteUrlStr + "/" + item.localPath

					})
					// console.log("resR_data",resR_data);
					this.swiperList = resR_data
				}
			},
			async getSwiper() { //滚动广告请求
				this.noticeList = []
				let reqParam = {}
				let langStr = uni.getStorageSync('ft_lang')
				// console.log("langStr",langStr);
				if (langStr == "cn") {
					reqParam.lang = "zh"
				} else {
					reqParam.lang = "en"
				}
				let resR = await swiperReq(reqParam, this.localLoginToken)
				// console.log("resR", resR);
				if (resR.code === 200) {
					let noticeArray = resR.data
					let currContentStr = ""
					noticeArray.forEach(item => {
						currContentStr = currContentStr + item.content
						this.noticeList.push(item.content)
					})

					this.noticeText = currContentStr
				}


			},
			async getHotMatch() { //获取热门赛事
				let resR = await hotReq(this.localLoginToken)
				if (resR.code === 200) {
					this.matchList = resR.data
				}
				// console.log("resR",resR.data);

			},
			changeLang() {
				this.langSBoxtatus = !this.langSBoxtatus
			},
			refreshMoneyClick() {
				this.balanceMoneyNum = 0
				//获取用户名和余额方法
				this.getInformation()
			},
			menuItemClick(item) {
				// console.log("item", item);
				// console.log("选择语言前",this.langSBoxtatus);
				this.defaultLangImg = item.url
				this.selectLangStr = item.lang
				this.$i18n.locale = item.type.toLowerCase();
				uni.setStorageSync('ft_lang', this.$i18n.locale)

				//获取轮播
				this.getSlider()
				// 获取公告
				this.getSwiper()
				this.langBoxListData.forEach((signle, index) => {
					signle.active = false
					// console.log("signle.type", signle.type);
					// console.log("item.type", item.type);
					if (signle.type == item.type) {
						signle.active = true
					}
				})


				this.langSBoxtatus = false
				// console.log("选择语言后",this.langSBoxtatus);
				this.menuStatus = false
				this.initLang()



			},

			mesBoxItemClick(num) {
				this.menuStatus = false
				if (num === 1) {

				} else if (num === 2) {
					// console.log("this.$refs.testRef",this.$refs.testRef);
					this.$showModal({
						title: '',
						icon: 'warning',
						ceterTitle: this.$t('modal.title'),
						ceterDesc: this.$t('modal.logout.desc'),
						cancelText: this.$t('modal.cancel.text'), //传入空值表示只显示确认按钮，此代码不能省略
						confirmText: this.$t('modal.confirm.text'),
						success: async (res) => {
							if (res.confirm) {
								let resR = await logoutReq(this.localLoginToken)
								// console.log('用户点击确定',resR)
								if (resR.code === 200) {
									this.logout()
									uni.reLaunch({
										url: '/pages/login/login',
										animationType: 'slide-in-top',
										animationDuration: 200
									});
								}

							} else if (res.cancel) { //点击确定无需操作

							}
						}
					})

				}



				// if (num === 1) {
				// 	uni.switchTab({
				// 		url: '/pages/match/match_list',
				// 		animationType: 'slide-in-top',
				// 		animationDuration: 200
				// 	})
				// } else if (num === 2) {
				// 	uni.navigateTo({
				// 		url: '/pages/list/notice_list',
				// 		success: (res) => {
				// 			// 通过eventChannel向被打开页面传送数据	
				// 			uni.setStorageSync('queryNoticListUrlFrom', 'home');
				// 			res.eventChannel.emit('userNoticeClick', {
				// 				from: 'home'
				// 			})
				// 		},
				// 		animationType: 'slide-in-top',
				// 		animationDuration: 200
				// 	})
				// } else if (num === 3) {
				// 	uni.navigateTo({
				// 		url: '/pages/customer/index',
				// 		success: (res) => {
				// 			// 通过eventChannel向被打开页面传送数据	
				// 			uni.setStorageSync('querySeverCustomUrlFrom', 'home');
				// 			res.eventChannel.emit('querySeverCustomUrlFrom', {
				// 				from: 'home'
				// 			})
				// 		},
				// 		animationType: 'slide-in-top',
				// 		animationDuration: 200
				// 	})
				// } else if (num === 4) {
				// 	uni.switchTab({
				// 		url: '/pages/user/user',
				// 		animationType: 'slide-in-top',
				// 		animationDuration: 200
				// 	})
				// } else if (num === 5) {
				// 	// console.log("this.$refs.testRef",this.$refs.testRef);
				// 	this.$showModal({
				// 		title: '',
				// 		icon: 'warning',
				// 		ceterTitle: this.$t('modal.title'),
				// 		ceterDesc: this.$t('modal.logout.desc'),
				// 		cancelText: this.$t('modal.cancel.text'), //传入空值表示只显示确认按钮，此代码不能省略
				// 		confirmText: this.$t('modal.confirm.text'),
				// 		success: async (res) => {
				// 			if (res.confirm) {
				// 				let resR = await logoutReq(this.localLoginToken)
				// 				// console.log('用户点击确定',resR)
				// 				if (resR.code === 200) {
				// 					this.logout()
				// 					uni.reLaunch({
				// 						url: '/pages/login/login',
				// 						animationType: 'slide-in-top',
				// 						animationDuration: 200
				// 					});
				// 				}

				// 			} else if (res.cancel) { //点击确定无需操作

				// 			}
				// 		}
				// 	})

				// }
			},
			matchDetailClick(item) { //赛事点击获取详情

				uni.navigateTo({
					url: '/pages/match/match_content',
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据
						uni.setStorageSync('queryMatchContentItemUrlFrom', 'home');
						res.eventChannel.emit('matchDeClick', {
							content: item,
							from: 'home'
						})
					},
					animationType: 'slide-in-top',
					animationDuration: 200
				});
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
					animationType: 'slide-in-top',
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
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			goToServerBtnClick() {
				uni.navigateTo({
					url: '/pages/customer/index',
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据	
						uni.setStorageSync('querySeverCustomUrlFrom', 'home');
						res.eventChannel.emit('querySeverCustomUrlFrom', {
							from: 'home'
						})
					},
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			withdrawInput() {
				if (this.inputWithdrawData) {
					this.showSeeBool = true
				} else {
					this.showSeeBool = false
				}
			},
			async confirmSetPayClick() {

				if (!this.inputWithdrawData) {

					uni.showToast({
						title: this.$t('home.pay.pwd.alert.text'),
						icon: 'none',
						duration: 2000
					});

					return false
				}

				let reqParam = {}
				reqParam.payPwd = this.inputWithdrawData
				reqParam.payPwdAgain = this.inputWithdrawData
				let resR = await setPwdPayReq(reqParam, this.localLoginToken)
				if (resR.code === 200) {

					uni.showToast({
						title: this.$t('backapi.setPaySuccess'),
						icon: 'none',
						duration: 2000
					});

					this.isNeedPayPwdModel = false


				} else {

				}
			},
			toNoticeClick() {
				uni.navigateTo({
					url: "/pages/list/notice_list",
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据	
						uni.setStorageSync('queryNoticListUrlFrom', 'home');
						res.eventChannel.emit('userNoticeClick', {
							from: 'home'
						})
					},
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #171E25;
		color: #303133;
		font-size: 14px;
	}

	.Homepage {
		position: relative;

		.lang-view {
			position: relative;
			width: 90px;

			.langs {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;

				.lang-icon {
					flex: 0 0 20px;
					width: 20px;
					height: 20px;
				}

				.lang-text {
					width: 80px;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					display: inline-block;
					color: #f8f8f8;
					padding-left: 5px;
				}
			}
		}

		.logo_center_img {
			margin-top: 5px;

			.log-img {
				height: 100%;
				width: 100%;
			}
		}

		.anount-view {
			position: relative;
			width: 80px;
			height: 38px;
			display: flex;
			justify-content: flex-end;

			.anount-icon {
				width: 38px;
				height: 38px;
			}

			.diot {
				position: absolute;
				width: 6px;
				height: 6px;
				background-color: #b33a3a;
				border-radius: 50%;
				right: 8px;
				top: 10px;
			}
		}

		.contents {
			background-color: #171e25;

			.contents-wrap {
				background-color: #1f252f;
				border-bottom-left-radius: 15px;
				border-bottom-right-radius: 15px;

				.swiper {
					overflow: hidden;
					width: 93.333333%;
					padding-top: 10px;
					margin: 0 auto;
				}

				.service-list {
					height: 70px;
					padding: 0 15px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-top: 1px solid #171e25;

					.user-msg {
						display: flex;
						flex-direction: column;
						height: 50px;
						justify-content: space-around;
						color: #fff;

						.user {
							display: flex;
							align-items: center;
							position: relative;

							.uname {
								font-size: 13px;
								margin-right: 5px;
								color: #868b9a;
								width: 60px;
								word-break: break-all;
							}

							.level {
								background: url(@/static/images/vip.png) no-repeat 50%;
								background-size: 100%;
								width: 55px;
								height: 17px;

								.vip-txt {
									font-size: 12px;
									padding-left: 18px;
									color: #9c6410;
									// padding-top: 2px;
									font-weight: 600;
								}
							}


						}

						.balance {
							font-size: 13px;
							font-weight: 700;
							margin-top: 12px;
							color: #ca952e;
						}
					}

					.item-list {
						display: flex;
						flex: 0 0 65%;
						margin-left: 5px;
						justify-content: flex-end;

						.service-item {
							width: 30%;

							.img {
								width: 40px;
								height: 40px;
							}

							.text {
								width: 100%;
								overflow: hidden;
								// white-space: nowrap;
								text-overflow: ellipsis;
								text-align: center;
								color: #fff;
							}
						}
					}

					.service-item {
						display: flex;
						flex-direction: column;
						align-items: center;

						.text {
							font-size: 12px;
							color: #666;
						}
					}
				}
			}
		}

		.notice {
			position: relative;
			overflow: hidden;
			display: flex;
			margin: 8px 0;
			border-radius: 18px;
			padding: 0 18px;
			align-items: center;

			.notice-img {
				width: 17px;
				height: 17px;

				image {
					width: 20px;
					height: 20px;
				}
			}

			/deep/ .u-notice-bar-wrap {
				width: 100%;
			}

			.uni-noticebar {
				margin-left: 10px;
				margin-bottom: 2px;
				height: 20px;
			}
		}

		.hot-events {
			margin-top: 15px;
			display: flex;
			align-items: center;
			padding: 0 15px;

			.hot-icon {
				width: 23px;
				height: 18px;
			}

			.hot-event-title {
				font-size: 17px;
				font-weight: 700;
				color: #fff;
				padding-left: 10px;
			}
		}

		.hot-event {
			min-height: 362px;
			padding: 10px 15px 0;
		}



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
				// padding-top: 7px;
				// padding-bottom: 7px;
				// padding-left: 15px;
				// padding-right: 15px;
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

	/deep/ .u-mode-center-box {
		background-color: #1f252f;

		.lang-title {
			color: #f8f8f8;
			text-align: center;
			line-height: 44px;
			font-size: 16px;
			border-bottom: 0.5px solid #333f52;
		}

		.grid_box {
			.scroll-y {
				height: 250px;

				.grid-item {
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;

					.grid-col {
						display: flex;
						align-items: center;
						flex-direction: column;
						width: 33%;
						height: 70px;
						text-align: center;
						justify-content: center;
						color: #eee;
						font-size: 15px;
						border-right: 0.5px solid #202b3f;
						border-bottom: 0.5px solid #202b3f;

						.lang-svg {
							width: 25px;
							height: 25px;
							margin-top: 5px;
							margin-bottom: 5px;

							.icon {
								width: 25px;
								height: 25px;
								border-radius: 50%;
							}
						}
					}
				}
			}
		}
	}

	/deep/ .u-drawer-bottom {
		background-color: #1f252f;

		.cards-pop {
			padding: 18px 15px 0;

			.pop-title {
				display: flex;
				justify-content: space-between;
				padding-bottom: 25px;
				border-bottom: 0.5px solid #111;

				.title {
					margin: auto;
					text-align: center;

					.title-up {
						font-size: 16px;
						color: #eee;
						font-weight: 700;
					}

					.title-tip {
						color: #ffbc00;
						font-size: 13px;
						padding-top: 5px;
					}
				}
			}


			.setWithdraw {
				display: flex;
				flex-direction: column;

				.setWithdrawTitle {
					color: #ffbc00;
					font-size: 13px;
					padding-top: 5px;
					padding: 10px 0;
				}

				.input-view {
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					height: 40px;
					background-color: #171e25;
					align-items: center;
					color: #f8f8f8;
					padding: 0 10px;

					position: relative;

					.txmm-input {
						// width: 70%;
						width: 100%;
					}

					.showPassImg {
						position: absolute;
						top: 50%;
						right: 0;
						transform: translate(-50%, -50%);

						image {
							width: 23px;
							height: 23px;
						}
					}
				}





			}

			.withdrawSetBtn {
				width: 315px;
				height: 40px;
				background: linear-gradient(90deg, #ffd37d, #ca962e);
				border-radius: 8px;
				font-size: 16px;
				font-family: Hiragino Sans GB;
				font-weight: 400;
				color: #111;
				line-height: 40px;
				text-align: center;
				margin: auto;
				margin-top: 24px;
			}
		}


	}
</style>
